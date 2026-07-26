import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { registerSW } from "virtual:pwa-register";

import "./styles/index.css";

import App from "./App.tsx";

import AuthProvider from "./context/AuthProvider.tsx";
import ToastProvider from "./context/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<AuthProvider>
			<ToastProvider>
				<App />
			</ToastProvider>
		</AuthProvider>
	</BrowserRouter>
);

registerSW({
	immediate: true,
});