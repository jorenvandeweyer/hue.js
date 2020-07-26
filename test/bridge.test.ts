import Bridge from '../src/models/Bridge';
import dotenv from 'dotenv'

dotenv.config();

test('Has active bridge on network', async () => {
  const bridges = await Bridge.all();

  expect(bridges.length).toBeGreaterThan(0);
});

test('Find personal bridge from .evn', async () => {
  const { HUE_BRIDGE_ID } = process.env;

  if (!HUE_BRIDGE_ID) return false;

  const bridge = await Bridge.one(HUE_BRIDGE_ID);

  expect(bridge).toBeDefined();
});
