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
    ],
  },
  {
    name: "Special Effects",
    children: [
      {
        name: "Spotlight",
        href: "/docs/components/spotlight",
      },
      {
        name: "Spotlight Card",
        href: "/docs/components/spotlight-card",
      },
    ],
  },
];