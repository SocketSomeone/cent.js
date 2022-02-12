import { CentMethods } from './cent-methods.enum';
import { ClientInfo, Node, StreamPosition } from './interfaces';

export type PublishResponse = Partial<StreamPosition>;

export interface OverrideResponse {
	presence?: boolean;
	join_leave?: boolean;
	position?: boolean;
	recover?: boolean;
}

export type PresenceResponse = { presence: Record<string, ClientInfo> };

export type PresenceStatsResponse = {
	num_clients: number;
	num_users: number;
};

export type ChannelsResponse = { channels: Record<string, Omit<PresenceStatsResponse, 'num_users'>> };

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
