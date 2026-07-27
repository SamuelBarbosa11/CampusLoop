import type { AnnounceFilters } from "../types/filter.types";

export default function buildAnnounceQuery(filters?: AnnounceFilters) {
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

	return params.toString();
}