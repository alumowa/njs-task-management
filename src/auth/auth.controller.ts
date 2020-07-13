import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {

  }


  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {

    //TODO: Implement zxcvbn validation pipe

      return this.authService.signUp(authCredentialsDto);
  }
}
