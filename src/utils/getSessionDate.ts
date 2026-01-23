import type { CollectionEntry } from "astro:content";

type SessionEntry = CollectionEntry<"sessions">;
type SessionData = SessionEntry["data"] & { date?: string | Date };

const getSessionDate = (entry: SessionEntry) => {
  const data = entry.data as SessionData;
  return data.date ?? data.pubDatetime;
};

export default getSessionDate;
