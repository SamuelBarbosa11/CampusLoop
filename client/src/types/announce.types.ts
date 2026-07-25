import type { Profile } from "./profile.types";

export interface Announce {
	id: string;
	user: Pick<Profile, "id" | "name" | "photo_url">;
	title: string;
	description: string;
	category: string;
	price: number | null;
	donation: boolean;
	image_url: string | null;
	created_at: string;
}

export interface CreateAnnounceDTO {
	title: string;
	description?: string;
	category: string;
	price: number | null;
	donation: boolean;
	image_url: string;
}