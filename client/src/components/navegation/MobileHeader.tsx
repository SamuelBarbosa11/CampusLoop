import { useNavigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";

import Text from "../Text";
import Logo from "../Smalls/Logo";
import Hello from "../Smalls/Hello";

import useIsInstalled from "../../hooks/useIsInstalled";

export default function MobileHeader() {
	const navigate = useNavigate();

	const { isAuthenticated } = useAuth();
	const isInstalled = useIsInstalled();

	return (
		<div className="fixed bg-(--navbar) backdrop-blur-md top-0 p-4 w-full flex justify-between items-center">
			<Logo />

			{!isInstalled && (
				<Text
					as="button"
					variant="heading"
					className="text-(--secondary) font-semibold tracking-wider absolute left-14"
					onClick={() => {
						window.confirm("Deseja instalar CampusLoop para seu dispositivo?");
					}}
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
