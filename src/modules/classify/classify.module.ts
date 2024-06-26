import { Module } from '@nestjs/common';
import { ClassifyController } from './classify.controller';
import { ClassifyService } from './classify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classify } from './classify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classify])],
  controllers: [ClassifyController],
  providers: [ClassifyService],
})
export class ClassifyModule {}
