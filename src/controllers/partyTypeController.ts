import { Get, Post, Route, Body, SuccessResponse, Controller } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { KnexService } from '../services/service'
import { PartyTypeCreateRequest } from '../models/requestModels'
import { PartyType } from '../models/models'
import { TYPES } from '../types'
import { named } from 'inversify'


@Route('PartyType')
@provideSingleton(PartyTypeController)
export class PartyTypeController extends Controller {
    @inject(TYPES.KnexService) @named('partyTypeController') service: KnexService<PartyType, PartyTypeCreateRequest>

    constructor() {
        super()
    }

    @Get()
    public async getAll(): Promise<PartyType[]> {
        return await this.service.getAll()
    }

    @Get('{partyTypeId}')
    public async getPartyType(partyTypeId: number): Promise<PartyType> {
        return await this.service.get(partyTypeId)
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createPartyType(@Body() requestBody: PartyTypeCreateRequest): Promise<void> {
        await this.service.create(requestBody)
        this.setStatus(201) // set return status 201
        return Promise.resolve()
    }
}
