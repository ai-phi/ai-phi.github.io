import { slugifyStr } from "@utils/slugify";
import getSessionKindLabel from "@utils/getSessionKindLabel";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

type CardCollections = "posts" | "sessions" | "glossary";
type CardFrontmatter = CollectionEntry<CardCollections>["data"];
type SessionFrontmatter = CollectionEntry<"sessions">["data"];
type SessionSpeaker = { name: string; affiliation?: string };

export interface Props {
  className?: string;
  frontmatter: CardFrontmatter;
  hideDatetime?: boolean;
  href?: string;
  secHeading?: boolean;
}

const isSessionFrontmatter = (
  data: CardFrontmatter
): data is SessionFrontmatter =>
  "sessionNumber" in data && typeof data.sessionNumber === "number";

const formatSingleSpeaker = (speaker?: SessionSpeaker) => {
  if (!speaker || !speaker.name) return null;
  return speaker.affiliation
    ? `${speaker.name} (${speaker.affiliation})`
    : speaker.name;
};

const formatSpeakers = (speakers?: SessionSpeaker[]) => {
  if (!speakers || speakers.length === 0) return "AI-Phi";
  const formatted = speakers
    .map(formatSingleSpeaker)
    .filter(Boolean) as string[];
  if (!formatted.length) return "AI-Phi";
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} & ${formatted[1]}`;
  return `${formatted.slice(0, -1).join(", ")} & ${
    formatted[formatted.length - 1]
  }`;
};

export default function Card({
  className,
  children,
  href,
  hideDatetime,
  frontmatter,
  secHeading = true,
}: PropsWithChildren<Props>) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;
  const sessionData = isSessionFrontmatter(frontmatter)
    ? {
        number: frontmatter.sessionNumber,
        kindLabel: getSessionKindLabel(frontmatter.kind),
        speakers: frontmatter.speakers,
        heading: frontmatter.titleShort ?? title,
      }
    : null;
  const displayTitle =
    sessionData && sessionData.heading ? sessionData.heading : title;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(displayTitle) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li>
      <a href={href}>
        <div
          className={clsx(
            "my-6",
            !secHeading && "flex-row",
            className,
            "outline-2 outline-skin-fill/80 focus-within:outline-dashed",
            "rounded-sm bg-skin-card/10 px-4 py-4"
          )}
        >
          {sessionData && (
            <div className="mb-2 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-skin-base opacity-80">
                {`Session ${sessionData.number}`}
                <span aria-hidden="true"> · </span>
                {sessionData.kindLabel}
              </p>
              <p className="text-sm font-medium text-skin-base opacity-80">
                {formatSpeakers(sessionData.speakers)}
              </p>
            </div>
          )}

          <span className="text-lg font-black text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0">
            {secHeading ? (
              <h2 {...headerProps}>{displayTitle}</h2>
            ) : (
              <h3 {...headerProps}>{displayTitle}</h3>
            )}
          </span>

          {!hideDatetime && (
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
          )}

          {description != null && <p className="font-normal">{description}</p>}
          {children}
        </div>
      </a>
    </li>
  );
}
