import { injectable } from 'inversify';
import { IPlanStatusService } from '../interfaces/IPlanStatusService';

@injectable()
export class PlanStatusService implements IPlanStatusService {
}
export default PlanStatusService;
