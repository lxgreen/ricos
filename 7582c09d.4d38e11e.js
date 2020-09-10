(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{118:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),s=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=s(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),b=s(n),d=r,m=b["".concat(o,".").concat(d)]||b[d]||u[d]||i;return n?a.a.createElement(m,c(c({ref:t},l),{},{components:n})):a.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},87:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return s}));var r=n(2),a=n(6),i=(n(0),n(118)),o={id:"preview",title:"Preview",sidebar_label:"Preview"},c={unversionedId:"ricos/preview",id:"ricos/preview",isDocsHomePage:!1,title:"Preview",description:"This is an API improvement of the legacy RichContentPreview component.",source:"@site/docs/ricos/Preview.mdx",slug:"/ricos/preview",permalink:"/rich-content/docs/ricos/preview",version:"current",sidebar_label:"Preview",sidebar:"ricos",previous:{title:"Theming",permalink:"/rich-content/docs/ricos/theming"}},p=[{value:"<code>transformation</code>",id:"transformation",children:[]},{value:"<code>contentInteractionMappers</code>",id:"contentinteractionmappers",children:[]},{value:"<code>onPreviewExpand</code>",id:"onpreviewexpand",children:[]}],l={rightToc:p};function s(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"This is an API improvement of the legacy ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"../rcp_api/RichContentPreviewAPI"}),"RichContentPreview")," component."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"Ricos Preview")," is a unique setting that activates a preview decoration for ",Object(i.b)("inlineCode",{parentName:"p"},"<RicosViewer />"),".\nWith this feature you can create a shortened content display, ready to be expanded, based on rules that can be modified."),Object(i.b)("h4",{id:"example"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"{9}","{9}":!0}),"import { previewSettings } from 'wix-rich-content-preview';\nimport 'wix-rich-content-preview/dist/styles.min.css\n//\n//\nrender() {\n  const { content } = this.props;\n  return (\n    <RicosViewer\n      content={content}\n      preview={[previewSettings()]}\n    />\n  );\n}\n")),Object(i.b)("p",null,"For visual examples, take a look in our ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://rich-content-storybook-master.surge.sh/?path=/story/preview--rules"}),"storybook page"),"."),Object(i.b)("hr",null),Object(i.b)("p",null,"There are 3 optional fields of configuration:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),"previewSettings({ transformation, contentInteractionMappers, onPreviewExpand });\n")),Object(i.b)("h3",{id:"transformation"},Object(i.b)("inlineCode",{parentName:"h3"},"transformation")),Object(i.b)("p",null,"Represents a rule (with builder) to be applied on ",Object(i.b)("inlineCode",{parentName:"p"},"RicosContent")," in order to achieve the desired preview state."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"default value: ",Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://github.com/wix-incubator/rich-content/blob/master/packages/preview/web/src/Components/default-transformation.js"}),"Default Transformation"))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"../rcp_api/RichContentPreviewAPI#contentstatetransformation"}),"Read more")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"contentinteractionmappers"},Object(i.b)("inlineCode",{parentName:"h3"},"contentInteractionMappers")),Object(i.b)("p",null,"Allows to pass the interactions as a function array, similar to the ",Object(i.b)("inlineCode",{parentName:"p"},"typeMappers")," and ",Object(i.b)("inlineCode",{parentName:"p"},"inlineStyleMappers"),"."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"default value: ",Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://github.com/wix-incubator/rich-content/blob/master/packages/preview/web/src/Interactions/interactionMap.tsx"}),"Default Interaction Map"))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"../rcp_api/RichContentPreviewAPI#richcontentviewer-integration"}),"Read more")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"onpreviewexpand"},Object(i.b)("inlineCode",{parentName:"h3"},"onPreviewExpand")),Object(i.b)("p",null,"You can provide a callback that is triggered upon preview expand click. Occurs once in a viewer session."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"default value: undefined")))}s.isMDXComponent=!0}}]);