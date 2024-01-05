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

1. Install all the recommended VSCode extensions.

1. Install `npm` if you don't have it already.

1. Install `yarn` if you don't have it already. You can install it by running the following command in your terminal:

```shell
npm install -g yarn
```

1. In the forked project root, install the dependencies by running the following command in your terminal:

```shell
yarn install
```

1. Run `npx husky install` to activate the Git hooks for commit message verification.

1. Make changes.

1. Run `yarn format` to format the code.

1. Run `yarn lint` to lint the code.

1. Run `yarn build` to build the project.

1. Run `yarn test` to run the tests.

1. Run `yarn docs` to generate the documentation.

1. Test the new features locally.

1. Commit your changes and push them to your forked repository (please read [Committing Your Changes](#committing-your-changes) section to learn more about the conventional commits).

1. Create a pull request to the main repository.

- Note: If you are using VS Code, you can run the above commands (e.g., `yarn format`, `yarn lint`, `yarn build`, `yarn test`, `yarn docs`) by pressing `Ctrl + Shift + B` (or `Cmd + Shift + B` on macOS) and selecting the command you want to run.

## Guidelines

Please follow these guidelines when contributing to the project:

- Use JavaScript (es6) for all code.
- Write clear and concise commit messages.
- Follow the code style and formatting guidelines.
- Write tests for new features and bug fixes.

### Code Style and Formatting

We use ESLint to enforce a consistent code style and formatting. Please run `yarn lint` before committing your changes to ensure that your code meets the standards.

### Tests

We use Jest for unit testing. Please run `yarn test` before committing your changes to ensure that your changes do not break any existing tests.

### Documentation

We use jsdoc for documentation. Please update the relevant documentation in js files when making changes to the project.

### Committing Your Changes

We use [conventional commits](https://www.conventionalcommits.org/) to maintain a clear and consistent commit history. Here's how to write a conventional commit message:

#### Format

Each commit message should follow this format: `<type>[optional scope]: <description>`

- **Types**: Describes the type of change you're making. Common types include:
  - `feat`: Introduces a new feature.
  - `fix`: Fixes a bug.
  - `docs`: Documentation changes.
  - `style`: Code style changes (formatting, missing semi-colons, etc. – does not affect code logic).
  - `refactor`: Code changes that neither fixes a bug nor adds a feature.
  - `perf`: Performance improvements.
  - `test`: Adding or correcting tests.
  - `chore`: Routine tasks, maintenance, and other non-production changes.
  - `ci`: Changes to our CI configuration files and scripts, specifically for GitHub Actions.
- **Scope**: (Optional) A word or two describing where the change happens, like `login`, `signup`, etc.
- **Description**: A succinct description of the change in lowercase.

#### Denoting a Breaking Change

To denote a breaking change, include an exclamation mark `!` before the colon.
  - Example: `feat(database)!: remove deprecated methods`

#### Mentioning Issue Numbers

If your commit addresses a specific issue, mention the issue number at the end of the commit message.
  - Example: `fix(file-upload): correct MIME type handling, closes #123`

#### Examples

- `feat(authentication): add JWT token support`
- `fix(api): resolve data retrieval issue`
- `docs(readme): update installation instructions`
- `style(header): adjust layout spacing`
- `refactor(user-profile): streamline user data processing`
- `perf(image-loading): optimize image caching`
- `chore(dependencies): update lodash to 4.17.21`
- `test(login): add additional unit tests for password reset`
- `ci(github-actions): update build and deployment workflow`

#### Commit Message Linting

When you commit your changes, Husky and Commitlint will automatically check your commit messages. If your message does not meet the conventional commit format, the commit will be rejected, and you'll need to modify the message.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.
