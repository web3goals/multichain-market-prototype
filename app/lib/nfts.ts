import { chainConfigs } from "@/config/chains";
import axios from "axios";
import {
  Address,
  Chain,
  createPublicClient,
  http,
  isAddressEqual,
  zeroAddress,
} from "viem";
import {
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  sepolia,
} from "viem/chains";
import { chainToChainConfig } from "./chains";
import { marketAbi } from "@/abi/market";

export type NFT = {
  id: string;
  description: string | undefined;
  image: string | undefined;
  contractAddress: Address;
  contractName: string;
  chain: Chain;
  owner: Address;
};

export async function getNFTsForOwner(owner: Address): Promise<NFT[]> {
  const chains = Object.values(chainConfigs).map(
    (chainConfig) => chainConfig.chain
  );
  const nfts: NFT[] = [];
  for (let i = 0; i < chains.length; i++) {
    const chainNfts = await getNFTsForOwnerByChain(owner, chains[i]);
    nfts.push(...chainNfts);
  }
  return nfts;
}

export async function getNFTsForSale(): Promise<NFT[]> {
  const chains = Object.values(chainConfigs).map(
    (chainConfig) => chainConfig.chain
  );
  const nfts: NFT[] = [];
  for (let i = 0; i < chains.length; i++) {
    const chainNfts = await getNFTsForSaleByChain(chains[i]);
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
  return await alchemyDataForNFTs(data, chain);
}

async function getNFTsForSaleByChain(chain: Chain): Promise<NFT[]> {
  // Load histories
  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  });
  const histories = await publicClient.readContract({
    address: chainToChainConfig(chain).market,
    abi: marketAbi,
    functionName: "getHistories",
    args: [],
  });
  // Filter histores
  const historiesWithoutBuyer = histories.filter((history) =>
    isAddressEqual(history.buyer, zeroAddress)
  );
  if (historiesWithoutBuyer.length === 0) {
    return [];
  }
  // Load metadata - https://docs.alchemy.com/reference/getnftmetadatabatch-v3
  const tokens = historiesWithoutBuyer.map((history) => ({
    contractAddress: history.nftAddress,
    tokenId: history.tokenId.toString(),
    tokenType: "ERC721",
  }));
  const alchemyChain = chainToAlchemyChain(chain);
  if (!alchemyChain) {
    return [];
  }
  const { data } = await axios.post(
    `https://${alchemyChain}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadataBatch`,
    { tokens: tokens }
  );
  return await alchemyDataForNFTs(data, chain);
}

async function getOwnerForNFT(
  contractAddress: string,
  tokenId: string,
  chain: Chain
): Promise<Address> {
  const alchemyChain = chainToAlchemyChain(chain);
  if (!alchemyChain) {
    return zeroAddress;
  }
  const { data } = await axios.get(
    `https://${alchemyChain}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getOwnersForNFT?contractAddress=${contractAddress}&tokenId=${tokenId}`
  );
  return data?.owners?.[0] || zeroAddress;
}

function chainToAlchemyChain(chain: Chain): string | undefined {
  let alchemyChain;
  if (chain === optimismSepolia) {
    alchemyChain = "opt-sepolia";
  }
  if (chain === baseSepolia) {
    alchemyChain = "base-sepolia";
  }
  if (chain === sepolia) {
    alchemyChain = "eth-sepolia";
  }
  if (chain === arbitrumSepolia) {
    alchemyChain = "arb-sepolia";
  }
  return alchemyChain;
}

async function alchemyDataForNFTs(data: any, chain: Chain): Promise<NFT[]> {
  const alchemyNFTs = data.nfts || data.ownedNfts;
  if (!alchemyNFTs) {
    return [];
  }
  const nfts: NFT[] = [];
  for (let i = 0; i < alchemyNFTs.length; i++) {
    const nftTokenId = alchemyNFTs[i].tokenId;
    const nftContractAddress = alchemyNFTs[i].contract.address;
    const nftOwner = await getOwnerForNFT(
      nftContractAddress,
      nftTokenId,
      chain
    );
    nfts.push({
      id: nftTokenId,
      description: alchemyNFTs[i].description,
      image: alchemyNFTs[i].image?.originalUrl,
      contractAddress: nftContractAddress,
      contractName: alchemyNFTs[i].contract.name,
      chain: chain,
      owner: nftOwner,
    });
  }
  return nfts;
}
