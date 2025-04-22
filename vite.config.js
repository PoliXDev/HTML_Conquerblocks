import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

// Function to get all HTML files in the root directory
function getHtmlFiles() {
  return glob.sync('*.html', { ignore: ['dist/**', 'node_modules/**'] });
}

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
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

