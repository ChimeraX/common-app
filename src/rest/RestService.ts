import { AxiosResponse } from 'axios';
import RestClient from './RestClient';
import Page from './Page';
import ChimeraXEntity from '../model/ChimeraXEntity';
import ChimeraXRequest, { PathParameters, RequestParameters } from './Requests';

export interface Config {
	caching?: boolean;
	delimiter?: string;
	pageSize?: number;
}

const defaultConfig: Config = {
	caching: false,
	delimiter: '#',
	pageSize: 20,
};

const defaultRequestConfig: ChimeraXRequest = {
	pathParameters: {},
	requestParameters: [],
};

export default class RestService<Entity extends ChimeraXEntity = ChimeraXEntity> {
	private restClient: RestClient;
	private config: Config;
	private defaultRequestConfig: ChimeraXRequest;

	constructor(restClient: RestClient, config?: Config) {
		this.restClient = restClient;
		this.config = {
			...defaultConfig,
			...config,
		};
		this.defaultRequestConfig = {
			...defaultRequestConfig,
			size: config?.pageSize,
		};
	}

	public findOne(path: string, pathParameters: PathParameters = {}): Promise<AxiosResponse<Entity>> {
		const url = this.fillPathParameters(path, pathParameters);
		return this.restClient.get(url);
	}

	public findAll(path: string, config: ChimeraXRequest): Promise<AxiosResponse<Page<Entity>>> {
		const url = this.buildURL(path, config);
		return this.restClient.get(url);
	}

	public save(path: string, config: ChimeraXRequest): Promise<AxiosResponse<any>> {
		const url = this.buildURL(path, config);
		return this.restClient.get(url);
	}

	private fillPathParameters(path: string, pathParameters: PathParameters = {}): string {
		const { delimiter } = this.config;

		let resultURL = `${path}`;

		for (const key of Object.keys(pathParameters)) {
			resultURL.replace(`${delimiter}${key}`, pathParameters[key]);
		}

		return resultURL;
	}

	private createQuery(requestParameters: RequestParameters = []): string {
		return Object.keys(requestParameters)
			.map((key) => `${key}=${requestParameters[key]}`)
			.join('&');
	}

	private buildURL(path: string, config: ChimeraXRequest): string {
		const { pathParameters, requestParameters, isPaginated, page = 0, size = this.config.pageSize } = config;

		const resultURL = this.fillPathParameters(path, pathParameters);

		let query = this.createQuery(requestParameters);

		if (isPaginated) {
			query = `${query}&page=${page}&size=${size}`;
		}

		return query === '' ? resultURL : `${resultURL}?${query}`;
	}
}
