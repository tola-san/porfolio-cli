import fs from "fs-extra";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultTemplateDirectory = path.resolve(
  currentDirectory,
  "../templates/portfolio",
);

const invalidWindowsNames = new Set([
  "con",
  "prn",
  "aux",
  "nul",
  ...Array.from({ length: 9 }, (_, index) => `com${index + 1}`),
  ...Array.from({ length: 9 }, (_, index) => `lpt${index + 1}`),
]);

const excludedDirectories = new Set([
  ".git",
  ".next",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "node_modules",
]);

function shouldCopy(source) {
  const name = path.basename(source);

  if (excludedDirectories.has(name)) {
    return false;
  }

  return name === ".env.example" || (name !== ".env" && !name.startsWith(".env."));
}

async function updatePackageName(filePath, projectName) {
  if (!(await fs.pathExists(filePath))) {
    return;
  }

  const packageData = await fs.readJson(filePath);
  packageData.name = projectName;

  if (packageData.packages?.[""]?.name) {
    packageData.packages[""].name = projectName;
  }

  await fs.writeJson(filePath, packageData, { spaces: 2, EOL: "\n" });
}
// Validate the generated portfolio project name.
export function validateProjectName(projectName) {
  if (typeof projectName !== "string" || projectName.trim() === "") {
    throw new Error("Project name is required.");
  }

  if (projectName !== projectName.trim()) {
    throw new Error("Project name cannot begin or end with whitespace.");
  }

  if (
    projectName.length > 214 ||
    projectName === "." ||
    projectName === ".." ||
    projectName.startsWith(".") ||
    !/^[a-z0-9][a-z0-9._-]*$/u.test(projectName)
  ) {
    throw new Error(
      "Project name must use lowercase letters, numbers, hyphens, underscores, or dots.",
    );
  }

  const windowsBaseName = projectName.split(".")[0].toLowerCase();
  if (invalidWindowsNames.has(windowsBaseName) || /[. ]$/u.test(projectName)) {
    throw new Error(`Project name "${projectName}" is not supported.`);
  }

  return projectName;
}

export async function createProject(
  projectName,
  { cwd = process.cwd(), templateDirectory = defaultTemplateDirectory } = {},
) {
  const validProjectName = validateProjectName(projectName);
  const targetDirectory = path.resolve(cwd, validProjectName);
  const stagingDirectory = path.resolve(
    cwd,
    `.${validProjectName}-${randomUUID()}.tmp`,
  );

  if (await fs.pathExists(targetDirectory)) {
    throw new Error(`Directory "${validProjectName}" already exists.`);
  }

  if (!(await fs.pathExists(templateDirectory))) {
    throw new Error("Portfolio template could not be found.");
  }

  try {
    await fs.copy(templateDirectory, stagingDirectory, {
      errorOnExist: true,
      overwrite: false,
      filter: shouldCopy,
    });

    const generatedPackagePath = path.join(stagingDirectory, "package.json");
    await updatePackageName(generatedPackagePath, validProjectName);
    await updatePackageName(
      path.join(stagingDirectory, "package-lock.json"),
      validProjectName,
    );

    await fs.move(stagingDirectory, targetDirectory, { overwrite: false });
  } catch (error) {
    if (await fs.pathExists(stagingDirectory)) {
      await fs.remove(stagingDirectory);
    }
    if (await fs.pathExists(targetDirectory)) {
      throw new Error(`Directory "${validProjectName}" already exists.`);
    }
    throw new Error(`Could not create the portfolio: ${error.message}`);
  }

  return { projectName: validProjectName, targetDirectory };
}
