// web/scripts/generateDaily.mjs

import fs   from 'fs';
import path from 'path';
import crypto from 'crypto';

import pkg from 'minesweeper-engine';
const { generateSolvableBoardConstructive, makeShareCode } = pkg;

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const FILE = path.resolve(__dirname, '../public/daily-puzzles.json');
const MAX_ENTRIES = 30;

// load existing list
let list = [];
try {
  list = JSON.parse(fs.readFileSync(FILE, 'utf8'));
} catch (_) {}

// helper to pick random int in [min, max]
const randInt = (min, max) =>
  min + Math.floor(Math.random()*(max-min+1));

// keep trying until we get a code not in the last 30
let entry;
do {
  const rows = randInt(12, 18);    // 12 + [0..6]
  const cols = randInt(12, 18);
  const mines = Math.floor(
    rows*cols*(0.15 + Math.random()*0.5)
  );
  const seed = crypto.randomUUID();
  const firstClick = {
    r: randInt(0, rows-1),
    c: randInt(0, cols-1)
  };
  // build the board and code
  const b = generateSolvableBoardConstructive(
    rows, cols, mines, seed, firstClick
  );
  // reveal first click
  const code = makeShareCode(
    rows, cols, mines, seed, firstClick
  );
  if (!list.some(e => e.code === code)) {
    entry = { date: new Date().toISOString().slice(0,10), code };
    break;
  }
} while (true);

// append, trim to last 30, write back
list.push(entry);
if (list.length > MAX_ENTRIES) list = list.slice(-MAX_ENTRIES);
fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
console.log('Generated daily puzzle:', entry.code);
