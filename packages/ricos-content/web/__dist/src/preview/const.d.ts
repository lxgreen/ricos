export declare const METHOD_BLOCK_MAP: Readonly<{
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    quote: string;
}>;
export declare const METHOD_GROUPED_BLOCK_MAP: Readonly<{
    plain: string;
    code: string;
    ol: string;
    ul: string;
}>;
export declare const METHOD_PLUGIN_DATA_MAP: Readonly<{
    image: {
        type: string;
        mutability: string;
        data: {
            config: {
                alignment: string;
                size: string;
                showTitle: boolean;
                showDescription: boolean;
            };
        };
    };
    video: {
        type: string;
        mutability: string;
        data: {
            config: {
                size: string;
                alignment: string;
            };
        };
    };
    gallery: {
        type: string;
        mutability: string;
        data: {
            config: {
                alignment: string;
                size: string;
                layout: string;
                spacing: number;
            };
            styles: {
                galleryLayout: number;
                gallerySizeType: string;
                gallerySizePx: number;
                galleryMargin: number;
                oneRow: boolean;
                cubeRatio: number;
                galleryThumbnailsAlignment: string;
                isVertical: boolean;
                numberOfImagesPerRow: number;
                imageMargin: number;
                thumbnailSpacings: number;
                cubeType: string;
                enableInfiniteScroll: boolean;
                titlePlacement: string;
                allowHover: boolean;
                itemClick: string;
                fullscreen: boolean;
                showArrows: boolean;
                gridStyle: number;
                loveButton: boolean;
                allowSocial: boolean;
                allowDownload: boolean;
                mobileSwipeAnimation: string;
                thumbnailSize: number;
                gotStyleParams: boolean;
                cubeImages: boolean;
                groupSize: number;
                groupTypes: string;
                hasThumbnails: boolean;
                enableScroll: boolean;
                isGrid: boolean;
                isSlider: boolean;
                isColumns: boolean;
                isSlideshow: boolean;
                cropOnlyFill: boolean;
                smartCrop: boolean;
                imageResize: boolean;
                galleryImageRatio: number;
                galleryType: string;
                minItemSize: number;
                videoPlay: string;
            };
        };
    };
    soundCloud: {
        type: string;
        mutability: string;
        data: {
            config: {
                size: string;
                alignment: string;
            };
        };
    };
    giphy: {
        type: string;
        mutability: string;
        data: {
            config: {
                size: string;
                alignment: string;
            };
        };
    };
    map: {
        type: string;
        mutability: string;
        data: {
            config: {
                size: string;
                alignment: string;
                width: number;
                height: number;
            };
        };
    };
    file: {
        type: string;
        mutability: string;
        data: {
            config: {
                alignment: string;
                size: string;
            };
        };
    };
    divider: {
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
    link: {
        type: string;
        mutability: string;
        data: {
            config: {};
        };
    };
    linkPreview: {
        type: string;
        mutability: string;
        data: {
            config: {
                size: string;
                alignment: string;
            };
        };
    };
}>;
export declare const INTERACTIONS: Readonly<{
    READ_MORE: string;
    IMAGE_COUNTER: string;
    SEE_FULL_CONTENT: string;
}>;
export declare const type = "PREVIEW";
//# sourceMappingURL=const.d.ts.map