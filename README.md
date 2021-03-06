KickStart
============

Static site template that provides basic index page setup, AngularJS hooked up, Bootstrap ready, site with Modernizr included. Uses Haml and Sass.

Setup
-----------
* (Optional) Update npm
* (Optional) Switch to latest node using nvm
* Install node modules:
  * npm install


* Add google analytics code to ` partials/head.haml `
* Setup typekit url in ` partials/head.haml `
* Update name of project ` YourProject `
  * Update title in ` partials/head.haml `
  * Update ` js/application.js ` with AngularJS app name
  * Update ` js/vendor/app.js ` with AngularJS app name
  * Update ` package.json ` with project name
* (Optional) Keep or remove .htaccess in order to return .htc polyfills


* Create a new deployment server
  * Setup deployment mapping
* Update Tools > Deployment > Options to exclude
  * ` css/bootstrap `
  * ` node_modules`
  * ` partials`
* Update Tools > Deployment > Configuration to exclude
  * haml files
  * scss files
  * .gitignore
  * .package.json
  * .Gruntfile.js

Development
-----------
* Run `grunt server` to start up a server on `localhost:8080`
* Run `grunt watch` to watch for changes in Haml and Sass files and automatically compile to HTML and CSS
* When adding new JavaScript files:
  * Add them to ` application.js `
  * Copy over the dependency list to ` Gruntfile.js `
* When adding a new CSS module:
  * Include module inside ` application.scss `
* When including a new asset, consider using an aws s3 bucket

Deployment
-----------
1. Create a branch off master with a version ` x.x.x `
2. Compile assets
  * In the terminal, run ` grunt `
3. Stage generated assets from ` /dist `
4. Commit change
5. Tag the commit to be deployed
6. Highlight all files
7. Right click, Sync with Deployed

Note:
* You have to expand the .html file that is generated for it to be uploaded/diffed when syncing.
* Ensure that all HTML files have been compiled
