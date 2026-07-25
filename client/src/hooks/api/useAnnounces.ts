import { useState } from "react";

import * as Services from "../../services/announce.service";
import type { CreateAnnounceDTO } from "../../types/announce.types";
import type { AnnounceFilters } from "../../types/filter.types";

import { useToast } from "../useToast";

export function useAnnounces() {
	const [loadingAnnounces, setLoadingAnnounces] = useState(false);

	const toast = useToast();

	async function create(data: CreateAnnounceDTO) {
		setLoadingAnnounces(true);

		try {
			await Services.createAnnounce(data);
			toast.success("Anúncio publicado com sucesso!");
		} finally {
			setLoadingAnnounces(false);
		}
	}

	async function findAll(filters?: AnnounceFilters) {
		setLoadingAnnounces(true);

		try {
			return await Services.getAnnounces(filters);
		} finally {
			setLoadingAnnounces(false);
		}
	}

	async function findMine(filters?: AnnounceFilters) {
		setLoadingAnnounces(true);

		try {
			return await Services.getMyAnnounces(filters);
		} finally {
			setLoadingAnnounces(false);
		}
	}

	async function findById(id: string) {
		setLoadingAnnounces(true);

		try {
			return await Services.getAnnounceById(id);
		} finally {
			setLoadingAnnounces(false);
		}
	}

	async function findByUserId(id: string) {
		setLoadingAnnounces(true);

		try {
			return await Services.getAnnouncesByUserId(id);
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
		findAll,
		findMine,
		findById,
		findByUserId,
		remove,
		loadingAnnounces,
	};
}
