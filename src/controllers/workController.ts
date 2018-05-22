import { Get, Post, Route, Body, SuccessResponse, Controller } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { KnexService } from '../services/service'
import { Work } from '../models/models'
import { WorkCreateRequest } from '../models/requestModels'
import { TYPES } from '../types'
import { named } from 'inversify'


@Route('Work')
@provideSingleton(WorkController)
export class WorkController extends Controller {
    @inject(TYPES.KnexService) @named('workController') service: KnexService<Work, WorkCreateRequest>

    constructor() {
        super()
    }

    @Get()
    public async getAll(): Promise<Work[]> {
        return await this.service.getAll()
    }

    @Get('{workId}')
    public async getWork(workId: number): Promise<Work> {
        return await this.service.get(workId)
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createWork(@Body() requestBody: WorkCreateRequest): Promise<void> {
        await this.service.create(requestBody)
        this.setStatus(201) // set return status 201
        return Promise.resolve()
    }
}
