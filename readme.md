# Superhero Cheesecake Boilerplate V3 (Frontend Only)

## Getting started
1. Initialize a git repo by running `git init`
2. Add this boilerplate as a remote by running `git remote add boilerplate-fe git@codebasehq.com:shcc/shcc-boilerplate/v3-fe.git`
3. Pull in the boilerplate code by running `git pull boilerplate-fe master`
4. Setup Gitflow by running `git flow init`
4. Install all the node modules by running `npm i`
5. Open up the _tools/build/config.json file and change the *url* property to your local url.
6. Start building your project by running `npm run develop`

## Develop and test on real devices using Browsersync
1. Add your choosen [projectname].local.shcc.nl url to the _tools/build/config.json file.
2. Build your project by running `npm run develop`.
3. Open your project in Chrome ([projectname].local.shcc.nl).
4. In the console you will find the IP address and port for your site. (Browsersync active on [IP])

## Features
* Basic project setup using SuperheroJS framework.
* Gulp based build system.
* Webpack 4 for code bundling (faster, tree shaking).
* ES6 support using Babel.
* Static HTML site generator with partials and multi-language support.
* Sass compiler.
* Asset optimization using TinyPNG.

## Folder structure
* You should only be working inside the *_sources* folder.
* Everything inside the *public* folder gets generated by the build system. You should not add or edit anything inside this folder. This is where the server will point to.
* *_sources/assets* is for asset files.
* *_sources/assets/img* is specifically for images.
* *_sources/css* is for Sass source files.
* *_sources/data* is for data files, such as JSON files.
* *_sources/fonts* is for webfonts.
* *_sources/html* is for HTML templates and partials.
* *_sources/js* is for your JavaScript application.
* *_sources/lang* is for language files (translations).

## Multilanguage setup
This boilerplate includes straightforward multilanguage support. Basically every JSON file that gets added to the *_sources/lang* folder will cause a new version of the sites HTML to be generated. All the variables that are added to the JSON file will be available to be used in the HTML templates. The boilerplate contains a *master* language file. This is the default language and this file will be used to generate the default index.html file. Also when specific language files are missing keys the generator will fall back to the master language file.
### Adding a new language to your project
1. Duplicate the *master.json* file and name the new file *[locale].json* (e.g. *en-gb.json*).
2. Make sure the *develop* task is running and observe a *locale* folder being created within the public folder (e.g. *public/en-gb*).
3. This folder will contain a localized version of the site HTML but will share the rest of the site's code.

## Optimizing assets
1. Throw your images (folders containing images is also fine) into *_sources/assets/img*.
2. Optimize your images using TinyPNG by running `npm run optimize-images`.
3. Observe your images being optimized and saved into the hidden *_sources/assets/img/.optimized* folder.
4. The *develop* task will copy all your images into the *public* folder, first unoptimized versions, second optimized versions.
5. **Optimizing images costs money** so don't optimize when it's not needed.