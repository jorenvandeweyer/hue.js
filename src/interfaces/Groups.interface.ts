interface GroupResponse {
    name: string,
    lights: Array<string>,
    sensors: Array<string>,
    type: string,
    state: {
        all_on: boolean,
        any_on: boolean
    },
    recycle: boolean,
    class: string,
    action: {
        on: boolean,
        bri: number,
        hue: number,
        sat: number,
        effect: string,
        xy: [number, number],
        ct: number,
        alert: string,
        colormode: string
    }
}

interface GroupsResponse {
    [key: string]: GroupResponse
}

interface GroupCreateRequest {
    name?: string;
    type?: string;
    class?: string;
    lights: Array<string>;
}

interface GroupCreateResponse {
    success: {
        id: string,
    };
}

interface GroupStateRequest {
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
    scene?: string;
}
