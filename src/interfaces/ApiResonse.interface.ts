/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BridgeResponse {
    id: string,
    internalipaddress: string,
    macaddress?: string,
    name?: string
}

export interface ConfigResponse {
    name: string,
    zigbeechannel: number,
    bridgeid: string,
    mac: string,
    dhcp: boolean,
    ipaddress: string,
    netmask: string,
    gateway: string,
    proxyaddress: string,
    proxyport: number,
    UTC: string,
    localtime: string,
    timezone: string,
    modelid: string,
    datastoreversion: string,
    swversion: string,
    apiversion: string,
    swupdate: {
        updatestate: number,
        checkforupdate: boolean,
        devicetypes: {
            bridge: boolean,
            lights: Array<string>,
            sensors: Array<string>
        },
        url: string,
        text: string,
        notify: boolean
    },
    swupdate2: {
        checkforupdate: boolean,
        lastchange: string,
        bridge: {
            state: string,
            lastinstall: string
        },
        state: string,
        autoinstall: {
            updatetime: string,
            on: boolean
        }
    },
    linkbutton: boolean,
    portalservices: boolean,
    portalconnection: string,
    portalstate: {
        signedon: boolean,
        incoming: boolean,
        outgoing: boolean,
        communication: string
    },
    internetservices: {
        internet: string,
        remoteaccess: string,
        time: string,
        swupdate: string
    },
    factorynew: boolean,
    replacesbridgeid: null,
    backup: {
        status: string,
        errorcode: number
    },
    starterkitid: string,
    whitelist: {
        [key: string]: {
            'last use data': string,
            'create date': string,
            'name': string,
        }
    }
}

interface ScheduleResponse {
    name: string,
    description: string,
    command: {
        address: string,
        method: string,
        body: any
    },
    time: string,
    localtime: string,
    starttime: string,
    status: string,
    autodelete: boolean
}

export interface ScheduleResponses {
    [key: string]: ScheduleResponse
}

interface SceneResponse {
    name: string,
    type: string,
    group: string,
    lights: Array<number>,
    owner: string,
    recycle: boolean,
    locked: boolean,
    appdata: {
        version: number,
        data: string
    },
    picture: string,
    image: string,
    lastupdated: string,
    version: number
}

export interface ScenesResponse {
    [key: string]: SceneResponse
}

export interface ResourcelinkResponse {
    name: string,
    description: string,
    type: string,
    class: number,
    owner: string,
    links: Array<string>
}

export interface ResourcelinksResponse {
    [key: string]: ResourcelinkResponse
}

export interface apiError {
    type: number;
    description: string;
}

