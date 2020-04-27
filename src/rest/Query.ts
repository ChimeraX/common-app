export default interface Query {
	[key: string]: any;
}

export function createQuery(query: Query): string {
	return Object.keys(query)
		.map((key) => `${key}=${query[key]}`)
		.join('&');
}
