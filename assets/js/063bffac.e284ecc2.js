(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{168:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),d=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=d(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=d(n),u=a,b=p["".concat(i,".").concat(u)]||p[u]||m[u]||o;return n?r.a.createElement(b,c(c({ref:t},s),{},{components:n})):r.a.createElement(b,c({ref:t},s))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},74:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return d}));var a=n(3),r=n(7),o=(n(0),n(168)),i={id:"metadata_utils_api",title:"Metadata Utilities",sidebar_label:"Metadata Utilities"},c={unversionedId:"content_api/metadata_utils_api",id:"content_api/metadata_utils_api",isDocsHomePage:!1,title:"Metadata Utilities",description:"Metadata Utilities",source:"@site/docs/content_api/MetadataUtils.md",slug:"/content_api/metadata_utils_api",permalink:"/docs/content_api/metadata_utils_api",editUrl:"https://github.com/wix/ricos/edit/master/website/docs/content_api/MetadataUtils.md",version:"current",sidebar_label:"Metadata Utilities",sidebar:"api",previous:{title:"Translatables",permalink:"/docs/content_api/translatables_api"},next:{title:"rich-content-preview",permalink:"/docs/rcp_api/RichContentPreviewAPI"}},l=[{value:"Metadata Utilities",id:"metadata-utilities",children:[{value:"<code>ensureContentId</code>",id:"ensurecontentid",children:[]},{value:"<code>extractIdFromContent</code>",id:"extractidfromcontent",children:[]},{value:"<code>createEmptyContent</code>",id:"createemptycontent",children:[]},{value:"<code>duplicate</code>",id:"duplicate",children:[]}]}],s={toc:l};function d(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"metadata-utilities"},"Metadata Utilities"),Object(o.b)("h3",{id:"ensurecontentid"},Object(o.b)("inlineCode",{parentName:"h3"},"ensureContentId")),Object(o.b)("p",null,"Ensure that a given ",Object(o.b)("inlineCode",{parentName:"p"},"RichContent")," object contains an id by generating one (if not exist) or leaving it as is (if it does)."),Object(o.b)("p",null,"If no content is provided, an empty content with a new id is generated."),Object(o.b)("h4",{id:"example"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"import { ensureContentId } from 'ricos-content/libs/metadata-utils';\nimport { someContent } from 'somwhere'; // content without ID:\n\nconst content1: RichContent = ensureContentId();\n// => Empty content with ID\n\nconst content2: RichContent = ensureContentId(someContent);\n// = `someContent` with newly generated ID\n\nconst content3: RichContent = ensureContentId(content2);\n// = `content2` (identical)\n")),Object(o.b)("h3",{id:"extractidfromcontent"},Object(o.b)("inlineCode",{parentName:"h3"},"extractIdFromContent")),Object(o.b)("p",null,"For a given content, it will extract the ",Object(o.b)("inlineCode",{parentName:"p"},"id")," from it. If not exists, ",Object(o.b)("inlineCode",{parentName:"p"},"undefined")," will be returned."),Object(o.b)("h4",{id:"example-1"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"import { extractIdFromContent } from 'ricos-content/libs/metadata-utils';\nimport { someContentWithId } from 'somwhere';\nimport { someContentWithoutId } from 'somwhere';\n\nconst id1: string = extractIdFromContent(someContentWithId);\n// = 7bb38a7a-70b7-9cf3-fc80-584205694465\n\nconst id2: string = extractIdFromContent(someContentWithoutId);\n// => undefined\n")),Object(o.b)("h3",{id:"createemptycontent"},Object(o.b)("inlineCode",{parentName:"h3"},"createEmptyContent")),Object(o.b)("p",null,"Creates an empty, valid ",Object(o.b)("inlineCode",{parentName:"p"},"RichContent")," object"),Object(o.b)("h4",{id:"example-2"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"import { createEmptyContent } from 'ricos-content/libs/createEmptyContent';\n\nconst content: RichContent = createEmptyContent();\n")),Object(o.b)("h3",{id:"duplicate"},Object(o.b)("inlineCode",{parentName:"h3"},"duplicate")),Object(o.b)("p",null,"Duplicates a ",Object(o.b)("inlineCode",{parentName:"p"},"RichContent")," object, with a newly generated ",Object(o.b)("inlineCode",{parentName:"p"},"id"),"."),Object(o.b)("h4",{id:"example-3"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"import { duplicate } from 'ricos-content/libs/duplicate';\nimport { someContent } from 'somewhere';\n\nconst content: RichContent = duplicate(someContent);\n\nassert(content.nodes).equals(someContent.nodes);\n// => true\n\nassert(content.metadata.version).equals(someContent.metadata.version);\n// => true\n\nassert(content.metadata.id).equals(someContent.metadata.id);\n// => false\n")))}d.isMDXComponent=!0}}]);