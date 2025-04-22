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
  
  // Replace paths in src/href attributes
  content = content.replace(/src="public\//g, 'src="./public/');
  content = content.replace(/href="\.\/src\/styles\//g, 'href="./src/styles/');
  
  // Write the modified content back
  fs.writeFileSync(file, content);
  
  console.log(`${file} updated successfully.`);
});

console.log('All HTML files updated successfully!'); 