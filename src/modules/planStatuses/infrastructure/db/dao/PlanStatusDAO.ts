import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { PlanStatusRepository } from 'modules/planStatuses/domain/repositories/PlanStatusRepository';
import { TYPESDEPENDENCIES } from 'modules/planStatuses/dependencies/TypesDependencies';
import { PlanStatus } from 'modules/planStatuses/infrastructure/db/models';
import { TypePlanStatusModel } from '../models';
import { IUpdatePlanStatus, IPlanStatus, IPlanStatusID } from '../interfaces/IPlanStatus';

@injectable()
export class PlanStatusDAO implements PlanStatusRepository {
  private dbModel = GLOBAL_CONTAINER.get<TypePlanStatusModel>(TYPESDEPENDENCIES.Model);

  async create(data:IPlanStatus): Promise<void> {
    await this.dbModel.create(data);
  }

  async getById(id: IPlanStatusID): Promise<PlanStatus | null> {
    return this.dbModel.findByPk(id);
  }

  async getAll(): Promise<PlanStatus[]> {
    return this.dbModel.findAll();
  }

  async update(id: IPlanStatusID, updatedPlanStatus: IUpdatePlanStatus): Promise<void> {
    // respuesta en la posicion 0 [1 o 0] se puede validar si se actualizó
    await this.dbModel.update(updatedPlanStatus, { where: { id } });
  }

  async delete(id: IPlanStatusID): Promise<void> {
    // respuesta 1 o 0 para validar que borró
    await this.dbModel.destroy({ where: { id } });
  }
}

export default PlanStatusDAO;
