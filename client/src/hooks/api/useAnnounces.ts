import { useState } from "react";

import * as Services from "../../services/announce.service";
import type { CreateAnnounceDTO } from "../../types/announce.types";

import { toast } from "../../services/toast";

export function useAnnounces() {
	const [loadingAnnounces, setLoadingAnnounces] = useState(false);

	async function create(data: CreateAnnounceDTO) {
		setLoadingAnnounces(true);

		try {
			await Services.createAnnounce(data);
			toast.success("Anúncio publicado com sucesso!");
		} finally {
			setLoadingAnnounces(false);
		}
	}

	async function remove(id: string) {
		setLoadingAnnounces(true);

		try {
			await Services.removeAnnounce(id);
			toast.success("Anúncio excluído com sucesso!");
		} finally {
			setLoadingAnnounces(false);
		}
	}

	return {
		create,
		remove,
		loadingAnnounces,
	};
}
