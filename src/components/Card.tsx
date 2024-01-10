import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { Frontmatter } from "@content/config";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

export interface Props {
  className?: string;
  frontmatter: Frontmatter;
  hideDatetime?: boolean;
  href?: string;
  secHeading?: boolean;
}

export default function Card({
  className,
  children,
  href,
  hideDatetime,
  frontmatter,
  secHeading = true,
}: PropsWithChildren<Props>) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
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
          <span className="text-lg font-black text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0">
            {secHeading ? (
              <h2 {...headerProps}>{title}</h2>
            ) : (
              <h3 {...headerProps}>{title}</h3>
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
