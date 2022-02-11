import { CentClient } from './index';

describe('Centrifugo API Client', () => {
	const client = new CentClient({
		host: process.env.CENTRIFUGO_HOST,
		token: process.env.CENTRIFUGO_TOKEN
	});

	it('should return info', async () => {
		const { nodes } = await client.getInfo();

		expect(Array.isArray(nodes)).toBeTruthy();
	});
});
