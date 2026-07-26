import { useEffect, useState } from "react";

export default function useIsInstalled() {
	const [isInstalled, setIsInstalled] = useState(
		() => window.matchMedia("(display-mode: standalone)").matches
	);

	useEffect(() => {
		const media = window.matchMedia("(display-mode: standalone)");

		function handleChange() {
			setIsInstalled(media.matches);
		}

		media.addEventListener("change", handleChange);

		return () => {
			media.removeEventListener("change", handleChange);
		};
	}, []);

	return isInstalled;
}