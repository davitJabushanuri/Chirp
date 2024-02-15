# CONTRIBUTING

Pull requests are welcome. For major changes, please [open an issue](https://github.com/davitJabushanuri/Chirp/issues) first to discuss what you would like to change.

## Setup

1. Fork and clone the repo
2. Run yarn to install dependencies
3. Create a branch for your PR with git checkout -b your-branch-name

To keep main branch pointing to remote repository and make pull requests from branches on your fork. To do this, run:

```bash
git remote add upstream https://github.com/davitJabushanuri/Chirp.git
git fetch upstream
git branch --set-upstream-to=upstream/main main
```

## Pull Request Guidelines

### Git Commit Messages

Structure messages like this:

```bash
<type>: <subject>
```

Example

```bash
feat: new awesome feature
```

List of types:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- chore: Other changes that don't modify src or test files
- revert: Reverts a previous commit
