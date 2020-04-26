import axios, { AxiosResponse } from 'axios';
import { HTTPBody, HTTPHeaders } from './Requests';

export default class RestClient {
	private headers: HTTPHeaders;

	constructor(headers?: HTTPHeaders) {
		this.headers = {
			'content-type': 'application/json',
			...headers,
		};
	}

	public get(url: string, additionalHeaders?: HTTPHeaders): Promise<AxiosResponse<any>> {
		return axios.get(url, {
			headers: {
				...this.headers,
				...additionalHeaders,
			},
		});
	}

	public post(url: string, body: HTTPBody, additionalHeaders?: HTTPHeaders): Promise<AxiosResponse<any>> {
		return axios.post(url, body, {
			headers: {
				...this.headers,
				...additionalHeaders,
			},
		});
	}

	public put(url: string, body: HTTPBody, additionalHeaders?: HTTPHeaders): Promise<AxiosResponse<any>> {
		return axios.put(url, body, {
			headers: {
				...this.headers,
				...additionalHeaders,
			},
		});
	}

	public delete(url: string, body: HTTPBody = {}, additionalHeaders?: HTTPHeaders): Promise<AxiosResponse<any>> {
		return axios.put(url, body, {
			headers: {
				...this.headers,
				...additionalHeaders,
			},
		});
	}

	public setHeader(header: string, value: string): void {
		this.headers = {
			...this.headers,
			[header]: value,
		};
	}

	public getHeader(header: string): string {
		return this.headers[header];
	}

	public removeHeader(header: string): void {
		delete this.headers[header];
	}
}
