# Hue.js
An easy to use wrapper from the [Hue API](https://developers.meethue.com/develop/hue-api/) in typescript.

## Table Of Contents
- [Getting Started](#getting-started)
- [Example](#usage-examples)
- [Documentation](#documentation)

## Getting Started

Installing the package can be done with the following command:

```
npm i hue-wrapper
```

```js
const { Hue, Bridge } = require('hue-wrapper');
```
## Usage Examples

### Example 1
Connecting to a bridge with the `Hue` class

```js
const { Hue } = require('hue-wrapper');

const { HUE_BRIDGE, HUE_USER } = process.env;

const hue = new Hue(HUE_BRIDGE, HUE_USER);

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
const { Bridge } = require('hue-wrapper');

const { HUE_BRIDGE, HUE_USER } = process.env;

Bridge.one(HUE_BRIDGE).then(bridge => {
    const groups = await bridge.Group.all();
    const group = groups[0];

    await group.on();
});
```

### Example 3
Connecting to the first (and mostly only bridge found)

```js
const { Bridge } = require('hue-wrapper');

const { HUE_BRIDGE, HUE_USER } = process.env;

Bridge.all().then(bridges => {
    const bridge = bridges[0];

    const groups = await bridge.Group.all();
    const group = groups[0];

    await group.off();
});
```
## Documentation
Detailed documentation in [`docs.md`](./docs.md).
