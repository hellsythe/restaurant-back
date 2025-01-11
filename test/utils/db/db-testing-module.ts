import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { InitializeDatabase } from '@test/utils/db/initdatabase';
import { getModelToken } from '@nestjs/mongoose';

export class DbTestingModule<T> {
  private initializeDatabase: InitializeDatabase = new InitializeDatabase();
  public module: TestingModule;
  public model;
  public repository;

  async init(testingModule: TestingModuleType): Promise<void> {
    await this.initializeDatabase.init();

    this.module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(this.initializeDatabase.conectionString),
        MongooseModule.forFeature([
          { name: testingModule.model.name, schema: testingModule.schema },
        ]),
      ],
      providers: [testingModule.repository],
    }).compile();

    this.model = this.module.get<T>(getModelToken(testingModule.model.name));

    this.repository = this.module.get(testingModule.repository);
  }

  async stop() {
    await this.module.close();
    await this.initializeDatabase.stop();
  }

  async clearSchema() {
    await this.model.collection.deleteMany();
  }
}

interface TestingModuleType {
  model: any;
  repository: any;
  schema: any;
}
