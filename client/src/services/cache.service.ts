import { openDB } from "idb";

const dbPromise = openDB("CampusLoop", 1, {
	upgrade(db) {
		db.createObjectStore("cache");
	},
});

export async function getCache<T>(key: string): Promise<T | undefined> {
	const db = await dbPromise;

	return db.get("cache", key);
}

export async function setCache<T>(key: string, value: T): Promise<void> {
	const db = await dbPromise;

	await db.put("cache", value, key);
}

export async function removeCache(key: string) {
	const db = await dbPromise;

	await db.delete("cache", key);
}

export async function clearCache() {
	const db = await dbPromise;

	await db.clear("cache");
}
