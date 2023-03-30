export class Watcher implements ProxyHandler<any> {
    key = ""
    parent: any
    newComponent: any
    constructor(parent: any, key: string, newComponent: any) {
        this.key = key
        this.parent = parent
        this.newComponent = newComponent
    }
    get(target: any, key: string, receiver: any): any {
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], new Watcher(receiver, key, this.newComponent))
        } else {
            return target[key];
        }
    }
    set(target: any, key: string, value: any, receiver: any) {
        target[key as keyof typeof target] = value
        if (this.parent === null)
            this.newComponent.create(receiver)
        else this.parent[this.key] = target
        return true
    }
}