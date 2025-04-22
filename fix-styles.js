const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all HTML files
const htmlFiles = glob.sync('*.html');

// Process each HTML file
htmlFiles.forEach(file => {
  console.log(`Processing ${file}...`);
  
  // Read the file content
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace SCSS imports with CSS imports
  content = content.replace(
    /<link rel="stylesheet" href="\.\/src\/styles\/style\.scss">/g, 
    '<link rel="stylesheet" href="./src/styles/main.css">'
  );
  
  // Also handle any direct imports of SCSS in the head
  content = content.replace(
    /<link rel="stylesheet" href="\.\/src\/styles\/.*\.scss">/g,
    '<link rel="stylesheet" href="./src/styles/main.css">'
  );
  
  // Write the modified content back
  fs.writeFileSync(file, content);
  
  console.log(`${file} updated successfully.`);
});

console.log('All style links in HTML files updated successfully!'); 