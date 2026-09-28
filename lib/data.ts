export const profile = {
  name: "Sashikanta Sahoo",
  handle: "sashikantcodex",
  role: "Senior AI Full Stack Engineer",
  title: "SDE-4",
  company: "IQVIA R&D Solutions",
  location: "Bengaluru, India",
  years: "8.5+",
  email: "sashikantgeek@gmail.com",
  phone: "+91 98584 42266",
  phoneHref: "tel:+919858442266",
  github: "https://github.com/sashikantcodex",
  linkedin: "https://www.linkedin.com/in/sashikanta-sahoo-108688313",
  resume: "/resume/Sashikanta_Sahoo_FullStack_CV.pdf",
  education: "B.E. Computer Science",
  school: "Govt. College of Engineering, Kalahandi · BPUT",
  avatar: "https://avatars.githubusercontent.com/u/31233603?v=4",
  availability: "Open to Senior, Lead, and Principal roles",
  modes: "Bengaluru · Remote · Hybrid",
  bio: "The surface is React and Next.js. Under it, Node and AWS carry the API, and JWT with RBAC keeps each tenant on its own trial data. When a model is allowed in, retrieval, citation, and the audit log are part of the design, not a later patch. The products are eCOA, prior authorization, and the clinical document path around them.",
  lede: "Healthcare products where every speedup is measured and every data path is designed for audit. The current build is agentic AI that can sit inside regulated systems.",
};

export const metrics = [
  { value: 8.5, decimals: 1, suffix: "+", label: "Years shipping production", detail: "Huawei to IQVIA" },
  { value: 30, decimals: 0, suffix: "%", label: "Faster clinical loads", detail: "Batching, Redis, queries" },
  { value: 40, decimals: 0, suffix: "%", label: "Faster deploys", detail: "35–40 min to under 25" },
  { value: 20, decimals: 0, suffix: "%", label: "Faster APIs", detail: "Cache, indexes, N+1" },
];

export const stackMarquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "FastAPI",
  "Python",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Docker",
  "Kubernetes",
  "LangChain",
  "LangGraph",
  "ChromaDB",
  "HIPAA",
];

