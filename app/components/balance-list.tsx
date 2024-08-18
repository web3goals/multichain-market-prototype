"use client";

import { chainConfigs } from "@/config/chains";
import { BalanceCard } from "./balance-card";
import EntityList from "./entity-list";

export function BalanceList() {
  return (
    <EntityList
      entities={Object.values(chainConfigs)}
      renderEntityCard={(chainConfig, index) => (
        <BalanceCard key={index} chainConfig={chainConfig} />
      )}
      noEntitiesText={`No balances 😐`}
    />
  );
}
