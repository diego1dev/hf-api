import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { ConsumptionRepository } from 'modules/consumptions/domain/repositories/ConsumptionRepository';
import { TYPESDEPENDENCIES } from 'modules/consumptions/dependencies/TypesDependencies';
import { Consumption } from 'modules/consumptions/infrastructure/db/models';
import { TypeConsumptionModel } from '../models';
import { IUpdateConsumption, IConsumption, IConsumptionID } from '../interfaces/IConsumption';

@injectable()
export class ConsumptionDAO implements ConsumptionRepository {
  private dbModel = GLOBAL_CONTAINER.get<TypeConsumptionModel>(TYPESDEPENDENCIES.Model);

  async create(data:IConsumption): Promise<void> {
    await this.dbModel.create(data);
  }

  async getById(id: IConsumptionID): Promise<Consumption | null> {
    return this.dbModel.findByPk(id);
  }

  async getAll(): Promise<Consumption[]> {
    return this.dbModel.findAll();
  }

  async update(id: IConsumptionID, updatedConsumption: IUpdateConsumption): Promise<void> {
    // respuesta en la posicion 0 [1 o 0] se puede validar si se actualizó
    await this.dbModel.update(updatedConsumption, { where: { id } });
  }

  async delete(id: IConsumptionID): Promise<void> {
    // respuesta 1 o 0 para validar que borró
    await this.dbModel.destroy({ where: { id } });
  }
}

export default ConsumptionDAO;
