(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{118:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return h}));var i=t(0),r=t.n(i);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=r.a.createContext({}),s=function(e){var n=r.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},d=function(e){var n=s(e.components);return r.a.createElement(p.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},u=r.a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,a=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(t),u=i,h=d["".concat(a,".").concat(u)]||d[u]||b[u]||o;return t?r.a.createElement(h,c(c({ref:n},p),{},{components:t})):r.a.createElement(h,c({ref:n},p))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=u;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var p=2;p<o;p++)a[p]=t[p];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},81:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return s}));var i=t(2),r=t(6),o=(t(0),t(118)),a={id:"migrating-from-rich-content",title:"Migrating from rich-content",sidebar_label:"Migrating from rich-content"},c={unversionedId:"ricos/migrating-from-rich-content",id:"ricos/migrating-from-rich-content",isDocsHomePage:!1,title:"Migrating from rich-content",description:"This section is intended for users of the legacy RichContentEditor & RichContentViewer API.",source:"@site/docs/ricos/migrating-from-rich-content.md",slug:"/ricos/migrating-from-rich-content",permalink:"/rich-content/docs/ricos/migrating-from-rich-content",version:"current",sidebar_label:"Migrating from rich-content",sidebar:"ricos",previous:{title:"Introducing the rich content viewer",permalink:"/rich-content/docs/ricos/adding-a-viewer"},next:{title:"Theming",permalink:"/rich-content/docs/ricos/theming"}},l=[{value:"Motivation",id:"motivation",children:[]},{value:"Getting started",id:"getting-started",children:[{value:"Existing consumers",id:"existing-consumers",children:[]},{value:"Examples",id:"examples",children:[]},{value:"Wrapping the RCV",id:"wrapping-the-rcv",children:[]}]},{value:"Why <code>Ricos</code> is good for you?",id:"why-ricos-is-good-for-you",children:[{value:"Core features",id:"core-features",children:[]}]}],p={rightToc:l};function s(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(i.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This section is intended for users of the legacy RichContentEditor & RichContentViewer API."),Object(o.b)("h2",{id:"motivation"},"Motivation"),Object(o.b)("p",null,"The motivation behind this project is to provide a better user experience for ",Object(o.b)("inlineCode",{parentName:"p"},"rich-content")," consumers."),Object(o.b)("p",null,"The core idea is to wrap the ",Object(o.b)("inlineCode",{parentName:"p"},"RichContentEditor"),"/",Object(o.b)("inlineCode",{parentName:"p"},"RichContentViewer"),' with a "transparent" wrapper which provides convenient default configuration to its child component, while keeping full backward compatibility for existing applications. The three main goals are:'),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"simpler API and configuration"),Object(o.b)("li",{parentName:"ul"},"less breaking changes"),Object(o.b)("li",{parentName:"ul"},"reduced amount of code duplication among the consumers by providing a default implementation")),Object(o.b)("h2",{id:"getting-started"},"Getting started"),Object(o.b)("h3",{id:"existing-consumers"},"Existing consumers"),Object(o.b)("p",null,"Existing consumers can gradually integrate ",Object(o.b)("inlineCode",{parentName:"p"},"Ricos")," into their code. The ",Object(o.b)("inlineCode",{parentName:"p"},"Ricos")," wrapper provides a configuration to its child based on its own props. Any props that are passed directly to the child override the wrapper's ones."),Object(o.b)("h3",{id:"examples"},"Examples"),Object(o.b)("h4",{id:"wrapping-the-rce-with-ricos"},"Wrapping the RCE with Ricos"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"import { RicosEditor } from 'ricos-editor';\nimport { RichContentEditor } from 'wix-rich-content-editor';\n\nimport { pluginGiphy } from 'wix-rich-content-plugin-giphy';\nimport { pluginImage } from 'wix-rich-content-plugin-image';\nimport { pluginVideo } from 'wix-rich-content-plugin-video';\n\n...\n\nclass App extends Component {\n\n  render() {\n  ...\n    return (\n      <RicosEditor\n        content={initialState}\n        theme={{ palette: site_palette }}\n        locale={'he'}\n        plugins={[pluginVideo(), pluginImage(), pluginGiphy({ giphySdkApiKey: 'secret_key' })]}\n        isMobile={mobile}\n      >\n        <RichContentEditor placeholder={'Type here!'} />\n      </RicosEditor>\n    );\n  }\n}\n")),Object(o.b)("h3",{id:"wrapping-the-rcv"},"Wrapping the RCV"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"import { RicosViewer } from 'ricos-viewer';\nimport { RichContentViewer} from 'wix-rich-content-viewer';\n\nimport { pluginGiphy } from 'wix-rich-content-plugin-giphy/dist/module.viewer.cjs';\nimport { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer.cjs';\nimport { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer.cjs';\n\n...\n\nclass App extends Component {\n\n  render() {\n  ...\n    return (\n      <RicosViewer\n        content={initialState}\n        locale={'he'}\n        plugins={[pluginVideo(), pluginImage(), pluginGiphy()]}\n        isMobile={mobile}\n      >\n        <RichContentViewer />\n      </RicosViewer>\n    );\n  }\n}\n")),Object(o.b)("h2",{id:"why-ricos-is-good-for-you"},"Why ",Object(o.b)("inlineCode",{parentName:"h2"},"Ricos")," is good for you?"),Object(o.b)("h3",{id:"core-features"},"Core features"),Object(o.b)("h4",{id:"themes-and-site-palette-wiring"},"Themes and site palette wiring"),Object(o.b)("p",null,"TBD"),Object(o.b)("h4",{id:"plugin-configuration"},"Plugin configuration"),Object(o.b)("p",null,"TBD"),Object(o.b)("h4",{id:"rce-mobilestatic-toolbar-handling"},"RCE: Mobile/Static toolbar handling"),Object(o.b)("p",null,"By default, the mobile toolbar is rendered internally if the ",Object(o.b)("inlineCode",{parentName:"p"},"isMobile")," prop is truthy. If ",Object(o.b)("inlineCode",{parentName:"p"},"textToolbarType")," is 'static', the static text toolbar is rendered internally. Both mobile and and static toolbars are rendered above the RCE, unless ",Object(o.b)("inlineCode",{parentName:"p"},"toolbarContainerElement")," prop is passed."),Object(o.b)("h4",{id:"modals-and-fullscreen"},"Modals and Fullscreen"),Object(o.b)("h5",{id:"rcv"},"RCV"),Object(o.b)("p",null,"Expand for image and gallery is handled internally by default. If ",Object(o.b)("inlineCode",{parentName:"p"},"onExpand")," config supply for image and gallery plugins will override this behavior."),Object(o.b)("h5",{id:"rce"},"RCE"),Object(o.b)("p",null,"If the ",Object(o.b)("inlineCode",{parentName:"p"},"helpers.openModal"),"/",Object(o.b)("inlineCode",{parentName:"p"},"helpers.closeModal")," are undefined, the modal dialogs are handled internally."),Object(o.b)("h4",{id:"rce-editorstate-handling-and-onchange-callback"},"RCE: ",Object(o.b)("inlineCode",{parentName:"h4"},"editorState")," handling and ",Object(o.b)("inlineCode",{parentName:"h4"},"onChange")," callback"),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"RicosEditor")," handles ",Object(o.b)("inlineCode",{parentName:"p"},"onChange")," internally, and provides the ",Object(o.b)("inlineCode",{parentName:"p"},"editorState")," to the RCE. This can be overridden by passing ",Object(o.b)("inlineCode",{parentName:"p"},"onChange")," and ",Object(o.b)("inlineCode",{parentName:"p"},"editorState")," directly to the RCE."),Object(o.b)("h4",{id:"translations-and-locale-resource-loading"},"Translations and locale resource loading"),Object(o.b)("p",null,"For any locale, the appropriate translation resource is loaded internally when provided with the ",Object(o.b)("inlineCode",{parentName:"p"},"locale")," prop."),Object(o.b)("h4",{id:"types"},"Types"),Object(o.b)("p",null,"It has Typescript support!"),Object(o.b)("p",null,Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"./ricos-api"}),"API Reference Here")))}s.isMDXComponent=!0}}]);