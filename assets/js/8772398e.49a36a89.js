(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{108:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return o})),t.d(n,"toc",(function(){return p})),t.d(n,"default",(function(){return u}));var r=t(3),a=t(7),i=(t(0),t(163)),l={id:"LoadablePlugins",title:"Loadable components",sidebar_label:"Loadable support"},o={unversionedId:"plugins_api/LoadablePlugins",id:"plugins_api/LoadablePlugins",isDocsHomePage:!1,title:"Loadable components",description:"Loadable plugins",source:"@site/docs/plugins_api/LoadablePlugins.mdx",slug:"/plugins_api/LoadablePlugins",permalink:"/docs/plugins_api/LoadablePlugins",editUrl:"https://github.com/wix/ricos/edit/master/website/docs/plugins_api/LoadablePlugins.mdx",version:"current",sidebar_label:"Loadable support",sidebar:"api",previous:{title:"Spoiler Plugin",permalink:"/docs/plugins_api/SpoilerPlugin"},next:{title:"Truncate Content",permalink:"/docs/content_api/TruncateContent"}},p=[{value:"Loadable plugins",id:"loadable-plugins",children:[{value:"Usage Example",id:"usage-example",children:[]},{value:"Supported plugins",id:"supported-plugins",children:[]}]}],c={toc:p};function u(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},c,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"loadable-plugins"},"Loadable plugins"),Object(i.b)("p",null,"Loadable lets you render a dynamic import as a regular component.\nLoadable can help you \u201clazy-load\u201d just the things that are currently needed by the user, which can dramatically improve the performance of your app."),Object(i.b)("p",null,"For using loadable plugins (meantime for viewer only), you should import plugin from loadable entry."),Object(i.b)("h3",{id:"usage-example"},"Usage Example"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"{5}","{5}":!0},"import { pluginImage } from 'wix-rich-content-plugin-image/loadable/viewer';\nimport 'wix-rich-content-plugin-image/dist/styles.min.css';\n\nreturn (\n  <RicosViewer plugins={[pluginImage()]}>\n    <RichContentViewer />\n  </RicosViewer>\n);\n")),Object(i.b)("h3",{id:"supported-plugins"},"Supported plugins"),Object(i.b)("p",null,"Here is the list of plugins that support loadable component:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Collapsible List"),Object(i.b)("li",{parentName:"ol"},"File"),Object(i.b)("li",{parentName:"ol"},"Gallery"),Object(i.b)("li",{parentName:"ol"},"Giphy"),Object(i.b)("li",{parentName:"ol"},"Html"),Object(i.b)("li",{parentName:"ol"},"Image"),Object(i.b)("li",{parentName:"ol"},"Link"),Object(i.b)("li",{parentName:"ol"},"Link Preview"),Object(i.b)("li",{parentName:"ol"},"Map"),Object(i.b)("li",{parentName:"ol"},"Table"),Object(i.b)("li",{parentName:"ol"},"Video")))}u.isMDXComponent=!0},163:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return m}));var r=t(0),a=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=a.a.createContext({}),u=function(e){var n=a.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=u(e.components);return a.a.createElement(c.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},d=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),s=u(t),d=r,m=s["".concat(l,".").concat(d)]||s[d]||b[d]||i;return t?a.a.createElement(m,o(o({ref:n},c),{},{components:t})):a.a.createElement(m,o({ref:n},c))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=d;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var c=2;c<i;c++)l[c]=t[c];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);