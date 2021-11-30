"use strict";function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends__default=_interopDefaultLegacy(require("@babel/runtime/helpers/extends"));exports.truncateContent=function(content,limits){void 0===limits&&(limits={});var blocks=content.blocks,entityMap=content.entityMap,_limits=limits,_limits$wordsCount=_limits.wordsCount,wordsCount=void 0===_limits$wordsCount?1/0:_limits$wordsCount,_limits$maxPlugins=_limits.maxPlugins,maxPlugins=void 0===_limits$maxPlugins?1/0:_limits$maxPlugins,_limits$blocksCount=_limits.blocksCount,blocksCount=void 0===_limits$blocksCount?1/0:_limits$blocksCount;if(blocksCount<0||blocksCount>blocks.length&&wordsCount===1/0&&maxPlugins===1/0)return{content:content,isTruncated:!1};var newEntityMap={},BreakException={},newBlocks=[],cWordCount=0,pluginsCount=0,isTruncated=!1;try{blocks.forEach((function(block,i){if(i===blocksCount)throw BreakException;var blockWords=block.text.split(" ").filter((function(x){return""!==x}));if("atomic"===block.type&&pluginsCount++,pluginsCount>maxPlugins)throw BreakException;if(cWordCount+blockWords.length>wordsCount?newBlocks.push(_extends__default.default({},block,{text:blockWords.slice(0,wordsCount-cWordCount).join(" ")+"..."})):newBlocks.push(block),cWordCount+=blockWords.length,block.entityRanges.forEach((function(entity){newEntityMap[entity.key]=entityMap[entity.key]})),cWordCount>=wordsCount)throw BreakException}))}catch(e){if(e!==BreakException)throw e;isTruncated=!0}return{content:_extends__default.default({},content,{blocks:newBlocks,entityMap:newEntityMap}),isTruncated:isTruncated}};
