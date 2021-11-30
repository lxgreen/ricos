declare const _default: {
    blocks: ({
        key: string;
        text: string;
        type: string;
        depth: number;
        inlineStyleRanges: never[];
        entityRanges: never[];
        data: {
            dynamicStyles: {
                'padding-top': string;
                'padding-bottom': string;
            };
            textAlignment: string;
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
            dynamicStyles?: undefined;
            textAlignment?: undefined;
        };
    })[];
    entityMap: {
        0: {
            type: string;
            mutability: string;
            data: {
                type: string;
                config: {
                    size: string;
                    alignment: string;
                    textWrap: string;
                };
            };
        };
        1: {
            type: string;
            mutability: string;
            data: {
                config: {
                    alignment: string;
                    size: string;
                    showTitle: boolean;
                    showDescription: boolean;
                };
                src: {
                    id: string;
                    original_file_name: string;
                    file_name: string;
                    width: number;
                    height: number;
                };
            };
        };
        2: {
            type: string;
            mutability: string;
            data: {
                type: string;
                selectedProduct: {
                    id: string;
                    name: string;
                    pageUrl: string;
                    imageSrc: string;
                };
            };
        };
        3: {
            type: string;
            mutability: string;
            data: {
                poll: {
                    id: string;
                    title: string;
                    mediaId: string;
                    createdBy: string;
                    count: number;
                    anonymousCount: number;
                    ownVotes: string[];
                    settings: {
                        multipleVotes: boolean;
                        voteRole: string;
                        resultsVisibility: string;
                        votersDisplay: boolean;
                        votesDisplay: boolean;
                    };
                    options: {
                        id: string;
                        title: string;
                        mediaId: string;
                        count: number;
                        anonymousCount: number;
                        rating: number;
                        latestVoters: string[];
                    }[];
                    creatorFlag: boolean;
                };
                layout: {
                    poll: {
                        type: string;
                        direction: string;
                        enableImage: boolean;
                    };
                    option: {
                        enableImage: boolean;
                    };
                };
                design: {
                    poll: {
                        backgroundType: string;
                        background: string;
                        borderRadius: number;
                    };
                    option: {
                        borderRadius: number;
                    };
                };
                siteToken: string;
                config: {
                    alignment: string;
                    size: string;
                    width: string;
                };
            };
        };
    };
    VERSION: string;
};
export default _default;
//# sourceMappingURL=textWrapContentState.d.ts.map