import axios, { AxiosResponse } from 'axios';

export interface HTTPHeaders {
	[key: string]: string;
}

export type HTTPBody = any;

export interface Config {
	caching: boolean;
	headers: HTTPHeaders;
}

const defaultConfig: Config = {
	caching: false,
	headers: {
		'content-type': 'application/json',
	},
};

export type Query = { [key: string]: any };
export type PathParams = { [key: string]: any };

export function createQuery(query: Query): string {
	return Object.keys(query)
		.map((key) => `${key}=${query[key]}`)
		.join('&');
}

export function fillPathParameters(path: string, pathParams: PathParams, delimiter: string = '#'): string {
	let resultURL = `${path}`;

	for (const key of Object.keys(pathParams)) {
		resultURL.replace(`${delimiter}${key}`, pathParams[key]);
	}

	return resultURL;
}

export default class RestClient {
	private config: Config;

	constructor(config?: Partial<Config>) {
		this.config = {
			...defaultConfig,
			...config,
			headers: {
				...defaultConfig.headers,
				...config?.headers,
			},
		};
	}

	public get(url: string, additionalHeaders?: HTTPHeaders): Promise<AxiosResponse<any>> {
		return axios.get(url, {
			headers: {
				...this.config.headers,
				...additionalHeaders,
			},
		});
	}

	public post(url: string, body: HTTPBody, additionalHeaders?: HTTPHeaders): Promise<AxiosResponse<any>> {
		return axios.post(url, body, {
			headers: {
				...this.config.headers,
				...additionalHeaders,
			},
		});
	}

	public put(url: string, body: HTTPBody, additionalHeaders?: HTTPHeaders): Promise<AxiosResponse<any>> {
		return axios.put(url, body, {
			headers: {
				...this.config.headers,
				...additionalHeaders,
			},
		});
	}

	public delete(url: string, body: HTTPBody = {}, additionalHeaders?: HTTPHeaders): Promise<AxiosResponse<any>> {
		return axios.put(url, body, {
			headers: {
				...this.config.headers,
				...additionalHeaders,
			},
		});
	}

	public setHeader(header: string, value: string): void {
		this.config.headers = {
			...this.config.headers,
			[header]: value,
		};
	}

	public getHeader(header: string): string {
		return this.config.headers[header];
	}

	public removeHeader(header: string): void {
		delete this.config.headers[header];
	}
}
