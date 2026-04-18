const https = require('https');
const fs = require('fs');
const path = require('path');

const ICONS = [
  { name: 'wordpress.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg' },
  { name: 'react.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'node.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'php.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'html.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'css.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'bootstrap.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
  { name: 'elementor.svg', url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/elementor.svg' }
];

const DIR = path.join(__dirname, '../public/icons');

if (!fs.existsSync(DIR)){
    fs.mkdirSync(DIR, { recursive: true });
}

ICONS.forEach(icon => {
  const file = fs.createWriteStream(path.join(DIR, icon.name));
  https.get(icon.url, function(response) {
    response.pipe(file);
  });
});

console.log("Downloads completed.");
