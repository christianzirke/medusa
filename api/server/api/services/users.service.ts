import User from '../data/models/user';

export class ExamplesService {
  all(): Promise<User[]> {
    return User.findAll();
  }
}

export default new ExamplesService();
