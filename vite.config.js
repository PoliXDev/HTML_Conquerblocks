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
    }
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
});

