import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  service: string;

  @Column()
  date: string;

  @Column()
  extraData?: string;

  @ManyToOne(() => User, (user) => user.queues, { onDelete: 'CASCADE' })
  user: User;
}
