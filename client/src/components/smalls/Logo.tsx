import clsx from "clsx";

import Text from "../text/Text";
import logo from "../../assets/favicon.png";

import { useIsDesktop } from "../../hooks/useIsDesktop";
import useIsInstalled from "../../hooks/useIsInstalled";

type LogoProps = {
	className?: string;
};

export default function Logo({ className }: LogoProps) {
	const isDesktop = useIsDesktop();
	const isInstalled = useIsInstalled();

	return (
		<div
			id="logo"
			className={clsx("flex gap-2 justify-center items-center", className)}
		>
			<img src={logo} alt="Logo" className="w-8 h-8" />
			{(isDesktop || isInstalled) && (
				<Text className="font-bold">CampusLoop</Text>
			)}
		</div>
	);
}
