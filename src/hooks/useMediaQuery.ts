import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(
		window.matchMedia(query).matches
	);

	useEffect(() => {
		const media = window.matchMedia(query);

		function listener(event: MediaQueryListEvent) {
			setMatches(event.matches);
		}

		media.addEventListener("change", listener);

		return () => {
			media.removeEventListener("change", listener);
		};
	}, [query]);

	return matches;
}