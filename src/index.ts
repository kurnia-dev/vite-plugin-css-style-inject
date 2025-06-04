import { Plugin } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const cssStyleInjectPlugin = (): Plugin => ({
  name: 'style-inject',
  enforce: 'post',
  config: () => ({
    build: { cssCodeSplit: false },
  }),
  transform: (_, id): string | undefined => {
    if (id.endsWith('.css')) return ''; // Prevent CSS file generation
  },
  generateBundle: (_, bundle): void => {
    Object.entries(bundle).forEach(([fileName, chunk]) => {
      if (chunk.type === 'asset' && fileName.endsWith('.css')) {
        const packageName: string = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8')).name;
        const cssContent = chunk.source as string;
        const jsInjection = `(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(
          cssContent
        )};s.setAttribute('data-style-id','${packageName}');document.head.appendChild(s)})();`;

        // Find main entry point
        const mainEntry = Object.values(bundle).find((c) => c.type === 'chunk' && c.isEntry) as
          | { code: string }
          | undefined;

        if (mainEntry) {
          mainEntry.code += jsInjection;
          delete bundle[fileName]; // Remove CSS file from final output
        }
      }
    });
  },
});
export default cssStyleInjectPlugin;
