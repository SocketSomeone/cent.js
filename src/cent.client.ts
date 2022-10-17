import {Axios} from 'axios';
import {CentException} from './cent.exception';
import {CentOptions, CentParams, CentResponses} from './interfaces';
import {CentMethods} from './cent-methods.enum';

export class CentClient extends Axios {
	public constructor(options: CentOptions) {
		super({
			baseURL: options.url,
			timeout: options.timeout,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `apikey ${options.token}`
			}
		});
	}

	private methodFactory<M extends CentMethods>(method: M) {
		return (params?: CentParams[M]): Promise<CentResponses[M]> =>
			this.post('/', {method, params})
				.then(({data}) => data?.result)
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
