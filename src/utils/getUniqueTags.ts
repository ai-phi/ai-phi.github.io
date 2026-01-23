import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

interface Tag {
  tag: string;
  tagName: string;
}

type ContentCollection = "posts" | "sessions";

const getUniqueTags = (posts: CollectionEntry<ContentCollection>[]) => {
  const filteredPosts = posts.filter(({ data }) => !data.draft);
  const tags: Tag[] = filteredPosts
    .flatMap(post => post.data.tags ?? [])
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
