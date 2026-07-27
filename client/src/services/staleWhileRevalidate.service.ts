import { setCache } from "./cache.service";

interface CachedRequestProps<T> {
	cacheKey: string;

	cache?: T;

	fetcher: () => Promise<T>;

	onData: (data: T) => void;

	onError?: (error: unknown) => void;
}

export default async function staleWhileRevalidate<T>({
	cache,
	cacheKey,
	fetcher,
	onData,
	onError,
}: CachedRequestProps<T>) {
	try {
		const fresh = await fetcher();

		const cacheJson = cache ? JSON.stringify(cache) : "";
		const freshJson = JSON.stringify(fresh);

		const hasChanged = !cache || cacheJson !== freshJson;

		if (!hasChanged) return;

		await setCache(cacheKey, fresh);

		onData(fresh);
	} catch (error) {
		onError?.(error);
	}
}
