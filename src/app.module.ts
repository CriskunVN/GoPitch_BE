import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RecurringSchedulesModule } from './modules/recurring-schedules/recurring-schedules.module.js';
import { TimeSlotsModule } from './modules/time-slots/time-slots.module.js';
import { InvoicesModule } from './modules/invoices/invoices.module.js';
import { BookingsModule } from './modules/bookings/bookings.module.js';
import { PitchesModule } from './modules/pitches/pitches.module.js';
import { VenuesModule } from './modules/venues/venues.module.js';
import { CompaniesModule } from './modules/companies/companies.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './config/database/database.service.js';
import { BookingItemsModule } from './modules/booking-items/booking-items.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL, // Dùng URL cổng 6543
        ssl: { rejectUnauthorized: false },
        autoLoadEntities: true,
        synchronize: false, // Tuyệt đối không để true
      }),
    }),
    CompaniesModule,
    UsersModule,
    AuthModule,
    VenuesModule,
    PitchesModule,
    BookingsModule,
    InvoicesModule,
    TimeSlotsModule,
    RecurringSchedulesModule,
    BookingItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
