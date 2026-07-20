import clsx from "clsx";

import Text from "./Text";
import logo from "../assets/favicon.png";

type LogoProps = {
	className?: string;
};

export default function Logo({ className = ""}: LogoProps) {
	return (
		<div
			id="logo"
			className={clsx("flex gap-2 justify-center items-center", className)}
		>
			<img
				src={logo}
				alt="Logo"
				className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
			/>
			<Text className="font-bold">CampusLoop</Text>
		</div>
	);
}
