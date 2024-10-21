import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Queue } from 'src/queue/entities/queue.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Queue, (queue) => queue.user)
  queues: Queue[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 4);
  }
  @BeforeUpdate()
  async updatePassword() {
    this.password = await bcrypt.hash(this.password, 4);
  }
}
