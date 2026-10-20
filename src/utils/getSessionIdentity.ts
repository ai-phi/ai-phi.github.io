import type { CollectionEntry } from "astro:content";
import {
  ARCHIVE_FORMAT_LABELS,
  getArchiveSessionCycle,
  getArchiveSessionFormat,
  getArchiveSessionFormatKeys,
} from "./sessionArchive";

export interface SessionIdentity {
  sessionNumber: number;
  cycle?: string;
  formats: string[];
}

export default function getSessionIdentity(
  session: CollectionEntry<"sessions">
): SessionIdentity {
  const keys = getArchiveSessionFormatKeys(session);
  return {
    sessionNumber: session.data.sessionNumber,
    cycle: getArchiveSessionCycle(session),
    formats:
      keys.length > 1
        ? keys.map(key => ARCHIVE_FORMAT_LABELS[key])
        : [getArchiveSessionFormat(session)],
  };
}
