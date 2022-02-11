import axios from 'axios';
import { CentOptions } from './cent-options.interface';
import { CentParams, StreamPosition } from './cent-params.interface';
import { CentException } from './cent.exception';
import {
	ChannelsResult,
	EmptyResult,
	HistoryResult,
	InfoResult,
	OverrideResult,
	PresenceResult,
	PresenceStatsResult,
	PublishResult
} from './cent-responses.interface';
import { CentMethods } from './cent-methods.enum';

export class CentClient {
	private readonly options: CentOptions;

	public constructor(options: CentOptions) {
		this.options = options;
	}

	private send<M extends CentMethods>(method: M, params: CentParams[M]) {
		return axios({
			method: 'POST',
			url: this.options.host,
			timeout: this.options.timeout,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `apikey ${this.options.token}`
			},
			data: { method, params }
		})
			.then(({ data }) => data?.result)
			.catch(err => {
				throw new CentException(err);
			});
	}

	public publish(channel: string, data: Record<string, any>, skip = false): Promise<PublishResult> {
		return this.send(CentMethods.Publish, {
			channel,
			data,
			skip_history: skip
		});
	}

	public broadcast(channels: string[], data: Record<string, any>, skip = false): Promise<PublishResult[]> {
		return this.send(CentMethods.Broadcast, {
			channels,
			data,
			skip_history: skip
		});
	}

	public subscribe(user: string, channel: string, client?: string): Promise<OverrideResult> {
		return this.send(CentMethods.Subscribe, {
			user,
			channel,
			client
		});
	}

	public unsubscribe(user: string, channel: string, client?: string): Promise<EmptyResult> {
		return this.send(CentMethods.Unsubscribe, {
			user,
			channel,
			client
		});
	}

	public disconnect(user: string, client?: string): Promise<EmptyResult> {
		return this.send(CentMethods.Disconnect, {
			user,
			client
		});
	}

	public refresh(user: string, client?: string): Promise<EmptyResult> {
		return this.send(CentMethods.Refresh, {
			user,
			client
		});
	}

	public getPresence(channel: string): Promise<PresenceResult> {
		return this.send(CentMethods.Presence, { channel });
	}

	public getPresenceStats(channel: string): Promise<PresenceStatsResult> {
		return this.send(CentMethods.PresenceStats, { channel });
	}

	public getHistory(channel: string, limit = 0, since: StreamPosition, reverse = false): Promise<HistoryResult> {
		return this.send(CentMethods.History, {
			channel,
			limit,
			since,
			reverse
		});
	}

	public removeHistory(channel: string): Promise<EmptyResult> {
		return this.send(CentMethods.HistoryRemove, { channel });
	}

	public getChannels(pattern = ''): Promise<ChannelsResult> {
		return this.send(CentMethods.Channels, { pattern });
	}

	public getInfo(): Promise<InfoResult> {
		return this.send(CentMethods.Info, {});
	}
}
