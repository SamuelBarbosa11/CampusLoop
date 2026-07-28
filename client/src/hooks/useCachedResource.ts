import { useCallback, useState } from "react";

import { getCache } from "../services/cache.service";
import staleWhileRevalidate from "../services/staleWhileRevalidate.service";
import { toast } from "../services/toast";

const REFRESH_TOAST_DELAY = 1000;

let refreshToastTimer: number | undefined;
let activeLoadingToastId: string | undefined;
let activeRefreshes = 0;

interface UseCachedResourceProps<T, P extends unknown[] = []> {
	cacheKey: string;
	request: (...params: P) => Promise<T>;
	params: P;
	onData: (data: T) => void;
	onError?: (error: unknown) => void;
}

export default function useCachedResource<T, P extends unknown[]>({
	cacheKey,
	request,
	params,
	onData,
	onError,
}: UseCachedResourceProps<T, P>) {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const load = useCallback(async () => {
		const cache = await getCache<T>(cacheKey);

		if (cache) {
			onData(cache);

			setIsRefreshing(true);
			activeRefreshes++;

			if (!refreshToastTimer) {
				refreshToastTimer = window.setTimeout(() => {
					if (activeRefreshes > 0 && !activeLoadingToastId) {
						activeLoadingToastId = toast.loading();
					}

					refreshToastTimer = undefined;
				}, REFRESH_TOAST_DELAY);
			}
		} else {
			setIsLoading(true);
		}

		try {
			await staleWhileRevalidate({
				cacheKey,

				cache,

				fetcher: () => request(...params),

				onData,

				onError,
			});
		} finally {
			activeRefreshes--;

			if (activeRefreshes === 0) {
				if (refreshToastTimer) {
					clearTimeout(refreshToastTimer);
					refreshToastTimer = undefined;
				}

				if (activeLoadingToastId) {
					toast.hide(activeLoadingToastId);
					activeLoadingToastId = undefined;
				}
			}

			setIsLoading(false);
			setIsRefreshing(false);
		}
	}, [cacheKey, request, params, onData, onError]);

	return {
		load,
		isLoading,
		isRefreshing,
	};
}
