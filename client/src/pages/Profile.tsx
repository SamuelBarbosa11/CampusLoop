import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { useParams } from "react-router";

import Text from "../components/text/Text";
import FormInput from "../components/form/FormInput";
import FormButton from "../components/form/FormButton";
import Card from "../components/cards/Card";
import EmptyState from "../components/smalls/EmptyState";
import Spinner from "../components/smalls/Spinner";
import ExitButtom from "../components/navegation/ExitButtom";
import ButtonBackTo from "../components/navegation/ButtonBackTo";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCamera } from "react-icons/io5";
import { TbBrandWhatsapp } from "react-icons/tb";

import { useAuth } from "../hooks/useAuth";
import { useAnnounces } from "../hooks/api/useAnnounces";
import { useProfiles } from "../hooks/api/useProfiles";
import { useUpload } from "../hooks/api/useUpload";
import { useIsDesktop } from "../hooks/useIsDesktop";

import { formatTelephone } from "../utils/formatTelephone";
import openWhatsapp from "../utils/openWhatsapp";

import type { Announce } from "../types/announce.types";
import type { Profile, UpdateProfileDTO } from "../types/profile.types";

export default function Profile() {
	const { id } = useParams();
	const { profile: myProfile, refreshProfile } = useAuth();
	const [viewedProfile, setViewedProfile] = useState<Profile | null>(null);

	const viewedProfileId = id ?? myProfile?.id;
	const isOwner = viewedProfileId === myProfile?.id;

	const { findByUserId, loadingAnnounces } = useAnnounces();
	const { findById, update } = useProfiles();
	const { upload, loadingUpload } = useUpload();

	const [announces, setAnnounces] = useState<Announce[]>([]);
	const [editMode, setEditMode] = useState(false);
	const [loadingChanges, setLoadingChanges] = useState(false);
	const [loadingData, setLoadingData] = useState(true);

	const inputRef = useRef<HTMLInputElement>(null);

	const isDesktop = useIsDesktop();

	function toggleEditMode() {
		setEditMode((prev) => !prev);
	}

	const [formData, setFormData] = useState<UpdateProfileDTO>({
		name: "",
		biography: "",
		telephone: "",
		photo_url: "",
	});

	function resetForm() {
		if (!myProfile) return;

		setFormData({
			name: myProfile.name ?? "",
			biography: myProfile.biography ?? "",
			telephone: myProfile.telephone ?? "",
			photo_url: myProfile.photo_url ?? "",
		});
	}

	useEffect(() => {
		if (!viewedProfile) return;

		setFormData({
			name: viewedProfile.name ?? "",
			biography: viewedProfile.biography ?? "",
			telephone: viewedProfile.telephone ?? "",
			photo_url: viewedProfile.photo_url ?? "",
		});
	}, [viewedProfile]);

	useEffect(() => {
		if (!viewedProfileId) return;

		async function loadData(viewedProfileId: string) {
			try {
				setLoadingData(true);

				await findById(viewedProfileId)
					.then(setViewedProfile)
					.catch(console.error);

				await findByUserId(viewedProfileId)
					.then(setAnnounces)
					.catch(console.error);
			} finally {
				setLoadingData(false);
			}
		}

		loadData(viewedProfileId);
	}, [viewedProfileId]);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;

		setFormData((previous) => ({
			...previous,
			[name]: name === "telephone" ? formatTelephone(value) : value,
		}));
	}

	async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (!file) return;

		const imageUrl = await upload(file);

		setFormData((previous) => ({
			...previous,
			photo_url: imageUrl,
		}));
	}

	async function saveChanges() {
		try {
			setLoadingChanges(true);

			await update({
				name: formData.name,
				biography: formData.biography,
				telephone: formData.telephone,
				photo_url: formData.photo_url,
			});

			await refreshProfile();

			toggleEditMode();
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingChanges(false);
		}
	}

	function dismissChanges() {
		resetForm();
		toggleEditMode();
	}

	return (
		<section id="profile" className="mt-22">
			{!editMode ? (
				<>
					{isDesktop && (
						<ButtonBackTo className="fixed top-18 left-4 bg-(--background)" />
					)}

					{!loadingData ? (
						<header className="flex flex-col items-center px-2 md:px-4">
							{isOwner && (
								<ExitButtom className="border border-(--shark) rounded-2xl px-4 py-2 ml-auto" />
							)}

							<div className="w-full min-h-40 sm:min-h-32 flex mt-4 md:mt-12 gap-4 sm:gap-8 md:gap-12">
								<div id="profile-photo" className="my-auto shrink-0">
									{formData.photo_url ? (
										<img
											src={formData.photo_url}
											className="w-24 h-24 sm:w-32 sm:h-32 md:w-38 md:h-38 aspect-square rounded-full object-cover border border-(--shark)"
										/>
									) : (
										<CgProfile className="w-32 h-32" />
									)}
								</div>

								<div id="infos" className="flex flex-col justify-between">
									<Text variant="title">{formData.name}</Text>

									{formData.biography ? (
										<Text variant="muted" className="line-clamp-3">
											{formData.biography}
										</Text>
									) : (
										<Text variant="muted" className="text-(--secondary)">
											...bio
										</Text>
									)}

									{formData.telephone ? (
										<div className="flex items-center gap-2">
											{!isOwner && (
												<button
													id="whatsapp-button"
													type="button"
													onClick={() => {
														if (!formData.telephone) return;
														openWhatsapp(
															formData.telephone,
															`Olá, ${formData.name}! Vi um anúncio seu no CampusLoop e tenho interesse.`
														);
													}}
													className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-(--shark) flex justify-center items-center cursor-pointer"
													aria-label="Abrir conversa no WhatsApp"
												>
													<TbBrandWhatsapp className="w-full h-full p-2" />
												</button>
											)}

											<Text variant="muted">{formData.telephone}</Text>
										</div>
									) : (
										<Text variant="muted" className="text-(--secondary)">
											(00) 9 9999-9999
										</Text>
									)}
								</div>
							</div>

							{isOwner && (
								<FormButton
									type="button"
									backgroundColor="var(--shark)"
									color="white"
									className="w-full mt-4 cursor-pointer"
									onClick={() => toggleEditMode()}
								>
									Editar Perfil
								</FormButton>
							)}
						</header>
					) : (
						<div className="w-full h-64 flex justify-center items-center rounded-2xl border border-(--shark) mt-8 md:mt-32">
							<Spinner />
						</div>
					)}

					<div
						id="galeria-announces"
						className="mt-8 md:mt-12 w-full flex justify-center"
					>
						<ul className="flex md:flex-wrap overflow-x-auto justify-start md:justify-center gap-6 px-3">
							{loadingAnnounces ? (
								<div className="w-full min-h-screen flex justify-center items-center">
									<Spinner />
								</div>
							) : (
								<>
									{announces.length > 0 ? (
										announces.map((item, index) => (
											<li key={index}>
												<Card item={item} keepStyle />
											</li>
										))
									) : (
										<EmptyState subtitle={isOwner ? "Você ainda não publicou nenhum anúncio.":"Esse usuário não publicou nenhum anúncio."} />
									)}
								</>
							)}
						</ul>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center gap-12 md:gap-18">
					<header className="relative w-full flex">
						<button
							type="button"
							className="absolute top-1/2 -translate-y-1/2"
							onClick={dismissChanges}
						>
							<FaLongArrowAltLeft size="2rem" />
						</button>

						<Text
							variant="subtitle"
							className="w-full text-center md:text-start md:ml-12"
						>
							Editar Perfil
						</Text>
					</header>

					<form
						onSubmit={(event) => {
							event.preventDefault();
							void saveChanges();
						}}
						className="w-full px-4 md:px-24"
					>
						<div
							id="profile-photo"
							className="relative w-max flex justify-center mx-auto mb-6"
						>
							{formData.photo_url ? (
								<img
									src={formData.photo_url}
									alt=""
									className="w-28 h-28 md:w-32 md:h-32 rounded-full object-contain border-(--shark)"
								/>
							) : (
								<CgProfile
									color="var(--secondary)"
									className="w-28 h-28 md:w-32 md:h-32"
								/>
							)}

							<button
								type="button"
								id="edit-photo-button"
								className="absolute -right-1 bottom-0 w-10 h-10 z-1 bg-(--shark) rounded-full flex justify-center items-center cursor-pointer"
								onClick={() => inputRef.current?.click()}
								disabled={loadingUpload}
							>
								{loadingUpload ? (
									<Spinner />
								) : (
									<IoCamera size="1.5rem" color="var(--mauve-40)" />
								)}
							</button>
						</div>

						<div id="inputs" className="grid gap-2 mb-4">
							<FormInput
								label="Nome"
								name="name"
								value={formData.name}
								onChange={handleChange}
							/>

							<FormInput
								label="Bio"
								name="biography"
								value={formData.biography}
								placeholder="Escreva um pouco sobre você aqui..."
								maxLength={150}
								onChange={handleChange}
							/>

							<FormInput
								label="Telefone"
								name="telephone"
								value={formData.telephone}
								placeholder="+00 (00) 0 0000-0000"
								onChange={handleChange}
							/>
						</div>

						<FormButton
							type="submit"
							backgroundColor="var(--shark)"
							color="white"
							className="w-full"
							loading={loadingChanges}
						>
							Salvar Mudanças
						</FormButton>

						<input
							ref={inputRef}
							type="file"
							accept="image/*"
							hidden
							onChange={handlePhotoChange}
						/>
					</form>
				</div>
			)}
		</section>
	);
}
