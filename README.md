# CFA Mobile #


## Requirements ##

    Sencha SDK Tools 2.0.0 or later.

    Xcode 4.2 or later.


## Setting up environment ##

Make sure we have set up Sencha SDK Tools environment to use `sencha` command line tool.

    `$ export SENCHA_SDK_TOOLS_2_0_0_BETA3=/Applications/SenchaSDKTools-2.0.0-beta3`

    `$ export PATH=/Applications/SenchaSDKTools-2.0.0-beta3:$PATH`


## Building Sencha app ##

Path for Sencha app is `src/sencha/2.0.1/trunk/www/cfa`.

Assume current directory is at root of repository. Change current directory to Sencha app folder:

    `$ cd src/sencha/2.0.1/trunk/www/cfa`


Use `sencha` command to build Sencha app:

    `$ sencha app build production` - for production build, or

    `$ sencha app build testing` - for testing build.


Build output folder will be placed at `src/sencha/2.0.1/trunk/www/cfa/build`. The build process will copy data from `data` folder and generate manifest for offline cache, so remember to update data before building to generate file hash correctly.


After building, we can upload build output to server or copy to mobile app folder to build offline mobile app.


## Building mobile app ##

Path for Xcode project is `src/iphone/5.1/trunk`.


Default settings for project is for loading Sencha app on server.
To change server address, modify `index.html` file at `src/iphone/5.1/trunk/www`.


To build offline mobile app, clear `www` folder and copy build output of Sencha app to this folder.
For example, copy all files at `src/sencha/2.0.1/trunk/www/cfa/build/production` to `www` folder to build offline mobile app with Sencha production build.