import { NFTListExplore } from "@/components/nft-list-explore";
import { SupportedChains } from "@/components/supported-chains";
import { Separator } from "@/components/ui/separator";

export default function ExplorePage() {
  return (
    <div className="container py-10 lg:px-80">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Explore</h2>
        <p className="text-muted-foreground">
          NFTs that you can buy using any preferred chain
        </p>
      </div>
      <SupportedChains className="mt-4" />
      <Separator className="my-6" />
      <NFTListExplore />
    </div>
  );
}
