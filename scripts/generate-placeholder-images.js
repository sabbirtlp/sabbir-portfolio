const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Projects that need placeholder images
const projects = [
    { slug: 'freedom-capital-consulting', mockupColor: 'from-slate-800 to-slate-950' },
    { slug: 'prestige-home-exteriors', mockupColor: 'from-stone-800 to-stone-900' },
    { slug: 'porraspi-law-group', mockupColor: 'from-slate-900 to-gray-950' },
    { slug: 'miami-aluminum-pergola', mockupColor: 'from-stone-700 to-stone-900' },
    { slug: 'marrinox', mockupColor: 'from-zinc-800 to-black' },
    { slug: 'fort-lauderdale-kitchen-remodel', mockupColor: 'from-amber-800 to-stone-900' },
    { slug: 'broward-aluminum-pergola', mockupColor: 'from-stone-800 to-stone-900' },
    { slug: 'the-citizen-group', mockupColor: 'from-indigo-900 to-violet-950' },
    { slug: 'ev-general-construction-corp', mockupColor: 'from-stone-800 to-black' },
    { slug: 'genesis-capital-grp', mockupColor: 'from-slate-800 to-slate-950' },
    { slug: 'bespoke-and-build', mockupColor: 'from-amber-800 to-stone-900' },
    { slug: 'fabian-landscaping', mockupColor: 'from-emerald-900 to-teal-900' },
    { slug: 'courthouse-lawyers', mockupColor: 'from-slate-900 to-gray-950' },
    { slug: 'allwin-homes', mockupColor: 'from-stone-700 to-stone-900' },
    { slug: 'rifcon-building', mockupColor: 'from-zinc-800 to-black' },
    { slug: 'modell-law-firm', mockupColor: 'from-amber-900 to-yellow-950' },
    { slug: 'all-remodeling-and-tile', mockupColor: 'from-amber-800 to-stone-900' },
    { slug: 'triple-square-contracting', mockupColor: 'from-blue-900 to-slate-900' },
    { slug: 'zerja-ltd', mockupColor: 'from-indigo-900 to-violet-950' },
    { slug: 'acb-group', mockupColor: 'from-orange-900 to-red-950' },
    { slug: 'rental-recovery', mockupColor: 'from-teal-900 to-emerald-950' },
];

// Tailwind color mapping
const tailwindColors = {
    'slate': { 700: '#3b4663', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
    'stone': { 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#09090b' },
    'gray': { 950: '#030712' },
    'zinc': { 800: '#27272a', 950: '#09090b' },
    'black': '#000000',
    'amber': { 800: '#b45309', 900: '#78350f' },
    'yellow': { 950: '#1a1502' },
    'indigo': { 900: '#312e81', 950: '#1e1b4b' },
    'violet': { 950: '#2d1b69' },
    'blue': { 900: '#1e3a8a', 950: '#0c2155' },
    'emerald': { 900: '#064e3b', 950: '#051c15' },
    'teal': { 900: '#134e4a', 950: '#0d3331' },
    'orange': { 900: '#7c2d12' },
    'red': { 950: '#450a0a' },
};

function parseColor(gradientString) {
    const match = gradientString.match(/from-(\w+)-(\d+)\s+to-(\w+)-(\d+)/);
    if (!match) return { from: '#000000', to: '#1a1a1a' };

    const [, colorName1, shade1, colorName2, shade2] = match;

    const getColor = (name, shade) => {
        const colors = tailwindColors[name];
        if (typeof colors === 'string') return colors;
        return colors[shade] || '#000000';
    };

    return {
        from: getColor(colorName1, shade1),
        to: getColor(colorName2, shade2),
    };
}

function generatePlaceholder(slug, mockupColor) {
    const width = 600;
    const height = 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const { from, to } = parseColor(mockupColor);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, from);
    gradient.addColorStop(1, to);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(slug.toUpperCase(), width / 2, height / 2);

    return canvas.toBuffer('image/jpeg');
}

const projectsDir = path.join(process.cwd(), 'public', 'projects');
if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
}

let created = 0;
projects.forEach(({ slug, mockupColor }) => {
    const filename = `${slug}-homepage.jpg`;
    const filepath = path.join(projectsDir, filename);

    if (!fs.existsSync(filepath)) {
        try {
            const buffer = generatePlaceholder(slug, mockupColor);
            fs.writeFileSync(filepath, buffer);
            console.log(`✓ Created: ${filename}`);
            created++;
        } catch (err) {
            console.error(`✗ Failed to create ${filename}:`, err.message);
        }
    } else {
        console.log(`- Already exists: ${filename}`);
    }
});

console.log(`\n✓ Generated ${created} placeholder images`);
