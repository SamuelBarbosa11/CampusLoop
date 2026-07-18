import HeroSection from "../sections/Home/HeroSection";
import Impact from "../sections/Home/Impact";
import News from "../sections/Home/News";
import PWA from "../sections/Home/PWA";
import Footer from "../sections/Home/Footer";

import { useIsDesktop } from "../utils/useIsDesktop";

export default function Home() {
	const isDesktop: boolean = useIsDesktop();

	return (
		<>
			<HeroSection />
			{isDesktop && <Impact />}
			<News />
			{isDesktop && (
				<>
					<PWA /> 
					<Footer />
				</>
			)}
		</>
	);
}
