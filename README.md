# Live Centre Clients

Live Centre client is a series of apps to access the TFG platform.
Currently supported is Android, iOS and web app.

Layout
- android - Android client app
- ios - iOS client app
- www - HTML web app (development and deployment area)

## Android client

## iOS client

## Web client

Uses IntelliJ or Visual code and NodeJS, with a web app based on React and Redux

### Installation IntelliJ

To make your life easier you should install the following plugins.
- NodeJS
- Markdown support

### Installation Visual Code

To make your life easier you should install the following extensions.

- Beautify
- language-stylus
- Reactjs code snippets

### Installation

You first need NodeJS and npm installed.

Next you need Gulp installed globally.

```sh
$ npm install -g gulp
```
Get the repository, install the required npm modules and run the web app for the first time.

```sh
$ git clone git@bitbucket.org:futureuniverse/live-centre.git
$ cd live-centre/www
$ npm install
$ gulp or npm start
```

The web client will be running locally at [http://localhost:8777/](http://localhost:8777/)

Note: gulp can be run from inside of IntelliJ for convenience, but this seems to take more resources

### Linting

To improve the quality of the code it is linted (checks for code style and errors) on every build automatically. If at any time you
want to check the quality of the code run the following command:

```sh
$ gulp lint
```

Note: This command can be also run from within Intellij by double clicking the "lint" task in the
Gulp window. This has the advantage you can click to open effected files directly from the output.

### Testing

Unit tests are run via the karma and the mocha test framework.

You need to install karma command line interface globally

```sh
$ npm install -g karma-cli
```

To run the full test suite simply run:

```sh
$ npm run test
```

Alternatively you can run the test:watch command and the tests will automatically execute when
the source files are updated

```sh
$ npm run test:watch
```

### Building release

The release can be built with the following command and will be found in the live-centre/www/dist folder

```sh
$ npm run build
```

### Deploying to native apps

After building a release or debug version of the www app, it can be easily deployed to the Android and iOS native apps with the following command

```sh
$ npm run deploy
```
or
```sh
$ gulp deploy
```

#### Debugging on the device

If you want to have debug on an actual device you first need to build a debug build then deploy it to the native apps using the following commands.

```sh
$ gulp build
$ gulp deploy
```

### Updating NPM modules

NPM check updates is recommended, to make it easy to update the npm modules when required.

```sh
$ npm install -g npm-check-updates
```

To check which modules need to be updated run the following command and you will see some output similar to as shown

```sh
$ ncu

 express           4.12.x  →   4.13.x
 multer            ^0.1.8  →   ^1.0.1
 react-bootstrap  ^0.22.6  →  ^0.24.0
 react-a11y        ^0.1.1  →   ^0.2.6
 webpack          ~1.9.10  →  ~1.10.5

Run with -u to upgrade your package.json
```

Now simply run the command below to update the package.json

```sh
$ ncu -u
```

Finally to update the modules themselves you need to use the npm update command

```sh
$ npm update
```



