import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envValidationSchema from './config/env/env.schema';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validationSchema: envValidationSchema })],
  controllers: [],
  providers: []
})
export class AppModule {}
