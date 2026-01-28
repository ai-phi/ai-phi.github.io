import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "src", "content");

const collectionDirs = {
  posts: path.join(contentDir, "posts"),
  sessions: path.join(contentDir, "sessions"),
};

const globPatterns = {
  posts: path.join(collectionDirs.posts, "**/*.{md,mdx}"),
  sessions: path.join(collectionDirs.sessions, "**/*.{md,mdx}"),
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Paris",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const parseDateTime = value => {
  if (!value) return { date: null, time: null, sortValue: null };
  const dateValue =
    value instanceof Date ? value : new Date(typeof value === "string" ? value : String(value));
  if (Number.isNaN(dateValue.getTime())) return { date: null, time: null, sortValue: null };

  const formatParts = dateFormatter.formatToParts(dateValue);
  const timeParts = timeFormatter.formatToParts(dateValue);

const getPart = (parts, type) => {
  const entry = parts.find(part => part.type === type);
  return entry && entry.value ? entry.value : "";
};

const date = `${getPart(formatParts, "year")}-${getPart(
    formatParts,
    "month"
  )}-${getPart(formatParts, "day")}`;
const hour = getPart(timeParts, "hour");
const minute = getPart(timeParts, "minute");
  const time =
    hour && minute
      ? `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`
      : null;

  return {
    date,
    time,
    sortValue: dateValue.getTime(),
  };
};

const normalizePathValue = value => {
  if (!value) return null;
  if (typeof value === "string") return value.trim() || null;
  if (value && typeof value === "object" && typeof value.src === "string") {
    return value.src;
  }
  return null;
};

const deriveSlugFromPath = (filePath, baseDir) => {
  const relativePath = path.relative(baseDir, filePath);
  const noExt = relativePath.replace(path.extname(relativePath), "");
  return noExt.split(path.sep).map(segment => segment.trim()).join("/");
};

const toSpeakerArray = raw => {
  const toEntry = value => {
    if (!value) return null;
    if (typeof value === "string") {
      const name = value.trim();
      if (!name) return null;
      return { name, affiliation: null };
    }
    if (typeof value === "object") {
      const name =
        value.name ||
        value.fullName ||
        value.title ||
        (typeof value === "string" ? value : null);
      if (!name) return null;
      const affiliation =
        value.affiliation ||
        value.affiliations ||
        value.organization ||
        value.org ||
        null;
      const trimmedName = String(name).trim();
      if (!trimmedName) return null;
      const affTrimmed = affiliation ? String(affiliation).trim() : "";
      return { name: trimmedName, affiliation: affTrimmed || null };
    }
    return null;
  };
  if (!raw) return [{ name: "AI-Phi", affiliation: null }];
  if (typeof raw === "string" || (raw && typeof raw === "object" && !Array.isArray(raw))) {
    const entry = toEntry(raw);
    return entry ? [entry] : [{ name: "AI-Phi", affiliation: null }];
  }
  if (Array.isArray(raw)) {
    const entries = raw.map(toEntry).filter(Boolean);
    if (!entries.length) return [{ name: "AI-Phi", affiliation: null }];
    return entries;
  }
  return [{ name: String(raw), affiliation: null }];
};

const extractSessionNumber = (data, slug) => {
  if (typeof data.sessionNumber === "number") return data.sessionNumber;
  if (typeof data.sessionNumber === "string" && data.sessionNumber.trim()) {
    const asNumber = Number.parseInt(data.sessionNumber, 10);
    if (!Number.isNaN(asNumber)) return asNumber;
  }
  const fromTitle = typeof data.title === "string" ? data.title.match(/Session\s+(\d+)/i) : null;
  if (fromTitle) return Number.parseInt(fromTitle[1], 10);
  if (slug) {
    const slugMatch = slug.match(/session-?(\d+)/i);
    if (slugMatch) return Number.parseInt(slugMatch[1], 10);
  }
  return null;
};

