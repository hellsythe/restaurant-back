import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { ControllersModule } from '@interface-adapters/controllers/controllers.module';

@Module({
  imports: [InfrastructureModule, ControllersModule],
})
export class AppModule {}
