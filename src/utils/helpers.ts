import { Metadata } from "next";

export function absoluteUrl(path: string) {
  return `http://localhost:3000/${path}`;
}

export function constructMetadata({
  title = "Smooth UI - Modern React + Tailwind CSS components & Templates",
  description = "Magic UI is a curated collection of the best landing page components built using React + Tailwind CSS + Framer Motion",
  image = absoluteUrl("/next.svg"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title,
    description,
    keywords: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Landing Page",
      "Components",
      "Next.js",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@JosmarJunior11",
    },
    icons: "/favicon.ico",
    metadataBase: new URL("https://smoothui.design"),
    authors: [
      {
        name: "josmarjr",
        url: "https://x.com/JosmarJunior11",
      },
    ],
    creator: "josmarjunior",
    ...props,
  };
}
