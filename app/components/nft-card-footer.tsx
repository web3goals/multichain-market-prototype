"use client";

import { marketAbi } from "@/abi/market";
import { chainToChainConfig } from "@/lib/chains";
import { NFT } from "@/lib/nfts";
import { Address, isAddressEqual } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { NFTCardFooterBuy } from "./nft-card-footer-buy";
import { NFTCardFooterSell } from "./nft-card-footer-sell";
import { Skeleton } from "./ui/skeleton";

export function NFTCardFooter(props: { nft: NFT; nftOwner: Address }) {
  const { address } = useAccount();

  const { data: listing, isFetched: isListingFetched } = useReadContract({
    address: chainToChainConfig(props.nft.chain).market,
    abi: marketAbi,
    functionName: "getListing",
    args: [props.nft.contractAddress, BigInt(props.nft.id)],
    chainId: props.nft.chain.id,
  });

  if (isListingFetched && listing && listing.price !== BigInt(0)) {
    return <NFTCardFooterBuy nft={props.nft} price={listing.price} />;
  }

  if (
    address &&
    isAddressEqual(props.nftOwner, address) &&
    isListingFetched &&
    listing &&
    listing.price === BigInt(0)
  ) {
    return <NFTCardFooterSell nft={props.nft} />;
  }

  return (
    <div>
      <Skeleton className="h-8" />
    </div>
  );
}
