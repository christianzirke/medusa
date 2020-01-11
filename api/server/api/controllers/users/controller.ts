import { Response, Request } from 'express';
import usersService from '../../services/users.service';

export class Controller {
  async getAll(request: Request, response: Response) {
    const users = await usersService.all();
    response.json(users);
  }
}

export default new Controller();
