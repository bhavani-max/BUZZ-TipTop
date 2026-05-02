const fs = require('fs');
const path = require('path');
const dir = 'src/app/components/ui';
const files = fs.readdirSync(dir);
files.forEach(file => {
  const filePath = path.join(dir, file);
  if(filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/from\s+['"]([^'"]+)@[\d\.]+['"]/g, 'from "$1"');
    fs.writeFileSync(filePath, content);
  }
});
console.log("Fixed imports");
