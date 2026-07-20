import { AppError } from "../utils/AppError.js";

const MAX_MB_FILE_SIZE = 32;
const MAX_FILE_SIZE = MAX_MB_FILE_SIZE * 1024 * 1024;

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export async function uploadImage(file: Express.Multer.File) {
	if (!file) {
		throw new AppError("Imagem não enviada.");
	}

	if (!ALLOWED_TYPES.includes(file.mimetype)) {
		throw new AppError("Formato de imagem inválido.");
	}

	if (file.size > MAX_FILE_SIZE) {
		throw new AppError(`A imagem excede o limite de ${MAX_MB_FILE_SIZE} MB.`);
	}

	const formData = new FormData();

	formData.append("image", file.buffer.toString("base64"));

	const response = await fetch(
		`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
		{
			method: "POST",
			body: formData,
		}
	);

	if (!response.ok) {
		throw new AppError("Erro ao enviar imagem.");
	}

	const result = await response.json();

	return result.data.url;
}
