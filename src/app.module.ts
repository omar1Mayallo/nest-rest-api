import { TagModule } from './tag/tag.module';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database/database.config';
import envConfig from './config/env/env.config';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(databaseConfig),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    TaskModule,
    TagModule,
    ListModule
  ]
})
export class AppModule {}
