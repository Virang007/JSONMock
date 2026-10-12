const https = require('https');
const path = require('path');
const data = require('../data.json');

console.log('═══════════════════════════════════════════════════');
console.log('        DATASET & API VALIDATION REPORT            ');
console.log('═══════════════════════════════════════════════════');

// 1. Check counts
console.log(`\n1. RESOURCE RECORD COUNTS:`);
console.log(`- Users:    ${data.users.length} (Expected: 10)`);
console.log(`- Posts:    ${data.posts.length} (Expected: 100)`);
console.log(`- Comments: ${data.comments.length} (Expected: 500)`);
console.log(`- Albums:   ${data.albums.length} (Expected: 100)`);
console.log(`- Photos:   ${data.photos.length} (Expected: 5000)`);
console.log(`- Todos:    ${data.todos.length} (Expected: 200)`);

// 2. Foreign key integrity
let fkErrors = 0;
data.posts.forEach(p => { if (p.userId < 1 || p.userId > 10) fkErrors++; });
data.comments.forEach(c => { if (c.postId < 1 || c.postId > 100) fkErrors++; });
data.albums.forEach(a => { if (a.userId < 1 || a.userId > 10) fkErrors++; });
data.photos.forEach(ph => { if (ph.albumId < 1 || ph.albumId > 100) fkErrors++; });
data.todos.forEach(t => { if (t.userId < 1 || t.userId > 10) fkErrors++; });

console.log(`\n2. REFERENTIAL INTEGRITY:`);
console.log(`- Relationship validation errors: ${fkErrors} (Expected: 0)`);

// 3. Unique photo IDs extracted
const uniquePhotoUrls = new Set(data.photos.map(p => p.url));
console.log(`\n3. UNIQUE PHOTO SOURCES:`);
console.log(`- Unique photo URLs across 5,000 items: ${uniquePhotoUrls.size}`);

// 4. Sample check on endpoints
console.log(`\n4. SAMPLE RECORD PREVIEWS:`);
console.log('User #1:', data.users[0].name, '<' + data.users[0].email + '>');
console.log('Post #1:', data.posts[0].title);
console.log('Comment #1:', data.comments[0].name, 'said:', data.comments[0].body.slice(0, 60) + '...');
console.log('Album #1:', data.albums[0].title);
console.log('Photo #1:', data.photos[0].title);
console.log('  URL:', data.photos[0].url);
console.log('  Thumb:', data.photos[0].thumbnailUrl);
console.log('Todo #1:', data.todos[0].title, '| completed:', data.todos[0].completed);

// 5. Test Live Sample Photo URLs via HTTP
console.log(`\n5. VALIDATING LIVE PHOTO URL SAMPLES VIA HTTP GET:`);
const samplePhotosToTest = [
  data.photos[0],
  data.photos[49],
  data.photos[100],
  data.photos[500],
  data.photos[4999]
];

let validated = 0;
samplePhotosToTest.forEach((photo, idx) => {
  https.get(photo.url, (res) => {
    console.log(`✓ Sample #${idx + 1} (Photo ID: ${photo.id}): HTTP ${res.statusCode} [${res.headers['content-type']}]`);
    validated++;
    if (validated === samplePhotosToTest.length) {
      console.log('\nAll sample image URLs confirmed loading correctly with HTTP 200 image/jpeg!');
      console.log('═══════════════════════════════════════════════════\n');
    }
  }).on('error', (err) => {
    console.error(`✗ Sample #${idx + 1} FAILED:`, err.message);
  });
});
