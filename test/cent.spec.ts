import { CentClient } from '../src';

describe('Centrifugo API Client', () => {
	const client = new CentClient({
		url: process.env.CENTRIFUGO_HOST,
		apiKey: process.env.CENTRIFUGO_API_KEY
	});

	it('should return info', async () => {
		const { nodes } = await client.getInfo();

		expect(Array.isArray(nodes)).toBeTruthy();
	});
});