const readSiteBaseUrl = async () => {
  const configPath = path.join(rootDir, "src", "config.ts");
  try {
    const content = await fs.readFile(configPath, "utf8");
    const match = content.match(/website:\s*["'`](.+?)["'`]/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

const readEntries = async (type, globPattern, baseDir) => {
  const files = await fg(globPattern, { dot: false });
  const entries = [];
  let skippedDrafts = 0;
  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const { data } = matter(raw);
    if (data && data.draft) {
      skippedDrafts += 1;
      continue;
    }
    const slug = data.slug ?? deriveSlugFromPath(file, baseDir);
    if (type === "sessions") {
      const { date, time, sortValue } = parseDateTime(data.pubDatetime ?? data.date ?? null);
      const speakers = toSpeakerArray(data.speakers ?? data.speaker);
      entries.push({
        slug,
        sessionNumber: extractSessionNumber(data, slug),
        kind: data.kind ?? null,
        title: data.title ?? slug,
        date,
        time,
        location: data.location ?? null,
        baseIllustration:
          typeof data.baseIllustration === "string" && data.baseIllustration.trim().length
            ? data.baseIllustration.trim()
            : null,
        speakers: speakers.length
          ? speakers
          : [{ name: "AI-Phi", affiliation: null }],
        _sort: {
          sessionNumber: extractSessionNumber(data, slug),
          dateValue: sortValue,
          slug,
        },
      });
      continue;
    }
    if (type === "posts") {
      const { sortValue } = parseDateTime(data.pubDatetime ?? data.date ?? null);
      entries.push({
        slug,
        title: data.title ?? slug,
        kind: data.kind ?? null,
        subtitle: data.subtitle ?? data.description ?? null,
        illustration: normalizePathValue(
          data.illustration ?? data.image ?? data.coverImage ?? data.ogImage
        ),
        _sort: {
          dateValue: sortValue,
          slug,
        },
      });
    }
  }
  return { entries, skippedDrafts };
};

const sortSessions = sessions =>
  sessions.sort((a, b) => {
    const aNumber = a._sort.sessionNumber;
    const bNumber = b._sort.sessionNumber;
    if (aNumber != null && bNumber != null && aNumber !== bNumber) {
      return bNumber - aNumber;
    }
    const aDate = a._sort.dateValue ?? 0;
    const bDate = b._sort.dateValue ?? 0;
    if (aDate !== bDate) return bDate - aDate;
    return a._sort.slug.localeCompare(b._sort.slug);
  });

const sortPosts = posts =>
  posts.sort((a, b) => {
    const aDate = a._sort.dateValue ?? 0;
    const bDate = b._sort.dateValue ?? 0;
    if (aDate !== bDate) return bDate - aDate;
    return a._sort.slug.localeCompare(b._sort.slug);
  });

const createManifest = async () => {
  const [sessionsResult, postsResult] = await Promise.all([
    readEntries("sessions", globPatterns.sessions, collectionDirs.sessions),
    readEntries("posts", globPatterns.posts, collectionDirs.posts),
  ]);

  const sessions = sortSessions(sessionsResult.entries).map(({ _sort, ...rest }) => rest);
  const posts = sortPosts(postsResult.entries).map(({ _sort, ...rest }) => rest);

  const siteBaseUrl = await readSiteBaseUrl();

  const manifest = {
    meta: {
      version: "1.0",
      generatedAt: new Date().toISOString(),
      project: "AI-Phi",
      siteBaseUrl: siteBaseUrl ?? null,
    },
    sessions,
    posts,
  };

  const outputPath = path.join(rootDir, "public", "manifest.json");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log(
    `Manifest generated: ${sessions.length} sessions (+${sessionsResult.skippedDrafts} drafts skipped), ${posts.length} posts (+${postsResult.skippedDrafts} drafts skipped)`
  );
};

createManifest().catch(error => {
  console.error("Failed to generate manifest:", error);
  process.exitCode = 1;
});
