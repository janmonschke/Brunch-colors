(function (con) {
    // the dummy function
    function dummy() {};
    // console methods that may exist
    for(var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(','), func; func = methods.pop();) {
        con[func] = con[func] || dummy;
    }
}(window.console = window.console || {})); 
// we do this crazy little dance so that the `console` object
// inside the function is a name that can be shortened to a single
// letter by the compressor to make the compressed script as tiny
// as possible.
var canvasR = {
    context : null,
    width : 0,
    height : 0,
    "init" : function(_canvasElem){
        this.context = _canvasElem.getContext('2d');
        this.update();
    },
    "update" : function(){
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
    },
    "rect" : function(x,y,width,height,color){
        this.context.fillStyle = color;
        this.context.fillRect(x,y,width,height);
    },
    "alpha" : function(_alpha){
        this.context.globalAlpha = _alpha;
    }
};
// Underscore.js 1.1.6
// (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){var p=this,C=p._,m={},i=Array.prototype,n=Object.prototype,f=i.slice,D=i.unshift,E=n.toString,l=n.hasOwnProperty,s=i.forEach,t=i.map,u=i.reduce,v=i.reduceRight,w=i.filter,x=i.every,y=i.some,o=i.indexOf,z=i.lastIndexOf;n=Array.isArray;var F=Object.keys,q=Function.prototype.bind,b=function(a){return new j(a)};typeof module!=="undefined"&&module.exports?(module.exports=b,b._=b):p._=b;b.VERSION="1.1.6";var h=b.each=b.forEach=function(a,c,d){if(a!=null)if(s&&a.forEach===s)a.forEach(c,d);else if(b.isNumber(a.length))for(var e=
0,k=a.length;e<k;e++){if(c.call(d,a[e],e,a)===m)break}else for(e in a)if(l.call(a,e)&&c.call(d,a[e],e,a)===m)break};b.map=function(a,c,b){var e=[];if(a==null)return e;if(t&&a.map===t)return a.map(c,b);h(a,function(a,g,G){e[e.length]=c.call(b,a,g,G)});return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var k=d!==void 0;a==null&&(a=[]);if(u&&a.reduce===u)return e&&(c=b.bind(c,e)),k?a.reduce(c,d):a.reduce(c);h(a,function(a,b,f){!k&&b===0?(d=a,k=!0):d=c.call(e,d,a,b,f)});if(!k)throw new TypeError("Reduce of empty array with no initial value");
return d};b.reduceRight=b.foldr=function(a,c,d,e){a==null&&(a=[]);if(v&&a.reduceRight===v)return e&&(c=b.bind(c,e)),d!==void 0?a.reduceRight(c,d):a.reduceRight(c);a=(b.isArray(a)?a.slice():b.toArray(a)).reverse();return b.reduce(a,c,d,e)};b.find=b.detect=function(a,c,b){var e;A(a,function(a,g,f){if(c.call(b,a,g,f))return e=a,!0});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(w&&a.filter===w)return a.filter(c,b);h(a,function(a,g,f){c.call(b,a,g,f)&&(e[e.length]=a)});return e};
b.reject=function(a,c,b){var e=[];if(a==null)return e;h(a,function(a,g,f){c.call(b,a,g,f)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=!0;if(a==null)return e;if(x&&a.every===x)return a.every(c,b);h(a,function(a,g,f){if(!(e=e&&c.call(b,a,g,f)))return m});return e};var A=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=!1;if(a==null)return e;if(y&&a.some===y)return a.some(c,d);h(a,function(a,b,f){if(e=c.call(d,a,b,f))return m});return e};b.include=b.contains=function(a,c){var b=
!1;if(a==null)return b;if(o&&a.indexOf===o)return a.indexOf(c)!=-1;A(a,function(a){if(b=a===c)return!0});return b};b.invoke=function(a,c){var d=f.call(arguments,2);return b.map(a,function(a){return(c.call?c||a:a[c]).apply(a,d)})};b.pluck=function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);var e={computed:-Infinity};h(a,function(a,b,f){b=c?c.call(d,a,b,f):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,
c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);var e={computed:Infinity};h(a,function(a,b,f){b=c?c.call(d,a,b,f):a;b<e.computed&&(e={value:a,computed:b})});return e.value};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(a,b,f){return{value:a,criteria:c.call(d,a,b,f)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}),"value")};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=
function(a){if(!a)return[];if(a.toArray)return a.toArray();if(b.isArray(a))return a;if(b.isArguments(a))return f.call(a);return b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=b.head=function(a,b,d){return b!=null&&!d?f.call(a,0,b):a[0]};b.rest=b.tail=function(a,b,d){return f.call(a,b==null||d?1:b)};b.last=function(a){return a[a.length-1]};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a){return b.reduce(a,function(a,d){if(b.isArray(d))return a.concat(b.flatten(d));
a[a.length]=d;return a},[])};b.without=function(a){var c=f.call(arguments,1);return b.filter(a,function(a){return!b.include(c,a)})};b.uniq=b.unique=function(a,c){return b.reduce(a,function(a,e,f){if(0==f||(c===!0?b.last(a)!=e:!b.include(a,e)))a[a.length]=e;return a},[])};b.intersect=function(a){var c=f.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.zip=function(){for(var a=f.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),
e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d)return d=b.sortedIndex(a,c),a[d]===c?d:-1;if(o&&a.indexOf===o)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(z&&a.lastIndexOf===z)return a.lastIndexOf(b);for(var d=a.length;d--;)if(a[d]===b)return d;return-1};b.range=function(a,b,d){arguments.length<=1&&(b=a||0,a=0);d=arguments[2]||1;for(var e=Math.max(Math.ceil((b-a)/
d),0),f=0,g=Array(e);f<e;)g[f++]=a,a+=d;return g};b.bind=function(a,b){if(a.bind===q&&q)return q.apply(a,f.call(arguments,1));var d=f.call(arguments,2);return function(){return a.apply(b,d.concat(f.call(arguments)))}};b.bindAll=function(a){var c=f.call(arguments,1);c.length==0&&(c=b.functions(a));h(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var b=c.apply(this,arguments);return l.call(d,b)?d[b]:d[b]=a.apply(this,arguments)}};b.delay=
function(a,b){var d=f.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(f.call(arguments,1)))};var B=function(a,b,d){var e;return function(){var f=this,g=arguments,h=function(){e=null;a.apply(f,g)};d&&clearTimeout(e);if(d||!e)e=setTimeout(h,b)}};b.throttle=function(a,b){return B(a,b,!1)};b.debounce=function(a,b){return B(a,b,!0)};b.once=function(a){var b=!1,d;return function(){if(b)return d;b=!0;return d=a.apply(this,arguments)}};
b.wrap=function(a,b){return function(){var d=[a].concat(f.call(arguments));return b.apply(this,d)}};b.compose=function(){var a=f.call(arguments);return function(){for(var b=f.call(arguments),d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return function(){if(--a<1)return b.apply(this,arguments)}};b.keys=F||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[],d;for(d in a)l.call(a,d)&&(b[b.length]=d);return b};b.values=function(a){return b.map(a,
b.identity)};b.functions=b.methods=function(a){return b.filter(b.keys(a),function(c){return b.isFunction(a[c])}).sort()};b.extend=function(a){h(f.call(arguments,1),function(b){for(var d in b)b[d]!==void 0&&(a[d]=b[d])});return a};b.defaults=function(a){h(f.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,c){if(a===c)return!0;var d=typeof a;if(d!=
typeof c)return!1;if(a==c)return!0;if(!a&&c||a&&!c)return!1;if(a._chain)a=a._wrapped;if(c._chain)c=c._wrapped;if(a.isEqual)return a.isEqual(c);if(b.isDate(a)&&b.isDate(c))return a.getTime()===c.getTime();if(b.isNaN(a)&&b.isNaN(c))return!1;if(b.isRegExp(a)&&b.isRegExp(c))return a.source===c.source&&a.global===c.global&&a.ignoreCase===c.ignoreCase&&a.multiline===c.multiline;if(d!=="object")return!1;if(a.length&&a.length!==c.length)return!1;d=b.keys(a);var e=b.keys(c);if(d.length!=e.length)return!1;
for(var f in a)if(!(f in c)||!b.isEqual(a[f],c[f]))return!1;return!0};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(l.call(a,c))return!1;return!0};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=n||function(a){return E.call(a)==="[object Array]"};b.isArguments=function(a){return!(!a||!l.call(a,"callee"))};b.isFunction=function(a){return!(!a||!a.constructor||!a.call||!a.apply)};b.isString=function(a){return!!(a===""||a&&a.charCodeAt&&a.substr)};
b.isNumber=function(a){return!!(a===0||a&&a.toExponential&&a.toFixed)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===!0||a===!1};b.isDate=function(a){return!(!a||!a.getTimezoneOffset||!a.setUTCFullYear)};b.isRegExp=function(a){return!(!a||!a.test||!a.exec||!(a.ignoreCase||a.ignoreCase===!1))};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.noConflict=function(){p._=C;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=
0;e<a;e++)b.call(d,e)};b.mixin=function(a){h(b.functions(a),function(c){H(c,b[c]=a[c])})};var I=0;b.uniqueId=function(a){var b=I++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g};b.template=function(a,c){var d=b.templateSettings;d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.interpolate,function(a,b){return"',"+b.replace(/\\'/g,"'")+",'"}).replace(d.evaluate||
null,function(a,b){return"');"+b.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";d=new Function("obj",d);return c?d(c):d};var j=function(a){this._wrapped=a};b.prototype=j.prototype;var r=function(a,c){return c?b(a).chain():a},H=function(a,c){j.prototype[a]=function(){var a=f.call(arguments);D.call(a,this._wrapped);return r(c.apply(b,a),this._chain)}};b.mixin(b);h(["pop","push","reverse","shift","sort",
"splice","unshift"],function(a){var b=i[a];j.prototype[a]=function(){b.apply(this._wrapped,arguments);return r(this._wrapped,this._chain)}});h(["concat","join","slice"],function(a){var b=i[a];j.prototype[a]=function(){return r(b.apply(this._wrapped,arguments),this._chain)}});j.prototype.chain=function(){this._chain=!0;return this};j.prototype.value=function(){return this._wrapped}})();
// Backbone.js 0.5.2
// (c) 2010 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://documentcloud.github.com/backbone
(function(){var h=this,p=h.Backbone,e;e=typeof exports!=="undefined"?exports:h.Backbone={};e.VERSION="0.5.2";var f=h._;if(!f&&typeof require!=="undefined")f=require("underscore")._;var g=h.jQuery||h.Zepto;e.noConflict=function(){h.Backbone=p;return this};e.emulateHTTP=!1;e.emulateJSON=!1;e.Events={bind:function(a,b,c){var d=this._callbacks||(this._callbacks={});(d[a]||(d[a]=[])).push([b,c]);return this},unbind:function(a,b){var c;if(a){if(c=this._callbacks)if(b){c=c[a];if(!c)return this;for(var d=
0,e=c.length;d<e;d++)if(c[d]&&b===c[d][0]){c[d]=null;break}}else c[a]=[]}else this._callbacks={};return this},trigger:function(a){var b,c,d,e,f=2;if(!(c=this._callbacks))return this;for(;f--;)if(b=f?a:"all",b=c[b])for(var g=0,h=b.length;g<h;g++)(d=b[g])?(e=f?Array.prototype.slice.call(arguments,1):arguments,d[0].apply(d[1]||this,e)):(b.splice(g,1),g--,h--);return this}};e.Model=function(a,b){var c;a||(a={});if(c=this.defaults)f.isFunction(c)&&(c=c.call(this)),a=f.extend({},c,a);this.attributes={};
this._escapedAttributes={};this.cid=f.uniqueId("c");this.set(a,{silent:!0});this._changed=!1;this._previousAttributes=f.clone(this.attributes);if(b&&b.collection)this.collection=b.collection;this.initialize(a,b)};f.extend(e.Model.prototype,e.Events,{_previousAttributes:null,_changed:!1,idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.attributes[a];
return this._escapedAttributes[a]=(b==null?"":""+b).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},has:function(a){return this.attributes[a]!=null},set:function(a,b){b||(b={});if(!a)return this;if(a.attributes)a=a.attributes;var c=this.attributes,d=this._escapedAttributes;if(!b.silent&&this.validate&&!this._performValidation(a,b))return!1;if(this.idAttribute in a)this.id=a[this.idAttribute];
var e=this._changing;this._changing=!0;for(var g in a){var h=a[g];if(!f.isEqual(c[g],h))c[g]=h,delete d[g],this._changed=!0,b.silent||this.trigger("change:"+g,this,h,b)}!e&&!b.silent&&this._changed&&this.change(b);this._changing=!1;return this},unset:function(a,b){if(!(a in this.attributes))return this;b||(b={});var c={};c[a]=void 0;if(!b.silent&&this.validate&&!this._performValidation(c,b))return!1;delete this.attributes[a];delete this._escapedAttributes[a];a==this.idAttribute&&delete this.id;this._changed=
!0;b.silent||(this.trigger("change:"+a,this,void 0,b),this.change(b));return this},clear:function(a){a||(a={});var b,c=this.attributes,d={};for(b in c)d[b]=void 0;if(!a.silent&&this.validate&&!this._performValidation(d,a))return!1;this.attributes={};this._escapedAttributes={};this._changed=!0;if(!a.silent){for(b in c)this.trigger("change:"+b,this,void 0,a);this.change(a)}return this},fetch:function(a){a||(a={});var b=this,c=a.success;a.success=function(d,e,f){if(!b.set(b.parse(d,f),a))return!1;c&&
c(b,d)};a.error=i(a.error,b,a);return(this.sync||e.sync).call(this,"read",this,a)},save:function(a,b){b||(b={});if(a&&!this.set(a,b))return!1;var c=this,d=b.success;b.success=function(a,e,f){if(!c.set(c.parse(a,f),b))return!1;d&&d(c,a,f)};b.error=i(b.error,c,b);var f=this.isNew()?"create":"update";return(this.sync||e.sync).call(this,f,this,b)},destroy:function(a){a||(a={});if(this.isNew())return this.trigger("destroy",this,this.collection,a);var b=this,c=a.success;a.success=function(d){b.trigger("destroy",
b,b.collection,a);c&&c(b,d)};a.error=i(a.error,b,a);return(this.sync||e.sync).call(this,"delete",this,a)},url:function(){var a=k(this.collection)||this.urlRoot||l();if(this.isNew())return a;return a+(a.charAt(a.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this)},isNew:function(){return this.id==null},change:function(a){this.trigger("change",this,a);this._previousAttributes=f.clone(this.attributes);this._changed=!1},hasChanged:function(a){if(a)return this._previousAttributes[a]!=
this.attributes[a];return this._changed},changedAttributes:function(a){a||(a=this.attributes);var b=this._previousAttributes,c=!1,d;for(d in a)f.isEqual(b[d],a[d])||(c=c||{},c[d]=a[d]);return c},previous:function(a){if(!a||!this._previousAttributes)return null;return this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},_performValidation:function(a,b){var c=this.validate(a);if(c)return b.error?b.error(this,c,b):this.trigger("error",this,c,b),!1;return!0}});
e.Collection=function(a,b){b||(b={});if(b.comparator)this.comparator=b.comparator;f.bindAll(this,"_onModelEvent","_removeReference");this._reset();a&&this.reset(a,{silent:!0});this.initialize.apply(this,arguments)};f.extend(e.Collection.prototype,e.Events,{model:e.Model,initialize:function(){},toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,b){if(f.isArray(a))for(var c=0,d=a.length;c<d;c++)this._add(a[c],b);else this._add(a,b);return this},remove:function(a,b){if(f.isArray(a))for(var c=
0,d=a.length;c<d;c++)this._remove(a[c],b);else this._remove(a,b);return this},get:function(a){if(a==null)return null;return this._byId[a.id!=null?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");this.models=this.sortBy(this.comparator);a.silent||this.trigger("reset",this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},
reset:function(a,b){a||(a=[]);b||(b={});this.each(this._removeReference);this._reset();this.add(a,{silent:!0});b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a||(a={});var b=this,c=a.success;a.success=function(d,f,e){b[a.add?"add":"reset"](b.parse(d,e),a);c&&c(b,d)};a.error=i(a.error,b,a);return(this.sync||e.sync).call(this,"read",this,a)},create:function(a,b){var c=this;b||(b={});a=this._prepareModel(a,b);if(!a)return!1;var d=b.success;b.success=function(a,e,f){c.add(a,b);
d&&d(a,e,f)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId={};this._byCid={}},_prepareModel:function(a,b){if(a instanceof e.Model){if(!a.collection)a.collection=this}else{var c=a;a=new this.model(c,{collection:this});a.validate&&!a._performValidation(c,b)&&(a=!1)}return a},_add:function(a,b){b||(b={});a=this._prepareModel(a,b);if(!a)return!1;var c=this.getByCid(a);if(c)throw Error(["Can't add the same model to a set twice",
c.id]);this._byId[a.id]=a;this._byCid[a.cid]=a;this.models.splice(b.at!=null?b.at:this.comparator?this.sortedIndex(a,this.comparator):this.length,0,a);a.bind("all",this._onModelEvent);this.length++;b.silent||a.trigger("add",a,this,b);return a},_remove:function(a,b){b||(b={});a=this.getByCid(a)||this.get(a);if(!a)return null;delete this._byId[a.id];delete this._byCid[a.cid];this.models.splice(this.indexOf(a),1);this.length--;b.silent||a.trigger("remove",a,this,b);this._removeReference(a);return a},
_removeReference:function(a){this==a.collection&&delete a.collection;a.unbind("all",this._onModelEvent)},_onModelEvent:function(a,b,c,d){(a=="add"||a=="remove")&&c!=this||(a=="destroy"&&this._remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments))}});f.each(["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max",
"min","sortBy","sortedIndex","toArray","size","first","rest","last","without","indexOf","lastIndexOf","isEmpty"],function(a){e.Collection.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});e.Router=function(a){a||(a={});if(a.routes)this.routes=a.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var q=/:([\w\d]+)/g,r=/\*([\w\d]+)/g,s=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(e.Router.prototype,e.Events,{initialize:function(){},route:function(a,b,c){e.history||
(e.history=new e.History);f.isRegExp(a)||(a=this._routeToRegExp(a));e.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d))},this))},navigate:function(a,b){e.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(s,"\\$&").replace(q,"([^/]*)").replace(r,
"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});e.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")};var j=/^#*/,t=/msie [\w.]+/,m=!1;f.extend(e.History.prototype,{interval:50,getFragment:function(a,b){if(a==null)if(this._hasPushState||b){a=window.location.pathname;var c=window.location.search;c&&(a+=c);a.indexOf(this.options.root)==0&&(a=a.substr(this.options.root.length))}else a=window.location.hash;return a.replace(j,"")},start:function(a){if(m)throw Error("Backbone.history has already been started");
this.options=f.extend({},{root:"/"},this.options,a);this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);a=this.getFragment();var b=document.documentMode;if(b=t.exec(navigator.userAgent.toLowerCase())&&(!b||b<=7))this.iframe=g('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);this._hasPushState?g(window).bind("popstate",this.checkUrl):"onhashchange"in window&&!b?
g(window).bind("hashchange",this.checkUrl):setInterval(this.checkUrl,this.interval);this.fragment=a;m=!0;a=window.location;b=a.pathname==this.options.root;if(this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;else if(this._wantsPushState&&this._hasPushState&&b&&a.hash)this.fragment=a.hash.replace(j,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment);
return this.loadUrl()},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.iframe.location.hash));if(a==this.fragment||a==decodeURIComponent(this.fragment))return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return f.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0})},
navigate:function(a,b){var c=(a||"").replace(j,"");if(!(this.fragment==c||this.fragment==decodeURIComponent(c))){if(this._hasPushState){var d=window.location;c.indexOf(this.options.root)!=0&&(c=this.options.root+c);this.fragment=c;window.history.pushState({},document.title,d.protocol+"//"+d.host+c)}else if(window.location.hash=this.fragment=c,this.iframe&&c!=this.getFragment(this.iframe.location.hash))this.iframe.document.open().close(),this.iframe.location.hash=c;b&&this.loadUrl(a)}}});e.View=function(a){this.cid=
f.uniqueId("view");this._configure(a||{});this._ensureElement();this.delegateEvents();this.initialize.apply(this,arguments)};var u=/^(\S+)\s*(.*)$/,n=["model","collection","el","id","attributes","className","tagName"];f.extend(e.View.prototype,e.Events,{tagName:"div",$:function(a){return g(a,this.el)},initialize:function(){},render:function(){return this},remove:function(){g(this.el).remove();return this},make:function(a,b,c){a=document.createElement(a);b&&g(a).attr(b);c&&g(a).html(c);return a},delegateEvents:function(a){if(a||
(a=this.events))for(var b in g(this.el).unbind(".delegateEvents"+this.cid),a){var c=this[a[b]];if(!c)throw Error('Event "'+a[b]+'" does not exist');var d=b.match(u),e=d[1];d=d[2];c=f.bind(c,this);e+=".delegateEvents"+this.cid;d===""?g(this.el).bind(e,c):g(this.el).delegate(d,e,c)}},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=n.length;b<c;b++){var d=n[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el){if(f.isString(this.el))this.el=
g(this.el).get(0)}else{var a=this.attributes||{};if(this.id)a.id=this.id;if(this.className)a["class"]=this.className;this.el=this.make(this.tagName,a)}}});e.Model.extend=e.Collection.extend=e.Router.extend=e.View.extend=function(a,b){var c=v(this,a,b);c.extend=this.extend;return c};var w={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};e.sync=function(a,b,c){var d=w[a];c=f.extend({type:d,dataType:"json"},c);if(!c.url)c.url=k(b)||l();if(!c.data&&b&&(a=="create"||a=="update"))c.contentType=
"application/json",c.data=JSON.stringify(b.toJSON());if(e.emulateJSON)c.contentType="application/x-www-form-urlencoded",c.data=c.data?{model:c.data}:{};if(e.emulateHTTP&&(d==="PUT"||d==="DELETE")){if(e.emulateJSON)c.data._method=d;c.type="POST";c.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)}}if(c.type!=="GET")c.processData=!1;return g.ajax(c)};var o=function(){},v=function(a,b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){return a.apply(this,arguments)};
f.extend(d,a);o.prototype=a.prototype;d.prototype=new o;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},k=function(a){if(!a||!a.url)return null;return f.isFunction(a.url)?a.url():a.url},l=function(){throw Error('A "url" property or function must be specified');},i=function(a,b,c){return function(d){a?a(b,d,c):b.trigger("error",b,d,c)}}}).call(this);
(function() {
  /*
  (c) 2011 Jan Monschke
  v1.0
  backbone-couchdb.js is licensed under the MIT license.
  */  var con;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Backbone.couch_connector = con = {
    config: {
      db_name: "backbone_connect",
      ddoc_name: "backbone_example",
      view_name: "byCollection",
      global_changes: false,
      base_url: null
    },
    helpers: {
      extract_collection_name: function(model) {
        var _name, _splitted;
        if (model == null) {
          throw new Error("No model has been passed");
        }
        if (!(((model.collection != null) && (model.collection.url != null)) || (model.url != null))) {
          return "";
        }
        if (model.url != null) {
          _name = _.isFunction(model.url) ? model.url() : model.url;
        } else {
          _name = _.isFunction(model.collection.url) ? model.collection.url() : model.collection.url;
        }
        if (_name[0] === "/") {
          _name = _name.slice(1, _name.length);
        }
        _splitted = _name.split("/");
        _name = _splitted.length > 0 ? _splitted[0] : _name;
        _name = _name.replace("/", "");
        return _name;
      },
      make_db: function() {
        var db;
        db = $.couch.db(con.config.db_name);
        if (con.config.base_url != null) {
          db.uri = "" + con.config.base_url + "/" + con.config.db_name + "/";
        }
        return db;
      }
    },
    read: function(model, opts) {
      if (model.models) {
        return con.read_collection(model, opts);
      } else {
        return con.read_model(model, opts);
      }
    },
    read_collection: function(coll, opts) {
      var keys, _ref, _view;
      _view = this.config.view_name;
      keys = [this.helpers.extract_collection_name(coll)];
      if (coll.db != null) {
        if (coll.db.changes || this.config.global_changes) {
          coll.listen_to_changes();
        }
        if (coll.db.view != null) {
          _view = coll.db.view;
          keys = (_ref = coll.db.keys) != null ? _ref : null;
        }
      }
      return this.helpers.make_db().view("" + this.config.ddoc_name + "/" + _view, {
        keys: keys,
        success: __bind(function(data) {
          var doc, _i, _len, _ref, _temp;
          _temp = [];
          _ref = data.rows;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            doc = _ref[_i];
            _temp.push(doc.value);
          }
          return opts.success(_temp);
        }, this),
        error: function() {
          return opts.error();
        }
      });
    },
    read_model: function(model, opts) {
      if (!model.id) {
        throw new Error("The model has no id property, so it can't get fetched from the database");
      }
      return this.helpers.make_db().openDoc(model.id, {
        success: function(doc) {
          return opts.success(doc);
        },
        error: function() {
          return opts.error();
        }
      });
    },
    create: function(model, opts) {
      var coll, vals;
      vals = model.toJSON();
      coll = this.helpers.extract_collection_name(model);
      if (coll.length > 0) {
        vals.collection = coll;
      }
      return this.helpers.make_db().saveDoc(vals, {
        success: function(doc) {
          return opts.success({
            _id: doc.id,
            _rev: doc.rev
          });
        },
        error: function() {
          return opts.error();
        }
      });
    },
    update: function(model, opts) {
      return this.create(model, opts);
    },
    del: function(model, opts) {
      return this.helpers.make_db().removeDoc(model.toJSON(), {
        success: function() {
          return opts.success();
        },
        error: function(nr, req, e) {
          if (e === "deleted") {
            return opts.success();
          } else {
            return opts.error();
          }
        }
      });
    }
  };
  Backbone.sync = function(method, model, opts) {
    switch (method) {
      case "read":
        return con.read(model, opts);
      case "create":
        return con.create(model, opts);
      case "update":
        return con.update(model, opts);
      case "delete":
        return con.del(model, opts);
    }
  };
  Backbone.Collection = (function() {
    function Collection() {
      this._db_on_change = __bind(this._db_on_change, this);;
      this._db_prepared_for_changes = __bind(this._db_prepared_for_changes, this);;      Collection.__super__.constructor.apply(this, arguments);
    }
    __extends(Collection, Backbone.Collection);
    Collection.prototype.initialize = function() {
      if (!this._db_changes_enabled && ((this.db && this.db.changes) || con.config.global_changes)) {
        return this.listen_to_changes();
      }
    };
    Collection.prototype.listen_to_changes = function() {
      if (!this._db_changes_enabled) {
        this._db_changes_enabled = true;
        if (!this._db_inst) {
          this._db_inst = con.helpers.make_db();
        }
        window.db_inst = this._db_inst;
        console.log(db_inst);
        return this._db_inst.info({
          "beforeSend" : function(){
            console.log(arguments, this)
          },
          "success": this._db_prepared_for_changes
        });
      }
    };
    Collection.prototype.stop_changes = function() {
      this._db_changes_enabled = false;
      if (this._db_changes_handler != null) {
        this._db_changes_handler.stop();
        return this._db_changes_handler = null;
      }
    };
    Collection.prototype._db_prepared_for_changes = function(data) {
      var opts;
      this._db_update_seq = data.update_seq || 0;
      opts = {
        include_docs: true,
        collection: con.helpers.extract_collection_name(this),
        filter: "" + con.config.ddoc_name + "/by_collection"
      };
      _.extend(opts, this.db);
      return _.defer(__bind(function() {
        this._db_changes_handler = this._db_inst.changes(this._db_update_seq, opts);
        return this._db_changes_handler.onChange(this._db_on_change);
      }, this));
    };
    Collection.prototype._db_on_change = function(changes) {
      var obj, _doc, _i, _len, _ref, _results;
      _ref = changes.results;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _doc = _ref[_i];
        obj = this.get(_doc.id);
        _results.push(obj != null ? _doc.deleted ? this.remove(obj) : obj.get("_rev") !== _doc.doc._rev ? obj.set(_doc.doc) : void 0 : !_doc.deleted ? this.add(_doc.doc) : void 0);
      }
      return _results;
    };
    return Collection;
  })();
  Backbone.Model = (function() {
    function Model() {
      Model.__super__.constructor.apply(this, arguments);
    }
    __extends(Model, Backbone.Model);
    Model.prototype.idAttribute = "_id";
    return Model;
  })();
}).call(this);

