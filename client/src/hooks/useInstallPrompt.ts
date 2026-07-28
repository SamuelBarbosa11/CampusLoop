import { useEffect, useState } from "react";

import { toast } from "../services/toast";

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;

	userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
}

export default function useInstallPrompt() {
	const [installPrompt, setInstallPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);

	const isIOS =
		/iPad|iPhone|iPod/.test(navigator.userAgent) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

	useEffect(() => {
		function handleBeforeInstallPrompt(event: Event) {
			event.preventDefault();

			setInstallPrompt(event as BeforeInstallPromptEvent);
		}

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, []);

	async function install() {
		// Safari
		if (isIOS) {
			toast.info(
				"No Safari, toque em Compartilhar → Adicionar à Tela de Início."
			);
			return;
		}

		// Chrome ainda não liberou o prompt
		if (!installPrompt) {
			toast.info(
				"O navegador ainda não liberou a instalação. Continue navegando por alguns instantes e tente novamente."
			);
			return;
		}

		await installPrompt.prompt();

		const { outcome } = await installPrompt.userChoice;

		if (outcome === "accepted") {
			toast.success("Aplicativo instalado com sucesso!");
		}

		setInstallPrompt(null);
	}

	return {
		install,
	};
}
