"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easeBrand } from "@/components/motion/easing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FilterPills } from "@/components/ui/FilterPills";
import { blogCategories, blogPage as copy } from "@/content/posts";
import type { BlogCategory, Post } from "@/lib/types";
import { PostCard } from "./PostCard";

type Filter = "all" | BlogCategory;

const options: Array<{ value: Filter; label: string }> = [
  { value: "all", label: copy.all },
  ...(Object.keys(blogCategories) as BlogCategory[]).map((category) => ({ value: category, label: blogCategories[category] })),
];

/** Category filter and article grid. The filter is component state, so the page stays static. */
export function BlogCatalog({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<Filter>("all");
  const shown = posts.filter((post) => category === "all" || post.category === category);

  return (
    <>
      <FilterPills name="blog-category" legend={copy.filterLegend} options={options} value={category} onChange={setCategory} />
      <p aria-live="polite" className="mt-8 text-sm text-titanium-500">
        {copy.count(shown.length)}
      </p>

      {shown.length > 0 ? (
        <ul className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((post) => (
              <motion.li
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: easeBrand }}
              >
                <PostCard post={post} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <Card className="mt-5 flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-titanium-300">{copy.empty}</p>
          <Button variant="outline" onClick={() => setCategory("all")}>
            {copy.reset}
          </Button>
        </Card>
      )}
    </>
  );
}
