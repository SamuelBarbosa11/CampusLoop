import type { AnnouncesCard } from "../moks/moks_announces";

interface FiltersState {
	category: string;
	donation: boolean;
}

export function filterAnnounces(
	announces: AnnouncesCard[],
	filters: FiltersState
) {
	return announces.filter((item) => {
		const matchCategory =
			filters.category === "Todos" ||
			item.category === filters.category;

		const matchDonation =
			!filters.donation ||
			item.donation;

		return matchCategory && matchDonation;
	});
}