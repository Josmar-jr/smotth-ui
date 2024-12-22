import { SpotlightCard } from "@/registry/smooth-ui/spotlight-card";
import Image from "next/image";
import logo from "@/assets/logo.svg";

export default function Home() {
  return (
    <div>
      <SpotlightCard className="relative aspect-video h-[200px] w-[300px] rounded-xl border border-zinc-100 bg-white dark:border-border/10 dark:bg-background cursor-pointer flex flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl">
        <Image src={logo} alt="Smooth's logo" />
      </SpotlightCard>
    </div>
  );
}
