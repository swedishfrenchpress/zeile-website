import dynamic from "next/dynamic";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { siteConfig } from "@/lib/config";

const FeatureHighlight = dynamic(() =>
  import("@/components/sections/feature-highlight").then((m) => m.FeatureHighlight)
);
const TapToPay = dynamic(() =>
  import("@/components/sections/tap-to-pay").then((m) => m.TapToPay)
);
const BentoGrid = dynamic(() =>
  import("@/components/sections/bento").then((m) => m.BentoGrid)
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureHighlight
          id="features"
          feature={siteConfig.featureHighlight[0]}
          layoutIndex={0}
          className="pt-[var(--section-y-wide)] pb-0"
        />
        <TapToPay />
        <FeatureHighlight
          id="feature-2"
          feature={siteConfig.featureHighlight[1]}
          layoutIndex={1}
          className="pt-0 pb-0"
        />
        <BentoGrid />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
