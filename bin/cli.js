#!/usr/bin/env node

import fs from "node:fs";
import { confirm, input } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";
import { parseArguments } from "../src/cli-options.js";
import { createProject, validateProjectName } from "../src/create-project.js";
import { installDependencies } from "../src/install-dependencies.js";

const packageJson = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

function printHelp() {
  console.log(`${chalk.bold("Portfolio Starter")}

Usage:
  create-portfolio [project-name] [options]

Options:
  --install          Install dependencies after creating the project
  --no-install       Skip dependency installation
  -h, --help         Show this help
  -v, --version      Show the version

Run without a project name to use the interactive setup.`);
}

async function promptForProjectName() {
  return input({
    message: "Project name",
    default: "my-portfolio",
    validate(value) {
      try {
        validateProjectName(value);
        return true;
      } catch (error) {
        return error.message;
      }
    },
  });
}

async function run() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log(packageJson.version);
    return;
  }

  const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
  const options = parseArguments(args);

  if (!options.projectName && !interactive) {
    throw new Error("Please provide a project name in a non-interactive terminal.");
  }

  const projectName = options.projectName ?? (await promptForProjectName());
  const shouldInstall =
    options.shouldInstall ??
    (!options.projectName &&
      (await confirm({
        message: "Install dependencies?",
        default: true,
      })));

  const createSpinner = ora(`Creating ${chalk.cyan(projectName)}`).start();
  let result;

  try {
    result = await createProject(projectName);
    createSpinner.succeed(`Created ${chalk.cyan(result.projectName)}`);
  } catch (error) {
    createSpinner.fail("Could not create the portfolio");
    throw error;
  }

  if (shouldInstall) {
    const installSpinner = ora("Installing dependencies").start();

    try {
      await installDependencies(result.targetDirectory);
      installSpinner.succeed("Dependencies installed");
    } catch (error) {
      installSpinner.fail("Could not install dependencies");
      throw new Error(
        `The project was created, but npm install failed. Run it manually in ${result.projectName}. ${error.shortMessage ?? error.message}`,
      );
    }
  }

  const installStep = shouldInstall ? "" : "\n  npm install";
  console.log(`
${chalk.green.bold("Portfolio ready!")}

Next steps:

  cd ${result.projectName}${installStep}
  npm run dev`);
}

run().catch((error) => {
  console.error(chalk.red(`Error: ${error.shortMessage ?? error.message}`));
  process.exitCode = 1;
});
