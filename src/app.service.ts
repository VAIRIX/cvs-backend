import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import authConfig from './config/auth.config';
import { AdminEntity } from './entities';
import { hash } from './utils/hash';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async onApplicationBootstrap() {
    const admin = await this.adminRepository.findOneBy({
      username: this.authConf.adminUsername,
    });
    if (!admin) {
      const hashPassword = await hash(this.authConf.adminPassword);
      await this.adminRepository.save({
        username: this.authConf.adminUsername,
        password: hashPassword,
      });
    }
  }
}
