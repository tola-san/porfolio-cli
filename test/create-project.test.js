import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parseArguments } from "../src/cli-options.js";
import { createProject, validateProjectName } from "../src/create-project.js";
import { installDependencies } from "../src/install-dependencies.js";

test("validates project names", () => {
  assert.equal(validateProjectName("my-portfolio"), "my-portfolio");
  assert.throws(() => validateProjectName(""), /required/u);
  assert.throws(() => validateProjectName("../portfolio"), /lowercase/u);
  assert.throws(() => validateProjectName("MyPortfolio"), /lowercase/u);
  assert.throws(() => validateProjectName("con"), /not supported/u);
  assert.throws(() => validateProjectName(" hidden "), /whitespace/u);
});

test("copies a complete Next.js portfolio and sets its package name", async (context) => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-cli-"));
  context.after(() => fs.rmSync(temporaryDirectory, { recursive: true, force: true }));

  const result = await createProject("sample-portfolio", { cwd: temporaryDirectory });
  const generatedPackage = JSON.parse(
    fs.readFileSync(path.join(result.targetDirectory, "package.json"), "utf8"),
  );
  const generatedPackageLock = JSON.parse(
    fs.readFileSync(path.join(result.targetDirectory, "package-lock.json"), "utf8"),
  );

  assert.equal(result.projectName, "sample-portfolio");
  assert.equal(generatedPackage.name, "sample-portfolio");
  assert.equal(generatedPackageLock.name, "sample-portfolio");
  assert.equal(generatedPackageLock.packages[""].name, "sample-portfolio");
  assert.ok(generatedPackage.dependencies.next);
  assert.ok(generatedPackage.dependencies["@heroicons/react"]);
  assert.ok(generatedPackage.devDependencies.tailwindcss);
  assert.ok(generatedPackage.devDependencies["@tailwindcss/postcss"]);
  assert.ok(fs.existsSync(path.join(result.targetDirectory, "app", "page.tsx")));
  assert.ok(fs.existsSync(path.join(result.targetDirectory, "postcss.config.mjs")));
  assert.equal(fs.existsSync(path.join(result.targetDirectory, "portfolio.config.ts")), false);
  assert.ok(fs.existsSync(path.join(result.targetDirectory, "components", "hero.tsx")));
  assert.ok(fs.existsSync(path.join(result.targetDirectory, "components", "projects.tsx")));
  assert.equal(
    fs.readFileSync(path.join(result.targetDirectory, "app", "globals.css"), "utf8").trim(),
    '@import "tailwindcss";',
  );
  assert.match(
    fs.readFileSync(path.join(result.targetDirectory, "app", "page.tsx"), "utf8"),
    /className=/u,
  );
});

test("does not modify an existing destination", async (context) => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-cli-"));
  context.after(() => fs.rmSync(temporaryDirectory, { recursive: true, force: true }));

  const targetDirectory = path.join(temporaryDirectory, "existing");
  fs.mkdirSync(targetDirectory);
  fs.writeFileSync(path.join(targetDirectory, "keep.txt"), "untouched");

  await assert.rejects(
    createProject("existing", { cwd: temporaryDirectory }),
    /already exists/u,
  );
  assert.equal(fs.readFileSync(path.join(targetDirectory, "keep.txt"), "utf8"), "untouched");
  assert.deepEqual(fs.readdirSync(targetDirectory), ["keep.txt"]);
});

test("runs npm install in the generated project", async () => {
  const calls = [];
  const targetDirectory = path.join("example", "portfolio");

  await installDependencies(targetDirectory, {
    run: async (...args) => calls.push(args),
  });

  assert.deepEqual(calls, [
    ["npm", ["install"], { cwd: targetDirectory }],
  ]);
});

test("parses project and dependency-install options", () => {
  assert.deepEqual(parseArguments(["sample", "--install"]), {
    projectName: "sample",
    shouldInstall: true,
  });
  assert.deepEqual(parseArguments(["--no-install"]), {
    projectName: undefined,
    shouldInstall: false,
  });
  assert.throws(() => parseArguments(["one", "two"]), /only one/u);
  assert.throws(() => parseArguments(["--unknown"]), /Unknown option/u);
});

test("excludes dependencies, build output, Git data, and private environment files", async (context) => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-cli-"));
  context.after(() => fs.rmSync(temporaryDirectory, { recursive: true, force: true }));

  const templateDirectory = path.join(temporaryDirectory, "template");
  fs.mkdirSync(path.join(templateDirectory, "node_modules"), { recursive: true });
  fs.mkdirSync(path.join(templateDirectory, ".next"));
  fs.mkdirSync(path.join(templateDirectory, ".git"));
  fs.writeFileSync(path.join(templateDirectory, "package.json"), '{"name":"template"}');
  fs.writeFileSync(path.join(templateDirectory, ".env"), "SECRET=value");
  fs.writeFileSync(path.join(templateDirectory, ".env.local"), "SECRET=value");
  fs.writeFileSync(path.join(templateDirectory, ".env.example"), "SECRET=");

  const result = await createProject("safe-copy", {
    cwd: temporaryDirectory,
    templateDirectory,
  });

  assert.equal(fs.existsSync(path.join(result.targetDirectory, "node_modules")), false);
  assert.equal(fs.existsSync(path.join(result.targetDirectory, ".next")), false);
  assert.equal(fs.existsSync(path.join(result.targetDirectory, ".git")), false);
  assert.equal(fs.existsSync(path.join(result.targetDirectory, ".env")), false);
  assert.equal(fs.existsSync(path.join(result.targetDirectory, ".env.local")), false);
  assert.equal(fs.existsSync(path.join(result.targetDirectory, ".env.example")), true);
});
