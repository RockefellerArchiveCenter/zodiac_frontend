# zodiac_frontend

Application to track packages of digital records through the [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron) services and troubleshoot errors.

## Local development

Install [git](https://git-scm.com/), [yarn](https://yarnpkg.com/), and [Bundler](https://bundler.io/). Clone the repository.

    $ git clone https://github.com/RockefellerArchiveCenter/zodiac_frontend.git

Install Javascript (Vue) and Ruby (Jekyll) dependencies

    $ yarn install
    $ bundle install

Compile the javascript

    $ yarn build

In another terminal, run the application

    $ bundle exec jekyll serve

Once the application starts, access it in your browser at http://localhost:4000.

When you're done, shut down the application with ctrl+c.

## Visual regression testing

## License
This code is released under an [MIT License](LICENSE).
