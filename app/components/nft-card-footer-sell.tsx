import { marketAbi } from "@/abi/market";
import useError from "@/hooks/useError";
import { chainToChainConfig } from "@/lib/chains";
import { NFT } from "@/lib/nfts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { erc721Abi, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export function NFTCardFooterSell(props: { nft: NFT }) {
  const { handleError } = useError();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [formStatus, setFormStatus] = useState<
    "INPUT_HIDDEN" | "INPUT_VISIBLE" | "SUBMITTING" | "SUBMITTED"
  >("INPUT_HIDDEN");

  const formSchema = z.object({
    price: z.coerce.number().gt(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
      // Send approve tx
      const approveTxHash = await walletClient.writeContract({
        address: props.nft.contractAddress,
        abi: erc721Abi,
        functionName: "approve",
        args: [
          chainToChainConfig(props.nft.chain).market,
          BigInt(props.nft.id),
        ],
        chain: props.nft.chain,
      });
      await publicClient.waitForTransactionReceipt({
        hash: approveTxHash,
      });
      // Send list tx
      const listTxHash = await walletClient.writeContract({
        address: chainToChainConfig(props.nft.chain).market,
        abi: marketAbi,
        functionName: "listItem",
        args: [
          props.nft.contractAddress,
          BigInt(props.nft.id),
          parseEther(String(values.price)),
        ],
        chain: props.nft.chain,
      });
      await publicClient.waitForTransactionReceipt({
        hash: listTxHash,
      });
      setFormStatus("SUBMITTED");
    } catch (error) {
      handleError(error, true);
      setFormStatus("INPUT_VISIBLE");
    }
  }

  // TODO: Display confetti animation
  if (formStatus === "SUBMITTED") {
    return (
      <div>
        <Separator />
        <p className="text-xl font-bold mt-8">Congratulations 🎉</p>
        <p className="text-sm text-muted-foreground mt-1">
          Your NFT is now available for purchase
        </p>
        <Link href="/explore">
          <Button variant="secondary" className="mt-4">
            👀 Explore
          </Button>
        </Link>
      </div>
    );
  }

  if (formStatus === "INPUT_VISIBLE" || formStatus === "SUBMITTING") {
    return (
      <div>
        <Separator />
        <p className="text-xl font-bold mt-8">
          Set a price for the sale{" "}
          <span className="text-muted-foreground">
            ({props.nft.chain.nativeCurrency.symbol})
          </span>
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="42"
                      type="number"
                      disabled={formStatus === "SUBMITTING"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={formStatus === "SUBMITTING"}>
              {formStatus === "SUBMITTING" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              💸 Sell
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => setFormStatus("INPUT_VISIBLE")}>💸 Sell</Button>
    </div>
  );
}
