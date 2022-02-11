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
      name: 'finish upload video',
      onClick: () =>
        editorCommands.setBlock(
          'videoMockId',
          RICOS_VIDEO_TYPE,
          mockMediaData[RICOS_VIDEO_TYPE].loaded
        ),
    },
    {
      name: 'insert loading image',
      onClick: () =>
        editorCommands.insertBlock(RICOS_IMAGE_TYPE, mockMediaData[RICOS_IMAGE_TYPE].loading),
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
