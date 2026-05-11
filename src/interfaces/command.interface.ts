import type { CentResponses } from './cent-responses.interface';
import type { CentParams } from './cent-params.interface';
import type { CentMethods } from '../cent-methods.enum';

export interface Command<M extends CentMethods> {
	method: M;
	params: CommandParams<M>;
}

export type CommandParams<M extends CentMethods> = CentParams[M];

export type CommandResponse<M extends CentMethods> = CentResponses[M];
