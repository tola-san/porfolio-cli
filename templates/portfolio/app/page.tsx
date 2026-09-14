import { About } from "../components/about";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";
import { Navbar } from "../components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen  bg-gradient-to-r from-[#291749] to-purple-800 text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
