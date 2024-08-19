import { Bridge } from "@/components/bridge";
import { Separator } from "@/components/ui/separator";

export default function BridgePage() {
  return (
    <div className="container py-10 lg:px-64">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Bridge</h2>
        <p className="text-muted-foreground">
          Move your income to a preferred chain in a few clicks
        </p>
      </div>
      <Separator className="my-6" />
      <Bridge />
    </div>
  );
}
