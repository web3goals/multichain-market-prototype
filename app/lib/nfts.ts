import axios from "axios";
import { Address, Chain } from "viem";
import { optimismSepolia } from "viem/chains";

export type NFT = {
  id: string;
  description: string | undefined;
  image: string | undefined;
  contractAddress: Address;
  contractName: string;
  owner: Address;
  chain: Chain;
};

export async function getNFTsForOwner(
  owner: Address,
  chains: Chain[]
): Promise<NFT[]> {
  const nfts: NFT[] = [];
  for (let i = 0; i < chains.length; i++) {
    const chainNfts = await getNFTsForOwnerByChain(owner, chains[i]);
    nfts.push(...chainNfts);
  }
  return nfts;
}

async function getNFTsForOwnerByChain(
  owner: Address,
  chain: Chain
): Promise<NFT[]> {
  const alchemyChain = chainToAlchemyChain(chain);
  if (!alchemyChain) {
    return [];
  }
  const { data } = await axios.get(
    `https://${alchemyChain}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${owner}&withMetadata=true&pageSize=100`
  );
  const alchemyNfts = data.ownedNfts;
  if (!alchemyNfts || alchemyNfts.length === 0) {
    return [];
  }
  const nfts: NFT[] = [];
  for (let i = 0; i < alchemyNfts.length; i++) {
    nfts.push({
      id: alchemyNfts[i].tokenId,
      description: alchemyNfts[i].description,
      image: alchemyNfts[i].image?.originalUrl,
      contractAddress: alchemyNfts[i].contract.address,
      contractName: alchemyNfts[i].contract.name,
      owner: owner,
      chain: chain,
    });
  }
  return nfts;
}

function chainToAlchemyChain(chain: Chain): string | undefined {
  let alchemyChain;
  if (chain === optimismSepolia) {
    alchemyChain = "opt-sepolia";
  }
  return alchemyChain;
}
