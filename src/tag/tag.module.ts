import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { Module } from '@nestjs/common';
import { Tag } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/shared/services/jwt/jwt.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), JwtModule, UserModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
