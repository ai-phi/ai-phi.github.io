import { visit } from "unist-util-visit";

/**
 * Remark plugin to process PDF embed comments
 * Converts <!-- PDF: filename.pdf | title: Title | type: slides --> to HTML
 */
export function remarkPdfEmbed() {
  return function transformer(tree) {
    visit(tree, "html", node => {
      const pdfRegex =
        /<!--\s*PDF:\s*([^|]+?)(?:\s*\|\s*title:\s*([^|]+?))?(?:\s*\|\s*type:\s*([^|]+?))?\s*-->/;
      const match = node.value.match(pdfRegex);

      if (match) {
        const filename = match[1].trim();
        const title = match[2] ? match[2].trim() : null;
        const type = match[3] ? match[3].trim() : "seminar";

        const pdfPath = `/pdfs/${filename}`;
        const displayTitle =
          title || filename.replace(/\.pdf$/, "").replace(/-/g, " ");

        node.value = `<div class="blog-pdf-card">
  <div class="pdf-viewer-container">
    <div class="pdf-viewer">
      <iframe 
        src="${pdfPath}#toolbar=0&navpanes=0"
        width="100%"
              height="400"
        class="pdf-iframe"
        title="${displayTitle}"
        style="border: none; height: 400px;"
      >
        <div class="pdf-fallback">
          <p>Your browser doesn't support PDF viewing.</p>
          <a href="${pdfPath}" download class="pdf-download-btn">📄 Download PDF</a>
        </div>
      </iframe>
    </div>
  </div>
  <div class="blog-pdf-footer">
    <div class="blog-pdf-info">
      ${title ? `<div class="blog-pdf-title">${displayTitle}</div>` : ""}
    </div>
    <div class="blog-pdf-download">
      <a href="${pdfPath}" download="${filename}" class="download-btn">📄 Download PDF</a>
    </div>
  </div>
</div>`;
      }
    });
  };
}
