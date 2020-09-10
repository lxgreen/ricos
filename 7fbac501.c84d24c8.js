(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{118:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var i=n(0),r=n.n(i);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),b=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=b(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=b(n),d=i,m=s["".concat(o,".").concat(d)]||s[d]||u[d]||a;return n?r.a.createElement(m,c(c({ref:t},p),{},{components:n})):r.a.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:i,o[1]=c;for(var p=2;p<a;p++)o[p]=n[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},91:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return b}));var i=n(2),r=n(6),a=(n(0),n(118)),o={id:"UiSettings",title:"UI Settings",sidebar_label:"UI Settings"},c={unversionedId:"rce_api/UiSettings",id:"rce_api/UiSettings",isDocsHomePage:!1,title:"UI Settings",description:"Motivation",source:"@site/docs/rce_api/UiSettings.mdx",slug:"/rce_api/UiSettings",permalink:"/rich-content/docs/rce_api/UiSettings",version:"current",sidebar_label:"UI Settings",sidebar:"api",previous:{title:"Toolbar Customization",permalink:"/rich-content/docs/rce_api/ToolbarCustomization"},next:{title:"plugins and config",permalink:"/rich-content/docs/rce_api/plugins_config"}},l=[{value:"Motivation",id:"motivation",children:[]},{value:"<code>uiSettings</code> API",id:"uisettings-api",children:[{value:"Structure",id:"structure",children:[]}]}],p={rightToc:l};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(i.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"motivation"},"Motivation"),Object(a.b)("p",null,"As it turns out, various ",Object(a.b)("inlineCode",{parentName:"p"},"RichContentEditor")," consumers have different customization needs. On the other hand, it is important to keep the public API clean, while providing the desired customability. In order to meet these requirements, the ",Object(a.b)("inlineCode",{parentName:"p"},"RichContentEditor")," exposes ",Object(a.b)("inlineCode",{parentName:"p"},"config")," object prop."),Object(a.b)("p",null,"This document focuses on a specific ",Object(a.b)("inlineCode",{parentName:"p"},"config")," API ",Object(a.b)("inlineCode",{parentName:"p"},"uiSettings")," that is responsible for UI customization."),Object(a.b)("h2",{id:"uisettings-api"},Object(a.b)("inlineCode",{parentName:"h2"},"uiSettings")," API"),Object(a.b)("h3",{id:"structure"},"Structure"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"uiSettings")," object exposes the following properties:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"blankTargetToggleVisibilityFn")," : ",Object(a.b)("inlineCode",{parentName:"p"},"anchorTarget => boolean")),Object(a.b)("p",{parentName:"li"},"This function determines the 'Open link in a new tab' link panel checkbox visiblity."),Object(a.b)("p",{parentName:"li"},"By default, its predicate is ",Object(a.b)("inlineCode",{parentName:"p"},"anchorTarget !== '_blank'"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"nofollowRelToggleVisibilityFn")," : ",Object(a.b)("inlineCode",{parentName:"p"},"relValue => boolean")),Object(a.b)("p",{parentName:"li"},"This function determines the 'Add a nofollow tag' link panel checkbox visiblity."),Object(a.b)("p",{parentName:"li"},"By default, its predicate is ",Object(a.b)("inlineCode",{parentName:"p"},"relValue !== 'nofollow'"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("inlineCode",{parentName:"p"},"placeholder")," : ",Object(a.b)("inlineCode",{parentName:"p"},"string")),Object(a.b)("p",{parentName:"li"},"This variable determines the placeholder to use for the link panel."),Object(a.b)("p",{parentName:"li"},"By default, its value is ",Object(a.b)("inlineCode",{parentName:"p"},'"Enter a URL here"')," translated by localization"))))}b.isMDXComponent=!0}}]);