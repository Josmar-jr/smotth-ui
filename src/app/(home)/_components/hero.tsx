"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import Image from "next/image";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { Spotlight } from "@/registry/smooth-ui/spotlight";

const pathVariants: Variants = {
  normal: { d: "M5 12h0", opacity: 0 },
  animate: {
    d: ["M5 12h0", "M5 12h14"],
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const secondaryPathVariants: Variants = {
  normal: { translateX: -3 },
  animate: {
    translateX: [-3, 0],
    transition: {
      duration: 0.3,
    },
  },
};

const techs = [
  {
    icon: <Icons.nextjs />,
    name: "Next.js",
  },
  {
    icon: <Icons.react />,
    name: "React",
  },
  {
    icon: <Icons.tailwind />,
    name: "Tailwind CSS",
  },
  {
    icon: <Icons.motion />,
    name: "Motion",
  },
];

export function Hero() {
  const controls = useAnimation();

  return (
    <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] lg:px-8 xl:max-w-[80rem] text-center">
      <Spotlight
        fill="#c7d2fe"
        opacity=".15"
        className="-top-40 left-0 md:left-20 md:-top-30 h-[280%] lg:w-[200%] animate-none opacity-100 translate-x-[-50%] translate-y-[-40%]"
      />

      <Link
        href="/"
        className="inline-flex items-center gap-2 font-display font-semibold text-lg pb-10"
      >
        <Image src={logo} alt="Smooth's logo" />
        Smooth UI
      </Link>

      <h1 className="text-center font-display text-4xl font-medium leading-[1.125] lg:text-5xl">
        Transform your websites <br />
        into <span className="text-indigo-300">masterpieces</span>.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl font-[500] paragraph">
        Copy, customize, and create extraordinary UIs effortlessly with our
        premium React components. No stress, just stunning results in minutes.
      </p>

      <div className="my-4 flex items-center justify-center">
        <ul className="mx-auto mt-6 flex max-w-full flex-wrap items-center justify-center gap-y-2 text-[var(--ds-gray-alpha-900)] sm:mx-0 sm:mt-0 sm:max-w-none sm:flex-auto md:gap-4 xl:gap-x-7">
          {techs.map((tech) => (
            <li
              key={tech.name}
              className="flex items-center gap-2 text-grey-200"
            >
              {tech.icon}
              <span className="text-xs font-semibold md:text-sm">
                {tech.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-center gap-4">
        <Button
          asChild
          onMouseEnter={() => controls.start("animate")}
          onMouseLeave={() => controls.start("normal")}
          className="relative"
        >
          <Link href="/docs">
            Explore Docs{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M5 12h0"
                opacity={0}
                variants={pathVariants}
                animate={controls}
              />
              <motion.path
                d="m12 5 7 7-7 7"
                variants={secondaryPathVariants}
                animate={controls}
              />
            </svg>
            <div className="absolute inset-0 flex h-full w-full justify-center animate-brightness">
              <div className="h-full w-8 bg-white/50 blur" />
            </div>
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a
            href="https://x.com/josmarjunior11"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on <Icons.twitter className="!size-3" />
          </a>
        </Button>
      </div>
    </div>
  );
}
