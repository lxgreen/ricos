import React from 'react';
import { IRicosEditorEssentials } from 'wix-rich-content-common';

let nodeId;

export default function({ essentials }: { essentials: IRicosEditorEssentials }) {
  if (!essentials) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (nodeId = essentials.commands.insertNode(imageNode1))
        }
      >
        {'add image'}
      </button>
      <button
        onClick={() =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          essentials.commands.updateNode(nodeId, imageNode2)
        }
      >
        {'update image'}
      </button>
      <button
        onClick={() => {
          const nodes = essentials.model.getSelectedNodes();
          if (nodes?.[0]) {
            essentials.commands.deleteNode(nodes[0].id);
          }
        }}
      >
        {'delete node'}
      </button>

      <div>
        {'hasBold: ' +
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          essentials.model.hasDecoration('BOLD')}
      </div>
      <div>
        {'hasSpoiler: ' +
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          essentials.model.hasDecoration('SPOILER')}
      </div>
      <div>{'hasFocus: ' + essentials.state.hasFocus()}</div>
    </div>
  );
}

const imageNode1 = {
  type: 'IMAGE',
  id: '12345',
  nodes: [],
  imageData: {
    containerData: {
      width: {
        size: undefined,
        custom: '300',
      },
      alignment: 'CENTER',
      spoiler: {
        enabled: true,
      },
      textWrap: true,
    },
    image: {
      src: {
        id: '8bb438_35ed730d87524b1a88179adc18ed9cd4.jpg',
      },
      width: 1920,
      height: 1280,
    },
    disableExpand: false,
    disableDownload: false,
  },
};

const imageNode2 = {
  type: 'IMAGE',
  id: '12345',
  nodes: [],
  imageData: {
    containerData: {
      width: {
        size: undefined,
        custom: '300',
      },
      alignment: 'LEFT',
      spoiler: {
        enabled: true,
      },
      textWrap: true,
    },
    image: {
      src: {
        id: '8bb438_35ed730d87524b1a88179adc18ed9cd4.jpg',
      },
      width: 1920,
      height: 1280,
    },
    disableExpand: false,
    disableDownload: false,
  },
};
