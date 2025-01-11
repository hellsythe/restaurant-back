import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbMongoModule } from './db/db-mongo.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), DbMongoModule],
})
export class InfrastructureModule {}
