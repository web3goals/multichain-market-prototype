import { NftListAccount } from "@/components/nft-list-account";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  return (
    <div className="container py-10 lg:px-80">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground">NFTs you own and can sell</p>
      </div>
      <Separator className="my-6" />
      <NftListAccount />
    </div>
  );
}
