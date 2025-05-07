# zodiac_frontend

An application to track packages of digital records through the [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron) services and troubleshoot errors.

Built with [Next.js](https://nextjs.org) and [Jest](https://jestjs.io/) for testing.

## Local development

Install [git](https://git-scm.com/) and [yarn](https://yarnpkg.com/). Clone the repository.

    $ git clone https://github.com/RockefellerArchiveCenter/zodiac_frontend.git

Install dependencies and start the application:

    $ yarn install
    $ yarn prepare
    $ yarn dev

Once the application starts, access it in your browser at [http://localhost:3000](http://localhost:3000).

When you're done, shut down the application with ctrl+c.

## Tests

zodiac_frontend comes with unit tests and linting. By running the `yarn prepare` script when
setting up local development, you are installing a git pre-commit hook which will attempt to
fix any formatting errors before committing code.

You can report any linting issues at any time by running `yarn lint`.

## Visual regression testing

The repository includes [BackstopJS](https://github.com/garris/BackstopJS) to test visual changes to the site by comparing a set of reference images for different screen sizes. Anytime the CSS styles are changed, use BackstopJS to test locally:

1. Follow the [local development instructions](#local-development) to run the app locally.
2. Run [Docker](https://www.docker.com/).
3. In another terminal, run the BackstopJS tests: `yarn backstop-test`.
4. Review the results in the browser and look at the diff of any failed tests.
5. To update the reference image files with the results of the last test images use: `yarn backstop-approve`. Subsequent tests will be compared against these updated reference files.
6. Commit any updated reference images to the repository so that future tests will be compared against the most recent images.

To add or update reference images, edit the scenarios in `backstop.json` and run `yarn backstop-reference`.

## License

This code is released under an [MIT License](LICENSE).
