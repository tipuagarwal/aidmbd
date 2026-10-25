import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { blogCategories, postPage } from "@/content/posts";
import { longDate } from "@/lib/format";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full rounded-xl">
      <Card interactive className="flex h-full flex-col">
        <Badge tone="copper" className="self-start">
          {blogCategories[post.category]}
        </Badge>
        <h3 className="mt-5 text-lg font-semibold leading-snug transition-colors group-hover:text-copper-300">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-titanium-500">{post.excerpt}</p>
        <p className="mt-6 flex flex-wrap gap-x-2 border-t border-line pt-5 text-xs text-titanium-500">
          <span>{post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{longDate.format(new Date(post.publishedAt))}</time>
          <span aria-hidden>·</span>
          <span>{postPage.readingTime(post.readingMinutes)}</span>
        </p>
      </Card>
    </Link>
  );
}
