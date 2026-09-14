import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export function Hero() {
  return (
    <section
      className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl place-items-center px-6 py-24"
      id="top"
    >
      <div className="max-w-3xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
          Full-stack developer
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
          I build thoughtful products for the web.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-zinc-400">
          A short introduction about who you are, what you build, and the kind of
          work you are looking for.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-[background-color,transform] duration-150 hover:bg-violet-400 active:scale-[0.96]"
            href="#work"
          >
            View my work
            <ArrowRightIcon aria-hidden="true" className="size-4" strokeWidth={2} />
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-[border-color,background-color,transform] duration-150 hover:border-white/30 hover:bg-white/5 active:scale-[0.96]"
            href="#contact"
          >
            <EnvelopeIcon aria-hidden="true" className="size-4" strokeWidth={2} />
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
}
