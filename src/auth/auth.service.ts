import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repositories/admin.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Req } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInReqDto: Req.SignInReqDto): Promise<any> {
    const user = await this.adminRepository.findByUsername(
      signInReqDto.username,
    );
    const validPassword = await bcrypt.compare(
      signInReqDto.password,
      user?.password,
    );
    if (user && validPassword) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign({ payload }),
      };
    }
    return null;
  }
}