export type Project = {
  id: string;
  index: string;
  title: string;
  org: string;
  kind: "AI" | "Healthcare" | "Platform" | "Open source";
  year: string;
  summary: string;
  problem: string;
  architecture: string;
  outcomes: string[];
  stack: string[];
  github?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "knowledge",
    index: "01",
    title: "AI Knowledge Assistant",
    org: "Personal",
    kind: "AI",
    year: "2026",
    summary:
      "Enterprise document Q&A. Upload PDF and DOCX, search by meaning, and chat with citation-backed answers.",
    problem:
      "Teams drown in long documents and still cannot trust a model that answers without pointing at the source.",
    architecture:
      "Next.js and Express in front, FastAPI for retrieval, MongoDB for documents, ChromaDB for vectors, Gemini and OpenAI for generation, WebSockets for the conversation stream, JWT for access, Docker for the runtime.",
    outcomes: [
      "Semantic search over uploaded files",
      "Citation-backed RAG answers",
      "Conversational retrieval with live sockets",
    ],
    stack: ["Next.js", "FastAPI", "MongoDB", "ChromaDB", "OpenAI", "Gemini"],
    github: "https://github.com/sashikantcodex/ai-knowledge-assistant-program",
    featured: true,
  },
  {
    id: "recruit",
    index: "02",
    title: "AI Recruitment Platform",
    org: "Personal",
    kind: "AI",
    year: "2026",
    summary:
      "An applicant tracking system that covers hiring from job description to onboarding, with agent-style workflows.",
    problem:
      "Hiring tools stop at a resume inbox. Scoring, policy, and interview prep stay in separate tools and inboxes.",
    architecture:
      "Monorepo with Next.js 16 and React 19, Express 5, FastAPI, MongoDB, and the OpenAI SDK. Docker Compose for local runtime and GitHub Actions for CI.",
    outcomes: [
      "Resume parsing and JD-resume scoring",
      "Policy RAG for hiring rules",
      "Interview-question generation",
      "Salary benchmarking",
    ],
    stack: ["Next.js 16", "React 19", "FastAPI", "OpenAI", "Docker"],
    github: "https://github.com/sashikantcodex/ai-recruitment-platform",
    featured: true,
  },
  {
    id: "clinical",
    index: "03",
    title: "Clinical Workflow Platform",
    org: "IQVIA R&D Solutions",
    kind: "Healthcare",
    year: "2024 — Now",
    summary:
      "eCOA clinical trial platform for pharma R&D — ePRO, ClinRO, ObsRO, and PerfO — with GenAI on clinical documents.",
    problem:
      "Trial workflows need protocol-driven forms, offline sync, and a model path that stays tenant-scoped and auditable.",
    architecture:
      "Next.js and Node.js on AWS. JWT and RBAC across tenants. Protocol-driven forms with offline and cloud sync for sponsor and CRO monitoring. RAG for document ingestion, chunking, semantic retrieval, structured extraction, and citation-backed Q&A, with PII redaction and audit logs.",
    outcomes: [
      "~30% load-time reduction",
      "~40% faster deploys, zero outages in the pipeline overhaul",
      "HIPAA audit logging and tenant isolation",
    ],
    stack: ["Next.js", "Node.js", "AWS", "Redis", "HIPAA"],
    featured: true,
  },
  {
    id: "prior-auth",
    index: "04",
    title: "Prior Authorization Engine",
    org: "CitiusTech",
    kind: "Healthcare",
    year: "2020 — 2024",
    summary:
      "Insurance approval workflows handling 10k+ requests a day, rebuilt for speed and safer data access.",
    problem:
      "Authorization screens and APIs were too slow for daily clinical and insurance volume.",
    architecture:
      "React on the client, Node.js services, MongoDB and PostgreSQL for records, Redis for cache. Compound indexes and N+1 fixes on the hot paths.",
    outcomes: [
      "~25% page-load reduction after a full screen rebuild",
      "~20% API improvement",
      "10k+ requests a day",
    ],
    stack: ["React", "Node.js", "MongoDB", "Redis", "PostgreSQL"],
    featured: true,
  },
  {
    id: "library",
    index: "05",
    title: "Enterprise React Library",
    org: "CitiusTech",
    kind: "Platform",
    year: "2022 — 2024",
    summary:
      "A shared React and TypeScript component library, documented in Storybook and built to WCAG 2.1.",
    problem:
      "Three product teams were rebuilding the same clinical UI, with uneven accessibility.",
    architecture:
      "Typed React components, Storybook for review, accessibility checks aligned to WCAG 2.1, adopted as the shared surface for product teams.",
    outcomes: ["Adopted by 3 product teams", "WCAG 2.1 as the baseline", "Tech lead since 2022"],
    stack: ["React", "TypeScript", "Storybook", "WCAG 2.1"],
    featured: false,
  },
  {
    id: "cgm",
    index: "06",
    title: "CGM Glucose Monitor",
    org: "L&T Technology Services",
    kind: "Healthcare",
    year: "2018 — 2020",
    summary:
      "Glucose monitoring graph driven by CGM data, with that same data supplying the day's insulin details.",
    problem:
      "A glucose curve on its own hides the insulin behind the day. Clinicians had to read the sensor feed and the dose record as two separate stories.",
    architecture:
      "CGM samples are plotted as one glucose monitoring graph for the day. Daily insulin details come from that CGM data and sit on the same timeline, so the curve and the insulin can be read together.",
    outcomes: ["Glucose curve for the day", "Daily insulin details from the CGM data", "Both aligned on one graph"],
    stack: ["CGM", "Glucose graph", "Daily insulin"],
    featured: false,
  },
  {
    id: "devops",
    index: "07",
    title: "MERN DevOps Stack",
    org: "Personal",
    kind: "Open source",
    year: "2026",
    summary:
      "Infrastructure for a MERN stack on AWS EKS, written as code and delivered with GitOps.",
    problem:
      "Application repos rarely show how the platform around them is actually stood up.",
    architecture:
      "Terraform for AWS, Helm for Kubernetes packaging, ArgoCD for GitOps, Jenkins for the delivery path.",
    outcomes: ["Full infrastructure as code", "GitOps delivery on EKS"],
    stack: ["AWS EKS", "Terraform", "Helm", "ArgoCD", "Jenkins"],
    github: "https://github.com/sashikantcodex/devops-operations",
    featured: true,
  },
  {
    id: "auth",
    index: "08",
    title: "Auth Feature Lab",
    org: "Personal",
    kind: "Open source",
    year: "2026",
    summary:
      "A working catalog of authentication patterns across Node.js, kept as a reference implementation.",
    problem:
      "Auth details get copied between products until nobody remembers which flow is the source of truth.",
    architecture:
      "Node.js feature set covering the authentication patterns used in production apps, published as a public lab.",
    outcomes: ["End-to-end auth integrations in one repo"],
    stack: ["Node.js", "JavaScript", "JWT"],
    github: "https://github.com/sashikantcodex/NodeJs-Auth-Features",
    featured: false,
  },
];

