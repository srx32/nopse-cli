# What is it ?

This is a npx command-line tool (Node CLI) that helps me set up my NodeJS projects.

It contains differents templates for different cases (JS, TS, with or without Express).

<!-- I used TS to build it for the strict typing -->

# How to use (basic set up / quick start / quick use)

You can use npx, install the npm package or clone the repo and try it locally on your machine.

## npx (simplest - no need to install)

1. Open your terminal
2. Navigate to the folder where you want to set up your Node project
3. Run the following command

```sh
npx @srx32/nps create projectName
```

## Install npm package (or npx)

1. Open your terminal
2. Run the following command

```sh
   npm install @srx32/nps -g
```

It will install the package globally.

3. Now, navigate to the diretory where you want to set up your Node project
4. Run the following command

```sh
@srx32/nps create projectName
```

## Try locally

1. Clone the repo
2. Open it in your code editor
3. Use the terminal of your code editor or open the system terminal and navigate to the folder of the project
4. Install the required packages by running

```sh
npm install
```

5. Then build the project (transpile the TS code to JS) with

```sh
npm run build
```

It will generate a **dist** folder which will hold the JS version of the code

6. And now, run the program with

```sh
npx . create projectName
```

# Advanced set up (the different commands and options)

# What are the ingredients ?

I have used some libraries to help me build this CLI effectively. These packages are :

- [**commander**](https://www.npmjs.com/package/commander)
- [**chalk**](https://www.npmjs.com/package/chalk)

## commander

It is a package for creating and handling CLI commands, options and more.

## chalk

It is a package for logging colored messages in the terminal, even with some styling (bold, italic, etc.).

# How are the commands and options structured ?

# Some tutorials & references

These are some tutorials and resources that helped me build this app :

[Tutorial 1 (JS, commander, chalk, etc.)](https://blog.logrocket.com/creating-a-cli-tool-with-node-js/)

[Tutorial 2 (TS, commander, chalk, figlet, etc.)](https://blog.logrocket.com/building-typescript-cli-node-js-commander/)
