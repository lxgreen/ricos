(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{150:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var o=n(0),a=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,r=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),s=p(n),u=o,m=s["".concat(r,".").concat(u)]||s[u]||d[u]||i;return n?a.a.createElement(m,l(l({ref:t},c),{},{components:n})):a.a.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=u;var l={};for(var b in t)hasOwnProperty.call(t,b)&&(l[b]=t[b]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var c=2;c<i;c++)r[c]=n[c];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},69:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return p}));var o=n(3),a=n(7),i=(n(0),n(150)),r={id:"ToolbarCustomization",title:"Toolbar Customization",sidebar_label:"Toolbar Customization"},l={unversionedId:"rce_api/ToolbarCustomization",id:"rce_api/ToolbarCustomization",isDocsHomePage:!1,title:"Toolbar Customization",description:"Motivation",source:"@site/docs/rce_api/ToolbarCustomization.mdx",slug:"/rce_api/ToolbarCustomization",permalink:"/ricos/docs/rce_api/ToolbarCustomization",editUrl:"https://github.com/wix/ricos/edit/master/website/docs/rce_api/ToolbarCustomization.mdx",version:"current",sidebar_label:"Toolbar Customization"},b=[{value:"Motivation",id:"motivation",children:[]},{value:"<code>getToolbarSettings</code> API",id:"gettoolbarsettings-api",children:[{value:"Signature",id:"signature",children:[]},{value:"Toolbar types",id:"toolbar-types",children:[]},{value:"Customizing Text Toolbar Button Icons",id:"customizing-text-toolbar-button-icons",children:[]},{value:"<code>Settings</code> properties",id:"settings-properties",children:[]}]},{value:"Plugin functionality toolbar customization",id:"plugin-functionality-toolbar-customization",children:[]},{value:"References and examples",id:"references-and-examples",children:[]}],c={toc:b};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"motivation"},"Motivation"),Object(i.b)("p",null,"As it turns out, various ",Object(i.b)("inlineCode",{parentName:"p"},"RichContentEditor")," consumers have different customization needs. On other hand, it is important to keep the public API clean, while providing the desired customability. In order to meet these requirements, the ",Object(i.b)("inlineCode",{parentName:"p"},"RichContentEditor")," exposes ",Object(i.b)("inlineCode",{parentName:"p"},"config")," object prop."),Object(i.b)("p",null,"This document focuses on a specific ",Object(i.b)("inlineCode",{parentName:"p"},"config")," API ",Object(i.b)("inlineCode",{parentName:"p"},"getToolbarSettings")," that is responsible for the toolbar customization."),Object(i.b)("h2",{id:"gettoolbarsettings-api"},Object(i.b)("inlineCode",{parentName:"h2"},"getToolbarSettings")," API"),Object(i.b)("h3",{id:"signature"},"Signature"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"getToolbarSettings")," is defined as follows: ",Object(i.b)("inlineCode",{parentName:"p"},"{ textButtons, pluginButtons, pluginTextButtons } => Array<Setting>")),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"textButtons")," and ",Object(i.b)("inlineCode",{parentName:"p"},"pluginTextButtons")," parameters are objects of the following structure:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript"},"{\n  mobile: {\n    buttonName: buttonComponent,\n    ...\n  },\n  desktop: {\n    buttonName: buttonComponent,\n    ...\n  }\n}\n")),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"pluginButtons")," parameter is an ",Object(i.b)("inlineCode",{parentName:"p"},"inline-button")," data array (see divider plugin ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/blob/master/packages/plugin-divider/web/src/toolbar/inline-buttons.tsx"},"inline-buttons")," for reference)."),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"Setting")," type is defined as follows:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript"},"{\n  name: TOOLBARS,\n  shouldCreate: () => {\n    desktop: boolean,\n    mobile: {\n      ios: boolean,\n      android: boolean\n    }\n  },\n  getVisibilityFn: () => {\n    desktop: editorState => boolean,\n    mobile: {\n      ios: (editorState: any) => boolean,\n      android: (editorState: any) => boolean\n    }\n  },\n  getPositionOffset: () => {\n    desktop: { x: number, y: number },\n    mobile: {\n      ios: { x: number, y: number },\n      android: { x: number, y: number }\n    }\n  },\n  getDisplayOptions: () => {\n    desktop: { displayMode: DISPLAY_MODE.NORMAL | DISPLAY_MODE.FLOATING },\n    mobile: {\n      ios: { displayMode: DISPLAY_MODE.NORMAL | DISPLAY_MODE.FLOATING },\n      android: { displayMode: DISPLAY_MODE.NORMAL | DISPLAY_MODE.FLOATING },\n    }\n  },\n  getToolbarDecorationFn: () => {\n    desktop: () => Component,\n    mobile: {\n      ios: () => Component,\n      android: () => Component,\n    }\n  },\n  getButtons: () => {\n    desktop: Array<any>,\n    mobile: {\n      ios: Array<any>,\n      android: Array<any>\n    }\n  },\n  getTextPluginButtons: () => {\n    desktop: { [key:string]: Component },\n    mobile: {\n      ios: { [key:string]: Component },\n      android: { [key:string]: Component }\n    }\n  }\n}\n")),Object(i.b)("p",null,"As you can see, the ",Object(i.b)("inlineCode",{parentName:"p"},"Settings")," is form-factor aware, i.e. it defines different behaviors for desktop/mobile views."),Object(i.b)("h3",{id:"toolbar-types"},"Toolbar types"),Object(i.b)("p",null,"The following toolbar types are available:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Text editing toolbars:",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"Static text toolbar"),Object(i.b)("li",{parentName:"ul"},"Inline text toolbar"),Object(i.b)("li",{parentName:"ul"},"Mobile toolbar"))),Object(i.b)("li",{parentName:"ul"},"Plugin insertion toolbars:",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"Side toolbar"),Object(i.b)("li",{parentName:"ul"},"Footer toolbar"))),Object(i.b)("li",{parentName:"ul"},"Plugin functionality toolbars")),Object(i.b)("p",null,"All the toolbar types are exposed by the ",Object(i.b)("inlineCode",{parentName:"p"},"TOOLBARS")," const found in ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/blob/master/packages/editor-common/web/src/consts.js"},"consts.js"),"."),Object(i.b)("h3",{id:"customizing-text-toolbar-button-icons"},"Customizing Text Toolbar Button Icons"),Object(i.b)("p",null,"In order to use custom button icons in the text toolbars, you can use the ",Object(i.b)("inlineCode",{parentName:"p"},"TOOLBARS.TEXT")," type (this will affect all text toolbars) along with a ",Object(i.b)("inlineCode",{parentName:"p"},"getIcons")," function that returns a map of button names to React Components, such as:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript"},"getToolbarSettings: ({ pluginButtons, textButtons }) => [\n  {\n    name: TOOLBARS.TEXT,\n    getIcons: () => ({\n      Bold: MyCustomIcon,\n    }),\n  },\n];\n")),Object(i.b)("p",null,"All available button names are listed in the ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/blob/master/examples/main/shared/editor/EditorPlugins.jsx"},"EditorPlugins")," file under the ",Object(i.b)("inlineCode",{parentName:"p"},"getToolbarSettings")," section."),Object(i.b)("h3",{id:"settings-properties"},Object(i.b)("inlineCode",{parentName:"h3"},"Settings")," properties"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"property"),Object(i.b)("th",{parentName:"tr",align:null},"description"),Object(i.b)("th",{parentName:"tr",align:null},"affected toolbars"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"name")),Object(i.b)("td",{parentName:"tr",align:null},"one of the toolbar types (see ",Object(i.b)("inlineCode",{parentName:"td"},"TOOLBARS")," const for details)"),Object(i.b)("td",{parentName:"tr",align:null},"all")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"shouldCreate")),Object(i.b)("td",{parentName:"tr",align:null},"determines whether the toolbar should be created at the first place"),Object(i.b)("td",{parentName:"tr",align:null},"all")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"getVisibilityFn")),Object(i.b)("td",{parentName:"tr",align:null},"toolbar visibility function"),Object(i.b)("td",{parentName:"tr",align:null},"all")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"getPositionOffset")),Object(i.b)("td",{parentName:"tr",align:null},"toolbar offset point in pixels, relatively to the default toolbar position"),Object(i.b)("td",{parentName:"tr",align:null},"all")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"getDisplayOptions")),Object(i.b)("td",{parentName:"tr",align:null},"toolbar display options (see next section for details)"),Object(i.b)("td",{parentName:"tr",align:null},"all")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"getToolbarDecorationFn")),Object(i.b)("td",{parentName:"tr",align:null},"component to be rendered instead of default toolbar container (see the following sections for details)"),Object(i.b)("td",{parentName:"tr",align:null},"all")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"getButtons")," (1)"),Object(i.b)("td",{parentName:"tr",align:null},"a list of the toolbar button components"),Object(i.b)("td",{parentName:"tr",align:null},"plugin insertion and functionality toolbars")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"getButtons")," (2)"),Object(i.b)("td",{parentName:"tr",align:null},"a list of inline button names"),Object(i.b)("td",{parentName:"tr",align:null},"text editing toolbars")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"getTextPluginButtons")),Object(i.b)("td",{parentName:"tr",align:null},"a map of inline buttons added by plugins. The keys are derived from the ",Object(i.b)("inlineCode",{parentName:"td"},"PluginTextButtonMappers")," -- see the ",Object(i.b)("inlineCode",{parentName:"td"},"link-plugin"),"'s ",Object(i.b)("a",{parentName:"td",href:"https://github.com/wix/ricos/blob/master/packages/plugin-link/web/src/toolbar/createLinkToolbar.js"},"createLinkToolbar")," for reference"),Object(i.b)("td",{parentName:"tr",align:null},"text editing toolbars")))),Object(i.b)("h4",{id:"display-options"},"Display Options"),Object(i.b)("p",null,"At the moment, the ",Object(i.b)("inlineCode",{parentName:"p"},"getDisplayOptions")," API consists of a single property ",Object(i.b)("inlineCode",{parentName:"p"},"displayMode"),". This property accepts two values (defined in ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/blob/master/packages/editor-common/web/src/consts.js"},"consts.js"),"):"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"DISPLAY_MODE.NORMAL")," is the default; the toolbars are normally-positioned"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"DISPLAY_MODE.FLOATING")," the toolbars are in fixed position. This, combined with ",Object(i.b)("inlineCode",{parentName:"li"},"getVisibilityFn")," and ",Object(i.b)("inlineCode",{parentName:"li"},"getPositionOffset"),' properties, causes toolbars to "float".')),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Note"),": while in ",Object(i.b)("inlineCode",{parentName:"p"},"DISPLAY_MODE.FLOATING")," mode, the ",Object(i.b)("inlineCode",{parentName:"p"},"getPositionOffset")," property denotes absolute screen coordinates."),Object(i.b)("h4",{id:"toolbar-decoration"},"Toolbar Decoration"),Object(i.b)("p",null,'Sometimes, a static theme is not enough. For example, consider the case when the inline toolbar is required to display a "chevron" right above the selected text.'),Object(i.b)("p",null,Object(i.b)("img",{alt:"toolbar-with-chevron",src:n(722).default})),Object(i.b)("p",null,"Such behavior involves multiple dynamic values to be calculated within toolbar rendering."),Object(i.b)("p",null,"So, the ",Object(i.b)("inlineCode",{parentName:"p"},"getToolbarDecorationFn")," comes to rescue. This function is expected to return a ",Object(i.b)("inlineCode",{parentName:"p"},"Component")," to be rendered instead of the default toolbar container. This ",Object(i.b)("inlineCode",{parentName:"p"},"Component")," will be provided with the toolbar container props. For reference, check out the ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/blob/master/examples/main/src/Components/InlineToolbarDecoration.jsx"},"InlineToolbarDecoration.jsx")),Object(i.b)("h2",{id:"plugin-functionality-toolbar-customization"},"Plugin functionality toolbar customization"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"getButtons")," property, when applied on ",Object(i.b)("inlineCode",{parentName:"p"},"TOOLBARS.PLUGIN"),", will affect ALL the plugin functionality toolbars. This can be used, for example, to hide size-related buttons for ",Object(i.b)("em",{parentName:"p"},"all")," the plugin toolbars."),Object(i.b)("h4",{id:"hiding-buttons"},"Hiding Buttons"),Object(i.b)("p",null,"In order to hide a specific button in a specific plugin toolbar, please use the ",Object(i.b)("inlineCode",{parentName:"p"},"config.plugin_type_name.toolbar.hidden")," property. For example, to hide the ",Object(i.b)("inlineCode",{parentName:"p"},"Replace")," button of the ",Object(i.b)("inlineCode",{parentName:"p"},"video-plugin")," toolbar, the following ",Object(i.b)("inlineCode",{parentName:"p"},"config")," should be provided to the ",Object(i.b)("inlineCode",{parentName:"p"},"RichContentEditor"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript"},"const config = {\n  [VIDEO_TYPE]: {\n    toolbar: {\n      hidden: ['replace'],\n    },\n  },\n};\n")),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"hidden")," value is expected to be a string array, where every string is the plugin toolbar button ",Object(i.b)("inlineCode",{parentName:"p"},"keyName"),"."),Object(i.b)("h4",{id:"customizing-button-icons"},"Customizing Button Icons"),Object(i.b)("p",null,"In order to replace a button icon in a specific plugin toolbar or to replace the insert button of a specific plugin, please use the ",Object(i.b)("inlineCode",{parentName:"p"},"config.plugin_type_name.toolbar.icons")," property. This is a map of button names to React Components. For example, to replace the ",Object(i.b)("inlineCode",{parentName:"p"},"Delete")," button icon of the ",Object(i.b)("inlineCode",{parentName:"p"},"video-plugin")," toolbar and the insert button icon of the ",Object(i.b)("inlineCode",{parentName:"p"},"video-plugin"),", the following ",Object(i.b)("inlineCode",{parentName:"p"},"config")," should be provided to the ",Object(i.b)("inlineCode",{parentName:"p"},"RichContentEditor"),":\n(the keyName ",Object(i.b)("inlineCode",{parentName:"p"},"InsertPluginButtonIcon")," is a generic name for the insert button of each plugin)"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript"},"const config = {\n  [VIDEO_TYPE]: {\n    toolbar: {\n      icons: {\n        delete: MyCustomDeleteIcon\n        InsertPluginButtonIcon: MyCustomPluginIcon\n      }\n    }\n  }\n};\n")),Object(i.b)("h2",{id:"references-and-examples"},"References and examples"),Object(i.b)("p",null,"The ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/blob/master/packages/editor/web/src/RichContentEditor/Toolbars/default-toolbar-settings.js"},"default-toolbar-settings.js")," contains the default toolbar settings, and the ",Object(i.b)("inlineCode",{parentName:"p"},"getToolbarSettings")," code example could be found in ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/blob/master/examples/editor/src/PluginConfig.js"},"PluginConfig.js")," (commented by default)."))}p.isMDXComponent=!0},722:function(e,t,n){e.exports=n.p+"assets/images/chevron-3eaeba6be7733ee471686bcc4f93b807.png"}}]);