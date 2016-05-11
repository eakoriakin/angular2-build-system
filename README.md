# Angular2 build system

## Overview

This fork of Angular2 Tour of Heroes app is used to illustrate how to put in a place a build system for Angular 2, which includes Gulp, TypeScript, TSLint, SystemJS and DefinitelyTyped.

## Getting started

1. `npm install`
2. `gulp`

## TODO

1. Put each component in its own folder to make a good structure. Then change gulp build system to copy whole app folder.
Cannot flatten the structure in the distribution folder because it will break paths in SystemJS and TypeScript.
