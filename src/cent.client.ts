import { CentException } from './cent.exception';
import type { CentOptions, Command, CommandParams, CommandResponse } from './interfaces';
import { CentMethods } from './cent-methods.enum';

export class CentClient {
	public constructor(private readonly centOptions: CentOptions) {}

	private async post(url: string, data: BodyInit): Promise<Response> {
		return fetch(url, {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': this.centOptions.apiKey
			}
		});
	}

	private methodFactory<M extends CentMethods>(method: M) {
		return (params?: CommandParams<M>): Promise<CommandResponse<M>> =>
			this.post(`${this.centOptions.url}/${method}`, JSON.stringify(params ?? {}))
				.then(res => res.json() as any)
				.then(res => {
					if (res?.error) {
						throw new CentException(res?.error);
					}

					return res?.result ?? {};
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
		return this.post(
			this.centOptions.url,
			commands.map(({ method, params }) => JSON.stringify({ method, params })).join('\n')
		)
			.then(res => res.text())
			.then(res =>
				res
					.split('\n')
					.map(str => JSON.parse(str))
					.map(({ result }) => result)
			)
			.catch(err => {
				throw new CentException(err);
			});
	}
}
