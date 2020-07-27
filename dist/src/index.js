"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.Bridge = void 0;
const Bridge_1 = __importDefault(require("./models/Bridge"));
exports.Bridge = Bridge_1.default;
const events_1 = __importDefault(require("events"));
class App extends events_1.default.EventEmitter {
    constructor(id, user) {
        super();
        this.id = id;
        this.user = user;
        this.connect();
    }
    async connect() {
        try {
            const bridge = await this._getBridge();
            await bridge.authenticate(this.user);
            this.emit('ready', bridge);
        }
        catch (e) {
            this.emit('error', e);
        }
    }
    async _getBridge() {
        if (this.id) {
            return await Bridge_1.default.one(this.id);
        }
        const bridges = await Bridge_1.default.all();
        if (!bridges.length) {
            throw 'bridge not found';
        }
        return bridges[0];
    }
}
exports.App = App;
//# sourceMappingURL=index.js.map