import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Same bundler/mode as upstream simple-inventory-card (Vite library mode,
// single self-contained ES-module output, lit bundled in rather than
// externalized). Unlike upstream (one card, one bundle) we ship four
// independent cards; each is built as its own single-entry Vite run
// (selected via the CARD env var, see package.json's "build" script) so
// Rollup never hoists shared code into a second chunk that would need its
// own Lovelace resource entry.
const CARDS = {
  list: { entry: 'src/list-card/index.js', fileName: 'inventory-list-card' },
  add: { entry: 'src/add-card/index.js', fileName: 'inventory-add-card' },
  view: { entry: 'src/view-card/index.js', fileName: 'inventory-view-card' },
  structure: { entry: 'src/structure-card/index.js', fileName: 'inventory-structure-card' },
};

const cardKey = process.env.CARD;
const card = CARDS[cardKey];
if (!card) {
  throw new Error(
    `Set CARD env var to one of: ${Object.keys(CARDS).join(', ')} (got ${cardKey ?? 'undefined'})`
  );
}

export default defineConfig({
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'src/shared'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, card.entry),
      formats: ['es'],
      fileName: () => `${card.fileName}.js`,
    },
    rollupOptions: {
      output: {
        // Force everything (lit, @shared, quagga2) into the single output
        // file instead of letting Rollup split it into chunks.
        inlineDynamicImports: true,
      },
    },
    minify: 'terser',
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: false,
  },
});
