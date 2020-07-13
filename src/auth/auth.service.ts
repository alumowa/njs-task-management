import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

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

  async signIn(authCredentialsDto: AuthCredentialsDto){

    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.getUserByUsername(username);

    //Return username if user exists & pw is valid
    if(user && await user.validatePassword(password)){
      return user.username;
    }

    //401 otherwise
    throw new UnauthorizedException('Invalid password');
  }

}
