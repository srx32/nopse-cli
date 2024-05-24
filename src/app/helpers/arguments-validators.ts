import chalk from "chalk";

function checkNameFormat(value: string, previous: any) {
  const packageJsonNameRegexp =
    /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/g;

  if (packageJsonNameRegexp.test(value)) {
    return value;
  }

  console.log(chalk.red.bold("\nError : Incorrect format for projectName!"));

  console.log(
    "\nPlease, only 2 main formats",
    chalk.yellow.bold("(lowercase only)"),
    "are supported for the project name: "
  );
  console.log(
    `${chalk.yellow.bold("1/")}
      - Starting with "@" followed by an alphanumeric string with optional hyphens, tildes, asterisks, and underscores (zero or more repetitions), 
      - then a slash ("/"), 
      - and finally another alphanumeric string with optional hyphens, dots, and tildes (zero or more repetitions)`
  );
  console.log(
    `${chalk.yellow.bold("2/")}
      - Starting with an alphanumeric character with optional hyphens and tildes (zero or more repetitions), 
      - followed by zero or more repetitions of alphanumeric characters, hyphens, dots, and tildes`
  );

  process.exit(1);
}

function isJSorTS(value: string, previous: any) {
  if (value.toLowerCase() !== "js" && value.toLowerCase() !== "ts") {
    console.log(
      chalk.red(
        "Unknown programming language: " +
          value +
          ".\nValues must be 'js' or 'ts'"
      )
    );

    process.exit(1);
  }

  return value;
}

export { checkNameFormat, isJSorTS };
