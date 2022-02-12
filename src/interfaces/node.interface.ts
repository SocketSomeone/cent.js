export interface Node {
	name: string;
	num_channels: number;
	num_clients: number;
	num_users: number;
	uid: string;
	uptime: number;
	version: string;
	metrics: NodeMetrics;
}

interface NodeMetrics {
	interval: number;
	items: Record<string, number>;
}
