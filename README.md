# react-flow-editor2

React Flow Editor.

[![NPM version][npm-image]][npm-url] [![build status][circleci-image]][circleci-url] [![Test coverage][coveralls-image]][coveralls-url] [![node version][node-image]][node-url] [![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-flow-editor2.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-flow-editor2
[circleci-image]: https://img.shields.io/circleci/build/github/react-component/field-form/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/react-component/field-form/tree/master
[coveralls-image]: https://img.shields.io/codecov/c/github/react-component/field-form/master.svg?style=flat-square
[coveralls-url]: https://codecov.io/gh/react-component/field-form
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/react-flow-editor2.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-flow-editor2

## Development

```bash
npm install
npm start
open http://localhost:9001/
```

## Install

[![react-flow-editor2](https://nodei.co/npm/react-flow-editor2.png)](https://npmjs.org/package/react-flow-editor2)

## Usage

```js
import React from 'react';
import ReactFlowEditor from 'react-flow-editor2';

const data = {
  nodes: [
    { id: '1', x: 100, y: 100 },
    { id: '2', x: 200, y: 200 },
  ],
  edges: [],
};

const Demo = () => <ReactFlowEditor data={data} />;
export default Demo;
```

## Todo

- [] 未完成
