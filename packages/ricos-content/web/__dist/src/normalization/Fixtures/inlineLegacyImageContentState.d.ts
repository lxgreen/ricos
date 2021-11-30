declare const _default: {
    blocks: ({
        key: string;
        text: string;
        type: string;
        depth: number;
        inlineStyleRanges: never[];
        entityRanges: never[];
        data: {
            textAlignment?: undefined;
        };
    } | {
        key: string;
        text: string;
        type: string;
        depth: number;
        inlineStyleRanges: never[];
        entityRanges: {
            offset: number;
            length: number;
            key: number;
        }[];
        data: {
            textAlignment: string;
        };
    })[];
    entityMap: {
        0: {
            type: string;
            mutability: string;
            data: {
                alt: string;
                src: string;
                config: {
                    size: string;
                    alignment: string;
                };
            };
        };
        1: {
            type: string;
            mutability: string;
            data: {
                href: string;
                url: string;
                target: string;
                rel: string;
            };
        };
    };
    VERSION: string;
};
export default _default;
//# sourceMappingURL=inlineLegacyImageContentState.d.ts.map