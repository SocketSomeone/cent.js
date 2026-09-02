import { CentClient } from '../src/index.js';

const centrifugoHost = process.env.CENTRIFUGO_HOST;

if (!centrifugoHost) {
	throw new Error('CENTRIFUGO_HOST is required to run the Centrifugo integration test');
}

describe('Centrifugo API Client', () => {
	const client = new CentClient({
		url: centrifugoHost,
		apiKey: process.env.CENTRIFUGO_API_KEY
	});

	it('should return info', async () => {
		const { nodes } = await client.getInfo();

		expect(Array.isArray(nodes)).toBeTruthy();
	});
});
