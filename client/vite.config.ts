import { defineConfig } from "vite";

import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),

		babel({
			presets: [reactCompilerPreset()],
		}),

		tailwindcss(),

		VitePWA({
			registerType: "autoUpdate",

			includeAssets: ["favicon.svg"],

			manifest: {
				name: "CampusLoop",
				short_name: "CampusLoop",
				description:
					"Uma plataforma anunciar desapego de items dentro da comunidade acadêmica.",

				theme_color: "#0f0f0f",
				background_color: "#0f0f0f",

				display: "standalone",

				start_url: "/",

				scope: "/",

				orientation: "portrait",

				icons: [
					{
						src: "/icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icon-512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/maskable-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],

				screenshots: [
					{
						src: "/screenshots/home-mobile.png",
						sizes: "370x802",
						type: "image/png",
					},
					{
						src: "/screenshots/home-desktop.png",
						sizes: "1440x810",
						type: "image/png",
						form_factor: "wide",
					},
				],
			},
		}),
	],
});
