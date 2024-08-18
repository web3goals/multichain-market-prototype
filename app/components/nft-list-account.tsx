"use client";

import useError from "@/hooks/useError";
import { getNFTsForOwner, NFT } from "@/lib/nfts";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import EntityList from "./entity-list";
import { NFTCard } from "./nft-card";

export function NFTListAccount() {
  const { handleError } = useError();
  const [nfts, setNfts] = useState<NFT[] | undefined>();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      getNFTsForOwner(address)
        .then((nfts) => setNfts(nfts))
        .catch((error) => handleError(error, true));
    } else {
      setNfts(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <EntityList
      entities={nfts}
      renderEntityCard={(nft, index) => <NFTCard key={index} nft={nft} />}
      noEntitiesText={`No NFTs 😐`}
    />
  );
}
