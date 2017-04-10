# Live Centre Clients

Live Centre client is a series of apps to access the TFG platform.
Currently supported is Android, iOS and web app.

Project Layout
- android - Android client app
- ios - iOS client app
- www - HTML web app (development and deployment area)

## Android client

## iOS client

## Web client

### Installation

You first need Node.js and npm installed.

Next you need Gulp installed globally.

```sh
$ npm install -g gulp
```
Get the repository, install the required npm modules including those listed in the dev-dependencies.

```sh
$ git clone git@bitbucket.org:futureuniverse/live-centre.git
$ cd live-centre/www
$ npm install
```
Note: Make sure that the dev-dependencies are also installed. In order to install the dev-dependencies run the following command:
```sh
$ npm install --only=dev
```

### Building

The release can be built with the following command and will be found in the live-centre/www/dist folder

```sh
$ npm run build
```
or
```sh
$ gulp build
```

NOTE: This is the default task for the gulp task runner. Default build mode in this case is the development mode. In development mode, .css and .js files include source-maps and they are not minified.

Running the build process in production mode will remove the source-maps, produce minified .css and .js files, and does some other optimizations for production.
For production build, run the command below.

```sh
$ npm run prod
```
or
```sh
$ gulp build --production
```

### Watching

Gulp build task can be run with --watch argument as shown below.

```sh
$ npm run build:watch
```
or
```sh
$ gulp build --watch
```
In this case, gulp goes through the normal build process and then starts watching for changes in files specified in the configurations. If change happens, gulp will re-run appropriate tasks.

### Linting

To improve the quality of the code it is linted (checks for code style and errors) on every build automatically. If at any time you
want to check the quality of the code run the following command:

```sh
$ npm run lint
```
or
```sh
$ gulp lint
```
### Testing

Unit tests are run via the karma and the mocha, sinon test framework.

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

### Testing on the Browser

To open the built project on the browser, run the following command:

```sh
$ gulp serve
```
This will start a local server at [http://localhost:3778](http://localhost:3778) and opens up a browser.
Files are served from the '/dist' folder. For convenience, any change in '/dist' folder will automatically reload the browser.


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



