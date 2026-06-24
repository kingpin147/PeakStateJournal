const fs = require('fs');
const path = require('path');

const dir = 'src/content/posts';
const files = fs.readdirSync(dir);
const missing = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const match = content.match(/coverImage:\s*"([^"]+)"/);
  if (match) {
    const img = match[1];
    const full = path.join('public', img);
    if (!fs.existsSync(full)) {
      missing.push({ file: f, image: img });
    }
  }
});

console.log('Total posts:', files.length);
console.log('Missing images:', missing.length);
console.log('\nFiles with missing images:');
missing.forEach(m => console.log(`  ${m.file} -> ${m.image}`));
