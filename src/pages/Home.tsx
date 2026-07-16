import AppPreview from "../components/AppPreview";
import Features from "../components/Features";
import Hero from "../components/Hero";

export default function Home() {
  return <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white">
    <Hero />
    <Features />
    <AppPreview />
  </section>;

}