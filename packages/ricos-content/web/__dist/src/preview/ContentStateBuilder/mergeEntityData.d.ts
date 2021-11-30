import { RicosEntity } from '../../types/contentTypes';
declare type Merger = (mediaInfo: RicosEntity['data'], entity: RicosEntity) => RicosEntity;
declare const merger: Merger;
export default merger;
//# sourceMappingURL=mergeEntityData.d.ts.map