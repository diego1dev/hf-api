import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { PlanRepository } from 'modules/plans/domain/repositories/PlanRepository';
import { TYPESDEPENDENCIES } from 'modules/plans/dependencies/TypesDependencies';
import { Plan } from 'modules/plans/infrastructure/db/models';
import { TypePlanModel } from '../models';
import { IUpdatePlan, IPlan, IPlanID } from '../interfaces/IPlan';

@injectable()
export class PlanDAO implements PlanRepository {
  private dbModel = GLOBAL_CONTAINER.get<TypePlanModel>(TYPESDEPENDENCIES.Model);

  async create(data:IPlan): Promise<void> {
    await this.dbModel.create(data);
  }

  async getById(id: IPlanID): Promise<Plan | null> {
    return this.dbModel.findByPk(id);
  }

  async getAll(): Promise<Plan[]> {
    return this.dbModel.findAll();
  }

  async update(id: IPlanID, updatedPlan: IUpdatePlan): Promise<void> {
    // respuesta en la posicion 0 [1 o 0] se puede validar si se actualizó
    await this.dbModel.update(updatedPlan, { where: { id } });
  }

  async delete(id: IPlanID): Promise<void> {
    // respuesta 1 o 0 para validar que borró
    await this.dbModel.destroy({ where: { id } });
  }
}

export default PlanDAO;
