export interface Announce {
	id: string;

	user_id: string;

	image_url: string;

	title: string;

	subtitle: string | null;

  category: string;

	price: number | null;

	donation: boolean;

	created_at: string;
}

export interface CreateAnnounceDTO {
	id: string;

	user_id: string;

	image_url: string;

	title: string;

	subtitle?: string;

  category: string;

	price?: number | null;

	donation: boolean;
}

export interface UpdateAnnounceDTO {
	image_url?: string;

	title?: string;

	subtitle?: string;

  category?: string;

	price?: number | null;

	donation?: boolean;
}

export interface AnnounceFilters {
	category?: string;
	donation?: boolean;
	search?: string;
	user_id?: string;
	sort?: string;
}