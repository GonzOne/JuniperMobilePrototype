# Juniper Accelerometer Mobile prototype

# Installation and Prerequisites
## Node and dependencies
- node & npm - http://nodejs.org/download/
- gulp: `npm install --global gulp` - http://gulpjs.com/
- bower: `npm install --global bower` - http://bower.io/

Generated with Generator-M-Ionic v1.7.0. 


#### Clone the project from the repository, run

```sh
npm install # install node packages
bower install # install bower packages
gulp --cordova 'prepare' # install Cordova platforms and plugins
gulp watch
```

#### Run in browser

```sh
gulp watch
# add --no-open to avoid browser opening
gulp watch --no-build
```
#### Run on the device/emulators, build

```sh
# both implicitly run gulp build which builds the Ionic app into www/
gulp --cordova 'run ios --device'
gulp --cordova 'emulate ios'
# run the version currently in the www/ folder, without a new build
gulp --cordova 'run ios --device' --no-build
# build Options
gulp --cordova 'run ios --device' --minify --force-build
```

#### Handle Cordova platforms/plugins
```sh
# platforms, use --save to add to config.xml
gulp --cordova 'platform ls' # list
gulp --cordova 'platform add android --save' # add
gulp --cordova 'platform rm android --save' # remove
# plugins, use --save to add to config.xml
gulp --cordova 'plugins ls' # list
gulp --cordova 'plugins add org.apache.cordova.camera --save' # add
gulp --cordova 'plugins rm org.apache.cordova.camera ---save' # remove
```


## License
Code licensed under MIT. Docs under Apache 2. PhoneGap is a trademark of Adobe.
