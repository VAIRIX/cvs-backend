import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { AdminRepository } from './repositories/admin.repository';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,
    private readonly adminRepository: AdminRepository,
  ) {}

  async onApplicationBootstrap() {
    const admin = await this.adminRepository.findByUsername(
      this.authConf.adminUsername,
    );
    if (!admin) {
      await this.adminRepository.create({
        username: this.authConf.adminUsername,
        password: this.authConf.adminPassword,
      });
    }
  }
}
