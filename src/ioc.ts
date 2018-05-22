import 'reflect-metadata'
import { Container, inject, interfaces } from 'inversify'
import { autoProvide, makeFluentProvideDecorator, makeProvideDecorator } from 'inversify-binding-decorators'
import * as Knex from 'knex'
import { development } from './knexfile'
import { Controller } from 'tsoa'
import { TYPES } from './types'
import { KnexService } from './services/service'

// Needed to make controller injectable for extended Singleton class
import { decorate, injectable } from 'inversify'
import {Party, PartyType, Work, WorkStatus} from './models/models'
import {PartyCreateRequest, PartyTypeCreateRequest, WorkCreateRequest, WorkStatusCreateRequest} from './models/requestModels'
decorate(injectable(), Controller )

const iocContainer = new Container()

let knex: Knex = Knex(development)
iocContainer.bind<Knex>('knex').toConstantValue(knex)

iocContainer.bind<KnexService<Party, PartyCreateRequest>>(TYPES.KnexService).to(KnexService)
    .whenTargetNamed('partyController')
iocContainer.bind<string>('table').toConstantValue('party').whenParentNamed('partyController')
iocContainer.bind<string>('id').toConstantValue('party_id').whenParentNamed('partyController')

iocContainer.bind<KnexService<PartyType, PartyTypeCreateRequest>>(TYPES.KnexService).to(KnexService)
    .whenTargetNamed('partyTypeController')
iocContainer.bind<string>('table').toConstantValue('party_type').whenParentNamed('partyTypeController')
iocContainer.bind<string>('id').toConstantValue('party_type_id').whenParentNamed('partyTypeController')

iocContainer.bind<KnexService<Work, WorkCreateRequest>>(TYPES.KnexService).to(KnexService)
    .whenTargetNamed('workController')
iocContainer.bind<string>('table').toConstantValue('work').whenParentNamed('workController')
iocContainer.bind<string>('id').toConstantValue('work_id').whenParentNamed('workController')

iocContainer.bind<KnexService<WorkStatus, WorkStatusCreateRequest>>(TYPES.KnexService).to(KnexService)
    .whenTargetNamed('workStatusController')
iocContainer.bind<string>('table').toConstantValue('work_status').whenParentNamed('workStatusController')
iocContainer.bind<string>('id').toConstantValue('work_status_id').whenParentNamed('workStatusController')

const provide = makeProvideDecorator(iocContainer)
const fluentProvider = makeFluentProvideDecorator(iocContainer)

const provideNamed = (
  identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
  name: string,
) => {
    return fluentProvider(identifier)
      .whenTargetNamed(name)
      .done()
}

const provideSingleton = (
  identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
) => {
    return fluentProvider(identifier)
      .inSingletonScope()
      .done()
}

export { iocContainer, autoProvide, provide, provideSingleton, provideNamed, inject }
