export function formatTelephone(value: string) {
	// Formato: +00 (00) 0 0000-0000

	const digits = value.replace(/\D/g, "").slice(0, 13);

	const hasCountry = digits.length > 11;

	const country = hasCountry ? digits.slice(0, digits.length - 11) : "";

	const phone = hasCountry ? digits.slice(-11) : digits;

	let formatted = "";

	if (phone.length <= 2) {
		formatted = phone;
	} else if (phone.length <= 3) {
		formatted = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
	} else if (phone.length <= 7) {
		formatted = `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(3)}`;
	} else {
		formatted = `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(3, 7)}-${phone.slice(7)}`;
	}

	return hasCountry ? `+${country} ${formatted}` : formatted;
}
