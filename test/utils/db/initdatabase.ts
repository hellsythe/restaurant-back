import { StartedTestContainer } from 'testcontainers';
import { initMongoTestDatabase } from './testcontainer.utils';

export class InitializeDatabase {
  private startedMongoDbContainer: StartedTestContainer;
  private host: string;
  public conectionString: string;

  async init(): Promise<void> {
    this.host = <string>process.env.DB_HOST;
    if (process.env.TESTCONTAINERS === 'true') {
      await this.tearUpDbForDevcontainer();
    }

    this.conectionString = `mongodb://test:test@${this.host}:27017/test?authSource=admin`;
  }

  async stop(): Promise<void> {
    if (process.env.TESTCONTAINERS === 'true') {
      await this.tearDownDbForDevcontainer();
    } else {
      this.host = 'mongo';
    }
  }

  private async tearUpDbForDevcontainer(): Promise<void> {
    this.startedMongoDbContainer = await initMongoTestDatabase();

    this.host = this.startedMongoDbContainer.getIpAddress('bridge');
  }

  private async tearDownDbForDevcontainer(): Promise<void> {
    await this.startedMongoDbContainer.stop();
  }

  public getHost(): string {
    return this.host;
  }
}

export const mongoTestModule = {};
