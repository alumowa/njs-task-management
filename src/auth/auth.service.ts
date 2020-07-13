import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){


  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

    //Ensure users are unique
    try {
      await this.userRepository.signUp(authCredentialsDto);
    }catch(error) {

      //TypeORM unique constrating error handling -> 409
      //Otherwise bubble up 500
      if(error.code === '23505') {
        throw new ConflictException('Username already exists');
      }else {
        throw new InternalServerErrorException();
      }
    }

  }

}
