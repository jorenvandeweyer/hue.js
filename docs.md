# Hue Documentation

## TOC
- [Class: Hue](#class-hue)
  - [new Hue(bridgeId, user)](#new-huebridgeid-user)
  - [Event: 'ready'](#event-ready)
  - [Event: 'error'](#event-error)
  - [hue.connect()](#hueconnect)
- [Class: Bridge](#class-bridge)
  - [Bridge.all()](#bridgeall)
  - [Bridge.one(id)](#bridgeoneid)
  - [bridge.Group](#bridgegroup)
  - [bridge.authenticate(username)](#bridgeauthenticateusername)
- [Class: Group](#class-group)
  - [Group.bridge](#groupbridge)
  - [Group.all()](#groupall)
  - [Group.one(id)](#grouponeid)
  - [group.bridge](#groupbridge-1)
  - [group.update()](#groupupdate)
  - [group.off()](#groupoff)
  - [group.on()](#groupon)
  - [group.toggle()](#grouptoggle)
  - [group.dim()](#groupdim)
  - [group.freeze()](#groupfreeze)
- [Class: Light](#class-light)
  - [Light.bridge](#lightbridge)
  - [Light.all()](#lightall)
  - [Light.allAsGroup()](#lightallasgroup)
  - [Light.one(id)](#lightoneid)
  - [Light.new()](#lightnew)
  - [Light.search()](#lightsearch)
  - [light.bridge](#lightbridge-1)
  - [light.update()](#lightupdate)
  - [light.off()](#lightoff)
  - [light.on()](#lighton)
  - [light.toggle()](#lighttoggle)
  - [light.dim()](#lightdim)
  - [light.freeze()](#lightfreeze)

## Creating a user for a bridge
[Hue documentation](https://developers.meethue.com/develop/get-started-2/)

## Class: Hue

A class that extends eventemitter to alert about the state of your bridge.

### new Hue(bridgeId, user)
- `bridgeId` {String|null} The id of the bridge you want to connect to. It is possible to not specify the bridgeId (but not recommended).
- `user` {String} A user with access to this bridge.

### Event: 'ready'
 - `bridge` {Bridge} an authenticated bridge

This event emits an already authenticated bridge, which is ready to use.


### Event: 'error'
- `error` {any}

Emitted when the instance could not connect to the bridge.

### hue.connect()
Manually reconnect to bridge, with the provided credentials.

## Class: Bridge
The bridge model creates an interface to the groups, lights and other things connected to the pyshical Hue bridge.

### Bridge.all()
- {Promise\<Bridge[]\>} returns a promise that resolves to an array of unauthenticated bridges

### Bridge.one(id)
- {Promise\<Bridge\>} returns a promise that resolves to an unauthenticated bridge

### bridge.Group
-  {Group} class to interact with Hue groups

### bridge.authenticate(username)
- `username` {String} The username to authenticate to the bridge
- {Promise} returns promise

The bridge will emit a `ready` event when successfully connected.


## Class: Group
The group model created from an API response with some methods to control the group

### Group.bridge
- {Bridge} returns the bridge that provided the group class

### Group.all()
- {Promise\<[Group](#class-group)[]\>} returns a promise that resolves to an array of groups

### Group.one(id)
 - {Promise\<[Group](#class-group)\>} returns a promise that resolves to a group

### Group.create(optoins)
- {Promise<Group>} returns the created group

Create a group

### group.bridge
- {Bridge} returns the bridge that created the group instance

### group.update()
- {Promise}

Update the state and attributes of the group
(Carefull with ratelimits)

### group.off()
- {Promise}

Turn the lights in this group off.

### group.on()
- {Promise}

Turn the lights in this group on.

### group.toggle()
- {Promise}

Toggle the lights in this group.
If any light is on, all will turn off.
If no lights are on, all will turn on.

### group.dim()
- {Promise}

This function will increase or decrease the brightness of the group. The first time this method is invoked, the group will decrease, the second time increase, switching every time.

### group.freeze()
- {Promise}

This function will stop the brightness increase/decrease triggered by the [group.dim()](#groupdim) function.


### group.setName(value: string)
- {Promise}

Change the name of the group

### group.setClass(value: string)
- {Promise}

Change the class of the group

### group.setLights(lights: Array<string>)
- {Promise}

Change the lights of the group

### group.remove()
- {Promise}

Remove this group

### group.setState(satte: GroupState)
- {Promise}

Set state to all lights of group

## Class: Light
The light model created from an API response with some methods to control the light

### Light.bridge
- {Bridge} returns the bridge that provided the light class

### Light.all()
- {Promise\<[Light](#class-light)[]\>} returns a promise that resolves to an array of lights

### Light.allAsGroup()
- {Promise \<[Group](#class-group)\>} returns a promise that resolved to a group containing all lights connected to this bridge

### Light.one(id)
 - {Promise\<[Light](#class-light)\>} returns a promise that resolves to a light

### Light.new()
- {Promise\<[Light](#class-light)[]\>} returns a promise that resolves to an array of new lights.

### Light.search()
- {Promise}

Start searching for new lights, the searching will continue for 40 seconds. New found lights will be added to the response of [Light.new()](#lightnew)

### light.bridge
- {Bridge} returns the bridge that created the light instance

### light.update()
- {Promise}

Update the state and attributes of the light
(Carefull with ratelimits)

### light.off()
- {Promise}

Turn the light off.

### light.on()
- {Promise}

Turn the light on.

### light.toggle()
- {Promise}

Toggle the light.
If the light is on it will be turned off and visa versa

### light.dim()
- {Promise}

This function will increase or decrease the brightness of the light. The first time this method is invoked, the light will decrease, the second time increase, switching every time.

### light.freeze()
- {Promise}

This function will stop the brightness increase/decrease triggered by the [light.dim()](#lightdim) function.
