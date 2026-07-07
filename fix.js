const fs = require('fs');
const path = 'components/sections/Hero.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove canvasRef and animFrameRef
content = content.replace(/const canvasRef = useRef<HTMLCanvasElement>\(null\);\r?\n/, '');
content = content.replace(/const animFrameRef = useRef<number>\(0\);\r?\n/, '');

// Remove Particle Canvas useEffect
content = content.replace(/\/\/ Particle canvas \.\.\. \(unchanged logic\)[\s\S]*?  }, \[\]\);\r?\n/, '');

// Remove Parallax Logic
content = content.replace(/\/\/ Parallax Logic[\s\S]*?const backgroundScale = useTransform\(scrollY, \[0, 1000\], \[1, 1\.1\]\);\r?\n/, '');

// Remove JSX for Background Image and Canvas
content = content.replace(/      \{\/\* 0\. Premium Parallax Background Image \*\/\}[\s\S]*?      \{\/\* Particle canvas \*\/\}[\s\S]*?<canvas[\s\S]*?\/>\r?\n/, '');

// Remove scrollY, useTransform from framer-motion import
content = content.replace(/useScroll, useTransform, /, '');

fs.writeFileSync(path, content);
console.log('Done');
