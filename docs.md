# Hue.js Documentation

## TOC
- [Class: App](#class-app)
  - [new App(bridgeId, user)](#new-appbridgeid-user)
  - [Event: 'ready'](#event-ready)
  - [Event: 'error'](#event-error)
  - [app.connect()](#appconnect)
- [Class: Bridge](#class-bridge)
  - [Bridge.all()](#bridgeall)
  - [Bridge.one(id)](#bridgeoneid)
  - [bridge.Group](#bridgegroup)
  - [bridge.authenticate(username)](#bridgeauthenticateusername)
- [Class: Group](#class-group)

## Creating a user for a bridge
[Hue documentation](https://developers.meethue.com/develop/get-started-2/)

## Class: App

A class that extends eventemitter to alert about the state of your bridge. To create a user

### new App(bridgeId, user)
- `bridgeId` {String|null} The id of the bridge you want to connect to. It is possible to not specify the bridgeId (but not recommended).
- `user` {String} A user with access to this bridge.

### Event: 'ready'
 - `bridge` {Bridge} an authenticated bridge

This events emits an already authenticated bridge, which is ready to use.


### Event: 'error'
- `error` {any}

Emitted when the app could not connect to the bridge.

### app.connect()
Manually reconnect to bridge.

## Class: Bridge
The bridge model creates an interface to the groups, lights and other things connected to the pyshical Hue bridge.

### Bridge.all()
- {Group[]} returns array of unauthenticated groups

### Bridge.one(id)
- {Group} returns unauthenticated group

### bridge.Group
-  {Group}

### bridge.authenticate(username)
- `username` {String} The username to authenticate to the bridge

The bridge will emit a `ready` event when successfully connected.


## Class: Group
The group model created from an API response with some methods to control the group

### Group.bridge
- {Bridge} returns the bridge that provided the group Class

### Group.all()
- {Promise\<Group[]\>} returns a promise that resolves to an array of groups

### Group.one(id)
 - {Promise\<Group\>} returns a promise that resolve to a group

### group.bridge
- {Bridge} return the bridge that created the group instance

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
