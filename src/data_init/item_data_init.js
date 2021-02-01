const admin = require("firebase-admin");
const serviceAccount = require("../../config/firebase-admin.json");
const items = require('../../data/items.json');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log(Object.keys(items).length)

const db = admin.firestore();

// Object.keys(items).forEach(async id => {
//   await db.collection('items').doc(id).set(items[id]);
//   await sleep(50);
// });
db.collection('items').get().then(snap => console.log(snap.size))
