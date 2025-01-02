export type Prop = {
  prop: string;
  type: string;
  default: string;
  description: string;
};

type NavigationItem = {
  name: string;
  href: string;
  isNew?: boolean;
  isUpdated?: boolean;
};

type NavigationGroup = {
  name: string;
  children: NavigationItem[];
};

export const NAV_LIST_ITEMS: NavigationGroup[] = [
  {
    name: "Getting started",
    children: [
      {
        name: "Introduction",
        href: "/docs",
      },
      {
        name: "Installation",
        href: "/docs/installation",
      },
      {
        name: "Components",
        href: "/docs/components",
      },
    ],
  },
  {
    name: "Special Effects",
    children: [
      {
        name: "Spotlight",
        href: "/docs/components/spotlight",
        isNew: true,
      },
      {
        name: "Spotlight Card",
        href: "/docs/components/spotlight-card",
        isNew: true,
      },
      {
        name: "Card Border Pulse",
        href: "/docs/components/card-pulse-border",
      },
    ],
  },
];
