export interface BaseEntity {
    id: number;
    created: Date;
    modified: Date;
    deleted?: Date;
}