"use client";

const DB_NAME = "overlay-tool";
const STORE = "images";
const VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

export async function saveImage(key: string, blob: Blob) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(blob, key);
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function getImage(key: string): Promise<Blob | null> {
  const db = await openDB();
  const tx = db.transaction(STORE, "readonly");
  const req = tx.objectStore(STORE).get(key);
  return new Promise((resolve) => {
    req.onsuccess = () => resolve((req.result as Blob) ?? null);
    req.onerror = () => resolve(null);
  });
}
