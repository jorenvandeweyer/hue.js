import Bridge from './Bridge';
import Group from './Group';

interface Light extends LightResponse {
    bridge?: Bridge
    id: string
}

class Light {
    static bridge: Bridge

    private dim_bri_incr: number

    constructor(id: string, bridge: Bridge, response: LightResponse) {
        this.id = id;
        this.bridge = bridge;
        this.dim_bri_incr = 1;

        Object.assign(this, response);
    }

    async update() : Promise<void> {
        const response = await this.bridge?.request<LightResponse>({
            url: `/lights/${this.id}`
        });

        Object.assign(this, response);
    }

    static async all() : Promise<Array<Light>> {
        const lights = [];

        const response = await this.bridge.request<LightsResponse>({
            url: '/lights'
        });

        for (const key in response) {
            lights.push(new Light(key, this.bridge, response[key]));
        }

        return lights;
    }

    static async allAsGroup() : Promise<Group> {
        return this.bridge.Group.one('0');
    }

    static async one(id: string) : Promise<Light> {
        const response = await this.bridge.request<LightResponse>({
            url: `/lights/${id}`
        });

        if (!response) throw 'Light not found';

        return new Light(id, this.bridge, response);
    }

    static async new() : Promise<Array<Light>> {
        const response = await this.bridge?.request<NewLightsResponse>({
            url: '/lights/new'
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lastscan, ...arr } = response;

        const lights = await this.all();

        return lights.filter((light) => Object.keys(arr).includes(light.id));
    }

    static async search(serialNumbers?: Array<string>) : Promise<void> {
        await this.bridge.request({
            url: '/lights',
            method: 'POST',
            data: serialNumbers ? { deviceid: serialNumbers } : undefined
        });
    }

    async setAttribute(name: string, value: string|Array<string>) : Promise<void> {
        const attributes : Record<string, string|Array<string>> = {};

        attributes[name] = value;

        await this.setAttributes(attributes);
    }

    async setAttributes(attributes: Record<string, string|Array<string>>) : Promise<void> {
        await this.bridge?.request({
            url: `/lights/${this.id}`,
            method: 'PUT',
            data: attributes
        });
    }

    async setName(value: string) : Promise<void> {
        await this.setAttributes({
            name: value,
        });
    }

    async setState(state: LightState) : Promise<void> {
        await this.bridge?.request({
            url: `/lights/${this.id}/state`,
            method: 'PUT',
            data: state
        });

        await this.update();
    }

    /**
     * Extra functions to extend functionality
     */


    async on() : Promise<void> {
        await this.setState({
            on: true
        });
    }

    async off() : Promise<void> {
        await this.setState({
            on: false
        });
    }

    async toggle() : Promise<void> {
        await this.update();

        if (this.state.on) await this.off();
        else await this.on();
    }

    async dim() : Promise<void> {
        this.dim_bri_incr *= -1;

        await this.setState({
            bri_inc: this.dim_bri_incr * 254,
            transitiontime: 50,
        });

    }

    async freeze() : Promise<void> {
        await this.setState({
            bri_inc: 0,
        });
    }
}

export default Light;
