import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { ExampleRepository } from 'modules/examples/domain/repositories/ExampleRepository';
import { TYPESDEPENDENCIES } from 'modules/examples/dependencies/TypesDependencies';
import { Example } from 'modules/examples/infrastructure/db/models';
import { TypeExampleModel } from '../models';
import { IUpdateExample, IExample, IExampleID } from '../interfaces/IExample';

@injectable()
export class ExampleDAO implements ExampleRepository {
  private dbModel = GLOBAL_CONTAINER.get<TypeExampleModel>(TYPESDEPENDENCIES.Model);

  async create(data:IExample): Promise<void> {
    await this.dbModel.create(data);
  }

  async getById(id: IExampleID): Promise<Example | null> {
    return this.dbModel.findByPk(id);
  }

  async getAll(): Promise<Example[]> {
    return this.dbModel.findAll();
  }

  async update(id: IExampleID, updatedExample: IUpdateExample): Promise<void> {
    // respuesta en la posicion 0 [1 o 0] se puede validar si se actualizó
    await this.dbModel.update(updatedExample, { where: { id } });
  }

  async delete(id: IExampleID): Promise<void> {
    // respuesta 1 o 0 para validar que borró
    await this.dbModel.destroy({ where: { id } });
  }
}

export default ExampleDAO;
