import { CentMethods } from './cent-methods.enum';
import { StreamPosition } from './cent-params.interface';

export interface PublishResponse {
	offset?: number;
	epoch?: string;
}

export interface OverrideResponse {
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

export type PresenceResponse = { presence: Record<string, ClientInfo> };

export type PresenceStatsResponse = {
	num_clients: number;
	num_users: number;
};

export type ChannelsResponse = { channels: Record<string, Omit<PresenceStatsResponse, 'num_users'>> };

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

export interface HistoryResponse {
	epoch: string;
	offset: string;
	publications: Array<{ data: Record<string, any>; offset: number }>;
}

export type EmptyResponse = {};

export type InfoResponse = { nodes: Node[] };

export interface CentResponses {
	[CentMethods.Publish]: PublishResponse;
	[CentMethods.Broadcast]: PublishResponse[];
	[CentMethods.Subscribe]: OverrideResponse;
	[CentMethods.Unsubscribe]: EmptyResponse;
	[CentMethods.Disconnect]: EmptyResponse;
	[CentMethods.Refresh]: EmptyResponse;
	[CentMethods.Presence]: PresenceResponse;
	[CentMethods.PresenceStats]: PresenceStatsResponse;
	[CentMethods.History]: HistoryResponse;
	[CentMethods.HistoryRemove]: EmptyResponse;
	[CentMethods.Channels]: ChannelsResponse;
	[CentMethods.Info]: InfoResponse;
}
