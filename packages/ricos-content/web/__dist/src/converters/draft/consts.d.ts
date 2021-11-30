import { MENTION_TYPE, LINK_TYPE, IMAGE_TYPE, DIVIDER_TYPE, FILE_UPLOAD_TYPE, GALLERY_TYPE, GIPHY_TYPE, HTML_TYPE, LINK_PREVIEW_TYPE, MAP_TYPE, POLL_TYPE, VIDEO_TYPE, APP_EMBED_TYPE, LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE, IMAGE_TYPE_LEGACY, SPOILER_TYPE, COLLAPSIBLE_LIST_TYPE, VIDEO_TYPE_LEGACY, TABLE_TYPE, ANCHOR_TYPE, EMBED_TYPE, RICOS_NODE_TYPE_TO_DATA_FIELD, EXTERNAL, RICOS_DIVIDER_TYPE, RICOS_LINK_TYPE, RICOS_TEXT_COLOR_TYPE, RICOS_TEXT_HIGHLIGHT_TYPE, RICOS_FILE_TYPE, RICOS_GALLERY_TYPE, RICOS_GIPHY_TYPE, RICOS_HTML_TYPE, RICOS_IMAGE_TYPE, RICOS_VIDEO_TYPE, VERTICAL_EMBED_TYPE, TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE, SOUND_CLOUD_TYPE, RICOS_INDENT_TYPE, RICOS_LINE_SPACING_TYPE, RICOS_POLL_TYPE, RICOS_MENTION_TYPE, EMOJI_TYPE, INDENT_TYPE, HEADINGS_DROPDOWN_TYPE, EXTERNAL_LINK_TYPE, UNDO_REDO_TYPE, HASHTAG_TYPE, LINE_SPACING_TYPE, CODE_BLOCK_TYPE, HEADERS_MARKDOWN_TYPE } from '../../consts';
import { Decoration_Type, Node_Type } from 'ricos-schema';
export declare enum BlockType {
    Unstyled = "unstyled",
    HeaderOne = "header-one",
    HeaderTwo = "header-two",
    HeaderThree = "header-three",
    HeaderFour = "header-four",
    HeaderFive = "header-five",
    HeaderSix = "header-six",
    UnorderedListItem = "unordered-list-item",
    OrderedListItem = "ordered-list-item",
    Blockquote = "blockquote",
    CodeBlock = "code-block",
    Atomic = "atomic"
}
export declare enum HeaderLevel {
    'header-one' = 1,
    'header-two' = 2,
    'header-three' = 3,
    'header-four' = 4,
    'header-five' = 5,
    'header-six' = 6
}
export declare const FROM_DRAFT_LIST_TYPE: {
    "unordered-list-item": Node_Type;
    "ordered-list-item": Node_Type;
};
export declare const TO_DRAFT_LIST_TYPE: any;
export declare const TO_RICOS_NODE_TYPE: {
    "wix-draft-plugin-link-button": Node_Type;
    "wix-draft-plugin-action-button": Node_Type;
    "wix-draft-plugin-divider": Node_Type;
    "wix-draft-plugin-file-upload": Node_Type;
    "wix-draft-plugin-gallery": Node_Type;
    "wix-draft-plugin-giphy": Node_Type;
    "wix-draft-plugin-html": Node_Type;
    "wix-draft-plugin-image": Node_Type;
    IMAGE: Node_Type;
    "wix-rich-content-plugin-collapsible-list": Node_Type;
    "wix-draft-plugin-link-preview": Node_Type;
    "wix-draft-plugin-map": Node_Type;
    "wix-draft-plugin-vertical-embed": Node_Type;
    "wix-draft-plugin-video": Node_Type;
    "VIDEO-EMBED": Node_Type;
    "wix-draft-plugin-poll": Node_Type;
    "wix-rich-content-plugin-table": Node_Type;
    EMBED: Node_Type;
    EXTERNAL: Node_Type;
};
export declare const FROM_RICOS_ENTITY_TYPE: any;
export declare const TO_RICOS_DECORATION_TYPE: {
    BOLD: Decoration_Type;
    ITALIC: Decoration_Type;
    UNDERLINE: Decoration_Type;
    "wix-rich-content-plugin-spoiler": Decoration_Type;
    ANCHOR: Decoration_Type;
    mention: Decoration_Type;
    LINK: Decoration_Type;
    EXTERNAL: Decoration_Type;
};
export declare const TO_RICOS_INLINE_STYLE_TYPE: {
    BOLD: {
        type: Decoration_Type;
        fontWeightValue: number;
    };
    NOT_BOLD: {
        type: Decoration_Type;
        fontWeightValue: number;
    };
    ITALIC: {
        type: Decoration_Type;
        italicData: boolean;
    };
    NOT_ITALIC: {
        type: Decoration_Type;
        italicData: boolean;
    };
    UNDERLINE: {
        type: Decoration_Type;
        underlineData: boolean;
    };
    NOT_UNDERLINE: {
        type: Decoration_Type;
        underlineData: boolean;
    };
};
export declare const TO_RICOS_PLUGIN_TYPE: {
    BOLD: Decoration_Type;
    ITALIC: Decoration_Type;
    UNDERLINE: Decoration_Type;
    "wix-rich-content-plugin-spoiler": Decoration_Type;
    ANCHOR: Decoration_Type;
    mention: Decoration_Type;
    LINK: Decoration_Type;
    EXTERNAL: Decoration_Type;
    "wix-draft-plugin-link-button": Node_Type;
    "wix-draft-plugin-action-button": Node_Type;
    "wix-draft-plugin-divider": Node_Type;
    "wix-draft-plugin-file-upload": Node_Type;
    "wix-draft-plugin-gallery": Node_Type;
    "wix-draft-plugin-giphy": Node_Type;
    "wix-draft-plugin-html": Node_Type;
    "wix-draft-plugin-image": Node_Type;
    IMAGE: Node_Type;
    "wix-rich-content-plugin-collapsible-list": Node_Type;
    "wix-draft-plugin-link-preview": Node_Type;
    "wix-draft-plugin-map": Node_Type;
    "wix-draft-plugin-vertical-embed": Node_Type;
    "wix-draft-plugin-video": Node_Type;
    "VIDEO-EMBED": Node_Type;
    "wix-draft-plugin-poll": Node_Type;
    "wix-rich-content-plugin-table": Node_Type;
    EMBED: Node_Type;
};
export declare const FROM_RICOS_DECORATION_TYPE: any;
export declare const ENTITY_DECORATION_TO_MUTABILITY: {
    ANCHOR: string;
    LINK: string;
    mention: string;
    EMOJI_TYPE: string;
};
export declare const DRAFT_BLOCK_TYPE_TO_DATA_FIELD: {
    unstyled: string;
    "unordered-list-item": string;
    "ordered-list-item": string;
    "header-one": string;
    "header-two": string;
    "header-three": string;
    "header-four": string;
    "header-five": string;
    "header-six": string;
    "code-block": string;
    blockquote: string;
};
export declare const ENTITY_DECORATION_TO_DATA_FIELD: {
    ANCHOR: string;
    LINK: string;
    mention: string;
    EMOJI_TYPE: string;
};
export declare const TO_RICOS_DECORATION_DATA_FIELD: {
    COLOR: string;
    ANCHOR: string;
    LINK: string;
    mention: string;
    EMOJI_TYPE: string;
};
export declare const TO_RICOS_DATA_FIELD: any;
export declare type DraftGalleryStyles = {
    galleryLayout?: number;
    gallerySizePx?: number;
    oneRow?: boolean;
    cubeRatio?: number;
    isVertical?: boolean;
    numberOfImagesPerRow?: number;
    cubeType?: string;
    galleryThumbnailsAlignment?: string;
    imageMargin?: number;
    thumbnailSpacings?: number;
};
export declare const TO_DRAFT_PLUGIN_TYPE_MAP: {
    "ricos-divider": string;
    "ricos-file": string;
    "ricos-gallery": string;
    "ricos-giphy": string;
    "ricos-html": string;
    "ricos-image": string;
    "ricos-video": string;
    "ricos-poll": string;
    "ricos-link": string;
    "ricos-mention": string;
    "ricos-text-highlight": string;
    "ricos-text-color": string;
    "wix-draft-plugin-divider": string;
    "wix-draft-plugin-file-upload": string;
    "wix-draft-plugin-gallery": string;
    "wix-draft-plugin-giphy": string;
    "wix-draft-plugin-html": string;
    "wix-draft-plugin-image": string;
    "wix-draft-plugin-video": string;
    "wix-draft-plugin-poll": string;
    "wix-rich-content-text-highlight": string;
    "wix-rich-content-text-color": string;
    "ricos-indent": string;
    "ricos-line-spacing": string;
    EXTERNAL: string;
};
export declare const TO_RICOS_PLUGIN_TYPE_MAP: {
    "wix-draft-plugin-divider": string;
    "wix-draft-plugin-file-upload": string;
    "wix-draft-plugin-gallery": string;
    "wix-draft-plugin-giphy": string;
    "wix-draft-plugin-html": string;
    "wix-draft-plugin-image": string;
    "wix-draft-plugin-video": string;
    "wix-draft-plugin-poll": string;
    LINK: string;
    mention: string;
    "wix-rich-content-plugin-collapsible-list": string;
    "wix-draft-plugin-action-button": string;
    "wix-draft-plugin-link-button": string;
    "code-block": string;
    "wix-draft-plugin-emoji": string;
    "wix-draft-plugin-hashtag": string;
    "wix-draft-plugin-headers-markdown": string;
    "wix-rich-content-plugin-indent": string;
    "line-spacing": string;
    "wix-rich-content-plugin-table": string;
    "wix-draft-plugin-external-link": string;
    "wix-draft-plugin-link-preview": string;
    "wix-rich-content-plugin-spoiler": string;
    "wix-rich-content-undo-redo": string;
    "wix-rich-content-plugin-headings": string;
    "wix-draft-plugin-map": string;
    "wix-draft-plugin-sound-cloud": string;
    "wix-rich-content-text-color": string;
    "wix-rich-content-text-highlight": string;
    "wix-draft-plugin-vertical-embed": string;
};
export { RICOS_NODE_TYPE_TO_DATA_FIELD };
//# sourceMappingURL=consts.d.ts.map