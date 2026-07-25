import normalizeNumber from "./normalizeNumber";

export default function openWhatsapp(phone: string, message?: string) {
	const number = normalizeNumber(phone);

	if (!number) {
		return;
	}

	const url = new URL(`https://wa.me/${number}`);

	if (message) {
		url.searchParams.set("text", message);
	}

	window.open(url.toString(), "_blank", "noopener,noreferrer");
}
