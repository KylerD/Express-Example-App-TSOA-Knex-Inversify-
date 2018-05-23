import { Get, Post, Route, Body, SuccessResponse, Controller, Response } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { Party } from '../models/models'
import { PartyCreateRequest } from '../models/requestModels'
import { TYPES } from '../types'
import { Service } from '../services/service'
import { named } from 'inversify'


@Route('Party')
@provideSingleton(PartyController)
export class PartyController extends Controller {
    @inject(TYPES.Service) @named('partyController') service: Service<Party, PartyCreateRequest>

    constructor() {
        super()
    }

    @Get()
    public async getAll(): Promise<Party[]> {
        return await this.service.getAll()
    }

    @Response('404', 'not found')
    @Get('{partyId}')
    public async getParty(partyId: number): Promise<Party> {
        let party = await this.service.get(partyId)

        if (!party) {
            this.setStatus(404)
        }

        return party
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createParty(@Body() requestBody: PartyCreateRequest): Promise<void> {
        await this.service.create(requestBody)
        this.setStatus(201) // set return status 201
        return Promise.resolve()
    }
}
