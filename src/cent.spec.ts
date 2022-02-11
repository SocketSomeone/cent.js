import { CentClient } from './index';

describe('Centrifuge', () => {
	const client = new CentClient({
		host: 'https://gateway.fotrum.space/api',
		token: 'my_api_key'
	});

	it('should return info', async () => {
		const { nodes } = await client.getInfo();

		expect(Array.isArray(nodes)).toBeTruthy();
	});
});
