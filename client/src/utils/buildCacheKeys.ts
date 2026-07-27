import buildAnnounceQuery from "./buildAnnounceQuery";

import type { AnnounceFilters } from "../types/filter.types";

import { CACHE_KEYS } from "../constants/cacheKeys";

// Announces

export function getAnnouncesCacheKey(filters?: AnnounceFilters) {
	const query = buildAnnounceQuery(filters);

	return CACHE_KEYS.FEED(query || "all");
}

export function getMyAnnouncesCacheKey(filters?: AnnounceFilters) {
	const query = buildAnnounceQuery(filters);

	return CACHE_KEYS.ANNOUNCES_ME(query || "all");
}

export function getAnnouncesPublicProfileCacheKey(id: string) {
	return CACHE_KEYS.ANNOUNCES_PROFILE_PUBLIC(id);
}

// Profile

export function getMyProfileCacheKey() {
	return CACHE_KEYS.PROFILE_ME;
}

export function getPublicProfileCacheKey(id: string) {
	return CACHE_KEYS.PROFILE_PUBLIC(id);
}