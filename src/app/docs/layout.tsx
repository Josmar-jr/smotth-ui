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
      <div className="absolute xl:grid hidden mx-auto -z-10 inset-0 h-full w-full max-w-[1400px] grid-cols-5 gap-3.5 group-has-[[data-hide-gridlines=true]]/body:opacity-0">
        <div className="border-dashed border-x border-white/[0.08]" />
        <div className="border-dashed border-x border-white/[0.08] border-r-0" />
        <div className="border-none" />
        <div className="border-dashed border-x border-white/[0.08] border-l-0" />
        <div className="border-dashed border-x border-white/[0.08]" />
      </div>

      <Header />

      <div className="mx-auto flex w-full flex-col lg:grid max-w-[1400px] grid-cols-5 gap-3.5 px-6 lg:px-0">
        <NavigationDesktop />

        <NavigationMobile />
        <main className="py-6 lg:pl-12 lg:pr-14 w-full max-w-4xl flex-1 lg:col-span-4 xl:col-span-3">
          {children}
        </main>
      </div>
    </div>
  );
}
