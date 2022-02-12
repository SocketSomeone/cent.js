import { CentMethods } from './cent-methods.enum';
import { StreamPosition } from './interfaces';

type UserParams = { user: string };

type ChannelParams = { channel: string };

type DataParams = { data: Record<string, any> };

type SkipHistoryParams = { skip_history?: boolean };

type ClientParams = { client: string };

type PublishParams = ChannelParams & DataParams & SkipHistoryParams;

type BroadcastParams = DataParams & SkipHistoryParams & { channels: string[] };

type SubscribeParams = UserParams & ChannelParams & ClientParams;

type UnsubscribeParams = UserParams & ChannelParams & ClientParams;

type DisconnectParams = UserParams & ClientParams;

type RefreshParams = UserParams & ClientParams;

type ChannelsParams = { pattern: string };

type InfoParams = {};

export interface CentParams {
	[CentMethods.Publish]: PublishParams;
	[CentMethods.Broadcast]: BroadcastParams;
	[CentMethods.Subscribe]: SubscribeParams;
	[CentMethods.Unsubscribe]: UnsubscribeParams;
	[CentMethods.Disconnect]: DisconnectParams;
	[CentMethods.Refresh]: RefreshParams;
	[CentMethods.Presence]: ChannelParams;
	[CentMethods.PresenceStats]: ChannelParams;
	[CentMethods.History]: ChannelParams & {
		since?: StreamPosition;
		limit?: number;
		reverse?: boolean;
	};
	[CentMethods.HistoryRemove]: ChannelParams;
	[CentMethods.Channels]: ChannelsParams;
	[CentMethods.Info]: InfoParams;
}
