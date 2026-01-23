import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";

type ContentCollection = "posts" | "sessions";

const getPostsByTag = <T extends CollectionEntry<ContentCollection>>(
  posts: T[],
  tag: string
) =>
  getSortedPosts(
    posts.filter(post => slugifyAll(post.data.tags ?? []).includes(tag))
  );

export default getPostsByTag;
