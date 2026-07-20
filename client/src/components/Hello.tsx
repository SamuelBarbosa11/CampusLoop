import { useAuth } from "../auth";

import Text from "./Text";

export default function Hello() {
	const { profile } = useAuth();
	return (
		<Text
			variant="label"
			className="flex justify-center items-center text-(--secondary) gap-1"
		>
			Olá,
			<Text
				variant="label"
				className="text-(--primary)"
			>{profile?.name ?? ""}</Text>
		</Text>
	);
}
