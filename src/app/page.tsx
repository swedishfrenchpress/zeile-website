import dynamic from "next/dynamic";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { siteConfig } from "@/lib/config";

const FeatureHighlight = dynamic(() =>
  import("@/components/sections/feature-highlight").then(
    (m) => m.FeatureHighlight
  )
);
const Pairing = dynamic(() =>
  import("@/components/sections/pairing").then((m) => m.Pairing)
);
const MadeForTwo = dynamic(() =>
  import("@/components/sections/made-for-two").then((m) => m.MadeForTwo)
);
const FinalCta = dynamic(() =>
  import("@/components/sections/final-cta").then((m) => m.FinalCta)
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
          className="pt-[var(--section-y-tight)] pb-0"
        />
        <Pairing />
        <MadeForTwo />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
