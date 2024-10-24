import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { JwtAuthGuard } from 'src/auth/Guard/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('api/v1/queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createQueueDto: CreateQueueDto, @GetUser() user: any) {
    return this.queueService.create(createQueueDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@GetUser() user: any) {
    return this.queueService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.queueService.remove(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueueDto: UpdateQueueDto) {
    return this.queueService.update(+id, updateQueueDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.queueService.remove(+id);
  // }
}
