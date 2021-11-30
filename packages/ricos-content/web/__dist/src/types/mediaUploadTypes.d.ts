/// <reference types="react" />
export declare enum MediaUploadErrorKey {
    GENERIC = 0,
    SIZE_LIMIT = 1,
    QUOTA_STORAGE_VISITOR = 2,
    QUOTA_STORAGE_OWNER = 3,
    QUOTA_VIDEO_VISITOR = 4,
    QUOTA_VIDEO_OWNER = 5,
    QUOTA_SINGLE_VIDEO_VISITOR = 6,
    QUOTA_SINGLE_VIDEO_OWNER = 7,
    MIME_TYPE_MISMATCH = 8,
    WMP_ERROR_GENERAL = 9,
    INVALID_SESSION = 10,
    SESSION_EXPIRED = 11,
    MISSING_WIX_SESSION = 12,
    INCORRECT_FILE_INFO = 13,
    CORRUPT_FILE = 14,
    UNSUPPORTED_EXTENSION = 15,
    MISSING_HEADER = 16,
    FORMAT_CHUNK_MISSING = 17,
    EXT_FILE_AUTHORIZATION = 18,
    EXT_FILE_FORBBIDEN = 19,
    IMAGE_FORMAT = 20,
    CORRUPT_IMAGE = 21,
    IMAGE_DIMENSIONS_EXCEEDED = 22,
    MP4_STEREO_FORMAT = 23,
    WAV_STEREO_FORMAT = 24,
    WMA_BITRATE = 25,
    WMA_BITRATE_LOSSY = 26,
    MP4_BITRATE = 27,
    MP3_UNSUPPORTED_STEREO = 28,
    MP3_UNSUPPORTED_FORMAT = 29,
    WAV_SAMPLE_RATE = 30,
    AAC_UNSUPPORTED_FORMAT = 31,
    WAV_UNSUPPORTED_FORMAT = 32,
    WAV_SAMPLE_SIZE = 33,
    WAV_CHUNK_SIZE = 34,
    AUDIO_CODEC = 35,
    EMPTY_FILE = 36,
    MP4_UNSUPPORTED_FORMAT = 37,
    MP4_SAMPLE_RATE = 38,
    VIDEO_BITRATE = 39,
    VIDEO_DURATION_MISMATCH = 40,
    VIDEO_CODEC = 41
}
export interface MediaUploadError {
    msg?: string | JSX.Element;
    key?: MediaUploadErrorKey;
    args?: Record<string, string | number>;
}
export declare type UpdateEntityFunc<T> = ({ data, error, index, }: {
    data?: T;
    error?: MediaUploadError;
    index?: number;
}) => void;
export interface ImageComponentData {
    id: string;
    height: number;
    width: number;
    original_file_name: string;
    file_name: string;
    privacy?: MediaPrivacy;
}
export interface VideoComponentData {
    pathname: string;
    height?: number;
    width?: number;
    privacy?: MediaPrivacy;
    thumbnail: {
        pathname: string;
        height: number;
        width: number;
    };
}
export declare type MediaPrivacy = 'public' | 'private';
export interface FileComponentData {
    name: string;
    type: string;
    url?: string;
    id?: string;
    privacy?: MediaPrivacy;
}
//# sourceMappingURL=mediaUploadTypes.d.ts.map