export const conversations = [
  {
    id: "hire",
    title: "A senior role",
    detail: "Lead, Principal, Bengaluru or remote",
    prompt: "The role, the team, and whether it is Bengaluru, remote, or hybrid.",
    subject: "Hiring conversation",
  },
  {
    id: "healthcare",
    title: "A healthcare platform",
    detail: "Clinical trials, prior auth, insurance",
    prompt: "The workflow, the daily volume, and where it is slow or hard to audit.",
    subject: "Healthcare platform",
  },
  {
    id: "genai",
    title: "GenAI inside a regulated product",
    detail: "RAG, extraction, citations, guardrails",
    prompt: "What the model must answer, and which data cannot leave the tenant.",
    subject: "Regulated GenAI",
  },
  {
    id: "architecture",
    title: "An architecture review",
    detail: "Load time, APIs, deploys, tenancy",
    prompt: "The bottleneck you can already measure, and the stack around it.",
    subject: "Architecture review",
  },
] as const;

export const experience = [
  {
    id: "iqvia",
    company: "IQVIA R&D Solutions",
    role: "SDE-4 · Senior Full Stack Engineer",
    dates: "Nov 2024 — Present",
    place: "Bengaluru",
    summary: "Clinical technology, full-stack architecture, and GenAI enablement for pharmaceutical R&D.",
    duties: [
      {
        label: "Platform",
        items: [
          "Lead the clinical data platform on React and Next.js, with Node.js and TypeScript services on AWS.",
          "Own eCOA delivery for ePRO, ClinRO, ObsRO, and PerfO: protocol-driven forms, offline capture, and cloud sync for sponsor and CRO monitoring.",
          "Cut load time about 30% by batching chatty APIs, caching hot reads in Redis, and rewriting the slow query plans.",
          "Standardised JWT and RBAC so each tenant only reaches its own trial data, with HIPAA audit logs on access.",
          "Rebuilt the Jenkins and AWS pipeline from 35–40 minutes to under 25, with no outage on the cutover.",
          "Mentor three engineers through architecture reviews before a clinical change is allowed to ship.",
          "Keep tenant isolation on the query path itself, so a missing filter cannot leak another sponsor's trial data.",
        ],
      },
      {
        label: "GenAI",
        items: [
          "Prototype RAG for clinical PDFs: ingestion, chunking, embeddings, and semantic retrieval so answers stay tied to the source passage.",
          "Build citation-backed Q&A over trial documentation, with the retrieved chunk shown beside the model answer.",
          "Run structured extraction with prompting plus schema validation, and block records that fail the schema before they enter downstream systems.",
          "Scope every model call with RBAC, sanitize prompts and outputs, redact PII, and write an audit log for the request.",
          "Work with compliance and clinical stakeholders on those guardrails before an AI feature is allowed into production.",
        ],
      },
    ],
  },
  {
    id: "citius",
    company: "CitiusTech",
    role: "Senior Software Engineer → Tech Lead",
    dates: "Oct 2020 — Oct 2024",
    place: "Bengaluru",
    summary: "Healthcare prior-authorization platform, above 10k requests a day.",
    duties: [
      {
        label: "Delivery",
        items: [
          "Owned the prior-authorization engine end to end: React screens, Node.js APIs, MongoDB and PostgreSQL records, above 10k requests a day.",
          "Ran a full performance audit, rebuilt the heavy screens, and added lazy loading. Page load dropped about 25%.",
          "Raised API speed about 20% with Redis on the hot reads, MongoDB compound indexes, and removal of N+1 query loops.",
          "Put SonarQube gates on CI and cleared 40+ code smells in two sprints so quality stopped being a late review.",
          "Shipped a React and TypeScript component library in Storybook, aligned to WCAG 2.1, and adopted by three product teams.",
          "Moved from senior engineer to tech lead in 2022: design reviews, shared UI contracts, and stakeholder tradeoffs on the insurance workflow.",
          "Treated the component library as the contract between teams, so prior-auth screens stopped drifting in spacing, focus order, and error states.",
        ],
      },
    ],
  },
  {
    id: "lnt",
    company: "L&T Technology Services",
    role: "Software Engineer",
    dates: "Dec 2018 — Aug 2020",
    place: "Bengaluru",
    summary: "CGM and glucose monitoring. The graph is the day's sensor curve, and the CGM data also supplies the daily insulin details.",
    duties: [
      {
        label: "Monitoring",
        items: [
          "Built the glucose monitoring graph from CGM readings so a day of sensor data reads as one curve.",
          "Used that CGM data to show daily insulin details, instead of leaving insulin off the graph.",
          "Aligned glucose and insulin on the same day timeline, so a rise or drop in glucose can be read next to the insulin for that day.",
          "Kept the day as the unit of review: one graph, the sensor curve, and the insulin that CGM data recorded for it.",
        ],
      },
    ],
  },
  {
    id: "huawei",
    company: "Huawei Technologies",
    role: "Associate Software Engineer",
    dates: "Apr 2018 — Aug 2018",
    place: "Bengaluru",
    summary: "First role after graduation, inside a large enterprise JavaScript front end.",
    duties: [
      {
        label: "Foundation",
        items: [
          "Fixed UI defects and shipped small features inside a large shared JavaScript front end, without breaking neighboring modules.",
          "Learned the delivery path that the later roles assumed: Git history, code review comments, and Agile sprint commitments on a shared front end.",
          "Shipped fixes in small slices so a change in one screen did not regress the rest of the enterprise UI.",
        ],
      },
    ],
  },
];

