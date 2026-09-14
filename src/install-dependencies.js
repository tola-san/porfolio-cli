import { execa } from "execa";

export async function installDependencies(targetDirectory, { run = execa } = {}) {
  await run("npm", ["install"], {
    cwd: targetDirectory,
  });
}
