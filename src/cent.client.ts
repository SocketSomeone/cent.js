import { CentException } from './cent.exception';
import { CentOptions, Command, CommandParams, CommandResponse } from './interfaces';
import { CentMethods } from './cent-methods.enum';
import { fetch } from 'undici';
import { BodyInit } from 'undici/types/fetch';

export class CentClient {
	public constructor(private readonly centOptions: CentOptions) {}

	private async post<T = any>(url: string, data: BodyInit): Promise<T> {
		return fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `apikey ${this.centOptions.token}`
			}
		}).then(res => res.json() as any);
	}

	private methodFactory<M extends CentMethods>(method: M) {
		return (params?: CommandParams<M>): Promise<CommandResponse<M>> =>
			this.post(this.centOptions.url, JSON.stringify({ method, params }))
				.then(res => res?.result)
				.catch(err => {
					throw new CentException(err);
				});
	}

	public publish = this.methodFactory(CentMethods.Publish);

	public broadcast = this.methodFactory(CentMethods.Broadcast);

	public subscribe = this.methodFactory(CentMethods.Subscribe);

	public unsubscribe = this.methodFactory(CentMethods.Unsubscribe);

	public disconnect = this.methodFactory(CentMethods.Disconnect);

	public refresh = this.methodFactory(CentMethods.Refresh);

	public getPresence = this.methodFactory(CentMethods.Presence);

	public getPresenceStats = this.methodFactory(CentMethods.PresenceStats);

	public getHistory = this.methodFactory(CentMethods.History);

	public removeHistory = this.methodFactory(CentMethods.HistoryRemove);

	public getChannels = this.methodFactory(CentMethods.Channels);

	public getInfo = this.methodFactory(CentMethods.Info);

	public pipeline<C extends CentMethods>(commands: Command<C>[]): Promise<CommandResponse<C>[]> {
		return this.post('', commands.map(({ method, params }) => JSON.stringify({ method, params })).join('\n'))
			.then(res =>
				res.data
					.split('\n')
					.map(JSON.parse)
					.map(({ result }) => result)
			)
			.catch(err => {
				throw new CentException(err);
			});
	}
}