export type Skill = { name: string; emoji: string };

export const skillGroups: { title: string; heading: string; items: Skill[] }[] = [
  {
    title: "Next.js",
    heading: "Next.js",
    items: [
      { name: "React.js", emoji: "⚛️" },
      { name: "Hooks", emoji: "🪝" },
      { name: "React Server Components", emoji: "🧩" },
      { name: "React 19 Actions", emoji: "⚡" },
      { name: "Next.js", emoji: "▲" },
      { name: "App Router", emoji: "🗺️" },
      { name: "SSR / CSR", emoji: "🔄" },
      { name: "Middleware", emoji: "🛡️" },
      { name: "API Routes", emoji: "🛣️" },
      { name: "Form Handling", emoji: "📝" },
      { name: "Streaming SSR", emoji: "🌊" },
      { name: "Partial Prerendering", emoji: "⏩" },
      { name: "next-auth v5", emoji: "🔐" },
    ],
  },
  {
    title: "Node.js",
    heading: "Backend and API engineering",
    items: [
      { name: "Node.js", emoji: "🟢" },
      { name: "Express.js", emoji: "🚂" },
      { name: "TypeScript", emoji: "🔷" },
      { name: "REST APIs", emoji: "🔌" },
      { name: "GraphQL", emoji: "◈" },
      { name: "WebSockets", emoji: "📡" },
      { name: "BullMQ", emoji: "🐂" },
      { name: "Socket programming", emoji: "🧵" },
      { name: "JWT auth", emoji: "🎫" },
      { name: "Cookies", emoji: "🍪" },
      { name: "File uploads", emoji: "📤" },
      { name: "Rate limiting", emoji: "⏱️" },
      { name: "OpenAPI / Swagger", emoji: "📘" },
    ],
  },
  {
    title: "State",
    heading: "State management and data fetching",
    items: [
      { name: "Redux Toolkit", emoji: "🧰" },
      { name: "Context API", emoji: "🎯" },
      { name: "Zustand", emoji: "🐻" },
      { name: "React Query", emoji: "♻️" },
      { name: "Flux", emoji: "🌀" },
    ],
  },
  {
    title: "Databases",
    heading: "Databases and data engineering",
    items: [
      { name: "MongoDB", emoji: "🍃" },
      { name: "Mongoose", emoji: "🦦" },
      { name: "PostgreSQL", emoji: "🐘" },
      { name: "MySQL", emoji: "🐬" },
      { name: "Oracle", emoji: "🔴" },
      { name: "Redis", emoji: "🟥" },
      { name: "Elasticsearch", emoji: "🔍" },
      { name: "ChromaDB", emoji: "🎨" },
      { name: "Pinecone", emoji: "🌲" },
      { name: "Indexing and query plans", emoji: "📐" },
      { name: "Caching", emoji: "💨" },
      { name: "Data modelling", emoji: "🧱" },
    ],
  },
  {
    title: "Python",
    heading: "Python and AI-backend engineering",
    items: [
      { name: "Python", emoji: "🐍" },
      { name: "FastAPI", emoji: "⚡" },
      { name: "Pydantic", emoji: "✅" },
      { name: "asyncio", emoji: "🔁" },
      { name: "SQLAlchemy", emoji: "🧪" },
      { name: "Alembic", emoji: "🧬" },
      { name: "Celery", emoji: "🌿" },
      { name: "Kafka", emoji: "📨" },
      { name: "Airflow", emoji: "🌬️" },
      { name: "Design patterns", emoji: "🏛️" },
      { name: "Logging", emoji: "📋" },
    ],
  },
  {
    title: "LLMs",
    heading: "GenAI · LLMs and RAG",
    items: [
      { name: "OpenAI", emoji: "✨" },
      { name: "Claude", emoji: "🧡" },
      { name: "Gemini", emoji: "♊" },
      { name: "Hugging Face", emoji: "🤗" },
      { name: "NLP", emoji: "💬" },
      { name: "Prompt engineering", emoji: "✍️" },
      { name: "Fine-tuning", emoji: "🎛️" },
      { name: "RAG pipelines", emoji: "📚" },
      { name: "Embeddings", emoji: "🔢" },
      { name: "pgvector", emoji: "🐘" },
      { name: "Hybrid search", emoji: "🔀" },
      { name: "Graph RAG", emoji: "🕸️" },
      { name: "Agentic RAG", emoji: "🤖" },
      { name: "Semantic search", emoji: "🔎" },
      { name: "Doc ingestion and chunking", emoji: "✂️" },
      { name: "Structured extraction", emoji: "📦" },
      { name: "Citation-backed answers", emoji: "📎" },
    ],
  },
  {
    title: "Agents",
    heading: "GenAI · agents and LLMOps",
    items: [
      { name: "LangChain", emoji: "🔗" },
      { name: "LangGraph", emoji: "🕸️" },
      { name: "CrewAI", emoji: "👥" },
      { name: "AutoGen", emoji: "🤝" },
      { name: "LlamaIndex", emoji: "🦙" },
      { name: "RAGAS", emoji: "📏" },
      { name: "DeepEval", emoji: "🧪" },
      { name: "LangSmith", emoji: "🔬" },
      { name: "Monitoring and cost", emoji: "💰" },
    ],
  },
  {
    title: "AI security",
    heading: "GenAI · AI security",
    items: [
      { name: "Prompt-injection defense", emoji: "🛡️" },
      { name: "Guardrails", emoji: "🚧" },
      { name: "PII protection", emoji: "🙈" },
      { name: "AI governance", emoji: "⚖️" },
    ],
  },
  {
    title: "Cloud",
    heading: "AWS and multi-cloud AI",
    items: [
      { name: "EC2", emoji: "🖥️" },
      { name: "S3", emoji: "🪣" },
      { name: "Lambda", emoji: "λ" },
      { name: "API Gateway", emoji: "🚪" },
      { name: "CloudWatch", emoji: "📈" },
      { name: "IAM", emoji: "🪪" },
      { name: "AWS Bedrock", emoji: "🪨" },
      { name: "SageMaker", emoji: "🧠" },
      { name: "CDK / CloudFormation", emoji: "🏗️" },
      { name: "SQS / SNS", emoji: "📬" },
      { name: "ECS / EKS", emoji: "☸️" },
      { name: "Cognito", emoji: "👤" },
      { name: "Multi-region architecture", emoji: "🌍" },
    ],
  },
  {
    title: "DevOps",
    heading: "DevOps, CI/CD, and observability",
    items: [
      { name: "Docker", emoji: "🐳" },
      { name: "Docker Compose", emoji: "🧱" },
      { name: "Jenkins", emoji: "🎩" },
      { name: "GitHub Actions", emoji: "⚙️" },
      { name: "Bamboo", emoji: "🎋" },
      { name: "Nginx", emoji: "🌐" },
      { name: "Terraform", emoji: "🏗️" },
      { name: "Kubernetes", emoji: "☸️" },
      { name: "Helm", emoji: "⎈" },
      { name: "Prometheus", emoji: "🔥" },
      { name: "Grafana", emoji: "📊" },
      { name: "OpenTelemetry", emoji: "📡" },
    ],
  },
  {
    title: "Architecture",
    heading: "System design and security architecture",
    items: [
      { name: "System design", emoji: "🏛️" },
      { name: "Microservices", emoji: "🔷" },
      { name: "Distributed systems", emoji: "🕸️" },
      { name: "Event-driven architecture", emoji: "📨" },
      { name: "CAP theorem", emoji: "⚖️" },
      { name: "API design", emoji: "🧩" },
      { name: "Caching layers", emoji: "💨" },
      { name: "Multi-tenancy", emoji: "🏢" },
      { name: "JWT", emoji: "🎫" },
      { name: "OAuth 2", emoji: "🔑" },
      { name: "RBAC", emoji: "🛂" },
      { name: "OWASP", emoji: "🛡️" },
      { name: "HIPAA-aligned handling", emoji: "🏥" },
      { name: "Audit logging", emoji: "📒" },
    ],
  },
  {
    title: "Quality",
    heading: "Quality engineering and testing",
    items: [
      { name: "Jest", emoji: "🃏" },
      { name: "Mocha", emoji: "☕" },
      { name: "Chai", emoji: "🍵" },
      { name: "Pytest", emoji: "🐍" },
      { name: "SonarQube CI gates", emoji: "🚦" },
      { name: "Unit and integration tests", emoji: "✅" },
    ],
  },
];

