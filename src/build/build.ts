import chalk from "chalk";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * Method for creating 'package.json' for 'dist' folder
 * It works by copying content of project's package.json and modifying it to work with the js code in dist folder
 */
(async () => {
  try {
    console.log(chalk.yellow("Creating 'package.json' for 'dist' folder..."));

    const packageJsonPath = path.join(__dirname, "..", "..", "package.json");
    const packageJsonText = await fs.readFile(packageJsonPath, {
      encoding: "utf8",
    });

    const packageJsonObject = JSON.parse(packageJsonText);

    packageJsonObject.main = "app/index.js";
    packageJsonObject.bin.nopse = "app/index.js";
    packageJsonObject.scripts = {
      start: "node app/index.js",
      test: 'echo "Error: no test specified" && exit 1',
      serve: "npx .",
    };
    packageJsonObject.devDependencies = {};

    const packageJsonTextUpdated = JSON.stringify(packageJsonObject, null, 2);

    const distPackageJsonPath = path.join(
      __dirname,
      "..",
      "..",
      "dist",
      "package.json"
    );
    await fs.writeFile(distPackageJsonPath, packageJsonTextUpdated);

    console.log(chalk.green.bold("'package.json' successfully created!"));
  } catch (error) {
    console.error(error);
  }
})();
