import { useState } from "react";
import { useNavigate } from "react-router";

import { useUpload } from "./api/useUpload";
import { useAnnounces } from "./api/useAnnounces";
import useOnlineStatus from "./useOnlineStatus";

import { toast } from "../services/toast";

export interface AnnounceForm {
	title: string;
	description: string;
	category: string;

	price: number | null;
	donation: boolean;

	photo: File | null;
}

const INITIAL_FORM: AnnounceForm = {
	title: "",
	description: "",
	category: "Livros",
	price: null,
	donation: false,
	photo: null,
};

export function useAnnounceForm() {
	const navigate = useNavigate();

	const isOnline = useOnlineStatus();

	const { upload } = useUpload();
	const { create } = useAnnounces();

	const [form, setForm] = useState(INITIAL_FORM);

	const [loading, setLoading] = useState(false);

	const [messageError, setMessageError] = useState("");

	function update<K extends keyof AnnounceForm>(
		field: K,
		value: AnnounceForm[K]
	) {
		setForm((prev) => ({
			...prev,
			[field]: value,
		}));
	}

	async function submit() {
		try {
			setLoading(true);
			setMessageError("");

			if (!form.photo) {
				toast.error("Selecione uma imagem.");
				throw new Error("Selecione uma imagem.");
			}

			if (!isOnline) {
				toast.error("Conecte-se à internet para atualizar seu perfil.");
				return;
			}

			const imageUrl = await upload(form.photo);

			await create({
				title: form.title,
				description: form.description,
				category: form.category,
				price: form.donation ? null : form.price,
				donation: form.donation,
				image_url: imageUrl,
			});

			setForm(INITIAL_FORM);

			navigate("/dashboard");
		} catch (error) {
			console.error(error);
			setMessageError("Erro ao publicar anúncio.");
		} finally {
			setLoading(false);
		}
	}

	return {
		form,
		update,
		submit,
		loading,
		messageError,
	};
}
