"use client";

import { Header } from "@/components/header";
import { NavigationDesktop, NavigationMobile } from "@/components/sidebar-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="absolute lg:grid hidden mx-auto -z-10 inset-0 h-full w-full max-w-[1400px] grid-cols-5 gap-3.5 group-has-[[data-hide-gridlines=true]]/body:opacity-0">
        <div className="border-dashed border-x border-white/[0.08]" />
        <div className="border-dashed border-x border-white/[0.08] border-r-0" />
        <div className="border-none" />
        <div className="border-dashed border-x border-white/[0.08] border-l-0" />
        <div className="border-dashed border-x border-white/[0.08]" />
      </div>

      <Header />

      <div className="mx-auto max-w-[1400px] px-6 md:px-0">
        <div className="mx-auto flex w-full flex-col items-start md:flex-row lg:space-x-12">
          <NavigationDesktop />

          <NavigationMobile />

          {children}
        </div>
      </div>
    </div>
  );
}
