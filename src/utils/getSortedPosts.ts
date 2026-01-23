import type { CollectionEntry } from "astro:content";

type ContentCollection = "posts" | "sessions";
type ContentEntry = CollectionEntry<ContentCollection>;

const getUpdatedTimestamp = (entry: ContentEntry) =>
  Math.floor(
    new Date(
      (entry.data.modDatetime ?? entry.data.pubDatetime) as Date
    ).getTime() / 1000
  );

const getPublishedTimestamp = (entry: ContentEntry) =>
  new Date(entry.data.pubDatetime as Date).getTime();

const getSortedPosts = <T extends ContentEntry>(posts: T[]) => {
  return posts
    .filter(({ data }) => !data.draft)
    .sort((a, b) => getUpdatedTimestamp(b) - getUpdatedTimestamp(a));
};

export const getSortedGlossaryTerms = (
  entries: CollectionEntry<"glossary">[]
) =>
  entries
    .filter(({ data }) => !data.draft)
    .sort(({ data: dataA }, { data: dataB }) => {
      return dataA.title < dataB.title ? -1 : 1;
    });

export default getSortedPosts;

export const getSortedByDateAsc = <T extends ContentEntry>(posts: T[]) => {
  return posts
    .filter(({ data }) => !data.draft)
    .sort((a, b) => getPublishedTimestamp(a) - getPublishedTimestamp(b));
};

export const getSortedByDateDesc = <T extends ContentEntry>(posts: T[]) => {
  return posts
    .filter(({ data }) => !data.draft)
    .sort((a, b) => getPublishedTimestamp(b) - getPublishedTimestamp(a));
};
