import { SITE } from "@config";
import type { ImageMetadata } from "astro";
import { defineCollection, z } from "astro:content";

const TitleShortSchema = z
  .string()
  .min(1)
  .refine(
    value => value.trim().split(/\s+/).filter(Boolean).length <= 6,
    "titleShort must be at most 6 words"
  );

export const Frontmatter = z.object({
  pubDatetime: z.date(),
  modDatetime: z.date().optional().nullable(),
  author: z.string().default(SITE.author),
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().optional(),
  featured: z.boolean().optional(),
  highlight: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]),
  canonicalURL: z.string().optional(),
});
export type Frontmatter = z.infer<typeof Frontmatter>;

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    Frontmatter.extend({
      description: z.string(),
      longDescription: z.string().optional(),
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

const SessionFormatSchema = z.enum([
  "podcast",
  "seminar",
  "causerie",
  "community",
  "workshop",
  "other",
]);

const sessions = defineCollection({
  type: "content",
  schema: () =>
    Frontmatter.extend({
      description: z.string(),
      sessionNumber: z.number(),
      registration: z
        .object({
          nativeEvent: z
            .string()
            .regex(/^session-[0-9]+$/)
            .optional(),
          formUrl: z
            .string()
            .url()
            .refine(value => {
              const url = new URL(value);
              const googleForm =
                url.hostname === "docs.google.com" &&
                /^\/forms\/d\/(?:e\/)?[A-Za-z0-9_-]+\/viewform$/.test(
                  url.pathname
                );
              const airtableForm =
                url.hostname === "airtable.com" &&
                (/^\/app[A-Za-z0-9]{14}\/pag[A-Za-z0-9]{14}\/form$/.test(
                  url.pathname
                ) ||
                  /^\/(?:app[A-Za-z0-9]{14}\/)?shr[A-Za-z0-9]{14}$/.test(
                    url.pathname
                  ));
              return url.protocol === "https:" && (googleForm || airtableForm);
            }, "Use a Google Forms or Airtable responder URL")
            .optional(),
        })
        .optional(),
      youtubeId: z
        .string()
        .regex(/^[A-Za-z0-9_-]{11}$/)
        .optional(),
      titleShort: TitleShortSchema,
      speakers: z
        .array(
          z.object({
            name: z.string().min(1),
            affiliation: z.string().optional(),
          })
        )
        .default([]),
      baseIllustration: z.string().optional(),

      videoTitle: z.string().min(1).optional(),
      videoThumbnail: z.string().min(1).optional(),

      ogImage: z.string().optional(),
      location: z.string().optional(),
      kind: z
        .enum([
          "seminar",
          "causerie",
          "community",
          "workshop",
          "critical-perspectives",
          "other",
        ])
        .default("other"),
      // A theme (series) and an event format are independent dimensions.
      formats: z.array(SessionFormatSchema).min(1).optional(),
      // Compatibility with entries using the original single-format field.
      format: SessionFormatSchema.optional(),
      series: z.string().optional(),
      formatLabel: z.string().min(1).optional(),
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
