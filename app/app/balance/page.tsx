import { BalanceList } from "@/components/balance-list";
import { Separator } from "@/components/ui/separator";

export default function BalancePage() {
  return (
    <div className="container py-10 lg:px-80">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Balance</h2>
        <p className="text-muted-foreground">
          Income you made by selling your NFTs
        </p>
      </div>
      <Separator className="my-6" />
      <BalanceList />
    </div>
  );
}
