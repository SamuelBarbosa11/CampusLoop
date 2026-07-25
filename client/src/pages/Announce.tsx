import Text from "../components/text/Text";
import ButtonBackTo from "../components/navegation/ButtonBackTo";
import FormInput from "../components/form/FormInput";
import Donation from "../components/form/Donation";
import Spinner from "../components/smalls/Spinner";
import UploadPhoto from "../components/form/UploadPhoto";

import { useAnnounceForm } from "../hooks/useAnnounceForm";

import { useIsDesktop } from "../hooks/useIsDesktop";

export default function Announce() {
	const isDesktop = useIsDesktop();

	const { form, update, submit, loading, messageError } = useAnnounceForm();

	return (
		<section id="announce" className="w-full min-h-screen mt-30">
			<div className="flex items-center gap-2 md:gap-4 mb-8">
				{isDesktop && <ButtonBackTo />}
				<Text variant="subtitle" className="w-full text-center md:text-start">
					Anunciar item
				</Text>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					submit();
				}}
				className="rounded-2xl grid gap-6 border border-(--shark) p-4 md:p-8 mb-18"
			>
				<div className="flex flex-col md:flex-row gap-6">
					<FormInput
						label="Título"
						name="title"
						id="title"
						placeholder="Ex: Cálculo Vol. I — Stewart"
						value={form.title}
						onChange={(e) => update("title", e.target.value)}
					/>

					<div className="relative flex flex-col w-full">
						<Text
							as="label"
							variant="label"
							className="absolute text-(--secondary) left-4 top-1"
						>
							Categoria
						</Text>

						<div className="w-full h-full rounded-xl border border-(--shark) pt-5">
							<select
								name="category"
								id="category"
								className="w-full h-full outline-none bg-(--background) focus:ring-1 rounded-lg focus:ring-(--mauve) px-4 py-3"
								value={form.category}
								onChange={(e) => update("category", e.target.value)}
							>
								<option value="Livros">Livros</option>
								<option value="Eletrônicos">Eletrônicos</option>
								<option value="Acessórios">Acessórios</option>
								<option value="Jalecos">Jalecos</option>
								<option value="Engenharia">Engenharia</option>
								<option value="Computação">Computação</option>
								<option value="Móveis">Móveis</option>
							</select>
						</div>
					</div>
				</div>

				<FormInput
					label="descrição"
					name="description"
					placeholder="Estado, marcações, o que acompanha..."
					maxLength={50}
					value={form.description}
					onChange={(e) => update("description", e.target.value)}
				/>

				<div className="flex flex-col gap-2">
					<Text as="label" variant="label" className="text-(--secondary) ml-2">
						URL da Imagem
					</Text>

					<UploadPhoto
						file={form.photo}
						onFileChange={(file) => update("photo", file)}
						disabled={loading}
					/>
				</div>

				<div className="flex min-w-0 flex-wrap gap-4">
					<div className="min-w-0 max-w-max">
						<FormInput
							type="number"
							label="Preço"
							name="price"
							id="price"
							placeholder="Ex: R$ 45"
							disabled={form.donation}
							value={form.donation ? "" : (form.price ?? "")}
							onChange={(e) =>
								update(
									"price",
									e.target.value === "" ? null : Number(e.target.value)
								)
							}
						/>
					</div>
					<Donation
						selected={form.donation}
						onSelect={() => update("donation", !form.donation)}
						className="py-4"
					/>

					<Text
						as="button"
						type="submit"
						variant="button"
						className="button max-w-max max-h-max shrink-0 rounded-2xl px-6 py-6 md:py-3 ml-auto mt-auto"
						disabled={loading}
					>
						{loading ? (
							<Spinner color="var(--background)" size=".75rem" />
						) : (
							"Publicar anúncio"
						)}
					</Text>
				</div>

				{messageError && (
					<Text variant="muted" className="text-red-500 font-semibold">
						{messageError}
					</Text>
				)}
			</form>
		</section>
	);
}
