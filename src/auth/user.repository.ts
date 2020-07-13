import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as Bcrypt from 'bcrypt';


@EntityRepository(User)
export class UserRepository extends Repository<User> {


  async getUserByUsername(username: string): Promise<User> {

    return await this.findOne({ username });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = await Bcrypt.hash(password, 10);

    await user.save();
  }

}