export function formatRelativeTime(date: string) {
	const now = new Date();

	const createdDate = new Date(date);

	const diff = now.getTime() - createdDate.getTime();

	const minutes = Math.floor(diff / (1000 * 60));

	if (minutes < 60) {
		return `${minutes} minuto${minutes !== 1 ? "s" : ""}`;
	}

	const hours = Math.floor(minutes / 60);

	if (hours < 24) {
		return `${hours} hora${hours !== 1 ? "s" : ""}`;
	}

	const days = Math.floor(hours / 24);

	if (days < 7) {
		return `${days} dia${days !== 1 ? "s" : ""}`;
	}

	const weeks = Math.floor(days / 7);

	if (weeks < 5) {
		return `${weeks} semana${weeks !== 1 ? "s" : ""}`;
	}

	const months = Math.floor(days / 30);

	return `${months} mês${months !== 1 ? "es" : ""}`;
}
