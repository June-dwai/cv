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

// Tiptap JSON helpers
const text = (value) => ({ type: "text", text: value });
const bold = (value) => ({ type: "text", marks: [{ type: "bold" }], text: value });
const link = (value, href) => ({
  type: "text",
  marks: [{ type: "link", attrs: { href, target: "_blank", rel: "noreferrer" } }],
  text: value,
});
const para = (...children) => ({ type: "paragraph", content: children });
const bullets = (items) => ({
  type: "bulletList",
  content: items.map((i) => ({
    type: "listItem",
    content: [{ type: "paragraph", content: [text(i)] }],
  })),
});
const doc = (...content) => ({ type: "doc", content });

// At noon KST so the displayed calendar day is stable regardless of server TZ.
const at = (ymd) => `${ymd}T12:00:00+09:00`;

const posts = [
  // 2026.02.15 — paper (CEJ, NH3-cracked gas H2)
  {
    slug: "paper-nh3-cracked-h2",
    publishedAt: at("2026-02-15"),
    ko: {
      title: "논문 게재 — Chemical Engineering Journal",
      excerpt:
        "암모니아 분해가스로부터 NH3·N2 동시 제거를 통한 연료전지급 수소 생산 연구가 Chemical Engineering Journal에 게재되었습니다.",
      html:
        '<p>공동 저자로 참여한 논문이 <strong>Chemical Engineering Journal</strong>(Volume 530, 173324)에 게재되었습니다.</p>' +
        "<p>암모니아 분해가스로부터 NH3와 N2를 동시에 제거하여 연료전지급 수소를 생산하는, 외부 공기 퍼지를 적용한 직렬 베드 압력순환흡착(PSA) 공정을 다루었습니다.</p>" +
        '<p><a href="https://www.sciencedirect.com/science/article/pii/S1385894726007837" target="_blank" rel="noreferrer">논문 보기 →</a></p>',
      json: doc(
        para(
          text("공동 저자로 참여한 논문이 "),
          bold("Chemical Engineering Journal"),
          text("(Volume 530, 173324)에 게재되었습니다."),
        ),
        para(
          text(
            "암모니아 분해가스로부터 NH3와 N2를 동시에 제거하여 연료전지급 수소를 생산하는, 외부 공기 퍼지를 적용한 직렬 베드 압력순환흡착(PSA) 공정을 다루었습니다.",
          ),
        ),
        para(link("논문 보기 →", "https://www.sciencedirect.com/science/article/pii/S1385894726007837")),
      ),
    },
    en: {
      title: "Paper published in Chemical Engineering Journal",
      excerpt:
        "A study on fuel cell-grade H2 production via simultaneous NH3 and N2 removal from NH3-cracked gas was published in Chemical Engineering Journal.",
      html:
        '<p>A co-authored paper was published in <strong>Chemical Engineering Journal</strong> (Volume 530, 173324).</p>' +
        "<p>The work presents a series-bed pressure swing adsorption process with external air purge for fuel cell-grade H2 production via simultaneous NH3 and N2 removal from an NH3-cracked gas.</p>" +
        '<p><a href="https://www.sciencedirect.com/science/article/pii/S1385894726007837" target="_blank" rel="noreferrer">Read the paper →</a></p>',
      json: doc(
        para(
          text("A co-authored paper was published in "),
          bold("Chemical Engineering Journal"),
          text(" (Volume 530, 173324)."),
        ),
        para(
          text(
            "The work presents a series-bed pressure swing adsorption process with external air purge for fuel cell-grade H2 production via simultaneous NH3 and N2 removal from an NH3-cracked gas.",
          ),
        ),
        para(link("Read the paper →", "https://www.sciencedirect.com/science/article/pii/S1385894726007837")),
      ),
    },
  },

  // 2025.10.17 — two Korean patent applications
  {
    slug: "korea-patents-filed",
    publishedAt: at("2025-10-17"),
    ko: {
      title: "국내 특허 2건 출원",
      excerpt:
        "「제조 공정 관리 장치 및 방법」과 「질의응답 시스템 및 방법」 2건을 국내 특허 출원했습니다.",
      html:
        "<p>공동 발명자로 참여한 특허 2건을 특허청에 출원했습니다.</p>" +
        "<ul><li>제조 공정 관리 장치 및 방법</li><li>질의응답 시스템 및 방법</li></ul>",
      json: doc(
        para(text("공동 발명자로 참여한 특허 2건을 특허청에 출원했습니다.")),
        bullets(["제조 공정 관리 장치 및 방법", "질의응답 시스템 및 방법"]),
      ),
    },
    en: {
      title: "Two Korean patent applications filed",
      excerpt:
        "Filed two Korean patent applications: a manufacturing process management device/method and a question-answering system/method.",
      html:
        "<p>Two patents on which I am a co-inventor were filed with the Korean Intellectual Property Office.</p>" +
        "<ul><li>Manufacturing process management device and method</li><li>Question-answering system and method</li></ul>",
      json: doc(
        para(text("Two patents on which I am a co-inventor were filed with the Korean Intellectual Property Office.")),
        bullets([
          "Manufacturing process management device and method",
          "Question-answering system and method",
        ]),
      ),
    },
  },

  // 2025.06 — left DogWoodAI
  {
    slug: "leaving-dogwoodai",
    publishedAt: at("2025-06-30"),
    ko: {
      title: "도그우드에이아이 퇴사",
      excerpt: "약 2년 3개월간 함께한 (주)도그우드에이아이에서의 역할을 마무리했습니다.",
      html:
        "<p>(주)도그우드에이아이에서의 역할을 마무리했습니다.</p>" +
        "<p>기업부설연구소 연구소장으로서 화학 공장 통합 AI 솔루션을 제품화하며, 공정 도메인 지식과 데이터 기반 모델링을 결합하는 값진 경험을 쌓았습니다. 그동안 함께해 주신 동료분들께 감사드립니다.</p>",
      json: doc(
        para(text("(주)도그우드에이아이에서의 역할을 마무리했습니다.")),
        para(
          text(
            "기업부설연구소 연구소장으로서 화학 공장 통합 AI 솔루션을 제품화하며, 공정 도메인 지식과 데이터 기반 모델링을 결합하는 값진 경험을 쌓았습니다. 그동안 함께해 주신 동료분들께 감사드립니다.",
          ),
        ),
      ),
    },
    en: {
      title: "Concluded my role at DogWoodAI",
      excerpt: "Wrapped up my role at DogWoodAI after about two years and three months.",
      html:
        "<p>I wrapped up my role at DogWoodAI.</p>" +
        "<p>As Director of the corporate R&amp;D center, I productized integrated AI solutions for chemical manufacturing and gained valuable experience combining process-domain knowledge with data-driven modeling. Many thanks to the colleagues I worked with.</p>",
      json: doc(
        para(text("I wrapped up my role at DogWoodAI.")),
        para(
          text(
            "As Director of the corporate R&D center, I productized integrated AI solutions for chemical manufacturing and gained valuable experience combining process-domain knowledge with data-driven modeling. Many thanks to the colleagues I worked with.",
          ),
        ),
      ),
    },
  },

  // 2025.06.03 — US patent granted
  {
    slug: "us-patent-co-adsorbent",
    publishedAt: at("2025-06-03"),
    ko: {
      title: "미국 특허 등록 — CO/CS2 분리용 입상형 흡착제",
      excerpt:
        "일산화탄소·이황화탄소 분리용 입상형 흡착제 제조 방법이 미국 특허로 등록되었습니다.",
      html:
        "<p>공동 발명자로 참여한 <strong>「일산화탄소 또는 이황화탄소 분리용 입상형 흡착제 제조 방법」</strong>이 미국 특허청(USPTO)에 등록되었습니다.</p>",
      json: doc(
        para(
          text("공동 발명자로 참여한 "),
          bold("「일산화탄소 또는 이황화탄소 분리용 입상형 흡착제 제조 방법」"),
          text("이 미국 특허청(USPTO)에 등록되었습니다."),
        ),
      ),
    },
    en: {
      title: "US patent granted — granular adsorbent for CO/CS2 separation",
      excerpt:
        "A method for manufacturing a granular adsorbent for separating carbon monoxide or carbon disulfide was granted by the US Patent Office.",
      html:
        '<p>A patent on which I am a co-inventor, <strong>"Method for manufacturing a granular adsorbent for separating carbon monoxide or carbon disulfide,"</strong> was granted by the US Patent Office.</p>',
      json: doc(
        para(
          text("A patent on which I am a co-inventor, "),
          bold('"Method for manufacturing a granular adsorbent for separating carbon monoxide or carbon disulfide,"'),
          text(" was granted by the US Patent Office."),
        ),
      ),
    },
  },

  // 2024.11.01 — lead-author paper (CEJ, industrial-scale VPSA)
  {
    slug: "paper-industrial-vpsa-h2",
    publishedAt: at("2024-11-01"),
    ko: {
      title: "주저자 논문 게재 — Chemical Engineering Journal",
      excerpt:
        "산업 규모 12층 베드 진공압력순환흡착(VPSA)을 활용한 연료전지급 수소 생산 연구가 주저자로 게재되었습니다.",
      html:
        '<p>주저자로 참여한 논문이 <strong>Chemical Engineering Journal</strong>(Volume 499, 156068)에 게재되었습니다.</p>' +
        "<p>탄소 포집된 SMR 합성가스로부터 연료전지급 수소를 생산하기 위한 산업 규모 12층 베드 진공압력순환흡착(VPSA) 공정을 다루었습니다.</p>" +
        '<p><a href="https://www.sciencedirect.com/science/article/pii/S1385894724075594" target="_blank" rel="noreferrer">논문 보기 →</a></p>',
      json: doc(
        para(
          text("주저자로 참여한 논문이 "),
          bold("Chemical Engineering Journal"),
          text("(Volume 499, 156068)에 게재되었습니다."),
        ),
        para(
          text(
            "탄소 포집된 SMR 합성가스로부터 연료전지급 수소를 생산하기 위한 산업 규모 12층 베드 진공압력순환흡착(VPSA) 공정을 다루었습니다.",
          ),
        ),
        para(link("논문 보기 →", "https://www.sciencedirect.com/science/article/pii/S1385894724075594")),
      ),
    },
    en: {
      title: "Lead-author paper published in Chemical Engineering Journal",
      excerpt:
        "A lead-author paper on industrial-scale 12-layered-bed VPSA for fuel cell-grade H2 production was published in Chemical Engineering Journal.",
      html:
        '<p>A paper for which I am the lead author was published in <strong>Chemical Engineering Journal</strong> (Volume 499, 156068).</p>' +
        "<p>It presents an industrial-scale 12-layered-bed vacuum pressure swing adsorption process for fuel cell-grade H2 production from carbon-captured steam methane reforming syngas.</p>" +
        '<p><a href="https://www.sciencedirect.com/science/article/pii/S1385894724075594" target="_blank" rel="noreferrer">Read the paper →</a></p>',
      json: doc(
        para(
          text("A paper for which I am the lead author was published in "),
          bold("Chemical Engineering Journal"),
          text(" (Volume 499, 156068)."),
        ),
        para(
          text(
            "It presents an industrial-scale 12-layered-bed vacuum pressure swing adsorption process for fuel cell-grade H2 production from carbon-captured steam methane reforming syngas.",
          ),
        ),
        para(link("Read the paper →", "https://www.sciencedirect.com/science/article/pii/S1385894724075594")),
      ),
    },
  },

  // 2023.03 — joined DogWoodAI
  {
    slug: "joining-dogwoodai",
    publishedAt: at("2023-03-02"),
    ko: {
      title: "도그우드에이아이 합류",
      excerpt:
        "(주)도그우드에이아이 기업부설연구소에 합류하여 화학 공장 통합 AI 솔루션 개발을 시작했습니다.",
      html:
        "<p>(주)도그우드에이아이 기업부설연구소에 합류했습니다.</p>" +
        "<p>화학 공장 자동화를 위한 통합 AI 솔루션 개발을 맡아, 품질 예측·이상 탐지·대리모델·최적화·XAI 시각화를 제품 관점으로 연결하는 일을 시작했습니다.</p>",
      json: doc(
        para(text("(주)도그우드에이아이 기업부설연구소에 합류했습니다.")),
        para(
          text(
            "화학 공장 자동화를 위한 통합 AI 솔루션 개발을 맡아, 품질 예측·이상 탐지·대리모델·최적화·XAI 시각화를 제품 관점으로 연결하는 일을 시작했습니다.",
          ),
        ),
      ),
    },
    en: {
      title: "Joined DogWoodAI",
      excerpt:
        "Joined the corporate R&D center at DogWoodAI to develop integrated AI solutions for chemical manufacturing.",
      html:
        "<p>I joined the corporate R&amp;D center at DogWoodAI.</p>" +
        "<p>I began leading the development of integrated AI solutions for chemical manufacturing—linking quality prediction, anomaly analysis, surrogate modeling, optimization, and explainability into product-ready workflows.</p>",
      json: doc(
        para(text("I joined the corporate R&D center at DogWoodAI.")),
        para(
          text(
            "I began leading the development of integrated AI solutions for chemical manufacturing—linking quality prediction, anomaly analysis, surrogate modeling, optimization, and explainability into product-ready workflows.",
          ),
        ),
      ),
    },
  },

  // 2023.02 — Ph.D.
  {
    slug: "phd-graduation",
    publishedAt: at("2023-02-28"),
    ko: {
      title: "연세대학교 화공생명공학 박사학위 취득",
      excerpt:
        "연세대학교 화공생명공학과 석·박사 통합과정을 마치고 박사학위를 취득했습니다.",
      html:
        "<p>연세대학교 화공생명공학과 석·박사 통합과정을 마치고 <strong>박사학위</strong>를 취득했습니다.</p>" +
        "<p>PSA, 분리막, CO2 포집, 수소 회수 공정에 대한 정밀 동적 모사와 머신러닝 기반 예측 모델링을 주제로 연구를 수행했습니다.</p>",
      json: doc(
        para(
          text("연세대학교 화공생명공학과 석·박사 통합과정을 마치고 "),
          bold("박사학위"),
          text("를 취득했습니다."),
        ),
        para(
          text(
            "PSA, 분리막, CO2 포집, 수소 회수 공정에 대한 정밀 동적 모사와 머신러닝 기반 예측 모델링을 주제로 연구를 수행했습니다.",
          ),
        ),
      ),
    },
    en: {
      title: "Ph.D. in Chemical and Biomolecular Engineering, Yonsei University",
      excerpt:
        "Completed the integrated M.S.–Ph.D. program and earned a Ph.D. in Chemical and Biomolecular Engineering at Yonsei University.",
      html:
        "<p>I completed the integrated M.S.&ndash;Ph.D. program and earned my <strong>Ph.D.</strong> in Chemical and Biomolecular Engineering at Yonsei University.</p>" +
        "<p>My research focused on high-fidelity dynamic simulation and machine-learning-based modeling for PSA, membrane systems, CO2 capture, and hydrogen recovery processes.</p>",
      json: doc(
        para(
          text("I completed the integrated M.S.–Ph.D. program and earned my "),
          bold("Ph.D."),
          text(" in Chemical and Biomolecular Engineering at Yonsei University."),
        ),
        para(
          text(
            "My research focused on high-fidelity dynamic simulation and machine-learning-based modeling for PSA, membrane systems, CO2 capture, and hydrogen recovery processes.",
          ),
        ),
      ),
    },
  },
];

