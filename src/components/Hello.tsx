import Text from "./Text";

const user = "toty";

export default function Hello() {
	return (
		<Text
			variant="label"
			className="flex justify-center items-center text-(--manatee) gap-1"
		>
			Olá,
			<Text variant="label" className="text-(--primary)">{`${user}`}</Text>
		</Text>
	);
}
