import * as Knex from 'knex'
import {iocContainer} from '../ioc'
import {injectable, inject} from 'inversify'


export interface Service<T, R> {
    getAll(): Promise<T[]>
    get(id: number): Promise<T>
    create(requestBody: R): Promise<void>
}

@injectable()
export class KnexService<T, R> implements Service<T, R> {
    constructor(@inject('table') private table, @inject('id') private id) {}

    public async getAll(): Promise<T[]> {
        let knex = iocContainer.get<Knex>('knex')
        let items: T[] = await knex(this.table).select()
        return items
    }

    public async get(id: number): Promise<T> {
        let item: T = await iocContainer.get<Knex>('knex')(this.table).where(this.id, id).first()
        return item
    }

    public async create(requestBody: R): Promise<void> {
        return await iocContainer.get<Knex>('knex')(this.table).insert(requestBody)
    }
}
