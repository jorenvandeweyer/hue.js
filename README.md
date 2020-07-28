# Hue.js
An easy to use wrapper from the [Hue API](https://developers.meethue.com/develop/hue-api/) in typescript.

The package can be used in both javascript and typescript.

## Table Of Contents
- [Getting Started](#getting-started)
- [Example](#usage-examples)
- [Documentation](#documentation)

## Getting started

At the moment the package is not published on npm yet.

Installing the package can be done with the following command:

```
npm i github:jorenvandeweyer/hue.js
```

```js
const { App, Bridge } = require('hue.js');
```
## Usage Examples

### Example 1
Connecting to a bridge with the `App` class

```js
const { App } = require('hue.js');

const { HUE_BRIDGE, HUE_USER } = process.env;

const hue = new App(HUE_BIRDGE, HUE_USER);

hue.on('ready', async (bridge) => {
    const groups = await bridge.Group.all();
    const group = groups[0];

    await group.toggle();
});

hue.on('error', (msg) => {
    setTimeout(() => {
        hue.connect();
    }, 30*1000);
});
```

### Example 2
Connecting directly to a bridge

```js
const { Bridge } = require('hue.js');

const { HUE_BRIDGE, HUE_USER } = process.env;

Bridge.one(HUE_BRIDGE).then(bridge => {
    bridge.on();
});
```

### Example 3
Connecting to the first (and mostly only bridge found)

```js
const { Bridge } = require('hue.js');

const { HUE_BRIDGE, HUE_USER } = process.env;

Bridge.all().then(bridges => {
    const bridge = bridges[0];
    bridge.off();
});
```
## Documentation
Detailed documentation in [`docs.md`](./docs.md).

