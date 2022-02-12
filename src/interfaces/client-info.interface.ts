export interface ClientInfo {
	client: string;
	user: string;
	conn_info?: Record<string, any>;
	chan_info?: Record<string, any>;
}
