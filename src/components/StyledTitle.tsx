import clsx from "clsx";
import type { ReactElement } from "react";

export default function StyledTitle({
  className,
  href,
  insertExpansions,
  phiTranslateAmount,
}: {
  className?: string;
  insertExpansions?: boolean;
  href?: string;
  phiTranslateAmount?: string;
}): ReactElement {
  return (
    <a className={clsx("select-none whitespace-nowrap", className)} href={href}>
      <span className="inline-flex flex-col place-items-center text-skin-brand">
        <span className="font-mono font-black">AI</span>
        {insertExpansions && (
          <>
            <span className="text-xs font-extralight">Artificial</span>
            <span className="text-xs font-extralight">Intelligence</span>
          </>
        )}
      </span>
      <span
        // HACK(@theis, 2023/12/04): is there a cleaner way than -translate-x-4 + -mr-4 to reduce inter-word-space?
        className={clsx(
          "inline-flex flex-col place-items-center text-skin-secondary-brand",
          phiTranslateAmount
        )}
      >
        {insertExpansions && (
          <span className="absolute translate-y-[-2ex] text-xs font-extralight">
            Philosophy
          </span>
        )}
        <span className="font-mono font-light italic">Phi</span>
      </span>
    </a>
  );
}
