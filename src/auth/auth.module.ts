import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import authConfig from 'src/config/auth.config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    RepositoriesModule,
    JwtModule.registerAsync({
      useFactory: async (
        authConf: ConfigType<typeof authConfig>,
      ): Promise<object> => ({
        secret: authConf.jwtSecret,
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [authConfig.KEY],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
