import { useState } from "react";

import * as Services from "../../services/profile.service";

import type { UpdateProfileDTO } from "../../types/profile.types";
import { toast } from "../../services/toast";

export function useProfiles() {
	const [loadingProfile, setLoadingProfile] = useState(false);

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
		loadingProfile,
	};
}
