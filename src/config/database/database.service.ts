import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('Database connected (already initialized)');
    } else {
      try {
        await this.dataSource.initialize();
        this.logger.log('Database connected');
      } catch (err) {
        this.logger.error('Database connection failed', err);
      }
    }
  }
}
