import Repository from ".";

export default class RepositoryApiSQL implements Repository {
    methodsMap: { [key: string]: any; } = {};
    createTriggerTo<T extends string>(collection: T, cb: T extends "all" ? (collection: string, value: any, type: string, triggerid: string) => void : (value: any, type: string, triggerid: string) => void, ...types: ("create" | "read" | "update" | "delete")[]): string {
        throw new Error("Method not implemented.");
    }
    deleteTrigger(collection: string, type: string, triggerid: string): void {
        throw new Error("Method not implemented.");
    }
    
    url: string = "https://lembrarloei.automalu.com/api"
    //url: string = "http://localhost:41062/www/api"
    
    msgId() {
        return new Array(25).join("0").replace(/[018]/g, (c: any) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(24)
        );
    }
    
    
    async create(collection: string, value: any): Promise<[any, boolean]> {
        const event = `db/create/${collection}`
        return new Promise(async res => {
            await fetch(`${this.url}/${event}`, {
                method: "POST",
                body: new URLSearchParams(value),
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
                }
            }).then(response => response.json())
                .then(json => res(json));
        })
    }
    
    async usecase(name: string, data?: any): Promise<any> {
        const event = `uc/${name}`
        return new Promise(async res => {
            await fetch(`${this.url}/${event}`, data ? {
                method: "POST",
                body: new URLSearchParams(data)
            } : {
                method: "GET"
            }).then(response => response.json())
                .then(json => res(json));
        })
    }

    async read(collection: string, query: any): Promise<[any, boolean]> {
        const event = `db/readMany/${collection}`
        return new Promise(async res => {
            await fetch(`${this.url}/${event}`, {
                method: "POST",
                body: new URLSearchParams(query),
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
                }
            }).then(response => response.json())
                .then(json => res(json));
        })
    }

    async readMany(collection: string, query: any): Promise<[any, boolean]> {
        const event = `db/readMany/${collection}`
        return new Promise(async res => {
            await fetch(`${this.url}/${event}`, {
                method: "POST",
                body: new URLSearchParams(query),
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
                }
            }).then(response => response.json())
                .then(json => res(json));
        })
    }

    async readMore(collection: string, query: any): Promise<[any, boolean]> {
        const event = `db/readMore/${collection}`
        return new Promise(async res => {
            await fetch(`${this.url}/${event}`, {
                method: "POST",
                body: new URLSearchParams(query)
            }).then(response => response.json())
                .then(json => res(json));
        })
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