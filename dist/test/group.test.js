"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bridge_1 = __importDefault(require("../src/models/Bridge"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let bridge;
async function getTestGroup() {
    const { HUE_GROUP } = process.env;
    console.log(HUE_GROUP);
    if (!HUE_GROUP)
        throw 'Test group not found';
    const group = bridge?.Group.one(HUE_GROUP);
    if (!group)
        throw 'Test group not found';
    return group;
}
beforeAll(async () => {
    const { HUE_BRIDGE_ID, HUE_USER } = process.env;
    if (!HUE_BRIDGE_ID || !HUE_USER)
        return;
    bridge = await Bridge_1.default.one(HUE_BRIDGE_ID);
    await bridge?.authenticate(HUE_USER);
});
test('Get all groups', async () => {
    const groups = await bridge?.Group.all();
    if (!groups) {
        throw 'Getting all groups failed';
    }
    expect(groups).toBeDefined();
});
test('Get group', async () => {
    const group = await getTestGroup();
    const firstState = group.state.any_on;
    await group.toggle();
    const secondState = group.state.any_on;
    expect(firstState).not.toBe(secondState);
});
//# sourceMappingURL=group.test.js.map