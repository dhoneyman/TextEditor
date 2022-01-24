import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateOS')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateOS', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jateOS', 'readwrite');
  const store = tx.objectStore('jateOS');
  const request = store.put({ value: content, id: 1 });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jateOS', 'readonly');
  const store = tx.objectStore('jateOS');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();
