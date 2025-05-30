# zodiac_frontend

An application to track packages of digital records through the [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron) services and troubleshoot errors.

Built with [Next.js](https://nextjs.org) and [Jest](https://jestjs.io/) for testing.

## Local development

Install [git](https://git-scm.com/) and [yarn](https://yarnpkg.com/). Clone the repository.

    $ git clone https://github.com/RockefellerArchiveCenter/zodiac_frontend.git

Install dependencies, pre-commit hooks, and start the application:

    $ yarn install
    $ yarn prepare
    $ yarn dev

Once the application starts, access it in your browser at [http://localhost:3000](http://localhost:3000).

When you're done, shut down the application with ctrl+c.

## Configuration

Environment variables available to the application at runtime are stored in `.env` (for local development) and `.env.deploy` (for deployments).

## Testing

zodiac_frontend comes with unit tests and linting. By running the `yarn prepare` script when
setting up local development, you are installing a git pre-commit hook which will attempt to
fix any formatting errors before committing code.

You can report any linting issues at any time by running `yarn lint`.

## Contributing

zodiac_frontend is an open source project and we welcome contributions! If you want to fix a bug, or have an idea of how to enhance the application, the process looks like this:

1. File an issue in this repository. This will provide a location to discuss proposed implementations of fixes or enhancements, and can then be tied to a subsequent pull request.
2. If you have an idea of how to fix the bug (or make the improvements), fork the repository and work in your own branch. When you are done, push the branch back to this repository and set up a pull request. Automated unit tests are run on all pull requests. Any new code should have unit test coverage, documentation (if necessary), and should conform to the Python PEP8 style guidelines.
3. After some back and forth between you and core committers (or individuals who have privileges to commit to the base branch of this repository), your code will probably be merged, perhaps with some minor changes.

## License

This code is released under an [MIT License](LICENSE).
