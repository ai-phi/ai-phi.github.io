import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

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
  const fileUrl = new URL(`../../public${relative}`, import.meta.url);
  return fileURLToPath(fileUrl);
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
