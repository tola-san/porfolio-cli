import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const projects = [
  {
    title: "Project One",
    description: "Describe the problem, your solution, and the result in one or two sentences.",
    href: "#",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    title: "Project Two",
    description: "Use this card for another product, experiment, or open-source contribution.",
    href: "#",
    tags: ["React", "Node.js", "Tailwind CSS"],
  },
  {
    title: "Project Three",
    description: "Add a concise explanation that helps visitors understand why this work matters.",
    href: "#",
    tags: ["API", "Testing", "Deployment"],
  },
];

export function Projects() {
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24" id="work">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
        Selected work
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects I am proud of
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <article
            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-[border-color,background-color,transform] duration-150 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            key={project.title}
          >
            <div className="mb-8 aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/25 via-fuchsia-500/10 to-transparent" />
            <h3>
              <a
                className="flex items-center justify-between gap-4 text-xl font-semibold outline-none transition-colors duration-150 hover:text-violet-300 focus-visible:text-violet-300"
                href={project.href}
              >
                {project.title}
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </h3>
            <p className="mt-3 leading-7 text-zinc-400">{project.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-zinc-300" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
