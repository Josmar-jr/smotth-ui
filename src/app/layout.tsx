import "@/styles/globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/utils/cn";
import { constructMetadata } from "@/utils/helpers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = constructMetadata({
  title: "Smooth UI",
  description:
    "Beautiful UI components and templates to make your landing page look stunning.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "overflow-x-hidden bg-background font-sans text-foreground antialiased outline-none steps step",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <div className="isolate min-h-screen">{children}</div>
      </body>
    </html>
  );
}
