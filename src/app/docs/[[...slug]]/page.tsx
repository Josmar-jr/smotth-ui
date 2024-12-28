import { Mdx } from "@/components/mdx-components";
import { absoluteUrl } from "@/utils/helpers";
import { allDocs } from "content-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "../../../../config/site-config";
import { cn } from "@/utils/cn";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

type tParams = Promise<{ slug: string[] }>;
interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams({ params }: { params: tParams }) {
  const { slug } = await params;
  const formatSlug = slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === formatSlug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.title} | Smooth UI`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: doc.image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [doc.image],
      creator: "@josmarjr",
    },
  };
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: { params: tParams }) {
  const doc = await getDocFromParams({ params });

  if (!doc || !doc.published) {
    notFound();
  }

  return (
    <main className="py-6 w-full max-w-3xl flex-1">
      <Breadcrumbs
        backLink="/docs/components"
        currentPage={doc.title}
        groupName="Components"
      />

      <div className="space-y-1 mt-6">
        <h1 className={cn("scroll-m-10 text-3xl font-bold tracking-tight")}>
          {doc.title}
        </h1>
        {doc.description && (
          <p className="paragraph text-balance">{doc.description}</p>
        )}
      </div>
      <div className="pb-12 pt-8">
        <Mdx code={doc.body.code} />
      </div>
    </main>
  );
}
