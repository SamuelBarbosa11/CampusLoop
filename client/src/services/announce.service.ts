import { api } from "./api";

import buildAnnounceQuery from "../utils/buildAnnounceQuery";
import {
	getAnnouncesCacheKey,
	getAnnouncesPublicProfileCacheKey,
	getMyAnnouncesCacheKey,
} from "../utils/buildCacheKeys";

import type { Announce, CreateAnnounceDTO } from "../types/announce.types";
import type { AnnounceFilters } from "../types/filter.types";

import { getCache } from "./cache.service";

export async function createAnnounce(data: CreateAnnounceDTO) {
	return api("/announces", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function getAnnounces(filters?: AnnounceFilters) {
	const query = buildAnnounceQuery(filters);

	return api<Announce[]>(query ? `/announces?${query}` : "/announces");
}

export async function getMyAnnounces(filters?: AnnounceFilters) {
	const query = buildAnnounceQuery(filters);

	return api<Announce[]>(query ? `/announces/me?${query}` : "/announces/me");
}

export async function getAnnounceById(id: string) {
	return api<Announce>(`/announces/${id}`);
}

export async function getAnnouncesByUserId(id: string) {
	return api<Announce[]>(`/announces/user/${id}`);
}

export async function getCategories() {
	return api<string[]>(`/announces/categories`);
}

export async function getMyCategories() {
	return api<string[]>("/announces/me/categories");
}

export async function removeAnnounce(id: string) {
	return api<void>(`/announces/${id}`, {
		method: "DELETE",
	});
}

// Caches

export async function getAnnouncesCache(filters?: AnnounceFilters) {
	const cacheKey = getAnnouncesCacheKey(filters);

	return getCache<Announce[]>(cacheKey);
}

export async function getMyAnnouncesCache(filters?: AnnounceFilters) {
	const cacheKey = getMyAnnouncesCacheKey(filters);

	return getCache<Announce[]>(cacheKey);
}

export async function getAnnouncesByUserIdCache(id: string) {
	const cacheKey = getAnnouncesPublicProfileCacheKey(id);

	return getCache<Announce[]>(cacheKey);
}