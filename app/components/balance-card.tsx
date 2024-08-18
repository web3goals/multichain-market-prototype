"use client";

import { marketAbi } from "@/abi/market";
import { ChainConfig } from "@/config/chains";
import { zeroAddress } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { BalanceCardFooter } from "./balance-card-footer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export function BalanceCard(props: { chainConfig: ChainConfig }) {
  const { address } = useAccount();

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: props.chainConfig.market,
    abi: marketAbi,
    functionName: "getBalance",
    args: [address || zeroAddress],
    chainId: props.chainConfig.chain.id,
  });

  return (
    <div className="w-full flex flex-row gap-4 border rounded px-6 py-8">
      <div>
        {/* Define avatar */}
        <Avatar className="size-20">
          <AvatarImage
            src={`/images/chains/${props.chainConfig.chain.id}.png`}
            alt="Icon"
          />
          <AvatarFallback className="text-2xl">⛓️</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <p className="text-xl font-bold">{props.chainConfig.chain.name}</p>
        <div className="mt-1">
          {balance !== undefined ? (
            <BalanceCardFooter
              balance={balance}
              chainConfig={props.chainConfig}
              onWithdraw={() => refetchBalance()}
            />
          ) : (
            <Skeleton className="h-6" />
          )}
        </div>
      </div>
    </div>
  );
}
