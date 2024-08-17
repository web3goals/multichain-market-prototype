import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="container flex flex-col items-center py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-center">
        Sell / Buy NFTs and don&apos;t worry about chains
      </h1>
      <h2 className="text-2xl font-normal tracking-tight text-center text-muted-foreground mt-4">
        A multichain marketplace powered by Wormhole
      </h2>
      <div className="flex flex-row gap-2 mt-6">
        <Link href="/explore">
          <Button variant="default">👀 Explore</Button>
        </Link>
        <Link href="/account">
          <Button variant="secondary">💸 Sell</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center max-w-[480px] mt-8">
        <Image
          src="/images/octopus.png"
          alt="Octopus"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full"
        />
      </div>
    </main>
  );
}
