const fs = require('fs-extra');
const path = require('path');

// Ensure dist/src/styles directory exists
fs.ensureDirSync(path.resolve(__dirname, 'dist/src/styles'));

// Copy src/styles to dist/src/styles
fs.copySync(
  path.resolve(__dirname, 'src/styles'),
  path.resolve(__dirname, 'dist/src/styles'),
  { overwrite: true }
);

console.log('CSS files copied to dist/src/styles successfully!');

// Copy public directory to dist/public if it doesn't exist
if (!fs.existsSync(path.resolve(__dirname, 'dist/public'))) {
  fs.copySync(
    path.resolve(__dirname, 'public'),
    path.resolve(__dirname, 'dist/public'),
    { overwrite: true }
  );
  console.log('Public directory copied to dist/public successfully!');
} 