(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{1001:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),c=n(161),i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},a=function(){return(a=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};var l=function(e){function t(t){var n=e.call(this,t)||this;return n.addTextSelectionListener=function(e){e&&!n.removeTextSelectionListener&&(n.removeTextSelectionListener=function(e,t){var n=function(){var n,o,r=document.getSelection(),c=null==r?void 0:r.anchorNode,i=null==r?void 0:r.focusNode;r&&r.rangeCount>0&&!r.isCollapsed&&e.contains(c)&&e.contains(i)&&(n=function(e){return e.toString().replace(/(\r\n|\r|\n){2,}/g," ")}(r),o=function(e){var t=function(e){var t=e.getRangeAt(0),n=function(e){for(var t=document.createNodeIterator(e.commonAncestorContainer,NodeFilter.SHOW_ALL),n=[];t.nextNode()&&t.referenceNode!==e.startContainer;);for(;t.nextNode()&&t.referenceNode!==e.endContainer;)t.referenceNode.nodeType===Node.TEXT_NODE&&n.push(t.referenceNode);return n}(t).map((function(e){var t=document.createRange();return t.selectNodeContents(e),t.getBoundingClientRect()})),o=t.getClientRects();return function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var o=Array(e),r=0;for(t=0;t<n;t++)for(var c=arguments[t],i=0,a=c.length;i<a;i++,r++)o[r]=c[i];return o}([o[0]],n,[o[o.length-1]])}(e),n=999999,o=0;t.forEach((function(e){n=Math.min(n,e.left),o=Math.max(o,e.right)}));var r=t[0].top+window.scrollY;return{x:(n+o)/2+window.scrollX,y:r}}(r)),t(n,o)};return document.addEventListener("selectionchange",n),function(){return document.removeEventListener("selectionchange",n)}}(e,n.setSelectedText))},n.setSelectedText=Object(c.debounce)((function(e,t){return n.setState({selectedText:e,selectedTextPosition:t})}),50),n.state={selectedText:""},n}return function(e,t){function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t.prototype.componentDidMount=function(){this.addTextSelectionListener(this.props.container)},t.prototype.componentWillUnmount=function(){this.removeTextSelectionListener()},t.prototype.componentWillReceiveProps=function(e){this.addTextSelectionListener(e.container)},t.prototype.render=function(){var e=this.state,t=e.selectedText,n=e.selectedTextPosition,o=this.props,c=o.container,i=o.children;if(!t||!n)return null;var a=c.getBoundingClientRect().left,l=this.props.container.getBoundingClientRect().top,u={top:n.y-l-5-window.scrollY,left:n.x-a};return r.a.createElement("div",{className:"_1Knj6",style:u},i(t))},t}(r.a.Component),u=function(e){return r.a.createElement("svg",a({xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20"},e),r.a.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M17.653 4.268c.854-.52 1.493-1.336 1.8-2.297-.804.483-1.683.825-2.6 1.01-1.153-1.245-2.939-1.65-4.506-1.023-1.566.627-2.597 2.16-2.6 3.867.001.318.037.636.106.946-3.298-.168-6.37-1.748-8.453-4.346-.37.633-.563 1.355-.56 2.09-.117 1.34.452 2.647 1.507 3.463C1.608 7.87.88 7.696.173 7.458v.052c.142 2.038 1.63 3.717 3.614 4.077-.298.098-.608.147-.92.146-.233.001-.466-.024-.694-.074.55 1.699 2.103 2.858 3.867 2.888-1.446 1.158-3.237 1.786-5.08 1.78-.32 0-.641-.02-.96-.058 3.593 2.332 8.156 2.492 11.9.417 3.744-2.076 6.073-6.056 6.073-10.381 0-.18-.013-.36-.013-.54.801-.588 1.492-1.316 2.04-2.15-.745.336-1.536.556-2.347.653z"}))},s=function(e){var t=e.selectedText,n=e.onClick;return r.a.createElement("button",{"data-hook":"twitter-button",className:"_20uN3",onClick:function(){return function(e){null==n||n(e),function(e){var t="\u201c"+e+"\u201c\u2014",n=window.location.href;t.length+n.length>279&&(t=function(e,t){var n=e.substring(0,t-2);return(n=n.slice(0,n.lastIndexOf(" ")))+"\u2026\u201c\u2014"}(t,279-n.length));var o="https://twitter.com/intent/tweet?text="+encodeURI(t)+"&url="+encodeURI(n);window.open(o)}(e)}(t)}},r.a.createElement(u,null))};t.default=function(e){var t=e.onButtonClick,n=e.container;return r.a.createElement(l,{container:n},(function(e){return r.a.createElement(s,{selectedText:e,onClick:function(e){return null==t?void 0:t("TWITTER","Click",e)}})}))}}}]);