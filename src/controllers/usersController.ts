import { Get, Post, Route, Body, SuccessResponse, Controller } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { UserService } from '../services/userService'
import { User, UserCreationRequest, UserChangeOfStatusRequest } from 'tsoa-example-models'

// Needed to make controller injectable for extended Singleton class
import { decorate, injectable } from 'inversify'
decorate(injectable(), Controller )

@Route('Users')
@provideSingleton(UsersController)
export class UsersController extends Controller {
  constructor(@inject(UserService) private userService: UserService) {
    super()
  }

  @Get()
  public async getAll(): Promise<User[]> {
    let users = await this.userService.getAll()
    return users
  }

  @Get('{id}')
  public async getUser(id: number): Promise<User> {
    return await this.userService.get(id)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationRequest): Promise<void> {
    await this.userService.create(requestBody)
    this.setStatus(201) // set return status 201
    return Promise.resolve()
  }

  @Post('{id}/ChangeOfStatus')
  public async changeOfStatus(@Body() requestBody: UserChangeOfStatusRequest): Promise<void> {
    await this.userService.updateStatus(requestBody)
    this.setStatus(201) // set return status 201
    return Promise.resolve()
  }
}
