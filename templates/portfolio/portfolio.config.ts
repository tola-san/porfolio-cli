export const portfolio = {
  name: "Your Name",
  initials: "YN",
  role: "Full Stack Developer",
  location: "Based anywhere · Available worldwide",
  introduction:
    "I design and build thoughtful digital products with clean code, clear interfaces, and a focus on the people using them.",
  about:
    "I work where design and engineering meet—turning early ideas into durable products. I care about the details, but always keep the larger purpose in view.",
  email: "hello@example.com",
  availability: "Available for select projects",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/yourname" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourname" },
  ],
  skills: ["TypeScript", "React", "Next.js", "Node.js", "Product design"],
  projects: [
    {
      number: "01",
      title: "Signal",
      summary:
        "An analytics workspace that turns complex product data into decisions teams can act on.",
      tags: ["Product", "Engineering", "Data"],
      href: "#",
      accent: "violet",
    },
    {
      number: "02",
      title: "Morrow",
      summary:
        "A calm planning tool for independent teams that keeps priorities visible and work moving.",
      tags: ["Web app", "Design system"],
      href: "#",
      accent: "lime",
    },
    {
      number: "03",
      title: "Common Ground",
      summary:
        "A community platform connecting local makers with spaces, resources, and one another.",
      tags: ["Platform", "Accessibility"],
      href: "#",
      accent: "coral",
    },
  ],
  experience: [
    { period: "2023 — Now", company: "Independent", role: "Product Engineer" },
    { period: "2020 — 2023", company: "Studio Name", role: "Senior Developer" },
    { period: "2018 — 2020", company: "Company Name", role: "Frontend Developer" },
  ],
} as const;
