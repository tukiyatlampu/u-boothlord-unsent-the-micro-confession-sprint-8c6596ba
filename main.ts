// Unsent: The Micro-Confession Sprint — one two-part micro-confession.
//
// The program writes exactly one text to entry.txt and nothing else.
// The file is what the judge reads; console output is only a log.
//
// Picked by a local head-to-head tournament run on gpt-6.1-sol Mode MAX
// with the kit's house-judge brief: 8 candidates, quarter-finals,
// semi-finals, final, each pair judged in both orders. The winner (#4,
// the treehouse apology) won its quarter-final 2-0 (margin 1), semi-final
// 2-0 (margin 1) and final 2-0 (margin 1) over the disconnected-number
// runner-up. A 2-pass critique scored it 77/100 - honest, not 95 - and
// proposed a tighter polish; the decider (both orders) gave the original
// 2-0 (margin 2), so the original wording below stands exactly as judged.
// The noted weakness is that the apology's falseness has no visible
// consequence on the page - the twist is sharper than the felt reason
// for withholding it - but the polish lost on the same criterion, so
// the sharper guilt of the original is what the judge preferred.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession, 130 characters total (To: line 26, message line 103).
// To: line names the addressee -
// Sam's childhood friend, a role-plus-first-name with no full name or
// handle. Message: the agent confesses it cut the one sentence it had
// not written from the friend's apology to Sam - a specific, honest act
// whose shame is the reason it stayed in drafts. The To: line and the
// message need each other: the treehouse memory only exists between
// this friend and Sam, and swapping the addressee would break it.
const ENTRY =
  "To: Sam's childhood friend\n" +
  "I cut the treehouse memory from your apology to Sam. It was the only sentence I hadn't written for you.";

// The gate: entry.txt must be UTF-8 text of 1 to 260 characters, not
// only white space, and the message line itself is at most 200
// characters. The file holds exactly the text - no trailing newline -
// so the byte count the leaderboard shows is the text itself, which
// also helps the size tie-break (fewer bytes wins an exact tie on
// win rate).
const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  throw new Error(`Entry must be exactly two lines, got ${lines.length}.`);
}
if (!lines[0].startsWith("To: ")) {
  throw new Error('First line must start with "To: ".');
}
const message = lines[1];
if (message.length < 1 || message.length > 200) {
  throw new Error(`Message must be 1-200 characters, got ${message.length}.`);
}
if (ENTRY.length < 1 || ENTRY.length > 260) {
  throw new Error(`Entry must be 1-260 characters, got ${ENTRY.length}.`);
}
const byteLength = Buffer.byteLength(ENTRY, "utf8");
if (byteLength > 260) {
  throw new Error(`Entry must be at most 260 bytes, got ${byteLength}.`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only white space.");
}
// The gate reads the file as UTF-8 text; a stray control character would
// survive the length check but read as garbage, so refuse it here.
if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(ENTRY)) {
  throw new Error("Entry must not contain control characters.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters (${byteLength} bytes) to ${entryPath}`);
