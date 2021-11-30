import { Node } from 'ricos-schema';
import { RangedDecoration } from '../../draft/toDraft/decorationParsers';
export declare const parseTextNodes: (node: Node) => string;
export declare const parseListNode: (node: Node, delimiter: string) => string;
export declare const addLinksToText: (text: string, linkDecorations?: RangedDecoration[]) => string;
export declare const parseImage: ({ imageData }: Node, delimiter: string, urlShortener?: ((url: string) => Promise<string>) | undefined) => Promise<string>;
export declare const parseVideo: ({ videoData }: Node, delimiter: string, getVideoUrl?: (fileId: string) => Promise<string>) => Promise<string>;
export declare const parseGiphy: ({ gifData }: Node) => string;
export declare const parseMap: ({ mapData }: Node) => string;
export declare const parseAppEmbed: ({ appEmbedData }: Node, delimiter: string) => string;
export declare const parseLinkPreview: ({ linkPreviewData }: Node) => string;
export declare const parseEmbed: ({ embedData }: Node, delimiter?: string | undefined) => string;
export declare const parseCollapsible: (node: Node, delimiter?: string | undefined) => Promise<string>;
//# sourceMappingURL=convertNodes.d.ts.map