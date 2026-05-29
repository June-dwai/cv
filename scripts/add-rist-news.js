const fs = require("fs");
const path = require("path");
const postgres = require("postgres");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const full = path.join(__dirname, "..", file);
    if (!fs.existsSync(full)) continue;
    const text = fs.readFileSync(full, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2];
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadEnv();

const DATABASE_URL = (process.env.DATABASE_URL || "").trim();
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not configured.");
  process.exit(1);
}

const SLUG = "joining-rist";
const PUBLISHED_AT = new Date().toISOString();

const para = (...children) => ({ type: "paragraph", content: children });
const text = (value) => ({ type: "text", text: value });
const bold = (value) => ({ type: "text", marks: [{ type: "bold" }], text: value });

const posts = [
  {
    locale: "ko",
    title: "RIST 산업가스연구그룹 합류",
    excerpt:
      "2026년 6월부터 포항산업과학연구원(RIST) 산업가스연구그룹에 책임연구원으로 합류합니다.",
    contentHtml:
      "<p>2026년 6월부터 <strong>포항산업과학연구원(RIST)</strong> 산업가스연구그룹에 책임연구원으로 합류하게 되었습니다.</p>" +
      "<p>그동안 수행해 온 가스 분리·정제 공정 연구와 데이터 기반 모델링 경험을 산업가스 분야의 실제 문제 해결로 이어가고자 합니다. 새로운 환경에서의 연구 소식도 이 페이지를 통해 계속 전하겠습니다.</p>",
    contentJson: {
      type: "doc",
      content: [
        para(
          text("2026년 6월부터 "),
          bold("포항산업과학연구원(RIST)"),
          text(" 산업가스연구그룹에 책임연구원으로 합류하게 되었습니다."),
        ),
        para(
          text(
            "그동안 수행해 온 가스 분리·정제 공정 연구와 데이터 기반 모델링 경험을 산업가스 분야의 실제 문제 해결로 이어가고자 합니다. 새로운 환경에서의 연구 소식도 이 페이지를 통해 계속 전하겠습니다.",
          ),
        ),
      ],
    },
  },
  {
    locale: "en",
    title: "Joining RIST — Industrial Gas Research Group",
    excerpt:
      "Starting June 2026, I am joining the Industrial Gas Research Group at RIST as a Principal Researcher.",
    contentHtml:
      "<p>Starting June 2026, I am joining the <strong>Industrial Gas Research Group</strong> at RIST (Research Institute of Industrial Science &amp; Technology) as a Principal Researcher.</p>" +
      "<p>I look forward to applying my experience in gas separation and purification process research and data-driven modeling to real-world challenges in the industrial gas field. I will continue to share research updates here.</p>",
    contentJson: {
      type: "doc",
      content: [
        para(
          text("Starting June 2026, I am joining the "),
          bold("Industrial Gas Research Group"),
          text(
            " at RIST (Research Institute of Industrial Science & Technology) as a Principal Researcher.",
          ),
        ),
        para(
          text(
            "I look forward to applying my experience in gas separation and purification process research and data-driven modeling to real-world challenges in the industrial gas field. I will continue to share research updates here.",
          ),
        ),
      ],
    },
  },
];

async function main() {
  const sql = postgres(DATABASE_URL, {
    max: 1,
    prepare: false,
    idle_timeout: 20,
    connect_timeout: 15,
  });

  try {
    for (const post of posts) {
      const rows = await sql`
        INSERT INTO news_posts (
          locale, slug, title, excerpt, content_html, content_json,
          status, cover_image_url, published_at
        ) VALUES (
          ${post.locale}, ${SLUG}, ${post.title}, ${post.excerpt},
          ${post.contentHtml}, ${sql.json(post.contentJson)},
          'published', ${null}, ${PUBLISHED_AT}
        )
        ON CONFLICT (locale, slug) DO UPDATE SET
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          content_html = EXCLUDED.content_html,
          content_json = EXCLUDED.content_json,
          status = EXCLUDED.status,
          published_at = EXCLUDED.published_at,
          updated_at = NOW()
        RETURNING id, locale, slug, status, published_at
      `;
      const r = rows[0];
      console.log(`[${r.locale}] ${r.status} -> /${r.locale}/news/${r.slug} (id=${r.id})`);
    }
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
