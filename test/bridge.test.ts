import Bridge from '../src/models/Bridge';
import dotenv from 'dotenv'

dotenv.config();

test('Has active bridge on network', async () => {
  const bridges = await Bridge.all();

  expect(bridges.length).toBeGreaterThan(0);
});

test('Find personal bridge from .env', async () => {
  const { HUE_BRIDGE_ID } = process.env;

  expect(HUE_BRIDGE_ID).toBeDefined();
  if (!HUE_BRIDGE_ID) return;

  const bridge = await Bridge.one(HUE_BRIDGE_ID);

  expect(bridge).toBeDefined();
});

test('Authenticate to bridge from .env', async () => {
  const { HUE_BRIDGE_ID, HUE_USER } = process.env;

  expect(HUE_BRIDGE_ID).toBeDefined();
  expect(HUE_USER).toBeDefined();
  if (!HUE_BRIDGE_ID || !HUE_USER) return;

  const bridge = await Bridge.one(HUE_BRIDGE_ID);

  const config = await bridge?.authenticate(HUE_USER);

  expect(config).not.toBeNull();
});

test('False authentication', async () => {
  const { HUE_BRIDGE_ID } = process.env;

  expect(HUE_BRIDGE_ID).toBeDefined();
  if (!HUE_BRIDGE_ID) return;

  const bridge = await Bridge.one(HUE_BRIDGE_ID);

  await bridge?.authenticate('fake');

  try {
    await bridge?.request({
      url: '/'
    });
    expect(false).toBeTruthy();
  } catch(e) {
    expect(e).toBeDefined();
  }
});