async function ensureSchema(sql) {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  await sql`
    CREATE TABLE IF NOT EXISTS news_posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      locale TEXT NOT NULL CHECK (locale IN ('ko', 'en')),
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content_html TEXT NOT NULL,
      content_json JSONB,
      status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
      cover_image_url TEXT,
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS news_posts_locale_slug_key
    ON news_posts (locale, slug)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS news_posts_published_at_idx
    ON news_posts (published_at DESC NULLS LAST)
  `;
}

async function upsert(sql, locale, slug, publishedAt, data) {
  const rows = await sql`
    INSERT INTO news_posts (
      locale, slug, title, excerpt, content_html, content_json,
      status, cover_image_url, published_at
    ) VALUES (
      ${locale}, ${slug}, ${data.title}, ${data.excerpt},
      ${data.html}, ${sql.json(data.json)},
      'published', ${null}, ${publishedAt}
    )
    ON CONFLICT (locale, slug) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      content_html = EXCLUDED.content_html,
      content_json = EXCLUDED.content_json,
      status = EXCLUDED.status,
      published_at = EXCLUDED.published_at,
      updated_at = NOW()
    RETURNING locale, slug, published_at
  `;
  return rows[0];
}

async function main() {
  const sql = postgres(DATABASE_URL, {
    max: 1,
    prepare: false,
    idle_timeout: 20,
    connect_timeout: 15,
  });

  try {
    await ensureSchema(sql);
    for (const post of posts) {
      for (const locale of ["ko", "en"]) {
        const r = await upsert(sql, locale, post.slug, post.publishedAt, post[locale]);
        console.log(`[${r.locale}] ${r.slug} @ ${new Date(r.published_at).toISOString().slice(0, 10)}`);
      }
    }
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
