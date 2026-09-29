const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const newProjects = [
  {
    slug: "ontier-group",
    title: "Ontier Group",
    category: "Luxury Property Development",
    filterCategory: "Construction",
    year: "2026",
    description: "Adelaide's premier luxury property development and high-end construction showcase.",
    longDescription: "Ontier Group specializes in luxury residential and commercial property development across Adelaide, Australia. The goal was to create a refined digital experience reflecting supreme architectural sophistication and craftsmanship, presenting their premium developments to discerning investors and homebuyers.",
    image: "/uploads/thumb-ontier-group-1790708322293.webp",
    mockupColor: "from-stone-800 to-amber-950",
    liveUrl: "https://ontier.com.au/",
    stats: [
      { value: "Luxury", label: "Developments" },
      { value: "Adelaide", label: "Location" }
    ],
    tags: [
      "Property Development",
      "Luxury Living",
      "Web Design",
      "High-End Architecture"
    ],
    problem: "Ontier Group required an upscale digital platform that reflected their high-standard developments and engaged prospective luxury homebuyers and investors.",
    solution: "Engineered a bespoke, minimalist digital presentation featuring immersive visual portfolios, development specifications, and direct inquiry channels.",
    process: [
      "Brand Strategy",
      "Luxury UI/UX Design",
      "Responsive Web Development",
      "SEO & Performance Optimization"
    ],
    results: [
      "Elevated luxury brand prestige",
      "Streamlined qualified investor inquiries"
    ],
    screenshot: "/uploads/screencapture-ontier-group-1790708322293.webp"
  },
  {
    slug: "new-dynamic-builders",
    title: "New Dynamic Builders",
    category: "Roofing & General Contracting",
    filterCategory: "Construction",
    year: "2026",
    description: "Professional roof replacement and exterior contracting services in New York City.",
    longDescription: "New Dynamic Builders delivers expert commercial and residential roofing, roof replacement, repair, and waterproofing across Brooklyn and the NYC metropolitan area. We built a high-conversion, speed-optimized website with immediate click-to-call functionality and instant quote requests.",
    image: "/uploads/thumb-new-dynamic-builders-1790708328499.webp",
    mockupColor: "from-blue-900 to-slate-950",
    liveUrl: "https://newdynamicbuilders.com/",
    stats: [
      { value: "NYC", label: "Coverage" },
      { value: "24/7", label: "Emergency" }
    ],
    tags: [
      "Roofing",
      "Contractor",
      "Local SEO",
      "Lead Generation"
    ],
    problem: "The client needed an authoritative local presence in the competitive NYC roofing market to capture high-intent inbound emergency and replacement leads.",
    solution: "Designed a conversion-focused platform with clear service breakdowns, local service areas, customer testimonials, and friction-free inquiry forms.",
    process: [
      "Competitor Analysis",
      "Conversion Architecture",
      "Frontend Development",
      "Local SEO Integration"
    ],
    results: [
      "Dramatic rise in inbound phone calls",
      "Top-tier search rankings across Brooklyn"
    ],
    screenshot: "/uploads/screencapture-new-dynamic-builders-1790708328499.webp"
  },
  {
    slug: "chadworth-homes",
    title: "Chadworth Homes",
    category: "Real Estate Development",
    filterCategory: "Construction",
    year: "2026",
    description: "Real estate development, property rehabilitation, and community transformation across the Southeast.",
    longDescription: "Chadworth Homes is a comprehensive real estate development company revitalizing communities across Atlanta, Indianapolis, New Orleans, and beyond. We crafted a polished, modern platform to present their residential rehabs, new construction portfolio, and subcontractor recruitment programs.",
    image: "/uploads/thumb-chadworth-homes-1790708337278.webp",
    mockupColor: "from-emerald-900 to-slate-950",
    liveUrl: "https://chadworthhomes.com/",
    stats: [
      { value: "Multi-State", label: "Operations" },
      { value: "Community", label: "Impact" }
    ],
    tags: [
      "Real Estate Development",
      "Property Rehab",
      "Community Building",
      "Web Design"
    ],
    problem: "Chadworth Homes needed an expansive web platform to appeal to investors, municipalities, prospective homeowners, and trade subcontractors.",
    solution: "Built a narrative-driven website with dedicated portals for projects, contractor partnerships, and financing initiatives.",
    process: [
      "UX Journey Mapping",
      "Visual System Design",
      "Interactive Development",
      "Mobile Optimization"
    ],
    results: [
      "Expanded contractor onboarding",
      "Enhanced institutional trust and investor buy-in"
    ],
    screenshot: "/uploads/screencapture-chadworth-homes-1790708337278.webp"
  },
  {
    slug: "elevated-construction-ca",
    title: "Elevated Construction",
    category: "General Contracting & Remodeling",
    filterCategory: "Construction",
    year: "2026",
    description: "High-quality residential construction and remodeling tailored to deadlines and budgets in California.",
    longDescription: "Elevated Construction CA provides full-service home building, remodeling, and construction management throughout California. We developed a sleek, modern visual showcase featuring project galleries, clear timelines, and interactive quote estimation.",
    image: "/uploads/thumb-elevated-construction-ca-1790708346497.webp",
    mockupColor: "from-zinc-800 to-amber-950",
    liveUrl: "https://elevatedconstructionca.com/",
    stats: [
      { value: "California", label: "Service Area" },
      { value: "Custom", label: "Remodeling" }
    ],
    tags: [
      "Construction",
      "Remodeling",
      "Residential Builder",
      "California"
    ],
    problem: "Needed a fresh, mobile-friendly portfolio website that showcased their craftsmanship and helped potential clients easily schedule project consultations.",
    solution: "Engineered an image-rich layout emphasizing finished renovation spaces, client testimonials, and simplified contact funnels.",
    process: [
      "Wireframing",
      "Modern Aesthetic Design",
      "Full Stack Development",
      "Performance Tuning"
    ],
    results: [
      "Higher conversion rate on quote forms",
      "Enhanced mobile user engagement"
    ],
    screenshot: "/uploads/screencapture-elevated-construction-ca-1790708346497.webp"
  },
  {
    slug: "california-business-group",
    title: "California Business Group",
    category: "Business Advisory & Consulting",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Comprehensive business advisory, corporate development, and strategic management solutions.",
    longDescription: "California Business Group provides executive advisory, corporate structuring, and growth strategies for enterprises and growing businesses across California. We delivered an authoritative, corporate digital presence emphasizing their strategic depth and track record.",
    image: "/uploads/thumb-california-business-group-1790708358253.webp",
    mockupColor: "from-slate-800 to-indigo-950",
    liveUrl: "https://californiabusinessgroup.com/",
    stats: [
      { value: "Executive", label: "Advisory" },
      { value: "Growth", label: "Consulting" }
    ],
    tags: [
      "Business Consulting",
      "Corporate Strategy",
      "Enterprise Advisory",
      "Web Development"
    ],
    problem: "The advisory firm required a prestigious corporate image to engage institutional partners and high-net-worth business clients.",
    solution: "Designed a sharp, corporate interface with clear advisory pillars, credentials, and executive appointment scheduling.",
    process: [
      "Brand Strategy",
      "Content Architecture",
      "UI Design System",
      "Security & Speed Optimization"
    ],
    results: [
      "Strengthened corporate credibility",
      "Increased executive consultation bookings"
    ],
    screenshot: "/uploads/screencapture-california-business-group-1790708358253.webp"
  },
  {
    slug: "digital-gaming",
    title: "Digital Gaming",
    category: "Gaming Studio & Mobile Entertainment",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Innovative mobile game studio and interactive entertainment publisher behind award-winning titles.",
    longDescription: "Digital Gaming develops and publishes high-concept mobile games and immersive interactive entertainment, including award-winning titles like X-Flight. We designed a vibrant, high-energy gaming web portal showcasing their title roster, player statistics, and publisher partnerships.",
    image: "/uploads/thumb-digital-gaming-1790708366477.webp",
    mockupColor: "from-purple-900 to-violet-950",
    liveUrl: "https://digitalgaming.io/",
    stats: [
      { value: "Award", label: "Winning" },
      { value: "Global", label: "Players" }
    ],
    tags: [
      "Game Studio",
      "Mobile Games",
      "Interactive Tech",
      "UI Design"
    ],
    problem: "Needed a dynamic digital hub to showcase award-winning gaming titles to both players and prospective studio partners.",
    solution: "Crafted a dark-mode, gamer-oriented visual design with media showcases, download links, and studio milestones.",
    process: [
      "Creative Direction",
      "Motion UI Design",
      "Frontend Implementation",
      "Asset Optimization"
    ],
    results: [
      "Enhanced player acquisition",
      "Expanded publisher inquiries and media coverage"
    ],
    screenshot: "/uploads/screencapture-digital-gaming-1790708366477.webp"
  },
  {
    slug: "lee-business-law",
    title: "Lee Business Law",
    category: "Business Law & Legal Counsel",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Experienced corporate legal representation, consulting, and mediation in Michigan and Texas.",
    longDescription: "Led by Attorney Cha'ris Lee, Esq., Lee Business Law provides seasoned legal counsel for emerging businesses, corporations, and individuals across Michigan and Texas. We developed an authoritative, client-centered platform designed to clearly convey complex legal services and streamline case evaluations.",
    image: "/uploads/thumb-lee-business-law-1790708374392.webp",
    mockupColor: "from-amber-900 to-stone-950",
    liveUrl: "https://leebusinesslaw.com/",
    stats: [
      { value: "MI & TX", label: "Bar Admission" },
      { value: "Corporate", label: "Counsel" }
    ],
    tags: [
      "Business Law",
      "Legal Counsel",
      "Mediation",
      "Attorney Website"
    ],
    problem: "Client needed a modern web presence that established deep legal authority across multiple state jurisdictions.",
    solution: "Implemented a clean, trust-inspiring layout with detailed practice area guides, attorney background, and secure consultation intake.",
    process: [
      "Legal Content Strategy",
      "Accessible UI Design",
      "CMS Setup",
      "Responsive Development"
    ],
    results: [
      "Higher client inquiry conversion",
      "Seamless multi-jurisdiction practice presentation"
    ],
    screenshot: "/uploads/screencapture-lee-business-law-1790708374392.webp"
  },
  {
    slug: "portus-law",
    title: "Portus Law Firm",
    category: "Immigration & Corporate Law",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Powering the American Dream through strategic immigration, investor visas, and corporate law.",
    longDescription: "Portus Law Firm represents international entrepreneurs, investors, and families navigating U.S. immigration and corporate law. We engineered an empowering, modern legal platform featuring multilingual readiness, clear visa category navigation, and direct case consultation booking.",
    image: "/uploads/thumb-portus-law-1790708381549.webp",
    mockupColor: "from-blue-900 to-indigo-950",
    liveUrl: "https://portuslaw.com/",
    stats: [
      { value: "USA", label: "Immigration" },
      { value: "Investor", label: "Visas" }
    ],
    tags: [
      "Immigration Law",
      "Investor Visas",
      "Legal Services",
      "Web Design"
    ],
    problem: "Needed to break down intricate U.S. immigration processes into transparent pathways that build client confidence.",
    solution: "Built a streamlined informational architecture with interactive visa pathway guides and straightforward consultation scheduling.",
    process: [
      "User Flow Architecture",
      "Brand Typography & Styling",
      "Web Development",
      "Conversion Testing"
    ],
    results: [
      "Significant increase in international consultation requests",
      "Lower client bounce rate"
    ],
    screenshot: "/uploads/screencapture-portus-law-1790708381549.webp"
  },
  {
    slug: "fortius-law",
    title: "Fortius Law Group",
    category: "Property Insurance Claim Advocates",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Dedicated property insurance dispute attorneys advocating aggressively for policyholders.",
    longDescription: "Fortius Law Group advocates relentlessly for property owners facing denied, delayed, or underpaid insurance claims. We created a high-impact, trust-building web presence designed to give distressed policyholders immediate reassurance and a clear claim evaluation intake.",
    image: "/uploads/thumb-fortius-law-1790708386968.webp",
    mockupColor: "from-slate-900 to-sky-950",
    liveUrl: "https://www.fortiuslaw.com/",
    stats: [
      { value: "Claims", label: "Advocacy" },
      { value: "Zero Fee", label: "Unless We Win" }
    ],
    tags: [
      "Property Insurance",
      "Insurance Litigation",
      "Claim Disputes",
      "Law Firm"
    ],
    problem: "Policyholders need fast, trustworthy help during urgent property damage disputes without complex legal jargon.",
    solution: "Developed an assertive, supportive design with immediate emergency claim submission forms and transparent legal explanations.",
    process: [
      "Urgent Response UX",
      "High-Trust Design System",
      "Custom Form Development",
      "SEO Strategy"
    ],
    results: [
      "Accelerated claim review intakes",
      "Boosted organic search traffic for property disputes"
    ],
    screenshot: "/uploads/screencapture-fortius-law-1790708386968.webp"
  },
  {
    slug: "recon-construction-group",
    title: "Recon Construction Group",
    category: "Veteran-Owned Roofing & Construction",
    filterCategory: "Construction",
    year: "2026",
    description: "Veteran-owned residential and commercial roofing and gutter specialists in Texas.",
    longDescription: "Recon Construction Group is a proud veteran-owned roofing contractor delivering residential, commercial, metal roofing, and gutter installations across Texas. We developed a robust, disciplined web platform celebrating their core values of faith, family, and exceptional craftsmanship.",
    image: "/uploads/thumb-recon-construction-group-1790708404248.webp",
    mockupColor: "from-neutral-800 to-stone-950",
    liveUrl: "https://reconconstructiongroup.com/",
    stats: [
      { value: "Veteran", label: "Owned" },
      { value: "Texas", label: "Contractor" }
    ],
    tags: [
      "Roofing Contractor",
      "Veteran-Owned",
      "Commercial Roofing",
      "Texas"
    ],
    problem: "Needed to stand out in the crowded Texas roofing market while honoring their veteran identity and community trust.",
    solution: "Crafted an impactful, brand-aligned website showcasing completed roofs, roofing materials guides, and rapid inspection booking.",
    process: [
      "Identity Alignment",
      "High-Converting Layout",
      "Interactive Galleries",
      "Performance Optimization"
    ],
    results: [
      "Surge in local residential inspection bookings",
      "Enhanced reputation among commercial property managers"
    ],
    screenshot: "/uploads/screencapture-recon-construction-group-1790708404248.webp"
  },
  {
    slug: "sawtooth-peak-excavation",
    title: "Sawtooth Peak Excavation",
    category: "Excavation & Concrete Contracting",
    filterCategory: "Construction",
    year: "2026",
    description: "Premier earthmoving, site development, concrete, and excavation contractor in Northern Utah.",
    longDescription: "Sawtooth Peak Excavation is Northern Utah's premier contractor for heavy excavation, site preparation, foundation concrete, and civil earthmoving. We built a rugged, highly professional digital platform showcasing their modern fleet, precision grading work, and contractor capabilities.",
    image: "/uploads/thumb-sawtooth-peak-excavation-1790708413839.webp",
    mockupColor: "from-amber-950 to-stone-900",
    liveUrl: "https://sawtoothpeakexcavation.com/",
    stats: [
      { value: "#1 Utah", label: "Contractor" },
      { value: "Heavy", label: "Equipment" }
    ],
    tags: [
      "Excavation",
      "Site Prep",
      "Concrete",
      "Utah Contractor"
    ],
    problem: "The company required a professional digital showcase to win municipal bids, commercial contracts, and residential lot preparations.",
    solution: "Designed a heavy-duty, modern contractor platform detailing capabilities, safety standards, and project bid request systems.",
    process: [
      "Industry Research",
      "Capability Showcase UX",
      "Mobile Responsive Build",
      "Fast Loading Architecture"
    ],
    results: [
      "Increase in high-value commercial bid requests",
      "Establishment as Utah's go-to excavation contractor"
    ],
    screenshot: "/uploads/screencapture-sawtooth-peak-excavation-1790708413839.webp"
  },
  {
    slug: "source-and-supplies",
    title: "Source and Supplies",
    category: "Staffing & Recruitment Agency",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Connecting businesses with qualified talent across healthcare, tech, pharma, and skilled trades.",
    longDescription: "Source and Supplies is a dynamic staffing and recruitment firm connecting forward-thinking companies with exceptional temporary, contract, and permanent professionals. We designed a dual-audience portal serving both hiring managers seeking talent and candidates looking for career advancement.",
    image: "/uploads/thumb-source-and-supplies-1790708422451.webp",
    mockupColor: "from-teal-900 to-slate-950",
    liveUrl: "https://www.sourceandsupplies.com/",
    stats: [
      { value: "Smart", label: "Hiring" },
      { value: "Multi-Industry", label: "Placements" }
    ],
    tags: [
      "Staffing Agency",
      "Recruitment",
      "Talent Acquisition",
      "Business Services"
    ],
    problem: "The agency needed to simultaneously attract corporate hiring clients and top candidate talent without overwhelming navigation.",
    solution: "Implemented an intuitive bifurcated portal featuring employer talent requests, candidate resume submissions, and industry sector hubs.",
    process: [
      "Dual-User Journey Architecture",
      "Modern Corporate UI",
      "Form & Resume Integration",
      "SEO Tuning"
    ],
    results: [
      "Rapid growth in candidate applications",
      "Increased placement contracts across healthcare and tech"
    ],
    screenshot: "/uploads/screencapture-source-and-supplies-1790708422451.webp"
  }
];

