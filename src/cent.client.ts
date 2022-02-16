import axios from 'axios';
import { CentOptions } from './cent-options.interface';
import { CentParams } from './cent-params.interface';
import { CentException } from './cent.exception';
import { CentResponses } from './cent-responses.interface';
import { CentMethods } from './cent-methods.enum';

export class CentClient {
	private readonly options: CentOptions;

	public constructor(options: CentOptions) {
		this.options = options;
	}

	private methodFactory<M extends CentMethods>(method: M) {
		return (params?: CentParams[M]): Promise<CentResponses[M]> =>
			axios({
				method: 'POST',
				url: this.options.url,
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
}
