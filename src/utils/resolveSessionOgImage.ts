import { access } from "node:fs/promises";
import path from "node:path";

const SESSION_OG_BASE_PATH = "/images/og/sessions";
const DEFAULT_SESSION_OG = `${SESSION_OG_BASE_PATH}/session-default.svg`;

const isAbsoluteUrl = (value: string) =>
  value.startsWith("http://") ||
  value.startsWith("https://") ||
  value.startsWith("//");

const normalizeOverride = (override?: string | null) => {
  if (!override) return undefined;
  const trimmed = override.trim();
  if (!trimmed) return undefined;
  if (isAbsoluteUrl(trimmed) || trimmed.startsWith("/")) return trimmed;
  if (trimmed.startsWith("./")) return trimmed.replace(/^\.\//, "/");
  return `/${trimmed.replace(/^\/+/, "")}`;
};

const getCandidateFilePath = (relative: string) => {
  // relative is like "/images/og/sessions/foo.png"
  const rel = relative.replace(/^\/+/, ""); // "images/og/sessions/foo.png"
  return path.join(process.cwd(), "public", rel);
};

export async function resolveSessionOgImage(
  slug: string,
  override?: string | null
): Promise<string> {
  const overridePath = normalizeOverride(override);
  if (overridePath) return overridePath;

  const cleanSlug = slug?.trim();
  if (!cleanSlug) return DEFAULT_SESSION_OG;

  const candidateUrl = `${SESSION_OG_BASE_PATH}/${cleanSlug}.png`;
  try {
    await access(getCandidateFilePath(candidateUrl));
    return candidateUrl;
  } catch {
    return DEFAULT_SESSION_OG;
  }
}
