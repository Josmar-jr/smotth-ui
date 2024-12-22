import Image from "next/image";
import logo from "@/assets/logo.svg";
import { SpotlightCard } from "@/registry/smooth-ui/spotlight-card";

export default function SpotlightCardBorder() {
  return (
    <SpotlightCard
      isAround
      from="#4ade80"
      via="#3b82f6"
      size={300}
      className="relative aspect-video h-[300px] w-[400px] rounded-xl bg-border/10 cursor-pointer flex flex-col shadow-2xl whitespace-nowrap text-4xl"
    >
      <div className="mx-auto size-[inherit] flex justify-center items-center">
        <Image src={logo} alt="Smooth's logo" />
      </div>
    </SpotlightCard>
  );
}
