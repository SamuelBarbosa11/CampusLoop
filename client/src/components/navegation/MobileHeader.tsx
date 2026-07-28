import { useNavigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";

import Text from "../text/Text";
import Logo from "../smalls/Logo";
import Hello from "../smalls/Hello";

import useIsInstalled from "../../hooks/useIsInstalled";
import useInstallPrompt from "../../hooks/useInstallPrompt";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export default function MobileHeader() {
	const navigate = useNavigate();

	const { isAuthenticated } = useAuth();

	const isDesktop = useIsDesktop();
	const isInstalled = useIsInstalled();

	const { install } = useInstallPrompt();

	return (
		<div className="absolute top-0 bg-(--navbar) backdrop-blur-md p-4 w-screen flex justify-between items-center z-100">
			<Logo />

			{!isInstalled && !isDesktop && (
				<Text
					as="button"
					variant="heading"
					className="text-(--secondary) font-semibold tracking-wider absolute left-14"
					onClick={install}
				>
					Instalar
				</Text>
			)}

			{isAuthenticated ? (
				<Hello />
			) : (
				<Text
					as="button"
					type="button"
					id="sign-in"
					variant="button"
					onClick={() => navigate("/auth")}
					className="cursor-pointer text-(--secondary) hover:text-(--primary) transition duration-300 ease-in-out"
				>
					Entrar
				</Text>
			)}
		</div>
	);
}
