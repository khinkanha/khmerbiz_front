import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Render AI chat replies as Markdown: GFM + single-newline line breaks so the
// step-by-step structure (headings, bold, numbered lists) displays cleanly.
marked.setOptions({ breaks: true, gfm: true });

export const useMarkdown = () => {
  const renderMarkdown = (md: string | undefined | null): string => {
    if (!md) return '';
    const rawHtml = marked.parse(md, { async: false }) as string;
    // DOMPurify needs a DOM (browser). The admin chat is client-only, so this
    // runs in the browser; guard anyway in case of any SSR code path.
    if (typeof window === 'undefined') return rawHtml;
    return DOMPurify.sanitize(rawHtml);
  };

  return { renderMarkdown };
};
