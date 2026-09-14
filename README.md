# create-portfolio

Generate a polished Next.js developer portfolio from your terminal.

```bash
npx create-portfolio@latest my-portfolio
```

Then start the generated site:

```bash
cd my-portfolio
npm install
npm run dev
```

## What you get

- A responsive Next.js App Router portfolio written in TypeScript
- Projects, skills, experience, biography, and social links in one configuration file
- Carefully styled desktop and mobile layouts
- No personal information hardcoded into the starter

Customize `portfolio.config.ts` inside the generated project, then replace the placeholder links and copy with your own.

## CLI usage

```text
create-portfolio <project-name>

Options:
  -h, --help       Show help
  -v, --version    Show the version
```

Project names use lowercase letters, numbers, hyphens, underscores, or dots. The command refuses to overwrite an existing directory.

## Local development

```bash
npm test
npm link
create-portfolio test-portfolio
```

Node.js 20.9 or newer is required.
