# 🚀 create-portfolio

**Generate a polished Next.js developer portfolio from your terminal in seconds.**

## ✨ What You Get

* ⚡ **Modern stack** — Next.js App Router + TypeScript
* 🌬️ **Tailwind CSS** — Utility-first styling is configured and ready to use
* 🦸 **Heroicons** — Accessible React icons ready for buttons and links
* 🎨 **Beautiful & responsive** — Carefully designed desktop and mobile layouts
* 🧩 **Component-based** — Familiar React components that are easy to edit and extend
* 🔒 **Privacy-first** — No personal information is hardcoded into the starter
* 📱 **Mobile-ready** — Responsive across phones, tablets, and desktops
* 🌙 **Clean design** — Professional UI out of the box
* 🚀 **Ready to deploy** — Generate, customize, and ship

Start with:

```text
components/
```

Replace the placeholder content in each section and your portfolio is ready.

---

## 📦 CLI Usage

Create a new portfolio:

```bash
npx @tolalumina/create-portfolio@latest my-portfolio
```

Or launch the interactive setup:

```bash
npx @tolalumina/create-portfolio@latest
```

The interactive setup asks for a project name and whether dependencies should be installed.

Or, if the CLI is installed locally:

```bash
create-portfolio <project-name>
```

Example:

```bash
npx @tolalumina/create-portfolio@latest x-portfolio
```

Install dependencies automatically in non-interactive usage:

```bash
create-portfolio my-portfolio --install
```

Then:

```bash
cd x-portfolio
npm install
npm run dev
```

---

## 📁 Generated Project Structure

After generation:

```text
my-portfolio/
├── app/                    # Next.js App Router
├── components/             # Reusable UI components
├── public/                 # Images, icons, and static assets
├── package.json
├── tsconfig.json
└── ...
```

The page is assembled from small components:

```text
components/
├── navbar.tsx
├── hero.tsx
├── projects.tsx
├── about.tsx
├── contact.tsx
└── footer.tsx
```

---

## 🛠 Tech Stack

The generated portfolio uses:

```text
Next.js
React
TypeScript
Tailwind CSS
Heroicons
Next.js App Router
```
