import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

export const Frontmatter = z.object({
  pubDatetime: z.date(),
  modDatetime: z.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional(),
});
export type Frontmatter = z.infer<typeof Frontmatter>;

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    Frontmatter.extend({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      canonicalURL: z.string().optional(),
    }),
});

const glossary = defineCollection({
  type: "content",
  schema: ({ image }) =>
    Frontmatter.extend({
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      canonicalURL: z.string().optional(),
    }),
});

export const collections = { blog, glossary };
