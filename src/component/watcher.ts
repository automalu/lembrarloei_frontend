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
        console.log(prop, target)
        if (prop == "[[handler]]") {
            return { configurable: true, enumerable: true, value: this };
        }
        if (prop == "[[isproxy]]") {
            return { configurable: true, enumerable: true, value: "isproxy" };
        }
        return { configurable: true, enumerable: true, value: target[prop] };
    }
    pushComponent(...component: any[]) {
        this.newComponent.push(...component)
    }
    get(target: any, key: string, receiver: any): any {
        if (typeof target[key] === 'object' && target[key] !== null && Object.getOwnPropertyDescriptor(target[key], '[[isproxy]]')?.value !== "isproxy") {
            console.log(target[key])
            return new Proxy(target[key], new Watcher(receiver, key, this.newComponent))
        } else {
            return target[key];
        }
    }
    set(target: any, key: string, value: any, receiver: any) {
        console.log(target)
        target[key as keyof typeof target] = value
        if (this.parent === null)
            this.newComponent.forEach(n => n.create(receiver));
        else this.parent[this.key] = target
        return true
    }

    enumerate(target: any, key: string) {
        console.log(Object.keys(target))
        return Object.keys(target);
    }
    ownKeys(target: any) {
        console.log(Object.keys(target))
        return Object.keys(target);
    }
    has(target: any, key: string) {
        console.log("entrou no has", key in target)
        return key in target || target.hasItem(key);
    }
}