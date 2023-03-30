import { ZeyoAppConstructor } from "./lib"

export default function Repository<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        repository: any
        setRepository(repository: any) {
            this.repository = repository
            return this
        }
    }
}