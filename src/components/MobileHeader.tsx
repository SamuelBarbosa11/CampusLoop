import { useNavigate } from "react-router";

import { useAuth } from "../auth";

import Text from "./Text";
import Logo from "./Logo";
import Hello from "./Hello";

export default function MobileHeader() {
	const { isAuthenticated } = useAuth();
	const isInstalled = false;
	const navigate = useNavigate();

	return (
		<div className="absolute top-2 mx-2 w-full flex justify-between items-center">
			<Logo />

			{!isInstalled && (
				<Text
					as="button"
					variant="heading"
					className="text-(--secondary) font-semibold tracking-wider"
				>
					Instalar
				</Text>
			)}

			{isAuthenticated ? (
				<Hello />
			) : (
				<button
					id="sign-in"
					onClick={() => navigate("/auth")}
					className="cursor-pointer text-(--secondary) hover:text-(--primary) transition duration-300 ease-in-out"
				>
					Entrar
				</button>
			)}
		</div>
	);
}
