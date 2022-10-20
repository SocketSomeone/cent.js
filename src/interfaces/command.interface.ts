import { CentMethods } from '../cent-methods.enum';
import { CentParams } from './cent-params.interface';
import { CentResponses } from './cent-responses.interface';

export interface Command<M extends CentMethods> {
	method: M;
	params: CommandParams<M>;
}

export type CommandParams<M extends CentMethods> = CentParams[M];

export type CommandResponse<M extends CentMethods> = CentResponses[M];
