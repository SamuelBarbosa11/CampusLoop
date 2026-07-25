export default function normalizeNumber(phone: string): string {
	const digits = phone.replace(/\D/g, "");

	if (!digits) {
		return "";
	}

	// Já possui DDI (55...)
	if (digits.startsWith("55")) {
		return digits;
	}

	return `55${digits}`;
}