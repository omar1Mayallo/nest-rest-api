import { List } from 'src/list/list.entity';
import { UserRoles } from 'src/shared/constants/user-roles';
import { Tag } from 'src/tag/tag.entity';
import { Task } from 'src/task/task.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ enum: UserRoles, default: UserRoles.USER })
  role: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  avatarPublicId: string;

  // __________________ TIMESTAMPS __________________ //

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt: Date;

  // __________________ RELATIONS __________________ //

  // ENTITIES : User And Tag
  // RELATION: One User have many Tags
  @OneToMany(() => Tag, tag => tag.user)
  tags: Tag[];

  // ENTITIES : User And List
  // RELATION: One User have many Lists
  @OneToMany(() => List, list => list.user)
  lists: List[];

  // ENTITIES : User And Task
  // RELATION: One User have many Tasks
  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}
