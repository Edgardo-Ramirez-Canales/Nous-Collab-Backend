import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ModelsModule } from './models/roles.model';

import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';



import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ModelsModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: `process.env.JWT_SECRET`,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
