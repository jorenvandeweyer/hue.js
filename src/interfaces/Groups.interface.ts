import { LightState } from './Lights.interface';

export interface GroupResponse {
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

export interface GroupsResponse {
    [key: string]: GroupResponse;
}

export interface GroupCreateRequest {
    name?: string;
    type?: string;
    class?: string;
    lights: Array<string>;
}

export interface GroupCreateResponse {
    success: {
        id: string;
    };
}

export interface GroupState extends LightState {
    scene?: string;
}
