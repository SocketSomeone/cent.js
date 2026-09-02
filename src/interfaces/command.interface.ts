import type { CentResponses } from './cent-responses.interface.js';
import type { CentParams } from './cent-params.interface.js';
import type { CentMethods } from '../cent-methods.enum.js';

export interface Command<M extends CentMethods> {
	method: M;
	params: CommandParams<M>;
}

export type CommandParams<M extends CentMethods> = CentParams[M];

export type CommandResponse<M extends CentMethods> = CentResponses[M];