export const principles = [
  {
    kicker: "Performance",
    text: "A clinical screen is a latency budget. No change merges without a before and after on load time or the API.",
  },
  {
    kicker: "Security",
    text: "HIPAA is the data flow: JWT, RBAC, tenant filters, PII redaction, and an audit log written on the request.",
  },
  {
    kicker: "Libraries",
    text: "A Storybook library is a UI contract. Spacing, focus order, and error states stay stable when the next team adopts it.",
  },
  {
    kicker: "Reviews",
    text: "A review that teaches beats a review that only patches. Pull the engineer up with the code.",
  },
  {
    kicker: "Metrics",
    text: "If the improvement cannot be measured, it has not been proven.",
  },
  {
    kicker: "Loop",
    text: "Ship, measure, tighten the query or the pipeline, then repeat until the architecture itself is the bottleneck.",
  },
];

export const radar = [
  { name: "System design", level: 75, note: "Deep dive" },
  { name: "pgvector / hybrid search", level: 60, note: "Hands-on" },
  { name: "Agentic RAG + LangGraph", level: 50, note: "Building" },
  { name: "OpenTelemetry", level: 50, note: "Hands-on" },
  { name: "Kubernetes / Helm", level: 40, note: "Studying" },
  { name: "LLM eval & guardrails", level: 40, note: "In progress" },
  { name: "AWS Bedrock / SageMaker", level: 25, note: "Exploring" },
];

export const terminalLines = [
  { prompt: true, text: "ssh sashikanta@production --role SDE-4 --years 8" },
  { prompt: false, text: "Authenticating  ··················  100%  CONNECTED" },
  { prompt: false, text: "role        SDE-4 · Senior AI Full Stack Engineer" },
  { prompt: false, text: "company     IQVIA R&D Solutions · Bengaluru" },
  { prompt: false, text: "domain      Healthcare · Pharma R&D · HIPAA" },
  { prompt: false, text: "stack       React · Next.js · Node · TypeScript · AWS" },
  { prompt: false, text: "ai          Python · FastAPI · LangGraph · RAG" },
  { prompt: false, text: "impact      ~30% loads · ~40% deploys · ~20% APIs" },
  { prompt: false, text: "seeking     Lead / Principal · Bengaluru · Remote" },
  { prompt: false, text: "status      ONLINE — building, mentoring, shipping" },
];
