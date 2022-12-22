import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';

@Module({
  exports: [GoogleService],
  providers: [GoogleService],
})
export class GoogleModule {}
