export interface HTTPHeaders {
	[key: string]: string;
}

export type HTTPBody = any;

export interface Parameters {
	[key: string]: any;
}

interface Pagination {
	page: number;
	size: number;
}

export type RequestParameters = Exclude<Parameters, Pagination>;

export interface PathParameters {
	[key: string]: any;
}

export default interface ChimeraXRequest {
	body?: HTTPBody;
	headers?: HTTPHeaders;
	pathParameters: PathParameters;
	requestParameters: RequestParameters;
	isPaginated?: boolean;
	page?: number;
	size?: number;
}
