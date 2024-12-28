import { NAV_LIST_ITEMS } from "@/data/components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";

export function NavigationDesktop() {
  const pathname = usePathname();
  const activeRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }
  }, [pathname]);

  return (
    <aside className="sticky top-18 hidden h-[calc(100dvh-theme(spacing.16))] w-[240px] xl:w-[266px] px-4 shrink-0 md:block">
      <div className="h-full w-full">
        <nav>
          <ul role="list" className="h-full">
            {NAV_LIST_ITEMS.map((item, index) => {
              return (
                <li key={`${item.name}-${index}`}>
                  <div className="relative z-10 bg-white pb-4 text-sm/6 font-[450] text-zinc-950 dark:bg-background dark:text-white pt-5 w-[100px]">
                    {item.name}
                  </div>
                  <ul
                    role="list"
                    className="space-y-3.5 border-l border-zinc-200 dark:border-border/10 border-dashed"
                  >
                    {item.children.map((child) => {
                      const isActive = pathname === child.href;

                      return (
                        <li key={child.href} ref={isActive ? activeRef : null}>
                          <Link
                            className={cn(
                              "relative inline-flex items-center pl-4 w-full text-sm font-normal text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white",
                              isActive && "text-zinc-950"
                            )}
                            href={child.href}
                            prefetch
                          >
                            {isActive && (
                              <motion.div
                                layout
                                className="absolute -left-[1px] top-0 -z-[1] h-full w-0.5 rounded-[4px] bg-zinc-950 dark:bg-white"
                                transition={{
                                  type: "spring",
                                  stiffness: 26.7,
                                  damping: 4.1,
                                  mass: 0.2,
                                }}
                                layoutId="underline-sidebar"
                              />
                            )}
                            <span>{child.name}</span>
                            {child?.isNew && (
                              <span className="ml-2 whitespace-nowrap rounded-lg bg-emerald-100 px-2 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-50">
                                New
                              </span>
                            )}
                            {child?.isUpdated && (
                              <span className="ml-2 whitespace-nowrap rounded-lg bg-amber-100 px-2 text-[10px] font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-50">
                                Updated
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export function NavigationMobile() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedHref, setSelectedHref] = useState(pathname);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const href = e.target.value;
    setSelectedHref(href);
    router.push(href);
  };

  return (
    <div className="block w-full pt-8 md:hidden">
      <select
        className="block w-full appearance-none rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
        value={selectedHref}
        onChange={handleChange}
      >
        {NAV_LIST_ITEMS.map((item) => {
          return (
            <optgroup label={item.name} key={item.name}>
              {item.children.map((child) => (
                <option key={child.href} value={child.href}>
                  {child.name}
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
}
