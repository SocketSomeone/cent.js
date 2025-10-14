import type { CentMethods } from '../cent-methods.enum';
import type { StreamPosition } from './stream-position.interface';
import type { ClientInfo } from './client-info.interface';
import type { Publication } from './publication.interface';
import type { Node } from './node.interface';

export type PublishResponse = Partial<StreamPosition>;

export interface SubscribeResponse {
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

export type BroadcastResponse = PublishResponse[];

export interface CentResponses {
	[CentMethods.Publish]: PublishResponse;
	[CentMethods.Broadcast]: BroadcastResponse;
	[CentMethods.Subscribe]: SubscribeResponse;
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
