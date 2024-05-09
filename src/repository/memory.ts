import Repository from ".";
let data: { [key: string]: any[] } = {};
type cbCollection = (value: any, type: string, triggerid: string) => void
type cbAny = (collection: string, value: any, type: string, triggerid: string) => void
export default class RepositoryMemory implements Repository {

    methodsMap: {[key: string]: any} = {
        "create": this.create.bind(this),
        "update": this.updateAdapter.bind(this),
        "delete": this.delete.bind(this),
    }
    deleteTrigger(collection: string, type: string, triggerid: string): void {
        delete this.listeners[collection][type][triggerid]
    }
    listeners: { [key: string]: { [key: string]: any } } = {
        "all": {}
    }
    createTriggerTo<T extends string | "all">(collection: T, cb: (T extends "all" ? cbAny : cbCollection), ...types: Array<"create" | "read" | "update" | "delete">): string {
        if (!Object.prototype.hasOwnProperty.call(this.listeners, collection))
            this.listeners[collection] = {}

        const triggerid = crypto.randomUUID()
        for (const type of types) {
            if (Object.prototype.hasOwnProperty.call(this.listeners[collection], type))
                this.listeners[collection][type][triggerid] = cb
            else this.listeners[collection][type] = { [triggerid]: cb }
        }
        return triggerid
    }

    fireTrigger(collection: string, value: any, type: string) {
        const has = Object.prototype.hasOwnProperty
        if (has.call(this.listeners, collection) && has.call(this.listeners[collection], type)) {
            for (const triggerid in this.listeners[collection][type]) {
                this.listeners[collection][type][triggerid](value, type, triggerid)
            }
            if (has.call(this.listeners["all"], type))
                for (const triggerid in this.listeners["all"][type]) {
                    this.listeners["all"][type][triggerid](collection, value, type, triggerid)
                }
        }
    }
    async create(collection: string, value: any): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            data[collection] = []

        data[collection].push(value)
        this.fireTrigger(collection, value, "create")
        return [value, false]
    }

    updateAdapter(collection:string, payload: {id: string, value: any}): Promise<[any, boolean]> {
        return this.update(collection, payload.id, payload.value)
    }

    async update(collection: string, id: string, value: any): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        data[collection].forEach(e => {
            if(e._id === id) Object.assign(e, value)
        })
        
        this.fireTrigger(collection, {id, value}, "update")
        return [id, false]
    }
    updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    updateMany(collection: string, query: any, value: any): Promise<[any, boolean]> {
        throw new Error("Method not implemented.");
    }
    async delete(collection: string, id: string): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        const index = data[collection].findIndex(i => i._id === id)
        if (index < 0) return [{ deleteCount: 0 }, false]
        data[collection].splice(index, 1)
        this.fireTrigger(collection, id, "delete")
        return [id, false]
    }
    deleteMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }

    findManySortLimit(collection: string, query: { [index: string]: any; }, limit: number, sort: 1 | -1): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }

    async findMany(collection: string, query: { [index: string]: any; }): Promise<[any[], boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return [["colecao invalida"], true]

        const list: any[] = []
        for (const item of data[collection]) {
            if (this.check(item, query)) list.push(item)
        }
        return [list, false]
    }
    async findOne(collection: string, query: { [index: string]: any; }): Promise<[any, boolean]> {
        if (!Object.prototype.hasOwnProperty.call(data, collection))
            return ["colecao invalida", true]
        for (const item of data[collection]) {
            if (this.check(item, query)) return [item, false]
        }
        return ["nao encontrado", true]
    }

    check(item: any, query: any) {
        for (const key in query) {
            if (item[key] !== query[key]) return false
        }
        return true
    }
    read(collection: string, query: any): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    readMany(collection: string, id: string): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    readMore(collection: string, query: any): Promise<[any[], boolean]> {
        throw new Error("Method not implemented.");
    }
    usecase<T>(name: string, data?: any): Promise<[T, boolean]> {
        throw new Error("Method not implemented.");
    }
}