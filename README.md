# What is it ?

This is a npx command-line tool (CLI) that helps me set up my NodeJS projects.
It contains differents templates for different cases (JS, TS, with or without Express).
I used TS to build it for the strict typing

# How to use (the commands & options | npm package or local)

You can use npx, install the npm package or clone the repo and try it locally on your machine.

## npx (simplest - no need to install)

1. Open your terminal
2. Navigate to the folder where you want to set up your Node project
3. Run the following command _npx @srx32/nps create projectName_

## Install npm package (or npx)

1. Open your terminal
2. Run the following command

   > _npm install @srx32/nps -g_

   It will install the package globally.

3. Now, navigate to the diretory where you want to set up your Node project
4. 3. Run the following command

```sh
npx @srx32/nps create projectName
```

## Try locally

1. Clone the repo
2. Open it in your code editor
3. Use the terminal of your code editor or open the system terminal and navigate to the folder of the project
4. Run _npm install_ to install the packages
5. Then ... build and ... or

# What are the ingredients ?

I have used some libraries to help me build this CLI effectively

- commander
- chalk

## commander

It is a package for creating and handling CLI commands, options and arguments

## chalk

It is a package for logging colourized messages in the terminal, even with some styling (bold, italic, etc.)

# How are the commands and options structured ?

# Some tutorials & references
