import Bridge from '../src/models/Bridge';
import Light from '../src/models/Light';
import dotenv from 'dotenv';

dotenv.config();

let bridge : Bridge|undefined;

async function getTestLight() : Promise<Light> {
    const { HUE_TEST_LIGHT } = process.env;

    if (!HUE_TEST_LIGHT) throw 'Test light id not found';

    const light = bridge?.Light.one(HUE_TEST_LIGHT);
    if (!light) throw 'Test light not found';

    return light;
}

beforeAll(async () => {
    const { HUE_BRIDGE_ID, HUE_USER } = process.env;

    if (!HUE_BRIDGE_ID || !HUE_USER) return;

    bridge = await Bridge.one(HUE_BRIDGE_ID);
    await bridge?.authenticate(HUE_USER);
});

test('Get all lights', async () => {
    const lights = await bridge?.Light.all();

    expect(lights).toBeDefined();
});

test('Get light', async () => {
    const light = await getTestLight();

    expect(light).toBeDefined();
});

test('Toggle light', async () => {
    const light = await getTestLight();

    const firstState = light.state.on;

    await light.toggle();

    const secondState = light.state.on;

    expect(firstState).not.toBe(secondState);
});
