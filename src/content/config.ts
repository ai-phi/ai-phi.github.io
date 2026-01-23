import { SITE } from "@config";
import type { ImageMetadata } from "astro";
import { defineCollection, z } from "astro:content";

export const Frontmatter = z.object({
  pubDatetime: z.date(),
  modDatetime: z.date().optional().nullable(),
  author: z.string().default(SITE.author),
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]),
  canonicalURL: z.string().optional(),
  nextSession: z.boolean().optional(),
  nextFormal: z.boolean().optional(),
});
export type Frontmatter = z.infer<typeof Frontmatter>;

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    Frontmatter.extend({
      description: z.string(),
      ogImage: image()
        .refine(
          (img: ImageMetadata) => img.width >= 1200 && img.height >= 630,
          {
            message: "OpenGraph image must be at least 1200 X 630 pixels!",
          }
        )
        .or(z.string())
        .optional(),
    }).passthrough(),
});

const sessions = defineCollection({
  type: "content",
  schema: ({ image }) =>
    Frontmatter.extend({
      description: z.string(),
      ogImage: image()
        .refine(
          (img: ImageMetadata) => img.width >= 1200 && img.height >= 630,
          {
            message: "OpenGraph image must be at least 1200 X 630 pixels!",
          }
        )
        .or(z.string())
        .optional(),
      speakers: z.array(z.string()).optional(),
      location: z.string().optional(),
      kind: z
        .enum(["seminar", "causerie", "community", "workshop", "other"])
        .default("other"),
      series: z.string().optional(),
    }).passthrough(),
});

const glossary = defineCollection({
  type: "content",
  schema: () =>
    Frontmatter.extend({
      ogImage: z.undefined(),
    }),
});

export const collections = { posts, sessions, glossary };
