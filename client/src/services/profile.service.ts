import { api } from "./api";

import type { Profile, UpdateProfileDTO } from "../types/profile.types";

export async function getProfileById(id: string) {
	return api<Profile>(`/profiles/${id}`);
}

export async function updateProfile(data: UpdateProfileDTO) {
	return api<Profile>("/profiles", {
		method: "PATCH",
		body: JSON.stringify(data),
	});
}