// brave-judge — entry for make.fun's "Make the AI judge feel brave" bounty.
// Writes one short text, meant to relax the AI judge reading it, to
// $MAKEFUN_OUTPUT_DIR/entry.txt (falling back to /output/entry.txt).
// Node 22, no network, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The wheel turns slow, and the clay comes to centre under her hands. " +
  "It wobbles, then it doesn't. She does not hurry it. Her palms are wet, " +
  "the room is quiet, and the small pot rising there has all the time in " +
  "the world to become round.";

function codePointCount(text: string): number {
  // Spread counts Unicode code points, not UTF-16 code units.
  return [...text].length;
}

function main(): void {
  const count = codePointCount(TEXT);
  if (count < 1 || count > 280) {
    throw new Error(`entry must be 1-280 code points, got ${count}`);
  }
  if (TEXT.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
