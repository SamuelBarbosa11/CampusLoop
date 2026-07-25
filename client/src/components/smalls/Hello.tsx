import { useAuth } from "../../hooks/useAuth";

import Text from "../text/Text";
import ProfileIcon from "../navegation/ProfileIcon";

export default function Hello() {
	const { profile } = useAuth();

	return (
		<div className="flex gap-2">
			<Text
				variant="label"
				className="flex flex-wrap justify-center items-center text-(--secondary) gap-1 cursor-default"
			>
				Olá,
				<Text variant="label" className="text-(--primary)">
					{profile?.name ?? ""}
				</Text>
			</Text>

			<ProfileIcon />
		</div>
	);
}
