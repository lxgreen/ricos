(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{155:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return I})),n.d(t,"metadata",(function(){return D})),n.d(t,"toc",(function(){return N})),n.d(t,"default",(function(){return M}));var i=n(3),a=n(7),o=n(0),r=n.n(o),s=n(167),l=n(389),c=(n(58),n(168)),p=n.n(c),d=n(166),u=n(165),g=n(401),h=function(e,t){return(h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function m(e,t){function n(){this.constructor=e}h(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var b=function(){return(b=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},f="wix-draft-plugin-image",v=Object.freeze({config:{alignment:"center",size:"content",showTitle:!0,showDescription:!0,disableExpand:!1}}),y={fontElementMap:"_1qP7j",imageContainer:"_2o-_D",expandContainer:"_1YyhG",expandIcon:"_1K20D",pointer:"LPH2h",imageWrapper:"_3lvoN",image:"_5JW6l",imageOverlay:"_3vvs8",imageCaption:"_1cwDk",imagePreload:"_2ERz3",imageHighres:"_36UM9",onlyHighRes:"_3mwbj",image_loading:"_1VrV4"},j=function(e){return r.a.createElement("svg",b({viewBox:"0 0 19 19",xmlns:"http://www.w3.org/2000/svg"},e),r.a.createElement("path",{d:"M15.071 8.371V4.585l-4.355 4.356a.2.2 0 0 1-.283 0l-.374-.374a.2.2 0 0 1 0-.283l4.356-4.355h-3.786a.2.2 0 0 1-.2-.2V3.2c0-.11.09-.2.2-.2H16v5.371a.2.2 0 0 1-.2.2h-.529a.2.2 0 0 1-.2-.2zm-6.5 6.9v.529a.2.2 0 0 1-.2.2H3v-5.371c0-.11.09-.2.2-.2h.529c.11 0 .2.09.2.2v3.786l4.355-4.356a.2.2 0 0 1 .283 0l.374.374a.2.2 0 0 1 0 .283L4.585 15.07h3.786c.11 0 .2.09.2.2z",fill:"#000",fillRule:"nonzero"}))},_=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleFocus=function(e){e.stopPropagation(),t.props.setFocusToBlock(),t.props.setInPluginEditingMode(!0)},t.handleBlur=function(){return t.props.setInPluginEditingMode(!1)},t.handleKeyPress=function(e){var n=t.props,i=n.setFocusToBlock,a=n.value;"Enter"===e.key&&i&&""!==a&&(t.handleBlur(),i())},t.onChange=function(e){var n,i;return null===(i=(n=t.props).onChange)||void 0===i?void 0:i.call(n,e.target.value)},t}return m(t,e),t.prototype.render=function(){var e=p()("_20LAv",this.props.className);return r.a.createElement("input",{className:e,value:this.props.value,onChange:this.onChange,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyPress:this.handleKeyPress,dir:"auto"})},t.defaultProps={setInPluginEditingMode:function(){return!1},setFocusToBlock:function(){return!1}},t}(o.Component),x=function(e){function t(t){var n=e.call(this,t)||this;return n.forceOnImageLoad=function(){var e=0,t=setInterval((function(){var i,a;(null===(a=null===(i=n.imageRef)||void 0===i?void 0:i.current)||void 0===a?void 0:a.complete)&&(n.onImageLoad(n.imageRef.current),clearInterval(t)),10==++e&&clearInterval(t)}),200)},n.onImageLoadError=function(){var e=n.props.componentData.src;e&&e.fallback&&n.setState({fallbackImageSrc:{preload:e.fallback,highres:e.fallback}})},n.renderImage=function(e,t,i,a,o,r){var s;return n.getImage(p()(e,n.styles.imageHighres,((s={})[n.styles.onlyHighRes]=r,s)),t.highres,i,a,{fadeIn:!o,width:t.highresWidth,height:t.highresHeight})},n.renderPreloadImage=function(e,t,i,a){return n.getImage(p()(e,n.styles.imagePreload),t.preload,i,b({"aria-hidden":!0},a),{useSrcSet:!0})},n.onImageLoad=function(e){e.style.opacity=1,n.preloadRef.current&&(n.preloadRef.current.style.opacity="0")},n.handleExpand=function(e){var t;e.preventDefault();var i=n.props,a=i.settings.onExpand,o=i.helpers,r=void 0===o?{}:o;null===(t=r.onViewerAction)||void 0===t||t.call(r,f,"Click","expand_image"),n.hasExpand()&&(null==a||a(n.props.blockKey))},n.scrollToAnchor=function(e){var t=n.props,i=t.componentData.config.link,a=(void 0===i?{}:i).anchor,o=t.customAnchorScroll;if(o)o(e,a);else{var r="viewer-"+a,s=document.getElementById(r);Object(u.cb)(r),Object(u.eb)(s)}},n.hasLink=function(){var e,t,i;return null===(i=null===(t=null===(e=n.props.componentData)||void 0===e?void 0:e.config)||void 0===t?void 0:t.link)||void 0===i?void 0:i.url},n.hasAnchor=function(){var e,t,i;return null===(i=null===(t=null===(e=n.props.componentData)||void 0===e?void 0:e.config)||void 0===t?void 0:t.link)||void 0===i?void 0:i.anchor},n.onKeyDown=function(e){"Enter"!==e.key&&" "!==e.key||n.props.getInPluginEditingMode||n.handleClick(e)},n.handleClick=function(e){if(n.hasLink())return null;n.hasAnchor()?(e.preventDefault(),e.stopPropagation(),n.scrollToAnchor(e)):n.handleExpand(e)},n.handleRef=function(e){n.state.container||n.setState({container:e})},n.handleContextMenu=function(e){var t=n.props.componentData.disableDownload;return void 0!==t&&t&&e.preventDefault()},n.hasExpand=function(){var e=n.props,t=e.componentData,i=e.settings,a=!1;return void 0!==t.disableExpand?a=t.disableExpand:void 0!==i.disableExpand&&(a=i.disableExpand),!a&&i.onExpand},n.renderExpandIcon=function(){return r.a.createElement("div",{className:n.styles.expandContainer},r.a.createElement(j,{className:n.styles.expandIcon,onClick:n.handleExpand}))},Object(u.Lb)(t.componentData,g),n.state={},n.preloadRef=r.a.createRef(),n.imageRef=r.a.createRef(),n}return m(t,e),t.prototype.shouldUseSrcSet=function(){var e,t=this.context.experiments;return null===(e=null==t?void 0:t.useSrcSet)||void 0===e?void 0:e.enabled},t.prototype.componentDidMount=function(){this.setState({ssrDone:!0}),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&this.forceOnImageLoad()},t.prototype.componentWillReceiveProps=function(e){Object(d.isEqual)(e.componentData,this.props.componentData)||Object(u.Lb)(e.componentData,g)},t.prototype.calculateHeight=function(e,t){return void 0===e&&(e=1),t&&t.height&&t.width?Math.ceil(t.height/t.width*e):u.bb.SIZE},t.prototype.getImageDataUrl=function(){return this.props.dataUrl?{preload:this.props.dataUrl,highres:this.props.dataUrl}:null},t.prototype.getImageUrl=function(e){var t,n,i,a,o,r=this,s=this.props||{},l=s.helpers,c=s.seoMode;if(!e&&(null==l?void 0:l.handleFileSelection))return null;var p,d,g=null===(i=null===(n=this.context.experiments)||void 0===n?void 0:n.removeUsmFromImageUrls)||void 0===i?void 0:i.enabled,h={preload:"",highres:""},m={};if(!this.props.isMobile&&!Object(u.zb)(e)&&(null===(o=null===(a=this.context.experiments)||void 0===a?void 0:a.useQualityPreload)||void 0===o?void 0:o.enabled)){var f=this.props.componentData.config,v=f.alignment,y=f.width;m=b({removeUsm:g,imageType:"quailtyPreload"},("left"===v||"right"===v)&&!y&&{requiredWidth:300})}return h.preload=Object(u.rb)(e,null==l?void 0:l.getImageUrl,m),c?(p=(null==e?void 0:e.width)&&Math.min(e.width,1e3),d=this.calculateHeight(1e3,e)):this.state.container&&(t=function(t,n){var i,a=t||1;return n&&!Object(u.Ab)()&&(a*=window.devicePixelRatio,a*=window.screen.width/document.body.clientWidth),i=r.calculateHeight(a,e),[a=Math.ceil(a),i=Math.ceil(i)]}(this.state.container.getBoundingClientRect().width||(null==e?void 0:e.width),this.props.isMobile),p=t[0],d=t[1]),h.highres=Object(u.rb)(e,null==l?void 0:l.getImageUrl,{removeUsm:g,requiredWidth:p,requiredHeight:d,requiredQuality:90,imageType:"highRes"}),this.state.ssrDone&&!h.preload&&console.error("image plugin mounted with invalid image source!",e),h},t.prototype.getImage=function(e,t,n,i,a){var o=this;void 0===a&&(a={});var s,l=a.fadeIn,c=void 0!==l&&l,p=a.width,d=a.height,u=a.useSrcSet;return this.shouldUseSrcSet()&&u&&("webp",s=t.replace(/(.*)\.(jp(e)?g|png)$/,"$1.webp")),r.a.createElement("img",b({},i,{className:e,src:t,srcSet:s,alt:n,onError:this.onImageLoadError,onLoad:c?function(e){return o.onImageLoad(e.target)}:void 0,ref:c?this.imageRef:this.preloadRef,width:p,height:d}))},t.prototype.renderTitle=function(e,t){return!!(e.config||{}).showTitle&&r.a.createElement("div",{className:p()(t.imageTitle)},e&&e.title||"")},t.prototype.renderDescription=function(e,t){return!!(e.config||{}).showDescription&&r.a.createElement("div",{className:p()(t.imageDescription)},e&&e.description||"")},t.prototype.renderCaption=function(e){var t=this.props,n=t.onCaptionChange,i=t.setFocusToBlock,a=t.setInPluginEditingMode,o=this.styles,s=o.imageCaption,l=o.link,c=p()(s,this.hasLink()&&l);return n?r.a.createElement(_,{setInPluginEditingMode:a,className:c,value:e,onChange:n,setFocusToBlock:i}):r.a.createElement("span",{dir:"auto",className:c},e)},t.prototype.shouldRenderCaption=function(){var e,t=this.props,n=t.getInPluginEditingMode,i=t.settings,a=t.componentData,o=t.defaultCaption,r=null===(e=a.metadata)||void 0===e?void 0:e.caption;if(Object(d.includes)(Object(d.get)(i,"toolbar.hidden"),"settings"))return!1;if(void 0===r||""===r&&!(null==n?void 0:n())||r===o)return!1;var s=a||v;return"original"!==s.config.size||!s.src||!s.src.width||s.src.width>=350},t.prototype.render=function(){var e,t,n;this.styles=this.styles||Object(u.Db)({styles:y,theme:this.props.theme});var i=this.props,a=i.componentData,o=i.className,s=i.settings,l=i.setComponentUrl,c=i.seoMode,g=this.state,h=g.fallbackImageSrc,m=g.ssrDone,f=a||v,j=a.metadata,_=void 0===j?{}:j,x=p()(this.styles.imageWrapper,o,((e={})[this.styles.pointer]=this.hasExpand(),e)),w=this.styles.image,O=h||this.getImageDataUrl()||this.getImageUrl(f.src),k={};f.src&&s&&s.imageProps&&(k=Object(d.isFunction)(s.imageProps)?s.imageProps(f.src):s.imageProps);var E=null===(n=null===(t=null==O?void 0:O.highres)||void 0===t?void 0:t.endsWith)||void 0===n?void 0:n.call(t,".gif");null==l||l(null==O?void 0:O.highres);var C=!c&&O&&!E,I=O&&(c||m)||E,D=!this.hasLink()&&{role:"button",tabIndex:0},N=c||E;return r.a.createElement("div",b({"data-hook":"imageViewer",className:this.styles.imageContainer,ref:this.handleRef,onContextMenu:this.handleContextMenu},D),r.a.createElement("div",{className:x,"aria-label":_.alt,onClick:this.handleClick,onKeyDown:this.onKeyDown},C&&this.renderPreloadImage(w,O,_.alt,k),I&&this.renderImage(w,O,_.alt,k,E,N),this.hasExpand()&&this.renderExpandIcon()),this.renderTitle(f,this.styles),this.renderDescription(f,this.styles),this.shouldRenderCaption()&&this.renderCaption(_.caption))},t.contextType=u.r,t}(r.a.Component),w=function(e,t){var n=e.config||{},i=n.size,a=n.width;return!("inline"===i&&Object(d.isNumber)(a)&&a<=150)&&t},O={component:x,classNameStrategies:{size:function(e,t,n,i){var a=(e.config||{}).size;return!a||i&&"original"===a?"":w(e,i)?p()(n.sizeFullWidth,t.sizeFullWidth):p()(n["size"+Object(d.upperFirst)(Object(d.camelCase)(a))],t["size"+Object(d.upperFirst)(Object(d.camelCase)(a))])},alignment:function(e,t,n,i){var a=e.config||{},o=a.alignment,r=a.size;if(!o||w(e,i)&&"original"!==r)return"";var s=o;if("original"===r&&"center"!==o){var l=(e.src||{}).width;Object(d.isNumber)(l)&&l>350&&(s="center")}return p()(n["align"+Object(d.upperFirst)(s)],t["align"+Object(d.upperFirst)(s)])}}},k=function(){var e;return(e={}).IMAGE=O,e[f]=O,e},E=n(517),C=(n(59),n(57),n(811)),I={id:"content_application",title:"Content Applications",sidebar_label:"Content Applications"},D={unversionedId:"content_api/content_application",id:"content_api/content_application",isDocsHomePage:!1,title:"Content Applications",description:"Abstract",source:"@site/docs/content_api/content_application.mdx",slug:"/content_api/content_application",permalink:"/docs/content_api/content_application",editUrl:"https://github.com/wix/ricos/edit/master/website/docs/content_api/content_application.mdx",version:"current",sidebar_label:"Content Applications",sidebar:"api",previous:{title:"Content Modifier",permalink:"/docs/content_api/content_modify"},next:{title:"Translatables",permalink:"/docs/content_api/translatables_api"}},N=[{value:"Abstract",id:"abstract",children:[]},{value:"<code>getText</code>",id:"gettext",children:[]},{value:"<code>getPluginData</code>",id:"getplugindata",children:[]},{value:"<code>getMedia</code>",id:"getmedia",children:[]}],R={toc:N};function M(e){var t,n=e.components,o=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(i.a)({},R,o,{components:n,mdxType:"MDXLayout"}),Object(s.b)("h3",{id:"abstract"},"Abstract"),Object(s.b)("p",null,"While ",Object(s.b)("a",{parentName:"p",href:"./ContentBuilder"},"Content Builder"),", ",Object(s.b)("a",{parentName:"p",href:"./content_extract"},"Content Extractor")," and ",Object(s.b)("a",{parentName:"p",href:"./content_modify"},"Content Modifier")," APIs are very flexible, yet they also too generic."),Object(s.b)("p",null,"The ",Object(s.b)("inlineCode",{parentName:"p"},"content-application")," is a collection of more specific APIs which aim to reduce boilerplate for consumer."),Object(s.b)("h3",{id:"gettext"},Object(s.b)("inlineCode",{parentName:"h3"},"getText")),Object(s.b)("p",null,"Extracts textual content of Headers & Paragraphs from a given content"),Object(s.b)("h4",{id:"example"},"Example"),Object(s.b)("div",{className:"card"},Object(s.b)(l.a,{content:{blocks:[{key:"d79aa",text:"This is an example content, with header 3",type:"header-three",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"d79ab",text:"and header 4",type:"header-four",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}}],entityMap:{},VERSION:"7.5.0"},mdxType:"RicosViewer"})),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"import { getText } from 'ricos-content/libs/content-application';\n\nconst text = getText(content); // input content\n\nconsole.log(text);\n")),Object(s.b)("h5",{id:"output"},"Output"),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},'["This is an example content, with header 3 ", "and header 4"]')),Object(s.b)("hr",null),Object(s.b)("h3",{id:"getplugindata"},Object(s.b)("inlineCode",{parentName:"h3"},"getPluginData")),Object(s.b)("p",null,"Extracts data of a plugin from a given content."),Object(s.b)("h4",{id:"example-1"},"Example"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"import { getPluginData } from 'ricos-content/libs/content-application';\nimport { content } from 'somewhere';\n\nconst pluginData = getPluginData(content, 'IMAGE');\nconsole.log(pluginData);\n")),Object(s.b)("h5",{id:"output-1"},"Output"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"[\n  {\n    image: { ... },\n    altText: 'alt1',\n    caption: 'Cool image',\n    // ...\n  },\n  {\n    image: { ... },\n    altText: 'alt2',\n    caption: 'Cool image 2',\n    // ...\n  },\n];\n")),Object(s.b)("hr",null),Object(s.b)("h3",{id:"getmedia"},Object(s.b)("inlineCode",{parentName:"h3"},"getMedia")),Object(s.b)("p",null,"Extracts all media data from a given content"),Object(s.b)("h4",{id:"example-2"},"Example"),Object(s.b)("p",null,"For this given content:"),Object(s.b)("div",{className:"card"},Object(s.b)(l.a,{content:C,plugins:[{config:b(b({},v.config),t),type:f,typeMapper:k},Object(E.a)()],mdxType:"RicosViewer"})),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"import { getMedia } from 'ricos-content/libs/content-application';\n\nconst media = getMedia(content); //content = given input example\nconsole.log(pluginData);\n")),Object(s.b)("h5",{id:"output-2"},"Output"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"[\n  {\n    src: {\n      url: 'https://youtu.be/oCBpJkG6ngE',\n    },\n  },\n  {\n    src: {\n      id: '8bb438_4af301c080294224b6b5e15cd38a035f.jpg'\n    }\n    width: 1920,\n    height: 1280\n  }\n];\n")))}M.isMDXComponent=!0},188:function(e,t,n){var i={"./messages_ar.json":[195,88],"./messages_bg.json":[196,89],"./messages_ca.json":[197,90],"./messages_cs.json":[198,91],"./messages_da.json":[199,92],"./messages_de.json":[200,93],"./messages_el.json":[201,94],"./messages_en.json":[189,2],"./messages_es.json":[202,95],"./messages_fi.json":[203,96],"./messages_fr.json":[204,97],"./messages_he.json":[205,98],"./messages_hi.json":[206,99],"./messages_hu.json":[207,100],"./messages_id.json":[208,101],"./messages_it.json":[209,102],"./messages_ja.json":[210,103],"./messages_ko.json":[211,104],"./messages_lt.json":[212,105],"./messages_ms.json":[213,106],"./messages_nl.json":[214,107],"./messages_no.json":[215,108],"./messages_pl.json":[216,109],"./messages_pt.json":[217,110],"./messages_ro.json":[218,111],"./messages_ru.json":[219,112],"./messages_sk.json":[220,113],"./messages_sl.json":[221,114],"./messages_sv.json":[222,115],"./messages_th.json":[223,116],"./messages_tl.json":[224,117],"./messages_tr.json":[225,118],"./messages_uk.json":[226,119],"./messages_vi.json":[227,120],"./messages_zh.json":[228,121]};function a(e){if(!n.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],a=t[0];return n.e(t[1]).then((function(){return n.t(a,3)}))}a.keys=function(){return Object.keys(i)},a.id=188,e.exports=a},401:function(e){e.exports=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"https://wix-rich-content/image-content-data-schema.json","type":"object","required":["src"],"properties":{"config":{"$id":"/properties/config","type":"object","title":"configuration","properties":{"size":{"$id":"/properties/config/properties/size","enum":["content","small","original","fullWidth","inline"],"title":"size","examples":["content","small","original","fullWidth","inline"]},"alignment":{"$id":"/properties/config/properties/alignment","enum":["left","right","center"],"title":"alignment","examples":["left","right","center"]},"showTitle":{"$id":"/properties/config/properties/showTitle","type":"boolean","title":"show title","default":false,"examples":[true]},"showDescription":{"$id":"/properties/config/properties/showDescription","type":"boolean","title":"show description","default":false,"examples":[true]},"anchor":{"$id":"/properties/config/properties/anchor","type":"string","title":"anchor","examples":["2jlo1"]},"link":{"$id":"/properties/config/properties/link","type":["object","null"],"required":["url"],"properties":{"url":{"$id":"/properties/config/properties/link/properties/url","type":"string","title":"URL","examples":["wix.com"]},"target":{"$id":"/properties/config/properties/link/properties/target","enum":["_blank","_self","_top"],"title":"link target","examples":["_blank"]},"rel":{"$id":"/properties/config/properties/link/properties/rel","type":"string","title":"link rel","default":"noopener","examples":["nofollow","noreferrer"]}}}}},"src":{"$id":"/properties/src","type":["object","string","null"],"properties":{"id":{"$id":"/properties/src/properties/id","type":"string","title":"id","examples":["8310d26374ed948918b9914ea076e411"]},"original_file_name":{"$id":"/properties/src/properties/original_file_name","type":"string","title":"The original file name","examples":["8bb438_b5957febd0ed45d3be9a0e91669c65b4.jpg"]},"file_name":{"$id":"/properties/src/properties/file_name","type":"string","title":"The file name","examples":["8bb438_b5957febd0ed45d3be9a0e91669c65b4.jpg"]},"width":{"$id":"/properties/src/properties/width","type":"integer","title":"image width","default":0,"examples":[1621]},"height":{"$id":"/properties/src/properties/height","type":"integer","title":"image height","default":0,"examples":[1081]}}},"metadata":{"$id":"/properties/metadata","type":"object","properties":{"alt":{"$id":"/properties/metadata/properties/alt","type":"string","title":"alt text","examples":["alt"]},"caption":{"$id":"/properties/metadata/properties/caption","type":"string","title":"Image caption","examples":["Wanted dead or alive"]}}}}}')},811:function(e){e.exports=JSON.parse('{"blocks":[{"key":"d79aa","text":"This is a content example with video & image","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6dc41","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f6m2s","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"8rpag","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"2rhmc","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"wix-draft-plugin-image","mutability":"IMMUTABLE","data":{"config":{"alignment":"right","size":"small","showTitle":true,"showDescription":true,"textWrap":"wrap"},"src":{"id":"759c83479429d725f03367897235a8b5","original_file_name":"8bb438_4af301c080294224b6b5e15cd38a035f.jpg","file_name":"8bb438_4af301c080294224b6b5e15cd38a035f.jpg","width":1920,"height":1280}}},"1":{"type":"wix-draft-plugin-video","mutability":"IMMUTABLE","data":{"config":{"size":"small","alignment":"left","textWrap":"wrap"},"tempData":false,"src":"https://youtu.be/oCBpJkG6ngE","metadata":{"version":"1.0","thumbnail_url":"https://i.ytimg.com/vi/jhXlnvYZZQs/hqdefault.jpg","provider_url":"https://www.youtube.com/","thumbnail_height":360,"provider_name":"YouTube","width":480,"title":"Wix.com Official 2018 Big Game Ad with Rhett & Link \u2014 Extended Version","author_url":"https://www.youtube.com/user/Wix","html":"<iframe width=\\"480\\" height=\\"270\\" src=\\"https://www.youtube.com/embed/jhXlnvYZZQs?feature=oembed\\" frameborder=\\"0\\" allow=\\"autoplay; encrypted-media\\" allowfullscreen></iframe>","height":270,"author_name":"Wix.com","thumbnail_width":480,"type":"video","video_url":"https://youtu.be/jhXlnvYZZQs"}}}},"documentStyle":{},"VERSION":"8.63.5","ID":"f2716d19-c7f3-4864-982c-40a37ebde31c"}')}}]);