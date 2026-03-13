import type { Locale, LocalizedString } from "@/lib/site";

export type SiteLink = {
  label: LocalizedString;
  href: string;
  helper?: LocalizedString;
  external?: boolean;
};

export type Stat = {
  value: string;
  label: LocalizedString;
  detail: LocalizedString;
};

export type NarrativeCard = {
  title: LocalizedString;
  description: LocalizedString;
};

export type EducationEntry = {
  institution: string;
  degree: LocalizedString;
  period: LocalizedString;
  note?: LocalizedString;
};

export type ExperienceEntry = {
  company: string;
  role: LocalizedString;
  period: LocalizedString;
  summary: LocalizedString;
  highlights: LocalizedString[];
};

export type SkillGroup = {
  title: LocalizedString;
  items: LocalizedString[];
};

export type ProjectEntry = {
  title: LocalizedString;
  client: LocalizedString;
  employer: string;
  period: LocalizedString;
  role: LocalizedString;
  problem: LocalizedString;
  approach: LocalizedString;
  outcome: LocalizedString;
  tags: LocalizedString[];
  featured: boolean;
};

export type PublicationEntry = {
  title: string;
  journal: string;
  date: string;
  authors: string;
  isLeadAuthor?: boolean;
  featured?: boolean;
  href?: string;
};

export type PresentationEntry = {
  title: LocalizedString;
  event: string;
  organizer: string;
  date: string;
  type: LocalizedString;
  format: string;
  authorship: LocalizedString;
};

export type PatentEntry = {
  title: LocalizedString;
  office: string;
  date: string;
  status: LocalizedString;
  authors: string;
};

export type ResearchGrantEntry = {
  title: LocalizedString;
  sponsor: LocalizedString;
  period: LocalizedString;
};

export type AwardEntry = {
  title: LocalizedString;
  issuer: string;
  date: string;
};

export type FocusGroupEntry = {
  title: LocalizedString;
  items: LocalizedString[];
};

export type ProfileStackEntry = {
  label: LocalizedString;
  items: string[];
};

type PageIntro = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
};

