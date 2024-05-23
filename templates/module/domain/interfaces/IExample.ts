import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { ExampleEntity } from '../entities';

export type IUpdateExample = PartialWithKeysRequired<ExampleEntity, 'id'>;
export type IDeleteExample = Pick<ExampleEntity, 'id'>;
export type IGetExampleByID = Pick<ExampleEntity, 'id'>;
