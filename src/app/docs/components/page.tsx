import { Separator } from "@/components/ui/separator";

export default function Components() {
  return (
    <main className="py-6 w-full max-w-3xl flex-1">
      <article className="flex h-full flex-col pb-10 pt-10">
        <h2 className="font-heading scroll-m-20 pb-2 text-xl font-semibold tracking-tight">
          Features
        </h2>
        <Separator />
      </article>
    </main>
  );
}
