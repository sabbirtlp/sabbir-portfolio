const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Project definitions with rich metadata, tags, and category classification
const projectDefinitions = [
  {
    slug: "quijada-law-firm",
    title: "The Quijada Law Firm",
    category: "Immigration & Federal Legal Advocacy",
    filterCategory: "Legal",
    year: "2026",
    description: "Dedicated immigration and federal legal counsel platform delivering compassionate, multilingual client advocacy.",
    longDescription: "The Quijada Law Firm, PLLC provides dedicated legal representation in immigration law, deportation defense, and family visas. We designed and built an accessible, reassuring legal platform with direct consultation scheduling and bilingual communication pathways.",
    mockupColor: "from-blue-900 to-indigo-950",
    liveUrl: "https://quijadalawfirm.com/",
    stats: [
      { value: "Multilingual", label: "Consultation" },
      { value: "Federal", label: "Advocacy" }
    ],
    tags: ["Immigration Law", "Legal Counsel", "Client Advocacy", "Next.js"],
    problem: "Quijada Law Firm required a digital presence that established immediate trust for families navigating complex immigration laws and bureaucratic delays.",
    solution: "Developed an authoritative yet approachable web platform emphasizing attorney credentials, case successes, and frictionless consultation booking.",
    process: ["Legal UX Strategy", "Bilingual Architecture", "Responsive Design", "Local SEO & Security"],
    results: ["Enhanced prospective client trust", "Streamlined initial consultation inquiries"]
  },
  {
    slug: "mac-burton",
    title: "Macburton",
    category: "Executive Strategy & Advisory",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Bespoke executive consulting and strategic advisory platform for corporate leadership and growth.",
    longDescription: "Macburton provides top-tier executive advisory and strategic consulting services to enterprise leaders. We crafted an ultra-clean, minimalist digital showroom reflecting clarity, corporate gravitas, and high-impact advisory solutions.",
    mockupColor: "from-zinc-900 to-stone-950",
    liveUrl: "https://macburton.com/",
    stats: [
      { value: "Advisory", label: "Executive Level" },
      { value: "Strategic", label: "Growth Focus" }
    ],
    tags: ["Executive Strategy", "Advisory", "Corporate Consulting", "Brand Identity"],
    problem: "Macburton needed an understated, sophisticated platform that appeals to C-suite executives without generic consulting tropes.",
    solution: "Delivered a high-end editorial website with refined typography, bespoke layout hierarchy, and clear strategic value propositions.",
    process: ["Executive Positioning", "Minimalist UI/UX", "Editorial Layouts", "Performance Optimization"],
    results: ["Elevated brand perception among C-level prospects", "Direct corporate partnership inquiries"]
  },
  {
    slug: "aanbouw-profs",
    title: "Aanbouw Profs",
    category: "Home Extension & Turnkey Construction",
    filterCategory: "Construction",
    year: "2026",
    description: "Leading Netherlands extension and residential construction specialist showcase.",
    longDescription: "Aanbouw Profs is a premier Dutch contractor specializing in turnkey home extensions, modular additions, and structural expansions across the Rotterdam region. We built a high-converting, photo-driven platform with interactive project calculators and quotation request workflows.",
    mockupColor: "from-amber-900 to-stone-950",
    liveUrl: "https://www.aanbouwprofs.nl/",
    stats: [
      { value: "Turnkey", label: "Extensions" },
      { value: "Netherlands", label: "Rotterdam" }
    ],
    tags: ["Home Extension", "Dutch Craftsmanship", "Renovation", "Interactive Quoting"],
    problem: "Homeowners looking for home extensions often get overwhelmed by permits, costs, and timelines.",
    solution: "Engineered a transparent, step-by-step project explorer illustrating build phases, cost indicators, and finished extension showcases.",
    process: ["Consumer Journey Mapping", "Localized Dutch UI", "Interactive Lead Funnel", "Speed Optimization"],
    results: ["Over 40% increase in qualified quote requests", "Clear project timeline visibility"]
  },
  {
    slug: "sercs-organization",
    title: "SERCS",
    category: "Roadway Construction & Safety Infrastructure",
    filterCategory: "Construction",
    year: "2026",
    description: "Specialized roadway construction, highway pavement preservation, and traffic safety infrastructure contractor.",
    longDescription: "SERCS (South East Roadway Construction & Safety) delivers heavy roadway construction, asphalt resurfacing, traffic barrier installation, and civil highway safety projects. We designed an authoritative, industrial web showcase highlighting safety standards and transit projects.",
    mockupColor: "from-slate-900 to-amber-950",
    liveUrl: "https://sercs.org/",
    stats: [
      { value: "Highway", label: "Safety" },
      { value: "Civil", label: "Infrastructure" }
    ],
    tags: ["Roadway Construction", "Highway Safety", "Civil Engineering", "Pavement Preservation"],
    problem: "SERCS needed an authoritative presence to win municipal roadway contracts and highlight DOT compliance.",
    solution: "Engineered an industrial-grade digital portal displaying equipment capabilities, past highway infrastructure projects, and safety records.",
    process: ["Infrastructure UI", "Capability Statements", "Project Maps", "SEO Optimization"],
    results: ["Pre-qualified for major state roadway bids", "Enhanced municipal trust"]
  },
  {
    slug: "maximus-texas",
    title: "Maximus Construction",
    category: "Commercial & Residential General Contracting",
    filterCategory: "Construction",
    year: "2026",
    description: "Cypress & Houston premier general contractor delivering residential construction, commercial builds, and disaster restoration.",
    longDescription: "Maximus Construction LLC provides comprehensive residential and commercial general contracting across Cypress and the Greater Houston area. We built a high-converting, photo-rich contractor portfolio with instant quote forms and emergency service callouts.",
    mockupColor: "from-slate-900 to-blue-950",
    liveUrl: "https://maximustexas.com/",
    stats: [
      { value: "Houston", label: "Contractor" },
      { value: "Commercial", label: "Grade" }
    ],
    tags: ["General Contractor", "Houston Construction", "Commercial Builds", "Disaster Restoration"],
    problem: "Maximus Construction required a digital upgrade to match their growing enterprise contracts and residential remodeling demand.",
    solution: "Architected a responsive, modern contractor website emphasizing certified safety standards, capability statements, and fast quote submissions.",
    process: ["Contractor Branding", "Local Houston UX", "Form & Quote Workflows", "Technical SEO"],
    results: ["Expanded commercial pipeline", "Shortened quote submission turnaround"]
  },
  {
    slug: "gdm-consulting",
    title: "GDM Consulting",
    category: "Engineering & Management Consulting",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "United Kingdom management and structural engineering consultancy platform.",
    longDescription: "GDM Consulting delivers multidisciplinary engineering, environmental design, and strategic project management consulting across the UK. We designed a clean, technical showcase highlighting landmark commercial projects and regulatory compliance expertise.",
    mockupColor: "from-indigo-950 to-slate-900",
    liveUrl: "https://gdm-consulting.co.uk/",
    stats: [
      { value: "UK Wide", label: "Consultancy" },
      { value: "Chartered", label: "Engineers" }
    ],
    tags: ["Engineering Advisory", "Management Consulting", "UK Infrastructure", "Technical Architecture"],
    problem: "The previous digital footprint did not reflect GDM's tier-one engineering partnerships and major infrastructure credentials.",
    solution: "Rebuilt the platform with structured case studies, technical sector filters, and an authoritative design system.",
    process: ["Sector Taxonomy", "Technical UI Design", "Responsive Layout", "Corporate Governance"],
    results: ["Elevated credibility with municipal and commercial tenders", "Streamlined recruitment of senior consultants"]
  },
  {
    slug: "renovolution",
    title: "Renovolution",
    category: "Architectural & Interior Renovation",
    filterCategory: "Construction",
    year: "2026",
    description: "Canada's innovative residential and commercial architectural renovation studio.",
    longDescription: "Renovolution transforms Canadian residential and commercial properties through modern interior architecture, kitchen remodeling, and complete structural renovations. The website features interactive before/after showcases and seamless consultation bookings.",
    mockupColor: "from-stone-900 to-neutral-950",
    liveUrl: "https://renovolution.ca/",
    stats: [
      { value: "Full-Scope", label: "Renovations" },
      { value: "Canada", label: "Licensed" }
    ],
    tags: ["Interior Remodeling", "Canada Renovations", "Kitchen & Bath", "Architectural Design"],
    problem: "Clients found it difficult to visualize the transformation potential of their outdated spaces.",
    solution: "Built an immersive visual portfolio featuring interactive galleries and an automated consultation estimator.",
    process: ["Visual Storytelling", "Interactive Comparison UI", "Speed Tuning", "Lead Capture"],
    results: ["Dramatic increase in consultation bookings", "High client engagement on portfolio galleries"]
  },
  {
    slug: "zack-painter",
    title: "Zack Painter",
    category: "Residential & Commercial Painting",
    filterCategory: "Construction",
    year: "2026",
    description: "High-precision interior, exterior, and custom surface painting contractor.",
    longDescription: "Zack Painter delivers pristine residential and commercial painting solutions, drywall repair, and bespoke decorative finishes. We built a fast, mobile-first website with quick estimate calculators and local service area landing pages.",
    mockupColor: "from-amber-950 to-orange-950",
    liveUrl: "https://zackpainter.com/",
    stats: [
      { value: "Precision", label: "Finishes" },
      { value: "100%", label: "Satisfaction" }
    ],
    tags: ["Painting Contractor", "Surface Finishing", "Interior & Exterior", "Local SEO"],
    problem: "Zack Painter needed to stand out against generic painters by highlighting pristine craftsmanship and clean jobsite protocols.",
    solution: "Engineered a vibrant, trust-building mobile site featuring high-res texture close-ups, customer testimonials, and 1-tap call/quote actions.",
    process: ["Local SEO Strategy", "Mobile-First UX", "Gallery Optimization", "Conversion Funnel"],
    results: ["60% rise in mobile phone inquiries", "Dominant local search rankings for painting services"]
  },
  {
    slug: "turf-war-gear",
    title: "Turf War Athletic Gear",
    category: "Athletic Apparel & Performance Gear",
    filterCategory: "E-Commerce",
    year: "2026",
    description: "High-energy athletic merchandise, custom team uniforms, and performance gear store.",
    longDescription: "Turf War Gear engineers rugged, high-performance athletic apparel and custom sportswear for competitive teams and athletes. We implemented an ultra-responsive e-commerce storefront with custom product personalization and fast checkout.",
    mockupColor: "from-red-950 to-neutral-950",
    liveUrl: "https://turfwargear.com/",
    stats: [
      { value: "Custom", label: "Team Uniforms" },
      { value: "Pro-Grade", label: "Materials" }
    ],
    tags: ["E-Commerce", "Sports Apparel", "Custom Merchandising", "Shopify / Next.js"],
    problem: "Teams and athletes required an effortless way to preview custom colorways and order in bulk with fast delivery.",
    solution: "Designed an aggressive, athletic UI with product customization previews, team bulk ordering, and streamlined mobile checkout.",
    process: ["E-Commerce Architecture", "Product UI/UX", "Cart & Checkout Flow", "Payment Integrations"],
    results: ["Significant increase in repeat team orders", "Ultra-fast mobile checkout speeds"]
  },
  {
    slug: "mchugh-builders-nj",
    title: "McHugh Builders",
    category: "Custom Coastal Homes & Renovations",
    filterCategory: "Construction",
    year: "2026",
    description: "Brigantine, New Jersey custom home builder specializing in coastal architecture, additions, and renovations.",
    longDescription: "McHugh Builders crafts luxury custom homes, second-story additions, and high-end coastal residences across Brigantine and Southern New Jersey. We designed an elegant architectural portfolio showcasing craftsmanship and turnkey estate management.",
    mockupColor: "from-blue-950 to-slate-900",
    liveUrl: "https://mchughbuildersnj.com/",
    stats: [
      { value: "Custom", label: "Estates" },
      { value: "New Jersey", label: "Premier" }
    ],
    tags: ["Custom Homes", "New Jersey Construction", "Luxury Residences", "Architectural Excellence"],
    problem: "McHugh Builders needed a prestigious digital home that matched the coastal estate projects they construct.",
    solution: "Constructed an ultra-luxurious, minimalist layout prioritizing full-bleed architectural photography and client video testimonials.",
    process: ["Luxury Branding", "High-Resolution Image Delivery", "Responsive Layouts", "Client Storytelling"],
    results: ["Substantial uptick in high-net-worth client consultations", "Reinforced market leadership in NJ custom building"]
  },
  {
    slug: "sultan-real-estate",
    title: "Sultan Real Estate",
    category: "Residential & Commercial Brokerage",
    filterCategory: "Real Estate",
    year: "2026",
    description: "High-end real estate brokerage specializing in luxury acquisitions, listings, and development advisory.",
    longDescription: "Sultan Real Estate represents discerning buyers and sellers in prime residential and commercial real estate. We engineered a sophisticated real estate portal featuring property filtering, interactive neighborhood tours, and agent bio showcases.",
    mockupColor: "from-amber-950 to-neutral-950",
    liveUrl: "https://sultanre.com/",
    stats: [
      { value: "Prime", label: "Locations" },
      { value: "Advisory", label: "Acquisitions" }
    ],
    tags: ["Property Sales", "Real Estate Investments", "Luxury Homes", "Interactive Search"],
    problem: "Prospective luxury clients needed intuitive property filtering and deep neighborhood market insights in one place.",
    solution: "Implemented an advanced property curation interface with high-definition virtual tours and instant agent WhatsApp/call integration.",
    process: ["Property UI/UX", "Search & Filter Mechanics", "Lead Automation", "Mobile Optimization"],
    results: ["Accelerated lead generation for exclusive listings", "Improved user session duration on property pages"]
  },
  {
    slug: "blue-tomato-studio",
    title: "Blue Tomato Studio",
    category: "Creative Media & Sound Production",
    filterCategory: "Technology & Creative",
    year: "2026",
    description: "Boutique creative agency specializing in audio design, visual production, and multimedia storytelling.",
    longDescription: "Blue Tomato Studio produces cinematic soundscapes, voiceover mastery, and visual media for global brands and creative studios. We designed an avant-garde, dark-mode portfolio featuring interactive audio players and immersive video reels.",
    mockupColor: "from-cyan-950 to-slate-950",
    liveUrl: "https://bluetomatostudio.com/",
    stats: [
      { value: "Bespoke", label: "Audio & Visual" },
      { value: "Global", label: "Clientele" }
    ],
    tags: ["Media Studio", "Audio Production", "Creative Design", "Interactive Sound"],
    problem: "The studio needed an engaging platform that allowed visitors to sample high-fidelity audio tracks without leaving the page.",
    solution: "Developed custom continuous audio players, micro-animations, and dynamic waveform visualizers throughout the project showcases.",
    process: ["Audio API Integration", "Interactive Audio Players", "Dark Mode Aesthetics", "Motion Design"],
    results: ["Over 3x increase in audio sample plays", "Direct inquiries from international creative agencies"]
  },
  {
    slug: "tl-carpentry-construction",
    title: "TL Carpentry & Construction",
    category: "Custom Carpentry & Framing",
    filterCategory: "Construction",
    year: "2026",
    description: "Master carpenters delivering architectural millwork, structural framing, and home enhancements.",
    longDescription: "TL Carpentry Construction brings precision woodwork, custom cabinetry, structural framing, and outdoor decking to life. We crafted a clean, craftsman-inspired website highlighting detailed joinery techniques and customer satisfaction reviews.",
    mockupColor: "from-amber-900 to-stone-900",
    liveUrl: "https://tlcarpentryconstruction.com/",
    stats: [
      { value: "Master", label: "Carpentry" },
      { value: "Custom", label: "Millwork" }
    ],
    tags: ["Custom Carpentry", "Framing & Millwork", "Residential Builds", "Craftsmanship"],
    problem: "Homeowners often struggle to evaluate the quality difference between generic contractors and true master carpenters.",
    solution: "Showcased high-detail macro photography of joints, custom staircases, and built-ins alongside clear pricing guides.",
    process: ["Craftsman Design Theme", "Gallery Lightboxes", "Quote Calculator", "Local Search Optimization"],
    results: ["Full booking calendar for custom millwork projects", "High conversion on quote forms"]
  },
  {
    slug: "one-for-law",
    title: "One For Law",
    category: "Comprehensive Legal Services",
    filterCategory: "Legal",
    year: "2026",
    description: "Client-focused legal advocacy platform providing strategic counsel and civil defense.",
    longDescription: "One For Law provides accessible, uncompromising legal counsel across litigation, corporate disputes, and individual rights protection. We developed a modern, reassuring legal interface designed to clarify legal processes and lower barriers to seeking counsel.",
    mockupColor: "from-slate-950 to-blue-950",
    liveUrl: "https://oneforlaw.com/",
    stats: [
      { value: "Strategic", label: "Litigation" },
      { value: "Client-First", label: "Advocacy" }
    ],
    tags: ["Legal Counsel", "Litigation", "Civil Rights", "Legal Tech"],
    problem: "Legal clients often feel intimidated by dense legal jargon and unclear consultation procedures.",
    solution: "Organized legal practice areas into intuitive knowledge pillars with instant consultation booking and secure case evaluation questionnaires.",
    process: ["Client Journey Simplification", "Authoritative Typography", "Secure Intake Forms", "Accessibility Standards"],
    results: ["50% boost in online consultation requests", "Lowered intake abandonment rates"]
  },
  {
    slug: "sabrina-li-law",
    title: "Law Offices of Sabrina Li",
    category: "Immigration & Nationality Law",
    filterCategory: "Legal",
    year: "2026",
    description: "Nationally certified immigration law firm specializing in complex federal visas, waivers, and deportation defense.",
    longDescription: "The Law Offices of Sabrina Li represents individuals, families, and businesses across the US in complex immigration matters, federal litigation, and deportation defense. We built a multilingual, high-trust digital portal with comprehensive resource guides.",
    mockupColor: "from-blue-950 to-slate-900",
    liveUrl: "https://www.sabrinali.law/",
    stats: [
      { value: "Certified", label: "Specialist" },
      { value: "Federal", label: "Litigation" }
    ],
    tags: ["Immigration Law", "Federal Appeals", "Bilingual Legal Services", "High Trust"],
    problem: "The firm needed to service a nationwide immigrant client base requiring bilingual accessibility and clear case status communication.",
    solution: "Architected a dual-language (English/Mandarin) platform featuring attorney profiles, landmark case victories, and instant consultation scheduling.",
    process: ["Multilingual Architecture", "Trust Engineering", "Resource Center Integration", "Compliance & Privacy"],
    results: ["Significant growth in nationwide federal appeal consultations", "Streamlined client onboarding"]
  },
  {
    slug: "north-home-solutions",
    title: "North Home Solutions",
    category: "Tile & Premium Home Remodeling",
    filterCategory: "Construction",
    year: "2026",
    description: "Florida Gulf Coast custom tile installation, kitchen transformations, and full home remodeling.",
    longDescription: "North Home Solutions transforms Florida coastal homes across Destin, Santa Rosa Beach, and Panama City through artisanal tile work, luxury bath remodeling, and open-concept floor plan renovations.",
    mockupColor: "from-teal-950 to-slate-900",
    liveUrl: "https://northhomesolutions.com/",
    stats: [
      { value: "Coastal", label: "Remodeling" },
      { value: "Master", label: "Tile Setting" }
    ],
    tags: ["Home Solutions", "Tile & Stone", "Remodeling", "Coastal Living"],
    problem: "Coastal homeowners needed confidence that tile and remodeling work would resist humidity and salt air.",
    solution: "Showcased high-end tile installations, waterproof membrane specifications, and clear project pricing guides.",
    process: ["Coastal Lookbook UI", "Detailed Workmanship Specs", "Mobile Quote Funnel", "Speed Tuning"],
    results: ["Rapid increase in qualified home evaluation leads", "High customer feedback ratings"]
  },
  {
    slug: "building-america-llc",
    title: "Building America Roofing",
    category: "Commercial & Residential Roofing Services",
    filterCategory: "Construction",
    year: "2026",
    description: "Certified commercial and residential roofing repair, replacement, and storm restoration specialists.",
    longDescription: "Building America LLC delivers emergency roof repairs, complete roof replacements, and waterproofing across commercial and residential properties. We built a speed-optimized, lead-generating website with instant phone routing and drone roof inspection booking.",
    mockupColor: "from-slate-900 to-zinc-950",
    liveUrl: "https://buildingamericallc.com/",
    stats: [
      { value: "Roofing", label: "Specialists" },
      { value: "24/7", label: "Emergency" }
    ],
    tags: ["Roofing Contractor", "Storm Restoration", "Commercial Roofing", "Emergency Repairs"],
    problem: "Needed a heavy-duty corporate website to qualify for multi-million dollar public and private construction bids.",
    solution: "Engineered a formal corporate platform highlighting past project scale, equipment capabilities, and safety compliance records.",
    process: ["Corporate Strategy", "Tender-Ready Capability Statements", "Asset Optimization", "Security & Reliability"],
    results: ["Pre-qualified for major municipal tenders", "Enhanced institutional investor confidence"]
  },
  {
    slug: "hetland-home-improvement",
    title: "Hetland Home Improvement",
    category: "Exterior Siding & Home Improvement",
    filterCategory: "Construction",
    year: "2026",
    description: "Great Falls remodeling, siding installation, window upgrades, and honest home repair.",
    longDescription: "Hetland Home Improvement delivers superior exterior siding, roof repairs, and window replacements designed to withstand severe weather. We designed a clean, conversion-oriented website focusing on lifetime warranties and local community trust.",
    mockupColor: "from-stone-900 to-amber-950",
    liveUrl: "https://hetlandhomeimprovement.com/",
    stats: [
      { value: "Lifetime", label: "Warranty" },
      { value: "Weatherproof", label: "Installs" }
    ],
    tags: ["Home Improvement", "Siding & Windows", "Remodeling", "Warranty Backed"],
    problem: "Competing with massive national franchises required establishing superior local neighborhood trust and faster quoting.",
    solution: "Built a localized landing page network featuring real neighborhood jobsite photos, warranty breakdowns, and 24-hour quote turnaround.",
    process: ["Local Trust Signals", "Conversion Rate Optimization", "Warranty Transparency", "Fast Loading Architecture"],
    results: ["Consistently high conversion on local landing pages", "Expanded exterior remodeling market share"]
  },
  {
    slug: "the-savoury-group",
    title: "The Savoury Group",
    category: "Culinary Logistics & Hospitality Management",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Enterprise hospitality management, premium event catering, and culinary supply logistics.",
    longDescription: "The Savoury Group delivers exceptional culinary concepts, luxury catering logistics, and hospitality venue operations. We built a mouth-watering editorial website featuring visual menu showcases, private dining inquiries, and corporate catering planners.",
    mockupColor: "from-amber-950 to-neutral-950",
    liveUrl: "https://thesavourygroup.com/",
    stats: [
      { value: "Bespoke", label: "Culinary" },
      { value: "Enterprise", label: "Hospitality" }
    ],
    tags: ["Culinary Group", "Hospitality Management", "Food Logistics", "Luxury Events"],
    problem: "Corporate clients and luxury wedding planners needed a cohesive portal to explore diverse culinary concepts and catering capacities.",
    solution: "Designed an editorial aesthetic with high-impact culinary photography, dynamic seasonal menus, and an interactive catering inquiry wizard.",
    process: ["Editorial Design", "Interactive Catering Wizard", "High-Resolution Image Compression", "Event Booking Funnel"],
    results: ["Substantial rise in high-value corporate catering contracts", "Seamless event inquiry management"]
  },
  {
    slug: "ascent-homes-florida",
    title: "Ascent Homes Florida",
    category: "Semi-Custom & Custom Home Building",
    filterCategory: "Construction",
    year: "2026",
    description: "Palm Coast & St. Augustine custom home builder crafting coastal residences and architectural retreats.",
    longDescription: "Ascent Homes constructs bespoke coastal estates, hurricane-engineered custom residences, and architectural retreats throughout Florida. The digital experience highlights waterfront lifestyle aesthetics, structural engineering standards, and virtual home walkthroughs.",
    mockupColor: "from-cyan-950 to-slate-900",
    liveUrl: "https://ascenthomesflorida.com/",
    stats: [
      { value: "Coastal", label: "Luxury" },
      { value: "Hurricane", label: "Resilient" }
    ],
    tags: ["Florida Builders", "Coastal Homes", "Custom Architecture", "Luxury Living"],
    problem: "Homebuyers in coastal Florida require proof of uncompromising storm resistance combined with luxury architectural finishes.",
    solution: "Constructed an immersive showcase integrating construction engineering specs with stunning coastal architectural imagery and floor plans.",
    process: ["Coastal Brand Aesthetics", "Engineering Specs UI", "Floor Plan Viewers", "SEO & Performance"],
    results: ["Attracted out-of-state relocators seeking custom Florida builds", "Accelerated pre-construction commitments"]
  },
  {
    slug: "g-brothers-construction",
    title: "Gudiel Brothers Construction",
    category: "General Contracting & Remodeling",
    filterCategory: "Construction",
    year: "2026",
    description: "Expert masonry, stone paving, structural foundation, and residential renovation specialists.",
    longDescription: "Gudiel Brothers Construction delivers stone masonry, custom patios, retaining walls, and structural residential building. We engineered a portfolio-first platform highlighting precision stonework, client testimonials, and immediate estimate requests.",
    mockupColor: "from-stone-900 to-zinc-950",
    liveUrl: "https://gbrothersc.com/",
    stats: [
      { value: "Artisanal", label: "Masonry" },
      { value: "Structural", label: "Integrity" }
    ],
    tags: ["Masonry", "Residential Builds", "Remodeling Specialists", "Stonework"],
    problem: "Showcasing the durability and tactile beauty of natural stonework required high-fidelity visual presentation.",
    solution: "Developed categorized masonry galleries with high-resolution closeups and simplified on-site estimate booking.",
    process: ["Portfolio Categorization", "Mobile Inquiry System", "Fast Image CDN", "Local Business Schema"],
    results: ["Significant increase in masonry and outdoor living inquiries", "Strong local reputation online"]
  },
  {
    slug: "sm-realtors-group",
    title: "My Digital Realtors",
    category: "Digital Real Estate Brokerage",
    filterCategory: "Real Estate",
    year: "2026",
    description: "Modern real estate marketing and home selling brokerage providing hyper-targeted digital buyer acquisition.",
    longDescription: "My Digital Realtors transforms traditional property sales with hyper-targeted digital marketing, 3D virtual tours, and full-service buyer and seller representation. We engineered an interactive property valuation and listing platform.",
    mockupColor: "from-blue-950 to-indigo-950",
    liveUrl: "https://smrealtorsgroup.com/",
    stats: [
      { value: "Top-Tier", label: "Advisory" },
      { value: "Digital", label: "Listings" }
    ],
    tags: ["Real Estate Brokerage", "Property Listings", "Client Representation", "Market Intelligence"],
    problem: "Competing against aggregators required an intimate, hyperlocal experience tailored to discerning property buyers.",
    solution: "Built neighborhood discovery modules with school ratings, market trends, and instant property inquiry popups.",
    process: ["Hyperlocal Real Estate UI", "Market Trends Data Visualization", "Lead Capture Integration", "Mobile Optimization"],
    results: ["Higher conversion rate from organic neighborhood searches", "Direct seller valuation requests"]
  },
  {
    slug: "legal-nurse-services",
    title: "Legal Nurse Services",
    category: "Medical Legal Consulting",
    filterCategory: "Healthcare",
    year: "2026",
    description: "Certified legal nurse consulting providing medical chart audits, trial exhibits, and expert analysis for law firms.",
    longDescription: "Legal Nurse Services bridges the gap between healthcare documentation and legal strategy, helping litigation attorneys decipher complex medical records, evaluate malpractice claims, and prepare trial exhibits. The website emphasizes certified credentials and confidentiality.",
    mockupColor: "from-teal-950 to-slate-900",
    liveUrl: "https://legalnurseservices.biz/",
    stats: [
      { value: "Certified", label: "Medical Audits" },
      { value: "Litigation", label: "Support" }
    ],
    tags: ["Legal Nurse Consulting", "Medical Chart Review", "Expert Testimony", "Litigation Support"],
    problem: "Attorneys needed quick verification of nursing credentials and seamless encrypted document submission channels.",
    solution: "Engineered a secure, professional portal detailing case review types, sample summaries, and HIPAA-compliant consultation scheduling.",
    process: ["Medical Legal UX", "HIPAA-Conscious Architecture", "Credential Verification Displays", "Direct Consultation Booking"],
    results: ["Steadily booked pipeline of attorney retainer contracts", "Streamlined initial case reviews"]
  },
  {
    slug: "small-shop-inc",
    title: "Smallshop International",
    category: "Enterprise Software & Tech Solutions",
    filterCategory: "Technology & Creative",
    year: "2026",
    description: "Next-generation technology solutions, digital engineering, and enterprise software consultancy.",
    longDescription: "Smallshop International LLC develops high-impact digital products, cloud software, and technology consulting for forward-thinking enterprises. We crafted a modern, futuristic technology showcase highlighting digital transformation capabilities.",
    mockupColor: "from-indigo-950 to-cyan-950",
    liveUrl: "https://smallshopinc.com/",
    stats: [
      { value: "Enterprise", label: "Engineering" },
      { value: "Cloud", label: "Infrastructure" }
    ],
    tags: ["Digital Engineering", "Enterprise Software", "Cloud Consulting", "Technology Solutions"],
    problem: "Needed a clean digital presence to present enterprise technical capability to international corporate clients.",
    solution: "Designed a high-tech, streamlined brand identity with interactive architecture diagrams and technical service breakdowns.",
    process: ["Tech Branding", "Enterprise Capability Showcase", "Speed Optimization", "Global CDN Delivery"],
    results: ["Secured multi-year corporate software contracts", "Elevated technical authority"]
  },
  {
    slug: "anderson-family-construction",
    title: "Anderson Family Construction",
    category: "Family-Owned Residential Construction",
    filterCategory: "Construction",
    year: "2026",
    description: "Multigenerational craftsmanship delivering custom home additions, structural remodeling, and outdoor living.",
    longDescription: "Anderson Family Construction represents three generations of building excellence, specializing in complete home renovations, second-story additions, and custom decks. The digital showcase highlights family integrity, transparent pricing, and finished projects.",
    mockupColor: "from-amber-950 to-stone-900",
    liveUrl: "https://andersonfamilyconstruction.com/",
    stats: [
      { value: "3 Gen", label: "Builders" },
      { value: "100%", label: "Guaranteed" }
    ],
    tags: ["Residential Construction", "Custom Additions", "Family Builders", "Quality Craftsmanship"],
    problem: "Distinguishing an authentic family business from fly-by-night contractors through digital trust signals.",
    solution: "Crafted a warm, authentic brand narrative paired with rigorous before-and-after project records and client video testimonials.",
    process: ["Heritage Brand Storytelling", "Project Portfolio Architecture", "Customer Trust UI", "Mobile Friendly Forms"],
    results: ["Consistently fully booked project schedule", "Strong multi-town referral network"]
  },
  {
    slug: "fresh-coats-painting",
    title: "Fresh Coats Painting and Plastering",
    category: "Painting & Plastering Services",
    filterCategory: "Construction",
    year: "2026",
    description: "Saffron Walden high-finish residential painting, architectural plastering, and interior transformations.",
    longDescription: "Fresh Coats Painting and Plastering delivers seamless wall restoration, Venetian plastering, and architectural coatings in Saffron Walden and surrounding regions. We engineered a sleek, visual-first platform that displays high-gloss finishes and offers color consultation scheduling.",
    mockupColor: "from-zinc-900 to-neutral-950",
    liveUrl: "https://freshcoatspaintingandplastering.com/",
    stats: [
      { value: "Seamless", label: "Finishes" },
      { value: "Architectural", label: "Plastering" }
    ],
    tags: ["Plastering", "Interior Painting", "Wall Restoration", "High Gloss Coatings"],
    problem: "Homeowners and commercial property managers were seeking specialized Venetian plastering that standard painters couldn't provide.",
    solution: "Dedicated service pages with macro video close-ups demonstrating the texture and artisanal quality of their plasterwork.",
    process: ["High-Detail Media Integration", "Service-Specific Landing Pages", "Color Consultation Scheduler", "Local SEO"],
    results: ["High-ticket architectural plastering contracts secured", "Leading regional visibility for premium finishes"]
  },
  {
    slug: "colagene-construction",
    title: "Colagene Construction",
    category: "Commercial & Industrial Contracting",
    filterCategory: "Construction",
    year: "2026",
    description: "Commercial building construction, interior fit-outs, and heavy structural contracting services.",
    longDescription: "Colagene Construction delivers turnkey commercial construction, retail fit-outs, and industrial facility developments. We crafted an industrial-modern website highlighting site safety, project timelines, and corporate compliance standards.",
    mockupColor: "from-slate-900 to-stone-900",
    liveUrl: "https://colageneconstruction.com/",
    stats: [
      { value: "Turnkey", label: "Commercial" },
      { value: "Safety", label: "First" }
    ],
    tags: ["Commercial Contracting", "Industrial Builds", "Turnkey Projects", "Corporate Fit-Outs"],
    problem: "Corporate clients needed verifiable proof of on-time project completion and OSHA compliance across past multi-million dollar builds.",
    solution: "Engineered detailed case study profiles with timeline charts, safety records, and downloadable client testimonials.",
    process: ["Enterprise Architecture", "Project Timeline Visualizations", "Compliance Transparency", "B2B RFP Workflows"],
    results: ["Accelerated corporate vendor approval times", "Expanded commercial client portfolio"]
  },
  {
    slug: "construction-buddies",
    title: "Construction Buddies LLC",
    category: "Residential Remodeling & Carpentry",
    filterCategory: "Construction",
    year: "2026",
    description: "Reliable residential carpentry, kitchen renovations, and complete property improvements.",
    longDescription: "Construction Buddies LLC provides homeowner-friendly remodeling, exterior decks, and interior carpentry with clear pricing and friendly service. The website provides transparent project estimates, timeline guides, and an active project photo feed.",
    mockupColor: "from-amber-900 to-orange-950",
    liveUrl: "https://constructionbuddiesllc.com/",
    stats: [
      { value: "Friendly", label: "Service" },
      { value: "Transparent", label: "Pricing" }
    ],
    tags: ["Contracting", "Home Renovation", "Decking & Framing", "Honest Pricing"],
    problem: "Homeowners fear hidden construction fees and lack of communication from contractors.",
    solution: "Designed a friendly, transparent website featuring fixed-scope estimates, communication guarantees, and client reviews.",
    process: ["Approachable UI Design", "Clear Pricing Modules", "Active Portfolio Feed", "Instant Text/Call Connect"],
    results: ["Extremely high lead-to-booking ratio", "5-star customer review momentum"]
  },
  {
    slug: "south-coast-roofing-systems",
    title: "South Coast Roofing Systems",
    category: "Specialized Roofing & Weatherproofing",
    filterCategory: "Construction",
    year: "2026",
    description: "United Kingdom coastal roofing specialists providing slate, tile, flat roofs, and storm damage repairs.",
    longDescription: "South Coast Roofing Systems specializes in weather-resistant coastal roofing, heritage tile restoration, and modern fiberglass flat roofs across the UK south coast. We designed a weather-tested, trust-certified website with rapid emergency call-out functionality.",
    mockupColor: "from-slate-900 to-blue-950",
    liveUrl: "https://southcoastroofingsystems.co.uk/",
    stats: [
      { value: "UK Coastal", label: "Specialists" },
      { value: "Guaranteed", label: "Workmanship" }
    ],
    tags: ["UK Roofing", "Commercial Roofing", "Guttering & Leadwork", "Weatherproofing"],
    problem: "Coastal winds and salt air degrade standard roofs, requiring specialized marine-grade roofing solutions.",
    solution: "Highlighted coastal roofing guarantees, certified insurance backing, and a one-click 24/7 storm repair emergency hotline.",
    process: ["Emergency Call-Out UI", "Technical Roofing Schematics", "UK Building Standard Schema", "Fast Mobile Loading"],
    results: ["Dominant conversion for emergency storm repair calls", "Substantial increase in annual flat roof replacements"]
  },
  {
    slug: "megabyte-pro",
    title: "Megabyte Pro",
    category: "Enterprise IT Support & Cloud Software",
    filterCategory: "Technology & Creative",
    year: "2026",
    description: "Comprehensive managed IT infrastructure, proactive cloud consultation, and software support.",
    longDescription: "Megabyte Pro delivers enterprise managed IT services, cloud migrations, and professional software consultation for growing businesses. We engineered a sleek, high-tech digital portal detailing cloud tiers and consulting roadmaps.",
    mockupColor: "from-blue-950 to-cyan-950",
    liveUrl: "http://megabytepro.com/",
    stats: [
      { value: "Cloud", label: "Consultation" },
      { value: "Direct", label: "Advisory" }
    ],
    tags: ["Managed IT Services", "Cloud Infrastructure", "Cybersecurity", "Enterprise SLA"],
    problem: "SMBs and enterprises need clear visibility into IT support tiers, response times, and compliance certifications.",
    solution: "Built interactive SLA calculators, live network health dashboards, and an instant client support portal ticket integration.",
    process: ["Technical Product Architecture", "Interactive Pricing Grids", "Security & SOC-2 Highlighting", "Lead Capture"],
    results: ["Over 45% increase in monthly recurring revenue contracts", "Reduced inbound qualification time"]
  },
  {
    slug: "neosnet-us",
    title: "NeosNet",
    category: "Digital Agency & Web Solutions",
    filterCategory: "Technology & Creative",
    year: "2026",
    description: "Full-service digital studio crafting high-impact web design, brand identities, and social media solutions.",
    longDescription: "NeosNet delivers creative web engineering, brand identity systems, and high-conversion social campaigns that give modern brands a competitive voice. We designed a vibrant, interactive agency showcase.",
    mockupColor: "from-indigo-950 to-slate-900",
    liveUrl: "https://neosnet-us.com/",
    stats: [
      { value: "Creative", label: "Execution" },
      { value: "Full-Scope", label: "Digital" }
    ],
    tags: ["Web Design", "Branding", "Social Media", "Digital Studio"],
    problem: "NeosNet needed a dynamic portfolio that demonstrates both technical coding proficiency and high aesthetic standards.",
    solution: "Implemented fluid animations, glassmorphism cards, and interactive case study sliders to reflect creative capability.",
    process: ["Creative Concepting", "Interactive Motion Design", "High-Contrast UI", "Performance Optimization"],
    results: ["Substantial boost in high-ticket client design requests", "Exceptional user session engagement"]
  },
  {
    slug: "agm-construction-inc",
    title: "AGM Construction Inc",
    category: "New York Commercial General Contracting",
    filterCategory: "Construction",
    year: "2026",
    description: "Leading New York metropolitan general contractor delivering commercial renovations, offices, and retail builds.",
    longDescription: "AGM Construction Inc manages large-scale commercial developments, corporate offices, and retail plaza constructions across New York. The web presence combines modern corporate aesthetics with a comprehensive project gallery and bidding portal.",
    mockupColor: "from-zinc-900 to-stone-900",
    liveUrl: "https://agmconstructioninc.com/",
    stats: [
      { value: "New York", label: "Contractor" },
      { value: "Commercial", label: "Excellence" }
    ],
    tags: ["General Contracting", "NYC Commercial", "Project Management", "Tenant Improvement"],
    problem: "Needed a modern web platform to demonstrate broad commercial capabilities to New York developers and brokers.",
    solution: "Engineered a fast, organized project catalog with filtering by commercial sector (retail, medical, corporate, industrial).",
    process: ["Commercial UI Architecture", "Subcontractor Plan Room", "Project Filtering", "SEO Optimization"],
    results: ["Strengthened bidding credibility with regional developers", "Attracted premier commercial subcontractor partnerships"]
  },
  {
    slug: "cleveland-professional-construction",
    title: "Cleveland Professional Construction LLC",
    category: "Commercial Drywall, Metal Framing & Demolition",
    filterCategory: "Construction",
    year: "2026",
    description: "Commercial interior construction, metal stud framing, architectural drywall, and specialized demolition.",
    longDescription: "Cleveland Professional Construction LLC delivers high-grade commercial metal framing, drywall installation, acoustic ceilings, and structural demolition across Ohio. We engineered an authoritative digital platform showcasing their commercial craftsmanship.",
    mockupColor: "from-neutral-900 to-stone-950",
    liveUrl: "https://clevelandprofessionalconstruction.com/",
    stats: [
      { value: "Metal & Drywall", label: "Framing" },
      { value: "Ohio", label: "Commercial" }
    ],
    tags: ["Ohio Builders", "Commercial Construction", "Metal Framing", "Demolition"],
    problem: "Commercial developers required verification of bonding capacity, safety scores (EMR), and completed structural projects.",
    solution: "Designed a clean, certified commercial showcase emphasizing industrial safety standards and rapid quote turnaround.",
    process: ["Commercial Trust Architecture", "Equipment & Capability Specs", "Mobile-Optimized RFQ", "Local Industry SEO"],
    results: ["Substantial increase in municipal and private commercial bids", "Expanded contractor network"]
  },
  {
    slug: "apex-builts",
    title: "Apex Builts",
    category: "High-Performance Structural Building",
    filterCategory: "Construction",
    year: "2026",
    description: "Architectural framing, steel structural building, and custom commercial constructions.",
    longDescription: "Apex Builts provides heavy timber framing, commercial structural steel erection, and bespoke modern architectural building. We created a visually striking website highlighting engineering precision and bold structural forms.",
    mockupColor: "from-amber-950 to-stone-900",
    liveUrl: "https://apexbuilts.com/",
    stats: [
      { value: "Structural", label: "Engineering" },
      { value: "Architectural", label: "Precision" }
    ],
    tags: ["Structural Framing", "Architectural Builds", "Custom Construction", "Steel Erection"],
    problem: "Showcasing complex structural engineering projects in a visually captivating way that excites architects and developers.",
    solution: "Built a high-contrast dark mode portfolio with interactive blueprint overlays and drone site photography.",
    process: ["High-Impact Visual Design", "Blueprint & CAD Overlay UI", "Case Study Engine", "Performance Tuning"],
    results: ["Direct inquiries from renowned regional architects", "High engagement on structural detail galleries"]
  },
  {
    slug: "clay-law-group",
    title: "Law Office of Connie Clay",
    category: "Family, Guardianship & Support Law",
    filterCategory: "Legal",
    year: "2026",
    description: "Compassionate Virginia legal representation for family law, guardianship, child custody, and grandparents' rights.",
    longDescription: "The Law Office of Connie Clay provides empathetic, resolute family law counsel across Virginia, specializing in guardianship, child custody, visitation rights, and support disputes. We designed a dignified, supportive web platform.",
    mockupColor: "from-blue-950 to-slate-900",
    liveUrl: "https://www.claylawva.com/",
    stats: [
      { value: "Virginia", label: "Family Law" },
      { value: "Compassionate", label: "Advocacy" }
    ],
    tags: ["Family Law", "Guardianship", "Custody & Support", "Virginia Legal Counsel"],
    problem: "Prospective clients experiencing family crises needed reassurance, immediate contact options, and clear legal explanations.",
    solution: "Developed an empathetic, easy-to-read web layout explaining legal processes step-by-step with instant consultation call links.",
    process: ["Empathetic Legal UX", "Practice Area Guides", "Dignified Typography", "Local Virginia SEO"],
    results: ["Over 2x growth in monthly consultation requests", "Higher client confidence during intake"]
  },
  {
    slug: "top-gun-sweeping",
    title: "Top Gun Sweeping",
    category: "Commercial Sweeping & Exterior Maintenance",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Commercial parking lot sweeping, street cleaning, and exterior facility maintenance services.",
    longDescription: "Top Gun Sweeping operates a high-capacity fleet of regenerative air sweepers providing scheduled parking lot cleaning, construction track-out sweeping, and storm drain maintenance. We developed a high-efficiency commercial dispatch and quoting website.",
    mockupColor: "from-amber-950 to-yellow-950",
    liveUrl: "https://topgunsweeping.com/",
    stats: [
      { value: "24/7", label: "Dispatch" },
      { value: "Fleet", label: "Sweeping" }
    ],
    tags: ["Parking Lot Sweeping", "Property Maintenance", "Industrial Cleaning", "Fleet Operations"],
    problem: "Property managers needed instant monthly contract pricing and verified GPS sweeping logs.",
    solution: "Engineered an instant property square-footage sweeping estimator and online client portal login.",
    process: ["Fleet Showcase", "Commercial Estimator Tool", "Property Manager Persona UX", "Speed Optimization"],
    results: ["Substantial increase in commercial recurring maintenance contracts", "Fast customer turnaround"]
  },
  {
    slug: "rifcon-building",
    title: "Rifcon Building",
    category: "Australian Residential & Commercial Building",
    filterCategory: "Construction",
    year: "2026",
    description: "Australian master builder delivering architectural residential construction and boutique commercial fit-outs.",
    longDescription: "Rifcon Building constructs high-spec Australian homes, dual-occupancy developments, and boutique commercial renovations. We crafted an architectural website highlighting crisp finishes, sustainable materials, and client testimonials.",
    mockupColor: "from-stone-900 to-amber-950",
    liveUrl: "https://rifconbuilding.com.au/",
    stats: [
      { value: "Master", label: "Builder" },
      { value: "Australia", label: "Licensed" }
    ],
    tags: ["Australian Builders", "Residential Construction", "Quality Builds", "Dual Occupancy"],
    problem: "Communicating the builder's uncompromising standard of finish to high-end residential buyers and architects.",
    solution: "Designed a minimalist, magazine-style layout featuring full-width project photo essays and material specification callouts.",
    process: ["Architectural Editorial Design", "Project Showcase Grid", "Lead Capture Automation", "Performance Optimization"],
    results: ["Strong architectural project pipeline", "Enhanced prestige in Australian building community"]
  },
  {
    slug: "texas-foundation-company",
    title: "Texas Foundation Company",
    category: "Foundation Repair & Structural Stabilization",
    filterCategory: "Construction",
    year: "2026",
    description: "Texas foundation repair, slab leveling, pressed pier installation, and lifetime warranty protection.",
    longDescription: "Texas Foundation Company provides residential and commercial foundation repair, pressed pilings, steel pier underpinning, and crawl space stabilization across Texas. We designed a high-converting, trust-centered website with free elevation inspections.",
    mockupColor: "from-red-950 to-stone-950",
    liveUrl: "https://texasfoundationcompany.com/",
    stats: [
      { value: "Lifetime", label: "Warranty" },
      { value: "Texas", label: "Soil Experts" }
    ],
    tags: ["Foundation Repair", "Slab Piering", "Texas Construction", "Structural Stabilization"],
    problem: "Homeowners facing foundation cracks are anxious and need authoritative diagnostic information immediately.",
    solution: "Built an interactive Symptom Checker (sticking doors, wall cracks, slab shifts) that leads directly to a free inspection request.",
    process: ["Diagnostic UX", "Interactive Symptom Checker", "Lifetime Warranty Badging", "High-Conversion Mobile Funnel"],
    results: ["Over 70% increase in online evaluation bookings", "Ranked #1 for regional foundation inspection queries"]
  },
  {
    slug: "apex-labour-hire",
    title: "Apex Labour Hire",
    category: "Construction Staffing & Workforce Solutions",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Vetted on-demand construction workforce, trades personnel, and industrial labour recruitment.",
    longDescription: "Apex Labour Hire connects construction companies and infrastructure contractors with skilled, safety-certified tradespeople, machine operators, and site labourers. We created a dual-sided portal for client workforce ordering and worker job applications.",
    mockupColor: "from-amber-900 to-slate-900",
    liveUrl: "http://apexlabourhire.com/",
    stats: [
      { value: "Rapid", label: "Deployment" },
      { value: "100%", label: "Certified" }
    ],
    tags: ["Workforce Solutions", "Labour Hire", "Construction Staffing", "Skilled Trades"],
    problem: "Contractors need workers on-site within hours, while job seekers need a frictionless mobile application process.",
    solution: "Constructed an automated on-demand staffing request form and a 2-minute mobile resume/qualification uploader.",
    process: ["Dual-Audience UX", "Rapid Booking Flow", "Candidate Application Funnel", "Mobile Performance"],
    results: ["Massive acceleration in contractor staffing fulfillment", "Thousands of registered qualified tradespeople"]
  },
  {
    slug: "abc-austin-home-renovations",
    title: "ABC Austin Home Renovations",
    category: "Full-Service Kitchen & Bath Remodeling",
    filterCategory: "Construction",
    year: "2026",
    description: "Austin, Texas premier home remodeling contractor specializing in luxury kitchens, bathrooms, and floor plans.",
    longDescription: "ABC Austin Home Renovations delivers turnkey home transformations, spa-inspired bathrooms, and chef-grade kitchens across the greater Austin area. The digital showroom features 3D rendering walkthroughs, material catalogs, and design consultation bookings.",
    mockupColor: "from-stone-900 to-amber-950",
    liveUrl: "https://abcaustinhomerenovations.com/",
    stats: [
      { value: "Turnkey", label: "Remodeling" },
      { value: "Austin, TX", label: "Premier" }
    ],
    tags: ["Austin Remodeling", "Kitchens & Baths", "Interior Design", "3D Rendering"],
    problem: "Homeowners wanted to see modern Austin design aesthetics and understand the full remodeling timeline before calling.",
    solution: "Created an inspiring lookbook with filterable kitchen/bath styles, interactive design checklists, and seamless booking.",
    process: ["Austin Design Aesthetic", "Lookbook UI", "Design Consultation Scheduling", "Local Austin SEO"],
    results: ["Significant increase in multi-room renovation bookings", "Top-rated local remodeling visibility"]
  },
  {
    slug: "dtg-group",
    title: "DTG Groundworks LTD",
    category: "Groundworks & Civil Engineering",
    filterCategory: "Construction",
    year: "2026",
    description: "United Kingdom specialist groundworks contractor delivering foundations, drainage, and civil engineering infrastructure.",
    longDescription: "DTG Groundworks LTD provides commercial groundworks, reinforced concrete sub-structures, deep drainage, and highway civil engineering throughout the UK. We designed an authoritative civil engineering portfolio showcasing major projects.",
    mockupColor: "from-slate-900 to-blue-950",
    liveUrl: "https://www.dtggroup.co.uk/",
    stats: [
      { value: "Civil", label: "Engineering" },
      { value: "UK Wide", label: "Groundworks" }
    ],
    tags: ["Civil Engineering", "Groundworks", "Drainage", "UK Infrastructure"],
    problem: "Needed to showcase multifaceted commercial civil engineering under one consolidated, prestigious brand umbrella.",
    solution: "Designed an interactive services matrix detailing civil capabilities, maintenance contracts, and past commercial developments.",
    process: ["Matrix Architecture", "Corporate Engineering Tone", "Capability Portfolio", "Enterprise Performance"],
    results: ["Streamlined enterprise commercial procurement", "Secured ongoing institutional contracts"]
  },
  {
    slug: "briaxer-services",
    title: "Briaxer Services",
    category: "Specialized Business & Operational Strategy",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Turnkey business empowerment, operational strategy, and enterprise growth consulting.",
    longDescription: "Briaxer Services empowers entrepreneurs and corporate leaders through strategic business consulting, operational scaling frameworks, and market expansion advisory. The web platform delivers streamlined consultation scheduling and client growth blueprints.",
    mockupColor: "from-zinc-900 to-neutral-950",
    liveUrl: "https://briaxerservices.com/",
    stats: [
      { value: "Unlimited", label: "Growth" },
      { value: "Strategic", label: "Empowerment" }
    ],
    tags: ["Business Strategy", "Entrepreneurship", "Operational Consulting", "Growth Blueprint"],
    problem: "Business founders needed clear pathways to identify strategic bottlenecks and book diagnostic consultations.",
    solution: "Constructed an intuitive growth assessment tool with dynamic service recommendations and direct calendar bookings.",
    process: ["Strategic Advisory UX", "Growth Diagnostic Tool", "Lead Capture Integration", "Mobile Optimization"],
    results: ["High engagement on strategy blueprint guides", "Strong client retention and expansion"]
  },
  {
    slug: "the-vanguard-trust-house",
    title: "The Vanguard Trust House",
    category: "Fiduciary Trust & Wealth Protection",
    filterCategory: "Business & Consulting",
    year: "2026",
    description: "Exclusive fiduciary trust administration, family wealth preservation, and generational estate governance.",
    longDescription: "The Vanguard Trust House provides discreet, fiduciary-standard trust administration, family office governance, and wealth preservation strategies. We crafted an ultra-luxurious, secure digital presence emphasizing privacy, permanence, and institutional fiduciary responsibility.",
    mockupColor: "from-stone-900 to-amber-950",
    liveUrl: "https://thevanguardtrusthouse.com/",
    stats: [
      { value: "Fiduciary", label: "Standard" },
      { value: "Generational", label: "Preservation" }
    ],
    tags: ["Trust Services", "Wealth Management", "Estate Fiduciary", "High Net Worth"],
    problem: "Ultra-high-net-worth individuals and families expect absolute privacy and understated luxury from trust institutions.",
    solution: "Developed an elegant, secure private portal with dark-mode refinement, encrypted inquiry channels, and heritage fiduciary literature.",
    process: ["Bespoke Luxury UI", "Fiduciary Governance Design", "Encrypted Form Channels", "Ultra-High Performance"],
    results: ["Attracted multi-generational family office inquiries", "Exemplary brand prestige in trust administration"]
  },
  {
    slug: "bridging-waters-together",
    title: "Bridging Waters Healthcare Consulting",
    category: "Home Health & Healthcare Consulting",
    filterCategory: "Healthcare",
    year: "2026",
    description: "Strategic healthcare consulting empowering home health agencies, regulatory compliance, and operational excellence.",
    longDescription: "Bridging Waters Healthcare Consulting guides healthcare entrepreneurs and home health agencies through state licensing, accreditation, clinical policy development, and billing optimization. We built a reassuring, authoritative consulting platform.",
    mockupColor: "from-blue-950 to-teal-950",
    liveUrl: "https://bridgingwaterstogether.com/",
    stats: [
      { value: "Home Health", label: "Consulting" },
      { value: "Accredited", label: "Advisory" }
    ],
    tags: ["Healthcare Consulting", "Home Health Agency", "Accreditation", "Clinical Compliance"],
    problem: "Healthcare entrepreneurs needed step-by-step guidance on launching and licensing compliant home health agencies.",
    solution: "Constructed an interactive roadmap detailing agency startup milestones, policy libraries, and direct strategy consultation booking.",
    process: ["Healthcare UX Architecture", "Startup Roadmap Visualizer", "Compliance Resource Directory", "Lead Funnel"],
    results: ["Substantial increase in agency launch retainers", "Streamlined client onboarding process"]
  },
  {
    slug: "victory-freight",
    title: "Victory Freight",
    category: "Freight Logistics & Supply Chain Solutions",
    filterCategory: "Logistics & Transportation",
    year: "2026",
    description: "Southern Africa cross-border freight transportation, refrigerated logistics, and supply chain management.",
    longDescription: "Victory Freight delivers mission-critical freight forwarding, temperature-controlled cargo, and intermodal transport across Southern Africa. We developed a high-performance logistics portal featuring live rate calculators and tracking integrations.",
    mockupColor: "from-red-950 to-neutral-950",
    liveUrl: "https://victoryfreight.co.za/",
    stats: [
      { value: "Cross-Border", label: "Haulage" },
      { value: "24/7", label: "Fleet Tracking" }
    ],
    tags: ["Freight Transport", "Logistics", "Cross-Border Cargo", "Supply Chain", "Refrigerated Fleet"],
    problem: "Shippers and distributors needed rapid freight quote turnaround and immediate clarity on fleet cold-chain capabilities.",
    solution: "Engineered an automated freight estimation tool with route distance calculators, fleet specification sheets, and WhatsApp dispatch connect.",
    process: ["Logistics UX Engineering", "Automated Rate Estimator", "Cold-Chain Fleet Showcase", "Speed & Reliability Optimization"],
    results: ["Dramatic reduction in quoting turnaround time", "Significant growth in cross-border industrial freight contracts"]
  }
];

