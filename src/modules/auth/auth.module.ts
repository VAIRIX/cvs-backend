import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import authConfig from 'src/config/auth.config';
import { ConfigType } from '@nestjs/config';
import { AdminEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsRepository } from 'src/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.registerAsync({
      useFactory: async (
        authConf: ConfigType<typeof authConfig>,
      ): Promise<object> => ({
        secret: authConf.jwtSecret,
        signOptions: {
          expiresIn: authConf.jwtExpirationTime,
        },
      }),
      inject: [authConfig.KEY],
    }),
  ],
  providers: [AuthService, JwtStrategy, AdminsRepository],
  controllers: [AuthController],
})
export class AuthModule {}
