
export function parseArguments(args) {
  const projectNames = [];
  let shouldInstall;

  for (const argument of args) {
    if (argument === "--install") {
      shouldInstall = true;
    } else if (argument === "--no-install") {
      shouldInstall = false;
    } else if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    } else {
      projectNames.push(argument);
    }
  }

  if (projectNames.length > 1) {
    throw new Error("Please provide only one project name.");
  }

  return { projectName: projectNames[0], shouldInstall };
}
