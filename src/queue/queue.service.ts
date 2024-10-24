import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from './entities/queue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
  ) {}

  async create(createQueueDto: CreateQueueDto, user: any): Promise<Queue> {
    const queue = this.queueRepository.create({
      ...createQueueDto,
      user: user.userId,
    });
    const result = await this.queueRepository.save(queue);
    const newQueue = {
      ...result,
      user: undefined,
      isMyQueue: true,
    };
    return newQueue;
  }

  async findAll(user: any): Promise<any[]> {
    const queues = await this.queueRepository.find({ relations: ['user'] });
    return queues.map((queue) => {
      return {
        ...queue,
        isMyQueue: queue.user.id === user.userId,
        user: undefined,
      };
    });
  }

  async findOne(id: number): Promise<Queue> {
    const queue = await this.queueRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!queue) {
      throw new Error(`Queue with ID ${id} not found`);
    }

    return queue;
  }

  async update(id: number, updateQueueDto: UpdateQueueDto): Promise<Queue> {
    const queue = await this.queueRepository.preload({
      id,
      ...updateQueueDto,
    });

    if (!queue) {
      throw new Error(`Queue with ID ${id} not found`);
    }

    return this.queueRepository.save(queue);
  }

  async remove(id: number): Promise<any> {
    const result = await this.queueRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`Queue with ID ${id} not found`);
    }
    return { id };
  }
}
