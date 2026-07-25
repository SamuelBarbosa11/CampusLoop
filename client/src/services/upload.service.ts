import { api } from "./api";

interface UploadResponse {
	url: string;
}

export async function uploadImage(file: File) {
	const form = new FormData();

	form.append("image", file);

	const data = await api<UploadResponse>("/upload", {
		method: "POST",
		body: form,
	});

	return data.url;
}
