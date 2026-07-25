import {
	useEffect,
	useMemo,
	useRef,
	useState,
	type ChangeEvent,
	type DragEvent,
} from "react";

import clsx from "clsx";

import Text from "../Text";

import { useIsDesktop } from "../../hooks/useIsDesktop";

interface UploadPhotoProps {
	file: File | null;
	onFileChange(file: File | null): void;

	disabled?: boolean;
	maxSize?: number;
	accept?: string[];
	preview?: boolean;
	removable?: boolean;

	className?: string;
}

export default function UploadPhoto({
	file,
	onFileChange,

	disabled = false,
	maxSize = 32,
	accept = ["image/png", "image/jpeg", "image/jpg", "image/webp, image/jfif"],
	preview = true,
	removable = true,

	className,
}: UploadPhotoProps) {
	const isDesktop = useIsDesktop();

	const inputRef = useRef<HTMLInputElement>(null);

	const [dragging, setDragging] = useState(false);

	const [error, setError] = useState("");

	const previewUrl = useMemo(() => {
		if (!file) return null;

		return URL.createObjectURL(file);
	}, [file]);

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	function validate(file: File) {
		if (!accept.includes(file.type)) {
			setError("Formato não suportado.");

			return false;
		}

		if (file.size > maxSize * 1024 * 1024) {
			setError(`Máximo ${maxSize} MB.`);

			return false;
		}

		setError("");

		return true;
	}

	function handle(file: File | null) {
		if (!file) return;

		if (!validate(file)) return;

		onFileChange(file);
	}

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		handle(e.target.files?.[0] ?? null);
	}

	function handleDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();

		setDragging(false);

		handle(e.dataTransfer.files[0]);
	}

	return (
		<>
			<input
				ref={inputRef}
				type="file"
				hidden
				disabled={disabled}
				accept={accept.join(",")}
				onChange={handleInput}
			/>

			{isDesktop ? (
				<div
					onClick={() => inputRef.current?.click()}
					onDragOver={(e) => {
						e.preventDefault();
						setDragging(true);
					}}
					onDragLeave={() => setDragging(false)}
					onDrop={handleDrop}
					className={clsx(
						"flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl transition border-2 border-dashed border-(--shark) hover:border-(--bg-button)",
						dragging ? "border-(--bg-button)" : "border-(--shark)",
						className
					)}
				>
					{preview && previewUrl ? (
						<img
							src={previewUrl}
							className="h-full w-full rounded-xl object-cover"
						/>
					) : (
						<>
							<Text variant="muted">Arraste uma imagem</Text>

							<Text variant="heading" className="text-(--secondary)">
								ou clique para selecionar
							</Text>
						</>
					)}
				</div>
			) : (
				<>
					<button
						type="button"
						disabled={disabled}
						onClick={() => inputRef.current?.click()}
						className="button-opaque max-w-max rounded-xl px-4 py-2"
					>
						Selecionar imagem
					</button>

					{preview && previewUrl && (
						<img src={previewUrl} className="mt-4 rounded-xl object-cover" />
					)}
				</>
			)}

			{file && removable && (
				<button
					type="button"
					onClick={() => onFileChange(null)}
					className="max-w-max text-red-400 rounded-xl border border-(--shark) mt-3 mx-auto px-4 py-2 cursor-pointer"
				>
					Remover imagem
				</button>
			)}

			{error && (
				<Text variant="muted" className="max-w-max text-red-500 mx-auto mt-2">
					{error}
				</Text>
			)}
		</>
	);
}
