import { useState } from "react";

import { uploadImage } from "../../services/upload.service";

export function useUpload() {
	const [loadingUpload, setLoadingUpload] = useState(false);

	async function upload(file: File) {
		setLoadingUpload(true);

		try {
			return await uploadImage(file);
		} catch (error) {
			console.error(error);
			throw error;
		} finally {
			setLoadingUpload(false);
		}
	}

	return {
		upload,
		loadingUpload,
	};
}
