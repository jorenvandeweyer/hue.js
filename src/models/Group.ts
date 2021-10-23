import Bridge from './Bridge';

interface Group extends GroupResponse {
    bridge?: Bridge
    id: string,
}

class Group implements GroupResponse {
    static bridge: Bridge;

    private dim_bri_incr: number;

    constructor(id: string, bridge: Bridge, response: GroupResponse) {
        this.id = id;
        this.bridge = bridge;
        this.dim_bri_incr = 1;

        Object.assign(this, response);
    }

    async update() : Promise<void> {
        const response = await this.bridge?.request<GroupResponse>({
            url: `/groups/${this.id}`
        });

        Object.assign(this, response);
    }

    static async all() : Promise<Array<Group>> {
        const groups = [];

        const response = await this.bridge.request<GroupsResponse>({
            url: '/groups'
        });

        for (const key in response) {
            groups.push(new Group(key, this.bridge, response[key]));
        }

        return groups;
    }

    static async one(id: string) : Promise<Group> {
        const response = await this.bridge.request<GroupResponse>({
            url: `/groups/${id}`,
        });

        if (!response) throw 'Group not found';

        return new Group(id, this.bridge, response);
    }

    static async create(data: GroupCreateRequest) : Promise<Group> {
        const response = await this.bridge.request<GroupCreateResponse>({
            url: '/groups',
            method: 'POST',
            data,
        });

        return await this.one(response.success.id);
    }

    async setAttribute(name: string, value: string|Array<string>) : Promise<void> {
        const attributes : Record<string, string|Array<string>> = {};

        attributes[name] = value;

        await this.setAttributes(attributes);
    }

    async setAttributes(attributes: Record<string, string|Array<string>>) : Promise<void> {
        await this.bridge?.request({
            url: `/groups/${this.id}`,
            method: 'PUT',
            data: attributes,
        });
    }

    async setName(value: string) : Promise<void> {
        await this.setAttributes({
            name: value,
        });
    }

    async setClass(value: string) : Promise<void> {
        await this.setAttributes({
            class: value,
        });
    }

    async setLights(value: Array<string>) : Promise<void> {
        await this.setAttributes({
            lights: value,
        });
    }

    async setState(state: GroupState) : Promise<void> {
        await this.bridge?.request({
            url: `/groups/${this.id}/action`,
            method: 'PUT',
            data: state,
        });

        await this.update();
    }

    async remove() : Promise<void> {
        await this.bridge?.request({
            url: `/groups/${this.id}`,
            method: 'DELETE',
        });
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

        if (this.state.any_on) await this.off();
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

export default Group;
