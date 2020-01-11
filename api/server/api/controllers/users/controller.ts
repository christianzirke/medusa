import { Response, Request } from 'express';
import usersService from '../../services/users.service';
import * as HTTPStatus from 'http-status';

export class Controller {
  async getById(request: Request, response: Response) {
    const user = await usersService.byId(parseInt(request.params.id));
    response.json(user);
  }
  
  async getAll(request: Request, response: Response) {
    const users = await usersService.all();
    response.json(users);
  }
  
  async create(request: Request, response: Response) {
    const user = await usersService.create(request.body);
    
    response.status(HTTPStatus.CREATED).json(user);
  }
  
  async delete(request: Request, response: Response) {
    await usersService.delete(parseInt(request.params.id));
    
    response.sendStatus(HTTPStatus.NO_CONTENT);
  }
}

export default new Controller();
