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
      
      // Fix arbitrary white values with []
      newContent = newContent.replace(/bg-white\/\[(.*?)\]/g, 'bg-text-primary/[$1]');
      newContent = newContent.replace(/border-white\/\[(.*?)\]/g, 'border-text-primary/[$1]');
      newContent = newContent.replace(/text-white\/\[(.*?)\]/g, 'text-text-primary/[$1]');
      newContent = newContent.replace(/from-white\//g, 'from-text-primary/');
      newContent = newContent.replace(/via-white\//g, 'via-text-primary/');
      newContent = newContent.replace(/to-white\//g, 'to-text-primary/');

      // Fix hardcoded dark colors
      newContent = newContent.replace(/bg-\[\#030303\]/g, 'bg-background');
      newContent = newContent.replace(/bg-\[\#0a0a0a\]/g, 'bg-background');
      newContent = newContent.replace(/bg-\[\#111111\]/g, 'bg-surface');
      newContent = newContent.replace(/bg-\[\#1a1a1a\]/g, 'bg-surface-2');
      newContent = newContent.replace(/bg-\[\#1b1b1b\]/g, 'bg-border');
      newContent = newContent.replace(/border-\[\#1b1b1b\]/g, 'border-border');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated: ' + fullPath);
      }
    }
  }
}
dirs.forEach(processDir);
