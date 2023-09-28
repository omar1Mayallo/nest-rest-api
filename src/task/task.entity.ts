import { List } from 'src/list/list.entity';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({
  name: 'tasks'
})
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  title: string;

  @Column({ nullable: true, default: null, length: 500 })
  notes: string;

  @Column({ nullable: true, default: null })
  parentTaskId: number; // If !null the Task is SubTask

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true, default: null })
  reminder: Date;

  @Column({ default: false })
  isBelongToMyDay: boolean;

  // __________________ TIMESTAMPS __________________ //

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt: Date;

  // __________________ RELATIONS __________________ //

  // ENTITIES : Task And List
  // RELATION: Many Tasks belong to One List
  @ManyToOne(() => List, list => list.tasks)
  list?: List;

  // ENTITIES : Task And Tag
  // RELATION: Many Tasks have Many Tags
  @ManyToMany(() => Tag, tag => tag.tasks, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinTable({ name: 'tagged-tasks' })
  tags?: Tag[];

  // ENTITIES : Task And User
  // RELATION : Many Tasks belong to one User
  @ManyToOne(() => User, user => user.tasks)
  user: User;
}
