export class Watcher implements ProxyHandler<any> {
    key = ""
    parent: any
    newComponent: any[]
    constructor(parent: any, key: string, newComponent: any[]) {
        this.key = key
        this.parent = parent
        this.newComponent = newComponent
    }
    getOwnPropertyDescriptor(target: any, prop: any) {
        if (prop == "[[handler]]") {
            return { configurable: true, enumerable: true, value: this };
        }
        return undefined;
    }
    pushComponent(...component: any[]){
        this.newComponent.push(...component)
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
            this.newComponent.forEach(n => n.create(receiver));
        else this.parent[this.key] = target
        return true
    }
}