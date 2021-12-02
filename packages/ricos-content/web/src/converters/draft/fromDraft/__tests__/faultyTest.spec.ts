/* eslint-disable no-unused-vars */

import { fromDraft } from '../..';
import { compare } from '../../../../comparision/compare';

import faulty from './faulty-content.json';
import { RichContent } from 'ricos-schema';
const content = {
  metadata: {
    createdTimestamp: '2021-12-01T06:52:38.795Z',
    id: '6a552cb1-997d-4cb7-907f-5e6a1592a5d6',
    updatedTimestamp: '2021-12-01T06:52:38.795Z',
    version: 1,
  },
  nodes: [
    {
      id: 'foo',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '64hpq',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ fontWeightValue: 700, type: 'BOLD' }],
            text: '4K ULTRA HD REVIEW / HDR FRAME SHOTS',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      galleryData: {
        containerData: {
          alignment: 'CENTER',
          spoiler: { enabled: false },
          textWrap: true,
          width: { size: 'FULL_WIDTH' },
        },
        disableDownload: false,
        disableExpand: false,
        items: [
          {
            image: {
              media: {
                height: 1672,
                src: {
                  url: 'eb6f96_9beab90d5ccc4bfbb1ad459067b307cd~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
          {
            image: {
              media: {
                height: 1674,
                src: {
                  url: 'eb6f96_8b0a50eeef3a4c74b7beec496cd7b219~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
        ],
        options: {
          item: { crop: 'FILL', spacing: 1 },
          layout: { orientation: 'ROWS', type: 'PANORAMA' },
          thumbnails: { placement: 'UNRECOGNIZED' },
        },
      },
      id: 'e94pn',
      nodes: [],
      type: 'GALLERY',
    },
    {
      id: '62p2s',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text:
              '(1) San Francisco public health inspector Matthew Bennell (Donald Sutherland) and lab technician Elizabeth Driscoll (Brooke Adams) are on the run from an ever-growing population of pod people. ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [
              { italicData: true, type: 'ITALIC' },
              { fontWeightValue: 700, type: 'BOLD' },
            ],
            text: '(2) ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text:
              'The pod of Jack Bellicec (Jeff Goldblum) is nearly replicated into a soulless clone. ',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'CENTER' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'a361k',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '8hp5b',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'c6n4d',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [
              { fontWeightValue: 700, type: 'BOLD' },
              { italicData: true, type: 'ITALIC' },
            ],
            text: '(Click on an image to scroll through the larger versions)',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'CENTER' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '3iosh',
      imageData: {
        caption: '4K frame shots courtesy of KL Studio Classics - Click for Amazon purchase ',
        containerData: {
          alignment: 'LEFT',
          spoiler: { enabled: false },
          textWrap: true,
          width: { size: 'SMALL' },
        },
        disableDownload: false,
        disableExpand: false,
        image: {
          height: 1500,
          src: {
            id: 'eb6f96_446b1c2504644ed4898e1a1669101593~mv2.jpg',
          },
          width: 962,
        },
        link: { target: 'BLANK', url: 'https://amzn.to/3D2n7k9' },
      },
      nodes: [],
      type: 'IMAGE',
    },
    {
      id: 'asn5p',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '26p4d',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '2u0rs',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'c1n82',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '8o7n9',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ fontWeightValue: 700, type: 'BOLD' }],
            text: '“INVASION OF THE BODY SNATCHERS”',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '69psm',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'fh3f8',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text:
              '4K Ultra HD, Blu-ray, 1978; PG for language and nudity; streaming via Amazon Prime Video, Apple TV, Vudu, YouTube',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '1d7hv',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '8cgf9',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ fontWeightValue: 700, type: 'BOLD' }],
            text: 'Best extra:',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text: ' Commentary with director Philip Kaufman',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'u0p7',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'c1hd2',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '6v5v7',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '1l9eh',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'fu4ev',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'eqil0',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'cpb0v',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'ai55j',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '3v5m3',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '6msto',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'cs6b9',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'b75bi',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'a0laq',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'KINO LORBER, the New York independent film distributor known for its award-winning international, documentary, independent, and classic cinema, is jumping feet first into 4K Ultra HD with a full lineup of titles from its KL Studio Classics series.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'g53d',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '894fm',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'Last year, during the middle of the pandemic, one title got the upgrade: George Miller’s post-apocalyptic thriller ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [
              {
                linkData: {
                  link: {
                    target: 'BLANK',
                    url:
                      'https://www.highdefwatch.com/post/buckle-up-mad-max-thunders-out-of-the-gate-with-a-lively-4k-makeover',
                  },
                },
                type: 'LINK',
              },
              { type: 'UNDERLINE', underlineData: true },
            ],
            text: '“Mad Max” (1979)',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text: ' starring Mel Gibson, which was graded with Dolby Vision.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'bgkbc',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '37j6i',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'Last spring, Sergio Leone’s Western classic “The Good, The Bad and the Ugly – Theatrical Cut” (1966) received a new shot-by-shot color grading and 4K scan. For some reason, no HDR grading was applied, but the added UHD resolution and adjusted colors gave the film new life. It quickly became Kino Lorber’s No. 1-selling Studio Classics title.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '9bpt6',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'cbiqe',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'In October, the multiple Oscar winner “The Silence of the Lambs: 30th Anniversary Edition” (1991) and Rob Reiner’s adaptation of Stephen King’s “Misery” (1990) were released on 4K. Both were graded with Dolby Vision. This month, John Woo’s action-packed “Hard Target” (1993) with Jean-Van Damme makes the jump.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'ffaja',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      galleryData: {
        containerData: {
          alignment: 'CENTER',
          spoiler: { enabled: false },
          textWrap: true,
          width: { size: 'FULL_WIDTH' },
        },
        disableDownload: false,
        disableExpand: false,
        items: [
          {
            image: {
              media: {
                height: 1666,
                src: {
                  url: 'eb6f96_c1fe250facc74442a3432a3223997031~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
          {
            image: {
              media: {
                height: 1672,
                src: {
                  url: 'eb6f96_399a0d96adc347d49b7e406e42d4f497~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
          {
            image: {
              media: {
                height: 1667,
                src: {
                  url: 'eb6f96_923fc7ae0d6e430990012c671acbc0ab~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
          {
            image: {
              media: {
                height: 1672,
                src: {
                  url: 'eb6f96_af589ddc4c704f1181444e2fb8a48929~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
        ],
        options: {
          item: { crop: 'FILL', spacing: 1 },
          layout: { orientation: 'ROWS', type: 'PANORAMA' },
          thumbnails: { placement: 'UNRECOGNIZED' },
        },
      },
      id: 'c3kn0',
      nodes: [],
      type: 'GALLERY',
    },
    {
      id: '3ifgd',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [
              { italicData: true, type: 'ITALIC' },
              { fontWeightValue: 700, type: 'BOLD' },
            ],
            text: '(1&2) ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text:
              'Alien spores fall from the sky and take root on the plant life and bear spectacular flowers. ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [
              { italicData: true, type: 'ITALIC' },
              { fontWeightValue: 700, type: 'BOLD' },
            ],
            text: '(3&4) ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text: 'Inspector Bennell finds rat waste in the kitchen of a high-end restaurant. ',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'CENTER' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '7fu9v',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '80b7m',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'dsd3g',
      imageData: {
        caption: 'Amazon preorder',
        containerData: {
          alignment: 'LEFT',
          spoiler: { enabled: false },
          textWrap: true,
          width: { size: 'SMALL' },
        },
        disableDownload: false,
        disableExpand: false,
        image: {
          height: 1500,
          src: {
            id: 'eb6f96_9b16f7f18b274ab5b27b7e2b8a6fd92c~mv2.jpg',
          },
          width: 1176,
        },
        link: { target: 'BLANK', url: 'https://amzn.to/3E9MuSs' },
      },
      nodes: [],
      type: 'IMAGE',
    },
    {
      id: '8f6e1',
      imageData: {
        caption: 'Amazon preorder ',
        containerData: {
          alignment: 'LEFT',
          spoiler: { enabled: false },
          textWrap: true,
          width: { size: 'SMALL' },
        },
        disableDownload: false,
        disableExpand: false,
        image: {
          height: 1500,
          src: {
            id: 'eb6f96_3afac47454804054a5bf217ec949ae92~mv2.jpg',
          },
          width: 1176,
        },
        link: { target: 'BLANK', url: 'https://amzn.to/3EbYnqY' },
      },
      nodes: [],
      type: 'IMAGE',
    },
    {
      id: '2rgm2',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '8jrmh',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'desfo',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '690ni',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'But in early 2022, the floodgates start to open with two all-time favorites. The World War II classic “The Great Escape” (1962), with an all-star cast including Steve McQueen, James Garner, James Coburn, and Charles Bronson, arrives January 11, without HDR grading. The following week it’s Billy Wilder’s comedy masterpiece “Some Like it Hot” (1958) with Tony Curtis, Jack Lemmon, and Marilyn Monroe, and with Dolby Vision.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '4q4gr',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '1kcjb',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'And more are on the way: Stanley Kubrick’s anti-war film “Paths of Glory” (1957), Orson Welles film noir classic “Touch of Evil” (1958), Wilder’s Best Picture winner “The Apartment” (1960), Brian De Palma’s suspense thriller “Dressed to Kill” (1980), the Cold War spy thriller “Tinker Tailor Soldier Spy” (2011), John Waters’ comedy “Cry-Baby (1990), William Friedkin’s neo-noir thriller “To Live and Die in L.A.” (1985), Steven Soderbergh’s “Out of Sight” (1998) and another installment of Leone’s ‘Man with No Name’ trilogy, “A Fistful of Dollars” (1964). Most will be graded with HDR10 and Dolby Vision. ',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '566jg',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'd5nmv',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'embub',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '2phno',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'a5c48',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      galleryData: {
        containerData: {
          alignment: 'CENTER',
          spoiler: { enabled: false },
          textWrap: true,
          width: { size: 'FULL_WIDTH' },
        },
        disableDownload: false,
        disableExpand: false,
        items: [
          {
            image: {
              media: {
                height: 1669,
                src: {
                  url: 'eb6f96_ceb5855f32fa4b52b3722f844b2b18aa~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
          {
            image: {
              media: {
                height: 1675,
                src: {
                  url: 'eb6f96_f003583041664fb6b4ee8f7f6f4a0781~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
          {
            image: {
              media: {
                height: 1676,
                src: {
                  url: 'eb6f96_7b5a4272e519406aae931f1dc1204426~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
          {
            image: {
              media: {
                height: 1678,
                src: {
                  url: 'eb6f96_c413354cd54b4d45a2c5355b48a67bb1~mv2.jpg',
                },
                width: 3100,
              },
            },
          },
        ],
        options: {
          item: { crop: 'FILL', spacing: 1 },
          layout: { orientation: 'ROWS', type: 'PANORAMA' },
          thumbnails: { placement: 'UNRECOGNIZED' },
        },
      },
      id: 'f18o4',
      nodes: [],
      type: 'GALLERY',
    },
    {
      id: 'epqa3',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: '(1) ' },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text: "Elizabeth Driscoll's boyfriend ",
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text: 'Dr. Geoffrey Howell (Art Hindle), ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text: 'wakes up a different person',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '5klmk',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'aol6p',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'f2e92',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'bmlri',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'et3i1',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ fontWeightValue: 700, type: 'BOLD' }],
            text: 'Last week,',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text: ' the chilling ‘70s remake ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ fontWeightValue: 700, type: 'BOLD' }],
            text: '“Invasion of the Body Snatchers”',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              ' from director Philip Kaufman (“The Right Stuff”) was released on 4K UHD. Jack Finney’s 1950s paranoia novel “Body Snatchers” was first adapted in 1956 by young director Don Siegel (“Dirty Harry”); over the years, “Invasion of the Body Snatchers,” set in Santa Mira, a small California town, where folks fall asleep only to awaken transformed into soulless look-a-likes, has become a cult favorite. Its similarities to the Cold War “Red Scare” and the possible takeover of the American way of life are undeniable.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '6ihev',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '9ci5e',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'Kaufman and screenwriter W.D. Richter decided to move their story to San Francisco, which happened to be Kaufman’s favorite city, and where he lived. They also agreed it wouldn’t have any political overtones, just the threat of “losing your identity and humanity,” says Richter during one of the nine carryover featurettes.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'aqnki',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'abkkl',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'The protagonist from the first film, Dr. Miles Bennell, played by Kevin McCarthy, makes a frightening “They’re coming!” cameo. and Siegel has a cameo as a taxi driver. This time the protagonists are public health inspector Matthew Bennell (Donald Sutherland) and lab technician Elizabeth Driscoll (Brooke Adams). They end up at the dock front district at night where the alien seed pods are being cultivated. Staying awake is their only hope',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '2sekf',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '3t4m',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'The film opens as spores from a barren planet end up on Earth, spreading spidery webs and pink flowers all over the Bay Area. Elizabeth notices a change in her boyfriend Dr. Geoffrey Howell (Art Hindle), who has become distant with her and meets clandestinely with mysterious groups of people. Matthew recruits his psychiatrist friend Dr. David Kibner (Leonard Nimoy) to look for an explanation for Geoffrey’s bizarre behavior. All over the city, people are claiming a similar pattern with family members and friends.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'eaioa',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '61c8c',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '9a3dh',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '8q5ri',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ fontWeightValue: 700, type: 'BOLD' }],
            text: 'EXTRAS',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'ermur',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'Kaufman’s running commentary is one of the best, providing an endless stream of backstories and insights into his $4 million, low-budget production. During the opening moments, he points out the futurist Transamerica Pyramid Tower, which is framed in a number of shots. They dubbed it “Pod Central,” because the insurance/investment corporation financed the film.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '720m8',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '4s1df',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              "Kaufman establishes the paranoia in the opening frames as a strange-looking elementary school teacher walks her students toward a playground. Look closely and you’ll see actor Robert Duvall, in a 10-second cameo, playing a priest on a swing. He’s the film's first pod, and Duvall did it for no money. Kaufman got him a nice Eddie Bauer jacket to keep him warm.",
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'd137b',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'qk7l',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'Author/film historian Steve Haberman, reading from a prepared script, provides a lesser, academic-style second commentary.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'cs166',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'dehl4',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'The featurette “Re-Creating the Invasion” includes an interview with Richter, who details his first draft. It was originally centered around another small California town, but filming in a city gave it “more energy, more mystery, deeper darker shadows, and with lights twinkling in the background,” he says, adding that Finney’s novel was so popular because “it plays on our fear that people all around us are turning behind our backs. And, if we close our eyes, they will get us.”',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '3jjms',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'efmgo',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'To keep the terror at a fever-pitch, Richter and Kaufman had Matthew smash the head of his own pod. “It was time to install the paranoia to say these aren’t dusty vegetable husks but flesh and blood in a weird way,” he says. “If you hit it with a shovel it’s going to rupture.”',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '1ifcl',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '1aumj',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'In “Re-Visitors from Outer Space, or How I Learned to Stop Worrying and Love the Pod,” Kaufman recalls visiting Siegel – who he already knew – to get his blessing for the redux. To his surprise, McCarthy happened to pop in. He and Siegel told Kaufman that studio executives had sliced the dark comedy moments out, which “would’ve made the movie scarier.” In the remake, Jeff Goldblum as writer Jack Bellicec, handles the comedic moments nicely. We also learn that Sutherland was hit by a Volkswagen Bug while out running before a night shot. He wasn’t badly injured but rolled over the windshield.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '18cgq',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '6t0r0',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'During the featurette “Star-Crossed in the Invasion,” Adams recalls how she and Sutherland were starting to fall for each other, just like their characters. She also demonstrates her trick of rolling her eyes in fast circles, which Matthew asks Elizabeth to do to show that she isn’t crazy. ',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'b6hkp',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'cb0tj',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '2mfv9',
      nodes: [
        {
          id: 'ckkbl',
          nodes: [
            {
              id: '',
              nodes: [],
              textData: {
                decorations: [],
                text:
                  '“It [Invasion of the Body Snatchers] was exciting, politically sensible, intellectually and heartfelt and continues to garner praise and people still watch it. It was a pleasure to do it.” – Donald Sutherland',
              },
              type: 'TEXT',
            },
          ],
          paragraphData: {
            indentation: 0,
            textStyle: { textAlignment: 'AUTO' },
          },
          type: 'PARAGRAPH',
        },
      ],
      type: 'BLOCKQUOTE',
    },
    {
      id: '55is1',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 't634',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '2mned',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '4a6m2',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ fontWeightValue: 700, type: 'BOLD' }],
            text: 'VIDEO',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'hjqk',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'The original 35mm camera negative was scanned in 4K, which extracts a good dose of natural film grain and excellent clarity from distant shots to close-ups. Kaufman approved the HDR10 and Dolby Vision color grading -- colors are rich and bold while the overall tone is darker on the 4K than the enclosed Blu-ray, which was sourced from the 4K master. The shadows and nighttime chase scenes have deep blacks while providing detail in the mid-shadows.',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'aovdr',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'evulu',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'The 4K imagery from cinematographer Michael Chapman (“Taxi Driver,” “Raging Bull”) has a unique film noir quality. The deep shadows, bizarre camera angles, and reflections are preserved nicely. ',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '76lmg',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: '90l72',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ fontWeightValue: 700, type: 'BOLD' }],
            text: 'AUDIO',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'b9v8u',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              'The six-channel DTS-HD soundtrack seems to be ported over from a previous Blu-ray; the dialogue, the music cues from Denny Zeithin’s score, sound effects, and high-pitched screams are clear and balanced. And “Amazing Grace,” played by the Royal Scot Dragoon Guards as the pods are loaded onto a cargo ship, is nothing short of haunting. ',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'bk6d1',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: ' ' },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'f52hd',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [],
            text:
              '“Invasion of the Body Snatchers” doesn’t just still grab you, it may be one of the best sci-fi horror films of the 1970s, right up there with “Alien.” Hats off to Kino Lorber for its commitment to the 4K format. keep them coming!',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'b822r',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'cg3r3',
      nodes: [
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text: ' ',
          },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: { decorations: [], text: '– ' },
          type: 'TEXT',
        },
        {
          id: '',
          nodes: [],
          textData: {
            decorations: [{ italicData: true, type: 'ITALIC' }],
            text: 'Bill Kelley III, High-Def Watch producer',
          },
          type: 'TEXT',
        },
      ],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
    {
      id: 'sdaq',
      nodes: [],
      paragraphData: {
        indentation: 0,
        textStyle: { textAlignment: 'AUTO' },
      },
      type: 'PARAGRAPH',
    },
  ],
};
describe('test', () => {
  it('should convert external block', () => {
    // const res = fromDraft(faulty);

    // console.log('XXXX', res.nodes[2].galleryData?.options?.thumbnails);
    const res2 = RichContent.fromJSON(content);
    console.log('XXXX', res2.nodes[2].galleryData?.options?.thumbnails);
    expect(true).toBe(true);
  });
});
