export interface Profile {
	id: string;
	name: string | null;
	biography: string | null;
	telephone: string | null;
	photo_url: string | null;
	created_at: string;
}

export interface UpdateProfileDTO {
	name?: string;
	biography?: string;
	telephone?: string;
	photo_url?: string;
}