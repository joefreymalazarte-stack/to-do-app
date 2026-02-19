import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityLog, ActivityLogDocument } from './activity-log.schema';
import { CreateActivityLogDto } from './activity-log.dto';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLogDocument>,
  ) {}

  async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const createdLog = new this.activityLogModel(createActivityLogDto);
    return createdLog.save();
  }

  async findAll(): Promise<ActivityLog[]> {
    return this.activityLogModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByTaskId(taskId: string): Promise<ActivityLog[]> {
    return this.activityLogModel.find({ taskId }).sort({ createdAt: -1 }).exec();
  }

  async remove(id: string): Promise<ActivityLog | null> {
    return this.activityLogModel.findByIdAndDelete(id).exec();
  }
}
