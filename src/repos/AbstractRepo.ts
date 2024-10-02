import { BaseEntity } from "../models/BaseEntity";
import { Repo } from "./Repo";

//TODO: Create a type called 'CreateType' that is a derivative of T that omits id
export abstract class AbstractRepo<T extends BaseEntity> implements Repo<T> {
    abstract getAll(): Promise<T[]>;
    /*
    * Read data
    */
    abstract getById(id: number): Promise<T | null>;
    /*
    * Read data
    * Find the record with the given id in the data
    */
    abstract create(item: Omit<T, 'id'>): Promise<T>;
    /*
    * Read data
    * Create a new record from item
    * Update and save the data
    */
    abstract update(id: number, item: Partial<Omit<T, 'id'>>): Promise<T | null>;
    /*
    * Read data
    * Find the record with the given id in the data
    * Update the record with item
    * Set it's modified property to current Date
    * Update and save the data
    */
    abstract delete(id: number): Promise<boolean>;
    /*
    * Read data
    * Find the record with the given id in the data
    * Set it's deleted property to current Date
    * Update and save the data
    */
}