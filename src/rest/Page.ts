export default interface Page<T> {
	content: T[];
	pageable: Pageable;
	totalPages: number;
	last: boolean;
	totalElements: number;
	size: number;
	number: number;
	sort: Sort;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
}

export interface Pageable {
	sort: Sort;
	offset: number;
	pageSize: number;
	pageNumber: number;
	paged: boolean;
	unpaged: boolean;
}

export interface Sort {
	sorted: boolean;
	unsorted: boolean;
	empty: boolean;
}
