import {
  RICOS_IMAGE_TYPE,
  RICOS_LINK_TYPE,
  RICOS_DIVIDER_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_FILE_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_POLL_TYPE,
} from 'wix-rich-content-common';

export const mockMediaData = {
  [RICOS_FILE_TYPE]: {
    loading: {
      componentState: {
        loading: true,
      },
      name: 'mock-file',
      type: 'mp4',
      id: 'fileMockId',
    },
    loaded: {
      componentState: { loading: false },
      name: 'mock-file',
      type: 'mp4',
      src: {
        url: 'https://www.w3.org/wai/er/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    },
  },
  [RICOS_GALLERY_TYPE]: {
    loading: {
      componentState: {
        loading: true,
      },
      items: [
        { image: { media: { src: {} } }, uploadId: '12345' },
        { image: { media: { src: {} } }, uploadId: '123456' },
        { image: { media: { src: {} } }, uploadId: '1234567' },
      ],
      id: 'galleryMockId',
    },
    loaded: {
      componentState: { loading: false },
      items: [
        {
          image: {
            media: {
              src: { url: '8bb438_a8a7ff22738445faa74cf7f68866f4d8.jpg' },
              width: 3542,
              height: 4722,
            },
          },
        },
        {
          image: {
            media: {
              src: { url: '8bb438_149b418b9bfb47e0adafc569ca55c5e9.jpg' },
              width: 4200,
              height: 2829,
            },
          },
        },
        {
          image: {
            media: {
              src: { url: '8bb438_8307fc32bdf4455ab3033c542da4c6c7.jpg' },
              width: 5600,
              height: 3733,
            },
          },
        },
      ],
    },
  },
  [RICOS_IMAGE_TYPE]: {
    loading: {
      componentState: {
        loading: true,
      },
      metadata: {},
      id: 'imageMockId',
    },
    loaded: {
      componentState: { loading: false },
      image: {
        src: {
          id: '8bb438_eed704a5a8d74b40aeb5a11914eb4dc5.jpg',
        },
        width: 1621,
        height: 1081,
      },
    },
  },
  [RICOS_VIDEO_TYPE]: {
    loading: {
      componentState: {
        loading: true,
      },
      id: 'videoMockId',
      video: { src: { url: '' }, thumbnail: { src: {} } },
    },
    loaded: {
      componentState: { loading: false },
      thumbnail: {
        src: 'media/11062b_a552731f40854d16a91627687fb8d1a6f000.jpg',
        height: 1080,
        width: 1920,
      },
      video: {
        src: {
          id: 'video/11062b_a552731f40854d16a91627687fb8d1a6/1080p/mp4/file.mp4',
        },
      },
      isCustomVideo: true,
    },
    replace: {
      componentState: {
        loading: true,
      },
      video: { src: { url: '' }, thumbnail: { src: {} } },
    },
    finishReplace: {
      componentState: { loading: false },
      thumbnail: {
        src: 'media/11062b_a552731f40854d16a91627687fb8d1a6f000.jpg',
        height: 1080,
        width: 1920,
      },
      video: {
        src: {
          id: 'video/c5366f_b919798317fb4c478ae708560b381d38/480p/mp4/file.mp4',
        },
      },
      isCustomVideo: true,
    },
  },
};

export const mockPluginData = {
  [RICOS_LINK_TYPE]: {
    link: { target: 'BLANK', url: 'www.google.com' },
  },
  [RICOS_DIVIDER_TYPE]: {},
  [RICOS_POLL_TYPE]: {
    containerData: {
      alignment: 'CENTER',
      width: {
        size: 'CONTENT',
      },
    },
    poll: {
      options: [
        {
          title: '',
          image: {
            src: {
              url: 'https://static.wixstatic.com/media/fb62d9f8e7824b2e90b13b971e700b92.jpg',
            },
          },
        },
        {
          title: '',
          image: {
            src: {
              url: 'https://static.wixstatic.com/media/fb62d9f8e7824b2e90b13b971e700b92.jpg',
            },
          },
        },
      ],
      title: '',
      image: {
        src: {
          url: 'https://static.wixstatic.com/media/436483e6ed9e41fe91b9f286d2ea4efb.jpg',
        },
      },
      settings: {
        permissions: {
          view: 'VOTERS',
          vote: 'ALL',
          allowMultipleVotes: false,
        },
        showVoters: true,
        showVotesCount: true,
      },
    },
    layout: {
      poll: {
        type: 'LIST',
        direction: 'LTR',
        enableImage: true,
      },
      options: {
        enableImage: false,
      },
    },
    design: {
      poll: {
        background: {
          type: 'IMAGE',
          image: {
            src: {
              url: 'https://static.wixstatic.com/media/2dfdd3_1977932e94064f168abaaa2c04b678a5~mv2.jpg',
            },
          },
        },
        borderRadius: 0,
      },
      options: {
        borderRadius: 0,
      },
    },
  },
};
