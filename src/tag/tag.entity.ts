import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({
  name: 'tags'
})
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, default: null })
  color: string;
  // __________________ TIMESTAMPS __________________ //

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // __________________ RELATIONS __________________ //

  // ENTITIES : Tag And Task
  // RELATION: Many Tags belong to Many Tasks
  @ManyToMany(() => Task, task => task.tags, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  tasks?: Task[];

  // ENTITIES : Tag And User
  // RELATION: Many Tags belong to one User
  @ManyToOne(() => User, user => user.tags)
  user: User;
}
