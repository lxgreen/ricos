import { RicosEntity } from '../../types/contentTypes';
import { PreviewEntityData } from '../types';
declare type PluginConverter = (entity: RicosEntity) => PreviewEntityData[];
declare const extractEntityData: PluginConverter;
export default extractEntityData;
//# sourceMappingURL=extractEntityData.d.ts.map