import Bridge from '../src/models/Bridge';
import Group from '../src/models/Group';
import dotenv from 'dotenv';

dotenv.config();

let bridge : Bridge|undefined;

async function getTestGroup() : Promise<Group> {
    const { HUE_GROUP } = process.env;
    console.log(HUE_GROUP);
    if (!HUE_GROUP) throw 'Test group not found';

    const group = bridge?.Group.one(HUE_GROUP);
    if (!group) throw 'Test group not found';

    return group;
}

beforeAll(async () => {
    const { HUE_BRIDGE_ID, HUE_USER } = process.env;

    if (!HUE_BRIDGE_ID || !HUE_USER) return;

    bridge = await Bridge.one(HUE_BRIDGE_ID);
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
