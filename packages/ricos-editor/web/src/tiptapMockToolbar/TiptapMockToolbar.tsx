import React from 'react';
import {
  RICOS_IMAGE_TYPE,
  RICOS_LINK_TYPE,
  RICOS_DIVIDER_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_FILE_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_POLL_TYPE,
} from 'wix-rich-content-common';
import { mockMediaData, mockPluginData } from './mockPluginData';

const getButtons = (editorCommands, state) => {
  return [
    {
      name: 'insert loading file',
      onClick: () =>
        editorCommands.insertBlock(RICOS_FILE_TYPE, mockMediaData[RICOS_FILE_TYPE].loading),
    },
    {
      name: 'finish upload file',
      onClick: () =>
        editorCommands.setBlock(
          'fileMockId',
          RICOS_FILE_TYPE,
          mockMediaData[RICOS_FILE_TYPE].loaded
        ),
    },
    {
      name: 'insert loading gallery',
      onClick: () =>
        editorCommands.insertBlock(RICOS_GALLERY_TYPE, mockMediaData[RICOS_GALLERY_TYPE].loading),
    },
    {
      name: 'insert loading gallery with percent',
      onClick: () => {
        const data = {
          ...mockMediaData[RICOS_GALLERY_TYPE].loading,
          componentState: {
            loading: true,
            loadingPercentage: 0,
          },
        };
        editorCommands.insertBlock(RICOS_GALLERY_TYPE, data);
      },
    },
    {
      name: 'set gallery loading percent',
      onClick: () => {
        let galleryNode;
        state.doc.descendants(node => {
          if (node.attrs.id === 'galleryMockId') galleryNode = node;
        });
        const { loadingPercentage } = galleryNode.attrs;
        const data = {
          componentState: {
            loading: true,
            loadingPercentage: loadingPercentage + 1,
          },
        };
        editorCommands.updateBlock('galleryMockId', RICOS_GALLERY_TYPE, data);
      },
    },
    {
      name: 'finish upload gallery',
      onClick: () =>
        editorCommands.setBlock(
          'galleryMockId',
          RICOS_GALLERY_TYPE,
          mockMediaData[RICOS_GALLERY_TYPE].loaded
        ),
    },
    {
      name: 'insert loading video',
      onClick: () =>
        editorCommands.insertBlock(RICOS_VIDEO_TYPE, mockMediaData[RICOS_VIDEO_TYPE].loading),
    },
    {
      name: 'insert loading video with percent',
      onClick: () => {
        const data = {
          ...mockMediaData[RICOS_VIDEO_TYPE].loading,
          componentState: {
            loading: true,
            loadingPercentage: 0,
          },
        };
        editorCommands.insertBlock(RICOS_VIDEO_TYPE, data);
      },
    },
    {
      name: 'set video loading percent',
      onClick: () => {
        let videoNode;
        state.doc.descendants(node => {
          if (node.attrs.id === 'videoMockId') videoNode = node;
        });
        const { loadingPercentage } = videoNode.attrs;
        const data = {
          componentState: {
            loading: true,
            loadingPercentage: loadingPercentage + 1,
          },
        };
        editorCommands.updateBlock('videoMockId', RICOS_VIDEO_TYPE, data);
      },
    },
    {
      name: 'finish upload video',
      onClick: () =>
        editorCommands.updateBlock(
          'videoMockId',
          RICOS_VIDEO_TYPE,
          mockMediaData[RICOS_VIDEO_TYPE].loaded
        ),
    },
    {
      name: 'replace video',
      onClick: () =>
        editorCommands.setBlock(
          'videoMockId',
          RICOS_VIDEO_TYPE,
          mockMediaData[RICOS_VIDEO_TYPE].replace
        ),
    },
    {
      name: 'finish replace video',
      onClick: () =>
        editorCommands.updateBlock(
          'videoMockId',
          RICOS_VIDEO_TYPE,
          mockMediaData[RICOS_VIDEO_TYPE].finishReplace
        ),
    },
    {
      name: 'insert loading image',
      onClick: () =>
        editorCommands.insertBlock(RICOS_IMAGE_TYPE, mockMediaData[RICOS_IMAGE_TYPE].loading),
    },
    {
      name: 'insert loading image with percent',
      onClick: () => {
        const data = {
          ...mockMediaData[RICOS_IMAGE_TYPE].loading,
          componentState: {
            loading: true,
            loadingPercentage: 0,
          },
        };
        editorCommands.insertBlock(RICOS_IMAGE_TYPE, data);
      },
    },
    {
      name: 'set image loading percent',
      onClick: () => {
        let imageNode;
        state.doc.descendants(node => {
          if (node.attrs.id === 'imageMockId') imageNode = node;
        });
        const { loadingPercentage } = imageNode.attrs;
        const data = {
          componentState: {
            loading: true,
            loadingPercentage: loadingPercentage + 1,
          },
        };
        editorCommands.updateBlock('imageMockId', RICOS_IMAGE_TYPE, data);
      },
    },
    {
      name: 'finish upload image',
      onClick: () =>
        editorCommands.setBlock(
          'imageMockId',
          RICOS_IMAGE_TYPE,
          mockMediaData[RICOS_IMAGE_TYPE].loaded
        ),
    },
    {
      name: 'link',
      onClick: () =>
        editorCommands.insertDecoration(RICOS_LINK_TYPE, mockPluginData[RICOS_LINK_TYPE]),
    },
    {
      name: 'divider',
      onClick: () =>
        editorCommands.insertBlock(RICOS_DIVIDER_TYPE, mockPluginData[RICOS_DIVIDER_TYPE]),
    },
    {
      name: 'poll',
      onClick: () => editorCommands.insertBlock(RICOS_POLL_TYPE, mockPluginData[RICOS_POLL_TYPE]),
    },
    {
      name: 'undo',
      onClick: editorCommands.undo,
    },
    {
      name: 'redo',
      onClick: editorCommands.redo,
    },
    {
      name: 'align left',
      onClick: () => editorCommands.setTextAlignment('left'),
    },
    {
      name: 'align center',
      onClick: () => editorCommands.setTextAlignment('center'),
    },
    {
      name: 'align right',
      onClick: () => editorCommands.setTextAlignment('right'),
    },
    {
      name: 'delete node',
      onClick: () => {
        const { from, to } = state.selection;
        let id = '';
        state.doc.nodesBetween(from, to, node => {
          node.type.name !== 'text' && (id = node.attrs.id);
        });
        editorCommands.deleteBlock(id);
      },
    },
    {
      name: 'set Font Size 40px',
      onClick: () => {
        editorCommands.setFontSize(Number(40));
      },
    },
    {
      name: 'set Font Size 16px',
      onClick: () => {
        editorCommands.setFontSize(Number(16));
      },
    },
  ];
};

export const TiptapMockToolbar = ({ editor }) => {
  if (editor) {
    const editorCommands = editor.getEditorCommands() || {};
    const buttons = getButtons(editorCommands, editor.editor.state);
    return (
      <div style={{ display: 'block', flex: 0 }}>
        {buttons.map(({ name, onClick }) => (
          <button key={name} onClick={onClick}>
            {name}
          </button>
        ))}
      </div>
    );
  } else {
    return null;
  }
};
