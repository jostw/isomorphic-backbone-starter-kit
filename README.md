# Isomorphic Backbone Starter Kit

This project shows how to build an isomorphic application with Backbone and Marionette.
First of all, this is a [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application
) built with Backbone and Marionette.
By sharing templates between server and client makes it easy to render at both sides which also solves the problem of [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) in SPA.

## Overview

This project includes the following tools.

- [Backbone](http://backbonejs.org/)
- [Marionette](http://marionettejs.com/)
- [Handlebars](http://handlebarsjs.com/)
- [Express](http://expressjs.com/)
- [Gulp](http://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Browserify](http://browserify.org/)

## Getting Started

First, clone this project.

```
git clone https://github.com/jostw/isomorphic-backbone-starter-kit.git
```

- Make sure [Node.js](https://nodejs.org/) is installed properly.

- Use ``` npm start ``` for watching files and developing.

- Use ``` npm run build ``` for production.

## Development

- ``` app.js ```: server side application
- ``` js/app.js ```: client side application

- Following features are isomorphic, shared between server side and client side applications.
    - ``` js/app/routes.js ```: settings for routing
    - ``` js/app/template.js ```: store and render templates with Handlebars
    - ``` template/*.hbs ```: Handlebars templates

## Contribute

Pull requests are welcome :)

## License

MIT