export const siteContent = {
  siteMeta: {
    title: {
      ko: "강준호 | 가스 분리정제 전문가",
      en: "Jun-Ho Kang | Gas Separation and Purification Specialist",
    },
    description: {
      ko: "공정 시뮬레이션, 가스 분리, 산업 AI 솔루션 개발 경험을 한 곳에 정리한 강준호의 개인 사이트",
      en: "A bilingual personal site presenting Jun-Ho Kang's work across process simulation, gas separation, and industrial AI.",
    },
  },
  navigation: [
    { href: "", label: { ko: "홈", en: "Home" } },
    { href: "projects", label: { ko: "프로젝트", en: "Projects" } },
    { href: "research", label: { ko: "연구실적", en: "Research" } },
    { href: "contact", label: { ko: "연락처", en: "Contact" } },
  ],
  pageIntros: {
    home: {
      eyebrow: { ko: "Overview", en: "Overview" },
      title: {
        ko: "공정의 정밀함과 AI의 속도를 함께 설계합니다.",
        en: "I design systems that combine process rigor with the speed of AI.",
      },
      description: {
        ko: "가스 분리 및 정제 공정의 동적모사, 흡착 기반 분리 공정 설계, 그리고 제조 현장을 위한 AI 솔루션 개발을 연결해 왔습니다.",
        en: "My work connects high-fidelity process modeling, adsorption-based separation, and deployable AI systems for industrial operations.",
      },
    } satisfies PageIntro,
    resume: {
      eyebrow: { ko: "Resume", en: "Resume" },
      title: {
        ko: "연구와 산업 현장을 함께 아우르는 이력",
        en: "A career that spans academic depth and industrial delivery",
      },
      description: {
        ko: "박사 연구, 공정 시뮬레이션, 산업 AI 제품화 경험을 하나의 흐름으로 정리했습니다.",
        en: "This resume tracks the arc from doctoral research to process engineering and product-oriented industrial AI work.",
      },
    } satisfies PageIntro,
    projects: {
      eyebrow: { ko: "Selected Work", en: "Selected Work" },
      title: {
        ko: "현장에서 검증된 대표 프로젝트",
        en: "Applied projects built for real operating environments",
      },
      description: {
        ko: "연구 아이디어에 머물지 않고, 공정 시뮬레이션과 AI를 실제 의사결정 도구로 연결한 사례들입니다.",
        en: "These projects show how simulation and AI were turned into usable tools for operating teams and process decisions.",
      },
    } satisfies PageIntro,
    research: {
      eyebrow: { ko: "Research Archive", en: "Research Archive" },
      title: {
        ko: "논문, 발표, 특허, 연구과제를 구조적으로 정리한 아카이브",
        en: "A structured archive of publications, talks, patents, and funded research",
      },
      description: {
        ko: "주저자 논문부터 학술 발표, 연구과제, 특허까지 최신순으로 정리했습니다.",
        en: "The archive brings together first-author papers, presentations, grants, and patent work in a clear, chronological structure.",
      },
    } satisfies PageIntro,
  },
  profile: {
    name: "강준호",
    nameEnglish: "Jun-Ho Kang",
    credential: "Ph.D.",
    heroTitle: {
      ko: "강준호",
      en: "Jun-Ho Kang",
    },
    heroRole: {
      ko: "분리정제 전문가",
      en: "Separation and purification specialist",
    },
    heroFocusGroups: [
      {
        title: {
          ko: "흡착 실험 및 동적 모사",
          en: "Adsorption experiments and dynamic simulation",
        },
        items: [
          { ko: "수소 정제", en: "Hydrogen purification" },
          { ko: "이산화탄소 포집", en: "CO2 capture" },
          { ko: "일산화탄소 제거", en: "CO removal" },
          { ko: "헬륨 회수", en: "Helium recovery" },
          { ko: "암모니아 제거", en: "Ammonia removal" },
        ],
      },
      {
        title: {
          ko: "AI 솔루션",
          en: "AI solutions",
        },
        items: [
          { ko: "AI 모델 개발", en: "AI model development" },
          {
            ko: "시계열 데이터 예측 및 최적화",
            en: "Time-series forecasting and optimization",
          },
          {
            ko: "화학공장을 위한 통합 AI 솔루션 개발",
            en: "Integrated AI solutions for chemical plants",
          },
        ],
      },
    ] satisfies FocusGroupEntry[],
    heroTechStack: [
      {
        label: {
          ko: "공정 시뮬레이션",
          en: "Process Simulation",
        },
        items: ["gPROMS", "Aspen Plus", "PRO/II"],
      },
      {
        label: {
          ko: "프로그래밍",
          en: "Programming",
        },
        items: ["Python", "MATLAB"],
      },
      {
        label: {
          ko: "백엔드",
          en: "Backend",
        },
        items: ["Django"],
      },
    ] satisfies ProfileStackEntry[],
    heroLanguages: [
      {
        ko: "한국어",
        en: "Korean",
      },
      {
        ko: "영어",
        en: "English",
      },
      {
        ko: "일본어",
        en: "Japanese",
      },
    ] satisfies LocalizedString[],
    headline: {
      ko: "가스 분리정제 전문가",
      en: "Gas separation and purification specialist",
    },
    subheadline: {
      ko: "PSA 기반 가스 분리 공정, 동적모사, 대리모델, 시계열 예측, 최적화를 연결해 연구와 산업 현장을 잇는 시스템을 만들어 왔습니다.",
      en: "I build systems at the intersection of PSA-based gas separation, dynamic simulation, surrogate modeling, time-series prediction, and optimization.",
    },
    intro: {
      ko: "박사 연구에서는 압력변동흡착과 분리막 공정의 동적모사를 수행했고, 산업 현장에서는 공정 품질 예측, 공정 최적화, 이상 탐지, 플랜트용 AI 제품화를 리드했습니다.",
      en: "My doctoral work focused on dynamic simulation of PSA and membrane systems, and my industry work has centered on quality prediction, optimization, anomaly analysis, and AI product delivery for process plants.",
    },
    availability: {
      ko: "커리어 소개, 포트폴리오, 제출용 CV까지 하나의 흐름으로 정리한 버전입니다.",
      en: "This site is designed to work both as a personal profile and as a practical resume and portfolio hub.",
    },
    location: {
      ko: "대한민국 서울",
      en: "Seoul, Republic of Korea",
    },
  },
  links: {
    email: {
      label: { ko: "이메일", en: "Email" },
      href: "mailto:junhok0629@google.com",
      helper: {
        ko: "junhok0629@google.com",
        en: "junhok0629@google.com",
      },
    } satisfies SiteLink,
    scholar: {
      label: { ko: "Google Scholar", en: "Google Scholar" },
      href: "https://scholar.google.com/citations?user=im_R1NYAAAAJ&hl=ko",
      helper: {
        ko: "논문 및 인용 정보 보기",
        en: "View publications and citations",
      },
      external: true,
    } satisfies SiteLink,
    resume: {
      label: { ko: "PDF 이력서", en: "PDF Resume" },
      href: "/files/jun-ho-kang-cv.pdf",
      helper: {
        ko: "제출용 PDF 다운로드",
        en: "Download the PDF version",
      },
    } satisfies SiteLink,
  },
  heroStats: [
    {
      value: "14",
      label: { ko: "논문", en: "Publications" },
      detail: {
        ko: "주저자 3편, 기타저자 11편",
        en: "3 first-author papers, 11 co-authored papers",
      },
    },
    {
      value: "4",
      label: { ko: "특허", en: "Patents" },
      detail: {
        ko: "통합 AI 솔루션 및 CO 흡착제 개발",
        en: "Integrated AI solutions and CO adsorbent development",
      },
    },
    {
      value: "15",
      label: { ko: "학술 발표", en: "Conference Talks" },
      detail: {
        ko: "국제 및 국내 학회 발표 실적",
        en: "Presentations across international and domestic conferences",
      },
    },
    {
      value: "13",
      label: { ko: "프로젝트", en: "Projects" },
      detail: {
        ko: "산업 현장 중심의 프로젝트",
        en: "Projects focused on industrial operations",
      },
    },
  ] satisfies Stat[],
  differentiators: [
    {
      title: {
        ko: "공정을 이해하는 AI",
        en: "AI grounded in process physics",
      },
      description: {
        ko: "단순 예측 모델이 아니라 공정 구조와 운전 제약을 함께 이해하는 하이브리드 접근을 선호합니다.",
        en: "I favor hybrid approaches that respect process structure and operating constraints instead of treating plants as black-box datasets.",
      },
    },
    {
      title: {
        ko: "연산 시간을 현장 속도로",
        en: "From simulation time to operator time",
      },
      description: {
        ko: "정밀한 동적모사 결과를 대리모델과 최적화기로 연결해 수시간의 계산을 수초 단위 의사결정으로 전환해 왔습니다.",
        en: "I turn high-fidelity simulations into surrogate models and optimizers that compress hours of computation into seconds.",
      },
    },
    {
      title: {
        ko: "연구를 제품에 가깝게",
        en: "Research delivered as products",
      },
      description: {
        ko: "모델 개발에 그치지 않고, 엔지니어가 실제로 사용하는 UI, 분석 흐름, 통합 솔루션 패키징까지 주도했습니다.",
        en: "Beyond modeling, I have led the packaging of interfaces, analytics workflows, and integrated solutions that operating teams can use.",
      },
    },
  ] satisfies NarrativeCard[],
  capabilityGroups: [
    {
      title: {
        ko: "Process Systems",
        en: "Process Systems",
      },
      items: [
        {
          ko: "PSA 및 분리막 공정 동적모사",
          en: "Dynamic simulation of PSA and membrane systems",
        },
        {
          ko: "gPROMS, Aspen Plus, Pro/II 기반 공정 해석",
          en: "Process analysis with gPROMS, Aspen Plus, and Pro/II",
        },
        {
          ko: "공정 조건 탐색, 시나리오 비교, 경제성 검토",
          en: "Scenario analysis, operating window exploration, and techno-economic evaluation",
        },
      ],
    },
    {
      title: {
        ko: "Industrial AI",
        en: "Industrial AI",
      },
      items: [
        {
          ko: "시계열 품질 예측과 이상 탐지",
          en: "Time-series quality prediction and anomaly analysis",
        },
        {
          ko: "DNN 및 ANN 기반 대리모델과 최적화기 설계",
          en: "Surrogate modeling and optimization with DNN and ANN models",
        },
        {
          ko: "XAI 기반 원인 분석과 플랜트봇 및 LLM 응용",
          en: "XAI-driven diagnostics and plant-focused LLM workflows",
        },
      ],
    },
    {
      title: {
        ko: "Experimental Foundation",
        en: "Experimental Foundation",
      },
      items: [
        {
          ko: "흡착 평형, 속도, 열 분석",
          en: "Adsorption equilibrium, kinetics, and heat analysis",
        },
        {
          ko: "파과 실험, PSA 운전, 흡착제 성능 검증",
          en: "Breakthrough experiments, PSA operation, and adsorbent validation",
        },
        {
          ko: "XRD, EDS, mercury porosimetry, gas analysis 장비 활용",
          en: "Hands-on characterization with XRD, EDS, mercury porosimetry, and gas analysis tools",
        },
      ],
    },
  ] satisfies SkillGroup[],
  toolkit: [
    "gPROMS",
    "Aspen Plus",
    "Pro/II",
    "MATLAB",
    "Python",
    "ANN / DNN",
    "Genetic Algorithm",
    "XAI",
    "LLM",
  ],
  education: [
    {
      institution: "Yonsei University",
      degree: {
        ko: "화공생명공학과 석박사 통합과정",
        en: "Integrated M.S./Ph.D. Program in Chemical and Biomolecular Engineering",
      },
      period: {
        ko: "2017.03 - 2023.02",
        en: "Mar 2017 - Feb 2023",
      },
      note: {
        ko: "학위논문: PSA 기반 수소 정제 공정의 동적모사와 인공신경망 적용",
        en: "Dissertation on dynamic simulation and neural-network modeling for PSA-based hydrogen purification",
      },
    },
    {
      institution: "Yonsei University",
      degree: {
        ko: "화공생명공학과 학사",
        en: "B.S. in Chemical and Biomolecular Engineering",
      },
      period: {
        ko: "2013.03 - 2017.02",
        en: "Mar 2013 - Feb 2017",
      },
    },
    {
      institution: "Kyunggi High School",
      degree: {
        ko: "졸업",
        en: "High School Diploma",
      },
      period: {
        ko: "2010.03 - 2013.02",
        en: "Mar 2010 - Feb 2013",
      },
    },
  ] satisfies EducationEntry[],
  experience: [
    {
      company: "DogWoodAI",
      role: {
        ko: "AI 개발자 / 연구소장",
        en: "AI Developer / Research Lead",
      },
      period: {
        ko: "2023.03 - 2025.06",
        en: "Mar 2023 - Jun 2025",
      },
      summary: {
        ko: "화학 공장 자동화를 위한 통합 AI 솔루션 개발을 리드하며, 품질 예측, 이상 탐지, 대리모델, 최적화, XAI 시각화까지 제품 관점으로 연결했습니다.",
        en: "Led integrated AI solution development for chemical manufacturing, linking quality prediction, anomaly analysis, surrogate modeling, optimization, and explainability into product-ready workflows.",
      },
      highlights: [
        {
          ko: "공정 도메인 지식과 데이터 기반 모델을 결합한 하이브리드 AI 접근",
          en: "Built hybrid AI approaches that combined process-domain knowledge with data-driven models",
        },
        {
          ko: "XAI 기반 원인 분석 시각화로 현장 엔지니어 의사결정 지원",
          en: "Introduced XAI-based root-cause visualizations to support plant engineers",
        },
        {
          ko: "DNN 대리모델과 유전 알고리즘 최적화로 시뮬레이션 시간을 대폭 단축",
          en: "Compressed simulation turnaround with DNN surrogate models and genetic-algorithm optimization",
        },
      ],
    },
    {
      company: "Yonsei University",
      role: {
        ko: "박사과정 연구자",
        en: "Ph.D. Researcher",
      },
      period: {
        ko: "2017.03 - 2023.02",
        en: "Mar 2017 - Feb 2023",
      },
      summary: {
        ko: "PSA, 분리막, CO2 포집, 수소 회수 공정에 대한 정밀 동적모사와 머신러닝 예측 모델링을 수행했습니다.",
        en: "Conducted high-fidelity dynamic simulation and machine-learning modeling for PSA, membrane systems, CO2 capture, and hydrogen recovery processes.",
      },
      highlights: [
        {
          ko: "IGCC, SMR 합성가스, 제철 부생가스 등 다양한 가스 시스템 모사",
          en: "Modeled a wide range of gas systems including IGCC, SMR syngas, and steel off-gas",
        },
        {
          ko: "검증된 동적모사 데이터를 활용한 PSA 공정용 DNN 예측 모델 개발",
          en: "Built DNN predictors for PSA performance from validated simulation datasets",
        },
        {
          ko: "흡착제 개발, 파과 실험, PSA 운전 실험을 통한 모델 검증 데이터 확보",
          en: "Generated validation datasets through adsorbent development, breakthrough experiments, and PSA operation",
        },
      ],
    },
  ] satisfies ExperienceEntry[],
  awards: [
    {
      title: {
        ko: "OPIc English Advanced Low",
        en: "OPIc English Advanced Low",
      },
      issuer: "OPIc",
      date: "2025.10",
    },
    {
      title: {
        ko: "Data Science and Machine Learning: Making Data-driven Decisions",
        en: "Data Science and Machine Learning: Making Data-driven Decisions",
      },
      issuer: "MIT Schwarzman College of Computing & MIT IDSS",
      date: "2023.09",
    },
    {
      title: {
        ko: "한국화학공학회 Best Poster Award",
        en: "Best Poster Award",
      },
      issuer: "Korean Institute of Chemical Engineers",
      date: "2019.04",
    },
    {
      title: {
        ko: "gPROMS Advanced Custom Modeling and Model Publishing 수료",
        en: "gPROMS: Advanced Custom Modeling and Model Publishing",
      },
      issuer: "PSE Korea",
      date: "2018.01",
    },
  ] satisfies AwardEntry[],
  projects: [
    {
      title: {
        ko: "잠수함 운용 환경 적용을 위한 CO2 포집용 PSA 장치 개발",
        en: "PSA-based CO2 capture unit design for submarine operating environments",
      },
      client: {
        ko: "조선 3사 중 1곳, NDA",
        en: "One of Korea's major shipbuilders, NDA",
      },
      employer: "DogWoodAI",
      period: {
        ko: "2024.07 - 2024.12",
        en: "Jul 2024 - Dec 2024",
      },
      role: {
        ko: "PSA 장치 설계",
        en: "PSA unit design",
      },
      problem: {
        ko: "잠수함 내부의 제한된 공간과 전력 조건 안에서 공기질 유지용 CO2 포집 장치의 기술적 타당성을 검증해야 했습니다.",
        en: "The project needed to validate a technically feasible CO2 capture unit for a submarine environment with severe space and power constraints.",
      },
      approach: {
        ko: "기초 시뮬레이션과 흡착제 성능 평가 데이터를 바탕으로 소형화 가능한 PSA 사이클과 핵심 설계 인자를 도출했습니다.",
        en: "I used baseline simulation and adsorbent performance data to propose a compact PSA cycle and identify the key design parameters.",
      },
      outcome: {
        ko: "본 과제 착수를 위한 타당성과 핵심 설계 기준을 확보했습니다.",
        en: "The work established technical feasibility and the core design basis for a follow-on development program.",
      },
      tags: [
        { ko: "PSA", en: "PSA" },
        { ko: "CO2 포집", en: "CO2 capture" },
        { ko: "공정 설계", en: "process design" },
      ],
      featured: true,
    },
    {
      title: {
        ko: "반도체 소재 배치 공정 최적화를 위한 AI 기반 공정 시뮬레이터 개발",
        en: "AI-based process simulator for semiconductor material batch optimization",
      },
      client: {
        ko: "국내 반도체 소재사, NDA",
        en: "Korean semiconductor materials company, NDA",
      },
      employer: "DogWoodAI",
      period: {
        ko: "2025.04 - 2025.06",
        en: "Apr 2025 - Jun 2025",
      },
      role: {
        ko: "AI 모델 및 공정 시뮬레이터 개발",
        en: "AI model and process simulator development",
      },
      problem: {
        ko: "식각액 목표 성능을 맞추기 위해 긴 시간의 반복 믹싱과 실험이 필요했습니다.",
        en: "The client relied on repeated long-duration mixing cycles to hit target etchant performance.",
      },
      approach: {
        ko: "배합 조성과 성능 데이터를 학습한 AI 모델로 배치 결과를 빠르게 예측하는 시뮬레이터를 구현했습니다.",
        en: "I built an AI-driven simulator that predicts batch performance from formulation and process data.",
      },
      outcome: {
        ko: "반복 믹싱 횟수와 실험 시간을 줄여 시간과 비용을 크게 절감할 수 있는 구조를 만들었습니다.",
        en: "The simulator reduced the need for repeated mixing cycles, improving both turnaround time and cost efficiency.",
      },
      tags: [
        { ko: "배치 공정", en: "batch process" },
        { ko: "반도체 소재", en: "semiconductor materials" },
        { ko: "시뮬레이터", en: "simulator" },
      ],
      featured: true,
    },
    {
      title: {
        ko: "화학공학 제조업 현장을 위한 통합 AI 솔루션 개발",
        en: "Integrated AI platform for chemical manufacturing operations",
      },
      client: {
        ko: "중소벤처기업부 TIPS",
        en: "TIPS, Ministry of SMEs and Startups",
      },
      employer: "DogWoodAI",
      period: {
        ko: "2024.08 - 2025.06",
        en: "Aug 2024 - Jun 2025",
      },
      role: {
        ko: "통합 AI 솔루션 개발 총괄",
        en: "Overall lead for integrated AI solution development",
      },
      problem: {
        ko: "제조 현장은 품질 예측, 데이터 분석, 최적화, 이상 탐지, 현장 질의응답이 분절된 도구로 운영되는 경우가 많았습니다.",
        en: "Manufacturing teams often had to work across fragmented tools for quality prediction, analytics, optimization, anomaly analysis, and plant knowledge access.",
      },
      approach: {
        ko: "센서 시계열 기반 예측, 분석, 시뮬레이션, 최적화, 플랜트봇을 하나의 흐름으로 묶은 통합 솔루션을 설계했습니다.",
        en: "I led the design of a unified solution that combined sensor-driven prediction, analytics, simulation, optimization, and a plant-focused assistant.",
      },
      outcome: {
        ko: "통합 AI 솔루션을 개발했습니다.",
        en: "Integrated AI solution development spanning real-time prediction, analytics, simulation, optimization, anomaly detection, and LLM capabilities.",
      },
      tags: [
        { ko: "통합 AI", en: "integrated AI" },
        { ko: "시계열 데이터", en: "time-series data" },
        { ko: "플랜트봇", en: "plant assistant" },
      ],
      featured: true,
    },
    {
      title: {
        ko: "LNG 연료 선박용 습식 CO2 포집 공정의 AI 기반 모사 및 최적화",
        en: "AI surrogate and optimization for onboard wet CO2 capture in LNG-fueled ships",
      },
      client: {
        ko: "해양수산부",
        en: "Ministry of Oceans and Fisheries",
      },
      employer: "DogWoodAI",
      period: {
        ko: "2024.08 - 2024.12",
        en: "Aug 2024 - Dec 2024",
      },
      role: {
        ko: "AI 모델 개발 및 최적화기 설계",
        en: "AI model development and optimizer design",
      },
      problem: {
        ko: "선박 운항 조건 변화에 따라 습식 CO2 포집 공정의 에너지 사용과 운전 조건을 빠르게 조정할 필요가 있었습니다.",
        en: "The shipboard wet capture process needed fast operating recommendations under varying engine loads and voyage conditions.",
      },
      approach: {
        ko: "Aspen Plus 데이터로 AI 기반 대리모델을 구축하고, 이를 바탕으로 최적 운전 조건을 산출하는 최적화기를 설계했습니다.",
        en: "Using Aspen Plus data, I built an AI surrogate model and designed an optimizer that recommends energy-efficient setpoints.",
      },
      outcome: {
        ko: "복잡한 화학 흡수 공정의 거동을 빠르게 예측하고 실시간 의사결정에 가까운 구조를 만들었습니다.",
        en: "The result was a faster decision-support layer for a complex wet-scrubbing process, much closer to real-time operation.",
      },
      tags: [
        { ko: "선박 탄소중립", en: "maritime decarbonization" },
        { ko: "Aspen Plus", en: "Aspen Plus" },
        { ko: "최적화", en: "optimization" },
      ],
      featured: true,
    },
    {
      title: {
        ko: "MSR 플랜트 오프가스 내 제논 회수를 위한 분리·정제 공정 개발",
        en: "Separation and purification process development for xenon recovery from MSR off-gas",
      },
      client: {
        ko: "(주)센추리",
        en: "Century Corporation",
      },
      employer: "DogWoodAI",
      period: {
        ko: "2023.09 - 2025.06",
        en: "Sep 2023 - Jun 2025",
      },
      role: {
        ko: "흡착 분리 정제 공정 설계 및 모사",
        en: "Adsorption-based separation process design and simulation",
      },
      problem: {
        ko: "용융염원자로 오프가스에서 Xe와 He를 분리하기 위한 고정밀 공정 모델과 빠른 운전 조건 탐색 체계가 필요했습니다.",
        en: "The project required a reliable process model and rapid operating-condition search for Xe and He separation from molten salt reactor off-gas.",
      },
      approach: {
        ko: "실험 데이터를 바탕으로 지배방정식 기반 시뮬레이션을 만들고, DNN 대리모델과 유전 알고리즘 최적화를 결합했습니다.",
        en: "I developed a governing-equation-based simulation from experimental data and coupled it with a DNN surrogate and genetic-algorithm optimization.",
      },
      outcome: {
        ko: "장치 변화가 있더라도 최적 조건을 빠르게 재탐색할 수 있는 설계 기반을 확보했습니다.",
        en: "The resulting framework made it easier to re-identify optimal conditions even when the equipment design changes.",
      },
      tags: [
        { ko: "Xe/He 분리", en: "Xe/He separation" },
        { ko: "대리모델", en: "surrogate model" },
        { ko: "GA 최적화", en: "GA optimization" },
      ],
      featured: true,
    },
    {
      title: {
        ko: "정밀화학 플랜트용 고도화 AI 솔루션 기술 개발",
        en: "Advanced AI solution for fine chemical plant operations",
      },
      client: {
        ko: "이수스페셜티케미컬",
        en: "ISU Specialty Chemical",
      },
      employer: "DogWoodAI",
      period: {
        ko: "2023.06 - 2025.01",
        en: "Jun 2023 - Jan 2025",
      },
      role: {
        ko: "품질 예측 AI 모델, 최적화기, UI와 백엔드 총괄",
        en: "Led quality-prediction models, optimization, UI, and backend integration",
      },
      problem: {
        ko: "고부가가치 정밀화학 제품의 품질 변동을 조기에 파악하고 공정 엔지니어가 쉽게 활용할 수 있는 운영 도구가 필요했습니다.",
        en: "The client needed earlier visibility into product quality variation and a tool that process engineers could actually work with.",
      },
      approach: {
        ko: "실제 시계열 데이터를 전처리해 품질 예측 모델을 고도화하고, 운영 화면과 시스템 연동을 포함한 통합 솔루션으로 패키징했습니다.",
        en: "I refined the time-series data pipeline, built stronger quality-prediction models, and packaged them into an integrated system with operational interfaces.",
      },
      outcome: {
        ko: "단일 모델 개발이 아닌 현업 활용 가능한 형태의 지능형 솔루션으로 구현했습니다.",
        en: "The deliverable moved beyond a standalone model into an integrated solution suitable for day-to-day operations.",
      },
      tags: [
        { ko: "정밀화학", en: "fine chemicals" },
        { ko: "품질 예측", en: "quality prediction" },
        { ko: "제품화", en: "productization" },
      ],
      featured: true,
    },
  ] satisfies ProjectEntry[],
  publications: [
    {
      title:
        "Series-bed pressure swing adsorption process with external air purge for fuel cell-grade H2 production via simultaneous NH3 and N2 removal from an NH3-cracked gas",
      journal: "Chemical Engineering Journal, Volume 530, 173324",
      date: "2026.02.15",
      authors:
        "Ko, Y., Kang, J. H., Kum, J., Hong, S. H., Shin, B. S., & Lee, C. H.",
    },
    {
      title:
        "Hybrid process using cryogenic and pressure swing adsorption process for CO2 capture and extra H2 production from a tail gas in a steam methane reforming plant",
      journal: "Energy Conversion and Management, Volume 328, 119561",
      date: "2025.03.15",
      authors: "Ko, Y., Kang, J. H., Do, H., Kum, J., & Lee, C. H.",
    },
    {
      title:
        "Industrial-scale 12-layered-bed vacuum pressure swing adsorption for fuel cell-grade H2 production from carbon-captured steam methane reforming syngas",
      journal: "Chemical Engineering Journal, Volume 499, 156068",
      date: "2024.11.01",
      authors: "Kang, J. H., Ko, Y., Jung, M. Y., & Lee, C. H.",
      isLeadAuthor: true,
      featured: true,
      href: "https://www.sciencedirect.com/science/article/pii/S1385894724075594",
    },
    {
      title:
        "Desorbent swing adsorption process using ethylene to separate propane and propylene under isobaric conditions",
      journal: "Chemical Engineering Journal, Volume 482, 149021",
      date: "2024.02.15",
      authors: "Chung, K., Kang, J. H., & Lee, C. H.",
    },
    {
      title:
        "Techno-economic analysis and optimization of a CO2 absorption process with a solvent looping system at the absorber using an MDEA-PZ blended solvent for SMR",
      journal: "Chemical Engineering Journal, Volume 455, 140685",
      date: "2023.01.01",
      authors: "Kum, J., Oh, H. T., Park, J., Kang, J. H., & Lee, C. H.",
    },
    {
      title:
        "Pelletized activated carbon-based CO-selective adsorbent with highly oxidation-stable and aggregation-resistant Cu(I) sites",
      journal: "Chemical Engineering Journal, Volume 451, Part 3, 138758",
      date: "2023.01.01",
      authors: "Nguyen, C., Kang, J. H., Bang, G., Kim, K. M., & Lee, C. H.",
      isLeadAuthor: true,
      featured: true,
      href: "https://www.sciencedirect.com/science/article/pii/S1385894722042395",
    },
    {
      title:
        "Pre-combustion CO2 capture using amine-based absorption process for blue H2 production from steam methane reformer",
      journal: "Energy Conversion and Management, Volume 262, 115632",
      date: "2022.06.15",
      authors:
        "Oh, H. T., Kum, J., Park, J., Vo, N. D., Kang, J. H., & Lee, C. H.",
    },
    {
      title:
        "Sensitivity Analysis and artificial neural network-based optimization for low-carbon H2 production via a sorption-enhanced steam methane reforming (SESMR) process integrated with separation process",
      journal:
        "International Journal of Hydrogen Energy, Volume 47, Issue 2, 820-847",
      date: "2022.01.05",
      authors:
        "Vo, N. D., Kang, J. H., Oh, D. H., Jung, M. Y., Chung, K., & Lee, C. H.",
    },
    {
      title:
        "Dynamic model and performance of an integrated sorption-enhanced steam methane reforming process with separators for the simultaneous blue H2 production and CO2 capture",
      journal: "Chemical Engineering Journal, Volume 423, 130044",
      date: "2021.11.01",
      authors: "Vo, N. D., Kang, J. H., Oh, M., & Lee, C. H.",
    },
    {
      title:
        "High-purity hydrogen production via a water-gas-shift reaction in a palladium-copper catalytic membrane reactor integrated with pressure swing adsorption",
      journal: "Chemical Engineering Journal, Volume 411, 128473",
      date: "2021.05.01",
      authors:
        "Bang, G., Moon, D. K., Kang, J. H., Han, Y. J., Kim, K. M., & Lee, C. H.",
    },
    {
      title:
        "Parallel and series multi-bed pressure swing adsorption processes for H2 recovery from a lean hydrogen mixture",
      journal: "Chemical Engineering Journal, Volume 408, 127299",
      date: "2021.03.15",
      authors: "Park, Y., Kang, J. H., Moon, D. K., Jo, Y. S., & Lee, C. H.",
      isLeadAuthor: true,
      featured: true,
      href: "https://www.sciencedirect.com/science/article/pii/S1385894720334239",
    },
    {
      title:
        "Dynamic-model-based artificial neural network for H2 recovery and CO2 capture from hydrogen tail gas",
      journal: "Applied Energy, Volume 273, 115263",
      date: "2020.09.01",
      authors: "Vo, N. D., Oh, D. H., Kang, J. H., Oh, M., & Lee, C. H.",
    },
    {
      title:
        "Enhancement of energy efficiency by exhaust gas recirculation with oxygen-rich combustion in a natural gas combined cycle with a carbon capture process",
      journal: "Energy, Volume 200, 117586",
      date: "2020.06.01",
      authors: "Lee, W. S., Kang, J. H., Lee, J. C., & Lee, C. H.",
    },
    {
      title:
        "Separation of Carbon Dioxide and Methane Mixture by an Adsorbent-Membrane Hybrid System Using Zeolite 5A Pellets and FAU-Zeolite Membrane",
      journal: "Industrial & Engineering Chemistry Research, Volume 56, 9, 2582-2591",
      date: "2017.02.08",
      authors:
        "Han, Y. J., Kang, J. H., Kim, H. E., Moon, J. H., Cho, C. H., & Lee, C. H.",
    },
  ] satisfies PublicationEntry[],
  presentations: [
    {
      title: {
        ko: "지속 가능한 집단 보호를 위한 CO2 흡착 기반 공기질 관리 기술",
        en: "Sustainable collective protection through CO2 adsorption-based air quality management technology",
      },
      event: "2024 Disaster and Nuclear/WMD Response Conference",
      organizer: "Korean Society for CBRN Defense",
      date: "2024.09.11",
      type: {
        ko: "국내 학술회의",
        en: "Domestic conference",
      },
      format: "Oral",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "AI approach to Real Manufacturing World: AI Solution for an HCR Plant and Hybrid AI Solution for a TDM Plant",
        en: "AI approach to Real Manufacturing World: AI Solution for an HCR Plant and Hybrid AI Solution for a TDM Plant",
      },
      event: "Middle East Process Engineering Conference & Exhibition",
      organizer: "Saudi Aramco",
      date: "2024.05.06",
      type: {
        ko: "국제 학술회의",
        en: "International conference",
      },
      format: "Oral",
      authorship: {
        ko: "공동저자",
        en: "Co-author",
      },
    },
    {
      title: {
        ko: "Techno-economic analysis using simulation and machine learning-based optimization of advanced solvent looping absorption process and stripper-free absorption process for pre-combustion CO2 capture from a Steam Methane Reforming plant",
        en: "Techno-economic analysis using simulation and machine learning-based optimization of advanced solvent looping absorption process and stripper-free absorption process for pre-combustion CO2 capture from a Steam Methane Reforming plant",
      },
      event: "Middle East Process Engineering Conference & Exhibition",
      organizer: "Saudi Aramco",
      date: "2024.05.08",
      type: {
        ko: "국제 학술회의",
        en: "International conference",
      },
      format: "Poster",
      authorship: {
        ko: "공동저자",
        en: "Co-author",
      },
    },
    {
      title: {
        ko: "Blue H2 Production of 12-Bed PSA Process Integrated with CO2 Absorption Process from SMR syngas",
        en: "Blue H2 Production of 12-Bed PSA Process Integrated with CO2 Absorption Process from SMR syngas",
      },
      event: "2022 AIChE Annual Meeting",
      organizer: "American Institute of Chemical Engineers",
      date: "2022.11.17",
      type: {
        ko: "국제 학술대회",
        en: "International conference",
      },
      format: "Oral",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "Dynamic simulation and deep neural network of PSA process for H2 purification after CO2 capture of SMR syngas",
        en: "Dynamic simulation and deep neural network of PSA process for H2 purification after CO2 capture of SMR syngas",
      },
      event: "2022 KIChE Fall Meeting",
      organizer: "Korean Institute of Chemical Engineers",
      date: "2022.10.27",
      type: {
        ko: "국내 학술대회",
        en: "Domestic conference",
      },
      format: "Oral",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "Performance Analysis of a Multi-bed PSA Process Using Silica-based Adsorbents for CO2 Capture from Off-gas in Iron and Steel Industry",
        en: "Performance Analysis of a Multi-bed PSA Process Using Silica-based Adsorbents for CO2 Capture from Off-gas in Iron and Steel Industry",
      },
      event: "2022 AIChE Annual Meeting",
      organizer: "American Institute of Chemical Engineers",
      date: "2022.11.15",
      type: {
        ko: "국제 학술대회",
        en: "International conference",
      },
      format: "Poster",
      authorship: {
        ko: "공동저자",
        en: "Co-author",
      },
    },
    {
      title: {
        ko: "Adsorption behaviors of CO2, CO, CH4, N2, O2, H2 on silica-based adsorbents",
        en: "Adsorption behaviors of CO2, CO, CH4, N2, O2, H2 on silica-based adsorbents",
      },
      event: "2022 AIChE Annual Meeting",
      organizer: "American Institute of Chemical Engineers",
      date: "2022.11.15",
      type: {
        ko: "국제 학술대회",
        en: "International conference",
      },
      format: "Poster",
      authorship: {
        ko: "공동저자",
        en: "Co-author",
      },
    },
    {
      title: {
        ko: "Comparison of series and parallel configurations in a multi-bed pressure swing adsorption process for H2 recovery from lean hydrogen gas",
        en: "Comparison of series and parallel configurations in a multi-bed pressure swing adsorption process for H2 recovery from lean hydrogen gas",
      },
      event: "Fundamentals of Adsorption 14",
      organizer: "The International Adsorption Society",
      date: "2022.05.24",
      type: {
        ko: "국제 학술회의",
        en: "International conference",
      },
      format: "Poster",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "Adsorption equilibria and kinetics of pelletized activated carbon-based CO-selective adsorbent",
        en: "Adsorption equilibria and kinetics of pelletized activated carbon-based CO-selective adsorbent",
      },
      event: "2022 KIChE Spring Meeting",
      organizer: "Korean Institute of Chemical Engineers",
      date: "2022.04.21",
      type: {
        ko: "국내 학술대회",
        en: "Domestic conference",
      },
      format: "Poster",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "Series multi-bed pressure swing adsorption modeling for lean hydrogen gas purification",
        en: "Series multi-bed pressure swing adsorption modeling for lean hydrogen gas purification",
      },
      event: "2021 KIChE Fall Meeting",
      organizer: "Korean Institute of Chemical Engineers",
      date: "2021.10.28",
      type: {
        ko: "국내 학술대회",
        en: "Domestic conference",
      },
      format: "Poster",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "Combined pressure swing adsorption process with membrane process for high purity CO from N2/CO/CO2 mixture",
        en: "Combined pressure swing adsorption process with membrane process for high purity CO from N2/CO/CO2 mixture",
      },
      event: "8th Pacific Basin Conference on Adsorption Science and Technology",
      organizer:
        "Organizing Committee of the 8th Pacific Basin Conference on Adsorption Science and Technology",
      date: "2019.09.04",
      type: {
        ko: "국제 학술회의",
        en: "International conference",
      },
      format: "Poster",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "Adsorption Equilibria and Kinetics of Three Gases on Zeolite 13X and Zeolite LiX for Hydrogen Purification: CO, CO2, and CH4",
        en: "Adsorption Equilibria and Kinetics of Three Gases on Zeolite 13X and Zeolite LiX for Hydrogen Purification: CO, CO2, and CH4",
      },
      event: "Fundamentals of Adsorption 13",
      organizer: "The International Adsorption Society",
      date: "2019.05.28",
      type: {
        ko: "국제 학술회의",
        en: "International conference",
      },
      format: "Poster",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "Dynamic modeling of circulating fluidized-bed CO2 capture process using K2CO3-based sorbent",
        en: "Dynamic modeling of circulating fluidized-bed CO2 capture process using K2CO3-based sorbent",
      },
      event: "Fundamentals of Adsorption 13",
      organizer: "The International Adsorption Society",
      date: "2019.05.28",
      type: {
        ko: "국제 학술회의",
        en: "International conference",
      },
      format: "Poster",
      authorship: {
        ko: "공동저자",
        en: "Co-author",
      },
    },
    {
      title: {
        ko: "Multibed pressure swing adsorption modeling for CO/N2 mixture gas separation",
        en: "Multibed pressure swing adsorption modeling for CO/N2 mixture gas separation",
      },
      event: "2019 KIChE Spring Meeting",
      organizer: "Korean Institute of Chemical Engineers",
      date: "2019.04.25",
      type: {
        ko: "국내 학술대회",
        en: "Domestic conference",
      },
      format: "Poster",
      authorship: {
        ko: "주저자",
        en: "Lead author",
      },
    },
    {
      title: {
        ko: "Rule-based PFD/P&ID converting library for Smart FEED system",
        en: "Rule-based PFD/P&ID converting library for Smart FEED system",
      },
      event: "2018 KIChE Spring Meeting",
      organizer: "Korean Institute of Chemical Engineers",
      date: "2018.04.27",
      type: {
        ko: "국내 학술대회",
        en: "Domestic conference",
      },
      format: "Poster",
      authorship: {
        ko: "공동저자",
        en: "Co-author",
      },
    },
  ] satisfies PresentationEntry[],
  patents: [
    {
      title: {
        ko: "제조 공정 관리 장치 및 방법",
        en: "Manufacturing process management device and method",
      },
      office: "Korean Intellectual Property Office",
      date: "2025.10.17",
      status: {
        ko: "국내 특허 출원",
        en: "Korean patent application",
      },
      authors: "Lee, C. H., Kang, J. H., Chang, J. H., Jung, M. Y., & Pyun, H. S.",
    },
    {
      title: {
        ko: "질의응답 시스템 및 방법",
        en: "Question-answering system and method",
      },
      office: "Korean Intellectual Property Office",
      date: "2025.10.17",
      status: {
        ko: "국내 특허 출원",
        en: "Korean patent application",
      },
      authors: "Lee, C. H., Chang, J. H., Jung, M. Y., Pyun, H. S., & Kang, J. H.",
    },
    {
      title: {
        ko: "일산화탄소 또는 이황화탄소 분리용 입상형 흡착제 제조 방법",
        en: "Method for manufacturing a granular adsorbent for separating carbon monoxide or carbon disulfide",
      },
      office: "U.S. Patent Office",
      date: "2025.06.03",
      status: {
        ko: "미국 특허 등록",
        en: "US patent granted",
      },
      authors: "Lee, C. H., Bang, G., Nguyen, X. C., & Kang, J. H.",
    },
    {
      title: {
        ko: "일산화탄소 또는 이황화탄소 분리용 입상형 흡착제 및 분리 장치",
        en: "Granular adsorbent and separation device for carbon monoxide or carbon disulfide separation",
      },
      office: "Korean Intellectual Property Office",
      date: "2024.06.25",
      status: {
        ko: "국내 특허 등록",
        en: "Korean patent granted",
      },
      authors: "Lee, C. H., Bang, G., Nguyen, X. C., & Kang, J. H.",
    },
  ] satisfies PatentEntry[],
  researchGrants: [
    {
      title: {
        ko: "이산화탄소 포집 및 수소 생산을 위한 흡착·분리 공정 모델 개발",
        en: "Adsorption and separation process model development for CO2 capture and hydrogen production",
      },
      sponsor: {
        ko: "SK이노베이션",
        en: "SK Innovation",
      },
      period: {
        ko: "2021.04 - 2022.12",
        en: "Apr 2021 - Dec 2022",
      },
    },
    {
      title: {
        ko: "인공신경망 기반 HCR 공정 예측 AI 프로그램 개발",
        en: "ANN-based HCR process prediction AI program development",
      },
      sponsor: {
        ko: "GS칼텍스",
        en: "GS Caltex",
      },
      period: {
        ko: "2020.10 - 2023.01",
        en: "Oct 2020 - Jan 2023",
      },
    },
    {
      title: {
        ko: "신규 흡착제·분리막 기반 CO2 포집 및 고순도 수소 생산용 막-PSA 복합 공정 기술 개발",
        en: "Membrane-PSA hybrid process development for CO2 capture and high-purity hydrogen production",
      },
      sponsor: {
        ko: "과학기술정보통신부 / SINTEF 국제공동과제",
        en: "MSIT / international collaboration with SINTEF",
      },
      period: {
        ko: "2020.07 - 2022.07",
        en: "Jul 2020 - Jul 2022",
      },
    },
    {
      title: {
        ko: "머신러닝 기반 SMR-PSA 수소 생산 공정 고도화 기술 개발",
        en: "Machine-learning enhancement of SMR-PSA hydrogen production processes",
      },
      sponsor: {
        ko: "과학기술정보통신부 / PGU 국제공동과제",
        en: "MSIT / international collaboration with PGU",
      },
      period: {
        ko: "2019.11 - 2022.08",
        en: "Nov 2019 - Aug 2022",
      },
    },
    {
      title: {
        ko: "부생가스(LDG) 내 CO 회수를 위한 막-PSA 통합 공정 기술 개발",
        en: "Membrane-PSA integrated process development for CO recovery from LDG",
      },
      sponsor: {
        ko: "과학기술정보통신부",
        en: "Ministry of Science and ICT",
      },
      period: {
        ko: "2017.08 - 2019.07",
        en: "Aug 2017 - Jul 2019",
      },
    },
    {
      title: {
        ko: "클라우드 기반 기본설계 및 FEED 자동화 업무 효율화 시스템 기술 개발",
        en: "Cloud-based basic design and FEED automation system development",
      },
      sponsor: {
        ko: "산업통상자원부",
        en: "Ministry of Trade, Industry and Energy",
      },
      period: {
        ko: "2017.04 - 2020.01",
        en: "Apr 2017 - Jan 2020",
      },
    },
    {
      title: {
        ko: "TNT 및 RDX 함유 폐수 처리 공정의 적용 가능성 평가 연구",
        en: "Feasibility study for TNT and RDX wastewater treatment",
      },
      sponsor: {
        ko: "국방부",
        en: "Ministry of National Defense",
      },
      period: {
        ko: "2016.09 - 2019.12",
        en: "Sep 2016 - Dec 2019",
      },
    },
  ] satisfies ResearchGrantEntry[],
};

export const featuredProjects = siteContent.projects.filter(
  (project) => project.featured,
);

export const featuredPublications = siteContent.publications.filter(
  (publication) => publication.featured,
);

export function homeNav(locale: Locale) {
  return siteContent.navigation.map((item) => ({
    href: `/${locale}${item.href ? `/${item.href}` : ""}`,
    label: item.label[locale],
  }));
}
