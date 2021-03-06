[npm-image]: https://img.shields.io/npm/v/angular2-build-system.svg
[npm-url]: https://npmjs.org/package/angular2-build-system
[downloads-image]: https://img.shields.io/npm/dm/angular2-build-system.svg

# Angular2 build system

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]

## Overview

This is a fork of Angular2 Tour of Heroes app illustrating a mimimun build system setup for Angular 2, which includes Gulp, TypeScript, TSLint, SystemJS, Browsersync and LESS.
Browsersync is used to automatically reload browser when HTML, TypeScript or CSS files are changed.

## Getting started

1. `npm install`
2. `gulp`

## Gulp tasks

### gulp build

Builds the app to the distribution directory.

### gulp start

Builds and starts the app.

### gulp

Does the same as `gulp start`.

### gulp clean

Cleans the distribution directory.

### gulp copy-html

Copies HTML files to the distribution directory.

### gulp copy-js

Compiles TypeScript files, creates declaration `d.ts` files and sourcemap files, and copies files to the distribution directory.

### gulp check-ts

Checks TypeScript files for mistakes.

### gulp copy-css

Compiles LESS files and copies them to the distribution directory.
