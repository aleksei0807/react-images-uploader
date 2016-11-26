# React Components Boilerplate

Boilerplate for React Components

## Usage

- React 15.4.1
- PostCSS
- CSSModules
- flow
- webpack dev server
- react-hot-loader 3.0.0

## Getting started

`git clone https://github.com/aleksei0807/react-components-boilerplate.git MyComponentDir`

`cd MyComponentDir`

`git remote rm origin`

`git remote add origin https://github.com/username/component-name.git`

`git add .`

`git commit -m "initial"`

`git push origin master`

`npm i` or `yarn`

Write your true name, version, description, keywords, author, bugs and homepage in package.json.

Write your name in LICENSE.

Write code of your component in `src/index.jsx`. Base styles for your component - `src/styles/style.css`. Style themes for your component - `src/styles/themes`. Put your component's examples in `examples/src` and `examples/pages`.

## Run build

`npm run build`

## Run dev server (hot reload)

`npm run dev-server` or `PORT=8181 npm run dev-server`

default port - 8181.

## Run watch

`npm run watch-styles` for watching styles.

`npm run watch-examples` for watching files in `/examples/src`

## Build styles for examples page

`gulp examples-page-styles`

## Demo examples

[http://aleksei0807.github.io/react-components-boilerplate/](http://aleksei0807.github.io/react-components-boilerplate/)
