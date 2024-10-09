import { UserResponse } from "../models/User";

//TODO: Create a type called 'CreateType' that is a derivative of T that omits id
//UserResponse is temporary here
//TODO: Create Response<T>
export interface Repo<T> {
    getAll(): Promise<T[] | UserResponse[]>;
    /*
    * Read data
    */
    getById(id: number): Promise<T | UserResponse | null>;
    /*
    * Read data
    * Find the record with the given id in the data
    */
    create(item: Omit<T, 'id'>): Promise<T | UserResponse>;
    /*
    * Read data
    * Create a new record from item
    * Update and save the data
    */
    update(id: number, item: Partial<Omit<T, 'id'>>): Promise<T | UserResponse | null>;
    /*
    * Read data
    * Find the record with the given id in the data
    * Update the record with item
    * Set it's modified property to current Date
    * Update and save the data
    */
    delete(id: number): Promise<boolean>;
    /*
    * Read data
    * Find the record with the given id in the data
    * Set it's deleted property to current Date
    * Update and save the data
    */
}