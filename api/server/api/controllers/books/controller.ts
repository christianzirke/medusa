import { Response, Request } from 'express';

import booksService from '../../services/books.service';

import * as HTTPStatus from 'http-status';
import Book from '../../data/models/book';
import User from '../../data/models/user';

export class Controller {
  async getById(request: Request, response: Response) {
    const user = await booksService.byId(parseInt(request.params.id));
    response.json(user);
  }
  
  async getAll(request: Request, response: Response) {
    const users = await booksService.all(request.query);
    response.json(users);
  }
  
  async create(request: Request, response: Response) {
    if (!request.isAuthenticated()) {
      return response.sendStatus(401);
    }
    
    const { user, body } = request;
    
    const book = await user.createBook({
      ...body,
      // userId, //
    });
    
    response.status(HTTPStatus.CREATED).json(book);
  }
  
  async delete(request: Request, response: Response) {
    await booksService.delete(parseInt(request.params.id));
    
    response.sendStatus(HTTPStatus.NO_CONTENT);
  }
}

export default new Controller();