async function addProjects() {
  const workspaceRoot = process.cwd();
  const dataPath = path.join(workspaceRoot, 'data', 'site-content.json');
  const envPath = path.join(workspaceRoot, '.env.local');

  if (!fs.existsSync(dataPath)) {
    console.error('data/site-content.json not found');
    process.exit(1);
  }

  const raw = fs.readFileSync(dataPath, 'utf8');
  const content = JSON.parse(raw);

  if (!content.projects) {
    content.projects = [];
  }

  let addedCount = 0;
  let skippedCount = 0;

  for (const project of newProjects) {
    const existingIndex = content.projects.findIndex(p => {
      const matchSlug = p.slug && p.slug === project.slug;
      const matchUrl = p.liveUrl && project.liveUrl && 
        p.liveUrl.toLowerCase().replace(/\/$/, '') === project.liveUrl.toLowerCase().replace(/\/$/, '');
      return matchSlug || matchUrl;
    });

    if (existingIndex !== -1) {
      console.log(`Skipping already existing project: ${project.title} (${project.slug})`);
      skippedCount++;
    } else {
      content.projects.push(project);
      console.log(`Added new project: ${project.title} (${project.slug})`);
      addedCount++;
    }
  }

  console.log(`\nSummary: Added ${addedCount}, Skipped ${skippedCount}, Total Projects: ${content.projects.length}`);

  // Write to local data/site-content.json
  fs.writeFileSync(dataPath, JSON.stringify(content, null, 2), 'utf8');
  console.log('Saved updated site-content.json successfully.');

  // Push to MongoDB
  if (!fs.existsSync(envPath)) {
    console.error('.env.local not found; cannot read MONGODB_URI');
    process.exit(1);
  }

  const envRaw = fs.readFileSync(envPath, 'utf8');
  const match = envRaw.match(/^MONGODB_URI=(.*)$/m);
  const uri = match ? match[1].trim().replace(/^"|"$/g, '') : null;

  if (!uri) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

  try {
    await client.connect();
    const db = client.db('portfolio_db');
    const col = db.collection('site_content');

    const res = await col.updateOne(
      { type: 'main_content' },
      { $set: { data: content, updatedAt: new Date() } },
      { upsert: true }
    );

    console.log('MongoDB update result:', res);
    console.log('Content successfully synchronized to MongoDB database!');

    // Verify by reading back from MongoDB
    const verifyDoc = await col.findOne({ type: 'main_content' });
    const countInDb = verifyDoc?.data?.projects?.length;
    console.log(`Verified MongoDB document now has ${countInDb} projects.`);
  } catch (err) {
    console.error('Failed to update MongoDB:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

addProjects().catch(console.error);
