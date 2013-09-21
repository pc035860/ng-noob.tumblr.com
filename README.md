# About

Resources used by http://ng-noob.tumblr.com/.


## Development

### Setup

Install all required node packages (basically, grunt-related packages).

```sh
npm install
```

Change the browsable (main) directory in `Gruntfile.js`:

```js
var EXAMPLE_PATH = 'path/you/want';
```

### Run the server

Start a grunt `connect` server with `livereload` (ports are configurable in `Gruntfile.js`).

```sh
grunt server
```

## Deploy to [GitHub Pages](http://pages.github.com/)

Make your commits at `master`. Push it to origin.

```sh
git commit -m 'oh yeah'

git push origin master
```

Switch to `gh-pages` branch and do the rebase with `master`.

```sh
git checkout gh-pages

git rebase master
```

Push `gh-pages` to origin.

```sh
git push origin gh-pages
```
