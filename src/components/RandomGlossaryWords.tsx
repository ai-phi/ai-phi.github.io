import { getCollection } from "astro:content";
import { Fragment, useEffect, useState } from "react";
import sampleSize from "lodash/sampleSize";

import type { ReactElement } from "react";
import clsx from "clsx";

const allGlossaryItems = await getCollection("glossary");
const allGlossaryTitlesAndSlugs = allGlossaryItems.map(collectionItem => ({
  title: collectionItem.data.title,
  slug: collectionItem.slug,
}));

const numWords = 4;

const defaultSample = sampleSize(allGlossaryTitlesAndSlugs, numWords);

/**
 * picks `numWords` at random from the Glossary and displays them as a list of
 * keywords
 */
export default function RandomGlossaryWords(props: {}): ReactElement {
  const [isRendered, setIsRendered] = useState(false);
  const [glossaryEntries, setGlossaryEntries] =
    useState<{ title: string; slug: string }[]>(defaultSample);

  useEffect(() => {
    setGlossaryEntries(sampleSize(allGlossaryTitlesAndSlugs, numWords));
    setIsRendered(true);
  }, []);

  return (
    <>
      {glossaryEntries.map(({ title, slug }, i) => (
        <span key={slug}>
          <span className="text-nowrap">
            <a
              className={clsx(
                "inline-block whitespace-nowrap font-light italic text-skin-accent decoration-dashed underline-offset-4 hover:underline focus-visible:no-underline focus-visible:underline-offset-0",
                !isRendered && "opacity-30"
              )}
              href={`/glossary/${slug}`}
            >
              {title}
            </a>
            {i < glossaryEntries.length - 1 && ","}
          </span>
          {i < glossaryEntries.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
