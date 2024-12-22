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
      <div className="absolute hidden mx-auto -z-10 inset-0 h-full w-full max-w-[1400px] grid-cols-5 gap-3.5 group-has-[[data-hide-gridlines=true]]/body:opacity-0 lg:grid">
        <div className="border-dashed border-x border-white/[0.08]" />
        <div className="border-dashed border-x border-white/[0.08] border-r-0" />
        <div className="border-none" />
        <div className="border-dashed border-x border-white/[0.08] border-l-0" />
        <div className="border-dashed border-x border-white/[0.08]" />
      </div>

      <Header />

      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto flex w-full flex-col items-start md:flex-row md:space-x-12">
          <NavigationDesktop />
          <NavigationMobile />
          <main className="prose prose-zinc min-w-0 max-w-full flex-1 pb-16 dark:prose-invert prose-h1:scroll-m-20 prose-h1:text-3xl prose-h1:font-bold prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto pt-4 xl:max-w-3xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
