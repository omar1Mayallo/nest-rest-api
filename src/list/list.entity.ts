import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

@Entity({
  name: 'lists'
})
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  // __________________ TIMESTAMPS __________________ //

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // __________________ RELATIONS __________________ //

  // ENTITIES : List And Task
  // RELATION : One List has Many Tasks
  @OneToMany(() => Task, task => task.list)
  tasks: Task[];

  // ENTITIES : List And User
  // RELATION : Many Lists belong to one User
  @ManyToOne(() => User, user => user.lists)
  user: User;
}
