# Contributing to maidr

Thank you for your interest in contributing to maidr project! We welcome contributions from everyone.

## Pre-requisites

To contribute to this project, you need to have the following installed on your local machine:

1. git .

1. node.js (version 16 or higher is recommended)

1. npm (version 9 or higher is recommended)

1. yarn

1. [Visual Studio Code (VS Code)](https://code.visualstudio.com/) (recommended)

## Getting Started

To get started, please follow these steps:

1. Fork the repository on GitHub.

1. Clone your forked repository to your local machine.

1. Open the project in VS Code.

1. Install all the recommended extensions.

1. Install `npm` if you don't have it already.

1. Install `yarn` if you don't have it already. You can install it by running the following command in your terminal:

```shell
npm install -g yarn
```

1. In the forked project root, install the dependencies by running the following command in your terminal:

```shell
yarn install
```

1. Make changes.

1. Run `yarn format` to format the code.

1. Run `yarn lint` to lint the code.

1. Run `yarn build` to build the project.

1. Run `yarn test` to run the tests.

1. Run `yarn docs` to generate the documentation.

1. Test the new features locally.

1. Commit your changes and push them to your forked repository.

1. Create a pull request to the main repository.

- Note: If you are using VS Code, you can run the above commands (e.g., `yarn format`, `yarn lint`, `yarn build`, `yarn test`, `yarn docs`) by pressing `Ctrl + Shift + B` (or `Cmd + Shift + B` on macOS) and selecting the command you want to run.

## Guidelines

Please follow these guidelines when contributing to the project:

- Use JavaScript (es6) for all code.
- Write clear and concise commit messages.
- Follow the code style and formatting guidelines.
- Write tests for new features and bug fixes.
- Update the documentation as needed in `CHANGELOG.md`.

## Code Style and Formatting

We use ESLint to enforce a consistent code style and formatting. Please run `yarn lint` before committing your changes to ensure that your code meets the standards.

## Tests

We use Jest for unit testing. Please run `yarn test` before committing your changes to ensure that your changes do not break any existing tests.

## Documentation

We use jsdoc for documentation. Please update the relevant documentation in js files when making changes to the project.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.
