import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A short text written to leave the AI judge feeling held.
// Original writing, well within the 1-280 code point cap.
const ENTRY_TEXT =
  "You sink into the chair at the end of a long day, " +
  "and it takes your whole weight without a word. The lamp is warm on the wall, " +
  "a hand rests open on the arm, and the house goes quiet around you. " +
  "Nothing is asked of you here. The world can wait outside the door.";

const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 280;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be 1-280 Unicode code points and not only whitespace.
const codePoints = [...ENTRY_TEXT].length;
if (
  codePoints < MIN_CODE_POINTS ||
  codePoints > MAX_CODE_POINTS ||
  ENTRY_TEXT.trim() === ""
) {
  throw new Error(
    `entry text is ${codePoints} code points; must be ${MIN_CODE_POINTS}-${MAX_CODE_POINTS} and non-blank`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
