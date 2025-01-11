import { NotFoundException } from '@nestjs/common';
import { IGenericRepository } from '@usecases/common/generic.repository.interface';
import { Model } from 'mongoose';

export abstract class GenericRepositoryMongo<T, D> implements IGenericRepository<T> {
  protected model: Model<D>;

  async find(query: any): Promise<T[]> {
    return (await this.model.find({ ...query, deletedAt: null }).exec()).map(
      this.transform,
    );
  }

  async findOne(item: any): Promise<any> {
    const result = await this.model
      .findOne({ ...item, deletedAt: null })
      .exec();
    if (!result) {
      throw new NotFoundException('item not found');
    }
    return this.transform(result);
  }

  async create(item: any): Promise<T> {
    return this.transform(await this.model.create(item));
  }

  async update(query: any, item: any): Promise<T> {
    const result = await this.model.findOneAndUpdate(query, item).exec();
    if (!result) {
      throw new NotFoundException('item not found');
    }
    return this.transform(result);
  }

  async delete(_id: any): Promise<T> {
    const result = await this.model
      .findOneAndUpdate({ _id }, { deletedAt: new Date() })
      .exec();

    return this.transform(result);
  }

  async deleteHard(_id: any): Promise<any> {
    return await this.model.findOneAndDelete({ _id }).exec;
  }

  protected abstract transform(item: any): T;
}
