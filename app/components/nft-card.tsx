"use client";

import { addressToShortAddress } from "@/lib/converters";
import { NFT } from "@/lib/nfts";
import { NFTCardFooter } from "./nft-card-footer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function NFTCard(props: { nft: NFT }) {
  return (
    <div className="w-full flex flex-col border rounded px-6 py-8">
      <Avatar className="size-48 rounded-sm">
        <AvatarImage src={props.nft.image} alt="Icon" />
        <AvatarFallback className="text-6xl rounded-sm">🖼️</AvatarFallback>
      </Avatar>
      <div className="flex flex-row gap-2 items-center mt-8">
        <p className="text-xl font-bold">{props.nft.contractName}</p>
        <p className="text-xl font-bold text-muted-foreground">
          #{props.nft.id}
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:gap-3 mt-4">
        <p className="min-w-[80px] text-sm text-muted-foreground">
          Description:
        </p>
        <p className="text-sm break-all">{props.nft.description || "None"}</p>
      </div>
      <div className="flex flex-col md:flex-row md:gap-3 mt-4">
        <p className="min-w-[80px] text-sm text-muted-foreground">Chain:</p>
        <p className="text-sm break-all">{props.nft.chain.name}</p>
      </div>
      <div className="flex flex-col md:flex-row md:gap-3 mt-4">
        <p className="min-w-[80px] text-sm text-muted-foreground">Contract:</p>
        <a
          href={
            props.nft.chain.blockExplorers?.default.url +
            "/address/" +
            props.nft.contractAddress
          }
          target="_blank"
          className="text-sm break-all underline underline-offset-4"
        >
          {addressToShortAddress(props.nft.contractAddress)}
        </a>
      </div>
      <div className="flex flex-col md:flex-row md:gap-3 mt-4">
        <p className="min-w-[80px] text-sm text-muted-foreground">Owner:</p>
        <a
          href={
            props.nft.chain.blockExplorers?.default.url +
            "/address/" +
            props.nft.owner
          }
          target="_blank"
          className="text-sm break-all underline underline-offset-4"
        >
          {addressToShortAddress(props.nft.owner)}
        </a>
      </div>
      <div className="mt-8">
        <NFTCardFooter nft={props.nft} />
      </div>
    </div>
  );
}
