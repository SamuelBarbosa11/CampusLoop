import type { ReactNode } from "react";

import Text from "../../components/Text";
import favicon from "../../assets/favicon.png";

interface AuthCardProps {
	title: string;
	subtitle?: string;
	children: ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
	return (
		<div className="flex flex-col justify-center items-center gap-8">
			<div className="flex flex-col justify-center items-center gap-2">
				<img src={favicon} alt="" className="w-16 h-16 aspect-square" />
				<Text variant="subtitle">{title}</Text>
				<Text variant="muted" className="text-(--secondary)">
					{subtitle}
				</Text>
			</div>

			<div className="md:w-md lg:w-lg bg-(--background) rounded-2xl border border-(--shark) px-6 pt-6 pb-12">
				{children}
			</div>
		</div>
	);
}
