import Repository from ".";
export default class RepositoryEmpty implements Repository {
    create(collection: string, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    update(collection: string, id: string, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    updateMany(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    delete(collection: string, id: string): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    deleteMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    findMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    findManySortLimit(collection: string, query: { [index: string]: any; }, limit: number, sort: 1 | -1): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    findOne(collection: string, query: { [index: string]: any; }): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
}