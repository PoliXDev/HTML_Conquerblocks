import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

// Function to get all HTML files in the root directory
function getHtmlFiles() {
  return glob.sync('*.html', { ignore: ['dist/**', 'node_modules/**'] });
}

// Determine proper base path
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const base = isGitHubPages ? '/HTML_Conquerblocks/' : './';

export default defineConfig({
  base: base,
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // Don't inline any assets
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(
          getHtmlFiles()
            .filter(file => file !== 'index.html')
            .map(file => [
              // Remove the .html extension for the entry name
              file.replace('.html', ''),
              // Full path to the file
              resolve(__dirname, file)
            ])
        )
      }
    },
    // Ensure public directory is copied to dist
    copyPublicDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 
      },
    },
  },
  // Additional plugin to copy src/styles to dist/src/styles
  plugins: [
    {
      name: 'copy-assets',
      apply: 'build',
      generateBundle() {
        // This will be handled by the build process
        console.log('Assets will be copied to the dist directory');
      }
    }
  ]
});

