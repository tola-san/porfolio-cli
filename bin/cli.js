#!/usr/bin/env node

import fs from "node:fs";
import { createProject } from "../src/create-project.js";

const packageJson = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

const args = process.argv.slice(2);

function printHelp() {
  console.log(`Portfolio Starter

Usage:
  create-portfolio <project-name>

Options:
  -h, --help       Show this help
  -v, --version    Show the version`);
}

if (args.includes("--help") || args.includes("-h")) {
  printHelp();
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  console.log(packageJson.version);
  process.exit(0);
}

if (args.length !== 1) {
  console.error("Error: Please provide exactly one project name.\n");
  printHelp();
  process.exit(1);
}

try {
  const result = createProject(args[0]);

  console.log(`Portfolio Starter

Creating portfolio: ${result.projectName}

✔ Portfolio created

Next steps:

  cd ${result.projectName}
  npm install
  npm run dev`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
