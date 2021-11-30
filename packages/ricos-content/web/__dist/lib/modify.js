import _extends from"@babel/runtime/helpers/extends";import _objectWithoutPropertiesLoose from"@babel/runtime/helpers/objectWithoutPropertiesLoose";function identity(a){return a}var unsafeCoerce=identity;function constant$1(a){return function(){return a}}function flow(ab,bc,cd,de,ef,fg,gh,hi,ij){switch(arguments.length){case 1:return ab;case 2:return function(){return bc(ab.apply(this,arguments))};case 3:return function(){return cd(bc(ab.apply(this,arguments)))};case 4:return function(){return de(cd(bc(ab.apply(this,arguments))))};case 5:return function(){return ef(de(cd(bc(ab.apply(this,arguments)))))};case 6:return function(){return fg(ef(de(cd(bc(ab.apply(this,arguments))))))};case 7:return function(){return gh(fg(ef(de(cd(bc(ab.apply(this,arguments)))))))};case 8:return function(){return hi(gh(fg(ef(de(cd(bc(ab.apply(this,arguments))))))))};case 9:return function(){return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this,arguments)))))))))}}}function pipe$1(a,ab,bc,cd,de,ef,fg,gh,hi,ij,jk,kl,lm,mn,no,op,pq,qr,rs,st){switch(arguments.length){case 1:return a;case 2:return ab(a);case 3:return bc(ab(a));case 4:return cd(bc(ab(a)));case 5:return de(cd(bc(ab(a))));case 6:return ef(de(cd(bc(ab(a)))));case 7:return fg(ef(de(cd(bc(ab(a))))));case 8:return gh(fg(ef(de(cd(bc(ab(a)))))));case 9:return hi(gh(fg(ef(de(cd(bc(ab(a))))))));case 10:return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));case 11:return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));case 12:return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));case 13:return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));case 14:return mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))));case 15:return no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))));case 16:return op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))));case 17:return pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))));case 18:return qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))));case 19:return rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))))));case 20:return st(rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))))))}}var a,SK=function(_,b){return b},__spreadArray$1=function(to,from){for(var i=0,il=from.length,j=to.length;i<il;i++,j++)to[j]=from[i];return to},isSome=function(fa){return"Some"===fa._tag},none$1={_tag:"None"},some$2=function(a){return{_tag:"Some",value:a}},isLeft$1=function(ma){return"Left"===ma._tag},has=Object.prototype.hasOwnProperty,unsafeUpdateAt$2=(a=void 0,function(i,a,as){if(as[i]===a)return as;var xs=function(as){return __spreadArray$1([as[0]],as.slice(1))}(as);return xs[i]=a,xs}),__spreadArray=function(to,from){for(var i=0,il=from.length,j=to.length;i<il;i++,j++)to[j]=from[i];return to},separated=function(left,right){return{left:left,right:right}};function wiltDefault(T,C){return function(F){var traverseF=T.traverse(F);return function(wa,f){return F.map(traverseF(wa,f),C.separate)}}}function witherDefault(T,C){return function(F){var traverseF=T.traverse(F);return function(wa,f){return F.map(traverseF(wa,f),C.compact)}}}var isNonEmpty=function(as){return as.length>0},isOutOfBound=function(i,as){return i<0||i>=as.length};function lookup$1(i,as){return void 0===as?function(as){return lookup$1(i,as)}:isOutOfBound(i,as)?none$1:some$2(as[i])}var findIndex=function(predicate){return function(as){for(var i=0;i<as.length;i++)if(predicate(as[i]))return some$2(i);return none$1}};function findFirst$1(predicate){return function(as){for(var i=0;i<as.length;i++)if(predicate(as[i]))return some$2(as[i]);return none$1}}var unsafeUpdateAt$1=function(i,a,as){return isNonEmpty(as)?unsafeUpdateAt$2(i,a,as):as},append=function(end){return function(init){return __spreadArray(__spreadArray([],init),[end])}},of$2=function(a){return[a]},reduceWithIndex$1=function(b,f){return function(fa){for(var len=fa.length,out=b,i=0;i<len;i++)out=f(i,out,fa[i]);return out}},traverseWithIndex=function(F){return function(f){return reduceWithIndex$1(F.of([]),(function(i,fbs,a){return F.ap(F.map(fbs,(function(bs){return function(b){return pipe$1(bs,append(b))}})),f(i,a))}))}};function unfoldTree(b,f){var _a=f(b);return{value:_a[0],forest:unfoldForest(_a[1],f)}}function unfoldForest(bs,f){return bs.map((function(b){return unfoldTree(b,f)}))}var chain$1=function(f){return function(ma){var _a=f(ma.value);return{value:_a.value,forest:function(first,second){return first.concat(second)}(_a.forest,ma.forest.map(chain$1(f)))}}},extend$1=function(f){return function(wa){return{value:f(wa),forest:wa.forest.map(extend$1(f))}}},map$3=function(f){return function(fa){return{value:f(fa.value),forest:fa.forest.map(map$3(f))}}},reduce$2=function(b,f){return function(fa){for(var r=f(b,fa.value),len=fa.forest.length,i=0;i<len;i++)r=pipe$1(fa.forest[i],reduce$2(r,f));return r}},foldMap$2=function(M){return function(f){return reduce$2(M.empty,(function(acc,a){return M.concat(acc,f(a))}))}},reduceRight$2=function(b,f){return function(fa){for(var r=b,i=fa.forest.length-1;i>=0;i--)r=pipe$1(fa.forest[i],reduceRight$2(r,f));return f(fa.value,r)}},traverse$2=function(F){var traverseF=function(F){var traverseWithIndexF=traverseWithIndex(F);return function(f){return traverseWithIndexF((function(_,a){return f(a)}))}}(F),out=function(f){return function(ta){return F.ap(F.map(f(ta.value),(function(value){return function(forest){return{value:value,forest:forest}}})),pipe$1(ta.forest,traverseF(out(f))))}};return out},tree={URI:"Tree",map:function(fa,f){return pipe$1(fa,map$3(f))},of:function(a){return void 0===forest&&(forest=[]),{value:a,forest:forest};var forest},ap:function(fab,fa){return pipe$1(fab,chain$1((function(f){return pipe$1(fa,map$3(f))})))},chain:function(ma,f){return pipe$1(ma,chain$1(f))},reduce:function(fa,b,f){return pipe$1(fa,reduce$2(b,f))},foldMap:function(M){var foldMapM=foldMap$2(M);return function(fa,f){return pipe$1(fa,foldMapM(f))}},reduceRight:function(fa,b,f){return pipe$1(fa,reduceRight$2(b,f))},traverse:function(F){var traverseF=traverse$2(F);return function(ta,f){return pipe$1(ta,traverseF(f))}},sequence:function(F){return traverse$2(F)(identity)},extract:function(wa){return wa.value},extend:function(wa,f){return pipe$1(wa,extend$1(f))}},make=unsafeCoerce;function getApplicative(M){var S,A=(S=M,{URI:URI$3,_E:void 0,map:_map$2,ap:function(fab,fa){return make(S.concat(fab,fa))}});return{URI:URI$3,_E:void 0,map:A.map,ap:A.ap,of:function(){return make(M.empty)}}}var _map$2=function(fa,f){return pipe$1(fa,map$2(f))},map$2=function(){return unsafeCoerce},URI$3="Const",monoidAll={concat:function(x,y){return x&&y},empty:!0},monoidAny={concat:function(x,y){return x||y},empty:!1},none=none$1,some$1=some$2;function fromPredicate$1(predicate){return function(a){return predicate(a)?some$1(a):none}}var getRight=function(ma){return"Left"===ma._tag?none:some$1(ma.right)},_map$1=function(fa,f){return pipe$1(fa,map$1(f))},map$1=function(f){return function(fa){return isNone(fa)?none:some$1(f(fa.value))}},chain=function(f){return function(ma){return isNone(ma)?none:f(ma.value)}},fromEither=getRight,isNone=function(fa){return"None"===fa._tag},fold=function(onNone,onSome){return function(ma){return isNone(ma)?onNone():onSome(ma.value)}},getOrElse=function(onNone){return function(ma){return isNone(ma)?onNone():ma.value}},fromNullable$1=function(a){return null==a?none:some$1(a)},option_map=_map$1,getFirstMonoid=function(){return S={concat:identity},{concat:function(x,y){return isNone(x)?y:isNone(y)?x:some$1(S.concat(x.value,y.value))},empty:none};var S},pipe=pipe$1,Ord={equals:function(first,second){return first===second},compare:function(first,second){return first<second?-1:first>second?1:0}},keys_=function(O){return function(r){return Object.keys(r).sort(O.compare)}};function lookup(k,r){return void 0===r?function(r){return lookup(k,r)}:has.call(r,k)?some$2(r[k]):none$1}var empty={};function mapWithIndex(f){return function(r){var out={};for(var k in r)has.call(r,k)&&(out[k]=f(k,r[k]));return out}}function reduceWithIndex(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];if(2===args.length)return reduceWithIndex(Ord).apply(void 0,args);var keysO=keys_(args[0]);return function(b,f){return function(fa){for(var out=b,ks=keysO(fa),len=ks.length,i=0;i<len;i++){var k=ks[i];out=f(k,out,fa[k])}return out}}}function foldMapWithIndex(O){if("compare"in O){var keysO_1=keys_(O);return function(M){return function(f){return function(fa){for(var out=M.empty,ks=keysO_1(fa),len=ks.length,i=0;i<len;i++){var k=ks[i];out=M.concat(out,f(k,fa[k]))}return out}}}}return foldMapWithIndex(Ord)(O)}function reduceRightWithIndex(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];if(2===args.length)return reduceRightWithIndex(Ord).apply(void 0,args);var keysO=keys_(args[0]);return function(b,f){return function(fa){for(var out=b,ks=keysO(fa),i=ks.length-1;i>=0;i--){var k=ks[i];out=f(k,fa[k],out)}return out}}}function sequence(F){return _sequence(Ord)(F)}var _map=function(fa,f){return pipe$1(fa,function(f){return mapWithIndex((function(_,a){return f(a)}))}(f))},_reduce=function(O){var reduceO=reduce(O);return function(fa,b,f){return pipe$1(fa,reduceO(b,f))}},_foldMap=function(O){return function(M){var foldMapM=foldMap(O)(M);return function(fa,f){return pipe$1(fa,foldMapM(f))}}},_reduceRight=function(O){var reduceRightO=reduceRight(O);return function(fa,b,f){return pipe$1(fa,reduceRightO(b,f))}},_reduceWithIndex=function(O){var reduceWithIndexO=reduceWithIndex(O);return function(fa,b,f){return pipe$1(fa,reduceWithIndexO(b,f))}},_foldMapWithIndex=function(O){var foldMapWithIndexO=foldMapWithIndex(O);return function(M){var foldMapWithIndexM=foldMapWithIndexO(M);return function(fa,f){return pipe$1(fa,foldMapWithIndexM(f))}}},_reduceRightWithIndex=function(O){var reduceRightWithIndexO=reduceRightWithIndex(O);return function(fa,b,f){return pipe$1(fa,reduceRightWithIndexO(b,f))}},_traverse=function(O){var traverseWithIndexO=_traverseWithIndex(O);return function(F){var traverseWithIndexOF=traverseWithIndexO(F);return function(ta,f){return traverseWithIndexOF(ta,flow(SK,f))}}},_sequence=function(O){var traverseO=_traverse(O);return function(F){var traverseOF=traverseO(F);return function(ta){return traverseOF(ta,identity)}}},_traverseWithIndex=function(O){return function(F){var keysO=keys_(O);return function(ta,f){var ks=keysO(ta);if(0===ks.length)return F.of(empty);for(var fr=F.of({}),_loop_1=function(key){fr=F.ap(F.map(fr,(function(r){return function(b){return r[key]=b,r}})),f(key,ta[key]))},_i=0,ks_1=ks;_i<ks_1.length;_i++){_loop_1(ks_1[_i])}return fr}}};function reduce(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];if(1===args.length){var reduceWithIndexO_1=reduceWithIndex(args[0]);return function(b,f){return reduceWithIndexO_1(b,(function(_,b,a){return f(b,a)}))}}return reduce(Ord).apply(void 0,args)}function foldMap(O){if("compare"in O){var foldMapWithIndexO_1=foldMapWithIndex(O);return function(M){var foldMapWithIndexM=foldMapWithIndexO_1(M);return function(f){return foldMapWithIndexM((function(_,a){return f(a)}))}}}return foldMap(Ord)(O)}function reduceRight(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];if(1===args.length){var reduceRightWithIndexO_1=reduceRightWithIndex(args[0]);return function(b,f){return reduceRightWithIndexO_1(b,(function(_,b,a){return f(b,a)}))}}return reduceRight(Ord).apply(void 0,args)}var compact=function(r){var out={};for(var k in r)if(has.call(r,k)){var oa=r[k];isSome(oa)&&(out[k]=oa.value)}return out},separate=function(r){var left={},right={};for(var k in r)if(has.call(r,k)){var e=r[k];isLeft$1(e)?left[k]=e.left:right[k]=e.right}return separated(left,right)},URI$1="ReadonlyRecord",Compactable={URI:URI$1,compact:compact,separate:separate};_reduce(Ord),_foldMap(Ord),_reduceRight(Ord),_reduce(Ord),_foldMap(Ord),_reduceRight(Ord),_reduceWithIndex(Ord),_foldMapWithIndex(Ord),_reduceRightWithIndex(Ord);var Traversable={URI:URI$1,map:_map,reduce:_reduce(Ord),foldMap:_foldMap(Ord),reduceRight:_reduceRight(Ord),traverse:_traverse(Ord),sequence:sequence};_reduce(Ord),_foldMap(Ord),_reduceRight(Ord),_reduceWithIndex(Ord),_foldMapWithIndex(Ord),_reduceRightWithIndex(Ord),_traverse(Ord),_traverseWithIndex(Ord);witherDefault(Traversable,Compactable),wiltDefault(Traversable,Compactable);_reduce(Ord),_foldMap(Ord),_reduceRight(Ord),_traverse(Ord);var insertAt=function(k,a){return function(r){if(has.call(r,k)&&r[k]===a)return r;var out=Object.assign({},r);return out[k]=a,out}};_reduce(Ord),_foldMap(Ord),_reduceRight(Ord),_traverse(Ord),_reduceWithIndex(Ord),_foldMapWithIndex(Ord),_reduceRightWithIndex(Ord),_traverseWithIndex(Ord);var left$1=function(e){return{_tag:"Left",left:e}},right$1=function(a){return{_tag:"Right",right:a}},isLeft=isLeft$1,__spreadArrays=function(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;var r=Array(s),k=0;for(i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r},isoAsLens=function(sa){return lens$2(sa.get,flow(sa.reverseGet,constant$1))},lens$2=function(get,set){return{get:get,set:set}},lensAsOptional=function(sa){return optional(flow(sa.get,some$1),sa.set)},lensComposeLens=function(ab){return function(sa){return lens$2((function(s){return ab.get(sa.get(s))}),(function(b){return function(s){return sa.set(ab.set(b)(sa.get(s)))(s)}}))}},prism=function(getOption,reverseGet){return{getOption:getOption,reverseGet:reverseGet}},prismAsOptional=function(sa){return optional(sa.getOption,(function(a){return prismSet(a)(sa)}))},prismAsTraversal=function(sa){return traversal((function(F){return function(f){return function(s){return pipe(sa.getOption(s),fold((function(){return F.of(s)}),(function(a){return F.map(f(a),(function(a){return prismSet(a)(sa)(s)}))})))}}}))},prismModify=function(f){return function(sa){var g=function(f){return function(sa){return function(s){return pipe(sa.getOption(s),map$1((function(o){var n=f(o);return n===o?s:sa.reverseGet(n)})))}}}(f)(sa);return function(s){return pipe(g(s),getOrElse((function(){return s})))}}},prismSet=function(a){return prismModify((function(){return a}))},prismFromNullable=function(){return prism(fromNullable$1,identity)},prismFromPredicate=function(predicate){return prism(fromPredicate$1(predicate),identity)},prismSome=function(){return prism(identity,some$1)},prismRight=function(){return prism(fromEither,right$1)},prismLeft=function(){return prism((function(s){return isLeft(s)?some$1(s.left):none}),left$1)},optional=function(getOption,set){return{getOption:getOption,set:set}},optionalModifyOption=function(f){return function(optional){return function(s){return pipe(optional.getOption(s),map$1((function(a){var n=f(a);return n===a?s:optional.set(n)(s)})))}}},optionalModify=function(f){return function(optional){var g=optionalModifyOption(f)(optional);return function(s){return pipe(g(s),getOrElse((function(){return s})))}}},optionalComposeOptional=function(ab){return function(sa){return optional(flow(sa.getOption,chain(ab.getOption)),(function(b){return optionalModify(ab.set(b))(sa)}))}},unsafeUpdateAt=function(i,a,as){if(as[i]===a)return as;var xs=__spreadArrays([as[0]],as.slice(1));return xs[i]=a,xs},traversal=function(modifyF){return{modifyF:modifyF}};function traversalComposeTraversal(ab){return function(sa){return traversal((function(F){return function(f){return sa.modifyF(F)(ab.modifyF(F)(f))}}))}}var ApplicativeIdentity={URI:"Identity",map:function(fa,f){return f(fa)},of:identity,ap:function(fab,fa){return fab(fa)}};function fromTraversable$2(T){return function(){return traversal((function(F){var traverseF=function(F){return"Identity"===F.URI}(F)?T.map:T.traverse(F);return function(f){return function(s){return traverseF(s,f)}}}))}}var index$1=function(index){return{index:index}},indexReadonlyArray=function(){return index$1((function(i){return optional((function(as){return lookup$1(i,as)}),(function(a){return function(as){return pipe(lookup$1(i,as),fold((function(){return as}),(function(){return unsafeUpdateAt$1(i,a,as)})))}}))}))},indexReadonlyNonEmptyArray=function(){return index$1((function(i){return optional((function(as){return lookup$1(i,as)}),(function(a){return function(as){return pipe(lookup$1(i,as),fold((function(){return as}),(function(){return unsafeUpdateAt(i,a,as)})))}}))}))},indexReadonlyRecord=function(){return index$1((function(k){return optional((function(r){return lookup(k,r)}),(function(a){return function(r){return r[k]===a||isNone(lookup(k,r))?r:insertAt(k,a)(r)}}))}))};var asLens=isoAsLens,asPrism=function(sa){return prism(flow(sa.get,some$1),sa.reverseGet)},asOptional$2=function(sa){return optional(flow(sa.get,some$1),flow(sa.reverseGet,constant$1))},asTraversal$3=function(sa){return traversal((function(F){return function(f){return function(s){return F.map(f(sa.get(s)),(function(a){return sa.reverseGet(a)}))}}}))},lens=lens$2,id=function(){return lens$2(identity,constant$1)},asOptional$1=lensAsOptional,asTraversal$2=function(sa){return traversal((function(F){return function(f){return function(s){return F.map(f(sa.get(s)),(function(a){return sa.set(a)(s)}))}}}))},compose$3=lensComposeLens,composeLens$1=compose$3,composeIso=flow(isoAsLens,compose$3),composePrism=function(ab){return function(sa){return optionalComposeOptional(prismAsOptional(ab))(lensAsOptional(sa))}},composeOptional=function(ab){return flow(asOptional$1,optionalComposeOptional(ab))},modify$3=function(f){return function(sa){return function(s){var o=sa.get(s),n=f(o);return o===n?s:sa.set(n)(s)}}};var prop=function(prop){return function(sa){return lens$2((function(s){return sa.get(s)[prop]}),(function(ap){return function(s){var _a,oa=sa.get(s);return ap===oa[prop]?s:sa.set(Object.assign({},oa,((_a={})[prop]=ap,_a)))(s)}}))}},props=function(){for(var props=[],_i=0;_i<arguments.length;_i++)props[_i]=arguments[_i];return function(sa){return lens$2((function(s){for(var a=sa.get(s),r={},_i=0,props_1=props;_i<props_1.length;_i++){var k=props_1[_i];r[k]=a[k]}return r}),(function(a){return function(s){for(var oa=sa.get(s),_i=0,props_2=props;_i<props_2.length;_i++){var k=props_2[_i];if(a[k]!==oa[k])return sa.set(Object.assign({},oa,a))(s)}return s}}))}},component=function(prop){return function(sa){return lens$2((function(s){return sa.get(s)[prop]}),(function(ap){return function(s){var oa=sa.get(s);if(ap===oa[prop])return s;var copy=oa.slice();return copy[prop]=ap,sa.set(copy)(s)}}))}},atKey=function(key){return function(sa){return pipe(sa,lensComposeLens(function(at){return{at:at}}((function(key){return lens$2((function(r){return lookup(key,r)}),fold((function(){return k=key,function(r){if(!has.call(r,k))return r;var out=Object.assign({},r);return delete out[k],out};var k}),(function(a){return insertAt(key,a)})))})).at(key)))}},some=composePrism(prismSome()),right=composePrism(prismRight()),left=composePrism(prismLeft());var imap_=function(ea,ab,ba){return lens(flow(ea.get,ab),flow(ba,ea.set))},URI="monocle-ts/Lens",Invariant={URI:URI,imap:imap_},Semigroupoid={URI:URI,compose:function(ab,ea){return compose$3(ab)(ea)}},Category={URI:URI,compose:Semigroupoid.compose,id:id},lens$1=Object.freeze({__proto__:null,lens:lens,id:id,asOptional:asOptional$1,asTraversal:asTraversal$2,compose:compose$3,composeLens:composeLens$1,composeIso:composeIso,composePrism:composePrism,composeOptional:composeOptional,composeTraversal:function(ab){return flow(asTraversal$2,traversalComposeTraversal(ab))},modify:modify$3,modifyF:function(F){return function(f){return function(sa){return function(s){return pipe(sa.get(s),f,(function(fa){return F.map(fa,(function(a){return sa.set(a)(s)}))}))}}}},fromNullable:function(sa){return composePrism(prismFromNullable())(sa)},filter:function(predicate){return composePrism(prismFromPredicate(predicate))},prop:prop,props:props,component:component,index:function(i){return flow(asOptional$1,function(i){return function(sa){return pipe(sa,optionalComposeOptional(indexReadonlyArray().index(i)))}}(i))},indexNonEmpty:function(i){return flow(asOptional$1,function(i){return function(sa){return pipe(sa,optionalComposeOptional(indexReadonlyNonEmptyArray().index(i)))}}(i))},key:function(key){return flow(asOptional$1,function(key){return function(sa){return pipe(sa,optionalComposeOptional(indexReadonlyRecord().index(key)))}}(key))},atKey:atKey,some:some,right:right,left:left,traverse:function(T){return flow(asTraversal$2,function(T){return traversalComposeTraversal(fromTraversable$2(T)())}(T))},findFirst:function(predicate){return composeOptional(function(predicate){return optional(findFirst$1(predicate),(function(a){return function(s){return pipe(findIndex(predicate)(s),fold((function(){return s}),(function(i){return unsafeUpdateAt$1(i,a,s)})))}}))}(predicate))},findFirstNonEmpty:function(predicate){return composeOptional(function(predicate){return optional(findFirst$1(predicate),(function(a){return function(as){return pipe(findIndex(predicate)(as),fold((function(){return as}),(function(i){return unsafeUpdateAt(i,a,as)})))}}))}(predicate))},imap:function(f,g){return function(ea){return imap_(ea,f,g)}},URI:URI,Invariant:Invariant,Semigroupoid:Semigroupoid,Category:Category}),asTraversal$1=function(sa){return traversal((function(F){return function(f){return function(s){return pipe(sa.getOption(s),fold((function(){return F.of(s)}),(function(a){return F.map(f(a),(function(a){return sa.set(a)(s)}))})))}}}))},compose$2=optionalComposeOptional,modifyOption=optionalModifyOption,modify$2=optionalModify;prismAsOptional(prismFromNullable()),prismAsOptional(prismSome()),prismAsOptional(prismRight()),prismAsOptional(prismLeft());var fromPredicate=prismFromPredicate,asOptional=prismAsOptional,asTraversal=prismAsTraversal,compose$1=function(ab){return function(sa){return prism(flow(sa.getOption,chain(ab.getOption)),flow(ab.reverseGet,sa.reverseGet))}},composeLens=function(ab){return function(sa){return optionalComposeOptional(lensAsOptional(ab))(prismAsOptional(sa))}},fromTraversable$1=fromTraversable$2,compose=traversalComposeTraversal,modify$1=function(f){return function(sa){return sa.modifyF(ApplicativeIdentity)(f)}};var fromLens=function(lens){return new Lens(lens.get,lens.set)},fromPrism=function(prism){return new Prism(prism.getOption,prism.reverseGet)},fromOptional=function(optional){return new Optional(optional.getOption,optional.set)},fromTraversal=function(traversal){return new Traversal(traversal.modifyF)},update=function(o,k,a){var _a;return a===o[k]?o:Object.assign({},o,((_a={})[k]=a,_a))},Lens=function(){function Lens(get,set){this.get=get,this.set=set,this._tag="Lens"}return Lens.fromPath=function(){var fromProp=Lens.fromProp();return function(path){var lens=fromProp(path[0]);return path.slice(1).reduce((function(acc,prop){return acc.compose(fromProp(prop))}),lens)}},Lens.fromProp=function(){return function(prop$1){return fromLens(pipe(id(),prop(prop$1)))}},Lens.fromProps=function(){return function(props$1){return fromLens(pipe(id(),props.apply(lens$1,props$1)))}},Lens.fromNullableProp=function(){return function(k,defaultValue){return new Lens((function(s){var osk=fromNullable$1(s[k]);return isNone(osk)?defaultValue:osk.value}),(function(a){return function(s){return update(s,k,a)}}))}},Lens.prototype.modify=function(f){return modify$3(f)(this)},Lens.prototype.asOptional=function(){return fromOptional(asOptional$1(this))},Lens.prototype.asTraversal=function(){return fromTraversal(asTraversal$2(this))},Lens.prototype.asSetter=function(){var _this=this;return new Setter((function(f){return _this.modify(f)}))},Lens.prototype.asGetter=function(){var _this=this;return new Getter((function(s){return _this.get(s)}))},Lens.prototype.asFold=function(){var _this=this;return new Fold((function(){return function(f){return function(s){return f(_this.get(s))}}}))},Lens.prototype.compose=function(ab){return fromLens(compose$3(ab)(this))},Lens.prototype.composeLens=function(ab){return this.compose(ab)},Lens.prototype.composeGetter=function(ab){return this.asGetter().compose(ab)},Lens.prototype.composeFold=function(ab){return this.asFold().compose(ab)},Lens.prototype.composeOptional=function(ab){return fromOptional(pipe(this,asOptional$1,compose$2(ab)))},Lens.prototype.composeTraversal=function(ab){return fromTraversal(pipe(this,asTraversal$2,compose(ab)))},Lens.prototype.composeSetter=function(ab){return this.asSetter().compose(ab)},Lens.prototype.composeIso=function(ab){return fromLens(pipe(this,compose$3(pipe(ab,asLens))))},Lens.prototype.composePrism=function(ab){return fromOptional(composePrism(ab)(this))},Lens}(),Prism=function(){function Prism(getOption,reverseGet){this.getOption=getOption,this.reverseGet=reverseGet,this._tag="Prism"}return Prism.fromPredicate=function(predicate){return fromPrism(fromPredicate(predicate))},Prism.some=function(){return somePrism},Prism.prototype.modify=function(f){var _this=this;return function(s){var os=_this.modifyOption(f)(s);return isNone(os)?s:os.value}},Prism.prototype.modifyOption=function(f){var _this=this;return function(s){return option_map(_this.getOption(s),(function(v){var n=f(v);return n===v?s:_this.reverseGet(n)}))}},Prism.prototype.set=function(a){return this.modify((function(){return a}))},Prism.prototype.asOptional=function(){return fromOptional(asOptional(this))},Prism.prototype.asTraversal=function(){return fromTraversal(asTraversal(this))},Prism.prototype.asSetter=function(){var _this=this;return new Setter((function(f){return _this.modify(f)}))},Prism.prototype.asFold=function(){var _this=this;return new Fold((function(M){return function(f){return function(s){var oa=_this.getOption(s);return isNone(oa)?M.empty:f(oa.value)}}}))},Prism.prototype.compose=function(ab){return fromPrism(compose$1(ab)(this))},Prism.prototype.composePrism=function(ab){return this.compose(ab)},Prism.prototype.composeOptional=function(ab){return fromOptional(pipe(this,asOptional,compose$2(ab)))},Prism.prototype.composeTraversal=function(ab){return fromTraversal(pipe(this,asTraversal,compose(ab)))},Prism.prototype.composeFold=function(ab){return this.asFold().compose(ab)},Prism.prototype.composeSetter=function(ab){return this.asSetter().compose(ab)},Prism.prototype.composeIso=function(ab){return fromPrism(pipe(this,compose$1(pipe(ab,asPrism))))},Prism.prototype.composeLens=function(ab){return fromOptional(composeLens(ab)(this))},Prism.prototype.composeGetter=function(ab){return this.asFold().compose(ab.asFold())},Prism}(),somePrism=new Prism(identity,some$1),Optional=function(){function Optional(getOption,set){this.getOption=getOption,this.set=set,this._tag="Optional"}return Optional.fromPath=function(){var fromNullableProp=Optional.fromNullableProp();return function(path){var optional=fromNullableProp(path[0]);return path.slice(1).reduce((function(acc,prop){return acc.compose(fromNullableProp(prop))}),optional)}},Optional.fromNullableProp=function(){return function(k){return new Optional((function(s){return fromNullable$1(s[k])}),(function(a){return function(s){return null==s[k]?s:update(s,k,a)}}))}},Optional.fromOptionProp=function(){var formProp=Lens.fromProp();return function(prop){return formProp(prop).composePrism(somePrism)}},Optional.prototype.modify=function(f){return modify$2(f)(this)},Optional.prototype.modifyOption=function(f){return modifyOption(f)(this)},Optional.prototype.asTraversal=function(){return fromTraversal(asTraversal$1(this))},Optional.prototype.asFold=function(){var _this=this;return new Fold((function(M){return function(f){return function(s){var oa=_this.getOption(s);return isNone(oa)?M.empty:f(oa.value)}}}))},Optional.prototype.asSetter=function(){var _this=this;return new Setter((function(f){return _this.modify(f)}))},Optional.prototype.compose=function(ab){return fromOptional(compose$2(ab)(this))},Optional.prototype.composeOptional=function(ab){return this.compose(ab)},Optional.prototype.composeTraversal=function(ab){return fromTraversal(pipe(this,asTraversal$1,compose(ab)))},Optional.prototype.composeFold=function(ab){return this.asFold().compose(ab)},Optional.prototype.composeSetter=function(ab){return this.asSetter().compose(ab)},Optional.prototype.composeLens=function(ab){return fromOptional(pipe(this,compose$2(pipe(ab,asOptional$1))))},Optional.prototype.composePrism=function(ab){return fromOptional(pipe(this,compose$2(pipe(ab,asOptional))))},Optional.prototype.composeIso=function(ab){return fromOptional(pipe(this,compose$2(pipe(ab,asOptional$2))))},Optional.prototype.composeGetter=function(ab){return this.asFold().compose(ab.asFold())},Optional}(),Traversal=function(){function Traversal(modifyF){this.modifyF=modifyF,this._tag="Traversal"}return Traversal.prototype.modify=function(f){return modify$1(f)(this)},Traversal.prototype.set=function(a){return function(a){return modify$1((function(){return a}))}(a)(this)},Traversal.prototype.filter=function(predicate){return fromTraversal(function(predicate){return compose(prismAsTraversal(prismFromPredicate(predicate)))}(predicate)(this))},Traversal.prototype.asFold=function(){var _this=this;return new Fold((function(M){return function(f){return _this.modifyF(getApplicative(M))((function(a){return make(f(a))}))}}))},Traversal.prototype.asSetter=function(){var _this=this;return new Setter((function(f){return _this.modify(f)}))},Traversal.prototype.compose=function(ab){return fromTraversal(compose(ab)(this))},Traversal.prototype.composeTraversal=function(ab){return this.compose(ab)},Traversal.prototype.composeFold=function(ab){return this.asFold().compose(ab)},Traversal.prototype.composeSetter=function(ab){return this.asSetter().compose(ab)},Traversal.prototype.composeOptional=function(ab){return this.compose(ab.asTraversal())},Traversal.prototype.composeLens=function(ab){return fromTraversal(pipe(this,compose(pipe(ab,asTraversal$2))))},Traversal.prototype.composePrism=function(ab){return fromTraversal(pipe(this,compose(pipe(ab,asTraversal))))},Traversal.prototype.composeIso=function(ab){return fromTraversal(pipe(this,compose(pipe(ab,asTraversal$3))))},Traversal.prototype.composeGetter=function(ab){return this.asFold().compose(ab.asFold())},Traversal}(),Getter=function(){function Getter(get){this.get=get,this._tag="Getter"}return Getter.prototype.asFold=function(){var _this=this;return new Fold((function(){return function(f){return function(s){return f(_this.get(s))}}}))},Getter.prototype.compose=function(ab){var _this=this;return new Getter((function(s){return ab.get(_this.get(s))}))},Getter.prototype.composeGetter=function(ab){return this.compose(ab)},Getter.prototype.composeFold=function(ab){return this.asFold().compose(ab)},Getter.prototype.composeLens=function(ab){return this.compose(ab.asGetter())},Getter.prototype.composeIso=function(ab){return this.compose(ab.asGetter())},Getter.prototype.composeTraversal=function(ab){return this.asFold().compose(ab.asFold())},Getter.prototype.composeOptional=function(ab){return this.asFold().compose(ab.asFold())},Getter.prototype.composePrism=function(ab){return this.asFold().compose(ab.asFold())},Getter}(),Fold=function(){function Fold(foldMap){this.foldMap=foldMap,this._tag="Fold",this.getAll=foldMap({concat:function(first,second){return first.concat(second)},empty:[]})(of$2),this.exist=foldMap(monoidAny),this.all=foldMap(monoidAll),this.foldMapFirst=foldMap(getFirstMonoid())}return Fold.prototype.compose=function(ab){var _this=this;return new Fold((function(M){return function(f){return _this.foldMap(M)(ab.foldMap(M)(f))}}))},Fold.prototype.composeFold=function(ab){return this.compose(ab)},Fold.prototype.composeGetter=function(ab){return this.compose(ab.asFold())},Fold.prototype.composeTraversal=function(ab){return this.compose(ab.asFold())},Fold.prototype.composeOptional=function(ab){return this.compose(ab.asFold())},Fold.prototype.composeLens=function(ab){return this.compose(ab.asFold())},Fold.prototype.composePrism=function(ab){return this.compose(ab.asFold())},Fold.prototype.composeIso=function(ab){return this.compose(ab.asFold())},Fold.prototype.find=function(p){return this.foldMapFirst(fromPredicate$1(p))},Fold.prototype.headOption=function(s){return this.find((function(){return!0}))(s)},Fold}(),Setter=function(){function Setter(modify){this.modify=modify,this._tag="Setter"}return Setter.prototype.set=function(a){return this.modify(constant$1(a))},Setter.prototype.compose=function(ab){var _this=this;return new Setter((function(f){return _this.modify(ab.modify(f))}))},Setter.prototype.composeSetter=function(ab){return this.compose(ab)},Setter.prototype.composeTraversal=function(ab){return this.compose(ab.asSetter())},Setter.prototype.composeOptional=function(ab){return this.compose(ab.asSetter())},Setter.prototype.composeLens=function(ab){return this.compose(ab.asSetter())},Setter.prototype.composePrism=function(ab){return this.compose(ab.asSetter())},Setter.prototype.composeIso=function(ab){return this.compose(ab.asSetter())},Setter}();var seenKeys={},MULTIPLIER=Math.pow(2,24);function generateId(){for(var key;void 0===key||seenKeys.hasOwnProperty(key)||!isNaN(Number(key));)key=Math.floor(Math.random()*MULTIPLIER).toString(32);return seenKeys[key]=!0,key}var _excluded=["_modId"],getModifier=function(nodesAccessor,nodesSetter){return function(root){var f,TraversalModifier=function(){function TraversalModifier(tree,traversal){this.tree=tree,this.traversal=traversal}var _proto=TraversalModifier.prototype;return _proto.filter=function(predicate){return new TraversalModifier(this.tree,this.traversal.composePrism(Prism.fromPredicate(predicate)))},_proto.set=function(setter){return pipe$1(this.traversal.asFold().getAll(this.tree),(f=function(node){return node._modId},function(fa){return fa.map((function(a){return f(a)}))}),foldTree(this.tree,setter));var f},TraversalModifier}(),toArray=function(node){return Array.isArray(node)?node:of$2(node)},foldTree=function(tree,setter){return function(idsToSet){return(f=function(root,forest){return _extends({},root,nodesSetter(forest.reduce((function(modifiedForest,node){return pipe$1(node,function(idsToSet,setter){return function(modTreeNode){var _modId=modTreeNode._modId,node=_objectWithoutPropertiesLoose(modTreeNode,_excluded);return idsToSet.includes(_modId)?setter(node):node}}(idsToSet,setter),toArray,(prefix=modifiedForest,function(suffix){return[].concat(prefix,suffix)}));var prefix}),[])))},go=function(tree){return f(tree.value,tree.forest.map(go))})(tree);var f,go}};return new TraversalModifier(unfoldTree(root,(function(node){return[_extends({},node,{_modId:generateId()}),nodesAccessor(node)]})),(f=fromTraversable$1(tree),function(){return fromTraversal(f())})())}},nodesAccessor=function(node){return node.nodes},nodesSetter=function(nodes){return{nodes:nodes}},getRootNode=function(content){return{id:"root",type:"UNRECOGNIZED",nodes:content.nodes}},modify=function(content){return pipe$1(content,getRootNode,getModifier(nodesAccessor,nodesSetter),function(content){return function(modifier){var self={modifier:modifier};return{filter:function(predicate){return self.modifier=modifier.filter.bind(self.modifier)(predicate),self.modifier.set=this.set,self.modifier.filter=this.filter,self.modifier},set:function(setter){var root=modifier.set.bind(self.modifier)(setter);return _extends({},content,{nodes:root.nodes})}}}}(content))};export{modify};
