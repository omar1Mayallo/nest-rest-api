import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database/database.config';
import envConfig from './config/env/env.config';

@Module({
  imports: [ConfigModule.forRoot(envConfig), TypeOrmModule.forRootAsync(databaseConfig)],
  controllers: [],
  providers: []
})
export class AppModule {}
