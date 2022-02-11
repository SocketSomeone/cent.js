export interface PublishResult {
	offset?: number;
	epoch?: string;
}

export interface OverrideResult {
	presence?: boolean;
	join_leave?: boolean;
	position?: boolean;
	recover?: boolean;
}

export interface ClientInfo {
	client: string;
	user: string;
	conn_info?: Record<string, any>;
	chan_info?: Record<string, any>;
}

export type PresenceResult = { presence: Record<string, ClientInfo> };

export type PresenceStatsResult = {
	num_clients: number;
	num_users: number;
};

export type ChannelsResult = { channels: Record<string, Omit<PresenceStatsResult, 'num_users'>> };

interface Node {
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

export interface HistoryResult {
	epoch: string;
	offset: string;
	publications: Array<{ data: Record<string, any>; offset: number }>;
}

export type EmptyResult = {};

export type InfoResult = { nodes: Node[] };
