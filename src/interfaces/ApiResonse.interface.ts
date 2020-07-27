interface BridgeResponse {
    id: string,
    internalipaddress: string,
    macaddress?: string,
    name?: string
}

interface LightResponse {
    state: {
        on: boolean,
        bri: number,
        hue: number,
        sat: number,
        effect: string,
        xy: [number, number],
        ct: number,
        alert: string,
        colormode: string,
        mode: string,
        reachable: boolean
    },
    swupdate: {
        state: string,
        lastinstall: string
    },
    type: string,
    name: string,
    modelid: string,
    manufacturername: string,
    productname: string,
    capabilities: {
        certified: boolean,
        control: {
            mindimlevel: number,
            maxlumen: number,
            colorgamuttype: string,
            colorgamut: [
                [number, number],
                [number, number],
                [number, number],
            ],
            ct: {
                min: number,
                max: number
            }
        },
        streaming: {
            renderer: boolean,
            proxy: boolean
        }
    },
    config: {
        archetype: string,
        function: string,
        direction: string,
        startup: {
            mode: string,
            configured: boolean
        }
    },
    uniqueid: string,
    swversion: string
}

interface LightsResponse {
    [key: string]: LightResponse
}

interface ConfigResponse {
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
        body: string
    },
    time: string,
    localtime: string,
    starttime: string,
    status: string,
    autodelete: boolean
}

interface ScheduleResponses {
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
    image: string, // UUID, not sure how to type this.
    lastupdated: string, // Time, is string the correct type for this?
    version: number
}

interface ScenesResponse {
    [key: string]: SceneResponse
}

interface ResourcelinkResponse {
    name: string,
    description: string,
    type: string,
    class: number,
    owner: string,
    links: Array<string>
}

interface ResourcelinksResponse {
    [key: string]: ResourcelinkResponse
}

interface apiError {
    type: number;
    description: string;
}

