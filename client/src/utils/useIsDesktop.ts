import useMediaQuery from "../hooks/useMediaQuery";

export const useIsDesktop = () => {
	return useMediaQuery("(min-width: 768px)");
};