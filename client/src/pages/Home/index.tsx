import HeroSection from "./sections/HeroSection";
import Impact from "./sections/Impact";
import News from "./sections/News";
import PWA from "./sections/PWA";
import Footer from "./sections/Footer";

import { useIsDesktop } from "../../hooks/useIsDesktop";
import useIsInstalled from "../../hooks/useIsInstalled";

export default function Home() {
	const isDesktop = useIsDesktop();
	const isInstalled = useIsInstalled();

	return (
		<div className="relative">
			<div
				id="blur"
				className="
          absolute
          -top-100
          -z-1
          h-150
          w-full
          rounded-full
          blur-3xl
          bg-[radial-gradient(circle,rgba(194,159,255,0.18)_0%,rgba(194,159,255,0.18)_70%,transparent_100%)]
        "
			/>
			{!isInstalled && <HeroSection />}
			{isDesktop && <Impact />}
			<News />
			{isDesktop && (
				<>
					<PWA />
					<Footer />
				</>
			)}
		</div>
	);
}
