import { Get, Post, Route, Body, SuccessResponse, Controller } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { KnexService } from '../services/service'
import { WorkStatus } from '../models/models'
import { WorkStatusCreateRequest } from '../models/requestModels'
import { TYPES } from '../types'
import { named } from 'inversify'


@Route('WorkStatus')
@provideSingleton(WorkStatusController)
export class WorkStatusController extends Controller {
    @inject(TYPES.KnexService) @named('workStatusController') service: KnexService<WorkStatus, WorkStatusCreateRequest>

    constructor() {
        super()
    }

    @Get()
    public async getAll(): Promise<WorkStatus[]> {
        return await this.service.getAll()
    }

    @Get('{workStatusId}')
    public async getWorkStatus(workStatusId: number): Promise<WorkStatus> {
        return await this.service.get(workStatusId)
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createWorkStatus(@Body() requestBody: WorkStatusCreateRequest): Promise<void> {
        await this.service.create(requestBody)
        this.setStatus(201) // set return status 201
        return Promise.resolve()
    }
}
