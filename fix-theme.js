const fs = require('fs');
const path = require('path');
const dirs = ['g:/My Portfolio Website using Next Js/components', 'g:/My Portfolio Website using Next Js/app'];

function processDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      
      newContent = newContent.replace(/bg-white\/(\d+)/g, 'bg-text-primary/$1');
      newContent = newContent.replace(/border-white\/(\d+)/g, 'border-text-primary/$1');
      newContent = newContent.replace(/text-white\/(\d+)/g, 'text-text-primary/$1');
      
      newContent = newContent.replace(/text-white/g, 'text-text-primary');
      newContent = newContent.replace(/bg-accent([a-zA-Z0-9\s-]*?)text-text-primary/g, 'bg-accent$1text-white');
      newContent = newContent.replace(/text-text-primary([a-zA-Z0-9\s-]*?)bg-accent/g, 'text-white$1bg-accent');
      
      newContent = newContent.replace(/bg-white /g, 'bg-text-primary ');
      newContent = newContent.replace(/bg-white"/g, 'bg-text-primary"');
      newContent = newContent.replace(/bg-white'/g, "bg-text-primary'");
      newContent = newContent.replace(/bg-white`/g, 'bg-text-primary`');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated: ' + fullPath);
      }
    }
  }
}
dirs.forEach(processDir);
