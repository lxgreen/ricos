import { RichContent, Node_Type, TextData, Node, Media } from 'ricos-schema';
import { RICOS_NODE_TYPE_TO_DATA_FIELD } from '../consts';
import { extract } from '../RicosContentAPI/extract';

type PluginData = NonNullable<
  Node[typeof RICOS_NODE_TYPE_TO_DATA_FIELD[keyof typeof RICOS_NODE_TYPE_TO_DATA_FIELD]]
>;

export const getText = (content: RichContent) =>
  extract(content.nodes)
    .filter(node => node.type === Node_Type.TEXT)
    .map(node => node.textData)
    .filter(data => !!data?.text)
    .get() as TextData[];

export const getPluginData = (content: RichContent, type: Node_Type) =>
  extract(content.nodes)
    .filter(node => node.type === type)
    .map(node => node[RICOS_NODE_TYPE_TO_DATA_FIELD[node.type]])
    .get() as PluginData[];

const extractNodeMedia = (node: Node) =>
  node.type === Node_Type.IMAGE
    ? [node.imageData?.image]
    : node.type === Node_Type.VIDEO
    ? [node.videoData?.video]
    : [node.galleryData?.items.map(item => item.image?.media || item.video?.media)].flat();

export const getMedia = (content: RichContent) =>
  extract(content.nodes)
    .filter(node => [Node_Type.IMAGE, Node_Type.VIDEO, Node_Type.GALLERY].includes(node.type))
    .get()
    .flatMap(extractNodeMedia)
    .filter(media => !!media) as Media[];
