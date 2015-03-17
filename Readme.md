# fixreader [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

> Simple fixture file reader

## Installation

    npm install --save-dev fixreader

## Usage
With fixture files

    test
    ├── fixtures
    │   ├── complete
    │   │   ├── file.js
    │   │   └── file.txt
    │   ├── directory
    │   │   └── file.txt
    │   ├── text.txt
    │   └── tmp
    └── index.js

you can read `test/fixtures/directory/file.txt` by

    var fixtures = require('fixreader')();
    console.log(fixtures.directory.file);

## License

MIT

[npm-image]: https://img.shields.io/npm/v/fixreader.svg?style=flat
[npm-url]: https://npmjs.org/package/fixreader
[travis-image]: https://img.shields.io/travis/CatTail/fixreader.svg?style=flat
[travis-url]: https://travis-ci.org/CatTail/fixreader
[coveralls-image]: https://img.shields.io/coveralls/CatTail/fixreader.svg?style=flat
[coveralls-url]: https://coveralls.io/r/CatTail/fixreader?branch=master
