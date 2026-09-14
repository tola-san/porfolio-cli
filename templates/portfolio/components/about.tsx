const skills = ["TypeScript", "React", "Next.js", "Node.js", "SQL", "Git"];

export function About() {
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24" id="about">
      <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
            About
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A little about me
          </h2>
        </div>
        <div>
          <p className="leading-8 text-zinc-400">
            Write a brief biography here. Share how you approach your work, what
            you care about, and what makes your perspective useful to a team.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Skills">
            {skills.map((skill) => (
              <li className="rounded-full border border-white/10 px-3 py-1.5 text-sm" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
