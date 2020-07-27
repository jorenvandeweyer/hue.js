"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Group {
    constructor(id, bridge, response) {
        this.id = id;
        this.bridge = bridge;
        Object.assign(this, response);
    }
    async update() {
        const response = await this.bridge?.request({
            url: `/groups/${this.id}`
        });
        Object.assign(this, response);
    }
    static async all() {
        const groups = [];
        try {
            const response = await this.bridge.request({
                url: '/groups'
            });
            for (const key in response) {
                groups.push(new Group(key, this.bridge, response[key]));
            }
            return groups;
        }
        catch (e) {
            return groups;
        }
    }
    static async one(id) {
        const response = await this.bridge.request({
            url: `/groups/${id}`,
        });
        if (!response)
            throw 'Group not found';
        return new Group(id, this.bridge, response);
    }
    static async create(data) {
        const response = await this.bridge.request({
            url: '/groups',
            method: 'POST',
            data,
        });
        return await this.one(response.success.id);
    }
    async setAttribute(name, value) {
        const attributes = {};
        attributes[name] = value;
        await this.setAttributes(attributes);
    }
    async setAttributes(attributes) {
        await this.bridge?.request({
            url: `/groups/${this.id}`,
            method: 'PUT',
            data: attributes,
        });
    }
    async setName(value) {
        await this.setAttributes({
            name: value,
        });
    }
    async setClass(value) {
        await this.setAttributes({
            class: value,
        });
    }
    async setLights(value) {
        await this.setAttributes({
            lights: value,
        });
    }
    async setState(state) {
        await this.bridge?.request({
            url: `/groups/${this.id}/action`,
            method: 'PUT',
            data: state,
        });
        await this.update();
    }
    async on() {
        await this.setState({
            on: true
        });
    }
    async off() {
        await this.setState({
            on: false
        });
    }
    async toggle() {
        await this.update();
        if (this.state.any_on)
            await this.off();
        else
            await this.on();
    }
    async remove() {
        await this.bridge?.request({
            url: `/groups/${this.id}`,
            method: 'DELETE',
        });
    }
}
exports.default = Group;
//# sourceMappingURL=Group.js.map