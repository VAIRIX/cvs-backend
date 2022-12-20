import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { AdminsRepository } from 'src/repositories';
import { hash } from './utils/hash';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,
    private adminRepository: AdminsRepository,
  ) {}

  async onApplicationBootstrap() {
    const admin = await this.adminRepository.findByUsername(
      this.authConf.adminUsername,
    );
    if (!admin) {
      const hashPassword = await hash(this.authConf.adminPassword);
      await this.adminRepository.save({
        username: this.authConf.adminUsername,
        password: hashPassword,
      });
    }
  }
}
