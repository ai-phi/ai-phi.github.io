import type { ReactElement } from "react";

export default function RSSIcon(): ReactElement {
  return (
    <a
      target="_blank"
      href="/rss.xml"
      className="mb-6"
      aria-label="rss feed"
      title="RSS Feed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-2 h-6 w-6 scale-75 rounded-sm bg-skin-inverted fill-skin-inverted hover:fill-skin-accent sm:mb-3 sm:scale-100"
      >
        <path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z"></path>
        <path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z"></path>
        <circle cx="6" cy="18" r="2"></circle>
      </svg>
    </a>
  );
}
