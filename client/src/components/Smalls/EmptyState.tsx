import Text from "../Text";

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
	return (
		<div className="mx-auto flex flex-col items-center justify-center py-16 text-center gap-2">
			{title && <Text variant="muted">{title}</Text>}

			{subtitle && (
				<Text variant="heading" className="text-(--secondary)">
					{subtitle}
				</Text>
			)}
		</div>
	);
}
