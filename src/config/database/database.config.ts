import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

const databaseConfig: TypeOrmModuleAsyncOptions = {
  // imports: [ConfigModule], >> I Set ConfigModule {isGlobal: true}, so don't need to imports here or in any other modules
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [],
    autoLoadEntities: true,
    synchronize: true
  }),
  inject: [ConfigService]
};

export default databaseConfig;
