import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './activity-log.dto';

@Controller('activity-logs')
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @Post()
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogsService.create(createActivityLogDto);
  }

  @Get()
  findAll() {
    return this.activityLogsService.findAll();
  }

  @Get('task/:taskId')
  findByTaskId(@Param('taskId') taskId: string) {
    return this.activityLogsService.findByTaskId(taskId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityLogsService.remove(id);
  }
}
