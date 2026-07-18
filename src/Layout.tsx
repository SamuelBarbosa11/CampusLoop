import { Outlet } from "react-router";

import Navbar from "./components/Navbar";
import BottomNavigation from "./components/BottomNavigation";

import { useIsDesktop } from "./utils/useIsDesktop";

export default function Layout() {
	const isDesktop: boolean = useIsDesktop();

	return (
		<div className="w-full">
			{isDesktop ? <Navbar /> : <BottomNavigation />}

			<main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 md:mb-18">
				<Outlet />
			</main>
		</div>
	);
}
