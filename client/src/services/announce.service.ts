import type { Announce, CreateAnnounceDTO } from "../types/announce.types";
import type { AnnounceFilters } from "../types/filter.types";
import { api } from "./api";

export async function createAnnounce(data: CreateAnnounceDTO) {
	return api("/announces", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function getAnnounces(filters?: AnnounceFilters) {
	const params = new URLSearchParams();

	if (filters?.category && filters.category !== "Todos") {
		params.append("category", filters.category);
	}

	if (filters?.search) {
		params.append("search", filters.search);
	}

	if (filters?.donation) {
		params.append("donation", "true");
	}

	if (filters?.sort) {
		params.append("sort", filters.sort);
	}

	const query = params.toString();

	return api<Announce[]>(
		query ? `/announces?${query}` : "/announces"
	);
}

export async function getMyAnnounces(filters?: AnnounceFilters) {
	const params = new URLSearchParams();

	if (filters?.category && filters.category !== "Todos") {
		params.append("category", filters.category);
	}

	if (filters?.search) {
		params.append("search", filters.search);
	}

	if (filters?.donation) {
		params.append("donation", "true");
	}

	if (filters?.sort) {
		params.append("sort", filters.sort);
	}

	const query = params.toString();

	return api<Announce[]>(
		query ? `/announces/me?${query}` : "/announces/me"
	);
}

export async function getAnnounceById(id: string) {
	return api<Announce>(`/announces/${id}`);
}

export async function getAnnouncesByUserId(id: string) {
	return api<Announce[]>(`/announces/user/${id}`);
}

export async function removeAnnounce(id: string) {
	return api<void>(`/announces/${id}`, {
		method: "DELETE",
	});
}