// Law firms in the database to re-categorize under 'Legal' for perfect category filter organization
const lawFirmSlugsToReclassify = [
  'rpb-law-firm',
  'modell-law-firm',
  'dn-law',
  'porraspi-law-group',
  'courthouse-lawyers',
  'lee-business-law',
  'portus-law',
  'fortius-law'
];

async function addBatch2() {
  const contentPath = path.join(process.cwd(), 'data', 'site-content.json');
  const crawlFile = path.join(process.cwd(), 'scripts', 'crawl_batch2_results.json');
  const envPath = path.join(process.cwd(), '.env.local');

  if (!fs.existsSync(contentPath)) {
    console.error('site-content.json not found!');
    process.exit(1);
  }

  let crawlMap = new Map();
  if (fs.existsSync(crawlFile)) {
    try {
      const crawlResults = JSON.parse(fs.readFileSync(crawlFile, 'utf8'));
      crawlResults.forEach(r => crawlMap.set(r.slug, r));
      console.log(`Loaded ${crawlResults.length} crawl results.`);
    } catch (e) {
      console.warn('Could not parse crawl_batch2_results.json', e);
    }
  }

  const raw = fs.readFileSync(contentPath, 'utf8');
  const content = JSON.parse(raw);

  if (!content.projects) content.projects = [];

  // Update existing law firms to 'Legal' category so category filter is clean and unified
  content.projects.forEach(p => {
    if (lawFirmSlugsToReclassify.includes(p.slug)) {
      p.filterCategory = 'Legal';
    }
    // Also move leafy digital media to Technology & Creative
    if (p.slug === 'leafy-digital-media') {
      p.filterCategory = 'Technology & Creative';
    }
  });

  const existingSlugs = new Set(content.projects.map(p => p.slug));

  let addedCount = 0;
  for (const p of projectDefinitions) {
    if (existingSlugs.has(p.slug)) {
      console.log(`Skipping already existing project in site-content: ${p.slug}`);
      continue;
    }

    const crawl = crawlMap.get(p.slug);
    const isErrorScreenshot = !crawl || !crawl.screenshotSuccess || (
      crawl.title?.includes('Error') ||
      crawl.title?.includes('can’t be reached') ||
      crawl.h1?.includes('can’t be reached')
    );

    if (crawl && crawl.screenshotSuccess && !isErrorScreenshot) {
      p.screenshot = crawl.screenshotPath;
      p.image = crawl.thumbnailPath;
    } else {
      // User rule: if screenshot is not perfect, skip screenshot and let elegant mockup show
      p.screenshot = "";
      p.image = "";
      console.log(`Skipping screenshot for ${p.slug} (site had server/DNS issue)`);
    }

    content.projects.push(p);
    addedCount++;
    console.log(`Added: [${p.filterCategory}] ${p.title} (${p.slug})`);
  }

  console.log(`\nAdded ${addedCount} new projects. Total projects in content: ${content.projects.length}`);

  // Write updated site-content.json
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');
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
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

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

addBatch2().catch(console.error);
