import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createProject, validateProjectName } from "../src/create-project.js";

test("validates project names", () => {
  assert.equal(validateProjectName("my-portfolio"), "my-portfolio");
  assert.throws(() => validateProjectName(""), /required/u);
  assert.throws(() => validateProjectName("../portfolio"), /lowercase/u);
  assert.throws(() => validateProjectName("MyPortfolio"), /lowercase/u);
  assert.throws(() => validateProjectName("con"), /not supported/u);
  assert.throws(() => validateProjectName(" hidden "), /whitespace/u);
});

test("copies a complete Next.js portfolio and sets its package name", (context) => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-cli-"));
  context.after(() => fs.rmSync(temporaryDirectory, { recursive: true, force: true }));

  const result = createProject("sample-portfolio", { cwd: temporaryDirectory });
  const generatedPackage = JSON.parse(
    fs.readFileSync(path.join(result.targetDirectory, "package.json"), "utf8"),
  );

  assert.equal(result.projectName, "sample-portfolio");
  assert.equal(generatedPackage.name, "sample-portfolio");
  assert.ok(generatedPackage.dependencies.next);
  assert.ok(fs.existsSync(path.join(result.targetDirectory, "app", "page.tsx")));
  assert.ok(fs.existsSync(path.join(result.targetDirectory, "portfolio.config.ts")));
});

test("does not modify an existing destination", (context) => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-cli-"));
  context.after(() => fs.rmSync(temporaryDirectory, { recursive: true, force: true }));

  const targetDirectory = path.join(temporaryDirectory, "existing");
  fs.mkdirSync(targetDirectory);
  fs.writeFileSync(path.join(targetDirectory, "keep.txt"), "untouched");

  assert.throws(
    () => createProject("existing", { cwd: temporaryDirectory }),
    /already exists/u,
  );
  assert.equal(fs.readFileSync(path.join(targetDirectory, "keep.txt"), "utf8"), "untouched");
  assert.deepEqual(fs.readdirSync(targetDirectory), ["keep.txt"]);
});
