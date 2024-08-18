"use client";

import { marketAbi } from "@/abi/market";
import useError from "@/hooks/useError";
import { chainToChainConfig } from "@/lib/chains";
import { NFT } from "@/lib/nfts";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Confetti from "react-confetti";
import { formatEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function NFTCardFooterBuy(props: { nft: NFT; nftPrice: bigint }) {
  const { handleError } = useError();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address, chain } = useAccount();
  const [formStatus, setFormStatus] = useState<
    "NOT_SUBMITTED" | "SUBMITTING" | "SUBMITTED"
  >("NOT_SUBMITTED");

  async function onSubmit() {
    try {
      setFormStatus("SUBMITTING");
      // Check public client
      if (!publicClient) {
        throw new Error("Public client is not ready");
      }
      // Check wallet
      if (!address || !walletClient) {
        throw new Error("Wallet is not connected");
      }
      // Define Wormhole cost
      const wormholeCost = await publicClient.readContract({
        address: chainToChainConfig(chain).market,
        abi: marketAbi,
        functionName: "getWormholeCost",
        args: [chainToChainConfig(props.nft.chain).wormholeChainId],
      });
      // Send tx
      const txHash = await walletClient.writeContract({
        address: chainToChainConfig(chain).market,
        abi: marketAbi,
        functionName: "buyItem",
        args: [
          chainToChainConfig(props.nft.chain).wormholeChainId,
          chainToChainConfig(props.nft.chain).market,
          props.nft.contractAddress,
          BigInt(props.nft.id),
          props.nftPrice,
          props.nft.owner,
        ],
        value: wormholeCost + props.nftPrice,
        chain: chain,
      });
      await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });
      setFormStatus("SUBMITTED");
    } catch (error) {
      handleError(error, true);
      setFormStatus("NOT_SUBMITTED");
    }
  }

  if (formStatus === "SUBMITTED") {
    return (
      <div>
        <Separator />
        <p className="text-xl font-bold mt-8">Congratulations 🎉</p>
        <p className="text-sm text-muted-foreground mt-1">
          The NFT will be transferred to your account soon
        </p>
        <Link href="/account">
          <Button variant="secondary" className="mt-4">
            👤 Open Account
          </Button>
        </Link>
        <Confetti
          width={document.body.clientWidth}
          height={document.body.scrollHeight}
          recycle={false}
        />
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => onSubmit()} disabled={formStatus === "SUBMITTING"}>
        {formStatus === "SUBMITTING" && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        💸 Buy for {formatEther(props.nftPrice)}{" "}
        {props.nft.chain.nativeCurrency.symbol}{" "}
      </Button>
    </div>
  );
}
