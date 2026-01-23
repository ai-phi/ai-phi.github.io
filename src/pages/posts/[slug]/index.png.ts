import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";

type ContentCollection = "posts" | "sessions";

export async function getStaticPaths() {
  const [posts, sessions] = await Promise.all([
    getCollection("posts"),
    getCollection("sessions"),
  ]);

  const entries = [...posts, ...sessions].filter(
    ({ data }) => !data.draft && !data.ogImage
  );

  return entries.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(
    await generateOgImageForPost(props as CollectionEntry<ContentCollection>),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
