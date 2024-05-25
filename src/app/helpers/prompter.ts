import prompts from "prompts";

async function promptUser() {
  const questions: prompts.PromptObject<string>[] = [
    {
      type: "text",
      name: "name",
      message: "Name of the project : ",
    },
    {
      type: "select",
      name: "language",
      message: "Choose the language : ",
      choices: [
        {
          title: "JS",
          description: "Configure the project for JavaScript",
          value: "js",
        },
        {
          title: "TS",
          description: "Configure the project for TypeScript",
          value: "ts",
        },
      ],
    },
    {
      type: "toggle",
      name: "express",
      message: "Add expres package to the project ?",
      inactive: "no",
      active: "yes",
    },
    {
      type: "toggle",
      name: "gitInit",
      message: "Initialize git repository ?",
      inactive: "no",
      active: "yes",
    },
  ];

  const response = await prompts(questions, {
    onCancel: () => process.exit(0),
  });

  console.log(response);

  return response;
}

export default promptUser;
