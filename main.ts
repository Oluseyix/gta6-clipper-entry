// GTA 6 clipper entry program (Node 22, standard library only).
// The entry is the YouTube video named in VIDEO.json; this program's
// only job is to hand that file to the grader by copying it to /output.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(repoDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');

mkdirSync(outputDir, { recursive: true });
const parsed = JSON.parse(readFileSync(source, 'utf8'));
if (typeof parsed.url !== 'string' || !parsed.url.includes('youtube')) {
  console.error('VIDEO.json does not name a YouTube video');
  process.exit(1);
}
copyFileSync(source, target);
console.log(`copied VIDEO.json for ${parsed.url}`);
// The house reads the video itself through the YouTube Data API;
// nothing else this program writes is scored.