/** returns the element with the given id */
function id(_id){
    return document.getElementById(_id);
};
/** adds an eventlistener to the given element */
function event(name,elem,func){
    elem.addEventListener(name,func,false);
};
/** click on desktop and touchend on supported mobile*/
function action(elem,func){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.indexOf("iphone") != -1 || ua.indexOf("ipod") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("android") != -1)
        event("touchend",elem,func);
    else
        event("click",elem,func);
};
/** sets the inner html of the given element */
function html(elem,html){
    elem.innerHTML = html;
};
function hide(elem){
	elem.style.display = "none";
};
function show(elem){
	elem.style.display = "block";
};
/** do something over all the elements in the collection*/
function each(collection,func){
    for (var i=0; i < collection.length; i++)
        func(collection[i],i);
};
/** calls the function for each child elem with elem and index as params*/
function eachChildTag(elem,tagName,func){
    each(elem.getElementsByTagName(tagName),func);
};
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var module = cache[name], path = expand(root, name), fn;
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: name, exports: {}};
        try {
          cache[name] = module.exports;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return cache[name] = module.exports;
        } catch (err) {
          delete cache[name];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"collections/games_collection": function(exports, require, module) {(function() {
  var Game;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Game = require("models/game").Game;
  exports.GamesCollection = (function() {
    function GamesCollection() {
      GamesCollection.__super__.constructor.apply(this, arguments);
    }
    __extends(GamesCollection, Backbone.Collection);
    GamesCollection.prototype.model = Game;
    GamesCollection.prototype.url = "/games";
    return GamesCollection;
  })();
}).call(this);
}, "controllers/MainController": function(exports, require, module) {(function() {
  var Game, GameView, GamesCollection, HighscoreView, HomeView, InstructionsView, LoadingView, NotificationView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  LoadingView = require("views/LoadingView").LoadingView;
  HomeView = require("views/home_view").HomeView;
  InstructionsView = require("views/InstructionsView").InstructionsView;
  GameView = require("views/game_view").GameView;
  HighscoreView = require("views/HighscoreView").HighscoreView;
  NotificationView = require("views/notification_view").NotificationView;
  Game = require("models/game").Game;
  GamesCollection = require("collections/games_collection").GamesCollection;
  exports.MainController = (function() {
    __extends(MainController, Backbone.Router);
    MainController.prototype.routes = {
      "": "home",
      "/": "home",
      "/home": "home",
      "/homebmb=1": "home",
      "/instructions": "instructions",
      "/play/new": "play_new",
      "/play/:id": "play",
      "/highscores": "highscores"
    };
    function MainController() {
      MainController.__super__.constructor.apply(this, arguments);
      app.collections.games = new GamesCollection();
      this.bind("all", function(msg) {
        if (typeof _gaq != "undefined" && _gaq !== null) {
          return _gaq.push(['_trackPageview', msg.replace(/route:/, '')]);
        }
      });
      this.init_loading_view();
      this.init_notifications();
    }
    MainController.prototype.home = function() {
      this.navigate("/home");
      return new HomeView().render();
    };
    MainController.prototype.instructions = function() {
      this.navigate("/instructions");
      return new InstructionsView().render();
    };
    MainController.prototype.play_new = function() {
      var that;
      that = this;
      app.views.loadingview.show("Generating new field...");
      return $.ajax({
        url: "/_uuids",
        dataType: "json",
        success: function(resp) {
          var game;
          game = new Game();
          game.id = resp.uuids[0];
          game.set({
            "_id": game.id
          });
          app.collections.games.add(game, {
            silent: true
          });
          return that.play(game.id);
        },
        error: function() {
          return alert("Couldn't connect to DB-Server, try again later!");
        },
        complete: function() {
          return app.views.loadingview.hide();
        }
      });
    };
    MainController.prototype.play = function(id) {
      var game, that;
      this.navigate("/play/" + id);
      game = app.collections.games.get(id);
      that = this;
      if (game != null) {
        return that.get_fb_name_and_render_game(game);
      } else {
        app.views.loadingview.show("Loading field...");
        return $.ajax({
          url: "/brunch_colors/" + id,
          dataType: 'json',
          success: function(game) {
            game = new Game(game);
            app.collections.games.add(game, {
              silent: true
            });
            return that.get_fb_name_and_render_game(game);
          },
          error: function() {
            alert("Couldn't find game by id. Started new game instead.");
            return that.play_new();
          }
        });
      }
    };
    MainController.prototype.get_fb_name_and_render_game = function(game) {
      if (FB) {
        return FB.api('/me', function(response) {
          if (response.name) {
            game.set({
              'player': response.name
            });
          }
          new GameView({
            model: game
          }).render();
          return app.views.loadingview.hide();
        });
      } else {
        return new GameView({
          model: game
        }).render();
      }
    };
    MainController.prototype.highscores = function() {
      this.navigate("/highscores");
      return new HighscoreView();
    };
    MainController.prototype.init_loading_view = function() {
      return app.views.loadingview = new LoadingView();
    };
    MainController.prototype.init_notifications = function() {
      $("#add").click(function() {
        var g;
        g = new Game();
        app.collections.games.add(g);
        return g.save();
      });
      return new NotificationView().render();
    };
    return MainController;
  })();
}).call(this);
}, "main": function(exports, require, module) {(function() {
  var MainController;
  Backbone.couch_connector.config.db_name = "brunch_colors";
  Backbone.couch_connector.config.ddoc_name = "brunch_colors_game";
  Backbone.couch_connector.config.global_changes = true;
  window.app = {};
  app.controllers = {};
  app.collections = {};
  app.models = {};
  app.views = {};
  app.configs = {};
  MainController = require('controllers/MainController').MainController;
  $(document).ready(function() {
    app.controllers.main = new MainController();
    return Backbone.history.start();
  });
}).call(this);
}, "models/game": function(exports, require, module) {(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  exports.Game = (function() {
    function Game() {
      Game.__super__.constructor.apply(this, arguments);
    }
    __extends(Game, Backbone.Model);
    Game.prototype.defaults = {
      "moves_needed": -1,
      "free": -1,
      "stop": "#",
      "colors": ["#0000ff", "#ff5555", "#00ffaa", "#ee00ff", "#fff000"],
      "field": {}
    };
    Game.prototype.initialize = function(opts) {
      this.set({
        "created_at": new Date().getTime()
      });
      this.set({
        "player": app.configs.player || opts.player || "unnamed"
      });
      return this.set({
        "original_player": opts.player != null ? opts.player : void 0
      });
    };
    Game.prototype.next = function(color) {
      var moves;
      if (!this.game_is_over()) {
        this.recalc_field(color, 0);
        moves = this.get("moves_needed");
        moves++;
        return this.set({
          "moves_needed": moves
        });
      } else {
        return this.trigger("game_over");
      }
    };
    Game.prototype.recalc_field = function(_newCcolor, player) {};
    Game.prototype.game_is_over = function() {
      return "test";
    };
    return Game;
  })();
}).call(this);
}, "templates/GameOver": function(exports, require, module) {module.exports = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      if (!this.original_moves || (this.original_moves > this.moves_needed)) {
        _print(_safe('\n  <p>\n    New Highscore for this field with '));
        _print(this.moves_needed);
        _print(_safe(' moves. <br />\n    Challenge your friends and send them this url: <input type="text" style="width: 350px; font-size: 8pt;" value=\''));
        _print(this.link);
        _print(_safe('\' />  \n  </p>\n  <p>\n    Or directly post the link on your Facebook wall so that all your Facebook friends can try to beat your Highscore!\n    <div id="fb"></div>\n  </p>\n'));
      } else {
        _print(_safe('\n  <p>\n    You didn\'t score better than the previous player!\n  </p>\n'));
      }
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};}, "templates/HighscoreEntry": function(exports, require, module) {module.exports = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<td>'));
      _print(_safe(this.player.substring(0, 10)));
      _print(_safe('</td><td>'));
      _print(_safe(this.moves_needed));
      _print(_safe('</td><td><a href=\'#/play/'));
      _print(this._id);
      _print(_safe('\'>Beat this one!</a></td>'));
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};}, "templates/HighscoreView": function(exports, require, module) {module.exports = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('See best <span class="button">25</span>, <span class="button">50</span> or <span class="button">100</span> players.\n<table>\n  <thead>\n    <tr>\n      <th>Name:</th>\n      <th>Moves:</th>\n      <th></th>\n    </tr>\n  </thead>\n</table>'));
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};}, "templates/game_view": function(exports, require, module) {module.exports = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('Player: <input type="text" id="player_name" value=\''));
      _print(this.player);
      _print(_safe('\' class=\'name\' />\n'));
      if (this.original_moves != null) {
        _print(_safe('\n  <p>Highscore: '));
        _print(this.original_moves);
        _print(_safe('\n  by '));
        _print(this.original_player.substring(0, 20));
        _print(_safe('</p>\n'));
      }
      _print(_safe('\n<ul id="controls"></ul>\n<div id="messagez"></div>\n<div id="canvas_wrapper"><canvas id="canvas" width="400" height="400" style="margin-top: 20px;"></canvas></div>\n<div id="ui">\n    <div id="menu"></div>\n\t\t<div id="stats"></div>\n</div>'));
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};}, "templates/home": function(exports, require, module) {module.exports = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<p>\n  Brunch-Colors is a simple, addictive color-matching game. Learn how to play <a href="#!instructions">here</a> or start playing <a href="#!play/new">right now</a>. Don\'t forget to challenge your friends after finishing a field!\n</p>\n<p>\n  This game was written with <a href="http://brunchwithcoffee.org">brunch</a>, a client-side framework powered by components like CoffeeScript and Backbone.js. As a backend it uses CouchDB / couchapp.\n</p>'));
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};}, "templates/instructionsview": function(exports, require, module) {module.exports = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<p>\n  You start in the upper left corner with a single rectangle. By clicking on a color in the color list at the top, you choose which of the neighbour fields you would like to take over. After each step the field is redrawn and the step counter increased. Aim of the game is to take over all of the fields.\n</p>\n<p>\n  <h3>Challenge your friends!</h3>\n  You can easily challenge your friends by sending them the url of your finished game or directly by posting it to your Facebook wall. They will then be able to play the same field that you just played. When they score better than you they can take away your highscore but you can simply try again to beat their new highscore.\n</p>\n<p>\n  All finished games will be sent to the highscore-list. There you can look up the 100 best games played and you can even try to beat other players\' highscores.\n</p>\n<p>\n  Whenever someone finishes a game you will receive a notification so that you can immediately try to beat his/her highscore.\n</p>'));
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};}, "templates/notification_element": function(exports, require, module) {module.exports = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<span>New highscore by '));
      _print(this.original_player.substring(0, 20));
      _print(_safe('! '));
      _print(this.moves_needed);
      _print(_safe(' moves needed.\n'));
      if (this.id != null) {
        _print(_safe('\n  <a href="#/play/'));
        _print(this.id);
        _print(_safe('">Beat the highscore now!</a> </span>'));
      }
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};}, "views/HighscoreEntry": function(exports, require, module) {(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  exports.HighscoreEntry = (function() {
    function HighscoreEntry() {
      HighscoreEntry.__super__.constructor.apply(this, arguments);
    }
    __extends(HighscoreEntry, Backbone.View);
    HighscoreEntry.prototype.tagName = "tr";
    HighscoreEntry.prototype.initialize = function() {
      this.el = $(this.el);
      return this.template = require("templates/HighscoreEntry");
    };
    HighscoreEntry.prototype.render = function() {
      this.el.html(this.template(this.model));
      return this;
    };
    return HighscoreEntry;
  })();
}).call(this);
}, "views/HighscoreView": function(exports, require, module) {(function() {
  var Game, HighscoreEntry;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  HighscoreEntry = require("views/HighscoreEntry").HighscoreEntry;
  Game = require("models/game").Game;
  exports.HighscoreView = (function() {
    function HighscoreView() {
      this.amount_clicked = __bind(this.amount_clicked, this);;
      this.received = __bind(this.received, this);;      HighscoreView.__super__.constructor.apply(this, arguments);
    }
    __extends(HighscoreView, Backbone.View);
    HighscoreView.prototype.amount = "25";
    HighscoreView.prototype.initialize = function() {
      this.template = require("templates/HighscoreView");
      this.el = $('#content');
      return this.fetch_highscores();
    };
    HighscoreView.prototype.events = {
      "click .button": "amount_clicked"
    };
    HighscoreView.prototype.fetch_highscores = function() {
      app.views.loadingview.show("Loading Highscores...");
      return $.getJSON("/brunch_colors/_design/brunch_colors_game/_view/highscores?limit=" + this.amount + "&include_docs=true", this.received);
    };
    HighscoreView.prototype.received = function(data) {
      app.views.loadingview.hide();
      this.rows = data.rows;
      return this.render();
    };
    HighscoreView.prototype.amount_clicked = function(e) {
      this.amount = $(e.currentTarget).text();
      return this.fetch_highscores();
    };
    HighscoreView.prototype.render = function() {
      var table, that;
      this.el.html(this.template());
      table = this.$('table');
      that = this;
      _.each(this.rows, function(game) {
        var g;
        g = new Game(game.doc);
        g.id = game.doc._id;
        app.collections.games.add(g, {
          silent: true
        });
        return table.append(new HighscoreEntry({
          model: game.doc
        }).render().el);
      });
      return this.delegateEvents();
    };
    return HighscoreView;
  })();
}).call(this);
}, "views/InstructionsView": function(exports, require, module) {(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  exports.InstructionsView = (function() {
    function InstructionsView() {
      InstructionsView.__super__.constructor.apply(this, arguments);
    }
    __extends(InstructionsView, Backbone.View);
    InstructionsView.prototype.initialize = function() {
      this.el = $("#content");
      return this.template = require("templates/instructionsview");
    };
    InstructionsView.prototype.render = function() {
      return this.el.html(this.template());
    };
    return InstructionsView;
  })();
}).call(this);
}, "views/LoadingView": function(exports, require, module) {(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  exports.LoadingView = (function() {
    function LoadingView() {
      LoadingView.__super__.constructor.apply(this, arguments);
    }
    __extends(LoadingView, Backbone.View);
    LoadingView.prototype.initialize = function() {
      return this.el = $('#loading');
    };
    LoadingView.prototype.show = function(text) {
      this.el.html("<img src='images/ajax-loader.gif' /> " + text);
      return this.el.slideDown();
    };
    LoadingView.prototype.hide = function() {
      return this.el.slideUp();
    };
    return LoadingView;
  })();
}).call(this);
}, "views/game_view": function(exports, require, module) {(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  exports.GameView = (function() {
    function GameView() {
      this.game_over = __bind(this.game_over, this);;
      this.update_moves = __bind(this.update_moves, this);;
      this.update_name = __bind(this.update_name, this);;      GameView.__super__.constructor.apply(this, arguments);
    }
    __extends(GameView, Backbone.View);
    GameView.prototype.initialize = function() {
      this.el = $("#content");
      this.template = require("templates/game_view");
      this.model.bind("change:moves_needed", this.update_moves);
      this.model.bind("gameover", this.game_over);
      if (!(this.model.get('moves_needed') < 0)) {
        return this.original_moves = this.model.get('moves_needed');
      }
    };
    GameView.prototype.render = function() {
      var vals;
      vals = this.model.toJSON();
      vals.original_moves = this.original_moves;
      this.el.html(this.template(vals));
      $('#player_name').blur(this.update_name);
      return this.legacy();
    };
    GameView.prototype.update_name = function(e) {
      var element;
      element = $(e.currentTarget);
      this.model.set({
        "player": element.val()
      });
      return app.configs.player = element.val();
    };
    GameView.prototype.update_moves = function(model, moves) {
      return $('#stats').html("Moves: " + moves);
    };
    GameView.prototype.game_over = function() {
      var vals;
      this.link = "http://brunch-colors.com/#/play/" + this.model.id;
      vals = {
        original_moves: this.original_moves,
        moves_needed: this.model.get('moves_needed'),
        link: this.link
      };
      $('#messagez').html(require("templates/GameOver")(vals));
      $("#canvas").remove();
      if (!vals.original_moves || vals.original_moves > vals.moves_needed) {
        this.model.save();
        return this.start_FB();
      }
    };
    GameView.prototype.start_FB = function() {
      var moves, render_post_button, show_login, that;
      that = this;
      show_login = function() {
        $('#fb').html('<fb:login-button perms="publish_stream" show-faces="true" width="400" max-rows="1"></fb:login-button>');
        if (FB) {
          return FB.XFBML.parse();
        }
      };
      moves = this.model.get("moves_needed");
      render_post_button = function() {
        $('#fb').html("<button id='fb_post'>Challenge your friends on Facebook</button>");
        return $('#fb_post').click(function() {
          if (FB) {
            return FB.ui({
              method: 'feed',
              message: "Can you beat my highscore on Brunch-Colors? (" + moves + " moves)",
              link: that.link,
              picture: "http://img.ly/system/uploads/000/735/352/original_brunch_logo.png"
            }, function(response) {});
          }
        });
      };
      FB.getLoginStatus(function(response) {
        if (response.session) {
          return render_post_button();
        } else {
          return show_login();
        }
      });
      return FB.Event.subscribe('auth.login', function(response) {
        return render_post_button();
      });
    };
    GameView.prototype.legacy = function() {

    that = this;
    window.cb = {
    	testfield : "124312343123412332123431231344432"
    };
    cb.users = [{
    	name : "John",
    	lastColor : -1,
    	steps : 0,
    	fillColor : "#999",
    	fieldPercentage : 0
    }];

    cb.activeUser = 0;

    cb.colors = ["#E54661","#FFA644","#998A2F","#2C594F","#002D40"];

    cb.field = null;

    cb.logic = {
    	// 0:singpleplayer, 1:2playerround, 2:2playerkamikaze
    	mode : 0,
    	player : 1,
    	opponent  : 2,
    	free : -1,
    	stop : "#",
    	init : function(){
    		//	TODO: only single player atm
    		cb.field.possessions[0][0] = 0;
    		cb.ui.init();
    		cb.ui.update();
    	},
    	next : function(color){
    	    if(!cb.logic.isGameOver()){
    		    cb.logic.recalcField(color, cb.activeUser);
    		    cb.users[cb.activeUser].steps++;
    		    that.model.set({"moves_needed" : cb.users[cb.activeUser].steps});
    		    cb.ui.update();
    		}else{
    		    console.log("Game is over");
    		}
    	},
    	recalcField : function(_newColor,_by){
    		var l1 = cb.field.possessions.length;
    		var l2 = cb.field.possessions[0].length;
    		for(var y = 0; y<l1; y++){

    			for(var x = 0; x < l2; x++){
    				if(cb.logic.fieldIsColor(_newColor,x,y) && cb.logic.fieldIsFree(x, y)
    				        && cb.logic.playerHasNeighbourField(_by, x, y)){
    					cb.logic.takePossessionOf(_by,_newColor, x, y)
    				}
    			}
    		}
    		cb.logic.updateColorsByPlayer(_newColor, _by);
    	},
    	isGameOver : function(){
    	    return (cb.users[cb.activeUser].fieldPercentage == 100);
    	},
    	fieldIsColor : function(color,x,y){
    		return (cb.field.colors[y][x] == color);
    	},
    	fieldIsFree : function(x,y){
    		return (cb.field.possessions[y][x] == cb.logic.free);
    	},
    	playerHasNeighbourField : function(player,x,y){
    		if(x > 0 && cb.field.possessions[y][x-1] == player) // to the left
    			return true;
    		if(x < cb.field.possessions[y].length - 1 && cb.field.possessions[y][x+1] == player) // to the right
    			return true;
    		if(y > 0  && cb.field.possessions[y-1][x] == player) // above
    			return true;
    		if(y < cb.field.possessions.length -1  && cb.field.possessions[y+1][x] == player) // underneath
    			return true;
    		return false;
    	},
    	takePossessionOf : function(player,color,x,y){
    	  cb.field.possessions[y][x] = player;
    		cb.field.colors[y][x] = color;
    	  if(x > 0 && cb.logic.fieldIsColor(color,x-1,y) && cb.field.possessions[y][x-1] != player){ // to the left
    			this.takePossessionOf(player,color,x-1,y);
    		}
    		if(x < cb.field.possessions[y].length - 1 && cb.logic.fieldIsColor(color,x+1,y) && cb.field.possessions[y][x+1] != player){ // to the right
    			this.takePossessionOf(player,color,x+1,y);
    		}
    		if(y > 0  && cb.logic.fieldIsColor(color,x,y-1) && cb.field.possessions[y]-1[x] != player){ // above
    			this.takePossessionOf(player,color,x,y-1);
    		}
    		if(y < cb.field.possessions.length -1  && cb.logic.fieldIsColor(color,x,y+1) && cb.field.possessions[y+1][x] != player){ // underneath
    			this.takePossessionOf(player,color,x,y+1);
    		}
    	},
    	updateColorsByPlayer : function(_color,_player){
    		var len1 = cb.field.colors.length;
    		var len2 = cb.field.colors[0].length;
    		var totalRects = len1*len2;
    		var playerRects = 0;
    		for(var i = 0; i < len1; i++){
    			for(var j = 0; j < len2; j++){
    				if(cb.field.possessions[i][j] == _player){
    					cb.field.colors[i][j] = _color;
    					playerRects++;
    				}
    			}
    		}

    		if(playerRects == totalRects)
    		    cb.users[_player].fieldPercentage = 100;
    		else
    		    cb.users[_player].fieldPercentage = Math.floor(100 * (playerRects/totalRects));
    	}
    };

    cb.ui = {
      model : this.model,
        init : function(){
            this.showAllColors();
        },
    	update : function(){
    		displayField(cb.field.colors);
    		var act = cb.users[cb.activeUser];
    		console.log("Steps count: " + act.steps + "Percentage: " + act.fieldPercentage);
        if(act.fieldPercentage == 100){
          this.model.set({ "field" : cb.field });
          this.model.trigger("gameover");
        }
		    var vals = {
		      "moves_needed" : act.steps
		    };
		    this.model.set(vals);
    	},

    	showAllColors : function(){
    		var newHtml = "";
    		var len = cb.colors.length;
    		for(var i = 0; i < len; i++){
    			newHtml += "<li class='color' style='background-color:"+cb.colors[i]+";color:"+cb.colors[i]+";'></li>";
    		}
    		newHtml += "";
    		$('#controls').html(newHtml);

    		eachChildTag(id('controls'),"li",function(elem,index){
    		    action(elem,function(){
    		        cb.logic.next(index);
    		    });
    		});
    	}
    };

    window.Utils = {
    	makeArrayOfChars : function(str,len){
    		ret = [];
    		row = [];
    		strlen = str.length;
    		for ( var ind = 0; ind < strlen; ind++) {
    			currChar = str[ind];
    			row.push(currChar);
    			if(row.length == len){
    				ret.push(row);
    				row = [];
    			}
    		}
    		return ret;
    	},
    	printField : function(_field){
    	    //calculate rect sizes
    	    var width = Math.floor(canvasR.width / _field.length);
    	    var height = Math.floor(canvasR.height / _field[0].length);
    	    len = _field.length;
    	    var a = new Date();
    		for(i = 0; i < len; i++){
    			len2 = _field[i].length;

    			for(u=0; u < len2; u++){
    				var color = cb.colors[cb.field.colors[i][u]];
    				if(cb.field.possessions[i][u] != -1){
    				    color = cb.users[cb.field.possessions[i][u]].fillColor;
    				}
    				canvasR.rect((i)*width,(u)*height,width,height,color);
    			}
    		}
    	},
    	generateRandomField : function(_width,_height,_colors){
    		field = {};
    		field.colors = _colors || [];
    		field.possessions = [];
    		currow = [];
    		currowPos = [];
    		for(i = 0; i < _height; i++){
    			currow = [];
    			currowPos = [];
    			for(u = 0; u < _width; u++){
    				currow.push(Utils.generateRandomColor(cb.colors.length));
    				currowPos.push(cb.logic.free);
    			}
    			if(!_colors)
            field.colors.push(currow);
          field.possessions.push(currowPos);
    		}
    		field.original = []
    		for(i = 0; i < _height; i++){
    		  field.original.push([])
    		  for(u = 0; u < _width; u++){
    		    field.original[i].push(field.colors[i][u]);
    			}
    		}
    		return field;
    	},
    	generateRandomColor : function(nrColors){
    		ret = Math.random() * (nrColors-1);
    		return  Math.floor(ret + 0.5);
    	}
    };

    function displayField(_f){

    	Utils.printField(_f);
    };
    canvasR.init(document.getElementById('canvas'));
    window.cb.field = window.Utils.generateRandomField(20,20,this.model.get("field").original);
    window.cb.logic.init();

    ;      return this;
    };
    return GameView;
  })();
}).call(this);
}, "views/home_view": function(exports, require, module) {(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  exports.HomeView = (function() {
    function HomeView() {
      HomeView.__super__.constructor.apply(this, arguments);
    }
    __extends(HomeView, Backbone.View);
    HomeView.prototype.initialize = function() {
      return this.el = $('#content');
    };
    HomeView.prototype.render = function() {
      return this.el.html(require("templates/home"));
    };
    return HomeView;
  })();
}).call(this);
}, "views/notification_element": function(exports, require, module) {(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  exports.NotificationElement = (function() {
    function NotificationElement() {
      this.hide = __bind(this.hide, this);;      NotificationElement.__super__.constructor.apply(this, arguments);
    }
    __extends(NotificationElement, Backbone.View);
    NotificationElement.prototype.className = "notification_element";
    NotificationElement.prototype.render = function() {
      var vals;
      this.el = this.$(this.el);
      vals = this.model.toJSON();
      vals.id = this.model.id;
      this.el.html(require("templates/notification_element")(vals));
      window.setTimeout(this.hide, 5000);
      this.el.click(this.hide);
      return this;
    };
    NotificationElement.prototype.hide = function() {
      var that;
      that = this;
      return this.el.fadeOut("slow", function() {
        return that.el.remove();
      });
    };
    return NotificationElement;
  })();
}).call(this);
}, "views/notification_view": function(exports, require, module) {(function() {
  var NotificationElement;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  NotificationElement = require("views/notification_element").NotificationElement;
  exports.NotificationView = (function() {
    function NotificationView() {
      this.add = __bind(this.add, this);;      NotificationView.__super__.constructor.apply(this, arguments);
    }
    __extends(NotificationView, Backbone.View);
    NotificationView.prototype.initialize = function() {
      this.el = $('#notification-view');
      return app.collections.games.bind("add", this.add);
    };
    NotificationView.prototype.render = function() {};
    NotificationView.prototype.add = function(model) {
      var new_element;
      new_element = new NotificationElement({
        "model": model
      });
      return this.el.append(new_element.render().el);
    };
    return NotificationView;
  })();
}).call(this);
}});
