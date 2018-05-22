import * as Knex from 'knex'
import {iocContainer, provideSingleton} from '../ioc'
import {User, UserCreationRequest, UserChangeOfStatusRequest} from 'tsoa-example-models'

@provideSingleton(UserService)
export class UserService {
  public async getAll(): Promise<User[]> {
    let knex = iocContainer.get<Knex>('knex')

    return knex('User').select('userId', 'name', 'email', 'phoneNumbers', 'status')
      .then(result => {
        return result.map(r => this.mapUser(r))
      })
  }

  public async get(id: number): Promise<User> {
    let knex = iocContainer.get<Knex>('knex')

    return knex('User').where('userId', id).first('userId', 'name', 'email', 'phoneNumbers', 'status')
      .then(r => this.mapUser(r))
  }

  public async create(requestBody: UserCreationRequest): Promise<void> {
    let knex = iocContainer.get<Knex>('knex')

    return knex('User').insert({
      email: requestBody.email,
      name: requestBody.name,
      phoneNumbers: requestBody.phoneNumbers.join(',')
    })
    .then(() => { return null })
  }

  public async updateStatus(requestBody: UserChangeOfStatusRequest): Promise<void> {
    let knex = iocContainer.get<Knex>('knex')

    return knex('User').where('userId', requestBody.id)
      .update('status', requestBody.status)
      .then(() => { return null })
  }

  private mapUser(userResult: any): User {
    return <User>{
      id: userResult.userId,
      email: userResult.email,
      name: userResult.name,
      phoneNumbers: [userResult.phoneNumbers],
      status: userResult.status
    }
  }
}
