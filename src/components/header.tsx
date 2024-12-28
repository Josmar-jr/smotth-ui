"use client";

import Link from "next/link";

import logo from "@/assets/logo.svg";

import { Icons } from "./icons";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[4rem] w-full bg-background">
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-6 border-b border-dashed border-white/[0.08] px-4 xl:border-x border-t-0">
        <div className="flex items-end gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-semibold text-lg"
          >
            <Image src={logo} alt="Smooth's logo" />
            Smooth UI
          </Link>
        </div>
        <div
          // delay={0.2}
          className="flex flex-1 items-center justify-end gap-4"
        >
          {/* <button
            // onClick={() => setShowCommandMenu(true)}
            className="flex w-auto items-center justify-between gap-6 rounded-lg border border-border/10 bg-grey-800 px-3 py-[7px] text-xs max-sm:flex-1 sm:w-64"
          >
            <span className="flex items-center gap-2 text-grey-300">
              <SearchIcon size={14} />
              Search documentation...
            </span>
            <span className="flex items-center gap-px rounded border border-border/20 bg-grey-800 px-1.5 py-[1px] text-[10px] font-[460] max-sm:hidden text-grey-300">
              <CommandIcon size={10} />K
            </span>
          </button> */}
          <a
            href="https://github.com/guhrodrrigues/luxe"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md duration-150 hover:text-primary"
          >
            <Icons.github className="h-4 w-4 fill-white" />
          </a>
          <a
            href="https://x.com/guhrodrrigues"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md duration-150 hover:text-primary"
          >
            <Icons.twitter className="h-3.5 w-3.5 fill-white" />
          </a>
        </div>
      </nav>
    </header>
  );
}
