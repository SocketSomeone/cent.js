import type { CentMethods } from '../cent-methods.enum';
import type { FilterNode } from './filter-node.interface';
import type { StreamPosition } from './stream-position.interface';

type UserParams = { user: string };

type ChannelParams = { channel: string };

type TagsFilterParams = { tagsFilter?: FilterNode };

type DataParams = { data: Record<string, any> };

type TagsParams = { tags?: Record<string, string> };

type SkipHistoryParams = { skip_history?: boolean };

type ClientParams = { client?: string };

type PublishParams = ChannelParams & DataParams & TagsParams & SkipHistoryParams;

type BroadcastParams = DataParams & TagsParams & SkipHistoryParams & { channels: string[] };

type SubscribeParams = UserParams & ChannelParams & ClientParams & TagsFilterParams;

type UnsubscribeParams = UserParams & ChannelParams & ClientParams;

type DisconnectParams = UserParams & ClientParams;

type RefreshParams = UserParams & ClientParams;

type ChannelsParams = { pattern: string };

type InfoParams = object;

type HistoryParams = ChannelParams & {
	since?: StreamPosition;
	limit?: number;
	reverse?: boolean;
};

export interface CentParams {
	[CentMethods.Publish]: PublishParams;
	[CentMethods.Broadcast]: BroadcastParams;
	[CentMethods.Subscribe]: SubscribeParams;
	[CentMethods.Unsubscribe]: UnsubscribeParams;
	[CentMethods.Disconnect]: DisconnectParams;
	[CentMethods.Refresh]: RefreshParams;
	[CentMethods.Presence]: ChannelParams;
	[CentMethods.PresenceStats]: ChannelParams;
	[CentMethods.History]: HistoryParams;
	[CentMethods.HistoryRemove]: ChannelParams;
	[CentMethods.Channels]: ChannelsParams;
	[CentMethods.Info]: InfoParams;
}
