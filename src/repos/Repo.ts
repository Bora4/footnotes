export interface Repo<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T | null>;
    create(item: T): Promise<T>;
    update(id: number, item: T): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}