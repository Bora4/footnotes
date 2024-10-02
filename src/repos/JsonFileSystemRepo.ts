import { FileSystemRepo } from "./FileSystemRepo";
//TODO: delete this
export interface JsonFileSystemRepo<T> extends FileSystemRepo<T> {
    readData(): Promise<T[]>;
    writeData(data: T[]): Promise<void>;
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T | null>;
    create(item: Omit<T, 'id'>): Promise<T>;
    update(id: number, item: Partial<Omit<T, 'id'>>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
    
}
