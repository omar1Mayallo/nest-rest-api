import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { Task } from './task.entity';
import { ListModule } from 'src/list/list.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/shared/services/jwt/jwt.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), JwtModule, UserModule, ListModule, TagModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
