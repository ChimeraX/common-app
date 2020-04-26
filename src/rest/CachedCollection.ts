import ChimeraXEntity from '../model/ChimeraXEntity';

export type Predicate<T> = (t: T) => boolean;

export class CachedCollection<Entity extends ChimeraXEntity = ChimeraXEntity> {
	private entities: Entity[];
	private static defaultPredicate = (_: any) => true;

	constructor(entities: Entity[] = []) {
		this.entities = entities;
	}

	public count(): number {
		return this.entities.length;
	}

	public findById(id: number): Entity | undefined {
		return this.entities.find(this.byId(id));
	}

	public findBy(count: number, ...filters: Predicate<Entity>[]): Entity[] {
		return this.entities.filter(this.combineFilters(...filters)).slice(0, count);
	}

	public saveAll(entities: Entity[], position: number = 0): void {
		this.entities = [...this.entities.slice(0, position), ...entities, ...this.entities.slice(position)];
	}

	public save(entity: Entity): void {
		const index = this.entities.findIndex(this.byId(entity.id));
		this.entities[index] = entity;
	}

	private byId(id: number): Predicate<Entity> {
		return (entity) => entity.id === id;
	}

	private combineFilters(...filters: Predicate<Entity>[]): Predicate<Entity> {
		return filters.reduce((acc, filter) => {
			return (entity: Entity) => acc(entity) && filter(entity);
		}, CachedCollection.defaultPredicate);
	}
}
