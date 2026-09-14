import { portfolio } from "../portfolio.config";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Back to top">
          {portfolio.initials}
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a className="nav-contact" href={`mailto:${portfolio.email}`}>Let&apos;s talk</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="eyebrow"><span />{portfolio.availability}</div>
          <h1 id="hero-title">Building useful things<br /><em>with care.</em></h1>
          <div className="hero-footer">
            <p>{portfolio.introduction}</p>
            <span className="hero-role">{portfolio.role}<br />{portfolio.location}</span>
          </div>
        </section>

        <section className="work section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <span>Selected work</span>
            <h2 id="work-title">A few things I&apos;ve made.</h2>
          </div>
          <div className="project-grid">
            {portfolio.projects.map((project) => (
              <a className={`project-card project-card--${project.accent}`} href={project.href} key={project.title}>
                <span className="project-number">{project.number}</span>
                <div className="project-visual" aria-hidden="true"><span>{project.title[0]}</span></div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="tag-list" aria-label="Technologies">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <span className="project-arrow"><ArrowIcon /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="about section" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <span>About</span>
            <h2 id="about-title">Curious by nature.<br />Practical by choice.</h2>
          </div>
          <div className="about-content">
            <p>{portfolio.about}</p>
            <div>
              <span className="label">A few tools I use</span>
              <ul className="skills">{portfolio.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </div>
          </div>
          <ol className="experience">
            {portfolio.experience.map((item) => (
              <li className="experience-row" key={`${item.company}-${item.period}`}>
                <span>{item.period}</span><strong>{item.company}</strong><span>{item.role}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="contact section" aria-labelledby="contact-title">
          <span className="label">Have a project in mind?</span>
          <h2 id="contact-title">Let&apos;s make something<br /><em>worth using.</em></h2>
          <a className="contact-link" href={`mailto:${portfolio.email}`}>
            {portfolio.email} <ArrowIcon />
          </a>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} {portfolio.name}</span>
        <div>
          {portfolio.socialLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
