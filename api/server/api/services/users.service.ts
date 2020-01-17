import User from '../data/models/user';
import bcrypt from 'bcrypt';

export class ExamplesService {
  async all({ limit: queryLimit = 25, page = 1 }): Promise<User[]> {
    const limit = queryLimit >> 0 || 25;
    const offset = ((page >> 0 || 1) - 1) * limit;
    const result = await User.findAndCountAll({
      limit,
      offset,
    });
    
    return { page, limit, ...result };
  }
  
  byId(user_id: number): Promise<User> {
    return User.findByPk(user_id);
  }
  
  create(data: User): Promise<User> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(data.password, 12, function(err, hash) {
        if (err) {
          return reject(err);
        }
        
        data.password = hash;
        
        return User.create(data, {include: ["books"]}).then(resolve).catch(reject);
      });
    });
  }
  
  delete(id: number): Promise<void> {
    return User.destroy({ where: { id } });
  }
}

export default new ExamplesService();
