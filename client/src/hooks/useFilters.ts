import { useState } from "react";

export function useFilters() {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("Todos");
	const [donation, setDonation] = useState(false);
	const [sort, setSort] = useState("");

	return {
		search,
		category,
		donation,
		sort,

		setSearch,
		selectCategory: setCategory,
		toggleDonation: () => setDonation((prev) => !prev),
		selectSort(value: string) {
			setSort((current) => (current === value ? "" : value));
		},
	};
}
