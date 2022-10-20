import { Axios } from 'axios';
import { CentException } from './cent.exception';
import { CentOptions, CentResponses, Command, CommandParams, CommandResponse } from './interfaces';
import { CentMethods } from './cent-methods.enum';

type Head<T extends readonly unknown[]> = T extends readonly [infer U, ...infer _] ? U : T[0] | undefined;

export class CentClient extends Axios {
	public constructor(private readonly centOptions: CentOptions) {
		super({
			baseURL: centOptions.url,
			timeout: centOptions.timeout,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `apikey ${centOptions.token}`
			}
		});
	}

	private methodFactory<M extends CentMethods>(method: M) {
		return (params?: CommandParams<M>): Promise<CommandResponse<M>> =>
			this.post('', JSON.stringify({ method, params }))
				.then(res => JSON.parse(res.data)?.result)
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
