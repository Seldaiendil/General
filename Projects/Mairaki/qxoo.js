(function(){ 

if (!this.window) window = this;

if (!window.navigator) window.navigator = {
  userAgent: "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; de-de) AppleWebKit/533.17.8 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8", 
  product: "", 
  cpuClass: ""
}; 

if (!window.qx) window.qx = {};

if (!window.qxvariants) qxvariants = {};
  
if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.aspects":false,"qx.debug":true,"qx.globalErrorHandling":false,"qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

qx.$$packageData = {};
qx.$$loader = {};
})();

qx.$$packageData['0']={"locales":{},"resources":{},"translations":{}};
(function(){var m="toString",k=".",j="default",h="Object",g='"',f="Array",e="()",d="String",c="Function",b=".prototype",L="function",K="Boolean",J="Error",I="constructor",H="warn",G="hasOwnProperty",F="string",E="toLocaleString",D="RegExp",C='\", "',t="info",u="BROKEN_IE",r="isPrototypeOf",s="Date",p="",q="qx.Bootstrap",n="]",o="Class",v="error",w="[Class ",y="valueOf",x="Number",A="count",z="debug",B="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return w+this.classname+n;
},createNamespace:function(name,M){var O=name.split(k);
var parent=window;
var N=O[0];

for(var i=0,P=O.length-1;i<P;i++,N=O[i]){if(!parent[N]){parent=parent[N]={};
}else{parent=parent[N];
}}parent[N]=M;
return N;
},setDisplayName:function(Q,R,name){Q.displayName=R+k+name+e;
},setDisplayNames:function(S,T){for(var name in S){var U=S[name];

if(U instanceof Function){U.displayName=T+k+name+e;
}}},define:function(name,V){if(!V){var V={statics:{}};
}var bb;
var Y=null;
qx.Bootstrap.setDisplayNames(V.statics,name);

if(V.members||V.extend){qx.Bootstrap.setDisplayNames(V.members,name+b);
bb=V.construct||new Function;

if(V.extend){this.extendClass(bb,bb,V.extend,name,ba);
}var W=V.statics||{};
for(var i=0,bc=qx.Bootstrap.getKeys(W),l=bc.length;i<l;i++){var bd=bc[i];
bb[bd]=W[bd];
}Y=bb.prototype;
var X=V.members||{};
for(var i=0,bc=qx.Bootstrap.getKeys(X),l=bc.length;i<l;i++){var bd=bc[i];
Y[bd]=X[bd];
}}else{bb=V.statics||{};
}var ba=this.createNamespace(name,bb);
bb.name=bb.classname=name;
bb.basename=ba;
bb.$$type=o;
if(!bb.hasOwnProperty(m)){bb.toString=this.genericToString;
}if(V.defer){V.defer(bb,Y);
}qx.Bootstrap.$$registry[name]=V.statics;
return bb;
}};
qx.Bootstrap.define(q,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var be=true;

if(qx.$$environment&&qx.$$environment["qx.debug"]===false){be=false;
}return be;
})(),getEnvironmentSetting:function(bf){if(qx.$$environment){return qx.$$environment[bf];
}},setEnvironmentSetting:function(bg,bh){if(!qx.$$environment){qx.$$environment={};
}
if(qx.$$environment[bg]===undefined){qx.$$environment[bg]=bh;
}},createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(bi,bj,bk,name,bl){var bo=bk.prototype;
var bn=new Function;
bn.prototype=bo;
var bm=new bn;
bi.prototype=bm;
bm.name=bm.classname=name;
bm.basename=bl;
bj.base=bi.superclass=bk;
bj.self=bi.constructor=bm.constructor=bi;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(bp){return bp.__count__;
},"default":function(bq){var length=0;

for(var br in bq){length++;
}return length;
}})[(({}).__count__==0)?A:j],objectMergeWith:function(bs,bt,bu){if(bu===undefined){bu=true;
}
for(var bv in bt){if(bu||bs[bv]===undefined){bs[bv]=bt[bv];
}}return bs;
},__a:[r,G,E,m,y,I],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bw){var bx=[];
var bz=Object.prototype.hasOwnProperty;

for(var bA in bw){if(bz.call(bw,bA)){bx.push(bA);
}}var by=qx.Bootstrap.__a;

for(var i=0,a=by,l=a.length;i<l;i++){if(bz.call(bw,a[i])){bx.push(a[i]);
}}return bx;
},"default":function(bB){var bC=[];
var bD=Object.prototype.hasOwnProperty;

for(var bE in bB){if(bD.call(bB,bE)){bC.push(bE);
}}return bC;
}})[typeof (Object.keys)==L?B:(function(){for(var bF in {toString:1}){return bF;
}})()!==m?u:j],getKeysAsString:function(bG){var bH=qx.Bootstrap.getKeys(bG);

if(bH.length==0){return p;
}return g+bH.join(C)+g;
},__b:{"[object String]":d,"[object Array]":f,"[object Object]":h,"[object RegExp]":D,"[object Number]":x,"[object Boolean]":K,"[object Date]":s,"[object Function]":c,"[object Error]":J},bind:function(bI,self,bJ){var bK=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var bL=Array.prototype.slice.call(arguments,0,arguments.length);
return bI.apply(self,bK.concat(bL));
};
},firstUp:function(bM){return bM.charAt(0).toUpperCase()+bM.substr(1);
},firstLow:function(bN){return bN.charAt(0).toLowerCase()+bN.substr(1);
},getClass:function(bO){var bP=Object.prototype.toString.call(bO);
return (qx.Bootstrap.__b[bP]||bP.slice(8,-1));
},isString:function(bQ){return (bQ!==null&&(typeof bQ===F||qx.Bootstrap.getClass(bQ)==d||bQ instanceof String||(!!bQ&&!!bQ.$$isString)));
},isArray:function(bR){return (bR!==null&&(bR instanceof Array||(bR&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(bR.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bR)==f||(!!bR&&!!bR.$$isArray)));
},isObject:function(bS){return (bS!==undefined&&bS!==null&&qx.Bootstrap.getClass(bS)==h);
},isFunction:function(bT){return qx.Bootstrap.getClass(bT)==c;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(bU,name){while(bU){if(bU.$$properties&&bU.$$properties[name]){return bU.$$properties[name];
}bU=bU.superclass;
}return null;
},hasProperty:function(bV,name){return !!qx.Bootstrap.getPropertyDefinition(bV,name);
},getEventType:function(bW,name){var bW=bW.constructor;

while(bW.superclass){if(bW.$$events&&bW.$$events[name]!==undefined){return bW.$$events[name];
}bW=bW.superclass;
}return null;
},supportsEvent:function(bX,name){return !!qx.Bootstrap.getEventType(bX,name);
},getByInterface:function(bY,ca){var cb,i,l;

while(bY){if(bY.$$implements){cb=bY.$$flatImplements;

for(i=0,l=cb.length;i<l;i++){if(cb[i]===ca){return bY;
}}}bY=bY.superclass;
}return null;
},hasInterface:function(cc,cd){return !!qx.Bootstrap.getByInterface(cc,cd);
},getMixins:function(ce){var cf=[];

while(ce){if(ce.$$includes){cf.push.apply(cf,ce.$$flatIncludes);
}ce=ce.superclass;
}return cf;
},$$logs:[],debug:function(cg,ch){qx.Bootstrap.$$logs.push([z,arguments]);
},info:function(ci,cj){qx.Bootstrap.$$logs.push([t,arguments]);
},warn:function(ck,cl){qx.Bootstrap.$$logs.push([H,arguments]);
},error:function(cm,cn){qx.Bootstrap.$$logs.push([v,arguments]);
},trace:function(co){}}});
})();
(function(){var r=".",q="function",p="",o="gecko",n="[object Opera]",m="mshtml",l="8.0",k="AppleWebKit/",j="9.0",i="[^\\.0-9]",c="Gecko",h="webkit",f="4.0",b="1.9.0.0",a="opera",e="Version/",d="5.0",g="qx.bom.client.Engine";
qx.Bootstrap.define(g,{statics:{getVersion:function(){var v=window.navigator.userAgent;
var t=p;

if(qx.bom.client.Engine.__c()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(v)){if(v.indexOf(e)!=-1){var u=v.match(/Version\/(\d+)\.(\d+)/);
t=u[1]+r+u[2].charAt(0)+r+u[2].substring(1,u[2].length);
}else{t=RegExp.$1+r+RegExp.$2;

if(RegExp.$3!=p){t+=r+RegExp.$3;
}}}}else if(qx.bom.client.Engine.__d()){if(/AppleWebKit\/([^ ]+)/.test(v)){t=RegExp.$1;
var w=RegExp(i).exec(t);

if(w){t=t.slice(0,w.index);
}}}else if(qx.bom.client.Engine.__e()){if(/rv\:([^\);]+)(\)|;)/.test(v)){t=RegExp.$1;
}}else if(qx.bom.client.Engine.__f()){if(/MSIE\s+([^\);]+)(\)|;)/.test(v)){t=RegExp.$1;
if(t<8&&/Trident\/([^\);]+)(\)|;)/.test(v)){if(RegExp.$1==f){t=l;
}else if(RegExp.$1==d){t=j;
}}}}else{var s=window.qxFail;

if(s&&typeof s===q){t=s().FULLVERSION;
}else{t=b;
qx.Bootstrap.warn("Unsupported client: "+v+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}return t;
},getName:function(){var name;

if(qx.bom.client.Engine.__c()){name=a;
}else if(qx.bom.client.Engine.__d()){name=h;
}else if(qx.bom.client.Engine.__e()){name=o;
}else if(qx.bom.client.Engine.__f()){name=m;
}else{var x=window.qxFail;

if(x&&typeof x===q){name=x().NAME;
}else{name=o;
qx.Bootstrap.warn("Unsupported client: "+window.navigator.userAgent+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}return name;
},__c:function(){return window.opera&&Object.prototype.toString.call(window.opera)==n;
},__d:function(){return window.navigator.userAgent.indexOf(k)!=-1;
},__e:function(){return window.controllers&&window.navigator.product===c;
},__f:function(){return window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent);
}}});
})();
(function(){var k="default",j="qx.allowUrlSettings",h="engine.version",g="engine.name",f="|",e="qx.core.Environment",d="qx.debug.databinding",c="qx.optimization.basecalls",b="qx.debug.dispose",a="qx.optimization.variables",B="true",A="qx.optimization.privates",z="qx.aspects",y="qx.debug",x="qx.dynamicmousewheel",w=":",v="qxenv",u="qx.optimization.strings",t="qx.optimization.comments",s="qx.optimization.variants",q="qx.mobile.emulatetouch",r="qx.dynlocale",o="false",p="&",m="qx.mobile.nativescroll",n="qx.allowUrlVariants",l="qx.propertyDebugLevel";
qx.Bootstrap.define(e,{statics:{_checks:{},_asyncChecks:{},__k:{},get:function(C){if(this.__k[C]!=undefined){return this.__k[C];
}var D=this._checks[C];

if(D){var E=D();
this.__k[C]=E;
return E;
}if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(C+" is not a valid key. Please see the API-doc of "+"qx.core.Environment for a list of predefined keys.");
qx.Bootstrap.trace(this);
}},getAsync:function(F,G,self){var I=this;

if(this.__k[F]!=undefined){window.setTimeout(function(){G.call(self,I.__k[F]);
},0);
return;
}var H=this._asyncChecks[F];

if(H){H(function(J){I.__k[F]=J;
G.call(self,J);
});
return;
}if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(F+" is not a valid key. Please see the API-doc of "+"qx.core.Environment for a list of predefined keys.");
qx.Bootstrap.trace(this);
}},select:function(K,L){return this.__l(this.get(K),L);
},selectAsync:function(M,N,self){this.getAsync(M,function(O){var P=this.__l(M,N);
P.call(self,O);
},this);
},__l:function(Q,R){var T=R[Q];

if(R.hasOwnProperty(Q)){return T;
}for(var S in R){if(S.indexOf(f)!=-1){var U=S.split(f);

for(var i=0;i<U.length;i++){if(U[i]==Q){return R[S];
}}}}
if(R[k]!==undefined){return R[k];
}
if(qx.Bootstrap.DEBUG){throw new Error('No match for variant "'+Q+'" ('+(typeof Q)+' type)'+' in variants ['+qx.Bootstrap.getKeysAsString(R)+'] found, and no default ("default") given');
}},invalidateCacheKey:function(V){delete this.__k[V];
},add:function(W,X){if(this._checks[W]==undefined){if(X instanceof Function){this._checks[W]=X;
}else{this._checks[W]=this.__o(X);
}}},addAsync:function(Y,ba){if(this._checks[Y]==undefined){this._asyncChecks[Y]=ba;
}},_initDefaultQxValues:function(){this.add(j,function(){return false;
});
this.add(n,function(){return false;
});
this.add(l,function(){return 0;
});
this.add(y,function(){return true;
});
this.add(z,function(){return false;
});
this.add(r,function(){return true;
});
this.add(q,function(){return false;
});
this.add(m,function(){return false;
});
this.add(x,function(){return true;
});
this.add(d,function(){return false;
});
this.add(b,function(){return false;
});
this.add(c,function(){return false;
});
this.add(t,function(){return false;
});
this.add(A,function(){return false;
});
this.add(u,function(){return false;
});
this.add(a,function(){return false;
});
this.add(s,function(){return false;
});
},__m:function(){if(qx&&qx.$$environment){for(var bc in qx.$$environment){var bb=qx.$$environment[bc];
this._checks[bc]=this.__o(bb);
}}},__n:function(){if(window.document&&window.document.location){var bd=window.document.location.search.slice(1).split(p);

for(var i=0;i<bd.length;i++){var bf=bd[i].split(w);

if(bf.length!=3||bf[0]!=v){continue;
}var bg=bf[1];
var be=decodeURIComponent(bf[2]);
if(be==B){be=true;
}else if(be==o){be=false;
}else if(/^(\d|\.)+$/.test(be)){be=parseFloat(be);
}this._checks[bg]=this.__o(be);
}}},__o:function(bh){return qx.Bootstrap.bind(function(bi){return bi;
},null,bh);
},useCheck:function(bj){return true;
},_initChecksMap:function(){if(this.useCheck(h)){this._checks[h]=qx.bom.client.Engine.getVersion;
}
if(this.useCheck(g)){this._checks[g]=qx.bom.client.Engine.getName;
}}},defer:function(bk){bk._initDefaultQxValues();
bk._initChecksMap();
bk.__m();
if(bk.get(j)===true){bk.__n();
}}});
})();
(function(){var s="object",r="function",q="Array",p="Mixin",o="qx.Mixin",n=".prototype",m="constructor",k="[Mixin ",j="]",h="RegExp",d="members",g="destruct",f="Date",c="events",b="properties",e="statics";
qx.Bootstrap.define(o,{statics:{define:function(name,t){if(t){if(t.include&&!(qx.Bootstrap.getClass(t.include)===q)){t.include=[t.include];
}{this.__q(name,t);
};
var v=t.statics?t.statics:{};
qx.Bootstrap.setDisplayNames(v,name);

for(var u in v){if(v[u] instanceof Function){v[u].$$mixin=v;
}}if(t.construct){v.$$constructor=t.construct;
qx.Bootstrap.setDisplayName(t.construct,name,m);
}
if(t.include){v.$$includes=t.include;
}
if(t.properties){v.$$properties=t.properties;
}
if(t.members){v.$$members=t.members;
qx.Bootstrap.setDisplayNames(t.members,name+n);
}
for(var u in v.$$members){if(v.$$members[u] instanceof Function){v.$$members[u].$$mixin=v;
}}
if(t.events){v.$$events=t.events;
}
if(t.destruct){v.$$destructor=t.destruct;
qx.Bootstrap.setDisplayName(t.destruct,name,g);
}}else{var v={};
}v.$$type=p;
v.name=name;
v.toString=this.genericToString;
v.basename=qx.Bootstrap.createNamespace(name,v);
this.$$registry[name]=v;
return v;
},checkCompatibility:function(w){var z=this.flatten(w);
var A=z.length;

if(A<2){return true;
}var D={};
var C={};
var B={};
var y;

for(var i=0;i<A;i++){y=z[i];

for(var x in y.events){if(B[x]){throw new Error('Conflict between mixin "'+y.name+'" and "'+B[x]+'" in member "'+x+'"!');
}B[x]=y.name;
}
for(var x in y.properties){if(D[x]){throw new Error('Conflict between mixin "'+y.name+'" and "'+D[x]+'" in property "'+x+'"!');
}D[x]=y.name;
}
for(var x in y.members){if(C[x]){throw new Error('Conflict between mixin "'+y.name+'" and "'+C[x]+'" in member "'+x+'"!');
}C[x]=y.name;
}}return true;
},isCompatible:function(E,F){var G=qx.Bootstrap.getMixins(F);
G.push(E);
return qx.Mixin.checkCompatibility(G);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(H){if(!H){return [];
}var I=H.concat();

for(var i=0,l=H.length;i<l;i++){if(H[i].$$includes){I.push.apply(I,this.flatten(H[i].$$includes));
}}return I;
},genericToString:function(){return k+this.name+j;
},$$registry:{},__p:{"include":s,"statics":s,"members":s,"properties":s,"events":s,"destruct":r,"construct":r},__q:function(name,J){var M=this.__p;

for(var L in J){if(!M[L]){throw new Error('The configuration key "'+L+'" in mixin "'+name+'" is not allowed!');
}
if(J[L]==null){throw new Error('Invalid key "'+L+'" in mixin "'+name+'"! The value is undefined/null!');
}
if(M[L]!==null&&typeof J[L]!==M[L]){throw new Error('Invalid type of key "'+L+'" in mixin "'+name+'"! The type of the key must be "'+M[L]+'"!');
}}var K=[e,d,b,c];

for(var i=0,l=K.length;i<l;i++){var L=K[i];

if(J[L]!==undefined&&([q,h,f].indexOf(qx.Bootstrap.getClass(J[L]))!=-1||J[L].classname!==undefined)){throw new Error('Invalid key "'+L+'" in mixin "'+name+'"! The value needs to be a map!');
}}if(J.include){for(var i=0,a=J.include,l=a.length;i<l;i++){if(a[i]==null){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is undefined/null!");
}
if(a[i].$$type!==p){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is not a mixin!");
}}this.checkCompatibility(J.include);
}}}});
})();
(function(){var v="object",u="Array",t="Interface",s="string",r="number",q="function",p="Boolean",o="qx.Interface",n="events",m="properties",e="]",k="members",h="toggle",d="Date",c="RegExp",g="boolean",f="is",j="[Interface ",b="statics";
qx.Bootstrap.define(o,{statics:{define:function(name,w){if(w){if(w.extend&&!(qx.Bootstrap.getClass(w.extend)===u)){w.extend=[w.extend];
}{this.__q(name,w);
};
var x=w.statics?w.statics:{};
if(w.extend){x.$$extends=w.extend;
}
if(w.properties){x.$$properties=w.properties;
}
if(w.members){x.$$members=w.members;
}
if(w.events){x.$$events=w.events;
}}else{var x={};
}x.$$type=t;
x.name=name;
x.toString=this.genericToString;
x.basename=qx.Bootstrap.createNamespace(name,x);
qx.Interface.$$registry[name]=x;
return x;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(y){if(!y){return [];
}var z=y.concat();

for(var i=0,l=y.length;i<l;i++){if(y[i].$$extends){z.push.apply(z,this.flatten(y[i].$$extends));
}}return z;
},__r:function(A,B,C,D){var H=C.$$members;

if(H){for(var G in H){if(qx.Bootstrap.isFunction(H[G])){var F=this.__s(B,G);
var E=F||qx.Bootstrap.isFunction(A[G]);

if(!E){throw new Error('Implementation of method "'+G+'" is missing in class "'+B.classname+'" required by interface "'+C.name+'"');
}var I=D===true&&!F&&!qx.Bootstrap.hasInterface(B,C);

if(I){A[G]=this.__v(C,A[G],G,H[G]);
}}else{if(typeof A[G]===undefined){if(typeof A[G]!==q){throw new Error('Implementation of member "'+G+'" is missing in class "'+B.classname+'" required by interface "'+C.name+'"');
}}}}}},__s:function(J,K){var O=K.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!O){return false;
}var L=qx.Bootstrap.firstLow(O[2]);
var M=qx.Bootstrap.getPropertyDefinition(J,L);

if(!M){return false;
}var N=O[0]==f||O[0]==h;

if(N){return qx.Bootstrap.getPropertyDefinition(J,L).check==p;
}return true;
},__t:function(P,Q){if(Q.$$properties){for(var R in Q.$$properties){if(!qx.Bootstrap.getPropertyDefinition(P,R)){throw new Error('The property "'+R+'" is not supported by Class "'+P.classname+'"!');
}}}},__u:function(S,T){if(T.$$events){for(var U in T.$$events){if(!qx.Bootstrap.supportsEvent(S,U)){throw new Error('The event "'+U+'" is not supported by Class "'+S.classname+'"!');
}}}},assertObject:function(V,W){var Y=V.constructor;
this.__r(V,Y,W,false);
this.__t(Y,W);
this.__u(Y,W);
var X=W.$$extends;

if(X){for(var i=0,l=X.length;i<l;i++){this.assertObject(V,X[i]);
}}},assert:function(ba,bb,bc){this.__r(ba.prototype,ba,bb,bc);
this.__t(ba,bb);
this.__u(ba,bb);
var bd=bb.$$extends;

if(bd){for(var i=0,l=bd.length;i<l;i++){this.assert(ba,bd[i],bc);
}}},genericToString:function(){return j+this.name+e;
},$$registry:{},__v:function(be,bf,bg,bh){function bi(){bh.apply(this,arguments);
return bf.apply(this,arguments);
}bf.wrapper=bi;
return bi;
},__p:{"extend":v,"statics":v,"members":v,"properties":v,"events":v},__q:function(name,bj){{var bm=this.__p;

for(var bl in bj){if(bm[bl]===undefined){throw new Error('The configuration key "'+bl+'" in class "'+name+'" is not allowed!');
}
if(bj[bl]==null){throw new Error("Invalid key '"+bl+"' in interface '"+name+"'! The value is undefined/null!");
}
if(bm[bl]!==null&&typeof bj[bl]!==bm[bl]){throw new Error('Invalid type of key "'+bl+'" in interface "'+name+'"! The type of the key must be "'+bm[bl]+'"!');
}}var bk=[b,k,m,n];

for(var i=0,l=bk.length;i<l;i++){var bl=bk[i];

if(bj[bl]!==undefined&&([u,c,d].indexOf(qx.Bootstrap.getClass(bj[bl]))!=-1||bj[bl].classname!==undefined)){throw new Error('Invalid key "'+bl+'" in interface "'+name+'"! The value needs to be a map!');
}}if(bj.extend){for(var i=0,a=bj.extend,l=a.length;i<l;i++){if(a[i]==null){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is undefined/null!");
}
if(a[i].$$type!==t){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is not an interface!");
}}}if(bj.statics){for(var bl in bj.statics){if(bl.toUpperCase()!==bl){throw new Error('Invalid key "'+bl+'" in interface "'+name+'"! Static constants must be all uppercase.');
}
switch(typeof bj.statics[bl]){case g:case s:case r:break;
default:throw new Error('Invalid key "'+bl+'" in interface "'+name+'"! Static constants must be all of a primitive type.');
}}}};
}}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==a)?g:f],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;
}else if(j<0){j=Math.max(0,this.length+j);
}
for(var i=j;i<this.length;i++){if(this[i]===h){return i;
}}return -1;
}}[Array.prototype.indexOf?f:g],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(k,m){if(m==null){m=this.length-1;
}else if(m<0){m=Math.max(0,this.length+m);
}
for(var i=m;i>=0;i--){if(this[i]===k){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?f:g],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;

for(var i=0;i<l;i++){var p=this[i];

if(p!==undefined){n.call(o||window,p,i,this);
}}}}[Array.prototype.forEach?f:g],arrayFilter:{"native":Array.prototype.filter,"emulated":function(q,r){var s=[];
var l=this.length;

for(var i=0;i<l;i++){var t=this[i];

if(t!==undefined){if(q.call(r||window,t,i,this)){s.push(this[i]);
}}}return s;
}}[Array.prototype.filter?f:g],arrayMap:{"native":Array.prototype.map,"emulated":function(u,v){var w=[];
var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){w[i]=u.call(v||window,x,i,this);
}}return w;
}}[Array.prototype.map?f:g],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){if(y.call(z||window,A,i,this)){return true;
}}}return false;
}}[Array.prototype.some?f:g],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;
}}}return true;
}}[Array.prototype.every?f:g],stringQuote:{"native":String.prototype.quote,"emulated":function(){return e+this.replace(/\\/g,c).replace(/\"/g,b)+e;
}}[String.prototype.quote?f:g]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var m=';',k='return this.',j="boolean",h="string",g='!==undefined)',f='else if(this.',e='if(this.',d='else ',c=' of an instance of ',b=' is not (yet) ready!");',bi="init",bh='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bg='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bf=" of class ",be='qx.core.Assert.assertInstance(value, Date, msg) || true',bd='value !== null && value.nodeType !== undefined',bc='var inherit=prop.$$inherit;',bb='value !== null && value.nodeType === 9 && value.documentElement',ba='return init;',Y='value !== null && value.$$type === "Mixin"',t='qx.core.Assert.assertMap(value, msg) || true',u='var init=this.',r='return value;',s='qx.core.Assert.assertNumber(value, msg) || true',p='qx.core.Assert.assertPositiveInteger(value, msg) || true',q="': ",n="Error in property ",o='if(init==qx.core.Property.$$inherit)init=null;',x='qx.core.Assert.assertInteger(value, msg) || true',y="rv:1.8.1",G='value !== null && value.$$type === "Interface"',E="set",O='value !== null && value.$$type === "Theme"',J='qx.core.Assert.assertInstance(value, RegExp, msg) || true',U='value !== null && value.type !== undefined',S='value !== null && value.document',A=" in method ",X='qx.core.Assert.assertInstance(value, Error, msg) || true',W='throw new Error("Property ',V='qx.core.Assert.assertBoolean(value, msg) || true',z='return null;',C='qx.core.Assert.assertObject(value, msg) || true',D="setRuntime",F='value !== null && value.nodeType === 1 && value.attributes',H=" with incoming value '",K="setThemed",P='qx.core.Assert.assertString(value, msg) || true',T="inherit",v='value !== null && value.$$type === "Class"',w='qx.core.Assert.assertFunction(value, msg) || true',B='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',N='qx.core.Assert.assertArray(value, msg) || true',M='qx.core.Assert.assertPositiveNumber(value, msg) || true',L="object",R="MSIE 6.0",Q='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',I="qx.core.Property";
qx.Bootstrap.define(I,{statics:{__x:{"Boolean":V,"String":P,"Number":s,"Integer":x,"PositiveNumber":M,"PositiveInteger":p,"Error":X,"RegExp":J,"Object":C,"Array":N,"Map":t,"Function":w,"Date":be,"Node":bd,"Element":F,"Document":bb,"Window":S,"Event":U,"Class":v,"Mixin":Y,"Interface":G,"Theme":O,"Color":bh,"Decorator":B,"Font":bg},__y:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:T,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:h,dereference:j,inheritable:j,nullable:j,themeable:j,refine:j,init:null,apply:h,event:h,check:null,transform:h,deferredInit:j,validate:null},$$allowedGroupKeys:{name:h,group:L,mode:h,themeable:j},$$inheritable:{},__z:function(bj){var bk=this.__A(bj);

if(!bk.length){var bl=function(){};
}else{bl=this.__B(bk);
}bj.prototype.$$refreshInheritables=bl;
},__A:function(bm){var bo=[];

while(bm){var bn=bm.$$properties;

if(bn){for(var name in this.$$inheritable){if(bn[name]&&bn[name].inheritable){bo.push(name);
}}}bm=bm.superclass;
}return bo;
},__B:function(bp){var bt=this.$$store.inherit;
var bs=this.$$store.init;
var br=this.$$method.refresh;
var bq=["var parent = this.getLayoutParent();","if (!parent) return;"];

for(var i=0,l=bp.length;i<l;i++){var name=bp[i];
bq.push("var value = parent.",bt[name],";","if (value===undefined) value = parent.",bs[name],";","this.",br[name],"(value);");
}return new Function(bq.join(""));
},attachRefreshInheritables:function(bu){bu.prototype.$$refreshInheritables=function(){qx.core.Property.__z(bu);
return this.$$refreshInheritables();
};
},attachMethods:function(bv,name,bw){bw.group?this.__C(bv,bw,name):this.__D(bv,bw,name);
},__C:function(bx,by,name){var bF=qx.Bootstrap.firstUp(name);
var bE=bx.prototype;
var bG=by.themeable===true;
{if(qx.core.Environment.get("qx.propertyDebugLevel")>1){qx.Bootstrap.debug("Generating property group: "+name);
}};
var bH=[];
var bB=[];

if(bG){var bz=[];
var bD=[];
}var bC="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
bH.push(bC);

if(bG){bz.push(bC);
}
if(by.mode=="shorthand"){var bA="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
bH.push(bA);

if(bG){bz.push(bA);
}}
for(var i=0,a=by.group,l=a.length;i<l;i++){{if(!this.$$method.set[a[i]]||!this.$$method.reset[a[i]]){throw new Error("Cannot create property group '"+name+"' including non-existing property '"+a[i]+"'!");
}};
bH.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
bB.push("this.",this.$$method.reset[a[i]],"();");

if(bG){{if(!this.$$method.setThemed[a[i]]){throw new Error("Cannot add the non themable property '"+a[i]+"' to the themable property group '"+name+"'");
}};
bz.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
bD.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+bF;
bE[this.$$method.set[name]]=new Function(bH.join(""));
this.$$method.reset[name]="reset"+bF;
bE[this.$$method.reset[name]]=new Function(bB.join(""));

if(bG){this.$$method.setThemed[name]="setThemed"+bF;
bE[this.$$method.setThemed[name]]=new Function(bz.join(""));
this.$$method.resetThemed[name]="resetThemed"+bF;
bE[this.$$method.resetThemed[name]]=new Function(bD.join(""));
}},__D:function(bI,bJ,name){var bL=qx.Bootstrap.firstUp(name);
var bN=bI.prototype;
{if(qx.core.Environment.get("qx.propertyDebugLevel")>1){qx.Bootstrap.debug("Generating property wrappers: "+name);
}};
if(bJ.dereference===undefined&&typeof bJ.check==="string"){bJ.dereference=this.__E(bJ.check);
}var bM=this.$$method;
var bK=this.$$store;
bK.runtime[name]="$$runtime_"+name;
bK.user[name]="$$user_"+name;
bK.theme[name]="$$theme_"+name;
bK.init[name]="$$init_"+name;
bK.inherit[name]="$$inherit_"+name;
bK.useinit[name]="$$useinit_"+name;
bM.get[name]="get"+bL;
bN[bM.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,bI,name,"get");
};
bM.set[name]="set"+bL;
bN[bM.set[name]]=function(bO){return qx.core.Property.executeOptimizedSetter(this,bI,name,"set",arguments);
};
bM.reset[name]="reset"+bL;
bN[bM.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bI,name,"reset");
};

if(bJ.inheritable||bJ.apply||bJ.event||bJ.deferredInit){bM.init[name]="init"+bL;
bN[bM.init[name]]=function(bP){return qx.core.Property.executeOptimizedSetter(this,bI,name,"init",arguments);
};
}
if(bJ.inheritable){bM.refresh[name]="refresh"+bL;
bN[bM.refresh[name]]=function(bQ){return qx.core.Property.executeOptimizedSetter(this,bI,name,"refresh",arguments);
};
}bM.setRuntime[name]="setRuntime"+bL;
bN[bM.setRuntime[name]]=function(bR){return qx.core.Property.executeOptimizedSetter(this,bI,name,"setRuntime",arguments);
};
bM.resetRuntime[name]="resetRuntime"+bL;
bN[bM.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bI,name,"resetRuntime");
};

if(bJ.themeable){bM.setThemed[name]="setThemed"+bL;
bN[bM.setThemed[name]]=function(bS){return qx.core.Property.executeOptimizedSetter(this,bI,name,"setThemed",arguments);
};
bM.resetThemed[name]="resetThemed"+bL;
bN[bM.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,bI,name,"resetThemed");
};
}
if(bJ.check==="Boolean"){bN["toggle"+bL]=new Function("return this."+bM.set[name]+"(!this."+bM.get[name]+"())");
bN["is"+bL]=new Function("return this."+bM.get[name]+"()");
}},__E:function(bT){return !!this.__y[bT];
},__F:function(bU){return this.__y[bU]||qx.Bootstrap.classIsDefined(bU)||(qx.Interface&&qx.Interface.isDefined(bU));
},__G:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(bV,bW,bX,bY,ca){var cb=bV.constructor.classname;
var cc=n+bX+bf+cb+A+this.$$method[bY][bX]+H+ca+q;
throw new Error(cc+(this.__G[bW]||"Unknown reason: "+bW));
},__H:function(cd,ce,name,cf,cg,ch){var ci=this.$$method[cf][name];
{if(qx.core.Environment.get("qx.propertyDebugLevel")>1){qx.Bootstrap.debug("Code["+this.$$method[cf][name]+"]: "+cg.join(""));
}try{ce[ci]=new Function("value",cg.join(""));
}catch(cj){throw new Error("Malformed generated code to unwrap method: "+this.$$method[cf][name]+"\n"+cg.join(""));
}};
qx.Bootstrap.setDisplayName(ce[ci],cd.classname+".prototype",ci);
if(ch===undefined){return cd[ci]();
}else{return cd[ci].apply(cd,ch);
}},executeOptimizedGetter:function(ck,cl,name,cm){var co=cl.$$properties[name];
var cq=cl.prototype;
var cn=[];
var cp=this.$$store;
cn.push(e,cp.runtime[name],g);
cn.push(k,cp.runtime[name],m);

if(co.inheritable){cn.push(f,cp.inherit[name],g);
cn.push(k,cp.inherit[name],m);
cn.push(d);
}cn.push(e,cp.user[name],g);
cn.push(k,cp.user[name],m);

if(co.themeable){cn.push(f,cp.theme[name],g);
cn.push(k,cp.theme[name],m);
}
if(co.deferredInit&&co.init===undefined){cn.push(f,cp.init[name],g);
cn.push(k,cp.init[name],m);
}cn.push(d);

if(co.init!==undefined){if(co.inheritable){cn.push(u,cp.init[name],m);

if(co.nullable){cn.push(o);
}else if(co.init!==undefined){cn.push(k,cp.init[name],m);
}else{cn.push(Q,name,c,cl.classname,b);
}cn.push(ba);
}else{cn.push(k,cp.init[name],m);
}}else if(co.inheritable||co.nullable){cn.push(z);
}else{cn.push(W,name,c,cl.classname,b);
}return this.__H(ck,cq,name,cm,cn);
},executeOptimizedSetter:function(cr,cs,name,ct,cu){var cz=cs.$$properties[name];
var cy=cs.prototype;
var cw=[];
var cv=ct===E||ct===K||ct===D||(ct===bi&&cz.init===undefined);
var cx=cz.apply||cz.event||cz.inheritable;
var cA=this.__I(ct,name);
this.__J(cw,cz,name,ct,cv);

if(cv){this.__K(cw,cs,cz,name);
}
if(cx){this.__L(cw,cv,cA,ct);
}
if(cz.inheritable){cw.push(bc);
}{if(cv){this.__M(cw,cz,cs,name,ct);
}};

if(!cx){this.__N(cw,name,ct,cv);
}else{this.__O(cw,cz,name,ct,cv);
}
if(cz.inheritable){this.__P(cw,cz,name,ct);
}else if(cx){this.__Q(cw,cz,name,ct);
}
if(cx){this.__R(cw,cz,name);
if(cz.inheritable&&cy._getChildren){this.__S(cw,name);
}}if(cv){cw.push(r);
}return this.__H(cr,cy,name,ct,cw,cu);
},__I:function(cB,name){if(cB==="setRuntime"||cB==="resetRuntime"){var cC=this.$$store.runtime[name];
}else if(cB==="setThemed"||cB==="resetThemed"){cC=this.$$store.theme[name];
}else if(cB==="init"){cC=this.$$store.init[name];
}else{cC=this.$$store.user[name];
}return cC;
},__J:function(cD,cE,name,cF,cG){{cD.push('var prop=qx.core.Property;');

if(cF==="init"){cD.push('if(this.$$initialized)prop.error(this,0,"',name,'","',cF,'",value);');
}
if(cF==="refresh"){}else if(cG){cD.push('if(arguments.length!==1)prop.error(this,1,"',name,'","',cF,'",value);');
cD.push('if(value===undefined)prop.error(this,2,"',name,'","',cF,'",value);');
}else{cD.push('if(arguments.length!==0)prop.error(this,3,"',name,'","',cF,'",value);');
}};
},__K:function(cH,cI,cJ,name){if(cJ.transform){cH.push('value=this.',cJ.transform,'(value);');
}if(cJ.validate){if(typeof cJ.validate==="string"){cH.push('this.',cJ.validate,'(value);');
}else if(cJ.validate instanceof Function){cH.push(cI.classname,'.$$properties.',name);
cH.push('.validate.call(this, value);');
}}},__L:function(cK,cL,cM,cN){var cO=(cN==="reset"||cN==="resetThemed"||cN==="resetRuntime");

if(cL){cK.push('if(this.',cM,'===value)return value;');
}else if(cO){cK.push('if(this.',cM,'===undefined)return;');
}},__M:function(cP,cQ,cR,name,cS){if(!cQ.nullable){cP.push('if(value===null)prop.error(this,4,"',name,'","',cS,'",value);');
}if(cQ.check!==undefined){cP.push('var msg = "Invalid incoming value for property \''+name+'\' of class \''+cR.classname+'\'";');
if(cQ.nullable){cP.push('if(value!==null)');
}if(cQ.inheritable){cP.push('if(value!==inherit)');
}cP.push('if(');

if(this.__x[cQ.check]!==undefined){cP.push('!(',this.__x[cQ.check],')');
}else if(qx.Class.isDefined(cQ.check)){cP.push('qx.core.Assert.assertInstance(value, qx.Class.getByName("',cQ.check,'"), msg)');
}else if(qx.Interface&&qx.Interface.isDefined(cQ.check)){cP.push('qx.core.Assert.assertInterface(value, qx.Interface.getByName("',cQ.check,'"), msg)');
}else if(typeof cQ.check==="function"){cP.push('!',cR.classname,'.$$properties.',name);
cP.push('.check.call(this, value)');
}else if(typeof cQ.check==="string"){cP.push('!(',cQ.check,')');
}else if(cQ.check instanceof Array){cP.push('qx.core.Assert.assertInArray(value, ',cR.classname,'.$$properties.',name,'.check, msg)');
}else{throw new Error("Could not add check to property "+name+" of class "+cR.classname);
}cP.push(')prop.error(this,5,"',name,'","',cS,'",value);');
}},__N:function(cT,name,cU,cV){if(cU==="setRuntime"){cT.push('this.',this.$$store.runtime[name],'=value;');
}else if(cU==="resetRuntime"){cT.push('if(this.',this.$$store.runtime[name],'!==undefined)');
cT.push('delete this.',this.$$store.runtime[name],';');
}else if(cU==="set"){cT.push('this.',this.$$store.user[name],'=value;');
}else if(cU==="reset"){cT.push('if(this.',this.$$store.user[name],'!==undefined)');
cT.push('delete this.',this.$$store.user[name],';');
}else if(cU==="setThemed"){cT.push('this.',this.$$store.theme[name],'=value;');
}else if(cU==="resetThemed"){cT.push('if(this.',this.$$store.theme[name],'!==undefined)');
cT.push('delete this.',this.$$store.theme[name],';');
}else if(cU==="init"&&cV){cT.push('this.',this.$$store.init[name],'=value;');
}},__O:function(cW,cX,name,cY,da){if(cX.inheritable){cW.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{cW.push('var computed, old;');
}cW.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(cY==="setRuntime"){cW.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cY==="resetRuntime"){cW.push('delete this.',this.$$store.runtime[name],';');
cW.push('if(this.',this.$$store.user[name],'!==undefined)');
cW.push('computed=this.',this.$$store.user[name],';');
cW.push('else if(this.',this.$$store.theme[name],'!==undefined)');
cW.push('computed=this.',this.$$store.theme[name],';');
cW.push('else if(this.',this.$$store.init[name],'!==undefined){');
cW.push('computed=this.',this.$$store.init[name],';');
cW.push('this.',this.$$store.useinit[name],'=true;');
cW.push('}');
}else{cW.push('old=computed=this.',this.$$store.runtime[name],';');
if(cY==="set"){cW.push('this.',this.$$store.user[name],'=value;');
}else if(cY==="reset"){cW.push('delete this.',this.$$store.user[name],';');
}else if(cY==="setThemed"){cW.push('this.',this.$$store.theme[name],'=value;');
}else if(cY==="resetThemed"){cW.push('delete this.',this.$$store.theme[name],';');
}else if(cY==="init"&&da){cW.push('this.',this.$$store.init[name],'=value;');
}}cW.push('}');
cW.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(cY==="set"){if(!cX.inheritable){cW.push('old=this.',this.$$store.user[name],';');
}cW.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cY==="reset"){if(!cX.inheritable){cW.push('old=this.',this.$$store.user[name],';');
}cW.push('delete this.',this.$$store.user[name],';');
cW.push('if(this.',this.$$store.runtime[name],'!==undefined)');
cW.push('computed=this.',this.$$store.runtime[name],';');
cW.push('if(this.',this.$$store.theme[name],'!==undefined)');
cW.push('computed=this.',this.$$store.theme[name],';');
cW.push('else if(this.',this.$$store.init[name],'!==undefined){');
cW.push('computed=this.',this.$$store.init[name],';');
cW.push('this.',this.$$store.useinit[name],'=true;');
cW.push('}');
}else{if(cY==="setRuntime"){cW.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cX.inheritable){cW.push('computed=this.',this.$$store.user[name],';');
}else{cW.push('old=computed=this.',this.$$store.user[name],';');
}if(cY==="setThemed"){cW.push('this.',this.$$store.theme[name],'=value;');
}else if(cY==="resetThemed"){cW.push('delete this.',this.$$store.theme[name],';');
}else if(cY==="init"&&da){cW.push('this.',this.$$store.init[name],'=value;');
}}cW.push('}');
if(cX.themeable){cW.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!cX.inheritable){cW.push('old=this.',this.$$store.theme[name],';');
}
if(cY==="setRuntime"){cW.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cY==="set"){cW.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cY==="setThemed"){cW.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cY==="resetThemed"){cW.push('delete this.',this.$$store.theme[name],';');
cW.push('if(this.',this.$$store.init[name],'!==undefined){');
cW.push('computed=this.',this.$$store.init[name],';');
cW.push('this.',this.$$store.useinit[name],'=true;');
cW.push('}');
}else if(cY==="init"){if(da){cW.push('this.',this.$$store.init[name],'=value;');
}cW.push('computed=this.',this.$$store.theme[name],';');
}else if(cY==="refresh"){cW.push('computed=this.',this.$$store.theme[name],';');
}cW.push('}');
}cW.push('else if(this.',this.$$store.useinit[name],'){');

if(!cX.inheritable){cW.push('old=this.',this.$$store.init[name],';');
}
if(cY==="init"){if(da){cW.push('computed=this.',this.$$store.init[name],'=value;');
}else{cW.push('computed=this.',this.$$store.init[name],';');
}}else if(cY==="set"||cY==="setRuntime"||cY==="setThemed"||cY==="refresh"){cW.push('delete this.',this.$$store.useinit[name],';');

if(cY==="setRuntime"){cW.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cY==="set"){cW.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cY==="setThemed"){cW.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cY==="refresh"){cW.push('computed=this.',this.$$store.init[name],';');
}}cW.push('}');
if(cY==="set"||cY==="setRuntime"||cY==="setThemed"||cY==="init"){cW.push('else{');

if(cY==="setRuntime"){cW.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(cY==="set"){cW.push('computed=this.',this.$$store.user[name],'=value;');
}else if(cY==="setThemed"){cW.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(cY==="init"){if(da){cW.push('computed=this.',this.$$store.init[name],'=value;');
}else{cW.push('computed=this.',this.$$store.init[name],';');
}cW.push('this.',this.$$store.useinit[name],'=true;');
}cW.push('}');
}},__P:function(db,dc,name,dd){db.push('if(computed===undefined||computed===inherit){');

if(dd==="refresh"){db.push('computed=value;');
}else{db.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}db.push('if((computed===undefined||computed===inherit)&&');
db.push('this.',this.$$store.init[name],'!==undefined&&');
db.push('this.',this.$$store.init[name],'!==inherit){');
db.push('computed=this.',this.$$store.init[name],';');
db.push('this.',this.$$store.useinit[name],'=true;');
db.push('}else{');
db.push('delete this.',this.$$store.useinit[name],';}');
db.push('}');
db.push('if(old===computed)return value;');
db.push('if(computed===inherit){');
db.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
db.push('}');
db.push('else if(computed===undefined)');
db.push('delete this.',this.$$store.inherit[name],';');
db.push('else this.',this.$$store.inherit[name],'=computed;');
db.push('var backup=computed;');
if(dc.init!==undefined&&dd!=="init"){db.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{db.push('if(old===undefined)old=null;');
}db.push('if(computed===undefined||computed==inherit)computed=null;');
},__Q:function(de,df,name,dg){if(dg!=="set"&&dg!=="setRuntime"&&dg!=="setThemed"){de.push('if(computed===undefined)computed=null;');
}de.push('if(old===computed)return value;');
if(df.init!==undefined&&dg!=="init"){de.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{de.push('if(old===undefined)old=null;');
}},__R:function(dh,di,name){if(di.apply){dh.push('this.',di.apply,'(computed, old, "',name,'");');
}if(di.event){dh.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",di.event,"')){","reg.fireEvent(this, '",di.event,"', qx.event.type.Data, [computed, old]",")}");
}},__S:function(dj,name){dj.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
dj.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
dj.push('}');
}},defer:function(dk){var dm=navigator.userAgent.indexOf(R)!=-1;
var dl=navigator.userAgent.indexOf(y)!=-1;
if(dm||dl){dk.__E=dk.__F;
}}});
})();
(function(){var m=".",k="object",j="function",h="Array",g="static",f="abstract",e="singleton",d="_",c=".prototype",b="environment",A="extend",z="string",y="members",x="variants",w="properties",v="statics",u="events",t="]",s="Interface",r="qx.Class",p="Mixin",q="settings",n='Assumed static class because no "extend" key was found. ',o="[Class ";
qx.Bootstrap.define(r,{statics:{define:function(name,B){if(!B){var B={};
}if(B.include&&!(qx.Bootstrap.getClass(B.include)===h)){B.include=[B.include];
}if(B.implement&&!(qx.Bootstrap.getClass(B.implement)===h)){B.implement=[B.implement];
}var C=false;

if(!B.hasOwnProperty(A)&&!B.type){B.type=g;
C=true;
}{try{this.__q(name,B);
}catch(F){if(C){F.message=n+F.message;
}throw F;
}};
var D=this.__V(name,B.type,B.extend,B.statics,B.construct,B.destruct,B.include);
if(B.extend){if(B.properties){this.__X(D,B.properties,true);
}if(B.members){this.__ba(D,B.members,true,true,false);
}if(B.events){this.__W(D,B.events,true);
}if(B.include){for(var i=0,l=B.include.length;i<l;i++){this.__be(D,B.include[i],false);
}}}if(B.environment){for(var E in B.environment){qx.core.Environment.add(E,B.environment[E]);
}}if(B.implement){for(var i=0,l=B.implement.length;i<l;i++){this.__bc(D,B.implement[i]);
}}{this.__U(D);
};
if(B.defer){B.defer.self=D;
B.defer(D,D.prototype,{add:function(name,G){var H={};
H[name]=G;
qx.Class.__X(D,H,true);
}});
}return D;
},undefine:function(name){delete this.$$registry[name];
var I=name.split(m);
var K=[window];

for(var i=0;i<I.length;i++){K.push(K[i][I[i]]);
}for(var i=K.length-1;i>=1;i--){var J=K[i];
var parent=K[i-1];

if(qx.Bootstrap.isFunction(J)||qx.Bootstrap.objectGetLength(J)===0){delete parent[I[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(L,M){{if(!M){throw new Error("The mixin to include into class '"+L.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(M,L);
};
qx.Class.__be(L,M,false);
},patch:function(N,O){{if(!O){throw new Error("The mixin to patch class '"+N.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(O,N);
};
qx.Class.__be(N,O,true);
},isSubClassOf:function(P,Q){if(!P){return false;
}
if(P==Q){return true;
}
if(P.prototype instanceof Q){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(R){var S=[];

while(R){if(R.$$properties){S.push.apply(S,qx.Bootstrap.getKeys(R.$$properties));
}R=R.superclass;
}return S;
},getByProperty:function(T,name){while(T){if(T.$$properties&&T.$$properties[name]){return T;
}T=T.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(U,V){return U.$$includes&&U.$$includes.indexOf(V)!==-1;
},getByMixin:function(W,X){var Y,i,l;

while(W){if(W.$$includes){Y=W.$$flatIncludes;

for(i=0,l=Y.length;i<l;i++){if(Y[i]===X){return W;
}}}W=W.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(ba,bb){return !!this.getByMixin(ba,bb);
},hasOwnInterface:function(bc,bd){return bc.$$implements&&bc.$$implements.indexOf(bd)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(be){var bf=[];

while(be){if(be.$$implements){bf.push.apply(bf,be.$$flatImplements);
}be=be.superclass;
}return bf;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(bg,bh){var bi=bg.constructor;

if(this.hasInterface(bi,bh)){return true;
}
try{qx.Interface.assertObject(bg,bh);
return true;
}catch(bj){}
try{qx.Interface.assert(bi,bh,false);
return true;
}catch(bk){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return o+this.classname+t;
},$$registry:qx.Bootstrap.$$registry,__p:{"type":z,"extend":j,"implement":k,"include":k,"construct":j,"statics":k,"properties":k,"members":k,"environment":k,"events":k,"defer":j,"destruct":j},__T:{"type":"string","statics":"object","environment":"object","defer":"function"},__q:function(name,bl){if(bl.type&&!(bl.type===g||bl.type===f||bl.type===e)){throw new Error('Invalid type "'+bl.type+'" definition for class "'+name+'"!');
}if(bl.type&&bl.type!==g&&!bl.extend){throw new Error('Invalid config in class "'+name+'"! Every non-static class has to extend at least the "qx.core.Object" class.');
}var bo=bl.type===g?this.__T:this.__p;

for(var bn in bl){if(!bo[bn]){throw new Error('The configuration key "'+bn+'" in class "'+name+'" is not allowed!');
}
if(bl[bn]==null){throw new Error('Invalid key "'+bn+'" in class "'+name+'"! The value is undefined/null!');
}
if(typeof bl[bn]!==bo[bn]){throw new Error('Invalid type of key "'+bn+'" in class "'+name+'"! The type of the key must be "'+bo[bn]+'"!');
}}var bm=[v,w,y,b,q,x,u];

for(var i=0,l=bm.length;i<l;i++){var bn=bm[i];

if(bl[bn]!==undefined&&(bl[bn].$$hash!==undefined||!qx.Bootstrap.isObject(bl[bn]))){throw new Error('Invalid key "'+bn+'" in class "'+name+'"! The value needs to be a map!');
}}if(bl.include){if(qx.Bootstrap.getClass(bl.include)===h){for(var i=0,a=bl.include,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!==p){throw new Error('The include definition in class "'+name+'" contains an invalid mixin at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid include definition in class "'+name+'"! Only mixins and arrays of mixins are allowed!');
}}if(bl.implement){if(qx.Bootstrap.getClass(bl.implement)===h){for(var i=0,a=bl.implement,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!==s){throw new Error('The implement definition in class "'+name+'" contains an invalid interface at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid implement definition in class "'+name+'"! Only interfaces and arrays of interfaces are allowed!');
}}if(bl.include){try{qx.Mixin.checkCompatibility(bl.include);
}catch(bp){throw new Error('Error in include definition of class "'+name+'"! '+bp.message);
}}if(bl.environment){for(var bn in bl.environment){if(bn.substr(0,bn.indexOf(m))!=name.substr(0,name.indexOf(m))){throw new Error('Forbidden environment setting "'+bn+'" found in "'+name+'". It is forbidden to define a '+'environment setting for an external namespace!');
}}}if(bl.settings){for(var bn in bl.settings){if(bn.substr(0,bn.indexOf(m))!=name.substr(0,name.indexOf(m))){throw new Error('Forbidden setting "'+bn+'" found in "'+name+'". It is forbidden to define a default setting for an external namespace!');
}}}if(bl.variants){for(var bn in bl.variants){if(bn.substr(0,bn.indexOf(m))!=name.substr(0,name.indexOf(m))){throw new Error('Forbidden variant "'+bn+'" found in "'+name+'". It is forbidden to define a variant for an external namespace!');
}}}},__U:function(bq){var bs=bq.superclass;

while(bs){if(bs.$$classtype!=="abstract"){break;
}var br=bs.$$implements;

if(br){for(var i=0;i<br.length;i++){qx.Interface.assert(bq,br[i],true);
}}bs=bs.superclass;
}},__V:function(name,bt,bu,bv,bw,bx,by){var bB;

if(!bu&&true){bB=bv||{};
qx.Bootstrap.setDisplayNames(bB,name);
}else{var bB={};

if(bu){if(!bw){bw=this.__bf();
}
if(this.__bh(bu,by)){bB=this.__bi(bw,name,bt);
}else{bB=bw;
}if(bt==="singleton"){bB.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(bw,name,"constructor");
}if(bv){qx.Bootstrap.setDisplayNames(bv,name);
var bC;

for(var i=0,a=qx.Bootstrap.getKeys(bv),l=a.length;i<l;i++){bC=a[i];
var bz=bv[bC];
{bB[bC]=bz;
};
}}}var bA=qx.Bootstrap.createNamespace(name,bB);
bB.name=bB.classname=name;
bB.basename=bA;
bB.$$type="Class";

if(bt){bB.$$classtype=bt;
}if(!bB.hasOwnProperty("toString")){bB.toString=this.genericToString;
}
if(bu){qx.Bootstrap.extendClass(bB,bw,bu,name,bA);
if(bx){bB.$$destructor=bx;
qx.Bootstrap.setDisplayName(bx,name,"destruct");
}}this.$$registry[name]=bB;
return bB;
},__W:function(bD,bE,bF){{if(typeof bE!=="object"||qx.Bootstrap.getClass(bE)==="Array"){throw new Error(bD.classname+": the events must be defined as map!");
}
for(var bG in bE){if(typeof bE[bG]!=="string"){throw new Error(bD.classname+"/"+bG+": the event value needs to be a string with the class name of the event object which will be fired.");
}}if(bD.$$events&&bF!==true){for(var bG in bE){if(bD.$$events[bG]!==undefined&&bD.$$events[bG]!==bE[bG]){throw new Error(bD.classname+"/"+bG+": the event value/type cannot be changed from "+bD.$$events[bG]+" to "+bE[bG]);
}}}};

if(bD.$$events){for(var bG in bE){bD.$$events[bG]=bE[bG];
}}else{bD.$$events=bE;
}},__X:function(bH,bI,bJ){var bK;

if(bJ===undefined){bJ=false;
}var bL=bH.prototype;

for(var name in bI){bK=bI[name];
{this.__Y(bH,name,bK,bJ);
};
bK.name=name;
if(!bK.refine){if(bH.$$properties===undefined){bH.$$properties={};
}bH.$$properties[name]=bK;
}if(bK.init!==undefined){bH.prototype["$$init_"+name]=bK.init;
}if(bK.event!==undefined){var event={};
event[bK.event]="qx.event.type.Data";
this.__W(bH,event,bJ);
}if(bK.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!bL.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(bH);
}}
if(!bK.refine){qx.core.Property.attachMethods(bH,name,bK);
}}},__Y:function(bM,name,bN,bO){var bQ=this.hasProperty(bM,name);

if(bQ){var bP=this.getPropertyDefinition(bM,name);

if(bN.refine&&bP.init===undefined){throw new Error("Could not refine an init value if there was previously no init value defined. Property '"+name+"' of class '"+bM.classname+"'.");
}}
if(!bQ&&bN.refine){throw new Error("Could not refine non-existent property: '"+name+"' of class: '"+bM.classname+"'!");
}
if(bQ&&!bO){throw new Error("Class "+bM.classname+" already has a property: "+name+"!");
}
if(bQ&&bO){if(!bN.refine){throw new Error('Could not refine property "'+name+'" without a "refine" flag in the property definition! This class: '+bM.classname+', original class: '+this.getByProperty(bM,name).classname+'.');
}
for(var bR in bN){if(bR!=="init"&&bR!=="refine"){throw new Error("Class "+bM.classname+" could not refine property: "+name+"! Key: "+bR+" could not be refined!");
}}}var bS=bN.group?qx.core.Property.$$allowedGroupKeys:qx.core.Property.$$allowedKeys;

for(var bR in bN){if(bS[bR]===undefined){throw new Error('The configuration key "'+bR+'" of property "'+name+'" in class "'+bM.classname+'" is not allowed!');
}
if(bN[bR]===undefined){throw new Error('Invalid key "'+bR+'" of property "'+name+'" in class "'+bM.classname+'"! The value is undefined: '+bN[bR]);
}
if(bS[bR]!==null&&typeof bN[bR]!==bS[bR]){throw new Error('Invalid type of key "'+bR+'" of property "'+name+'" in class "'+bM.classname+'"! The type of the key must be "'+bS[bR]+'"!');
}}
if(bN.transform!=null){if(!(typeof bN.transform=="string")){throw new Error('Invalid transform definition of property "'+name+'" in class "'+bM.classname+'"! Needs to be a String.');
}}
if(bN.check!=null){if(!qx.Bootstrap.isString(bN.check)&&!qx.Bootstrap.isArray(bN.check)&&!qx.Bootstrap.isFunction(bN.check)){throw new Error('Invalid check definition of property "'+name+'" in class "'+bM.classname+'"! Needs to be a String, Array or Function.');
}}},__ba:function(bT,bU,bV,bW,bX){var bY=bT.prototype;
var cb,ca;
qx.Bootstrap.setDisplayNames(bU,bT.classname+c);

for(var i=0,a=qx.Bootstrap.getKeys(bU),l=a.length;i<l;i++){cb=a[i];
ca=bU[cb];
{if(bY[cb]!==undefined&&cb.charAt(0)==d&&cb.charAt(1)==d){throw new Error('Overwriting private member "'+cb+'" of Class "'+bT.classname+'" is not allowed!');
}
if(bV!==true&&bY.hasOwnProperty(cb)){throw new Error('Overwriting member "'+cb+'" of Class "'+bT.classname+'" is not allowed!');
}};
if(bW!==false&&ca instanceof Function&&ca.$$type==null){if(bX==true){ca=this.__bb(ca,bY[cb]);
}else{if(bY[cb]){ca.base=bY[cb];
}ca.self=bT;
}}bY[cb]=ca;
}},__bb:function(cc,cd){if(cd){return function(){var cf=cc.base;
cc.base=cd;
var ce=cc.apply(this,arguments);
cc.base=cf;
return ce;
};
}else{return cc;
}},__bc:function(cg,ch){{if(!cg||!ch){throw new Error("Incomplete parameters!");
}if(this.hasOwnInterface(cg,ch)){throw new Error('Interface "'+ch.name+'" is already used by Class "'+cg.classname+'!');
}if(cg.$$classtype!==f){qx.Interface.assert(cg,ch,true);
}};
var ci=qx.Interface.flatten([ch]);

if(cg.$$implements){cg.$$implements.push(ch);
cg.$$flatImplements.push.apply(cg.$$flatImplements,ci);
}else{cg.$$implements=[ch];
cg.$$flatImplements=ci;
}},__bd:function(cj){var name=cj.classname;
var ck=this.__bi(cj,name,cj.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(cj),l=a.length;i<l;i++){cl=a[i];
ck[cl]=cj[cl];
}ck.prototype=cj.prototype;
var cn=cj.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(cn),l=a.length;i<l;i++){cl=a[i];
var co=cn[cl];
if(co&&co.self==cj){co.self=ck;
}}for(var cl in this.$$registry){var cm=this.$$registry[cl];

if(!cm){continue;
}
if(cm.base==cj){cm.base=ck;
}
if(cm.superclass==cj){cm.superclass=ck;
}
if(cm.$$original){if(cm.$$original.base==cj){cm.$$original.base=ck;
}
if(cm.$$original.superclass==cj){cm.$$original.superclass=ck;
}}}qx.Bootstrap.createNamespace(name,ck);
this.$$registry[name]=ck;
return ck;
},__be:function(cp,cq,cr){{if(!cp||!cq){throw new Error("Incomplete parameters!");
}};

if(this.hasMixin(cp,cq)){return;
}var cu=cp.$$original;

if(cq.$$constructor&&!cu){cp=this.__bd(cp);
}var ct=qx.Mixin.flatten([cq]);
var cs;

for(var i=0,l=ct.length;i<l;i++){cs=ct[i];
if(cs.$$events){this.__W(cp,cs.$$events,cr);
}if(cs.$$properties){this.__X(cp,cs.$$properties,cr);
}if(cs.$$members){this.__ba(cp,cs.$$members,cr,cr,cr);
}}if(cp.$$includes){cp.$$includes.push(cq);
cp.$$flatIncludes.push.apply(cp.$$flatIncludes,ct);
}else{cp.$$includes=[cq];
cp.$$flatIncludes=ct;
}},__bf:function(){function cv(){cv.base.apply(this,arguments);
}return cv;
},__bg:function(){return function(){};
},__bh:function(cw,cx){{return true;
};
if(cw&&cw.$$includes){var cy=cw.$$flatIncludes;

for(var i=0,l=cy.length;i<l;i++){if(cy[i].$$constructor){return true;
}}}if(cx){var cz=qx.Mixin.flatten(cx);

for(var i=0,l=cz.length;i<l;i++){if(cz[i].$$constructor){return true;
}}}return false;
},__bi:function(cA,name,cB){var cC;
var cD=function(){var cG=cD;
{if(!(this instanceof cG)){throw new Error("Please initialize '"+name+"' objects using the new keyword!");
}if(cB===f){if(this.classname===name){throw new Error("The class ',"+name+"' is abstract! It is not possible to instantiate it.");
}}else if(cB===e){if(!cG.$$allowconstruct){throw new Error("The class '"+name+"' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.");
}}};
var cF=cG.$$original.apply(this,arguments);
if(cG.$$includes){var cE=cG.$$flatIncludes;

for(var i=0,l=cE.length;i<l;i++){if(cE[i].$$constructor){cE[i].$$constructor.apply(this,arguments);
}}}{if(this.classname===name){this.$$initialized=true;
}};
return cF;
};
cD.$$original=cA;
cA.wrapper=cD;
return cD;
}},defer:function(){var cH,cI,cJ;
}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__w:[],wrap:function(e,f,g){var m=[];
var h=[];
var l=this.__w;
var k;

for(var i=0;i<l.length;i++){k=l[i];

if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);
}}
if(m.length===0&&h.length===0){return f;
}var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);
}var n=f.apply(this,arguments);

for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);
}return n;
};

if(g!==a){j.self=f.self;
j.base=f.base;
}f.wrapper=j;
j.original=f;
return j;
},addAdvice:function(o,p,q,name){this.__w.push({fcn:o,pos:p===c?-1:1,type:q,name:name});
}}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__bj:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__bk:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));
};
},__bl:function(){var L=qx.lang.Generics.__bj;

for(var P in L){var N=window[P];
var M=L[P];

for(var i=0,l=M.length;i<l;i++){var O=M[i];

if(!N[O]){N[O]=qx.lang.Generics.__bk(N,O);
}}}}},defer:function(Q){Q.__bl();
}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(d){},setItem:function(e,f){},splice:function(g,h,i){},contains:function(j){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var m="get",l="",k="[",h=".",g="last",f="change",d="]",c="Number",b="String",a="qx.debug.databinding",I="set",H="deepBinding",G="item",F="reset",E="' (",D="Boolean",C=") to the object '",B="Integer",A=" of object ",z="qx.event.type.Data",u="qx.data.SingleValueBinding",v="Binding property ",s="Can not remove the bindings for null object!",t="Binding from '",q="PositiveNumber",r="PositiveInteger",n="Binding does not exist!",p=" is not an data (qx.event.type.Data) event on ",w=").",x="Date",y=" not possible: No event available. ";
qx.Class.define(u,{statics:{__bm:{},bind:function(J,K,L,M,N){var Y=this.__bo(J,K,L,M,N);
var T=K.split(h);
var P=this.__bu(T);
var X=[];
var U=[];
var V=[];
var R=[];
var S=J;
try{for(var i=0;i<T.length;i++){if(P[i]!==l){R.push(f);
}else{R.push(this.__bp(S,T[i]));
}X[i]=S;
if(i==T.length-1){if(P[i]!==l){var bd=P[i]===g?S.length-1:P[i];
var O=S.getItem(bd);
this.__bt(O,L,M,N,J);
V[i]=this.__bv(S,R[i],L,M,N,P[i]);
}else{if(T[i]!=null&&S[m+qx.lang.String.firstUp(T[i])]!=null){var O=S[m+qx.lang.String.firstUp(T[i])]();
this.__bt(O,L,M,N,J);
}V[i]=this.__bv(S,R[i],L,M,N);
}}else{var ba={index:i,propertyNames:T,sources:X,listenerIds:V,arrayIndexValues:P,targetObject:L,targetPropertyChain:M,options:N,listeners:U};
var W=qx.lang.Function.bind(this.__bn,this,ba);
U.push(W);
V[i]=S.addListener(R[i],W);
}if(S[m+qx.lang.String.firstUp(T[i])]==null){S=null;
}else if(P[i]!==l){S=S[m+qx.lang.String.firstUp(T[i])](P[i]);
}else{S=S[m+qx.lang.String.firstUp(T[i])]();
}
if(!S){break;
}}}catch(be){for(var i=0;i<X.length;i++){if(X[i]&&V[i]){X[i].removeListenerById(V[i]);
}}var bc=Y.targets;
var Q=Y.listenerIds[i];
for(var i=0;i<bc.length;i++){if(bc[i]&&Q[i]){bc[i].removeListenerById(Q[i]);
}}throw be;
}var bb={type:H,listenerIds:V,sources:X,targetListenerIds:Y.listenerIds,targets:Y.targets};
this.__bw(bb,J,K,L,M);
return bb;
},__bn:function(bf){if(bf.options&&bf.options.onUpdate){bf.options.onUpdate(bf.sources[bf.index],bf.targetObject);
}for(var j=bf.index+1;j<bf.propertyNames.length;j++){var bj=bf.sources[j];
bf.sources[j]=null;

if(!bj){continue;
}bj.removeListenerById(bf.listenerIds[j]);
}var bj=bf.sources[bf.index];
for(var j=bf.index+1;j<bf.propertyNames.length;j++){if(bf.arrayIndexValues[j-1]!==l){bj=bj[m+qx.lang.String.firstUp(bf.propertyNames[j-1])](bf.arrayIndexValues[j-1]);
}else{bj=bj[m+qx.lang.String.firstUp(bf.propertyNames[j-1])]();
}bf.sources[j]=bj;
if(!bj){this.__bq(bf.targetObject,bf.targetPropertyChain);
break;
}if(j==bf.propertyNames.length-1){if(qx.Class.implementsInterface(bj,qx.data.IListData)){var bk=bf.arrayIndexValues[j]===g?bj.length-1:bf.arrayIndexValues[j];
var bh=bj.getItem(bk);
this.__bt(bh,bf.targetObject,bf.targetPropertyChain,bf.options,bf.sources[bf.index]);
bf.listenerIds[j]=this.__bv(bj,f,bf.targetObject,bf.targetPropertyChain,bf.options,bf.arrayIndexValues[j]);
}else{if(bf.propertyNames[j]!=null&&bj[m+qx.lang.String.firstUp(bf.propertyNames[j])]!=null){var bh=bj[m+qx.lang.String.firstUp(bf.propertyNames[j])]();
this.__bt(bh,bf.targetObject,bf.targetPropertyChain,bf.options,bf.sources[bf.index]);
}var bi=this.__bp(bj,bf.propertyNames[j]);
bf.listenerIds[j]=this.__bv(bj,bi,bf.targetObject,bf.targetPropertyChain,bf.options);
}}else{if(bf.listeners[j]==null){var bg=qx.lang.Function.bind(this.__bn,this,bf);
bf.listeners.push(bg);
}if(qx.Class.implementsInterface(bj,qx.data.IListData)){var bi=f;
}else{var bi=this.__bp(bj,bf.propertyNames[j]);
}bf.listenerIds[j]=bj.addListener(bi,bf.listeners[j]);
}}},__bo:function(bl,bm,bn,bo,bp){var bt=bo.split(h);
var br=this.__bu(bt);
var by=[];
var bx=[];
var bv=[];
var bu=[];
var bs=bn;
for(var i=0;i<bt.length-1;i++){if(br[i]!==l){bu.push(f);
}else{try{bu.push(this.__bp(bs,bt[i]));
}catch(e){break;
}}by[i]=bs;
var bw=function(){for(var j=i+1;j<bt.length-1;j++){var bB=by[j];
by[j]=null;

if(!bB){continue;
}bB.removeListenerById(bv[j]);
}var bB=by[i];
for(var j=i+1;j<bt.length-1;j++){var bz=qx.lang.String.firstUp(bt[j-1]);
if(br[j-1]!==l){var bC=br[j-1]===g?bB.getLength()-1:br[j-1];
bB=bB[m+bz](bC);
}else{bB=bB[m+bz]();
}by[j]=bB;
if(bx[j]==null){bx.push(bw);
}if(qx.Class.implementsInterface(bB,qx.data.IListData)){var bA=f;
}else{try{var bA=qx.data.SingleValueBinding.__bp(bB,bt[j]);
}catch(e){break;
}}bv[j]=bB.addListener(bA,bx[j]);
}qx.data.SingleValueBinding.updateTarget(bl,bm,bn,bo,bp);
};
bx.push(bw);
bv[i]=bs.addListener(bu[i],bw);
var bq=qx.lang.String.firstUp(bt[i]);
if(bs[m+bq]==null){bs=null;
}else if(br[i]!==l){bs=bs[m+bq](br[i]);
}else{bs=bs[m+bq]();
}
if(!bs){break;
}}return {listenerIds:bv,targets:by};
},updateTarget:function(bD,bE,bF,bG,bH){var bI=this.getValueFromObject(bD,bE);
bI=qx.data.SingleValueBinding.__bx(bI,bF,bG,bH,bD);
this.__br(bF,bG,bI);
},getValueFromObject:function(o,bJ){var bN=this.__bs(o,bJ);
var bL;

if(bN!=null){var bP=bJ.substring(bJ.lastIndexOf(h)+1,bJ.length);
if(bP.charAt(bP.length-1)==d){var bK=bP.substring(bP.lastIndexOf(k)+1,bP.length-1);
var bM=bP.substring(0,bP.lastIndexOf(k));
var bO=bN[m+qx.lang.String.firstUp(bM)]();

if(bK==g){bK=bO.length-1;
}
if(bO!=null){bL=bO.getItem(bK);
}}else{bL=bN[m+qx.lang.String.firstUp(bP)]();
}}return bL;
},__bp:function(bQ,bR){var bS=this.__by(bQ,bR);
if(bS==null){if(qx.Class.supportsEvent(bQ.constructor,bR)){bS=bR;
}else if(qx.Class.supportsEvent(bQ.constructor,f+qx.lang.String.firstUp(bR))){bS=f+qx.lang.String.firstUp(bR);
}else{throw new qx.core.AssertionError(v+bR+A+bQ+y);
}}return bS;
},__bq:function(bT,bU){var bV=this.__bs(bT,bU);

if(bV!=null){var bW=bU.substring(bU.lastIndexOf(h)+1,bU.length);
if(bW.charAt(bW.length-1)==d){this.__br(bT,bU,null);
return;
}if(bV[F+qx.lang.String.firstUp(bW)]!=undefined){bV[F+qx.lang.String.firstUp(bW)]();
}else{bV[I+qx.lang.String.firstUp(bW)](null);
}}},__br:function(bX,bY,ca){var ce=this.__bs(bX,bY);

if(ce!=null){var cf=bY.substring(bY.lastIndexOf(h)+1,bY.length);
if(cf.charAt(cf.length-1)==d){var cb=cf.substring(cf.lastIndexOf(k)+1,cf.length-1);
var cd=cf.substring(0,cf.lastIndexOf(k));
var cc=bX;

if(!qx.Class.implementsInterface(cc,qx.data.IListData)){cc=ce[m+qx.lang.String.firstUp(cd)]();
}
if(cb==g){cb=cc.length-1;
}
if(cc!=null){cc.setItem(cb,ca);
}}else{ce[I+qx.lang.String.firstUp(cf)](ca);
}}},__bs:function(cg,ch){var ck=ch.split(h);
var cl=cg;
for(var i=0;i<ck.length-1;i++){try{var cj=ck[i];
if(cj.indexOf(d)==cj.length-1){var ci=cj.substring(cj.indexOf(k)+1,cj.length-1);
cj=cj.substring(0,cj.indexOf(k));
}if(cj!=l){cl=cl[m+qx.lang.String.firstUp(cj)]();
}if(ci!=null){if(ci==g){ci=cl.length-1;
}cl=cl.getItem(ci);
ci=null;
}}catch(cm){return null;
}}return cl;
},__bt:function(cn,co,cp,cq,cr){cn=this.__bx(cn,co,cp,cq,cr);
if(cn===undefined){this.__bq(co,cp);
}if(cn!==undefined){try{this.__br(co,cp,cn);
if(cq&&cq.onUpdate){cq.onUpdate(cr,co,cn);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cq&&cq.onSetFail){cq.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cn+" on "+co+". Error message: "+e);
}}}},__bu:function(cs){var ct=[];
for(var i=0;i<cs.length;i++){var name=cs[i];
if(qx.lang.String.endsWith(name,d)){var cu=name.substring(name.indexOf(k)+1,name.indexOf(d));
if(name.indexOf(d)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cu!==g){if(cu==l||isNaN(parseInt(cu,10))){throw new Error("No number or 'last' value hast been given"+" in an array binding: "+name+" does not work.");
}}if(name.indexOf(k)!=0){cs[i]=name.substring(0,name.indexOf(k));
ct[i]=l;
ct[i+1]=cu;
cs.splice(i+1,0,G);
i++;
}else{ct[i]=cu;
cs.splice(i,1,G);
}}else{ct[i]=l;
}}return ct;
},__bv:function(cv,cw,cx,cy,cz,cA){{var cB=qx.Class.getEventType(cv.constructor,cw);
qx.core.Assert.assertEquals(z,cB,cw+p+cv+h);
};
var cD=function(cE,e){if(cE!==l){if(cE===g){cE=cv.length-1;
}var cH=cv.getItem(cE);
if(cH===undefined){qx.data.SingleValueBinding.__bq(cx,cy);
}var cF=e.getData().start;
var cG=e.getData().end;

if(cE<cF||cE>cG){return;
}}else{var cH=e.getData();
}if(qx.core.Environment.get(a)){qx.log.Logger.debug("Binding executed from "+cv+" by "+cw+" to "+cx+" ("+cy+")");
qx.log.Logger.debug("Data before conversion: "+cH);
}cH=qx.data.SingleValueBinding.__bx(cH,cx,cy,cz,cv);
if(qx.core.Environment.get(a)){qx.log.Logger.debug("Data after conversion: "+cH);
}try{if(cH!==undefined){qx.data.SingleValueBinding.__br(cx,cy,cH);
}else{qx.data.SingleValueBinding.__bq(cx,cy);
}if(cz&&cz.onUpdate){cz.onUpdate(cv,cx,cH);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cz&&cz.onSetFail){cz.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cH+" on "+cx+". Error message: "+e);
}}};
if(!cA){cA=l;
}cD=qx.lang.Function.bind(cD,cv,cA);
var cC=cv.addListener(cw,cD);
return cC;
},__bw:function(cI,cJ,cK,cL,cM){if(this.__bm[cJ.toHashCode()]===undefined){this.__bm[cJ.toHashCode()]=[];
}this.__bm[cJ.toHashCode()].push([cI,cJ,cK,cL,cM]);
},__bx:function(cN,cO,cP,cQ,cR){if(cQ&&cQ.converter){var cT;

if(cO.getModel){cT=cO.getModel();
}return cQ.converter(cN,cT,cR,cO);
}else{var cV=this.__bs(cO,cP);
var cW=cP.substring(cP.lastIndexOf(h)+1,cP.length);
if(cV==null){return cN;
}var cU=qx.Class.getPropertyDefinition(cV.constructor,cW);
var cS=cU==null?l:cU.check;
return this.__bz(cN,cS);
}},__by:function(cX,cY){var da=qx.Class.getPropertyDefinition(cX.constructor,cY);

if(da==null){return null;
}return da.event;
},__bz:function(db,dc){var dd=qx.lang.Type.getClass(db);
if((dd==c||dd==b)&&(dc==B||dc==r)){db=parseInt(db,10);
}if((dd==D||dd==c||dd==x)&&dc==b){db=db+l;
}if((dd==c||dd==b)&&(dc==c||dc==q)){db=parseFloat(db);
}return db;
},removeBindingFromObject:function(de,df){if(df.type==H){for(var i=0;i<df.sources.length;i++){if(df.sources[i]){df.sources[i].removeListenerById(df.listenerIds[i]);
}}for(var i=0;i<df.targets.length;i++){if(df.targets[i]){df.targets[i].removeListenerById(df.targetListenerIds[i]);
}}}else{de.removeListenerById(df);
}var dg=this.__bm[de.toHashCode()];
if(dg!=undefined){for(var i=0;i<dg.length;i++){if(dg[i][0]==df){qx.lang.Array.remove(dg,dg[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(dh){{qx.core.Assert.assertNotNull(dh,s);
};
var di=this.__bm[dh.toHashCode()];

if(di!=undefined){for(var i=di.length-1;i>=0;i--){this.removeBindingFromObject(dh,di[i][0]);
}}},getAllBindingsForObject:function(dj){if(this.__bm[dj.toHashCode()]===undefined){this.__bm[dj.toHashCode()]=[];
}return this.__bm[dj.toHashCode()];
},removeAllBindings:function(){for(var dl in this.__bm){var dk=qx.core.ObjectRegistry.fromHashCode(dl);
if(dk==null){delete this.__bm[dl];
continue;
}this.removeAllBindingsForObject(dk);
}this.__bm={};
},getAllBindings:function(){return this.__bm;
},showBindingInLog:function(dm,dn){var dq;
for(var i=0;i<this.__bm[dm.toHashCode()].length;i++){if(this.__bm[dm.toHashCode()][i][0]==dn){dq=this.__bm[dm.toHashCode()][i];
break;
}}
if(dq===undefined){var dp=n;
}else{var dp=t+dq[1]+E+dq[2]+C+dq[3]+E+dq[4]+w;
}qx.log.Logger.debug(dp);
},showAllBindingsInLog:function(){for(var ds in this.__bm){var dr=qx.core.ObjectRegistry.fromHashCode(ds);

for(var i=0;i<this.__bm[ds].length;i++){this.showBindingInLog(dr,this.__bm[ds][i][0]);
}}}}});
})();
(function(){var p="",o="g",n="]",m='\\u',l="undefined",k='\\$1',j="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",h='-',g="qx.lang.String",f="(^|[^",c="0",e="%",d=' ',b='\n',a="])[";
qx.Class.define(g,{statics:{__bA:j,__bB:null,__bC:{},camelCase:function(q){var r=this.__bC[q];

if(!r){r=q.replace(/\-([a-z])/g,function(s,t){return t.toUpperCase();
});
}return r;
},hyphenate:function(u){var v=this.__bC[u];

if(!v){v=u.replace(/[A-Z]/g,function(w){return (h+w.charAt(0).toLowerCase());
});
}return v;
},capitalize:function(x){if(this.__bB===null){var y=m;
this.__bB=new RegExp(f+this.__bA.replace(/[0-9A-F]{4}/g,function(z){return y+z;
})+a+this.__bA.replace(/[0-9A-F]{4}/g,function(A){return y+A;
})+n,o);
}return x.replace(this.__bB,function(B){return B.toUpperCase();
});
},clean:function(C){return this.trim(C.replace(/\s+/g,d));
},trimLeft:function(D){return D.replace(/^\s+/,p);
},trimRight:function(E){return E.replace(/\s+$/,p);
},trim:function(F){return F.replace(/^\s+|\s+$/g,p);
},startsWith:function(G,H){return G.indexOf(H)===0;
},endsWith:function(I,J){return I.substring(I.length-J.length,I.length)===J;
},repeat:function(K,L){return K.length>0?new Array(L+1).join(K):p;
},pad:function(M,length,N){var O=length-M.length;

if(O>0){if(typeof N===l){N=c;
}return this.repeat(N,O)+M;
}else{return M;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(P,Q){return P.indexOf(Q)!=-1;
},format:function(R,S){var T=R;
var i=S.length;

while(i--){T=T.replace(new RegExp(e+(i+1),o),S[i]+p);
}return T;
},escapeRegexpChars:function(U){return U.replace(/([.*+?^${}()|[\]\/\\])/g,k);
},toArray:function(V){return V.split(/\B|\b/g);
},stripTags:function(W){return W.replace(/<\/?[^>]+>/gi,p);
},stripScripts:function(X,Y){var bb=p;
var ba=X.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){bb+=arguments[1]+b;
return p;
});

if(Y===true){qx.lang.Function.globalEval(bb);
}return ba;
}}});
})();
(function(){var k="The second parameter must be an array.",j="mshtml",h="engine.name",g="The first parameter must be an array.",f="Parameter must be an array.",e="[object Array]",d="qx.lang.Array",c="qx",b="number",a="string";
qx.Class.define(d,{statics:{toArray:function(m,n){return this.cast(m,Array,n);
},cast:function(o,p,q){if(o.constructor===p){return o;
}
if(qx.Class.hasInterface(o,qx.data.IListData)){var o=o.toArray();
}var r=new p;
if((qx.core.Environment.get(h)==j)){if(o.item){for(var i=q||0,l=o.length;i<l;i++){r.push(o[i]);
}return r;
}}if(Object.prototype.toString.call(o)===e&&q==null){r.push.apply(r,o);
}else{r.push.apply(r,Array.prototype.slice.call(o,q||0));
}return r;
},fromArguments:function(s,t){return Array.prototype.slice.call(s,t||0);
},fromCollection:function(u){if((qx.core.Environment.get(h)==j)){if(u.item){var v=[];

for(var i=0,l=u.length;i<l;i++){v[i]=u[i];
}return v;
}}return Array.prototype.slice.call(u,0);
},fromShortHand:function(w){var y=w.length;
var x=qx.lang.Array.clone(w);
switch(y){case 1:x[1]=x[2]=x[3]=x[0];
break;
case 2:x[2]=x[0];
case 3:x[3]=x[1];
}return x;
},clone:function(z){return z.concat();
},insertAt:function(A,B,i){A.splice(i,0,B);
return A;
},insertBefore:function(C,D,E){var i=C.indexOf(E);

if(i==-1){C.push(D);
}else{C.splice(i,0,D);
}return C;
},insertAfter:function(F,G,H){var i=F.indexOf(H);

if(i==-1||i==(F.length-1)){F.push(G);
}else{F.splice(i+1,0,G);
}return F;
},removeAt:function(I,i){return I.splice(i,1)[0];
},removeAll:function(J){J.length=0;
return this;
},append:function(K,L){{qx.core.Assert&&qx.core.Assert.assertArray(K,g);
qx.core.Assert&&qx.core.Assert.assertArray(L,k);
};
Array.prototype.push.apply(K,L);
return K;
},exclude:function(M,N){{qx.core.Assert&&qx.core.Assert.assertArray(M,g);
qx.core.Assert&&qx.core.Assert.assertArray(N,k);
};

for(var i=0,P=N.length,O;i<P;i++){O=M.indexOf(N[i]);

if(O!=-1){M.splice(O,1);
}}return M;
},remove:function(Q,R){var i=Q.indexOf(R);

if(i!=-1){Q.splice(i,1);
return R;
}},contains:function(S,T){return S.indexOf(T)!==-1;
},equals:function(U,V){var length=U.length;

if(length!==V.length){return false;
}
for(var i=0;i<length;i++){if(U[i]!==V[i]){return false;
}}return true;
},sum:function(W){var X=0;

for(var i=0,l=W.length;i<l;i++){X+=W[i];
}return X;
},max:function(Y){{qx.core.Assert&&qx.core.Assert.assertArray(Y,f);
};
var i,bb=Y.length,ba=Y[0];

for(i=1;i<bb;i++){if(Y[i]>ba){ba=Y[i];
}}return ba===undefined?null:ba;
},min:function(bc){{qx.core.Assert&&qx.core.Assert.assertArray(bc,f);
};
var i,be=bc.length,bd=bc[0];

for(i=1;i<be;i++){if(bc[i]<bd){bd=bc[i];
}}return bd===undefined?null:bd;
},unique:function(bf){var bp=[],bh={},bk={},bm={};
var bl,bg=0;
var bq=c+qx.lang.Date.now();
var bi=false,bo=false,br=false;
for(var i=0,bn=bf.length;i<bn;i++){bl=bf[i];
if(bl===null){if(!bi){bi=true;
bp.push(bl);
}}else if(bl===undefined){}else if(bl===false){if(!bo){bo=true;
bp.push(bl);
}}else if(bl===true){if(!br){br=true;
bp.push(bl);
}}else if(typeof bl===a){if(!bh[bl]){bh[bl]=1;
bp.push(bl);
}}else if(typeof bl===b){if(!bk[bl]){bk[bl]=1;
bp.push(bl);
}}else{bj=bl[bq];

if(bj==null){bj=bl[bq]=bg++;
}
if(!bm[bj]){bm[bj]=bl;
bp.push(bl);
}}}for(var bj in bm){try{delete bm[bj][bq];
}catch(bs){try{bm[bj][bq]=null;
}catch(bt){throw new Error("Cannot clean-up map entry doneObjects["+bj+"]["+bq+"]");
}}}return bp;
}}});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;
},isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));
},isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));
},isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));
},isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));
}}});
})();
(function(){var p="",o="!",n="'!",m="'",k="Expected '",j="' (rgb(",h=",",g=")), but found value '",f="Event (",d="Expected value to be the CSS color '",bz="' but found ",by="]",bx=", ",bw="The value '",bv=" != ",bu="qx.core.Object",bt="Expected value to be an array but found ",bs=") was fired.",br="Expected value to be an integer >= 0 but found ",bq="' to be not equal with '",w="' to '",x="Expected object '",u="Called assertTrue with '",v="Expected value to be a map but found ",s="The function did not raise an exception!",t="Expected value to be undefined but found ",q="Expected value to be a DOM element but found  '",r="Expected value to be a regular expression but found ",E="' to implement the interface '",F="Expected value to be null but found ",S="Invalid argument 'type'",O="Called assert with 'false'",bb="Assertion error! ",V="null",bm="' but found '",bg="' must must be a key of the map '",J="The String '",bp="Expected value to be a string but found ",bo="Expected value not to be undefined but found undefined!",bn="qx.util.ColorUtil",I=": ",L="The raised exception does not have the expected type! ",N=") not fired.",Q="qx.core.Assert",T="Expected value to be typeof object but found ",W="' (identical) but found '",bd="' must have any of the values defined in the array '",bi="Expected value to be a number but found ",y="Called assertFalse with '",z="qx.ui.core.Widget",K="Expected value to be a qooxdoo object but found ",ba="' arguments.",Y="Expected value '%1' to be in the range '%2'..'%3'!",X="Array[",bf="' does not match the regular expression '",be="' to be not identical with '",U="Expected [",bc="' arguments but found '",a="', which cannot be converted to a CSS color!",bh="qx.core.AssertionError",A="Expected value to be a boolean but found ",B="Expected value not to be null but found null!",P="))!",b="Expected value to be a qooxdoo widget but found ",c="Expected value to be typeof '",H="Expected value to be typeof function but found ",C="Expected value to be an integer but found ",D="Called fail().",G="The parameter 're' must be a string or a regular expression.",R="Expected value to be a number >= 0 but found ",bk="Expected value to be instanceof '",bj="], but found [",M="Wrong number of arguments given. Expected '",bl="object";
qx.Class.define(Q,{statics:{__bN:true,__bO:function(bA,bB){var bF=p;

for(var i=1,l=arguments.length;i<l;i++){bF=bF+this.__bP(arguments[i]);
}var bE=p;

if(bF){bE=bA+I+bF;
}else{bE=bA;
}var bD=bb+bE;

if(this.__bN){qx.Bootstrap.error(bD);
}
if(qx.Class.isDefined(bh)){var bC=new qx.core.AssertionError(bA,bF);

if(this.__bN){qx.Bootstrap.error("Stack trace: \n"+bC.getStackTrace());
}throw bC;
}else{throw new Error(bD);
}},__bP:function(bG){var bH;

if(bG===null){bH=V;
}else if(qx.lang.Type.isArray(bG)&&bG.length>10){bH=X+bG.length+by;
}else if((bG instanceof Object)&&(bG.toString==null)){bH=qx.lang.Json.stringify(bG,null,2);
}else{try{bH=bG.toString();
}catch(e){bH=p;
}}return bH;
},assert:function(bI,bJ){bI==true||this.__bO(bJ||p,O);
},fail:function(bK,bL){var bM=bL?p:D;
this.__bO(bK||p,bM);
},assertTrue:function(bN,bO){(bN===true)||this.__bO(bO||p,u,bN,m);
},assertFalse:function(bP,bQ){(bP===false)||this.__bO(bQ||p,y,bP,m);
},assertEquals:function(bR,bS,bT){bR==bS||this.__bO(bT||p,k,bR,bm,bS,n);
},assertNotEquals:function(bU,bV,bW){bU!=bV||this.__bO(bW||p,k,bU,bq,bV,n);
},assertIdentical:function(bX,bY,ca){bX===bY||this.__bO(ca||p,k,bX,W,bY,n);
},assertNotIdentical:function(cb,cc,cd){cb!==cc||this.__bO(cd||p,k,cb,be,cc,n);
},assertNotUndefined:function(ce,cf){ce!==undefined||this.__bO(cf||p,bo);
},assertUndefined:function(cg,ch){cg===undefined||this.__bO(ch||p,t,cg,o);
},assertNotNull:function(ci,cj){ci!==null||this.__bO(cj||p,B);
},assertNull:function(ck,cl){ck===null||this.__bO(cl||p,F,ck,o);
},assertJsonEquals:function(cm,cn,co){this.assertEquals(qx.lang.Json.stringify(cm),qx.lang.Json.stringify(cn),co);
},assertMatch:function(cp,cq,cr){this.assertString(cp);
this.assert(qx.lang.Type.isRegExp(cq)||qx.lang.Type.isString(cq),G);
cp.search(cq)>=0||this.__bO(cr||p,J,cp,bf,cq.toString(),n);
},assertArgumentsCount:function(cs,ct,cu,cv){var cw=cs.length;
(cw>=ct&&cw<=cu)||this.__bO(cv||p,M,ct,w,cu,bc,arguments.length,ba);
},assertEventFired:function(cx,event,cy,cz,cA){var cC=false;
var cB=function(e){if(cz){cz.call(cx,e);
}cC=true;
};
var cD;

try{cD=cx.addListener(event,cB,cx);
cy.call();
}catch(cE){throw cE;
}finally{try{cx.removeListenerById(cD);
}catch(cF){}}cC===true||this.__bO(cA||p,f,event,N);
},assertEventNotFired:function(cG,event,cH,cI){var cK=false;
var cJ=function(e){cK=true;
};
var cL=cG.addListener(event,cJ,cG);
cH.call();
cK===false||this.__bO(cI||p,f,event,bs);
cG.removeListenerById(cL);
},assertException:function(cM,cN,cO,cP){var cN=cN||Error;
var cQ;

try{this.__bN=false;
cM();
}catch(cR){cQ=cR;
}finally{this.__bN=true;
}
if(cQ==null){this.__bO(cP||p,s);
}cQ instanceof cN||this.__bO(cP||p,L,cN,bv,cQ);

if(cO){this.assertMatch(cQ.toString(),cO,cP);
}},assertInArray:function(cS,cT,cU){cT.indexOf(cS)!==-1||this.__bO(cU||p,bw,cS,bd,cT,m);
},assertArrayEquals:function(cV,cW,cX){this.assertArray(cV,cX);
this.assertArray(cW,cX);
cX=cX||U+cV.join(bx)+bj+cW.join(bx)+by;

if(cV.length!==cW.length){this.fail(cX,true);
}
for(var i=0;i<cV.length;i++){if(cV[i]!==cW[i]){this.fail(cX,true);
}}},assertKeyInMap:function(cY,da,db){da[cY]!==undefined||this.__bO(db||p,bw,cY,bg,da,m);
},assertFunction:function(dc,dd){qx.lang.Type.isFunction(dc)||this.__bO(dd||p,H,dc,o);
},assertString:function(de,df){qx.lang.Type.isString(de)||this.__bO(df||p,bp,de,o);
},assertBoolean:function(dg,dh){qx.lang.Type.isBoolean(dg)||this.__bO(dh||p,A,dg,o);
},assertNumber:function(di,dj){(qx.lang.Type.isNumber(di)&&isFinite(di))||this.__bO(dj||p,bi,di,o);
},assertPositiveNumber:function(dk,dl){(qx.lang.Type.isNumber(dk)&&isFinite(dk)&&dk>=0)||this.__bO(dl||p,R,dk,o);
},assertInteger:function(dm,dn){(qx.lang.Type.isNumber(dm)&&isFinite(dm)&&dm%1===0)||this.__bO(dn||p,C,dm,o);
},assertPositiveInteger:function(dp,dq){var dr=(qx.lang.Type.isNumber(dp)&&isFinite(dp)&&dp%1===0&&dp>=0);
dr||this.__bO(dq||p,br,dp,o);
},assertInRange:function(ds,dt,du,dv){(ds>=dt&&ds<=du)||this.__bO(dv||p,qx.lang.String.format(Y,[ds,dt,du]));
},assertObject:function(dw,dx){var dy=dw!==null&&(qx.lang.Type.isObject(dw)||typeof dw===bl);
dy||this.__bO(dx||p,T,(dw),o);
},assertArray:function(dz,dA){qx.lang.Type.isArray(dz)||this.__bO(dA||p,bt,dz,o);
},assertMap:function(dB,dC){qx.lang.Type.isObject(dB)||this.__bO(dC||p,v,dB,o);
},assertRegExp:function(dD,dE){qx.lang.Type.isRegExp(dD)||this.__bO(dE||p,r,dD,o);
},assertType:function(dF,dG,dH){this.assertString(dG,S);
typeof (dF)===dG||this.__bO(dH||p,c,dG,bz,dF,o);
},assertInstance:function(dI,dJ,dK){var dL=dJ.classname||dJ+p;
dI instanceof dJ||this.__bO(dK||p,bk,dL,bz,dI,o);
},assertInterface:function(dM,dN,dO){qx.Class.implementsInterface(dM,dN)||this.__bO(dO||p,x,dM,E,dN,n);
},assertCssColor:function(dP,dQ,dR){var dS=qx.Class.getByName(bn);

if(!dS){throw new Error("qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'");
}var dU=dS.stringToRgb(dP);

try{var dT=dS.stringToRgb(dQ);
}catch(dW){this.__bO(dR||p,d,dP,j,dU.join(h),g,dQ,a);
}var dV=dU[0]==dT[0]&&dU[1]==dT[1]&&dU[2]==dT[2];
dV||this.__bO(dR||p,d,dU,j,dU.join(h),g,dQ,j,dT.join(h),P);
},assertElement:function(dX,dY){!!(dX&&dX.nodeType===1)||this.__bO(dY||p,q,dX,n);
},assertQxObject:function(ea,eb){this.__bQ(ea,bu)||this.__bO(eb||p,K,ea,o);
},assertQxWidget:function(ec,ed){this.__bQ(ec,z)||this.__bO(ed||p,b,ec,o);
},__bQ:function(ee,ef){if(!ee){return false;
}var eg=ee.constructor;

while(eg){if(eg.classname===ef){return true;
}eg=eg.superclass;
}return false;
}}});
})();
(function(){var c="",b=": ",a="qx.type.BaseError";
qx.Class.define(a,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__bR=d||c;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__bR:null,message:null,getComment:function(){return this.__bR;
},toString:function(){return this.__bR+(this.message?b+this.message:c);
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__bS=qx.dev.StackTrace.getStackTrace();
},members:{__bS:null,getStackTrace:function(){return this.__bS;
}}});
})();
(function(){var m=":",l="engine.name",k="Error created at",j="...",h="qx.dev.StackTrace",g="",f="\n",e="?",d="/source/class/",c="anonymous",a="of linked script",b=".";
qx.Bootstrap.define(h,{statics:{getStackTrace:qx.core.Environment.select(l,{"gecko":function(){try{throw new Error();
}catch(A){var u=this.getStackTraceFromError(A);
qx.lang.Array.removeAt(u,0);
var s=this.getStackTraceFromCaller(arguments);
var q=s.length>u.length?s:u;

for(var i=0;i<Math.min(s.length,u.length);i++){var r=s[i];

if(r.indexOf(c)>=0){continue;
}var y=r.split(m);

if(y.length!=2){continue;
}var w=y[0];
var p=y[1];
var o=u[i];
var z=o.split(m);
var v=z[0];
var n=z[1];

if(qx.Class.getByName(v)){var t=v;
}else{t=w;
}var x=t+m;

if(p){x+=p+m;
}x+=n;
q[i]=x;
}return q;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var B;

try{B.bar();
}catch(D){var C=this.getStackTraceFromError(D);
qx.lang.Array.removeAt(C,0);
return C;
}return [];
}}),getStackTraceFromCaller:qx.core.Environment.select(l,{"opera":function(E){return [];
},"default":function(F){var K=[];
var J=qx.lang.Function.getCaller(F);
var G={};

while(J){var H=qx.lang.Function.getName(J);
K.push(H);

try{J=J.caller;
}catch(L){break;
}
if(!J){break;
}var I=qx.core.ObjectRegistry.toHashCode(J);

if(G[I]){K.push(j);
break;
}G[I]=J;
}return K;
}}),getStackTraceFromError:qx.core.Environment.select(l,{"gecko":function(M){if(!M.stack){return [];
}var S=/@(.+):(\d+)$/gm;
var N;
var O=[];

while((N=S.exec(M.stack))!=null){var P=N[1];
var R=N[2];
var Q=this.__bT(P);
O.push(Q+m+R);
}return O;
},"webkit":function(T){if(T.stack){var bb=/at (.*)/gm;
var ba=/\((.*?)(:[^\/].*)\)/;
var X=/(.*?)(:[^\/].*)/;
var U;
var V=[];

while((U=bb.exec(T.stack))!=null){var W=ba.exec(U[1]);

if(!W){W=X.exec(U[1]);
}
if(W){var Y=this.__bT(W[1]);
V.push(Y+W[2]);
}else{V.push(U[1]);
}}return V;
}else if(T.sourceURL&&T.line){return [this.__bT(T.sourceURL)+m+T.line];
}else{return [];
}},"opera":function(bc){if(bc.stacktrace){var be=bc.stacktrace;

if(be.indexOf(k)>=0){be=be.split(k)[0];
}if(be.indexOf(a)>=0){var bo=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;
var bf;
var bg=[];

while((bf=bo.exec(be))!=null){var bn=bf[1];
var bi=bf[2];
var bm=this.__bT(bi);
bg.push(bm+m+bn);
}}else{var bo=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;
var bf;
var bg=[];

while((bf=bo.exec(be))!=null){var bn=bf[1];
var bh=bf[2];
var bi=bf[3];
var bm=this.__bT(bi);
bg.push(bm+m+bn+m+bh);
}}return bg;
}else if(bc.message&&bc.message.indexOf("Backtrace:")>=0){var bg=[];
var bj=qx.lang.String.trim(bc.message.split("Backtrace:")[1]);
var bk=bj.split(f);

for(var i=0;i<bk.length;i++){var bd=bk[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(bd&&bd.length>=2){var bn=bd[1];
var bl=this.__bT(bd[2]);
bg.push(bl+m+bn);
}}return bg;
}else{return [];
}},"default":function(){return [];
}}),__bT:function(bp){var bt=d;
var bq=bp.indexOf(bt);
var bs=bp.indexOf(e);

if(bs>=0){bp=bp.substring(0,bs);
}var br=(bq==-1)?bp:bp.substring(bq+bt.length).replace(/\//g,b).replace(/\.js$/,g);
return br;
}}});
})();
(function(){var i="()",h=".",g=".prototype.",f="Invalid parameter 'func'.",e='anonymous()',d="Trying to call a bound function with a disposed object as context: ",c=" :: ",b="qx.lang.Function",a=".constructor()";
qx.Class.define(b,{statics:{getCaller:function(j){return j.caller?j.caller.callee:j.callee.caller;
},getName:function(k){if(k.displayName){return k.displayName;
}
if(k.$$original||k.wrapper||k.classname){return k.classname+a;
}
if(k.$$mixin){for(var m in k.$$mixin.$$members){if(k.$$mixin.$$members[m]==k){return k.$$mixin.name+g+m+i;
}}for(var m in k.$$mixin){if(k.$$mixin[m]==k){return k.$$mixin.name+h+m+i;
}}}
if(k.self){var n=k.self.constructor;

if(n){for(var m in n.prototype){if(n.prototype[m]==k){return n.classname+g+m+i;
}}for(var m in n){if(n[m]==k){return n.classname+h+m+i;
}}}}var l=k.toString().match(/function\s*(\w*)\s*\(.*/);

if(l&&l.length>=1&&l[1]){return l[1]+i;
}return e;
},globalEval:function(o){if(window.execScript){return window.execScript(o);
}else{return eval.call(window,o);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(p,q){{qx.core.Assert&&qx.core.Assert.assertFunction(p,f);
};
if(!q){return p;
}if(!(q.self||q.args||q.delay!=null||q.periodical!=null||q.attempt)){return p;
}return function(event){{if(q.self instanceof qx.core.Object){qx.core.Assert&&qx.core.Assert.assertFalse(q.self.isDisposed(),d+q.self.toString()+c+qx.lang.Function.getName(p));
}};
var s=qx.lang.Array.fromArguments(arguments);
if(q.args){s=q.args.concat(s);
}
if(q.delay||q.periodical){var r=qx.event.GlobalError.observeMethod(function(){return p.apply(q.self||this,s);
});

if(q.delay){return window.setTimeout(r,q.delay);
}
if(q.periodical){return window.setInterval(r,q.periodical);
}}else if(q.attempt){var t=false;

try{t=p.apply(q.self||this,s);
}catch(u){}return t;
}else{return p.apply(q.self||this,s);
}};
},bind:function(v,self,w){return this.create(v,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(x,y){return this.create(x,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(z,self,A){if(arguments.length<3){return function(event){return z.call(self||this,event||window.event);
};
}else{var B=qx.lang.Array.fromArguments(arguments,2);
return function(event){var C=[event||window.event];
C.push.apply(C,B);
z.apply(self||this,C);
};
}},attempt:function(D,self,E){return this.create(D,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(F,G,self,H){return this.create(F,{delay:G,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(I,J,self,K){return this.create(I,{periodical:J,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var h="qx.debug.dispose",g="$$hash",f="-",e="",d="qx.core.ObjectRegistry",c="-0";
qx.Class.define(d,{statics:{inShutDown:false,__w:{},__bU:0,__bV:[],__bW:e,__bX:{},register:function(j){var n=this.__w;

if(!n){return;
}var m=j.$$hash;

if(m==null){var k=this.__bV;

if(k.length>0&&!qx.core.Environment.get(h)){m=k.pop();
}else{m=(this.__bU++)+this.__bW;
}j.$$hash=m;

if(qx.core.Environment.get(h)&&qx.dev&&qx.dev.Debug&&qx.dev.Debug.disposeProfilingActive){this.__bX[m]=qx.dev.StackTrace.getStackTrace();
}}{if(!j.dispose){throw new Error("Invalid object: "+j);
}};
n[m]=j;
},unregister:function(o){var p=o.$$hash;

if(p==null){return;
}var q=this.__w;

if(q&&q[p]){delete q[p];
this.__bV.push(p);
}try{delete o.$$hash;
}catch(r){if(o.removeAttribute){o.removeAttribute(g);
}}},toHashCode:function(s){{if(s==null){throw new Error("Invalid object: "+s);
}};
var u=s.$$hash;

if(u!=null){return u;
}var t=this.__bV;

if(t.length>0){u=t.pop();
}else{u=(this.__bU++)+this.__bW;
}return s.$$hash=u;
},clearHashCode:function(v){{if(v==null){throw new Error("Invalid object: "+v);
}};
var w=v.$$hash;

if(w!=null){this.__bV.push(w);
try{delete v.$$hash;
}catch(x){if(v.removeAttribute){v.removeAttribute(g);
}}}},fromHashCode:function(y){return this.__w[y]||null;
},shutdown:function(){this.inShutDown=true;
var A=this.__w;
var C=[];

for(var B in A){C.push(B);
}C.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);
});
var z,i=0,l=C.length;

while(true){try{for(;i<l;i++){B=C[i];
z=A[B];

if(z&&z.dispose){z.dispose();
}}}catch(D){qx.Bootstrap.error(this,"Could not dispose object "+z.toString()+": "+D);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__w;
},getRegistry:function(){return this.__w;
},getNextHash:function(){return this.__bU;
},getPostId:function(){return this.__bW;
},getStackTraces:function(){return this.__bX;
}},defer:function(E){if(window&&window.top){var frames=window.top.frames;

for(var i=0;i<frames.length;i++){if(frames[i]===window){E.__bW=f+(i+1);
return;
}}}E.__bW=c;
}});
})();
(function(){var a="qx.core.MAssert";
qx.Mixin.define(a,{members:{assert:function(b,c){qx.core.Assert.assert(b,c);
},fail:function(d,e){qx.core.Assert.fail(d,e);
},assertTrue:function(f,g){qx.core.Assert.assertTrue(f,g);
},assertFalse:function(h,i){qx.core.Assert.assertFalse(h,i);
},assertEquals:function(j,k,l){qx.core.Assert.assertEquals(j,k,l);
},assertNotEquals:function(m,n,o){qx.core.Assert.assertNotEquals(m,n,o);
},assertIdentical:function(p,q,r){qx.core.Assert.assertIdentical(p,q,r);
},assertNotIdentical:function(s,t,u){qx.core.Assert.assertNotIdentical(s,t,u);
},assertNotUndefined:function(v,w){qx.core.Assert.assertNotUndefined(v,w);
},assertUndefined:function(x,y){qx.core.Assert.assertUndefined(x,y);
},assertNotNull:function(z,A){qx.core.Assert.assertNotNull(z,A);
},assertNull:function(B,C){qx.core.Assert.assertNull(B,C);
},assertJsonEquals:function(D,E,F){qx.core.Assert.assertJsonEquals(D,E,F);
},assertMatch:function(G,H,I){qx.core.Assert.assertMatch(G,H,I);
},assertArgumentsCount:function(J,K,L,M){qx.core.Assert.assertArgumentsCount(J,K,L,M);
},assertEventFired:function(N,event,O,P,Q){qx.core.Assert.assertEventFired(N,event,O,P,Q);
},assertEventNotFired:function(R,event,S,T){qx.core.Assert.assertEventNotFired(R,event,S,T);
},assertException:function(U,V,W,X){qx.core.Assert.assertException(U,V,W,X);
},assertInArray:function(Y,ba,bb){qx.core.Assert.assertInArray(Y,ba,bb);
},assertArrayEquals:function(bc,bd,be){qx.core.Assert.assertArrayEquals(bc,bd,be);
},assertKeyInMap:function(bf,bg,bh){qx.core.Assert.assertKeyInMap(bf,bg,bh);
},assertFunction:function(bi,bj){qx.core.Assert.assertFunction(bi,bj);
},assertString:function(bk,bl){qx.core.Assert.assertString(bk,bl);
},assertBoolean:function(bm,bn){qx.core.Assert.assertBoolean(bm,bn);
},assertNumber:function(bo,bp){qx.core.Assert.assertNumber(bo,bp);
},assertPositiveNumber:function(bq,br){qx.core.Assert.assertPositiveNumber(bq,br);
},assertInteger:function(bs,bt){qx.core.Assert.assertInteger(bs,bt);
},assertPositiveInteger:function(bu,bv){qx.core.Assert.assertPositiveInteger(bu,bv);
},assertInRange:function(bw,bx,by,bz){qx.core.Assert.assertInRange(bw,bx,by,bz);
},assertObject:function(bA,bB){qx.core.Assert.assertObject(bA,bB);
},assertArray:function(bC,bD){qx.core.Assert.assertArray(bC,bD);
},assertMap:function(bE,bF){qx.core.Assert.assertMap(bE,bF);
},assertRegExp:function(bG,bH){qx.core.Assert.assertRegExp(bG,bH);
},assertType:function(bI,bJ,bK){qx.core.Assert.assertType(bI,bJ,bK);
},assertInstance:function(bL,bM,bN){qx.core.Assert.assertInstance(bL,bM,bN);
},assertInterface:function(bO,bP,bQ){qx.core.Assert.assertInterface(bO,bP,bQ);
},assertCssColor:function(bR,bS,bT){qx.core.Assert.assertCssColor(bR,bS,bT);
},assertElement:function(bU,bV){qx.core.Assert.assertElement(bU,bV);
},assertQxObject:function(bW,bX){qx.core.Assert.assertQxObject(bW,bX);
},assertQxWidget:function(bY,ca){qx.core.Assert.assertQxWidget(bY,ca);
}}});
})();
(function(){var d="qx.dom.Node",c="engine.name",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(e){return e.nodeType===this.DOCUMENT?e:e.ownerDocument||e.document;
},getWindow:qx.core.Environment.select(c,{"mshtml":function(f){if(f.nodeType==null){return f;
}if(f.nodeType!==this.DOCUMENT){f=f.ownerDocument;
}return f.parentWindow;
},"default":function(g){if(g.nodeType==null){return g;
}if(g.nodeType!==this.DOCUMENT){g=g.ownerDocument;
}return g.defaultView;
}}),getDocumentElement:function(h){return this.getDocument(h).documentElement;
},getBodyElement:function(j){return this.getDocument(j).body;
},isNode:function(k){return !!(k&&k.nodeType!=null);
},isElement:function(l){return !!(l&&l.nodeType===this.ELEMENT);
},isDocument:function(m){return !!(m&&m.nodeType===this.DOCUMENT);
},isText:function(n){return !!(n&&n.nodeType===this.TEXT);
},isWindow:function(o){return !!(o&&o.history&&o.location&&o.document);
},isNodeName:function(p,q){if(!q||!p||!p.nodeName){return false;
}return q.toLowerCase()==qx.dom.Node.getName(p);
},getName:function(r){if(!r||!r.nodeName){return null;
}return r.nodeName.toLowerCase();
},getText:function(s){if(!s||!s.nodeType){return null;
}
switch(s.nodeType){case 1:var i,a=[],t=s.childNodes,length=t.length;

for(i=0;i<length;i++){a[i]=this.getText(t[i]);
}return a.join(b);
case 2:case 3:case 4:return s.nodeValue;
}return null;
},isBlockNode:function(u){if(!qx.dom.Node.isElement(u)){return false;
}u=qx.dom.Node.getName(u);
return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(u);
}}});
})();
(function(){var l="on",k="engine.name",j="gecko",i="engine.version",h="function",g="undefined",f="mousedown",d="qx.bom.Event",c="return;",b="mouseover",a="HTMLEvents";
qx.Class.define(d,{statics:{addNativeListener:function(m,n,o,p){if(m.addEventListener){m.addEventListener(n,o,!!p);
}else if(m.attachEvent){m.attachEvent(l+n,o);
}else if(typeof m[l+n]!=g){m[l+n]=o;
}else{{this.warn("No method available to add native listener to "+m);
};
}},removeNativeListener:function(q,r,s,t){if(q.removeEventListener){q.removeEventListener(r,s,!!t);
}else if(q.detachEvent){try{q.detachEvent(l+r,s);
}catch(e){if(e.number!==-2146828218){throw e;
}}}else if(typeof q[l+r]!=g){q[l+r]=null;
}else{{this.warn("No method available to remove native listener from "+q);
};
}},getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if((qx.core.Environment.get(k)==j)){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}}return e.relatedTarget;
}else if(e.fromElement!==undefined&&e.type===b){return e.fromElement;
}else if(e.toElement!==undefined){return e.toElement;
}else{return null;
}},preventDefault:function(e){if(e.preventDefault){if((qx.core.Environment.get(k)==j)&&parseFloat(qx.core.Environment.get(i))>=1.9&&e.type==f&&e.button==2){return;
}e.preventDefault();
if((qx.core.Environment.get(k)==j)&&parseFloat(qx.core.Environment.get(i))<1.9){try{e.keyCode=0;
}catch(u){}}}else{try{e.keyCode=0;
}catch(v){}e.returnValue=false;
}},stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}else{e.cancelBubble=true;
}},fire:function(w,x){if(document.createEvent){var y=document.createEvent(a);
y.initEvent(x,true,true);
return !w.dispatchEvent(y);
}else{var y=document.createEventObject();
return w.fireEvent(l+x,y);
}},supportsEvent:qx.core.Environment.select(k,{"webkit":function(z,A){return z.hasOwnProperty(l+A);
},"default":function(B,C){var D=l+C;
var E=(D in B);

if(!E){E=typeof B[D]==h;

if(!E&&B.setAttribute){B.setAttribute(D,c);
E=typeof B[D]==h;
B.removeAttribute(D);
}}return E;
}})}});
})();
(function(){var k="|bubble",j="|capture",h="|",g="': ",f="'",e="",d="_",c="Invalid Target.",b="Invalid capture flag.",a="Invalid event type.",I=" from the target '",H="Invalid callback function",G="Invalid event target.",F="unload",E="Failed to remove event listener for id '",D="Invalid context for callback.",C="Failed to add event listener for type '",B="UNKNOWN_",A="capture",z="__cz",s="qx.event.Manager",t="' on target '",q="Could not dispatch event '",r="__cA",o="DOM_",p="QX_",m=" to the target '",n="Failed to remove event listener for type '",u="Invalid id type.",v="c",x="DOCUMENT_",w="WIN_",y="Invalid event object.";
qx.Class.define(s,{extend:Object,construct:function(J,K){this.__cv=J;
this.__cw=qx.core.ObjectRegistry.toHashCode(J);
this.__cx=K;
if(J.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(J,F,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(J,F,arguments.callee);
self.dispose();
}));
}this.__cy={};
this.__cz={};
this.__cA={};
this.__cB={};
},statics:{__cC:0,getNextUniqueId:function(){return (this.__cC++)+e;
}},members:{__cx:null,__cy:null,__cA:null,__cD:null,__cz:null,__cB:null,__cv:null,__cw:null,getWindow:function(){return this.__cv;
},getWindowId:function(){return this.__cw;
},getHandler:function(L){var M=this.__cz[L.classname];

if(M){return M;
}return this.__cz[L.classname]=new L(this);
},getDispatcher:function(N){var O=this.__cA[N.classname];

if(O){return O;
}return this.__cA[N.classname]=new N(this,this.__cx);
},getListeners:function(P,Q,R){var S=P.$$hash||qx.core.ObjectRegistry.toHashCode(P);
var U=this.__cy[S];

if(!U){return null;
}var V=Q+(R?j:k);
var T=U[V];
return T?T.concat():null;
},getAllListeners:function(){return this.__cy;
},serializeListeners:function(W){var be=W.$$hash||qx.core.ObjectRegistry.toHashCode(W);
var bg=this.__cy[be];
var bc=[];

if(bg){var ba,bf,X,bb,bd;

for(var Y in bg){ba=Y.indexOf(h);
bf=Y.substring(0,ba);
X=Y.charAt(ba+1)==v;
bb=bg[Y];

for(var i=0,l=bb.length;i<l;i++){bd=bb[i];
bc.push({self:bd.context,handler:bd.handler,type:bf,capture:X});
}}}return bc;
},toggleAttachedEvents:function(bh,bi){var bn=bh.$$hash||qx.core.ObjectRegistry.toHashCode(bh);
var bp=this.__cy[bn];

if(bp){var bk,bo,bj,bl;

for(var bm in bp){bk=bm.indexOf(h);
bo=bm.substring(0,bk);
bj=bm.charCodeAt(bk+1)===99;
bl=bp[bm];

if(bi){this.__cE(bh,bo,bj);
}else{this.__cF(bh,bo,bj);
}}}},hasListener:function(bq,br,bs){{if(bq==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+bq);
}};
var bt=bq.$$hash||qx.core.ObjectRegistry.toHashCode(bq);
var bv=this.__cy[bt];

if(!bv){return false;
}var bw=br+(bs?j:k);
var bu=bv[bw];
return !!(bu&&bu.length>0);
},importListeners:function(bx,by){{if(bx==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+bx);
}};
var bE=bx.$$hash||qx.core.ObjectRegistry.toHashCode(bx);
var bF=this.__cy[bE]={};
var bB=qx.event.Manager;

for(var bz in by){var bC=by[bz];
var bD=bC.type+(bC.capture?j:k);
var bA=bF[bD];

if(!bA){bA=bF[bD]=[];
this.__cE(bx,bC.type,bC.capture);
}bA.push({handler:bC.listener,context:bC.self,unique:bC.unique||(bB.__cC++)+e});
}},addListener:function(bG,bH,bI,self,bJ){{var bN=C+bH+f+m+bG.classname+g;
qx.core.Assert.assertObject(bG,bN+c);
qx.core.Assert.assertString(bH,bN+a);
qx.core.Assert.assertFunction(bI,bN+H);

if(bJ!==undefined){qx.core.Assert.assertBoolean(bJ,b);
}};
var bO=bG.$$hash||qx.core.ObjectRegistry.toHashCode(bG);
var bQ=this.__cy[bO];

if(!bQ){bQ=this.__cy[bO]={};
}var bM=bH+(bJ?j:k);
var bL=bQ[bM];

if(!bL){bL=bQ[bM]=[];
}if(bL.length===0){this.__cE(bG,bH,bJ);
}var bP=(qx.event.Manager.__cC++)+e;
var bK={handler:bI,context:self,unique:bP};
bL.push(bK);
return bM+h+bP;
},findHandler:function(bR,bS){var cf=false,bW=false,cg=false,bT=false;
var cd;

if(bR.nodeType===1){cf=true;
cd=o+bR.tagName.toLowerCase()+d+bS;
}else if(bR.nodeType===9){bT=true;
cd=x+bS;
}else if(bR==this.__cv){bW=true;
cd=w+bS;
}else if(bR.classname){cg=true;
cd=p+bR.classname+d+bS;
}else{cd=B+bR+d+bS;
}var bY=this.__cB;

if(bY[cd]){return bY[cd];
}var cc=this.__cx.getHandlers();
var bX=qx.event.IEventHandler;
var ca,cb,bV,bU;

for(var i=0,l=cc.length;i<l;i++){ca=cc[i];
bV=ca.SUPPORTED_TYPES;

if(bV&&!bV[bS]){continue;
}bU=ca.TARGET_CHECK;

if(bU){var ce=false;

if(cf&&((bU&bX.TARGET_DOMNODE)!=0)){ce=true;
}else if(bW&&((bU&bX.TARGET_WINDOW)!=0)){ce=true;
}else if(cg&&((bU&bX.TARGET_OBJECT)!=0)){ce=true;
}else if(bT&&((bU&bX.TARGET_DOCUMENT)!=0)){ce=true;
}
if(!ce){continue;
}}cb=this.getHandler(cc[i]);

if(ca.IGNORE_CAN_HANDLE||cb.canHandleEvent(bR,bS)){bY[cd]=cb;
return cb;
}}return null;
},__cE:function(ch,ci,cj){var ck=this.findHandler(ch,ci);

if(ck){ck.registerEvent(ch,ci,cj);
return;
}{qx.log.Logger.warn(this,"There is no event handler for the event '"+ci+"' on target '"+ch+"'!");
};
},removeListener:function(cl,cm,cn,self,co){{var cs=n+cm+f+I+cl.classname+g;
qx.core.Assert.assertObject(cl,cs+c);
qx.core.Assert.assertString(cm,cs+a);
qx.core.Assert.assertFunction(cn,cs+H);

if(self!==undefined){qx.core.Assert.assertObject(self,D);
}
if(co!==undefined){qx.core.Assert.assertBoolean(co,b);
}};
var ct=cl.$$hash||qx.core.ObjectRegistry.toHashCode(cl);
var cu=this.__cy[ct];

if(!cu){return false;
}var cp=cm+(co?j:k);
var cq=cu[cp];

if(!cq){return false;
}var cr;

for(var i=0,l=cq.length;i<l;i++){cr=cq[i];

if(cr.handler===cn&&cr.context===self){qx.lang.Array.removeAt(cq,i);

if(cq.length==0){this.__cF(cl,cm,co);
}return true;
}}return false;
},removeListenerById:function(cv,cw){{var cC=E+cw+f+I+cv.classname+g;
qx.core.Assert.assertObject(cv,cC+c);
qx.core.Assert.assertString(cw,cC+u);
};
var cA=cw.split(h);
var cF=cA[0];
var cx=cA[1].charCodeAt(0)==99;
var cE=cA[2];
var cD=cv.$$hash||qx.core.ObjectRegistry.toHashCode(cv);
var cG=this.__cy[cD];

if(!cG){return false;
}var cB=cF+(cx?j:k);
var cz=cG[cB];

if(!cz){return false;
}var cy;

for(var i=0,l=cz.length;i<l;i++){cy=cz[i];

if(cy.unique===cE){qx.lang.Array.removeAt(cz,i);

if(cz.length==0){this.__cF(cv,cF,cx);
}return true;
}}return false;
},removeAllListeners:function(cH){var cL=cH.$$hash||qx.core.ObjectRegistry.toHashCode(cH);
var cN=this.__cy[cL];

if(!cN){return false;
}var cJ,cM,cI;

for(var cK in cN){if(cN[cK].length>0){cJ=cK.split(h);
cM=cJ[0];
cI=cJ[1]===A;
this.__cF(cH,cM,cI);
}}delete this.__cy[cL];
return true;
},deleteAllListeners:function(cO){delete this.__cy[cO];
},__cF:function(cP,cQ,cR){var cS=this.findHandler(cP,cQ);

if(cS){cS.unregisterEvent(cP,cQ,cR);
return;
}{qx.log.Logger.warn(this,"There is no event handler for the event '"+cQ+"' on target '"+cP+"'!");
};
},dispatchEvent:function(cT,event){{var cY=q+event+t+cT.classname+g;
qx.core.Assert.assertNotUndefined(cT,cY+G);
qx.core.Assert.assertNotNull(cT,cY+G);
qx.core.Assert.assertInstance(event,qx.event.type.Event,cY+y);
};
var da=event.getType();

if(!event.getBubbles()&&!this.hasListener(cT,da)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(cT);
}var cX=this.__cx.getDispatchers();
var cW;
var cV=false;

for(var i=0,l=cX.length;i<l;i++){cW=this.getDispatcher(cX[i]);
if(cW.canDispatchEvent(cT,event,da)){cW.dispatchEvent(cT,event,da);
cV=true;
break;
}}
if(!cV){{qx.log.Logger.error(this,"No dispatcher can handle event of type "+da+" on "+cT);
};
return true;
}var cU=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !cU;
},dispose:function(){this.__cx.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,z);
qx.util.DisposeUtil.disposeMap(this,r);
this.__cy=this.__cv=this.__cD=null;
this.__cx=this.__cB=null;
}}});
})();
(function(){var a="qx.lang.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);
},members:{__cg:0,__ch:0,__ci:false,__cj:0,__ck:null,__cl:null,setMaxEntries:function(c){this.__cl=c;
this.clear();
},getMaxEntries:function(){return this.__cl;
},addEntry:function(d){this.__ck[this.__cg]=d;
this.__cg=this.__cm(this.__cg,1);
var e=this.getMaxEntries();

if(this.__ch<e){this.__ch++;
}if(this.__ci&&(this.__cj<e)){this.__cj++;
}},mark:function(){this.__ci=true;
this.__cj=0;
},clearMark:function(){this.__ci=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(f,g){if(f>this.__ch){f=this.__ch;
}if(g&&this.__ci&&(f>this.__cj)){f=this.__cj;
}
if(f>0){var i=this.__cm(this.__cg,-1);
var h=this.__cm(i,-f+1);
var j;

if(h<=i){j=this.__ck.slice(h,i+1);
}else{j=this.__ck.slice(h,this.__ch).concat(this.__ck.slice(0,i+1));
}}else{j=[];
}return j;
},clear:function(){this.__ck=new Array(this.getMaxEntries());
this.__ch=0;
this.__cj=0;
this.__cg=0;
},__cm:function(k,l){var m=this.getMaxEntries();
var n=(k+l)%m;
if(n<0){n+=m;
}return n;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);
},members:{setMaxMessages:function(c){this.setMaxEntries(c);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(d){this.addEntry(d);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(e,f){return this.getEntries(e,f);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var k="unknown",j="node",h="error",g="...(+",f="array",e=")",d="info",c="instance",b="string",a="null",H="class",G="number",F="stringify",E="]",D="date",C="function",B="boolean",A="debug",z="map",y="undefined",s="qx.log.Logger",t="[",q="#",r="warn",o="document",p="{...(",m="text[",n="[...(",u="\n",v=")}",x=")]",w="object";
qx.Class.define(s,{statics:{__cn:A,setLevel:function(I){this.__cn=I;
},getLevel:function(){return this.__cn;
},setTreshold:function(J){this.__cq.setMaxMessages(J);
},getTreshold:function(){return this.__cq.getMaxMessages();
},__co:{},__cp:0,register:function(K){if(K.$$id){return;
}var M=this.__cp++;
this.__co[M]=K;
K.$$id=M;
var L=this.__cr;
var N=this.__cq.getAllLogEvents();

for(var i=0,l=N.length;i<l;i++){if(L[N[i].level]>=L[this.__cn]){K.process(N[i]);
}}},unregister:function(O){var P=O.$$id;

if(P==null){return;
}delete this.__co[P];
delete O.$$id;
},debug:function(Q,R){qx.log.Logger.__cs(A,arguments);
},info:function(S,T){qx.log.Logger.__cs(d,arguments);
},warn:function(U,V){qx.log.Logger.__cs(r,arguments);
},error:function(W,X){qx.log.Logger.__cs(h,arguments);
},trace:function(Y){qx.log.Logger.__cs(d,[Y,qx.dev.StackTrace.getStackTrace().join(u)]);
},deprecatedMethodWarning:function(ba,bb){{var bc=qx.lang.Function.getName(ba);
this.warn("The method '"+bc+"' is deprecated: "+(bb||"Please consult the API documentation of this method for alternatives."));
this.trace();
};
},deprecatedClassWarning:function(bd,be){{var bf=bd.classname||k;
this.warn("The class '"+bf+"' is deprecated: "+(be||"Please consult the API documentation of this class for alternatives."));
this.trace();
};
},deprecatedEventWarning:function(bg,event,bh){{var bi=bg.self?bg.self.classname:k;
this.warn("The event '"+(event||"unknown")+"' from class '"+bi+"' is deprecated: "+(bh||"Please consult the API documentation of this class for alternatives."));
this.trace();
};
},deprecatedMixinWarning:function(bj,bk){{var bl=bj?bj.name:k;
this.warn("The mixin '"+bl+"' is deprecated: "+(bk||"Please consult the API documentation of this class for alternatives."));
this.trace();
};
},deprecatedConstantWarning:function(bm,bn,bo){{if(bm.__defineGetter__){var self=this;
var bp=bm[bn];
bm.__defineGetter__(bn,function(){self.warn("The constant '"+bn+"' is deprecated: "+(bo||"Please consult the API documentation for alternatives."));
self.trace();
return bp;
});
}};
},deprecateMethodOverriding:function(bq,br,bs,bt){{var bu=bq.constructor;

while(bu.classname!==br.classname){if(bu.prototype.hasOwnProperty(bs)){this.warn("The method '"+qx.lang.Function.getName(bq[bs])+"' overrides a deprecated method: "+(bt||"Please consult the API documentation for alternatives."));
this.trace();
break;
}bu=bu.superclass;
}};
},clear:function(){this.__cq.clearHistory();
},__cq:new qx.log.appender.RingBuffer(50),__cr:{debug:0,info:1,warn:2,error:3},__cs:function(bv,bw){var bB=this.__cr;

if(bB[bv]<bB[this.__cn]){return;
}var by=bw.length<2?null:bw[0];
var bA=by?1:0;
var bx=[];

for(var i=bA,l=bw.length;i<l;i++){bx.push(this.__cu(bw[i],true));
}var bC=new Date;
var bD={time:bC,offset:bC-qx.Bootstrap.LOADSTART,level:bv,items:bx,win:window};
if(by){if(by.$$hash!==undefined){bD.object=by.$$hash;
}else if(by.$$type){bD.clazz=by;
}}this.__cq.process(bD);
var bE=this.__co;

for(var bz in bE){bE[bz].process(bD);
}},__ct:function(bF){if(bF===undefined){return y;
}else if(bF===null){return a;
}
if(bF.$$type){return H;
}var bG=typeof bF;

if(bG===C||bG==b||bG===G||bG===B){return bG;
}else if(bG===w){if(bF.nodeType){return j;
}else if(bF.classname){return c;
}else if(bF instanceof Array){return f;
}else if(bF instanceof Error){return h;
}else if(bF instanceof Date){return D;
}else{return z;
}}
if(bF.toString){return F;
}return k;
},__cu:function(bH,bI){var bP=this.__ct(bH);
var bL=k;
var bK=[];

switch(bP){case a:case y:bL=bP;
break;
case b:case G:case B:case D:bL=bH;
break;
case j:if(bH.nodeType===9){bL=o;
}else if(bH.nodeType===3){bL=m+bH.nodeValue+E;
}else if(bH.nodeType===1){bL=bH.nodeName.toLowerCase();

if(bH.id){bL+=q+bH.id;
}}else{bL=j;
}break;
case C:bL=qx.lang.Function.getName(bH)||bP;
break;
case c:bL=bH.basename+t+bH.$$hash+E;
break;
case H:case F:bL=bH.toString();
break;
case h:bK=qx.dev.StackTrace.getStackTraceFromError(bH);
bL=bH.toString();
break;
case f:if(bI){bL=[];

for(var i=0,l=bH.length;i<l;i++){if(bL.length>20){bL.push(g+(l-i)+e);
break;
}bL.push(this.__cu(bH[i],false));
}}else{bL=n+bH.length+x;
}break;
case z:if(bI){var bJ;
var bO=[];

for(var bN in bH){bO.push(bN);
}bO.sort();
bL=[];

for(var i=0,l=bO.length;i<l;i++){if(bL.length>20){bL.push(g+(l-i)+e);
break;
}bN=bO[i];
bJ=this.__cu(bH[bN],false);
bJ.key=bN;
bL.push(bJ);
}}else{var bM=0;

for(var bN in bH){bM++;
}bL=p+bM+v;
}break;
}return {type:bP,text:bL,trace:bK};
}},defer:function(bQ){var bR=qx.Bootstrap.$$logs;

for(var i=0;i<bR.length;i++){bQ.__cs(bR[i][0],bR[i][1]);
}qx.Bootstrap.debug=bQ.debug;
qx.Bootstrap.info=bQ.info;
qx.Bootstrap.warn=bQ.warn;
qx.Bootstrap.error=bQ.error;
qx.Bootstrap.trace=bQ.trace;
}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}}});
})();
(function(){var j="Invalid event target.",i="Invalid event dispatcher!",h="': ",g="Invalid event handler.",f="' on target '",e="Could not fire event '",d="undefined",c="qx.event.Registration";
qx.Class.define(c,{statics:{__cG:{},getManager:function(k){if(k==null){{qx.log.Logger.error("qx.event.Registration.getManager(null) was called!");
qx.log.Logger.trace(this);
};
k=window;
}else if(k.nodeType){k=qx.dom.Node.getWindow(k);
}else if(!qx.dom.Node.isWindow(k)){k=window;
}var m=k.$$hash||qx.core.ObjectRegistry.toHashCode(k);
var l=this.__cG[m];

if(!l){l=new qx.event.Manager(k,this);
this.__cG[m]=l;
}return l;
},removeManager:function(n){var o=n.getWindowId();
delete this.__cG[o];
},addListener:function(p,q,r,self,s){return this.getManager(p).addListener(p,q,r,self,s);
},removeListener:function(t,u,v,self,w){return this.getManager(t).removeListener(t,u,v,self,w);
},removeListenerById:function(x,y){return this.getManager(x).removeListenerById(x,y);
},removeAllListeners:function(z){return this.getManager(z).removeAllListeners(z);
},deleteAllListeners:function(A){var B=A.$$hash;

if(B){this.getManager(A).deleteAllListeners(B);
}},hasListener:function(C,D,E){return this.getManager(C).hasListener(C,D,E);
},serializeListeners:function(F){return this.getManager(F).serializeListeners(F);
},createEvent:function(G,H,I){{if(arguments.length>1&&H===undefined){throw new Error("Create event of type "+G+" with undefined class. Please use null to explicit fallback to default event type!");
}};
if(H==null){H=qx.event.type.Event;
}var J=qx.event.Pool.getInstance().getObject(H);
I?J.init.apply(J,I):J.init();
if(G){J.setType(G);
}return J;
},dispatchEvent:function(K,event){return this.getManager(K).dispatchEvent(K,event);
},fireEvent:function(L,M,N,O){{if(arguments.length>2&&N===undefined&&O!==undefined){throw new Error("Create event of type "+M+" with undefined class. Please use null to explicit fallback to default event type!");
}var P=e+M+f+(L?L.classname:d)+h;
qx.core.Assert.assertNotUndefined(L,P+j);
qx.core.Assert.assertNotNull(L,P+j);
};
var Q=this.createEvent(M,N||null,O);
return this.getManager(L).dispatchEvent(L,Q);
},fireNonBubblingEvent:function(R,S,T,U){{if(arguments.length>2&&T===undefined&&U!==undefined){throw new Error("Create event of type "+S+" with undefined class. Please use null to explicit fallback to default event type!");
}};
var V=this.getManager(R);

if(!V.hasListener(R,S,false)){return true;
}var W=this.createEvent(S,T||null,U);
return V.dispatchEvent(R,W);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__cz:[],addHandler:function(X){{qx.core.Assert.assertInterface(X,qx.event.IEventHandler,g);
};
this.__cz.push(X);
this.__cz.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__cz;
},__cA:[],addDispatcher:function(Y,ba){{qx.core.Assert.assertInterface(Y,qx.event.IEventDispatcher,i);
};
this.__cA.push(Y);
this.__cA.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__cA;
}}});
})();
(function(){var s="qx.disposerDebugLevel",r="set",q="MSIE 6.0",p="get",o="rv:1.8.1",n="reset",m="info",k="qx.core.Object",j="error",h="warn",c="]",g="debug",f="[",b="$$user_",a="object",d="Object";
qx.Class.define(k,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:d},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+f+this.$$hash+c;
},base:function(t,u){{if(!qx.Bootstrap.isFunction(t.callee.base)){throw new Error("Cannot call super class. Method is not derived: "+t.callee.displayName);
}};

if(arguments.length===1){return t.callee.base.call(this);
}else{return t.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(v){return v.callee.self;
},clone:function(){var x=this.constructor;
var w=new x;
var z=qx.Class.getProperties(x);
var y=qx.core.Property.$$store.user;
var A=qx.core.Property.$$method.set;
var name;
for(var i=0,l=z.length;i<l;i++){name=z[i];

if(this.hasOwnProperty(y[name])){w[A[name]](this[y[name]]);
}}return w;
},set:function(B,C){var E=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(B)){if(!this[E[B]]){if(this[r+qx.Bootstrap.firstUp(B)]!=undefined){this[r+qx.Bootstrap.firstUp(B)](C);
return this;
}{qx.Bootstrap.error(new Error("No such property: "+B));
return this;
};
}return this[E[B]](C);
}else{for(var D in B){if(!this[E[D]]){if(this[r+qx.Bootstrap.firstUp(D)]!=undefined){this[r+qx.Bootstrap.firstUp(D)](B[D]);
continue;
}{qx.Bootstrap.error(new Error("No such property: "+D));
return this;
};
}this[E[D]](B[D]);
}return this;
}},get:function(F){var G=qx.core.Property.$$method.get;

if(!this[G[F]]){if(this[p+qx.Bootstrap.firstUp(F)]!=undefined){return this[p+qx.Bootstrap.firstUp(F)]();
}{qx.Bootstrap.error(new Error("No such property: "+F));
return this;
};
}return this[G[F]]();
},reset:function(H){var I=qx.core.Property.$$method.reset;

if(!this[I[H]]){if(this[n+qx.Bootstrap.firstUp(H)]!=undefined){this[n+qx.Bootstrap.firstUp(H)]();
return;
}{qx.Bootstrap.error(new Error("No such property: "+H));
return;
};
}this[I[H]]();
},__cH:qx.event.Registration,addListener:function(J,K,self,L){if(!this.$$disposed){return this.__cH.addListener(this,J,K,self,L);
}return null;
},addListenerOnce:function(M,N,self,O){var P=function(e){this.removeListener(M,P,this,O);
N.call(self||this,e);
};
return this.addListener(M,P,this,O);
},removeListener:function(Q,R,self,S){if(!this.$$disposed){return this.__cH.removeListener(this,Q,R,self,S);
}return false;
},removeListenerById:function(T){if(!this.$$disposed){return this.__cH.removeListenerById(this,T);
}return false;
},hasListener:function(U,V){return this.__cH.hasListener(this,U,V);
},dispatchEvent:function(W){if(!this.$$disposed){return this.__cH.dispatchEvent(this,W);
}return true;
},fireEvent:function(X,Y,ba){if(!this.$$disposed){return this.__cH.fireEvent(this,X,Y,ba);
}return true;
},fireNonBubblingEvent:function(bb,bc,bd){if(!this.$$disposed){return this.__cH.fireNonBubblingEvent(this,bb,bc,bd);
}return true;
},fireDataEvent:function(be,bf,bg,bh){if(!this.$$disposed){if(bg===undefined){bg=null;
}return this.__cH.fireNonBubblingEvent(this,be,qx.event.type.Data,[bf,bg,!!bh]);
}return true;
},__cI:null,setUserData:function(bi,bj){if(!this.__cI){this.__cI={};
}this.__cI[bi]=bj;
},getUserData:function(bk){if(!this.__cI){return null;
}var bl=this.__cI[bk];
return bl===undefined?null:bl;
},__cJ:qx.log.Logger,debug:function(bm){this.__cK(g,arguments);
},info:function(bn){this.__cK(m,arguments);
},warn:function(bo){this.__cK(h,arguments);
},error:function(bp){this.__cK(j,arguments);
},trace:function(){this.__cJ.trace(this);
},__cK:function(bq,br){var bs=qx.lang.Array.fromArguments(br);
bs.unshift(this);
this.__cJ[bq].apply(this.__cJ,bs);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{if(qx.core.Environment.get(s)>2){qx.Bootstrap.debug(this,"Disposing "+this.classname+"["+this.toHashCode()+"]");
}};
var bv=this.constructor;
var bt;

while(bv.superclass){if(bv.$$destructor){bv.$$destructor.call(this);
}if(bv.$$includes){bt=bv.$$flatIncludes;

for(var i=0,l=bt.length;i<l;i++){if(bt[i].$$destructor){bt[i].$$destructor.call(this);
}}}bv=bv.superclass;
}if(this.__cL){this.__cL();
}{if(qx.core.Environment.get(s)>0){var bw,bu;

for(bw in this){bu=this[bw];
if(bu!==null&&typeof bu===a&&!(qx.Bootstrap.isString(bu))){if(this.constructor.prototype[bw]!=null){continue;
}var by=navigator.userAgent.indexOf(o)!=-1;
var bx=navigator.userAgent.indexOf(q)!=-1;
if(by||bx){if(bu instanceof qx.core.Object||qx.core.Environment.get(s)>1){qx.Bootstrap.warn(this,"Missing destruct definition for '"+bw+"' in "+this.classname+"["+this.toHashCode()+"]: "+bu);
delete this[bw];
}}else{if(qx.core.Environment.get(s)>1){qx.Bootstrap.warn(this,"Missing destruct definition for '"+bw+"' in "+this.classname+"["+this.toHashCode()+"]: "+bu);
delete this[bw];
}}}}}};
},__cL:null,__cM:function(){var bz=qx.Class.getProperties(this.constructor);

for(var i=0,l=bz.length;i<l;i++){delete this[b+bz[i]];
}},_disposeObjects:function(bA){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(bB){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(bC){qx.util.DisposeUtil.disposeArray(this,bC);
},_disposeMap:function(bD){qx.util.DisposeUtil.disposeMap(this,bD);
}},environment:{"qx.disposerDebugLevel":0},defer:function(bE,bF){{qx.Class.include(bE,qx.core.MAssert);
};
var bH=navigator.userAgent.indexOf(q)!=-1;
var bG=navigator.userAgent.indexOf(o)!=-1;
if(bH||bG){bF.__cL=bF.__cM;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__cI=null;
var bK=this.constructor;
var bO;
var bP=qx.core.Property.$$store;
var bM=bP.user;
var bN=bP.theme;
var bI=bP.inherit;
var bL=bP.useinit;
var bJ=bP.init;

while(bK){bO=bK.$$properties;

if(bO){for(var name in bO){if(bO[name].dereference){this[bM[name]]=this[bN[name]]=this[bI[name]]=this[bL[name]]=this[bJ[name]]=undefined;
}}}bK=bK.superclass;
}}});
})();
(function(){var p='',o='"',m=':',l=']',h='null',g=': ',f='object',e='function',d=',',b='\n',ba='\\u',Y=',\n',X='0000',W='string',V="Cannot stringify a recursive object.",U='0',T='-',S='}',R='String',Q='Boolean',x='\\\\',y='\\f',u='\\t',w='{\n',s='[]',t="qx.lang.JsonImpl",q='Z',r='\\n',z='Object',A='{}',H='@',F='.',K='(',J='Array',M='T',L='\\r',C='{',P='JSON.parse',O=' ',N='[',B='Number',D=')',E='[\n',G='\\"',I='\\b';
qx.Class.define(t,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);
this.parse=qx.lang.Function.bind(this.parse,this);
},members:{__bY:null,__ca:null,__cb:null,__cc:null,stringify:function(bb,bc,bd){this.__bY=p;
this.__ca=p;
this.__cc=[];

if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));

for(var i=0;i<bd;i+=1){this.__ca+=O;
}}else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);
}this.__ca=bd;
}if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__cb=bc;
}else{this.__cb=null;
}return this.__cd(p,{'':bb});
},__cd:function(be,bf){var bi=this.__bY,bg,bj=bf[be];
if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);
}else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);
}if(typeof this.__cb===e){bj=this.__cb.call(bf,be,bj);
}
if(bj===null){return h;
}
if(bj===undefined){return undefined;
}switch(qx.lang.Type.getClass(bj)){case R:return this.__ce(bj);
case B:return isFinite(bj)?String(bj):h;
case Q:return String(bj);
case J:this.__bY+=this.__ca;
bg=[];

if(this.__cc.indexOf(bj)!==-1){throw new TypeError(V);
}this.__cc.push(bj);
var length=bj.length;

for(var i=0;i<length;i+=1){bg[i]=this.__cd(i,bj)||h;
}this.__cc.pop();
if(bg.length===0){var bh=s;
}else if(this.__bY){bh=E+this.__bY+bg.join(Y+this.__bY)+b+bi+l;
}else{bh=N+bg.join(d)+l;
}this.__bY=bi;
return bh;
case z:this.__bY+=this.__ca;
bg=[];

if(this.__cc.indexOf(bj)!==-1){throw new TypeError(V);
}this.__cc.push(bj);
if(this.__cb&&typeof this.__cb===f){var length=this.__cb.length;

for(var i=0;i<length;i+=1){var k=this.__cb[i];

if(typeof k===W){var v=this.__cd(k,bj);

if(v){bg.push(this.__ce(k)+(this.__bY?g:m)+v);
}}}}else{for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__cd(k,bj);

if(v){bg.push(this.__ce(k)+(this.__bY?g:m)+v);
}}}}this.__cc.pop();
if(bg.length===0){var bh=A;
}else if(this.__bY){bh=w+this.__bY+bg.join(Y+this.__bY)+b+bi+S;
}else{bh=C+bg.join(d)+S;
}this.__bY=bi;
return bh;
}},dateToJSON:function(bk){var bl=function(n){return n<10?U+n:n;
};
var bm=function(n){var bn=bl(n);
return n<100?U+bn:bn;
};
return isFinite(bk.valueOf())?bk.getUTCFullYear()+T+bl(bk.getUTCMonth()+1)+T+bl(bk.getUTCDate())+M+bl(bk.getUTCHours())+m+bl(bk.getUTCMinutes())+m+bl(bk.getUTCSeconds())+F+bm(bk.getUTCMilliseconds())+q:null;
},__ce:function(bo){var bp={'\b':I,'\t':u,'\n':r,'\f':y,'\r':L,'"':G,'\\':x};
var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bq.lastIndex=0;

if(bq.test(bo)){return o+bo.replace(bq,function(a){var c=bp[a];
return typeof c===W?c:ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
})+o;
}else{return o+bo+o;
}},parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bt.lastIndex=0;
if(bt.test(br)){br=br.replace(bt,function(a){return ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
});
}if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,H).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,l).replace(/(?:^|:|,)(?:\s*\[)+/g,p))){var j=eval(K+br+D);
return typeof bs===e?this.__cf({'':j},p,bs):j;
}throw new SyntaxError(P);
},__cf:function(bu,bv,bw){var bx=bu[bv];

if(bx&&typeof bx===f){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__cf(bx,k,bw);

if(v!==undefined){bx[k]=v;
}else{delete bx[k];
}}}}return bw.call(bu,bv,bx);
}}});
})();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){if(qx.Bootstrap.DEBUG){qx.core.Assert.assertNotUndefined(c);
}this.__bI=b+(c&&c.message?c.message:c);
Error.call(this,this.__bI);
this.__bL=d;
this.__bM=c;
},members:{__bM:null,__bL:null,__bI:null,toString:function(){return this.__bI;
},getArguments:function(){return this.__bL;
},getSourceException:function(){return this.__bM;
}},destruct:function(){this.__bM=null;
this.__bL=null;
this.__bI=null;
}});
})();
(function(){var a="qx.lang.Json";
qx.Class.define(a,{statics:{JSON:(qx.lang.Type.getClass(window.JSON)=="JSON"&&JSON.parse('{"x":1}').x===1&&JSON.stringify({"prop":"val"},function(k,v){return k==="prop"?"repl":v;
}).indexOf("repl")>0)?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;
b.parse=b.JSON.parse;
}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var e="Cannot stop propagation on a non bubbling event: ",d="Invalid argument value 'canBubble'.",c="Invalid argument value 'cancelable'.",b="qx.event.type.Event",a="Cannot prevent default action on a non cancelable event: ";
qx.Class.define(b,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(f,g){{if(f!==undefined){qx.core.Assert.assertBoolean(f,d);
}
if(g!==undefined){qx.core.Assert.assertBoolean(g,c);
}};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!f;
this._cancelable=!!g;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(h){if(h){var i=h;
}else{var i=qx.event.Pool.getInstance().getObject(this.constructor);
}i._type=this._type;
i._target=this._target;
i._currentTarget=this._currentTarget;
i._relatedTarget=this._relatedTarget;
i._originalTarget=this._originalTarget;
i._stopPropagation=this._stopPropagation;
i._bubbles=this._bubbles;
i._preventDefault=this._preventDefault;
i._cancelable=this._cancelable;
return i;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){{this.assertTrue(this._bubbles,e+this.getType());
};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{this.assertTrue(this._cancelable,a+this.getType());
};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(j){this._type=j;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(k){this._eventPhase=k;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(l){this._target=l;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(m){this._currentTarget=m;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(n){this._relatedTarget=n;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(o){this._originalTarget=o;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(p){this._bubbles=p;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(q){this._cancelable=q;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){qx.core.Object.call(this);
this.__cN={};

if(c!=null){this.setSize(c);
}},properties:{size:{check:a,init:Infinity}},members:{__cN:null,getObject:function(d){if(this.$$disposed){return new d;
}
if(!d){throw new Error("Class needs to be defined!");
}var e=null;
var f=this.__cN[d.classname];

if(f){e=f.pop();
}
if(e){e.$$pooled=false;
}else{e=new d;
}return e;
},poolObject:function(g){if(!this.__cN){return;
}var h=g.classname;
var j=this.__cN[h];

if(g.$$pooled){throw new Error("Object is already pooled: "+g);
}
if(!j){this.__cN[h]=j=[];
}if(j.length>this.getSize()){if(g.destroy){g.destroy();
}else{g.dispose();
}return;
}g.$$pooled=true;
j.push(g);
}},destruct:function(){var n=this.__cN;
var k,m,i,l;

for(k in n){m=n[k];

for(i=0,l=m.length;i<l;i++){m[i].dispose();
}}delete this.__cN;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(c,event,d){return !event.getBubbles();
},dispatchEvent:function(e,event,f){{if(e instanceof qx.core.Object){var j=qx.Class.getEventType(e.constructor,f);
var g=qx.Class.getByName(j);

if(!g){this.error("The event type '"+f+"' declared in the class '"+e.constructor+" is not an available class': "+j);
}else if(!(event instanceof g)){this.error("Expected event type to be instanceof '"+j+"' but found '"+event.classname+"'");
}}};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var k=this._manager.getListeners(e,f,false);

if(k){for(var i=0,l=k.length;i<l;i++){var h=k[i].context||e;
{if(h&&h.isDisposed&&h.isDisposed()){this.warn("The context object '"+h+"' for the event '"+f+"' of '"+e+"'is already disposed.");
}};
k[i].handler.call(h,event);
}}}},defer:function(m){qx.event.Registration.addDispatcher(m);
}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);
},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__cO:null,__cP:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);
this.__cO=b;
this.__cP=c;
return this;
},clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);
f.__cO=this.__cO;
f.__cP=this.__cP;
return f;
},getData:function(){return this.__cO;
},getOldData:function(){return this.__cP;
}},destruct:function(){this.__cO=this.__cP=null;
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeObjects:function(b,c,d){var name;

for(var i=0,l=c.length;i<l;i++){name=c[i];

if(b[name]==null||!b.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(b[name].dispose){if(!d&&b[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{b[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}b[name]=null;
}},disposeArray:function(e,f){var h=e[f];

if(!h){return;
}if(qx.core.ObjectRegistry.inShutDown){e[f]=null;
return;
}try{var g;

for(var i=h.length-1;i>=0;i--){g=h[i];

if(g){g.dispose();
}}}catch(j){throw new Error("The array field: "+f+" of object: "+e+" has non disposable entries: "+j);
}h.length=0;
e[f]=null;
},disposeMap:function(k,m){var o=k[m];

if(!o){return;
}if(qx.core.ObjectRegistry.inShutDown){k[m]=null;
return;
}try{var n;

for(var p in o){n=o[p];

if(o.hasOwnProperty(p)&&n){n.dispose();
}}}catch(q){throw new Error("The map field: "+m+" of object: "+k+" has non disposable entries: "+q);
}k[m]=null;
},disposeTriggeredBy:function(r,s){var t=s.dispose;
s.dispose=function(){t.call(s);
r.dispose();
};
}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();


if (typeof exports != "undefined") {for (var key in qx) {exports[key] = qx[key];}}