/* eslint-disable max-len */
export const mockFetchUrlPreviewData = () => {
  let index = 0;
  return async (url: string) => {
    const supportEmbed = embedTypes.filter(type => url.includes(type))[0];
    let res;
    if (url.includes('mockUrl')) {
      res = mockHtml;
    } else if (supportEmbed) {
      res = mockOembedResults[supportEmbed];
    } else {
      res = mockLinkPreviewResults[index++ % mockLinkPreviewResults.length];
    }
    return new Promise(resolve => {
      setTimeout(() => resolve(res), 1);
    });
  };
};

const embedTypes = ['instagram', 'twitter', 'youtube', 'tiktok', 'spotify'];

const mockLinkPreviewResults = [
  {
    title: 'A mock title',
    description: 'A mock description',
    thumbnail_url:
      'https://image.insider.com/5de5784979d757159d0b6838?width=1100&format=jpeg&auto=webp', //eslint-disable-line
    provider_url: 'www.mockUrl.com',
  },
  {
    title: 'Link Preview without image',
    description: 'A mock description',
    provider_url: 'www.mockUrl.com',
  },
  {
    title: 'Link Preview with title only',
    provider_url: 'www.mockUrl.com',
  },
  {
    title: 'Free Website Builder | Create a Free Website | Wix.com',
    description:
      '	Create a free website with Wix.com. Choose a stunning template and customize anything with the Wix website builder—no coding skills needed. Create yours today!', //eslint-disable-line
    thumbnail_url:
      'https://static.wixstatic.com/media/5305c5_5f112df56dcd40a29e855baae08f19ce~mv2.jpg/v1/fill/w_600,h_315,al_c/5305c5_5f112df56dcd40a29e855baae08f19ce~mv2.jpg', //eslint-disable-line
    provider_url: 'www.wix.com',
  },
  {
    title: '9 Yummy Snacks From South Korea That Make Great Souvenirs for Everyone',
    description:
      '	Its the holiday season now and many people are either on vacation already or prepping for their next trip during this time. One of the popular destinations that Malaysians love to visit would be Seoul,', //eslint-disable-line
    thumbnail_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/220px-Good_Food_Display_-_NCI_Visuals_Online.jpg', //eslint-disable-line
    provider_url: 'https://www.worldofbuzz.com/',
  },
  {
    title:
      'Fiesta Latina 2019 - Maluma, Luis Fonsi, Ozuna, J Balvin, CNCO, J Balvin - Latin Hits Mix 2019', //eslint-disable-line
    thumbnail_url:
      'https://static.wixstatic.com/media/8bb438_603549efcb714170bb71fe0757f37561.jpg/v1/fill/w_125,h_51,fp_0.50_0.50,q_10/8bb438_603549efcb714170bb71fe0757f37561.webp', //eslint-disable-line
    provider_url: 'https://www.youtube.com',
  },
];

const mockOembedResults = {
  instagram: {
    thumbnail_url:
      'https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/82164289_127260265150288_4542272549653373873_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=1&_nc_ohc=I24Fu5ZUEUoAX9rlM6L&oh=e474741fbd01d0791b5ed779fca753ee&oe=5EACC24B',
    provider_url: 'https://www.instagram.com',
    html: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/B77rfBfn0V7/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/B77rfBfn0V7/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/B77rfBfn0V7/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Beyoncé (@beyonce)</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2020-01-30T05:43:40+00:00">Jan 29, 2020 at 9:43pm PST</time></p></div></blockquote>\n<script async src="//www.instagram.com/embed.js"></script>',
  },
  twitter: {
    provider_url: 'https://twitter.com',
    html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Eleven veterans who live at the Soldiers&#39; Home in Holyoke, Massachusetts, have died and five of them tested positive for coronavirus.<br><br>Tests are still pending for five other veterans who passed away, and the status of the last one is unknown, officials say <a href="https://t.co/rTVjn9FiBC">https://t.co/rTVjn9FiBC</a></p>&mdash; CNN (@CNN) <a href="https://twitter.com/CNN/status/1244886173409034240?ref_src=twsrc%5Etfw">March 31, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
  },
  youtube: {
    title:
      'עידן רייכל - ואם תבואי אליי - (Idan Raichel - VeEem Tavoee Elay (And If You Will Come To Me',
    thumbnail_url: 'https://i.ytimg.com/vi/nI8n20UpaBY/hqdefault.jpg',
    provider_url: 'https://www.youtube.com/',
    html: '<iframe width="480" height="270" src="//www.youtube.com/embed/nI8n20UpaBY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  },
  tiktok: {
    title: '#ohnanachallenge #ohnachallenge #ohnanana #lablife @likgamaev',
    thumbnail_url: 'https://www.tiktok.com/@dayana_yaish',
    provider_url: 'https://www.tiktok.com',
    html: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@dayana_yaish/video/6794733203912445189" data-video-id="6794733203912445189" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@dayana_yaish" href="https://www.tiktok.com/@dayana_yaish">@dayana_yaish</a> <p><a title="ohnanachallenge" target="_blank" href="https://www.tiktok.com/tag/ohnanachallenge">#ohnanachallenge</a> <a title="ohnachallenge" target="_blank" href="https://www.tiktok.com/tag/ohnachallenge">#ohnachallenge</a> <a title="ohnanana" target="_blank" href="https://www.tiktok.com/tag/ohnanana">#ohnanana</a> <a title="lablife" target="_blank" href="https://www.tiktok.com/tag/lablife">#lablife</a> @likgamaev</p> <a target="_blank" title="♬ Oh Nanana - Remix - dj 6rb & bonde r300" href="https://www.tiktok.com/music/Oh-Nanana-Remix-6624126913629653766">♬ Oh Nanana - Remix - dj 6rb & bonde r300</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
  },
  spotify: {
    provider_url: 'https://www.spotify.com',
    html: '<iframe width="100%" height="80" title="Spotify Embed: Grateful"  frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src="https://open.spotify.com/embed/track/2wmZFiWL7MKt2vQe6DPanz?si=aeab9fbc67954570&utm_source=oembed"></iframe>',
  },
};

const mockHtml = {
  title: 'I am a mock html',
  html: '<div style="background-color: black; border: 10px solid pink; height: 400px; text-align: center; color: white;">This is a mock embed</div>',
};
