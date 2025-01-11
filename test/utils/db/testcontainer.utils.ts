import { GenericContainer, StartedTestContainer } from 'testcontainers';

export async function initMongoTestDatabase(): Promise<StartedTestContainer> {
  const mongoDbContainer = await new GenericContainer('mongo:7.0.1')
    .withExposedPorts(27017)
    .withEnvironment({
      MONGO_INITDB_ROOT_USERNAME: 'test',
      MONGO_INITDB_ROOT_PASSWORD: 'test',
    })
    .start();

  return mongoDbContainer;
}
