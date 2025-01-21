import { CentMethods } from '../cent-methods.enum';
import { ClientInfo, Node, Publication, StreamPosition } from './index';

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

export type HistoryResponse = StreamPosition & {
	publications: Array<Publication>;
};

export type EmptyResponse = object;

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
