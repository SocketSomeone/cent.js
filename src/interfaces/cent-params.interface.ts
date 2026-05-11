import type { StreamPosition } from './stream-position.interface';
import type { FilterNode } from './filter-node.interface';
import type { CentMethods } from '../cent-methods.enum';

type UserParams = { user: string };

type ChannelParams = { channel: string };

type TagsFilterParams = { tagsFilter?: FilterNode };

type DataParams = { data: Record<string, any> };

type TagsParams = { tags?: Record<string, string> };

type SkipHistoryParams = { skip_history?: boolean };

type ClientParams = { client?: string };

type PublishParams = ChannelParams & DataParams & SkipHistoryParams & TagsParams;

type BroadcastParams = { channels: string[] } & DataParams & SkipHistoryParams & TagsParams;

type SubscribeParams = ChannelParams & ClientParams & TagsFilterParams & UserParams;

type UnsubscribeParams = ChannelParams & ClientParams & UserParams;

type DisconnectParams = ClientParams & UserParams;

type RefreshParams = ClientParams & UserParams;

type ChannelsParams = { pattern: string };

type InfoParams = object;

type HistoryParams = {
	since?: StreamPosition;
	limit?: number;
	reverse?: boolean;
} & ChannelParams;

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
