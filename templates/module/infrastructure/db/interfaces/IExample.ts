import { ExampleEntity } from 'modules/examples/domain/entities';

export type IExample = ExampleEntity;
export type IUpdateExample = Omit<Partial<IExample>, 'id'>;
export type IExampleID = IExample['id'];
