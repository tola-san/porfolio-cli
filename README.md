# create-portfolio

Create a clean, responsive developer portfolio with Next.js, TypeScript, Tailwind CSS, and Heroicons.

## Quick start

Run the interactive setup:

```bash
npx @tolalumina/create-portfolio@latest
```

You will be asked for a project name and whether dependencies should be installed.

To create a project directly:

```bash
npx @tolalumina/create-portfolio@latest my-portfolio
```

Then start the development server:

```bash
cd my-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## CLI usage

```text
create-portfolio [project-name] [options]
```

| Option | Description |
| --- | --- |
| `--install` | Install project dependencies after generation |
| `--no-install` | Skip dependency installation |
| `-h`, `--help` | Show CLI help |
| `-v`, `--version` | Show the installed CLI version |

Examples:

```bash
# Interactive setup
npx @tolalumina/create-portfolio@latest

# Create without installing dependencies
npx @tolalumina/create-portfolio@latest my-portfolio

# Create and install dependencies
npx @tolalumina/create-portfolio@latest my-portfolio --install
```

During generation, the CLI displays progress for project creation and dependency installation. It never overwrites an existing destination.

## Generated project

```text
my-portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── about.tsx
│   ├── contact.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   └── projects.tsx
├── public/
│   ├── icons/
│   └── favicon.svg
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

The starter uses regular React components instead of a central portfolio configuration file. Edit the component responsible for each section to replace its placeholder content.

## Included stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Heroicons

## How the generator works

The CLI validates the project name, copies the starter through a temporary staging directory, updates the generated package name, and moves the completed project into place. It excludes dependencies, Git data, build output, and private environment files from the copy.

The CLI itself uses:

- `@inquirer/prompts` for interactive questions
- `ora` for progress indicators
- `chalk` for terminal output
- `fs-extra` for filesystem operations
- `execa` for optional dependency installation

## Development

Clone the repository and install its dependencies:

```bash
npm install
```

Run the test suite:

```bash
npm test
```

Run the CLI locally:

```bash
node bin/cli.js my-portfolio
```

To test dependency installation too:

```bash
node bin/cli.js my-portfolio --install
```

## Publishing to npm

The package is configured as the public scoped package `@tolalumina/create-portfolio`. You must own or have publishing access to the `@tolalumina` npm scope.

Authenticate and confirm the active npm account:

```bash
npm login
npm whoami
```

Review the files that will be published:

```bash
npm pack --dry-run
```

Choose the appropriate semantic version change:

```bash
npm version patch
```

Publish publicly:

```bash
npm run publish:public
```

The `publishConfig` metadata also sets npm registry access to `public`, and the `prepublishOnly` hook runs the test suite before a release is published.

## License

MIT
