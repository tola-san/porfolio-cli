# 🚀 create-portfolio

**Generate a polished Next.js developer portfolio from your terminal in seconds.**

```bash
npx @tolalumina/create-portfolio@latest my-portfolio
```

## ✨ What You Get

* ⚡ **Modern stack** — Next.js App Router + TypeScript
* 🎨 **Beautiful & responsive** — Carefully designed desktop and mobile layouts
* 🧩 **Single config file** — Manage projects, skills, experience, biography, and social links in one place
* 🔒 **Privacy-first** — No personal information is hardcoded into the starter
* 📱 **Mobile-ready** — Responsive across phones, tablets, and desktops
* 🌙 **Clean design** — Professional UI out of the box
* 🚀 **Ready to deploy** — Generate, customize, and ship

Just edit:

```text
portfolio.config.ts
```

Replace the placeholder content with your own information and your portfolio is ready.

---

## 📦 CLI Usage

Create a new portfolio:

```bash
npx create-portfolio@latest my-portfolio
```

Or, if the CLI is installed locally:

```bash
create-portfolio <project-name>
```

Example:

```bash
npx @tolalumina/create-portfolio@latest x-portfolio
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
├── portfolio.config.ts     # Main portfolio configuration
├── package.json
├── tsconfig.json
└── ...
```

The main file you need to customize is:

```text
portfolio.config.ts
```

---

## 🧩 Portfolio Configuration

Your personal content lives in one configuration file.

Example:

```ts
export const portfolio = {
  name: "Your Name",
  role: "Full Stack Developer",

  bio: "I build modern web applications.",

  social: {
    github: "",
    linkedin: "",
    email: ""
  },

  skills: [
    "Next.js",
    "TypeScript",
    "React",
    "Node.js"
  ],

  projects: []
};
```

This keeps the UI components reusable and prevents personal information from being scattered throughout the project.

---

## 🛠 Tech Stack

The generated portfolio uses:

```text
Next.js
React
TypeScript
Tailwind CSS
Next.js App Router
```
