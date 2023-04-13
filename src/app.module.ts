import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProjectsModule,
    MongooseModule.forRoot(
      'mongodb+srv://EdgardoAdalid:aR_H3CfZaMseH3h@atlascluster.rtd0rdf.mongodb.net/nousCollab'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
