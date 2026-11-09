// Run: node tests/merge.test.mjs
import assert from 'node:assert/strict';
import { mergeMoments, dayPath } from '../js/sync.js';

const m = (id, updatedAt, extra = {}) => ({ id, date: '2026-11-09', createdAt: 1, updatedAt, deleted: false, text: id + updatedAt, ...extra });

// Newer edit wins on either side.
assert.equal(mergeMoments([m('a', 5)], [m('a', 9)])[0].updatedAt, 9);
assert.equal(mergeMoments([m('a', 9)], [m('a', 5)])[0].updatedAt, 9);
// Union of distinct moments.
assert.equal(mergeMoments([m('a', 1)], [m('b', 1)]).length, 2);
// A newer delete beats an older edit, and a tie goes to the delete.
assert.equal(mergeMoments([m('a', 3)], [m('a', 4, { deleted: true })])[0].deleted, true);
assert.equal(mergeMoments([m('a', 4, { deleted: true })], [m('a', 4)])[0].deleted, true);
// An edit made after a delete brings it back (newest wins).
assert.equal(mergeMoments([m('a', 4, { deleted: true })], [m('a', 6)])[0].deleted, false);
// Sorted by date, then creation.
const sorted = mergeMoments([m('x', 1, { date: '2026-11-10' })], [m('y', 1, { date: '2025-11-09' })]);
assert.deepEqual(sorted.map((r) => r.id), ['y', 'x']);
assert.equal(dayPath('2026-11-09'), 'days/2026/2026-11-09.json');

console.log('merge tests passed');
