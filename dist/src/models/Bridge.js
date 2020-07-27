"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// import https from 'https';
const parseErrors_1 = __importDefault(require("../utils/parseErrors"));
const Group_1 = __importDefault(require("./Group"));
class Bridge {
    constructor(response) {
        Object.assign(this, response);
        Group_1.default.bridge = this;
        this.Group = Group_1.default;
    }
    async authenticate(username) {
        this.username = username;
        try {
            const response = await this.request({
                url: '/config'
            });
            return response;
        }
        catch (e) {
            delete this.username;
        }
        throw 'Authentication failed';
    }
    async request(config) {
        if (!this.username) {
            throw 'not authenticated';
        }
        const instance = axios_1.default.create({
            baseURL: `http://${this.internalipaddress}/api/${this.username}`,
        });
        const response = await instance.request(config);
        const errors = parseErrors_1.default(response.data);
        if (errors) {
            throw errors;
        }
        return response.data;
    }
    static async all() {
        try {
            const result = await axios_1.default.request({
                url: 'https://discovery.meethue.com',
                method: 'GET',
            });
            return result.data.map(response => new Bridge(response));
        }
        catch (e) {
            return [];
        }
    }
    static async one(id) {
        const bridges = await this.all();
        const bridge = bridges.find(bridge => bridge.id === id);
        if (!bridge) {
            throw 'bridge not found';
        }
        return bridge;
    }
}
exports.default = Bridge;
//# sourceMappingURL=Bridge.js.map