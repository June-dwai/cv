import sanitizeHtml from "sanitize-html";

const allowedStyles: NonNullable<sanitizeHtml.IOptions["allowedStyles"]> = {
  "*": {
    color: [/^#[0-9a-fA-F]{3,8}$/, /^rgb\((\s*\d+\s*,){2}\s*\d+\s*\)$/],
    "font-size": [/^\d+(px|rem|em|%)$/],
    "font-family": [/^[\w\s"',-]+$/],
    "text-align": [/^(left|center|right|justify)$/],
  },
};

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "a",
    "blockquote",
    "br",
    "code",
    "em",
    "figcaption",
    "figure",
    "h1",
    "h2",
    "h3",
    "hr",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "source",
    "span",
    "strong",
    "u",
    "ul",
    "video",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title"],
    source: ["src", "type"],
    span: ["style"],
    p: ["style"],
    h1: ["style"],
    h2: ["style"],
    h3: ["style"],
    video: ["controls", "src", "poster", "preload"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedStyles,
};

export function sanitizeNewsHtml(html: string) {
  return sanitizeHtml(html, sanitizeOptions);
}

export function extractPlainText(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}

export function buildExcerpt(html: string, maxLength = 160) {
  const text = extractPlainText(html);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}
