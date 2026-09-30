import clsx from "clsx";

import Text from "../text/Text";
import logo from "../../assets/favicon.svg";

import { useIsDesktop } from "../../hooks/useIsDesktop";
import useIsInstalled from "../../hooks/useIsInstalled";
import { useNavigate } from "react-router";

type LogoProps = {
	className?: string;
};

export default function Logo({ className }: LogoProps) {
	const isDesktop = useIsDesktop();
	const isInstalled = useIsInstalled();

	const navigate = useNavigate();

	return (
		<button
			id="logo"
			onClick={() => navigate("")}
			className={clsx("flex gap-2 justify-center items-center cursor-pointer", className)}
		>
			<img src={logo} alt="Logo" className="w-8 h-8" />
			{(isDesktop || isInstalled) && (
				<Text className="font-bold">CampusLoop</Text>
			)}
		</button>
	);
}
