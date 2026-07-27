import { api } from "./api";

import type { Profile, UpdateProfileDTO } from "../types/profile.types";

import { getCache, setCache } from "./cache.service";
import { CACHE_KEYS } from "../constants/cacheKeys";

export async function getMyProfile() {
	const cacheKey = CACHE_KEYS.PROFILE_ME;

	try {
		const profile = await api<Profile>(`/profiles`);
	
		await setCache(cacheKey, profile);
	
		return profile;
	} catch {
		const cache = await getCache<Profile>(cacheKey);

		if (cache) return cache;

		throw new Error("Nenhum dado disponível.");
	}
}

export async function getProfileById(id: string) {
	const cacheKey = CACHE_KEYS.PROFILE_PUBLIC(id);

	try {
		const profile = await api<Profile>(`/profiles/${id}`);

		await setCache(cacheKey, profile);

		return profile;
	} catch {
		const cache = await getCache<Profile>(cacheKey);

		if (cache) return cache;

		throw new Error("Nenhum dado disponível.");
	}
}

export async function updateProfile(data: UpdateProfileDTO) {
	return api<Profile>("/profiles", {
		method: "PATCH",
		body: JSON.stringify(data),
	});
}