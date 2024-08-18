"use client";

import useError from "@/hooks/useError";
import { getNFTsForSale, NFT } from "@/lib/nfts";
import { useEffect, useState } from "react";
import EntityList from "./entity-list";
import { NFTCard } from "./nft-card";

export function NFTListExplore() {
  const { handleError } = useError();
  const [nfts, setNfts] = useState<NFT[] | undefined>();

  useEffect(() => {
    getNFTsForSale()
      .then((nfts) => setNfts(nfts))
      .catch((error) => handleError(error, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EntityList
      entities={nfts}
      renderEntityCard={(nft, index) => <NFTCard key={index} nft={nft} />}
      noEntitiesText={`No NFTs 😐`}
    />
  );
}
