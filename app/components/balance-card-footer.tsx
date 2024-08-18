import { marketAbi } from "@/abi/market";
import { ChainConfig } from "@/config/chains";
import useError from "@/hooks/useError";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export function BalanceCardFooter(props: {
  balance: bigint;
  chainConfig: ChainConfig;
  onWithdraw: () => void;
}) {
  const { handleError } = useError();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  async function onWithdraw() {
    try {
      setIsWithdrawing(true);
      // Check public client
      if (!publicClient) {
        throw new Error("Public client is not ready");
      }
      // Check wallet
      if (!address || !walletClient) {
        throw new Error("Wallet is not connected");
      }
      // Send tx
      const txHash = await walletClient.writeContract({
        address: props.chainConfig.market,
        abi: marketAbi,
        functionName: "withdrawBalance",
        args: [],
        chain: props.chainConfig.chain,
      });
      await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });
      toast({
        title: "Withdrawal successful 🤘",
      });
      props.onWithdraw();
    } catch (error) {
      handleError(error, true);
    } finally {
      setIsWithdrawing(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mt-1">
        {formatEther(props.balance)}{" "}
        {props.chainConfig.chain.nativeCurrency.symbol}
      </p>
      <div className="flex flex-row gap-2 mt-4">
        <Button
          variant="default"
          disabled={props.balance == BigInt(0) || isWithdrawing}
          onClick={() => onWithdraw()}
        >
          {isWithdrawing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          ️🏦 Withdraw
        </Button>
        <Link href="/bridge">
          <Button variant="secondary" disabled={props.balance == BigInt(0)}>
            ️🔁 Bridge
          </Button>
        </Link>
      </div>
    </div>
  );
}
