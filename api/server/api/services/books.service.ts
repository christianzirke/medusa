import Book from '../data/models/book';

export class ExamplesService {
  async all({ limit: queryLimit = 25, page = 1 }): Promise<Book[]> {
    const limit = queryLimit >> 0 || 25;
    const offset = ((page >> 0 || 1) - 1) * limit;
    const result = await Book.findAndCountAll({
      limit,
      offset,
    });
    
    return { page, limit, ...result };
  }
  
  byId(user_id: number): Promise<Book> {
    return Book.findByPk(user_id);
  }
  
  create(data: Book): Promise<Book> {
    return Book.create(data, { include: ['user'] });
  }
  
  delete(id: number): Promise<void> {
    return Book.destroy({ where: { id } });
  }
}

export default new ExamplesService();
