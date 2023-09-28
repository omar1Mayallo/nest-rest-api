import { ListService } from './list.service';
import { ListController } from './list.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/shared/services/jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), UserModule, JwtModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService]
})
export class ListModule {}
