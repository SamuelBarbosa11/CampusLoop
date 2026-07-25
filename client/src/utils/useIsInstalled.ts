export default function useIsInstalled() {
	const isInstalled = window.matchMedia("(display-mode: standalone)").matches;

	return isInstalled;
}