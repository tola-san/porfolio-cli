import fs from "node:fs";
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

export function createProject(
  projectName,
  { cwd = process.cwd(), templateDirectory = defaultTemplateDirectory } = {},
) {
  const validProjectName = validateProjectName(projectName);
  const targetDirectory = path.resolve(cwd, validProjectName);
  const stagingDirectory = path.resolve(
    cwd,
    `.${validProjectName}-${randomUUID()}.tmp`,
  );

  if (fs.existsSync(targetDirectory)) {
    throw new Error(`Directory "${validProjectName}" already exists.`);
  }

  if (!fs.existsSync(templateDirectory)) {
    throw new Error("Portfolio template could not be found.");
  }

  try {
    fs.cpSync(templateDirectory, stagingDirectory, {
      recursive: true,
      errorOnExist: true,
      force: false,
      filter(source) {
        const name = path.basename(source);
        return ![
          ".git",
          ".next",
          "node_modules",
          "dist",
          "build",
          ".env.local",
        ].includes(name);
      },
    });

    const generatedPackagePath = path.join(stagingDirectory, "package.json");
    const generatedPackage = JSON.parse(
      fs.readFileSync(generatedPackagePath, "utf8"),
    );
    generatedPackage.name = validProjectName;
    fs.writeFileSync(
      generatedPackagePath,
      `${JSON.stringify(generatedPackage, null, 2)}\n`,
    );

    fs.renameSync(stagingDirectory, targetDirectory);
  } catch (error) {
    if (fs.existsSync(stagingDirectory)) {
      fs.rmSync(stagingDirectory, { recursive: true, force: true });
    }
    if (fs.existsSync(targetDirectory)) {
      throw new Error(`Directory "${validProjectName}" already exists.`);
    }
    throw new Error(`Could not create the portfolio: ${error.message}`);
  }

  return { projectName: validProjectName, targetDirectory };
}
