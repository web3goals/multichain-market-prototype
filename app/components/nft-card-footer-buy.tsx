import { NFT } from "@/lib/nfts";
import { Button } from "./ui/button";
import { formatEther } from "viem";

// TODO: Implement
export function NFTCardFooterBuy(props: { nft: NFT; price: bigint }) {
  return (
    <div>
      <Button onClick={() => {}}>
        💸 Buy for {formatEther(props.price)}{" "}
        {props.nft.chain.nativeCurrency.symbol}{" "}
      </Button>
    </div>
  );
}
