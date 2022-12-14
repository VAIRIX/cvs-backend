import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Req } from '../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { compare } from 'src/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInReqDto: Req.SignInReqDto): Promise<any> {
    const user = await this.adminRepository.findOneBy({
      username: signInReqDto.username,
    });
    const validPassword = await compare(signInReqDto.password, user?.password);
    if (user && validPassword) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign({ payload }),
      };
    }
    return null;
  }
}
