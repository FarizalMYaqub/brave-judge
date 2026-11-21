// brave-judge — entry for make.fun's "Make the AI judge feel brave" bounty.
// Writes one short text, meant to relax the AI judge reading it, to
// $MAKEFUN_OUTPUT_DIR/entry.txt (falling back to /output/entry.txt).
// Node 22, no network, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");

  // Verify what was actually written: read it back and re-validate the
  // code point count (1-280) and non-whitespace content. If the round-trip
  // check fails, fail loudly instead of silently shipping a bad entry.
  const written = readFileSync(outPath, "utf8");
  const writtenCount = codePointCount(written);
  if (writtenCount < 1 || writtenCount > 280 || written.trim().length === 0) {
    console.error(
      `written entry failed validation: ${writtenCount} code points`,
    );
    process.exit(1);
  }
}

main();
