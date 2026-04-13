export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  image: string;
  mockupColor: string;
  tags: string[];
  liveUrl?: string;
  stats: { label: string; value: string }[];
  problem: string;
  solution: string;
  process: string[];
  results: string[];
}

export const projects: Project[] = [
  {
    slug: "luxe-real-estate",
    title: "Luxe Real Estate",
    category: "Business Website",
    year: "2024",
    description: "Premium property listing platform with immersive 3D tours and AI-powered search.",
    longDescription:
      "A high-end real estate platform designed to convert premium buyers. The site features immersive property tours, AI-powered search, and a seamless booking experience that increased inquiries by 340%.",
    image: "/projects/luxe-real-estate.jpg",
    mockupColor: "from-amber-900 to-stone-900",
    tags: ["WordPress", "Custom Theme", "WooCommerce"],
    liveUrl: "#",
    stats: [
      { label: "Conversion Rate", value: "+340%" },
      { label: "Page Speed", value: "98/100" },
      { label: "Leads/Month", value: "2,400+" },
    ],
    problem:
      "The client had a dated website with 0.8% conversion rate and high bounce rates. Potential buyers were leaving without inquiring.",
    solution:
      "We redesigned the entire UX flow with immersive imagery, instant lead capture, and AI property matching — reducing friction at every funnel step.",
    process: ["Discovery & Strategy", "Wireframing & UX Design", "Custom WordPress Theme", "Speed Optimization", "A/B Testing"],
    results: [
      "340% increase in lead generation",
      "Page speed score of 98/100",
      "Bounce rate reduced from 72% to 31%",
      "Average session duration increased by 4.2 minutes",
    ],
  },
  {
    slug: "nova-saas-platform",
    title: "Nova SaaS Platform",
    category: "Web Application",
    year: "2024",
    description: "B2B SaaS dashboard with real-time analytics, team collaboration tools and billing.",
    longDescription:
      "A full-featured B2B SaaS platform serving 5,000+ business users with real-time dashboards, team management, and integrated Stripe billing.",
    image: "/projects/nova-saas.jpg",
    mockupColor: "from-violet-900 to-indigo-900",
    tags: ["Custom Development", "UI/UX", "Conversion CRO"],
    liveUrl: "#",
    stats: [
      { label: "Active Users", value: "5,200+" },
      { label: "MRR Growth", value: "+180%" },
      { label: "Churn Rate", value: "-45%" },
    ],
    problem:
      "The startup had a complex product but poor onboarding experience causing 60% trial abandonment within the first 24 hours.",
    solution:
      "Redesigned the onboarding flow with progressive disclosure, contextual tooltips, and milestone-based progression to guide users to their 'aha moment'.",
    process: ["User Research", "Jobs-to-be-Done Analysis", "Prototype & Test", "Iterative Design", "Launch & Monitor"],
    results: [
      "Trial abandonment reduced from 60% to 18%",
      "MRR grew 180% within 6 months",
      "NPS score improved from 32 to 71",
      "Support tickets reduced by 55%",
    ],
  },
  {
    slug: "bloom-ecommerce",
    title: "Bloom E-Commerce",
    category: "E-Commerce",
    year: "2023",
    description: "Luxury fashion brand store with editorial experience and 1-click checkout.",
    longDescription:
      "A conversion-focused e-commerce store for a luxury fashion label, combining editorial storytelling with frictionless shopping — resulting in 220% revenue increase.",
    image: "/projects/bloom-ecommerce.jpg",
    mockupColor: "from-rose-900 to-pink-900",
    tags: ["WooCommerce", "Speed Optimization", "SEO"],
    liveUrl: "#",
    stats: [
      { label: "Revenue Increase", value: "+220%" },
      { label: "AOV Growth", value: "+85%" },
      { label: "Cart Abandonment", value: "-38%" },
    ],
    problem:
      "Slow page loads (8.2s) and a complex checkout were costing the brand thousands in lost sales every week.",
    solution:
      "Implemented a custom WooCommerce theme with aggressive performance optimization, 1-click checkout, and FOMO-driven product pages.",
    process: ["Performance Audit", "Custom WooCommerce Theme", "1-Click Checkout", "Email Recovery Flows", "Paid Ads Landing Pages"],
    results: [
      "Page load time reduced from 8.2s to 1.1s",
      "Revenue increased 220% YoY",
      "Cart abandonment dropped 38%",
      "AOV increased 85% with upsell flows",
    ],
  },
  {
    slug: "atlas-consulting",
    title: "Atlas Consulting",
    category: "Business Website",
    year: "2023",
    description: "Authority-building website for global management consulting firm with automated lead nurturing.",
    longDescription:
      "A sophisticated brand platform for a top-tier consulting firm, built to establish authority among Fortune 500 prospects and generate high-value inbound leads.",
    image: "/projects/atlas-consulting.jpg",
    mockupColor: "from-slate-800 to-zinc-900",
    tags: ["WordPress", "UI/UX", "Lead Generation"],
    liveUrl: "#",
    stats: [
      { label: "Organic Traffic", value: "+290%" },
      { label: "Lead Quality", value: "+4x" },
      { label: "Ranking Keywords", value: "380+" },
    ],
    problem:
      "Despite world-class expertise, the firm's website failed to convey authority and was generating low-quality leads that didn't convert to retainers.",
    solution:
      "Repositioned the brand online with thought leadership content architecture, case study storytelling, and an SEO strategy targeting high-intent C-suite searches.",
    process: ["Brand Strategy", "Information Architecture", "Content Strategy", "SEO Foundation", "Conversion Optimization"],
    results: [
      "290% increase in organic search traffic",
      "Lead-to-proposal rate improved from 8% to 31%",
      "Ranking for 380+ high-value keywords",
      "3 Fortune 500 clients acquired within 4 months",
    ],
  },
  {
    slug: "pulse-fitness",
    title: "Pulse Fitness App",
    category: "Landing Page",
    year: "2024",
    description: "High-converting landing page for fitness app launch — 40,000 signups in 3 weeks.",
    longDescription:
      "A high-stakes product launch landing page for a fitness app that needed to generate waitlist signups. The page achieved 40,000 email captures in its first 3 weeks.",
    image: "/projects/pulse-fitness.jpg",
    mockupColor: "from-emerald-900 to-teal-900",
    tags: ["Landing Page", "CRO", "UI/UX Design"],
    liveUrl: "#",
    stats: [
      { label: "Email Signups", value: "40,000+" },
      { label: "Conversion Rate", value: "28.4%" },
      { label: "Time to Launch", value: "7 days" },
    ],
    problem:
      "The startup needed maximum signups pre-launch to demonstrate traction to investors. They had 7 days before a major industry event.",
    solution:
      "Built a psychologically-optimized landing page combining social proof, scarcity mechanics, and a viral referral loop — launched in 7 days.",
    process: ["CRO Strategy", "Wireframe & Copy", "High-Fidelity Design", "Development", "A/B Testing"],
    results: [
      "40,000+ signups in 3 weeks",
      "28.4% visitor-to-signup conversion rate",
      "Viral coefficient of 1.4 via referral loop",
      "Secured $2.1M seed funding using traction data",
    ],
  },
];
