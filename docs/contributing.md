---
id: contributing
title: Contributing
sidebar_label: Contributing
sidebar_position: 8
---

## Overview

Zustand Q is an open-source project, and we warmly welcome contributions from the community! Whether you’re fixing a bug, adding a feature, improving documentation, or suggesting ideas, your help makes `zustand-q` better for everyone. This guide outlines the steps to contribute and the guidelines to ensure a smooth collaboration process.

## How to Contribute

Follow these steps to contribute to Zustand Q:

1. **Fork the Repository**:

   - Visit the [GitHub repository](https://github.com/ngnhutrung25/zustand-q).
   - Click the "Fork" button to create a copy of the repo under your GitHub account.

2. **Clone Your Fork**:

   - Clone the forked repository to your local machine:
     ```bash
     git clone https://github.com/your-username/zustand-q.git
     ```
   - Replace `your-username` with your GitHub username.

3. **Set Up the Project**:

   - Navigate to the project folder:
     ```bash
     cd zustand-q
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Verify the setup by running the build script:
     ```bash
     npm run build
     ```

4. **Create a Branch**:

   - Create a new branch for your changes:
     ```bash
     git checkout -b feature/your-feature-name
     ```
   - Use a descriptive name (e.g., `fix/bug-description`, `feature/add-new-hook`).

5. **Make Changes**:

   - Implement your feature, bug fix, or documentation update.
   - If adding code, ensure it aligns with the existing TypeScript structure.
   - Test your changes locally where possible.

6. **Commit and Push**:

   - Stage your changes:
     ```bash
     git add .
     ```
   - Write a clear commit message:
     ```bash
     git commit -m "feat: add description of your feature"
     ```
   - Push to your fork:
     ```bash
     git push origin feature/your-feature-name
     ```

7. **Submit a Pull Request (PR)**:
   - Go to the original repository: [https://github.com/ngnhutrung25/zustand-q](https://github.com/ngnhutrung25/zustand-q).
   - Click "Pull Requests" > "New Pull Request".
   - Select your branch and submit the PR with a detailed description of your changes.

## Guidelines

To ensure a high-quality contribution process, please adhere to these guidelines:

- **Code Style**:

  - Follow the existing TypeScript conventions in the project (e.g., camelCase, consistent spacing).
  - Use ESLint/Prettier if configured (check `.eslintrc` or run `npm run lint` if available).

- **Commit Messages**:

  - Follow the [Conventional Commits](https://www.conventionalcommits.org/) format (e.g., `feat:`, `fix:`, `docs:`) for clarity and automated versioning.
  - Example: `feat: add support for custom middleware`.

- **Pull Requests**:

  - Provide a detailed PR description, including the problem solved, approach taken, and any testing done.
  - Reference related issues (e.g., `Fixes #123`) if applicable.

- **Collaboration**:

  - Be respectful and open to feedback during PR reviews.
  - Respond to comments or questions from maintainers in a timely manner.

- **Reporting Issues**:
  - If you’re not submitting code but want to report a bug or suggest a feature, create an issue on [GitHub Issues](https://github.com/ngnhutrung25/zustand-q/issues).
  - Include steps to reproduce (for bugs) or a clear proposal (for features).

## Development Workflow

- **Building**: Run `npm run build` to compile TypeScript and Rollup output (see `scripts` in `package.json`).
- **Releasing**: Maintainers handle releases via `npm run release:patch/minor/major`. Contributors focus on PRs.
- **Dependencies**: The project uses `zustand` (^5.0.3), TypeScript, and Rollup—ensure compatibility with these tools.

## Resources

- **Repository**: [https://github.com/ngnhutrung25/zustand-q](https://github.com/ngnhutrung25/zustand-q)
- **Issues**: [https://github.com/ngnhutrung25/zustand-q/issues](https://github.com/ngnhutrung25/zustand-q/issues)
- **Documentation**: Browse this site for usage details (e.g., [createStore](./api-reference/create-store), [Queries](./api-reference/queries)).
- **License**: MIT—see [LICENSE](https://github.com/ngnhutrung25/zustand-q/blob/main/LICENSE) for details.

Thank you for helping improve Zustand Q! Your contributions drive the project forward.
