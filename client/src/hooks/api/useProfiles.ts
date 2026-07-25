import { useState } from "react";

import * as Services from "../../services/profile.service";

import type { UpdateProfileDTO } from "../../types/profile.types";
import { useToast } from "../useToast";

export function useProfiles() {
	const [loadingProfile, setLoadingProfile] = useState(false);

	const toast = useToast();

	async function findById(id: string) {
		setLoadingProfile(true);

		try {
			return await Services.getProfileById(id);
		} finally {
			setLoadingProfile(false);
		}
	}

	async function update(data: UpdateProfileDTO) {
		setLoadingProfile(true);

		try {
			await Services.updateProfile(data);
			toast.success("Perfil Atualizado com sucesso!");
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingProfile(false);
		}
	}

	return {
		update,
		findById,
		loadingProfile,
	};
}
