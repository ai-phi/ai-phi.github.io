import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

interface Keyword {
  tag: string;
  tagName: string;
  count: number;
  category: "general" | "discussion";
}

interface KeywordMap {
  generalCategories: Keyword[];
  randomThemes: Keyword[];
}

// Keywords that should be categorized as "general aspects"
const GENERAL_KEYWORDS = new Set([
  "session",
  "workshop",
  "workshops",
  "announcement",
  "announcements",
  "ai-phi",
  "ai-news",
  "ai-forum",
  "website",
  "intro-to-ai",
  "invited-talk",
  "formal-session",
  "closing",
  "tribute",
  "seminar-series",
  "informal-session",
  "faq",
  "docs",
  "discussion",
  "causerie",
  "other",
]);

// Keywords that should always appear in general keywords
const ALWAYS_INCLUDE_GENERAL = new Set(["seminar-series", "causerie", "other"]);

// Keywords that should be excluded from front page
const EXCLUDED_KEYWORDS = new Set(["job", "xmas", "x-mas", "glossary"]);

// Keywords that should be categorized as "discussion topics"
const DISCUSSION_KEYWORDS = new Set([
  "ethics",
  "emotions",
  "reasoning",
  "machine-learning",
  "agency",
  "ai-safety",
  "alignment",
  "artificial-consciousness",
  "assertion",
  "awareness",
  "deep-learning",
  "delusion",
  "effective-altruism",
  "ethics-of-ai",
  "explainability",
  "fairness",
  "generative-ai",
  "honesty",
  "human-values",
  "lies",
  "llm-innovations",
  "philosophy-of-ai",
  "sequence-models",
  "training-paradigms",
  "understanding",
  "value-aware",
  "pretense",
  "agi",
  "neuroethics",
  "qualia",
  "mechanistic-interpretability",
]);

/**
 * Generates two lists of keywords from blog post tags
 * First list: General categories (always includes Sessions, Seminar Series, Causerie)
 * Second list: Random themes from discussion topics
 * Excludes: job, xmas, x-mas from appearing on front page
 */
const getKeywordMap = (posts: CollectionEntry<"blog">[]): KeywordMap => {
  const filteredPosts = posts.filter(({ data }) => !data.draft);

  // Count tag frequency and preserve original names
  const tagCounts = new Map<string, { count: number; originalName: string }>();

  filteredPosts.forEach(post => {
    post.data.tags.forEach(tag => {
      const slugifiedTag = slugifyStr(tag);
      const existing = tagCounts.get(slugifiedTag);
      if (existing) {
        existing.count += 1;
      } else {
        tagCounts.set(slugifiedTag, { count: 1, originalName: tag });
      }
    });
  });

  // Convert to keyword objects and categorize
  const allKeywords: Keyword[] = Array.from(tagCounts.entries())
    .map(([tag, { count, originalName }]) => ({
      tag,
      tagName: tag === "other" ? "Other" : originalName, // Capitalize 'other' tag, use original name for others
      count,
      category: "general" as const,
    }))
    .filter(
      keyword => keyword.count >= 1 && !EXCLUDED_KEYWORDS.has(keyword.tag)
    ); // Include tags that appear in at least 1 post and exclude specified keywords

  // Categorize keywords
  const generalKeywords: Keyword[] = [];
  const discussionKeywords: Keyword[] = [];

  allKeywords.forEach(keyword => {
    if (GENERAL_KEYWORDS.has(keyword.tag)) {
      generalKeywords.push({ ...keyword, category: "general" });
    } else if (DISCUSSION_KEYWORDS.has(keyword.tag)) {
      discussionKeywords.push({ ...keyword, category: "discussion" });
    } else {
      // // For uncategorized keywords, try to determine category based on content
      // // If it appears frequently, it's likely a discussion topic
      // if (keyword.count >= 2) {
      //   discussionKeywords.push({ ...keyword, category: "discussion" });
      // } else {
      //   generalKeywords.push({ ...keyword, category: "general" });
      // }
    }
  });

  // Randomly select keywords from each category
  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get the always-include general categories in specific order
  const generalCategories = [];

  // Add in specific order: seminar-series, causerie, other
  const orderedTags = ["seminar-series", "causerie", "other"];
  orderedTags.forEach(tag => {
    const keyword = generalKeywords.find(k => k.tag === tag);
    if (keyword) {
      generalCategories.push(keyword);
    }
  });

  // Shuffle discussion keywords for random themes
  const shuffledDiscussion = shuffleArray(discussionKeywords);
  const randomThemes =
    shuffledDiscussion.length >= 6
      ? shuffledDiscussion.slice(0, 6)
      : shuffledDiscussion;

  return {
    generalCategories,
    randomThemes,
  };
};

export default getKeywordMap;
