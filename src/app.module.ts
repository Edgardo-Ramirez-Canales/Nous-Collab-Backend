import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    UsersModule,
    AuthModule,
    ProjectsModule,
    MongooseModule.forRoot(process.env.MONGODB),
    MulterModule,
    FilesModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
