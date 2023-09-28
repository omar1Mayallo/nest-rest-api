import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { User } from '../user/user.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Task } from 'src/task/task.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  // CREATE_TAG
  async createTag(user: User, body: CreateTagDto): Promise<Tag> {
    const { name, color } = body;
    const tag = this.tagRepository.create({ name, color, user });
    return await this.tagRepository.save(tag);
  }

  // GET_TAGS
  async getTags(userId: number): Promise<Tag[]> {
    return await this.tagRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  // DELETE_TAG
  async removeTag(userId: number, tagId: number): Promise<void> {
    const tag = await this.tagRepository.findOne({ where: { id: tagId, user: { id: userId } } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    await this.tagRepository.remove(tag);
  }

  // FIND_TAGS_BY_IDs
  async findTagsByIds(tagsIds: number[]): Promise<Tag[]> {
    const tags = await this.tagRepository.find({
      where: { id: In(tagsIds) }
    });

    if (tags.length !== tagsIds.length) {
      throw new NotFoundException('One or more tags were not found');
    }

    return tags;
  }
}
