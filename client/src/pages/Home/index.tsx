import HeroSection from "./sections/HeroSection";
import Impact from "./sections/Impact";
import News from "./sections/News";
import PWA from "./sections/PWA";
import Footer from "./sections/Footer";

import { useIsDesktop } from "../../utils/useIsDesktop";

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
