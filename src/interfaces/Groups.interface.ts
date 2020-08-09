interface GroupResponse {
    name: string;
    lights: Array<string>;
    sensors: Array<string>;
    type: string;
    state: {
        all_on: boolean;
        any_on: boolean;
    };
    recycle: boolean;
    class: string;
    action: {
        on: boolean;
        bri: number;
        hue: number;
        sat: number;
        effect: string;
        xy: [number, number];
        ct: number;
        alert: string;
        colormode: string;
    }
}

interface GroupsResponse {
    [key: string]: GroupResponse;
}

interface GroupCreateRequest {
    name?: string;
    type?: string;
    class?: string;
    lights: Array<string>;
}

interface GroupCreateResponse {
    success: {
        id: string;
    };
}

interface GroupState extends LightState {
    scene?: string;
}
