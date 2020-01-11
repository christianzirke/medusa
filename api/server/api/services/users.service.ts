import User from '../data/models/user';
import bcrypt from 'bcrypt';

export class ExamplesService {
  all(): Promise<User[]> {
    return User.findAll();
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
        
        return User.create(data).then(resolve).catch(reject);
      });
    });
  }
  
  delete(id: number): Promise<void> {
    return User.destroy({ where: { id } });
  }
}

export default new ExamplesService();
