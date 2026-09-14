import { EnvelopeIcon } from "@heroicons/react/24/outline";

export function Contact() {
  return (
    <section className="mx-auto max-w-4xl scroll-mt-24 px-6 py-24 text-center" id="contact">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
        Get in touch
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Let&apos;s build something useful.
      </h2>
      <p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-400">
        Replace this copy with your availability, preferred projects, or a simple
        invitation to start a conversation.
      </p>
      <a
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-[background-color,transform] duration-150 hover:bg-zinc-200 active:scale-[0.96]"
        href="mailto:hello@example.com"
      >
        <EnvelopeIcon aria-hidden="true" className="size-4" strokeWidth={2} />
        hello@example.com
      </a>
    </section>
  );
}
