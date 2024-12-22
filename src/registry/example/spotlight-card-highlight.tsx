import Image from "next/image";
import random from "@/assets/random-img.jpg";

import { SpotlightCard } from "../smooth-ui/spotlight-card";

export default function SpotlightCardHighlight() {
  return (
    <SpotlightCard
      mode="after"
      color="rgba(255,255,255,0.20)"
      size={400}
      className="group flex-col items-center p-2 
      h-[360px] w-64 rounded-xl border border-zinc-100 z-20 dark:border-border/10 dark:bg-black cursor-pointer flex shadow-2xl"
    >
      <Image
        className="absolute inset-0 h-64 w-64 scale-150 rounded-xl object-cover blur-xl grayscale saturate-50 transition-all duration-300 group-hover:blur-[32px] group-hover:grayscale-0"
        src={random}
        alt="Smooth's logo"
      />

      <Image
        className="relative h-64 w-64 rounded-xl object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
        src={random}
        alt="Smooth's logo"
      />

      <div className="mt-4 px-2">
        <span className="font-medium text-white">Fulaninho Silva</span>

        <p className="text-white/75">Front End</p>
      </div>
    </SpotlightCard>
  );
}
