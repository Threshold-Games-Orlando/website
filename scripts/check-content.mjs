import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { parse } from 'yaml';
const content = JSON.parse(readFileSync('src/content/site.json', 'utf8').replace(/^\uFEFF/, ''));
const config = parse(readFileSync('.pages.yml', 'utf8'));
const fields = config.content[0].fields;
assert.equal(config.content[0].path, 'src/content/site.json');
assert.deepEqual(fields.map((field) => field.name).sort(), Object.keys(content).sort());
for (const name of ['socials', 'values']) {
  const field = fields.find((field) => field.name === name);
  assert.equal(field.list, true);
  for (const item of content[name])
    assert.deepEqual(Object.keys(item).sort(), field.fields.map((child) => child.name).sort());
}
console.log('Pages CMS fields match website content.');
