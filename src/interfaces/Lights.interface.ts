export interface LightResponse {
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

export interface LightsResponse {
    [key: string]: LightResponse
}

export type NewLightsResponse = {
    [key: string]: {
        name: string;
    }
} & {
    lastscan: string;
}

export interface LightState {
    on?: boolean;
    bri?: number;
    hue?: number;
    sat?: number;
    xy?: [number, number];
    ct?: number;
    alert?: string;
    effect?: string;
    transitiontime?: number;
    bri_inc?: number;
    sat_inc?: number;
    hue_inc?: number;
    ct_inc?: number;
    xy_inc?: number;
}
