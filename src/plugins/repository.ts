import Repository from "../repository"
import RepositoryApiSQL from "../repository/apiSQL"
import RepositoryEmpty from "../repository/empty"
import { ZeyoAppConstructor } from "./lib"

export default function Repository<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        repository = new RepositoryApiSQL()
        setRepository(repository: any) {
            this.repository = repository
            return this
        }
    }
}