import { chainConfigs } from "@/config/chains";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function SupportedChains(props: { className?: ClassValue }) {
  const supportedChains = Object.values(chainConfigs).map(
    (chainConfig) => chainConfig.chain.name
  );

  return (
    <Alert className={cn("bg-secondary", props.className)}>
      <InfoIcon className="h-4 w-4" />
      {/* <AlertTitle>Supported chains</AlertTitle> */}
      <AlertDescription className="text-muted-foreground">
        <span className="font-bold">Supported chains:</span>{" "}
        {supportedChains.join(", ")}
      </AlertDescription>
    </Alert>
  );
  return (
    <div className={cn(props.className)}>
      Supported Chains:{" "}
      {Object.values(chainConfigs).map((chainConfig) => chainConfig.chain.name)}
    </div>
  );
}
