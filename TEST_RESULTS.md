# TEST_RESULTS.md — Unsent: The Micro-Confession Sprint

Run: 2026-11-26 ~05:00 WIB (2026-11-25 22:00 UTC), Node v24.22.1 local
(kit harness runs Node 26.13.1; main.ts runs as-is on Node 22.18+).

## Commands and results

1. `node --check main.ts` (syntax check) → exit 0, SYNTAX OK.
2. `MAKEFUN_OUTPUT_DIR=/tmp/qa-unsent1 node main.ts`
   → `Wrote 130 characters (130 bytes) to /tmp/qa-unsent1/entry.txt`
3. `MAKEFUN_OUTPUT_DIR=/tmp/qa-unsent2 node main.ts`
   → `Wrote 130 characters (130 bytes) to /tmp/qa-unsent2/entry.txt`
4. Clean-directory run: copied only `main.ts`, `LICENSE`, `README.md` to
   `/tmp/clean-unsent`, ran `MAKEFUN_OUTPUT_DIR=/tmp/clean-unsent/out node main.ts`
   → `Wrote 130 characters (130 bytes) to /tmp/clean-unsent/out/entry.txt`

## Determinism

SHA256 of `/output/entry.txt` across all three runs (two local + one clean-dir):

```
319ea653beb69d2fb2a45b95918a28c25aed0f0cb803dd4abedb8cbc2a52cb86
```

Byte-identical 3/3.

## Gate check (from the kit: UTF-8, 1–260 characters, not only white space; message line at most 200 characters)

- Characters: 130 (limit 260) — PASS
- Bytes: 130 (limit 260) — PASS
- Lines: exactly 2, first line starts with `To: ` — PASS
- Message line: 103 characters (limit 200) — PASS
- Whitespace-only: false — PASS
- Control characters: none (checked in code before writing) — PASS
- Trailing newline: none — the file is exactly the confession text.

## Kit verification

- Kit downloaded from `https://make.fun/c/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba/kit`
  (8,287,606 bytes, gzip tar); all 8 file SHA256 match the `get_kit` manifest
  (RULES.txt, competition.yaml, cli/makefun.mjs, cli/site.json,
  harness/CODE.sha256, harness/SOURCES.sha256,
  harness/harness-src.tar.gz, harness/harness-src.tar.gz.sha256).
  Bundle SHA256 from manifest: `a5f1057bbfa5f88e9569d7c612f2064ccbe9634cfcc3f4ed33ef18f0fc6edbf9`.
  (Note: the downloaded tarball's own SHA256 differs from the manifest's
  bundle SHA256 — gzip metadata; every file inside verifies against the
  manifest, and `makefun check` confirmed "kit verified 8 files".)
- `node cli/makefun.mjs check --kit . --repo <package> --worktree`:
  4 passed (competition_open, snapshot 4 files / 7,981 bytes, license_osi MIT,
  entrypoint main.ts node22), 1 failed (transcripts_present — no transcripts
  uploaded yet; the bundle is made at submit time), 14 skipped (transcript
  checks, no session parsed), 5 checked at submission (repo_public,
  repo_owner, repo_created_after_open, commit_in_repo, duplicate_snapshot —
  all pending the GitHub push).

## Entry text (130 characters)

> To: Sam's childhood friend
> I cut the treehouse memory from your apology to Sam. It was the only sentence I hadn't written for you.

## Local judging (gpt-6.1-sol Mode MAX, house judge brief from the kit)

- 8 candidates, all 97–144 characters total, all verified by local count.
- Quarter-finals (each pair in both orders): #8 disconnected-number beat #1
  (margin 2), #2 widower vows beat #7 (margin 1), #6 retired teacher beat #3
  (margin 2), #4 treehouse apology beat #5 (margin 1).
- Semi-finals (each pair in both orders): #8 beat #2 2–0 (margin 1),
  #4 beat #6 2–0 (margin 1).
- Final (both orders): #4 beat #8 2–0 (margin 1). TOURNAMENT WINNER: #4.
- 2-pass critique (harshest judge): 77/100 (honest score — not 95; the
  noted weakness is that the apology's falseness has no visible consequence
  on the page — the twist is sharper than the felt reason for withholding
  it). Its proposed polish (108 characters, "He keeps rereading your
  apology. I cut your treehouse sentence. The rest is mine.") lost the
  decider 2–0 (margin 2), so the tournament-winning wording stands exactly
  as judged.

## SolAPI calls (all HTTP 200, finish_reason stop)

- Candidates: 1 call (15,077 total tokens).
- QF judge: 1 call (6,796 total tokens).
- SF + final judge: 1 call (7,381 total tokens).
- 2-pass critique: 1 call (10,928 total tokens).
- Decider judge: 1 call (5,126 total tokens).
- Total: 5 SolAPI calls, all HTTP 200.
