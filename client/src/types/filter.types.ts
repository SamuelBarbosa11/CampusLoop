export interface SortOption {
	label: string;
	value: string;
}

export interface AnnounceFilters {
	category?: string;
	search?: string;
	donation?: boolean;
	sort?: string;
}