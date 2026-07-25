import { Outlet, useLocation } from "react-router";

import NavBar from "./components/navegation/NavBar";
import BottomNavigation from "./components/navegation/BottomNavigation";

import MobileHeader from "./components/navegation/MobileHeader";

import { useIsDesktop } from "./utils/useIsDesktop";

export default function Layout() {
	const isDesktop: boolean = useIsDesktop();

	const location = useLocation();
	const hideNavigation = location.pathname.startsWith("/auth");

	return (
		<div className="w-full">
			{!hideNavigation &&
				(isDesktop ? (
					<NavBar />
				) : (
					<>
						<BottomNavigation />
						<MobileHeader />
					</>
				))}

			<main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 md:mb-18">
				<Outlet />
			</main>
		</div>
	);
}
