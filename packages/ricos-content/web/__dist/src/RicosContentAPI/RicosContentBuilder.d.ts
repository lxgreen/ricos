import { ContentBuilder } from '../types';
export interface RicosBuilder extends ContentBuilder {
    new (): ContentBuilder;
}
export declare const setupContentBuilder: (generateId: () => string) => ContentBuilder & {
    RicosContentBuilder: RicosBuilder;
};
//# sourceMappingURL=RicosContentBuilder.d.ts.map