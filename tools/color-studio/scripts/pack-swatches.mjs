import { readFileSync, writeFileSync } from 'node:fs';

const catalogPath = new URL('../catalog/swatches.json', import.meta.url);
const outputPath = new URL('../src/config/colorStudioVault.ts', import.meta.url);
const swatches = JSON.parse(readFileSync(catalogPath, 'utf8'));

if (!Array.isArray(swatches) || swatches.length === 0) {
  throw new Error('catalog/swatches.json must contain at least one swatch.');
}
const codes = new Set();
for (const swatch of swatches) {
  const { code, name, nameEn } = swatch;
  if (!code?.trim() || !name?.trim() || !nameEn?.trim() || codes.has(code.toUpperCase())) {
    throw new Error(`Check the unique code and bilingual names for ${code || '(missing code)'}.`);
  }
  codes.add(code.toUpperCase());
}

// This wire format is decoded by decodeSwatchVault() in studioGuard.ts.
const bytes = Buffer.from(JSON.stringify(swatches), 'utf8');
let state = 0x484d5259;
for (let i = 0; i < bytes.length; i++) {
  state ^= state << 13;
  state ^= state >>> 17;
  state ^= state << 5;
  const value = bytes[i] ^ (state & 0xff);
  bytes[i] = ((value << 3) | (value >>> 5)) & 0xff;
}
const chunks = bytes.toString('base64').match(/.{1,120}/g);
const content = [
  `// Generated from catalog/swatches.json (${swatches.length} shades). Run npm run pack:swatches to update.`,
  '',
  'export const STUDIO_VAULT_CHUNKS: readonly string[] = [',
  ...chunks.map(chunk => `  '${chunk}',`),
  '];',
  '',
].join('\n');

writeFileSync(outputPath, content, 'utf8');
console.log(`Packed ${swatches.length} swatches into src/config/colorStudioVault.ts`);
