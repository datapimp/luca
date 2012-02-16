// Underscore.js 1.2.1
// (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function u(a,c,d){if(a===c)return a!==0||1/a==1/c;if(a==null||c==null)return a===c;if(a._chain)a=a._wrapped;if(c._chain)c=c._wrapped;if(b.isFunction(a.isEqual))return a.isEqual(c);if(b.isFunction(c.isEqual))return c.isEqual(a);var e=typeof a;if(e!=typeof c)return false;if(!a!=!c)return false;if(b.isNaN(a))return b.isNaN(c);var g=b.isString(a),f=b.isString(c);if(g||f)return g&&f&&String(a)==String(c);g=b.isNumber(a);f=b.isNumber(c);if(g||f)return g&&f&&+a==+c;g=b.isBoolean(a);f=b.isBoolean(c);
if(g||f)return g&&f&&+a==+c;g=b.isDate(a);f=b.isDate(c);if(g||f)return g&&f&&a.getTime()==c.getTime();g=b.isRegExp(a);f=b.isRegExp(c);if(g||f)return g&&f&&a.source==c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase;if(e!="object")return false;if(a.length!==c.length)return false;if(a.constructor!==c.constructor)return false;for(e=d.length;e--;)if(d[e]==a)return true;d.push(a);var e=0,g=true,h;for(h in a)if(m.call(a,h)&&(e++,!(g=m.call(c,h)&&u(a[h],c[h],d))))break;if(g){for(h in c)if(m.call(c,
h)&&!e--)break;g=!e}d.pop();return g}var r=this,F=r._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,G=k.unshift,l=p.toString,m=p.hasOwnProperty,v=k.forEach,w=k.map,x=k.reduce,y=k.reduceRight,z=k.filter,A=k.every,B=k.some,q=k.indexOf,C=k.lastIndexOf,p=Array.isArray,H=Object.keys,s=Function.prototype.bind,b=function(a){return new n(a)};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)exports=module.exports=b;exports._=b}else typeof define==="function"&&define.amd?
define("underscore",function(){return b}):r._=b;b.VERSION="1.2.1";var j=b.each=b.forEach=function(a,c,b){if(a!=null)if(v&&a.forEach===v)a.forEach(c,b);else if(a.length===+a.length)for(var e=0,g=a.length;e<g;e++){if(e in a&&c.call(b,a[e],e,a)===o)break}else for(e in a)if(m.call(a,e)&&c.call(b,a[e],e,a)===o)break};b.map=function(a,c,b){var e=[];if(a==null)return e;if(w&&a.map===w)return a.map(c,b);j(a,function(a,f,h){e[e.length]=c.call(b,a,f,h)});return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var g=
d!==void 0;a==null&&(a=[]);if(x&&a.reduce===x)return e&&(c=b.bind(c,e)),g?a.reduce(c,d):a.reduce(c);j(a,function(a,b,i){g?d=c.call(e,d,a,b,i):(d=a,g=true)});if(!g)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){a==null&&(a=[]);if(y&&a.reduceRight===y)return e&&(c=b.bind(c,e)),d!==void 0?a.reduceRight(c,d):a.reduceRight(c);a=(b.isArray(a)?a.slice():b.toArray(a)).reverse();return b.reduce(a,c,d,e)};b.find=b.detect=function(a,c,b){var e;
D(a,function(a,f,h){if(c.call(b,a,f,h))return e=a,true});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.filter===z)return a.filter(c,b);j(a,function(a,f,h){c.call(b,a,f,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,f,h){c.call(b,a,f,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(A&&a.every===A)return a.every(c,b);j(a,function(a,f,h){if(!(e=e&&c.call(b,a,f,h)))return o});
return e};var D=b.some=b.any=function(a,c,d){var c=c||b.identity,e=false;if(a==null)return e;if(B&&a.some===B)return a.some(c,d);j(a,function(a,b,h){if(e|=c.call(d,a,b,h))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;return q&&a.indexOf===q?a.indexOf(c)!=-1:b=D(a,function(a){if(a===c)return true})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(c.call?c||a:a[c]).apply(a,d)})};b.pluck=function(a,c){return b.map(a,function(a){return a[c]})};
b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;
j(a,function(a,g){g==0?b[0]=a:(d=Math.floor(Math.random()*(g+1)),b[g]=b[d],b[d]=a)});return b};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(a,b,f){return{value:a,criteria:c.call(d,a,b,f)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,g=a.length;e<
g;){var f=e+g>>1;d(a[f])<d(c)?e=f+1:g=f}return e};b.toArray=function(a){return!a?[]:a.toArray?a.toArray():b.isArray(a)?i.call(a):b.isArguments(a)?i.call(a):b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=b.head=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,a.length-b):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=
function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,e=[];b.reduce(d,function(d,f,h){if(0==h||(c===true?b.last(d)!=f:!b.include(d,f)))d[d.length]=f,e[e.length]=a[h];return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};
b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a,c){return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d)return d=b.sortedIndex(a,c),a[d]===c?d:-1;if(q&&a.indexOf===q)return a.indexOf(c);
for(d=0,e=a.length;d<e;d++)if(a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(C&&a.lastIndexOf===C)return a.lastIndexOf(b);for(var d=a.length;d--;)if(a[d]===b)return d;return-1};b.range=function(a,b,d){arguments.length<=1&&(b=a||0,a=0);for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),g=0,f=Array(e);g<e;)f[g++]=a,a+=d;return f};var E=function(){};b.bind=function(a,c){var d,e;if(a.bind===s&&s)return s.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;
e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));E.prototype=a.prototype;var b=new E,f=a.apply(b,e.concat(i.call(arguments)));return Object(f)===f?f:b}};b.bindAll=function(a){var c=i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var b=c.apply(this,arguments);return m.call(d,b)?d[b]:d[b]=a.apply(this,arguments)}};b.delay=
function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,g,f,h;h=b.debounce(function(){f=false},c);return function(){e=this;g=arguments;var b;d||(d=setTimeout(function(){d=null;a.apply(e,g);h()},c));f||a.apply(e,g);h&&h();f=true}};b.debounce=function(a,b){var d;return function(){var e=this,g=arguments;clearTimeout(d);d=setTimeout(function(){d=null;a.apply(e,
g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments));return b.apply(this,d)}};b.compose=function(){var a=i.call(arguments);return function(){for(var b=i.call(arguments),d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return function(){if(--a<1)return b.apply(this,arguments)}};b.keys=H||function(a){if(a!==Object(a))throw new TypeError("Invalid object");
var b=[],d;for(d in a)m.call(a,d)&&(b[b.length]=d);return b};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)b[d]!==void 0&&(a[d]=b[d])});return a};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},
a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return u(a,b,[])};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(m.call(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=l.call(arguments)=="[object Arguments]"?function(a){return l.call(a)=="[object Arguments]"}:function(a){return!(!a||!m.call(a,
"callee"))};b.isFunction=function(a){return l.call(a)=="[object Function]"};b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===
void 0};b.noConflict=function(){r._=F;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.mixin=function(a){j(b.functions(a),function(c){I(c,b[c]=a[c])})};var J=0;b.uniqueId=function(a){var b=J++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};b.template=function(a,c){var d=b.templateSettings,d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.escape,function(a,b){return"',_.escape("+b.replace(/\\'/g,"'")+"),'"}).replace(d.interpolate,function(a,b){return"',"+b.replace(/\\'/g,"'")+",'"}).replace(d.evaluate||null,function(a,b){return"');"+b.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,
"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",d=new Function("obj",d);return c?d(c):d};var n=function(a){this._wrapped=a};b.prototype=n.prototype;var t=function(a,c){return c?b(a).chain():a},I=function(a,c){n.prototype[a]=function(){var a=i.call(arguments);G.call(a,this._wrapped);return t(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];n.prototype[a]=function(){b.apply(this._wrapped,arguments);return t(this._wrapped,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];n.prototype[a]=function(){return t(b.apply(this._wrapped,arguments),this._chain)}});n.prototype.chain=function(){this._chain=true;return this};n.prototype.value=function(){return this._wrapped}})();
(function(k){var o=String.prototype.trim,l=function(a,b){for(var c=[];b>0;c[--b]=a);return c.join("")},d=function(a){return function(){for(var b=Array.prototype.slice.call(arguments),c=0;c<b.length;c++)b[c]=b[c]==null?"":""+b[c];return a.apply(null,b)}},m=function(){function a(a){return Object.prototype.toString.call(a).slice(8,-1).toLowerCase()}var b=function(){b.cache.hasOwnProperty(arguments[0])||(b.cache[arguments[0]]=b.parse(arguments[0]));return b.format.call(null,b.cache[arguments[0]],arguments)};
b.format=function(b,n){var e=1,d=b.length,f="",j=[],h,i,g,k;for(h=0;h<d;h++)if(f=a(b[h]),f==="string")j.push(b[h]);else if(f==="array"){g=b[h];if(g[2]){f=n[e];for(i=0;i<g[2].length;i++){if(!f.hasOwnProperty(g[2][i]))throw m('[_.sprintf] property "%s" does not exist',g[2][i]);f=f[g[2][i]]}}else f=g[1]?n[g[1]]:n[e++];if(/[^s]/.test(g[8])&&a(f)!="number")throw m("[_.sprintf] expecting number but found %s",a(f));switch(g[8]){case "b":f=f.toString(2);break;case "c":f=String.fromCharCode(f);break;case "d":f=
parseInt(f,10);break;case "e":f=g[7]?f.toExponential(g[7]):f.toExponential();break;case "f":f=g[7]?parseFloat(f).toFixed(g[7]):parseFloat(f);break;case "o":f=f.toString(8);break;case "s":f=(f=String(f))&&g[7]?f.substring(0,g[7]):f;break;case "u":f=Math.abs(f);break;case "x":f=f.toString(16);break;case "X":f=f.toString(16).toUpperCase()}f=/[def]/.test(g[8])&&g[3]&&f>=0?"+"+f:f;i=g[4]?g[4]=="0"?"0":g[4].charAt(1):" ";k=g[6]-String(f).length;i=g[6]?l(i,k):"";j.push(g[5]?f+i:i+f)}return j.join("")};b.cache=
{};b.parse=function(a){for(var b=[],e=[],d=0;a;){if((b=/^[^\x25]+/.exec(a))!==null)e.push(b[0]);else if((b=/^\x25{2}/.exec(a))!==null)e.push("%");else if((b=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(a))!==null){if(b[2]){d|=1;var f=[],j=b[2],h=[];if((h=/^([a-z_][a-z_\d]*)/i.exec(j))!==null)for(f.push(h[1]);(j=j.substring(h[0].length))!=="";)if((h=/^\.([a-z_][a-z_\d]*)/i.exec(j))!==null)f.push(h[1]);else if((h=/^\[(\d+)\]/.exec(j))!==null)f.push(h[1]);
else throw"[_.sprintf] huh?";else throw"[_.sprintf] huh?";b[2]=f}else d|=2;if(d===3)throw"[_.sprintf] mixing positional and named placeholders is not (yet) supported";e.push(b)}else throw"[_.sprintf] huh?";a=a.substring(b[0].length)}return e};return b}(),e={VERSION:"1.2.0",isBlank:d(function(a){return/^\s*$/.test(a)}),stripTags:d(function(a){return a.replace(/<\/?[^>]+>/ig,"")}),capitalize:d(function(a){return a.charAt(0).toUpperCase()+a.substring(1).toLowerCase()}),chop:d(function(a,b){for(var b=
b*1||0||a.length,c=[],e=0;e<a.length;)c.push(a.slice(e,e+b)),e+=b;return c}),clean:d(function(a){return e.strip(a.replace(/\s+/g," "))}),count:d(function(a,b){for(var c=0,e,d=0;d<a.length;)e=a.indexOf(b,d),e>=0&&c++,d=d+(e>=0?e:0)+b.length;return c}),chars:d(function(a){return a.split("")}),escapeHTML:d(function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}),unescapeHTML:d(function(a){return a.replace(/&lt;/g,"<").replace(/&gt;/g,
">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,"&")}),escapeRegExp:d(function(a){return a.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")}),insert:d(function(a,b,c){a=a.split("");a.splice(b*1||0,0,c);return a.join("")}),include:d(function(a,b){return a.indexOf(b)!==-1}),join:d(function(a){var b=Array.prototype.slice.call(arguments);return b.join(b.shift())}),lines:d(function(a){return a.split("\n")}),reverse:d(function(a){return Array.prototype.reverse.apply(String(a).split("")).join("")}),
splice:d(function(a,b,c,e){a=a.split("");a.splice(b*1||0,c*1||0,e);return a.join("")}),startsWith:d(function(a,b){return a.length>=b.length&&a.substring(0,b.length)===b}),endsWith:d(function(a,b){return a.length>=b.length&&a.substring(a.length-b.length)===b}),succ:d(function(a){var b=a.split("");b.splice(a.length-1,1,String.fromCharCode(a.charCodeAt(a.length-1)+1));return b.join("")}),titleize:d(function(a){for(var a=a.split(" "),b,c=0;c<a.length;c++)b=a[c].split(""),typeof b[0]!=="undefined"&&(b[0]=
b[0].toUpperCase()),c+1===a.length?a[c]=b.join(""):a[c]=b.join("")+" ";return a.join("")}),camelize:d(function(a){return e.trim(a).replace(/(\-|_|\s)+(.)?/g,function(a,c,e){return e?e.toUpperCase():""})}),underscored:function(a){return e.trim(a).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/\-|\s+/g,"_").toLowerCase()},dasherize:function(a){return e.trim(a).replace(/([a-z\d])([A-Z]+)/g,"$1-$2").replace(/^([A-Z]+)/,"-$1").replace(/\_|\s+/g,"-").toLowerCase()},humanize:function(a){return e.capitalize(this.underscored(a).replace(/_id$/,
"").replace(/_/g," "))},trim:d(function(a,b){if(!b&&o)return o.call(a);b=b?e.escapeRegExp(b):"\\s";return a.replace(RegExp("^["+b+"]+|["+b+"]+$","g"),"")}),ltrim:d(function(a,b){b=b?e.escapeRegExp(b):"\\s";return a.replace(RegExp("^["+b+"]+","g"),"")}),rtrim:d(function(a,b){b=b?e.escapeRegExp(b):"\\s";return a.replace(RegExp("["+b+"]+$","g"),"")}),truncate:d(function(a,b,c){b=b*1||0;return a.length>b?a.slice(0,b)+(c||"..."):a}),prune:d(function(a,b,c){var c=c||"...",b=b*1||0,d="",d=a.substring(b-
1,b+1).search(/^\w\w$/)===0?e.rtrim(a.slice(0,b).replace(/([\W][\w]*)$/,"")):e.rtrim(a.slice(0,b)),d=d.replace(/\W+$/,"");return d.length+c.length>a.length?a:d+c}),words:function(a,b){return String(a).split(b||" ")},pad:d(function(a,b,c,e){var d="",d=0,b=b*1||0;c?c.length>1&&(c=c.charAt(0)):c=" ";switch(e){case "right":d=b-a.length;d=l(c,d);a+=d;break;case "both":d=b-a.length;d={left:l(c,Math.ceil(d/2)),right:l(c,Math.floor(d/2))};a=d.left+a+d.right;break;default:d=b-a.length,d=l(c,d),a=d+a}return a}),
lpad:function(a,b,c){return e.pad(a,b,c)},rpad:function(a,b,c){return e.pad(a,b,c,"right")},lrpad:function(a,b,c){return e.pad(a,b,c,"both")},sprintf:m,vsprintf:function(a,b){b.unshift(a);return m.apply(null,b)},toNumber:function(a,b){var c;c=(a*1||0).toFixed(b*1||0)*1||0;return!(c===0&&a!=="0"&&a!==0)?c:Number.NaN},strRight:d(function(a,b){var c=!b?-1:a.indexOf(b);return c!=-1?a.slice(c+b.length,a.length):a}),strRightBack:d(function(a,b){var c=!b?-1:a.lastIndexOf(b);return c!=-1?a.slice(c+b.length,
a.length):a}),strLeft:d(function(a,b){var c=!b?-1:a.indexOf(b);return c!=-1?a.slice(0,c):a}),strLeftBack:d(function(a,b){var c=a.lastIndexOf(b);return c!=-1?a.slice(0,c):a}),exports:function(){var a={},b;for(b in this)if(this.hasOwnProperty(b)&&!(b=="include"||b=="contains"||b=="reverse"))a[b]=this[b];return a}};e.strip=e.trim;e.lstrip=e.ltrim;e.rstrip=e.rtrim;e.center=e.lrpad;e.ljust=e.lpad;e.rjust=e.rpad;e.contains=e.include;if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)module.exports=
e;exports._s=e}else typeof k._!=="undefined"?(k._.string=e,k._.str=k._.string):k._={string:e,str:e}})(this||window);
// Backbone.js 0.5.3
// (c) 2010 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://documentcloud.github.com/backbone
(function(){var h=this,p=h.Backbone,e;e=typeof exports!=="undefined"?exports:h.Backbone={};e.VERSION="0.5.3";var f=h._;if(!f&&typeof require!=="undefined")f=require("underscore")._;var g=h.jQuery||h.Zepto;e.noConflict=function(){h.Backbone=p;return this};e.emulateHTTP=!1;e.emulateJSON=!1;e.Events={bind:function(a,b,c){var d=this._callbacks||(this._callbacks={});(d[a]||(d[a]=[])).push([b,c]);return this},unbind:function(a,b){var c;if(a){if(c=this._callbacks)if(b){c=c[a];if(!c)return this;for(var d=
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
"min","sortBy","sortedIndex","toArray","size","first","rest","last","without","indexOf","lastIndexOf","isEmpty","groupBy"],function(a){e.Collection.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});e.Router=function(a){a||(a={});if(a.routes)this.routes=a.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var q=/:([\w\d]+)/g,r=/\*([\w\d]+)/g,s=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(e.Router.prototype,e.Events,{initialize:function(){},route:function(a,
b,c){e.history||(e.history=new e.History);f.isRegExp(a)||(a=this._routeToRegExp(a));e.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d))},this))},navigate:function(a,b){e.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(s,"\\$&").replace(q,
"([^/]*)").replace(r,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});e.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")};var j=/^#*/,t=/msie [\w.]+/,m=!1;f.extend(e.History.prototype,{interval:50,getFragment:function(a,b){if(a==null)if(this._hasPushState||b){a=window.location.pathname;var c=window.location.search;c&&(a+=c);a.indexOf(this.options.root)==0&&(a=a.substr(this.options.root.length))}else a=window.location.hash;return decodeURIComponent(a.replace(j,
""))},start:function(a){if(m)throw Error("Backbone.history has already been started");this.options=f.extend({},{root:"/"},this.options,a);this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);a=this.getFragment();var b=document.documentMode;if(b=t.exec(navigator.userAgent.toLowerCase())&&(!b||b<=7))this.iframe=g('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);
this._hasPushState?g(window).bind("popstate",this.checkUrl):"onhashchange"in window&&!b?g(window).bind("hashchange",this.checkUrl):setInterval(this.checkUrl,this.interval);this.fragment=a;m=!0;a=window.location;b=a.pathname==this.options.root;if(this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;else if(this._wantsPushState&&this._hasPushState&&b&&a.hash)this.fragment=a.hash.replace(j,""),window.history.replaceState({},
document.title,a.protocol+"//"+a.host+this.options.root+this.fragment);if(!this.options.silent)return this.loadUrl()},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.iframe.location.hash));if(a==this.fragment||a==decodeURIComponent(this.fragment))return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(a){var b=this.fragment=this.getFragment(a);
return f.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){var c=(a||"").replace(j,"");if(!(this.fragment==c||this.fragment==decodeURIComponent(c))){if(this._hasPushState){var d=window.location;c.indexOf(this.options.root)!=0&&(c=this.options.root+c);this.fragment=c;window.history.pushState({},document.title,d.protocol+"//"+d.host+c)}else if(window.location.hash=this.fragment=c,this.iframe&&c!=this.getFragment(this.iframe.location.hash))this.iframe.document.open().close(),
this.iframe.location.hash=c;b&&this.loadUrl(a)}}});e.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.delegateEvents();this.initialize.apply(this,arguments)};var u=/^(\S+)\s*(.*)$/,n=["model","collection","el","id","attributes","className","tagName"];f.extend(e.View.prototype,e.Events,{tagName:"div",$:function(a){return g(a,this.el)},initialize:function(){},render:function(){return this},remove:function(){g(this.el).remove();return this},make:function(a,
b,c){a=document.createElement(a);b&&g(a).attr(b);c&&g(a).html(c);return a},delegateEvents:function(a){if(a||(a=this.events))for(var b in f.isFunction(a)&&(a=a.call(this)),g(this.el).unbind(".delegateEvents"+this.cid),a){var c=this[a[b]];if(!c)throw Error('Event "'+a[b]+'" does not exist');var d=b.match(u),e=d[1];d=d[2];c=f.bind(c,this);e+=".delegateEvents"+this.cid;d===""?g(this.el).bind(e,c):g(this.el).delegate(d,e,c)}},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=
0,c=n.length;b<c;b++){var d=n[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el){if(f.isString(this.el))this.el=g(this.el).get(0)}else{var a=this.attributes||{};if(this.id)a.id=this.id;if(this.className)a["class"]=this.className;this.el=this.make(this.tagName,a)}}});e.Model.extend=e.Collection.extend=e.Router.extend=e.View.extend=function(a,b){var c=v(this,a,b);c.extend=this.extend;return c};var w={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};e.sync=function(a,
b,c){var d=w[a];c=f.extend({type:d,dataType:"json"},c);if(!c.url)c.url=k(b)||l();if(!c.data&&b&&(a=="create"||a=="update"))c.contentType="application/json",c.data=JSON.stringify(b.toJSON());if(e.emulateJSON)c.contentType="application/x-www-form-urlencoded",c.data=c.data?{model:c.data}:{};if(e.emulateHTTP&&(d==="PUT"||d==="DELETE")){if(e.emulateJSON)c.data._method=d;c.type="POST";c.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)}}if(c.type!=="GET"&&!e.emulateJSON)c.processData=
!1;return g.ajax(c)};var o=function(){},v=function(a,b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){return a.apply(this,arguments)};f.extend(d,a);o.prototype=a.prototype;d.prototype=new o;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},k=function(a){if(!a||!a.url)return null;return f.isFunction(a.url)?a.url():a.url},l=function(){throw Error('A "url" property or function must be specified');},i=function(a,b,c){return function(d){a?
a(b,d,c):b.trigger("error",b,d,c)}}}).call(this);
((function(){var a,b,c,d,e,f,g,h,i,j,k,l=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1};f=function(a){var b,c,d,e,f,g;g=[];for(b in a){d=a[b],c={key:b};if(_.isRegExp(d))c.type="$regex",c.value=d;else if(_(d).isObject())for(e in d)f=d[e],k(e,f)&&(c.type=e,c.value=f);else c.type="$equal",c.value=d;g.push(c)}return g},k=function(a,b){switch(a){case"$in":case"$nin":case"$all":case"$any":return _(b).isArray();case"$size":return _(b).isNumber();case"$regex":return _(b).isRegExp();case"$like":case"$likeI":return _(b).isString();case"$between":return _(b).isArray()&&b.length===2;case"$cb":return _(b).isFunction();default:return!0}},j=function(a,b){switch(a){case"$like":case"$likeI":case"$regex":return _(b).isString();case"$contains":case"$all":case"$any":return _(b).isArray();case"$size":return _(b).isArray()||_(b).isString();case"$in":case"$nin":return b!=null;default:return!0}},g=function(a,b,c,d){switch(a){case"$equal":return c===b;case"$contains":return l.call(c,b)>=0;case"$ne":return c!==b;case"$lt":return c<b;case"$gt":return c>b;case"$lte":return c<=b;case"$gte":return c>=b;case"$between":return b[0]<c&&c<b[1];case"$in":return l.call(b,c)>=0;case"$nin":return l.call(b,c)<0;case"$all":return _(c).all(function(a){return l.call(b,a)>=0});case"$any":return _(c).any(function(a){return l.call(b,a)>=0});case"$size":return c.length===b;case"$exists":case"$has":return c!=null===b;case"$like":return c.indexOf(b)!==-1;case"$likeI":return c.toLowerCase().indexOf(b.toLowerCase())!==-1;case"$regex":return b.test(c);case"$cb":return b.call(d,c);default:return!1}},d=function(a,b,c,d){var e;return e=f(b),_[d](a,function(a){var b,d,f,h,i;for(h=0,i=e.length;h<i;h++){d=e[h],b=a.get(d.key),f=j(d.type,b),f&&(f=g(d.type,d.value,b,a));if(c===f)return c}return!c})},h={$and:function(a,b){return d(a,b,!1,"filter")},$or:function(a,b){return d(a,b,!0,"filter")},$nor:function(a,b){return d(a,b,!0,"reject")},$not:function(a,b){return d(a,b,!1,"reject")}},a=function(a,b,d){var e,f,g,h;return g=JSON.stringify(b),e=(h=a._query_cache)!=null?h:a._query_cache={},f=e[g],f||(f=c(a,b,d),e[g]=f),f},b=function(a,b){var c,d,e;return c=_.intersection(["$and","$not","$or","$nor"],_(b).keys()),d=a.models,c.length===0?h.$and(d,b):(e=function(a,c){return h[c](a,b[c])},_.reduce(c,e,d))},c=function(a,c,d){var e;return e=b(a,c),d.sortBy&&(e=i(e,d)),e},i=function(a,b){return _(b.sortBy).isString()?a=_(a).sortBy(function(a){return a.get(b.sortBy)}):_(b.sortBy).isFunction()&&(a=_(a).sortBy(b.sortBy)),b.order==="desc"&&(a=a.reverse()),a},e=function(a,b){var c,d,e,f;return b.offset?e=b.offset:b.page?e=(b.page-1)*b.limit:e=0,c=e+b.limit,d=a.slice(e,c),b.pager&&_.isFunction(b.pager)&&(f=Math.ceil(a.length/b.limit),b.pager(f,d)),d};if(typeof require!="undefined"){if(typeof _=="undefined"||_===null)_=require("underscore");if(typeof Backbone=="undefined"||Backbone===null)Backbone=require("backbone")}Backbone.QueryCollection=Backbone.Collection.extend({query:function(b,d){var f;return d==null&&(d={}),d.cache?f=a(this,b,d):f=c(this,b,d),d.limit&&(f=e(f,d)),f},where:function(a,b){return b==null&&(b={}),new this.constructor(this.query(a,b))},reset_query_cache:function(){return this._query_cache={}}}),typeof exports!="undefined"&&(exports.QueryCollection=Backbone.QueryCollection)})).call(this)
;
!function(a){a(function(){"use strict",a.support.transition=function(){var b=document.body||document.documentElement,c=b.style,d=c.transition!==undefined||c.WebkitTransition!==undefined||c.MozTransition!==undefined||c.MsTransition!==undefined||c.OTransition!==undefined;return d&&{end:function(){var b="TransitionEnd";return a.browser.webkit?b="webkitTransitionEnd":a.browser.mozilla?b="transitionend":a.browser.opera&&(b="oTransitionEnd"),b}()}}()})}(window.jQuery),!function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype={constructor:c,close:function(b){function f(){e.remove(),e.trigger("closed")}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),e.trigger("close"),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()}},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype={constructor:b,setState:function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},toggle:function(){var a=this.$element.parent('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")}},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(function(){a("body").on("click.button.data-api","[data-toggle^=button]",function(b){a(b.target).button("toggle")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.carousel.defaults,c),this.options.slide&&this.slide(this.options.slide)};b.prototype={cycle:function(){return this.interval=setInterval(a.proxy(this.next,this),this.options.interval),this},to:function(b){var c=this.$element.find(".active"),d=c.parent().children(),e=d.index(c),f=this;if(b>d.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){f.to(b)}):e==b?this.pause().cycle():this.slide(b>e?"next":"prev",a(d[b]))},pause:function(){return clearInterval(this.interval),this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(b,c){var d=this.$element.find(".active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this;return this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h](),!a.support.transition&&this.$element.hasClass("slide")?(this.$element.trigger("slide"),d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")):(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),this.$element.trigger("slide"),this.$element.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)})),f&&this.cycle(),this}},a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("carousel"),f=typeof c=="object"&&c;e||d.data("carousel",e=new b(this,f)),typeof c=="number"?e.to(c):typeof c=="string"||(c=f.slide)?e[c]():e.cycle()})},a.fn.carousel.defaults={interval:5e3},a.fn.carousel.Constructor=b,a(function(){a("body").on("click.carousel.data-api","[data-slide]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=!e.data("modal")&&a.extend({},e.data(),c.data());e.carousel(f),b.preventDefault()})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.collapse.defaults,c),this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.prototype={constructor:b,dimension:function(){var a=this.$element.hasClass("width");return a?"width":"height"},show:function(){var b=this.dimension(),c=a.camelCase(["scroll",b].join("-")),d=this.$parent&&this.$parent.find(".in"),e;d&&d.length&&(e=d.data("collapse"),d.collapse("hide"),e||d.data("collapse",null)),this.$element[b](0),this.transition("addClass","show","shown"),this.$element[b](this.$element[0][c])},hide:function(){var a=this.dimension();this.reset(this.$element[a]()),this.transition("removeClass","hide","hidden"),this.$element[a](0)},reset:function(a){var b=this.dimension();this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth,this.$element.addClass("collapse")},transition:function(b,c,d){var e=this,f=function(){c=="show"&&e.reset(),e.$element.trigger(d)};this.$element.trigger(c)[b]("in"),a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,f):f()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("collapse"),f=typeof c=="object"&&c;e||d.data("collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.defaults={toggle:!0},a.fn.collapse.Constructor=b,a(function(){a("body").on("click.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e).data("collapse")?"toggle":c.data();a(e).collapse(f)})})}(window.jQuery),!function(a){function d(){a(b).parent().removeClass("open")}"use strict";var b='[data-toggle="dropdown"]',c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),e=c.attr("data-target"),f,g;return e||(e=c.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,"")),f=a(e),f.length||(f=c.parent()),g=f.hasClass("open"),d(),!g&&f.toggleClass("open"),!1}},a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a(function(){a("html").on("click.dropdown.data-api",d),a("body").on("click.dropdown.data-api",b,c.prototype.toggle)})}(window.jQuery),!function(a){function c(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),d.call(b)},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),d.call(b)})}function d(a){this.$element.hide().trigger("hidden"),e.call(this)}function e(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(f,this)):f.call(this)):b&&b()}function f(){this.$backdrop.remove(),this.$backdrop=null}function g(){var b=this;this.isShown&&this.options.keyboard?a(document).on("keyup.dismiss.modal",function(a){a.which==27&&b.hide()}):this.isShown||a(document).off("keyup.dismiss.modal")}"use strict";var b=function(b,c){this.options=a.extend({},a.fn.modal.defaults,c),this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this))};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this;if(this.isShown)return;a("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),g.call(this),e.call(this,function(){var c=a.support.transition&&b.$element.hasClass("fade");!b.$element.parent().length&&b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in"),c?b.$element.one(a.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")})},hide:function(b){b&&b.preventDefault();if(!this.isShown)return;var e=this;this.isShown=!1,a("body").removeClass("modal-open"),g.call(this),this.$element.trigger("hide").removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?c.call(this):d.call(this)}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=typeof c=="object"&&c;e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0},a.fn.modal.Constructor=b,a(function(){a("body").on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({},e.data(),c.data());b.preventDefault(),e.modal(f)})})}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.show?c.show():(c.hoverState="in",setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show))},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.hide?c.hide():(c.hoverState="out",setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide))},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip();a.find(".tooltip-inner").html(this.getTitle()),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var b=this,c=this.tip();c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,delay:0,selector:!1,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var b=this.tip(),c=this.getTitle(),d=this.getContent();b.find(".popover-title")[a.type(c)=="object"?"append":"html"](c),b.find(".popover-content > *")[a.type(d)=="object"?"append":"html"](d),b.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){function b(b,c){var d=a.proxy(this.process,this),e=a(b).is("body")?a(window):a(b),f;this.options=a.extend({},a.fn.scrollspy.defaults,c),this.$scrollElement=e.on("scroll.scroll.data-api",d),this.selector=(this.options.target||(f=a(b).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=a("body").on("click.scroll.data-api",this.selector,d),this.refresh(),this.process()}"use strict",b.prototype={constructor:b,refresh:function(){this.targets=this.$body.find(this.selector).map(function(){var b=a(this).attr("href");return/^#\w/.test(b)&&a(b).length?b:null}),this.offsets=a.map(this.targets,function(b){return a(b).position().top})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.offsets,c=this.targets,d=this.activeTarget,e;for(e=b.length;e--;)d!=c[e]&&a>=b[e]&&(!b[e+1]||a<=b[e+1])&&this.activate(c[e])},activate:function(a){var b;this.activeTarget=a,this.$body.find(this.selector).parent(".active").removeClass("active"),b=this.$body.find(this.selector+'[href="'+a+'"]').parent("li").addClass("active"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active")}},a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("scrollspy"),f=typeof c=="object"&&c;e||d.data("scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.defaults={offset:10},a(function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),!function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0],b.trigger({type:"show",relatedTarget:e}),f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.$menu=a(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").attr("data-value");return this.$element.val(a),this.hide()},show:function(){var b=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:b.top+b.height,left:b.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){var c=this,d,e;return this.query=this.$element.val(),this.query?(d=a.grep(this.source,function(a){if(c.matcher(a))return a}),d=this.sorter(d),d.length?this.render(d.slice(0,this.options.items)).show():this.shown?this.hide():this):this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){var b=[],c=[],d=[],e;while(e=a.shift())e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):d.push(e):b.push(e);return b.concat(c,d)},highlighter:function(a){return a.replace(new RegExp("("+this.query+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(b){var c=this;return b=a(b).map(function(b,d){return b=a(c.options.item).attr("data-value",d),b.find("a").html(c.highlighter(d)),b[0]}),b.first().addClass("active"),this.$menu.html(b),this},next:function(b){var c=this.$menu.find(".active").removeClass("active"),d=c.next();d.length||(d=a(this.$menu.find("li")[0])),d.addClass("active")},prev:function(a){var b=this.$menu.find(".active").removeClass("active"),c=b.prev();c.length||(c=this.$menu.find("li").last()),c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),(a.browser.webkit||a.browser.msie)&&this.$element.on("keydown",a.proxy(this.keypress,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},keyup:function(a){a.stopPropagation(),a.preventDefault();switch(a.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:this.hide();break;default:this.lookup()}},keypress:function(a){a.stopPropagation();if(!this.shown)return;switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault(),this.prev();break;case 40:a.preventDefault(),this.next()}},blur:function(a){var b=this;a.stopPropagation(),a.preventDefault(),setTimeout(function(){b.hide()},150)},click:function(a){a.stopPropagation(),a.preventDefault(),this.select()},mouseenter:function(b){this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")}},a.fn.typeahead=function(c){return this.each(function(){var d=a(this),e=d.data("typeahead"),f=typeof c=="object"&&c;e||d.data("typeahead",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>'},a.fn.typeahead.Constructor=b,a(function(){a("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(b){var c=a(this);if(c.data("typeahead"))return;b.preventDefault(),c.typeahead(c.data())})})}(window.jQuery);
(function() {

  _.mixin(_.string);

  window.Luca = {
    VERSION: "0.4.0",
    core: {},
    containers: {},
    components: {},
    modules: {},
    fields: {},
    util: {},
    registry: {
      classes: {},
      namespaces: ["Luca.containers", "Luca.components"]
    },
    component_cache: {
      cid_index: {},
      name_index: {}
    }
  };

  Luca.enableBootstrap = true;

  Luca.registry.addNamespace = function(identifier) {
    Luca.registry.namespaces.push(identifier);
    return Luca.registry.namespaces = _(Luca.registry.namespaces).uniq();
  };

  Luca.cache = function(needle, component) {
    var lookup_id;
    if (component != null) Luca.component_cache.cid_index[needle] = component;
    component = Luca.component_cache.cid_index[needle];
    if ((component != null ? component.component_name : void 0) != null) {
      Luca.component_cache.name_index[component.component_name] = component.cid;
    } else if ((component != null ? component.name : void 0) != null) {
      Luca.component_cache.name_index[component.name] = component.cid;
    }
    if (component != null) return component;
    lookup_id = Luca.component_cache.name_index[needle];
    return Luca.component_cache.cid_index[lookup_id];
  };

  Luca.util.nestedValue = function(accessor, source_object) {
    return _(accessor.split(/\./)).inject(function(obj, key) {
      return obj = obj != null ? obj[key] : void 0;
    }, source_object);
  };

  Luca.registry.lookup = function(ctype) {
    var c, className, parents;
    c = Luca.registry.classes[ctype];
    if (c != null) return c;
    className = _.camelize(_.capitalize(ctype));
    parents = _(Luca.registry.namespaces).map(function(namespace) {
      return Luca.util.nestedValue(namespace, window);
    });
    return _.first(_.compact(_(parents).map(function(parent) {
      return parent[className];
    })));
  };

  Luca.util.LazyObject = function(config) {
    var componentClass, constructor, ctype;
    ctype = config.ctype;
    componentClass = Luca.registry.lookup(ctype);
    if (!componentClass) {
      throw "Invalid Component Type: " + ctype + ".  Did you forget to register it?";
    }
    constructor = eval(componentClass);
    return new constructor(config);
  };

  Luca.register = function(component, constructor_class) {
    var exists;
    exists = Luca.registry.classes[component];
    if (exists != null) {
      throw "Can not register component with the signature " + component + ". Already exists";
    } else {
      return Luca.registry.classes[component] = constructor_class;
    }
  };

  Luca.available_templates = function(filter) {
    var available;
    if (filter == null) filter = "";
    available = _(Luca.templates).keys();
    if (filter.length > 0) {
      return _(available).select(function(tmpl) {
        return tmpl.match(filter);
      });
    } else {
      return available;
    }
  };

  Luca.util.isIE = function() {
    try {
      Object.defineProperty({}, '', {});
      return false;
    } catch (e) {
      return true;
    }
  };

  Luca.util.is_renderable = function(component) {
    if (component == null) component = {};
    if (Luca.registry.lookup(component.ctype)) return true;
    if (_.isFunction(component.render)) return true;
  };

  $((function() {
    return $('body').addClass('luca-ui-enabled');
  })());

}).call(this);
(function() {

  Luca.modules.Deferrable = {
    configure_collection: function(setAsDeferrable) {
      var _ref;
      if (setAsDeferrable == null) setAsDeferrable = true;
      if (!this.collection) return;
      if (!(this.collection && _.isFunction(this.collection.fetch) && _.isFunction(this.collection.reset))) {
        this.collection = new Luca.components.FilterableCollection(this.collection.initial_set, this.collection);
      }
      if ((_ref = this.collection) != null ? _ref.deferrable_trigger : void 0) {
        this.deferrable_trigger = this.collection.deferrable_trigger;
      }
      if (setAsDeferrable) return this.deferrable = this.collection;
    }
  };

}).call(this);
(function() {

  Luca.LocalStore = (function() {

    function LocalStore(name) {
      var store;
      this.name = name;
      store = localStorage.getItem(this.name);
      this.data = (store && JSON.parse(store)) || {};
    }

    LocalStore.prototype.guid = function() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };

    LocalStore.prototype.save = function() {
      return localStorage.setItem(this.name, JSON.stringify(this.data));
    };

    LocalStore.prototype.create = function(model) {
      if (!model.id) model.id = model.attribtues.id = this.guid();
      this.data[model.id] = model;
      this.save();
      return model;
    };

    LocalStore.prototype.update = function(model) {
      this.data[model.id] = model;
      this.save();
      return model;
    };

    LocalStore.prototype.find = function(model) {
      return this.data[model.id];
    };

    LocalStore.prototype.findAll = function() {
      return _.values(this.data);
    };

    LocalStore.prototype.destroy = function(model) {
      delete this.data[model.id];
      this.save();
      return model;
    };

    return LocalStore;

  })();

  Backbone.LocalSync = function(method, model, options) {
    var resp, store;
    store = model.localStorage || model.collection.localStorage;
    resp = (function() {
      switch (method) {
        case "read":
          if (model.id) {
            return store.find(model);
          } else {
            return store.findAll();
          }
        case "create":
          return store.create(model);
        case "update":
          return store.update(model);
        case "delete":
          return store.destroy(model);
      }
    })();
    if (resp) {
      return options.success(resp);
    } else {
      return options.error("Record not found");
    }
  };

}).call(this);
(function() {

  (function(window, document, undefined_) {
    var Spinner, addAnimation, animations, createEl, css, defaults, ins, merge, pos, prefixes, proto, sheet, useCssAnimations, vendor;
    createEl = function(tag, prop) {
      var el, n;
      el = document.createElement(tag || "div");
      n = void 0;
      for (n in prop) {
        el[n] = prop[n];
      }
      return el;
    };
    ins = function(parent, child1, child2) {
      if (child2 && !child2.parentNode) ins(parent, child2);
      parent.insertBefore(child1, child2 || null);
      return parent;
    };
    addAnimation = function(alpha, trail, i, lines) {
      var name, pre, prefix, start, z;
      name = ["opacity", trail, ~~(alpha * 100), i, lines].join("-");
      start = 0.01 + i / lines * 100;
      z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha);
      prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase();
      pre = prefix && "-" + prefix + "-" || "";
      if (!animations[name]) {
        sheet.insertRule("@" + pre + "keyframes " + name + "{" + "0%{opacity:" + z + "}" + start + "%{opacity:" + alpha + "}" + (start + 0.01) + "%{opacity:1}" + (start + trail) % 100 + "%{opacity:" + alpha + "}" + "100%{opacity:" + z + "}" + "}", 0);
        animations[name] = 1;
      }
      return name;
    };
    vendor = function(el, prop) {
      var i, pp, s;
      s = el.style;
      pp = void 0;
      i = void 0;
      if (s[prop] !== undefined) return prop;
      prop = prop.charAt(0).toUpperCase() + prop.slice(1);
      i = 0;
      while (i < prefixes.length) {
        pp = prefixes[i] + prop;
        if (s[pp] !== undefined) return pp;
        i++;
      }
    };
    css = function(el, prop) {
      var n;
      for (n in prop) {
        el.style[vendor(el, n) || n] = prop[n];
      }
      return el;
    };
    merge = function(obj) {
      var def, i, n;
      i = 1;
      while (i < arguments.length) {
        def = arguments[i];
        for (n in def) {
          if (obj[n] === undefined) obj[n] = def[n];
        }
        i++;
      }
      return obj;
    };
    pos = function(el) {
      var o;
      o = {
        x: el.offsetLeft,
        y: el.offsetTop
      };
      while ((el = el.offsetParent)) {
        o.x += el.offsetLeft;
        o.y += el.offsetTop;
      }
      return o;
    };
    prefixes = ["webkit", "Moz", "ms", "O"];
    animations = {};
    useCssAnimations = void 0;
    sheet = (function() {
      var el;
      el = createEl("style");
      ins(document.getElementsByTagName("head")[0], el);
      return el.sheet || el.styleSheet;
    })();
    Spinner = Spinner = function(o) {
      if (!this.spin) return new Spinner(o);
      return this.opts = merge(o || {}, Spinner.defaults, defaults);
    };
    defaults = Spinner.defaults = {
      lines: 12,
      length: 7,
      width: 5,
      radius: 10,
      color: "#000",
      speed: 1,
      trail: 100,
      opacity: 1 / 4,
      fps: 20
    };
    proto = Spinner.prototype = {
      spin: function(target) {
        var anim, astep, el, ep, f, fps, i, o, ostep, self, tp;
        this.stop();
        self = this;
        el = self.el = css(createEl(), {
          position: "relative"
        });
        ep = void 0;
        tp = void 0;
        if (target) {
          tp = pos(ins(target, el, target.firstChild));
          ep = pos(el);
          css(el, {
            left: (target.offsetWidth >> 1) - ep.x + tp.x + "px",
            top: (target.offsetHeight >> 1) - ep.y + tp.y + "px"
          });
        }
        el.setAttribute("aria-role", "progressbar");
        self.lines(el, self.opts);
        if (!useCssAnimations) {
          o = self.opts;
          i = 0;
          fps = o.fps;
          f = fps / o.speed;
          ostep = (1 - o.opacity) / (f * o.trail / 100);
          astep = f / o.lines;
          (anim = function() {
            var alpha, s;
            i++;
            s = o.lines;
            while (s) {
              alpha = Math.max(1 - (i + s * astep) % f * ostep, o.opacity);
              self.opacity(el, o.lines - s, alpha, o);
              s--;
            }
            return self.timeout = self.el && setTimeout(anim, ~~(1000 / fps));
          })();
        }
        return self;
      },
      stop: function() {
        var el;
        el = this.el;
        if (el) {
          clearTimeout(this.timeout);
          if (el.parentNode) el.parentNode.removeChild(el);
          this.el = undefined;
        }
        return this;
      }
    };
    proto.lines = function(el, o) {
      var fill, i, seg;
      fill = function(color, shadow) {
        return css(createEl(), {
          position: "absolute",
          width: (o.length + o.width) + "px",
          height: o.width + "px",
          background: color,
          boxShadow: shadow,
          transformOrigin: "left",
          transform: "rotate(" + ~~(360 / o.lines * i) + "deg) translate(" + o.radius + "px" + ",0)",
          borderRadius: (o.width >> 1) + "px"
        });
      };
      i = 0;
      seg = void 0;
      while (i < o.lines) {
        seg = css(createEl(), {
          position: "absolute",
          top: 1 + ~(o.width / 2) + "px",
          transform: "translate3d(0,0,0)",
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + " " + 1 / o.speed + "s linear infinite"
        });
        if (o.shadow) {
          ins(seg, css(fill("#000", "0 0 4px " + "#000"), {
            top: 2 + "px"
          }));
        }
        ins(el, ins(seg, fill(o.color, "0 0 1px rgba(0,0,0,.1)")));
        i++;
      }
      return el;
    };
    proto.opacity = function(el, i, val) {
      if (i < el.childNodes.length) return el.childNodes[i].style.opacity = val;
    };
    (function() {
      var i, s;
      s = css(createEl("group"), {
        behavior: "url(#default#VML)"
      });
      i = void 0;
      if (!vendor(s, "transform") && s.adj) {
        i = 4;
        while (i--) {
          sheet.addRule(["group", "roundrect", "fill", "stroke"][i], "behavior:url(#default#VML)");
        }
        proto.lines = function(el, o) {
          var g, grp, margin, r, seg;
          grp = function() {
            return css(createEl("group", {
              coordsize: s + " " + s,
              coordorigin: -r + " " + -r
            }), {
              width: s,
              height: s
            });
          };
          seg = function(i, dx, filter) {
            return ins(g, ins(css(grp(), {
              rotation: 360 / o.lines * i + "deg",
              left: ~~dx
            }), ins(css(createEl("roundrect", {
              arcsize: 1
            }), {
              width: r,
              height: o.width,
              left: o.radius,
              top: -o.width >> 1,
              filter: filter
            }), createEl("fill", {
              color: o.color,
              opacity: o.opacity
            }), createEl("stroke", {
              opacity: 0
            }))));
          };
          r = o.length + o.width;
          s = 2 * r;
          g = grp();
          margin = ~(o.length + o.radius + o.width) + "px";
          i = void 0;
          if (o.shadow) {
            i = 1;
            while (i <= o.lines) {
              seg(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
              i++;
            }
          }
          i = 1;
          while (i <= o.lines) {
            seg(i);
            i++;
          }
          return ins(css(el, {
            margin: margin + " 0 0 " + margin,
            zoom: 1
          }), g);
        };
        return proto.opacity = function(el, i, val, o) {
          var c;
          c = el.firstChild;
          o = o.shadow && o.lines || 0;
          if (c && i + o < c.childNodes.length) {
            c = c.childNodes[i + o];
            c = c && c.firstChild;
            c = c && c.firstChild;
            if (c) return c.opacity = val;
          }
        };
      } else {
        return useCssAnimations = vendor(s, "animation");
      }
    })();
    return window.Spinner = Spinner;
  })(window, document);

}).call(this);
(function() {

  Luca.modules.Toolbars = {
    mixin: function(base) {
      return _.extend(base, Luca.modules.Toolbars);
    },
    prepare_toolbars: function() {
      var _this = this;
      return this.toolbars = _(this.toolbars).map(function(toolbar) {
        toolbar.ctype || (toolbar.ctype = "toolbar");
        toolbar = Luca.util.LazyObject(toolbar);
        $(_this.el)[toolbar.position_action()](Luca.templates["containers/toolbar_wrapper"]({
          id: _this.name + '-toolbar-wrapper'
        }));
        toolbar.container = $("#" + (_this.name || _this.cid) + "-toolbar-wrapper");
        return toolbar;
      });
    },
    render_toolbars: function() {
      var _this = this;
      return _(this.toolbars).each(function(toolbar) {
        return toolbar.render();
      });
    }
  };

}).call(this);
(function() {

  Luca.View = Backbone.View.extend({
    base: 'Luca.View'
  });

  Luca.View.originalExtend = Backbone.View.extend;

  Luca.View.extend = function(definition) {
    var _base;
    _base = definition.render;
    _base || (_base = function() {
      if (!($(this.container) && $(this.el))) {
        return $(this.container).append($(this.el));
      }
    });
    definition.render = function() {
      var _this = this;
      if (this.deferrable) {
        this.trigger("before:render", this);
        this.deferrable.bind(this.deferrable_event, _.once(function() {
          _base.apply(_this, arguments);
          return _this.trigger("after:render", _this);
        }));
        if (!this.deferrable_trigger) this.immediate_trigger = true;
        if (this.immediate_trigger === true) {
          return this.deferrable.fetch();
        } else {
          return this.bind(this.deferrable_trigger, _.once(function() {
            return _this.deferrable.fetch();
          }));
        }
      } else {
        this.trigger("before:render", this);
        _base.apply(this, arguments);
        return this.trigger("after:render", this);
      }
    };
    return Luca.View.originalExtend.apply(this, [definition]);
  };

  _.extend(Luca.View.prototype, {
    debug: function() {
      var message, _i, _len, _results;
      if (!(this.debugMode || (window.LucaDebugMode != null))) return;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        message = arguments[_i];
        _results.push(console.log([this.name || this.cid, message]));
      }
      return _results;
    },
    trigger: function(event) {
      this.event = event;
      return Backbone.View.prototype.trigger.apply(this, arguments);
    },
    hooks: ["after:initialize", "before:render", "after:render", "first:activation", "activation", "deactivation"],
    deferrable_event: "reset",
    initialize: function(options) {
      var unique;
      this.options = options != null ? options : {};
      if (this.name != null) this.cid = _.uniqueId(this.name);
      _.extend(this, this.options);
      Luca.cache(this.cid, this);
      unique = _(Luca.View.prototype.hooks.concat(this.hooks)).uniq();
      this.setupHooks(unique);
      return this.trigger("after:initialize", this);
    },
    setupHooks: function(set) {
      var _this = this;
      set || (set = this.hooks);
      return _(set).each(function(event) {
        var fn, parts, prefix;
        parts = event.split(':');
        prefix = parts.shift();
        parts = _(parts).map(function(p) {
          return _.capitalize(p);
        });
        fn = prefix + parts.join('');
        return _this.bind(event, function() {
          if (_this[fn]) return _this[fn].apply(_this, arguments);
        });
      });
    }
  });

}).call(this);
(function() {

  Luca.Collection = Backbone.QueryCollection.extend({
    base: 'Luca.Collection'
  });

  Luca.Collection._baseParams = {};

  Luca.Collection.baseParams = function(obj) {
    if (obj) return Luca.Collection._baseParams = obj;
    if (_.isFunction(Luca.Collection._baseParams)) {
      return Luca.Collection._baseParams.call();
    }
    if (_.isObject(Luca.Collection._baseParams)) {
      return Luca.Collection._baseParams;
    }
  };

  Luca.Collection._bootstrapped_models = {};

  Luca.Collection.bootstrap = function(obj) {
    return _.extend(Luca.Collection._bootstrapped_models, obj);
  };

  Luca.Collection.cache = function(key, models) {
    if (models) return Luca.Collection._bootstrapped_models[key] = models;
    return Luca.Collection._bootstrapped_models[key] || [];
  };

  _.extend(Luca.Collection.prototype, {
    initialize: function(models, options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      if (this.cached) {
        this.bootstrap_cache_key = _.isFunction(this.cached) ? this.cached() : this.cached;
      }
      if (this.registerWith) {
        this.registerAs || (this.registerAs = this.cached);
        this.registerAs = _.isFunction(this.registerAs) ? this.registerAs() : this.registerAs;
        this.bind("after:initialize", function() {
          return _this.register(_this.registerWith, _this.registerAs, _this);
        });
      }
      if (_.isArray(this.data) && this.data.length > 0) this.local = true;
      this.wrapUrl();
      Backbone.Collection.prototype.initialize.apply(this, [models, this.options]);
      return this.trigger("after:initialize");
    },
    wrapUrl: function() {
      var params, url,
        _this = this;
      if (_.isFunction(this.url)) {
        return this.url = _.wrap(this.url, function(fn) {
          var existing_params, new_val, parts, queryString, val;
          val = fn.apply(_this);
          parts = val.split('?');
          if (parts.length > 1) existing_params = _.last(parts);
          queryString = _this.queryString();
          if (existing_params && val.match(existing_params)) {
            queryString = queryString.replace(existing_params, '');
          }
          new_val = "" + val + "?" + queryString;
          if (new_val.match(/\?$/)) new_val = new_val.replace(/\?$/, '');
          return new_val;
        });
      } else {
        url = this.url;
        params = this.queryString();
        return this.url = _([url, params]).compact().join("?");
      }
    },
    queryString: function() {
      var parts,
        _this = this;
      parts = _(this.base_params || (this.base_params = Luca.Collection.baseParams())).inject(function(memo, value, key) {
        var str;
        str = "" + key + "=" + value;
        memo.push(str);
        return memo;
      }, []);
      return _.uniq(parts).join("&");
    },
    resetFilter: function() {
      this.base_params = Luca.Collection.baseParams();
      return this;
    },
    applyFilter: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) {
        options = {
          auto: true,
          refresh: true
        };
      }
      this.applyParams(filter);
      if (options.auto) {
        return this.fetch({
          refresh: options.refresh
        });
      }
    },
    applyParams: function(params) {
      this.base_params || (this.base_params = Luca.Collection.baseParams());
      return _.extend(this.base_params, params);
    },
    register: function(collectionManager, key, collection) {
      if (collectionManager == null) collectionManager = "";
      if (key == null) key = "";
      if (!(key.length > 1)) {
        throw "Can not register with a collection manager without a key";
      }
      if (!(collectionManager.length > 1)) {
        throw "Can not register with a collection manager without a valid collection manager";
      }
      if (_.isString(collectionManager)) {
        collectionManager = Luca.util.nestedValue(collectionManager, window);
      }
      if (!collectionManager) throw "Could not register with collection manager";
      if (_.isFunction(collectionManager.add)) {
        return collectionManager.add(key, collection);
      }
      if (_.isObject(collect)) return collectionManager[key] = collection;
    },
    bootstrap: function() {
      if (!this.bootstrap_cache_key) return;
      return this.reset(this.cached_models());
    },
    cached_models: function() {
      return Luca.Collection.cache(this.bootstrap_cache_key);
    },
    fetch: function(options) {
      var url;
      if (options == null) options = {};
      this.trigger("before:fetch", this);
      if (this.local === true) return this.reset(this.data);
      if (this.cached_models().length && !options.refresh) return this.bootstrap();
      this.reset();
      this.fetching = true;
      url = _.isFunction(this.url) ? this.url() : this.url;
      if (!((url && url.length > 1) || this.localStorage)) return true;
      try {
        return Backbone.Collection.prototype.fetch.apply(this, arguments);
      } catch (e) {
        console.log("Error in Collection.fetch", e);
        throw e;
      }
    },
    onceLoaded: function(fn) {
      var wrapped,
        _this = this;
      if (this.length > 0 && !this.fetching) {
        fn.apply(this, [this]);
        return;
      }
      wrapped = function() {
        return fn.apply(_this, [_this]);
      };
      return this.bind("reset", function() {
        wrapped();
        return _this.unbind("reset", wrapped);
      });
    },
    ifLoaded: function(fn, scope) {
      var _this = this;
      if (scope == null) scope = this;
      if (this.models.length > 0 && !this.fetching) {
        fn.apply(scope, [this]);
        return;
      }
      this.bind("reset", function(collection) {
        return fn.apply(scope, [collection]);
      });
      if (!this.fetching) return this.fetch();
    },
    parse: function(response) {
      var models;
      this.fetching = false;
      this.trigger("after:response");
      models = this.root != null ? response[this.root] : response;
      if (this.bootstrap_cache_key) {
        Luca.Collection.cache(this.bootstrap_cache_keys, models);
      }
      return models;
    }
  });

}).call(this);
(function() {

  Luca.core.Field = Luca.View.extend({
    className: 'luca-ui-text-field luca-ui-field',
    isField: true,
    template: 'fields/text_field',
    labelAlign: 'top',
    hooks: ["before:validation", "after:validation", "on:change"],
    statuses: ["warning", "error", "success"],
    initialize: function(options) {
      var _ref,
        _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      Luca.View.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.helperText || (this.helperText = "");
      if (this.required && !((_ref = this.label) != null ? _ref.match(/^\*/) : void 0)) {
        this.label || (this.label = "*" + this.label);
      }
      this.inputStyles || (this.inputStyles = "");
      if (this.disabled) this.disable();
      _(this.statuses).each(function(state) {
        if (_this[state]) return _this.updateState(state);
      });
      return this.placeHolder || (this.placeHolder = "");
    },
    beforeRender: function() {
      if (Luca.enableBootstrap) $(this.el).addClass('control-group');
      if (this.required) $(this.el).addClass('required');
      $(this.el).html(Luca.templates[this.template](this));
      return this.input = $('input', this.el);
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    },
    disable: function() {
      return $("input", this.el).attr('disabled', true);
    },
    enable: function() {
      return $("input", this.el).attr('disabled', false);
    },
    getValue: function() {
      return this.input.attr('value');
    },
    render: function() {
      return $(this.container).append($(this.el));
    },
    setValue: function(value) {
      return this.input.attr('value', value);
    },
    updateState: function(state) {
      var _this = this;
      _(this.statuses).each(function(cls) {
        return $(_this.el).removeClass(cls);
      });
      return $(this.el).addClass(state);
    }
  });

}).call(this);
(function() {

  Luca.core.Container = Luca.View.extend({
    className: 'luca-ui-container',
    componentClass: 'luca-ui-panel',
    isContainer: true,
    hooks: ["before:components", "before:layout", "after:components", "after:layout", "first:activation"],
    rendered: false,
    components: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.setupHooks(Luca.core.Container.prototype.hooks);
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
    beforeRender: function() {
      this.debug("container before render");
      this.doLayout();
      return this.doComponents();
    },
    doLayout: function() {
      this.debug("container do layout");
      this.trigger("before:layout", this);
      this.prepareLayout();
      return this.trigger("after:layout", this);
    },
    doComponents: function() {
      this.debug("container do components");
      this.trigger("before:components", this, this.components);
      this.prepareComponents();
      this.createComponents();
      this.renderComponents();
      return this.trigger("after:components", this, this.components);
    },
    applyPanelConfig: function(panel, panelIndex) {
      var config, style_declarations;
      style_declarations = [];
      if (panel.height) {
        style_declarations.push("height: " + (_.isNumber(panel.height) ? panel.height + 'px' : panel.height));
      }
      if (panel.width) {
        style_declarations.push("width: " + (_.isNumber(panel.width) ? panel.width + 'px' : panel.width));
      }
      if (panel.float) style_declarations.push("float: " + panel.float);
      return config = {
        classes: (panel != null ? panel.classes : void 0) || this.componentClass,
        id: "" + this.cid + "-" + panelIndex,
        style: style_declarations.join(';')
      };
    },
    prepareLayout: function() {
      var _this = this;
      this.debug("container prepare layout");
      this.componentContainers = _(this.components).map(function(component, index) {
        return _this.applyPanelConfig.apply(_this, [component, index]);
      });
      if (this.appendContainers) {
        return _(this.componentContainers).each(function(container) {
          return $(_this.el).append(Luca.templates["containers/basic"](container));
        });
      }
    },
    prepareComponents: function() {
      var _this = this;
      this.debug("container prepare components");
      return this.components = _(this.components).map(function(object, index) {
        var panel;
        panel = _this.componentContainers[index];
        object.container = _this.appendContainers ? "#" + panel.id : _this.el;
        return object;
      });
    },
    createComponents: function() {
      var map,
        _this = this;
      this.debug("container create components");
      map = this.componentIndex = {
        name_index: {},
        cid_index: {}
      };
      this.components = _(this.components).map(function(object, index) {
        var component;
        component = _.isObject(object) && (object.ctype != null) ? Luca.util.LazyObject(object) : object;
        if (!component.container && component.options.container) {
          component.container = component.options.container;
        }
        if (map && (component.cid != null)) map.cid_index[component.cid] = index;
        if (map && (component.name != null)) {
          map.name_index[component.name] = index;
        }
        return component;
      });
      return this.debug("components created", this.components);
    },
    renderComponents: function(debugMode) {
      var _this = this;
      this.debugMode = debugMode != null ? debugMode : "";
      this.debug("container render components");
      return _(this.components).each(function(component) {
        component.getParent = function() {
          return _this;
        };
        $(component.container).append($(component.el));
        try {
          return component.render();
        } catch (e) {
          console.log("Error Rendering Component " + (component.name || component.cid), component);
          console.log(e.message);
          return console.log(e.stack);
        }
      });
    },
    firstActivation: function() {
      var _this = this;
      return _(this.components).each(function(component) {
        var activator, _ref;
        activator = _this;
        if ((component != null ? component.previously_activated : void 0) !== true) {
          if (component != null) {
            if ((_ref = component.trigger) != null) {
              _ref.apply(component, ["first:activation", [component, activator]]);
            }
          }
          return component.previously_activated = true;
        }
      });
    },
    select: function(attribute, value, deep) {
      var components;
      if (deep == null) deep = false;
      components = _(this.components).map(function(component) {
        var matches, test;
        matches = [];
        test = component[attribute];
        if (test === value) matches.push(component);
        if (deep === true && component.isContainer === true) {
          matches.push(component.select(attribute, value, true));
        }
        return _.compact(matches);
      });
      return _.flatten(components);
    },
    findComponentByName: function(name, deep) {
      if (deep == null) deep = false;
      return this.findComponent(name, "name_index", deep);
    },
    findComponentById: function(id, deep) {
      if (deep == null) deep = false;
      return this.findComponent(id, "cid_index", deep);
    },
    findComponent: function(needle, haystack, deep) {
      var component, position, sub_container, _ref, _ref2;
      if (haystack == null) haystack = "name";
      if (deep == null) deep = false;
      position = (_ref = this.componentIndex) != null ? _ref[haystack][needle] : void 0;
      component = (_ref2 = this.components) != null ? _ref2[position] : void 0;
      if (component) return component;
      if (deep === true) {
        sub_container = _(this.components).detect(function(component) {
          return component != null ? typeof component.findComponent === "function" ? component.findComponent(needle, haystack, true) : void 0 : void 0;
        });
        return sub_container != null ? typeof sub_container.findComponent === "function" ? sub_container.findComponent(needle, haystack, true) : void 0 : void 0;
      }
    },
    eachComponent: function(fn, deep) {
      var _this = this;
      if (deep == null) deep = true;
      return _(this.components).each(function(component) {
        var _ref;
        fn.apply(component, [component]);
        if (deep) {
          return component != null ? (_ref = component.eachComponent) != null ? _ref.apply(component, [fn, deep]) : void 0 : void 0;
        }
      });
    },
    indexOf: function(name) {
      var names;
      names = _(this.components).pluck('name');
      return _(names).indexOf(name);
    },
    activeComponent: function() {
      if (!this.activeItem) return this;
      return this.components[this.activeItem];
    },
    componentElements: function() {
      return $("." + this.componentClass, this.el);
    },
    getComponent: function(needle) {
      return this.components[needle];
    },
    rootComponent: function() {
      return !(this.getParent != null);
    },
    getRootComponent: function() {
      if (this.rootComponent()) {
        return this;
      } else {
        return this.getParent().getRootComponent();
      }
    }
  });

  Luca.register("container", "Luca.core.Container");

}).call(this);
(function() {

  Luca.containers.SplitView = Luca.core.Container.extend({
    layout: '100',
    componentType: 'split_view',
    containerTemplate: 'containers/basic',
    className: 'luca-ui-split-view',
    componentClass: 'luca-ui-panel'
  });

  Luca.register('split_view', "Luca.containers.SplitView");

}).call(this);
(function() {

  Luca.containers.ColumnView = Luca.core.Container.extend({
    componentType: 'column_view',
    className: 'luca-ui-column-view',
    components: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setColumnWidths();
    },
    componentClass: 'luca-ui-column',
    containerTemplate: "containers/basic",
    appendContainers: true,
    autoColumnWidths: function() {
      var widths,
        _this = this;
      widths = [];
      _(this.components.length).times(function() {
        return widths.push(parseInt(100 / _this.components.length));
      });
      return widths;
    },
    setColumnWidths: function() {
      this.columnWidths = this.layout != null ? _(this.layout.split('/')).map(function(v) {
        return parseInt(v);
      }) : this.autoColumnWidths();
      return this.columnWidths = _(this.columnWidths).map(function(val) {
        return "" + val + "%";
      });
    },
    beforeComponents: function() {
      this.debug("column_view before components");
      return _(this.components).each(function(component) {
        return component.ctype || (component.ctype = "panel_view");
      });
    },
    beforeLayout: function() {
      var _ref,
        _this = this;
      this.debug("column_view before layout");
      _(this.columnWidths).each(function(width, index) {
        _this.components[index].float = "left";
        return _this.components[index].width = width;
      });
      return (_ref = Luca.core.Container.prototype.beforeLayout) != null ? _ref.apply(this, arguments) : void 0;
    }
  });

  Luca.register('column_view', "Luca.containers.ColumnView");

}).call(this);
(function() {

  Luca.containers.CardView = Luca.core.Container.extend({
    componentType: 'card_view',
    className: 'luca-ui-card-view-wrapper',
    activeCard: 0,
    components: [],
    hooks: ['before:card:switch', 'after:card:switch'],
    initialize: function(options) {
      this.options = options;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setupHooks(this.hooks);
    },
    componentClass: 'luca-ui-card',
    beforeLayout: function() {
      var _this = this;
      return this.cards = _(this.components).map(function(card, cardIndex) {
        return {
          classes: _this.componentClass,
          style: "display:" + (cardIndex === _this.activeCard ? 'block' : 'none'),
          id: "" + _this.cid + "-" + cardIndex
        };
      });
    },
    prepareLayout: function() {
      var _this = this;
      return this.card_containers = _(this.cards).map(function(card, index) {
        $(_this.el).append(Luca.templates["containers/basic"](card));
        return $("#" + card.id);
      });
    },
    prepareComponents: function() {
      var _this = this;
      return this.components = _(this.components).map(function(object, index) {
        var card;
        card = _this.cards[index];
        object.container = "#" + card.id;
        return object;
      });
    },
    activeComponent: function() {
      return this.getComponent(this.activeCard);
    },
    cycle: function() {
      var nextIndex;
      nextIndex = this.activeCard < this.components.length - 1 ? this.activeCard + 1 : 0;
      return this.activate(nextIndex);
    },
    find: function(name) {
      return this.findComponentByName(name, true);
    },
    firstActivation: function() {
      return this.activeComponent().trigger("first:activation", this, this.activeComponent());
    },
    activate: function(index, silent, callback) {
      var current, previous, _ref;
      if (silent == null) silent = false;
      if (_.isFunction(silent)) {
        silent = false;
        callback = silent;
      }
      if (index === this.activeCard) return;
      previous = this.activeComponent();
      current = this.getComponent(index);
      if (!current) {
        index = this.indexOf(index);
        current = this.getComponent(index);
      }
      if (!current) return;
      if (!silent) this.trigger("before:card:switch", previous, current);
      _(this.card_containers).each(function(container) {
        var _ref;
        if ((_ref = container.trigger) != null) {
          _ref.apply(container, ["deactivation", this, previous, current]);
        }
        return container.hide();
      });
      if (!current.previously_activated) {
        current.trigger("first:activation");
        current.previously_activated = true;
      }
      $(current.container).show();
      this.activeCard = index;
      if (!silent) {
        this.trigger("after:card:switch", previous, current);
        if ((_ref = current.trigger) != null) {
          _ref.apply(current, ["activation", this, previous, current]);
        }
      }
      if (_.isFunction(callback)) {
        return callback.apply(this, [this, previous, current]);
      }
    }
  });

  Luca.register('card_view', "Luca.containers.CardView");

}).call(this);
(function() {

  Luca.containers.ModalView = Luca.core.Container.extend({
    componentType: 'modal_view',
    className: 'luca-ui-modal-view',
    components: [],
    renderOnInitialize: true,
    showOnRender: false,
    hooks: ['before:show', 'before:hide'],
    defaultModalOptions: {
      minWidth: 375,
      maxWidth: 375,
      minHeight: 550,
      maxHeight: 550,
      opacity: 80,
      onOpen: function(modal) {
        this.onOpen.apply(this);
        return this.onModalOpen.apply(modal, [modal, this]);
      },
      onClose: function(modal) {
        this.onClose.apply(this);
        return this.onModalClose.apply(modal, [modal, this]);
      }
    },
    modalOptions: {},
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      this.setupHooks(this.hooks);
      _(this.defaultModalOptions).each(function(value, setting) {
        var _base;
        return (_base = _this.modalOptions)[setting] || (_base[setting] = value);
      });
      this.modalOptions.onOpen = _.bind(this.modalOptions.onOpen, this);
      return this.modalOptions.onClose = _.bind(this.modalOptions.onClose, this);
    },
    onOpen: function() {
      return true;
    },
    onClose: function() {
      return true;
    },
    getModal: function() {
      return this.modal;
    },
    onModalOpen: function(modal, view) {
      view.modal = modal;
      modal.overlay.show();
      modal.container.show();
      return modal.data.show();
    },
    onModalClose: function(modal, view) {
      return $.modal.close();
    },
    prepareLayout: function() {
      return $('body').append($(this.el));
    },
    prepareComponents: function() {
      var _this = this;
      return this.components = _(this.components).map(function(object, index) {
        object.container = _this.el;
        return object;
      });
    },
    afterInitialize: function() {
      $(this.el).hide();
      if (this.renderOnInitialize) return this.render();
    },
    afterRender: function() {
      if (this.showOnRender) return this.show();
    },
    wrapper: function() {
      return $($(this.el).parent());
    },
    show: function() {
      this.trigger("before:show", this);
      return $(this.el).modal(this.modalOptions);
    },
    hide: function() {
      return this.trigger("before:hide", this);
    }
  });

  Luca.register("modal_view", "Luca.containers.ModalView");

}).call(this);
(function() {

  Luca.containers.PanelView = Luca.core.Container.extend({
    className: 'luca-ui-panel',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Container.prototype.initialize.apply(this, arguments);
    },
    afterLayout: function() {
      var contents;
      if (this.template) {
        contents = (Luca.templates || JST)[this.template](this);
        return $(this.el).html(contents);
      }
    },
    render: function() {
      return $(this.container).append($(this.el));
    }
  });

}).call(this);
(function() {

  Luca.containers.TabView = Luca.containers.CardView.extend({
    events: {
      "click .luca-ui-tab-container li": "select"
    },
    hooks: ["before:select", "after:select"],
    componentType: 'tab_view',
    className: 'luca-ui-tab-view-wrapper',
    components: [],
    componentClass: 'luca-ui-tab-panel',
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "select", "highlightSelectedTab");
      this.setupHooks(this.hooks);
      return this.bind("after:card:switch", this.highlightSelectedTab);
    },
    select: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("before:select", this);
      this.activate(my.data('target-tab'));
      return this.trigger("after:select", this);
    },
    highlightSelectedTab: function() {
      this.tabSelectors().removeClass('active-tab');
      return this.activeTabSelector().addClass('active-tab');
    },
    activeTabSelector: function() {
      return this.tabSelectors().eq(this.activeCard);
    },
    tabContainer: function() {
      return $("#" + this.cid + "-tab-container>ul");
    },
    tab_position: 'top',
    beforeLayout: function() {
      $(this.el).addClass("tab-position-" + this.tab_position);
      if (this.tab_position === "top" || this.tab_position === "left") {
        $(this.el).append(Luca.templates["containers/tab_selector_container"](this));
        $(this.el).append(Luca.templates["containers/tab_view"](this));
      } else {
        $(this.el).append(Luca.templates["containers/tab_view"](this));
        $(this.el).append(Luca.templates["containers/tab_selector_container"](this));
      }
      this.createTabSelectors();
      return Luca.containers.CardView.prototype.beforeLayout.apply(this, arguments);
    },
    tabSelectors: function() {
      return $('li.tab-selector', this.tabContainer());
    },
    createTabSelectors: function() {
      var _this = this;
      return _(this.components).map(function(component, index) {
        var title;
        component.container = "#" + _this.cid + "-tab-panel-container";
        title = component.title || ("Tab " + (index + 1));
        return _this.tabContainer().append("<li class='tab-selector' data-target-tab='" + index + "'>" + title + "</li>");
      });
    }
  });

}).call(this);
(function() {

  Luca.containers.Viewport = Luca.containers.CardView.extend({
    activeItem: 0,
    className: 'luca-ui-viewport',
    fullscreen: true,
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      if (this.fullscreen) return $('html,body').addClass('luca-ui-fullscreen');
    },
    render: function() {
      return $(this.el).addClass('luca-ui-viewport');
    }
  });

}).call(this);
(function() {

  Luca.components.Toolbar = Luca.core.Container.extend({
    className: 'luca-ui-toolbar',
    position: 'bottom',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Container.prototype.initialize.apply(this, arguments);
    },
    prepareComponents: function() {
      var _this = this;
      return _(this.components).each(function(component) {
        return component.container = _this.el;
      });
    },
    render: function() {
      return $(this.container).append(this.el);
    }
  });

  Luca.register("toolbar", "Luca.components.Toolbar");

}).call(this);
(function() {

  Luca.fields.ButtonField = Luca.core.Field.extend({
    form_field: true,
    readOnly: true,
    events: {
      "click input": "click_handler"
    },
    hooks: ["button:click"],
    className: 'luca-ui-field luca-ui-button-field',
    template: 'fields/button_field',
    click_handler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      return this.trigger("button:click");
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this.options);
      _.bindAll(this, "click_handler");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('button'));
      this.input_name || (this.input_name = this.name || (this.name = this.input_id));
      this.input_value || (this.input_value = this.label || (this.label = this.text));
      this.input_type || (this.input_type = "button");
      return this.input_class || (this.input_class = this["class"] || "luca-button");
    },
    setValue: function() {
      return true;
    }
  });

  Luca.register("button_field", "Luca.fields.ButtonField");

}).call(this);
(function() {

  Luca.fields.CheckboxField = Luca.core.Field.extend({
    form_field: true,
    events: {
      "change input": "change_handler"
    },
    change_handler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("on:change", this, e);
      if (me.checked === true) {
        return this.trigger("checked");
      } else {
        return this.trigger("unchecked");
      }
    },
    className: 'luca-ui-checkbox-field luca-ui-field',
    template: 'fields/checkbox_field',
    hooks: ["checked", "unchecked"],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.bindAll(this, "change_handler");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_value || (this.input_value = 1);
      return this.label || (this.label = this.name);
    },
    setValue: function(checked) {
      return this.input.attr('checked', checked);
    },
    getValue: function() {
      return this.input.attr('checked') === true;
    }
  });

  Luca.register("checkbox_field", "Luca.fields.CheckboxField");

}).call(this);
(function() {

  Luca.fields.FileUploadField = Luca.core.Field.extend({
    form_field: true,
    template: 'fields/file_upload_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      return this.helperText || (this.helperText = "");
    }
  });

  Luca.register("file_upload_field", "Luca.fields.FileUploadField");

}).call(this);
(function() {

  Luca.fields.HiddenField = Luca.core.Field.extend({
    form_field: true,
    template: 'fields/hidden_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_value || (this.input_value = this.value);
      return this.label || (this.label = this.name);
    }
  });

  Luca.register("hidden_field", "Luca.fields.HiddenField");

}).call(this);
(function() {

  Luca.fields.SelectField = Luca.core.Field.extend({
    form_field: true,
    events: {
      "change select": "change_handler"
    },
    hooks: ["after:select"],
    className: 'luca-ui-select-field luca-ui-field',
    template: "fields/select_field",
    includeBlank: true,
    blankValue: '',
    blankText: 'Select One',
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.modules.Deferrable);
      _.bindAll(this, "change_handler", "populateOptions", "beforeFetch");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      if (_.isUndefined(this.retainValue)) return this.retainValue = true;
    },
    afterInitialize: function() {
      var _ref;
      if ((_ref = this.collection) != null ? _ref.data : void 0) {
        this.valueField || (this.valueField = "id");
        this.displayField || (this.displayField = "name");
        this.parseData();
      }
      try {
        this.configure_collection();
      } catch (e) {
        console.log("Error Configuring Collection", this, e.message);
      }
      this.collection.bind("before:fetch", this.beforeFetch);
      return this.collection.bind("reset", this.populateOptions);
    },
    parseData: function() {
      var _this = this;
      return this.collection.data = _(this.collection.data).map(function(record) {
        var hash;
        if (!_.isArray(record)) return record;
        hash = {};
        hash[_this.valueField] = record[0];
        hash[_this.displayField] = record[1];
        return hash;
      });
    },
    afterRender: function() {
      var _ref, _ref2;
      this.input = $('select', this.el);
      if (((_ref = this.collection) != null ? (_ref2 = _ref.models) != null ? _ref2.length : void 0 : void 0) > 0) {
        return this.populateOptions();
      } else {
        return this.collection.trigger("reset");
      }
    },
    setValue: function(value) {
      this.currentValue = value;
      return Luca.core.Field.prototype.setValue.apply(this, arguments);
    },
    beforeFetch: function() {
      return this.resetOptions();
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    },
    resetOptions: function() {
      this.input.html('');
      if (this.includeBlank) {
        return this.input.append("<option value='" + this.blankValue + "'>" + this.blankText + "</option>");
      }
    },
    populateOptions: function() {
      var _ref,
        _this = this;
      this.resetOptions();
      if (((_ref = this.collection) != null ? _ref.each : void 0) != null) {
        this.collection.each(function(model) {
          var display, option, selected, value;
          value = model.get(_this.valueField);
          display = model.get(_this.displayField);
          if (_this.selected && value === _this.selected) selected = "selected";
          option = "<option " + selected + " value='" + value + "'>" + display + "</option>";
          return _this.input.append(option);
        });
      }
      this.trigger("after:populate:options", this);
      return this.setValue(this.currentValue);
    }
  });

  Luca.register("select_field", "Luca.fields.SelectField");

}).call(this);
(function() {

  Luca.fields.TextAreaField = Luca.core.Field.extend({
    form_field: true,
    events: {
      "keydown input": "keydown_handler",
      "blur input": "blur_handler",
      "focus input": "focus_handler"
    },
    template: 'fields/text_area_field',
    height: "200px",
    width: "90%",
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.bindAll(this, "keydown_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.input_class || (this.input_class = this["class"]);
      return this.inputStyles || (this.inputStyles = "height:" + this.height + ";width:" + this.width);
    },
    setValue: function(value) {
      return $(this.field()).val(value);
    },
    getValue: function() {
      return $(this.field()).val();
    },
    field: function() {
      return this.input = $("textarea#" + this.input_id, this.el);
    },
    keydown_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    blur_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    focus_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    }
  });

  Luca.register("text_area_field", "Luca.fields.TextAreaField");

}).call(this);
(function() {

  Luca.fields.TextField = Luca.core.Field.extend({
    form_field: true,
    events: {
      "keydown input": "keydown_handler",
      "blur input": "blur_handler",
      "focus input": "focus_handler",
      "change input": "change_handler"
    },
    template: 'fields/text_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.bindAll(this, "keydown_handler", "blur_handler", "focus_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      if (this.prepend) {
        $(this.el).addClass('input-prepend');
        this.addOn = this.prepend;
      }
      if (this.append) {
        $(this.el).addClass('input-append');
        return this.addOn = this.append;
      }
    },
    keydown_handler: _.throttle((function(e) {
      return this.change_handler.apply(this, arguments);
    }), 300),
    blur_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    focus_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    }
  });

  Luca.register("text_field", "Luca.fields.TextField");

}).call(this);
(function() {

  Luca.fields.TypeAheadField = Luca.fields.TextField.extend({
    form_field: true,
    className: 'luca-ui-field',
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      return this.label || (this.label = this.name);
    }
  });

}).call(this);
(function() {

  Luca.components.FilterableCollection = Luca.Collection.extend({
    initialize: function(models, options) {
      var params, url,
        _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      Luca.Collection.prototype.initialize.apply(this, arguments);
      this.filter = Luca.Collection.baseParams();
      if (_.isFunction(this.url)) {
        return this.url = _.wrap(this.url, function(fn) {
          var existing_params, new_val, parts, queryString, val;
          val = fn.apply(_this);
          parts = val.split('?');
          if (parts.length > 1) existing_params = _.last(parts);
          queryString = _this.queryString();
          if (existing_params && val.match(existing_params)) {
            queryString = queryString.replace(existing_params, '');
          }
          new_val = "" + val + "?" + queryString;
          if (new_val.match(/\?$/)) new_val = new_val.replace(/\?$/, '');
          return new_val;
        });
      } else {
        url = this.url;
        params = this.queryString();
        return this.url = _([url, params]).compact().join("?");
      }
    },
    queryString: function() {
      var parts,
        _this = this;
      parts = _(this.filter).inject(function(memo, value, key) {
        var str;
        str = "" + key + "=" + value;
        memo.push(str);
        return memo;
      }, []);
      return _.uniq(parts).join("&");
    },
    applyFilter: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) {
        options = {
          auto: true,
          refresh: true
        };
      }
      _.extend(this.filter, filter);
      if (!!options.auto) return this.fetch(options);
    }
  });

}).call(this);
(function() {

  Luca.components.FormButtonToolbar = Luca.components.Toolbar.extend({
    className: 'luca-ui-form-toolbar',
    position: 'bottom',
    includeReset: false,
    render: function() {
      return $(this.container).append(this.el);
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.components.Toolbar.prototype.initialize.apply(this, arguments);
      this.components = [
        {
          ctype: 'button_field',
          label: 'Submit',
          "class": 'submit-button'
        }
      ];
      if (this.includeReset) {
        return this.components.push({
          ctype: 'button_field',
          label: 'Reset',
          "class": 'reset-button'
        });
      }
    }
  });

  Luca.register("form_button_toolbar", "Luca.components.FormButtonToolbar");

}).call(this);
(function() {

  Luca.components.FormView = Luca.core.Container.extend({
    tagName: 'form',
    className: 'luca-ui-form-view',
    hooks: ["before:submit", "before:reset", "before:load", "before:load:new", "before:load:existing", "after:submit", "after:reset", "after:load", "after:load:new", "after:load:existing", "after:submit:success", "after:submit:fatal_error", "after:submit:error"],
    events: {
      "click .submit-button": "submitHandler",
      "click .reset-button": "resetHandler"
    },
    labelAlign: 'top',
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      this.debug("form view initialized");
      this.state || (this.state = new Backbone.Model);
      this.setupHooks(this.hooks);
      this.legend || (this.legend = "");
      if (this.toolbar === true) {
        this.toolbars = [
          {
            ctype: 'form_button_toolbar',
            includeReset: true,
            position: 'bottom'
          }
        ];
      }
      if (this.toolbars && this.toolbars.length) {
        this.bind("after:render", _.once(this.renderToolbars));
      }
      return _.bindAll(this, "submitHandler", "resetHandler", "renderToolbars");
    },
    resetHandler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("before:reset", this);
      this.reset();
      return this.trigger("after:reset", this);
    },
    submitHandler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("before:submit", this);
      return this.submit();
    },
    beforeLayout: function() {
      var _ref;
      if ((_ref = Luca.core.Container.prototype.beforeLayout) != null) {
        _ref.apply(this, arguments);
      }
      $(this.el).html(Luca.templates["components/form_view"](this));
      if (Luca.enableBootstrap) {
        if (this.searchForm) $(this.el).addClass('form-search');
        if (this.horizontalForm) $(this.el).addClass('form-horizontal');
        if (this.inlineForm) $(this.el).addClass('form-inline');
      }
      if (this.fieldLayoutClass) $(this.el).addClass(this.fieldLayoutClass);
      return $(this.el).addClass("label-align-" + this.labelAlign);
    },
    prepareComponents: function() {
      var container;
      container = $('.form-view-body', this.el);
      return _(this.components).each(function(component) {
        return component.container = container;
      });
    },
    render: function() {
      return $(this.container).append($(this.el));
    },
    wrapper: function() {
      return $(this.el).parents('.luca-ui-form-view-wrapper');
    },
    toolbarContainers: function(position) {
      if (position == null) position = "bottom";
      return $(".toolbar-container." + position, this.wrapper()).first();
    },
    renderToolbars: function() {
      var _this = this;
      return _(this.toolbars).each(function(toolbar) {
        toolbar.container = $("#" + _this.cid + "-" + toolbar.position + "-toolbar-container");
        toolbar = Luca.util.LazyObject(toolbar);
        return toolbar.render();
      });
    },
    getField: function(name) {
      return _(this.getFields('name', name)).first();
    },
    getFields: function(attr, value) {
      var fields;
      fields = this.select("isField", true, true);
      if (fields.length > 0 && attr && value) {
        fields = _(fields).select(function(field) {
          var property, propvalue;
          property = field[attr];
          if (property == null) return false;
          propvalue = _.isFunction(property) ? property() : property;
          return value === propvalue;
        });
      }
      return fields;
    },
    loadModel: function(current_model) {
      var event, fields, form,
        _this = this;
      this.current_model = current_model;
      form = this;
      fields = this.getFields();
      this.trigger("before:load", this, this.current_model);
      if (this.current_model) {
        event = "before:load:" + (this.current_model.isNew() ? "new" : "existing");
        this.trigger(event, this, this.current_model);
      }
      _(fields).each(function(field) {
        var field_name, value;
        field_name = field.input_name || field.name;
        value = _.isFunction(_this.current_model[field_name]) ? _this.current_model[field_name].apply(_this, form) : _this.current_model.get(field_name);
        if (field.readOnly !== true) {
          return field != null ? field.setValue(value) : void 0;
        }
      });
      this.trigger("after:load", this, this.current_model);
      if (this.current_model) {
        return this.trigger("after:load:" + (this.current_model.isNew() ? "new" : "existing"), this, this.current_model);
      }
    },
    reset: function() {
      return this.loadModel(this.current_model);
    },
    clear: function() {
      var _this = this;
      this.current_model = this.defaultModel != null ? this.defaultModel() : void 0;
      return _(this.getFields()).each(function(field) {
        try {
          return field.setValue('');
        } catch (e) {
          return console.log("Error Clearing", _this, field);
        }
      });
    },
    getValues: function(reject_blank, skip_buttons) {
      if (reject_blank == null) reject_blank = false;
      if (skip_buttons == null) skip_buttons = true;
      return _(this.getFields()).inject(function(memo, field) {
        var skip, value;
        value = field.getValue();
        skip = false;
        if (skip_buttons && field.ctype === "button_field") skip = true;
        if (reject_blank && _.isBlank(value)) skip = true;
        if (field.input_name === "id" && _.isBlank(value)) skip = true;
        if (!skip) memo[field.input_name || name] = value;
        return memo;
      }, {});
    },
    submit_success_handler: function(model, response, xhr) {
      this.trigger("after:submit", this, model, response);
      if (response && response.success) {
        return this.trigger("after:submit:success", this, model, response);
      } else {
        return this.trigger("after:submit:error", this, model, response);
      }
    },
    submit_fatal_error_handler: function() {
      this.trigger.apply(["after:submit", this].concat(arguments));
      return this.trigger.apply(["after:submit:fatal_error", this].concat(arguments));
    },
    submit: function(save, saveOptions) {
      if (save == null) save = true;
      if (saveOptions == null) saveOptions = {};
      _.bindAll(this, "submit_success_handler", "submit_fatal_error_handler");
      saveOptions.success || (saveOptions.success = this.submit_success_handler);
      saveOptions.error || (saveOptions.error = this.submit_fatal_error_handler);
      this.current_model.set(this.getValues());
      if (!save) return;
      return this.current_model.save(this.current_model.toJSON(), saveOptions);
    },
    currentModel: function() {
      return this.current_model;
    },
    setLegend: function(legend) {
      this.legend = legend;
      return $('fieldset legend', this.el).first().html(this.legend);
    }
  });

  Luca.register('form_view', 'Luca.components.FormView');

}).call(this);
(function() {

  Luca.components.GridView = Luca.View.extend({
    events: {
      "dblclick .grid-view-row": "double_click_handler",
      "click .grid-view-row": "click_handler"
    },
    className: 'luca-ui-grid-view',
    scrollable: true,
    emptyText: 'No Results To display',
    hooks: ["before:grid:render", "before:render:header", "before:render:row", "after:grid:render", "row:double:click", "row:click", "after:collection:load"],
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.modules.Deferrable);
      Luca.View.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "rowDoubleClick", "rowClick");
      this.configure_collection();
      return this.collection.bind("reset", function(collection) {
        _this.refresh();
        return _this.trigger("after:collection:load", collection);
      });
    },
    beforeRender: function() {
      this.trigger("before:grid:render", this);
      if (this.scrollable) $(this.el).addClass('scrollable-grid-view');
      $(this.el).html(Luca.templates["components/grid_view"]());
      this.table = $('table.luca-ui-grid-view', this.el);
      this.header = $("thead", this.table);
      this.body = $("tbody", this.table);
      this.footer = $("tfoot", this.table);
      if (this.scrollable) this.setDimensions();
      this.renderHeader();
      this.emptyMessage();
      this.renderToolbars();
      return $(this.container).append($(this.el));
    },
    toolbarContainers: function(position) {
      if (position == null) position = "bottom";
      return $(".toolbar-container." + position, this.el);
    },
    renderToolbars: function() {
      var _this = this;
      return _(this.toolbars).each(function(toolbar) {
        toolbar = Luca.util.LazyObject(toolbar);
        toolbar.container = _this.toolbarContainers(toolbar.position);
        return toolbar.render();
      });
    },
    setDimensions: function() {
      var _this = this;
      this.height || (this.height = 285);
      $('.grid-view-body', this.el).height(this.height);
      $('tbody.scrollable', this.el).height(this.height - 23);
      this.container_width = (function() {
        return $(_this.container).width();
      })();
      this.width || (this.width = this.container_width > 0 ? this.container_width : 756);
      $('.grid-view-body', this.el).width(this.width);
      $('.grid-view-body table', this.el).width(this.width);
      return this.setDefaultColumnWidths();
    },
    resize: function(newWidth) {
      var difference, distribution,
        _this = this;
      difference = newWidth - this.width;
      this.width = newWidth;
      $('.grid-view-body', this.el).width(this.width);
      $('.grid-view-body table', this.el).width(this.width);
      if (this.columns.length > 0) {
        distribution = difference / this.columns.length;
        return _(this.columns).each(function(col, index) {
          var column;
          column = $(".column-" + index, _this.el);
          return column.width(col.width = col.width + distribution);
        });
      }
    },
    padLastColumn: function() {
      var configured_column_widths, unused_width;
      configured_column_widths = _(this.columns).inject(function(sum, column) {
        return sum = column.width + sum;
      }, 0);
      unused_width = this.width - configured_column_widths;
      if (unused_width > 0) return this.lastColumn().width += unused_width;
    },
    setDefaultColumnWidths: function() {
      var default_column_width;
      default_column_width = this.columns.length > 0 ? this.width / this.columns.length : 200;
      _(this.columns).each(function(column) {
        return column.width || (column.width = default_column_width);
      });
      return this.padLastColumn();
    },
    lastColumn: function() {
      return this.columns[this.columns.length - 1];
    },
    afterRender: function() {
      this.refresh();
      return this.trigger("after:grid:render", this);
    },
    emptyMessage: function(text) {
      if (text == null) text = "";
      text || (text = this.emptyText);
      this.body.html('');
      return this.body.append(Luca.templates["components/grid_view_empty_text"]({
        colspan: this.columns.length,
        text: text
      }));
    },
    refresh: function() {
      var _this = this;
      this.body.html('');
      this.collection.each(function(model, index) {
        return _this.render_row.apply(_this, [model, index]);
      });
      if (this.collection.models.length === 0) return this.emptyMessage();
    },
    ifLoaded: function(fn, scope) {
      scope || (scope = this);
      fn || (fn = function() {
        return true;
      });
      return this.collection.ifLoaded(fn, scope);
    },
    applyFilter: function(values, options) {
      if (options == null) {
        options = {
          auto: true,
          refresh: true
        };
      }
      return this.collection.applyFilter(values, options);
    },
    renderHeader: function() {
      var headers,
        _this = this;
      this.trigger("before:render:header");
      headers = _(this.columns).map(function(column, column_index) {
        var style;
        style = column.width ? "width:" + column.width + "px;" : "";
        return "<th style='" + style + "' class='column-" + column_index + "'>" + column.header + "</th>";
      });
      return this.header.append("<tr>" + headers + "</tr>");
    },
    render_row: function(row, row_index) {
      var alt_class, cells, model_id, _ref,
        _this = this;
      model_id = (row != null ? row.get : void 0) && (row != null ? row.attributes : void 0) ? row.get('id') : '';
      this.trigger("before:render:row", row, row_index);
      cells = _(this.columns).map(function(column, col_index) {
        var display, style, value;
        value = _this.cell_renderer(row, column, col_index);
        style = column.width ? "width:" + column.width + "px;" : "";
        display = _.isUndefined(value) ? "" : value;
        return "<td style='" + style + "' class='column-" + col_index + "'>" + display + "</td>";
      });
      alt_class = row_index % 2 === 0 ? "even" : "odd";
      return (_ref = this.body) != null ? _ref.append("<tr data-record-id='" + model_id + "' data-row-index='" + row_index + "' class='grid-view-row " + alt_class + "' id='row-" + row_index + "'>" + cells + "</tr>") : void 0;
    },
    cell_renderer: function(row, column, columnIndex) {
      var source;
      if (_.isFunction(column.renderer)) {
        return column.renderer.apply(this, [row, column, columnIndex]);
      } else if (column.data.match(/\w+\.\w+/)) {
        source = row.attributes || row;
        return Luca.util.nestedValue(column.data, source);
      } else {
        return (typeof row.get === "function" ? row.get(column.data) : void 0) || row[column.data];
      }
    },
    double_click_handler: function(e) {
      var me, my, record, rowIndex;
      me = my = $(e.currentTarget);
      rowIndex = my.data('row-index');
      record = this.collection.at(rowIndex);
      return this.trigger("row:double:click", this, record, rowIndex);
    },
    click_handler: function(e) {
      var me, my, record, rowIndex;
      me = my = $(e.currentTarget);
      rowIndex = my.data('row-index');
      record = this.collection.at(rowIndex);
      this.trigger("row:click", this, record, rowIndex);
      $('.grid-view-row', this.body).removeClass('selected-row');
      return me.addClass('selected-row');
    }
  });

  Luca.register("grid_view", "Luca.components.GridView");

}).call(this);
(function() {

  Luca.components.BreadCrumbNavigation = Luca.View.extend({
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.View.prototype.initialize.apply(this, arguments);
    }
  });

}).call(this);
(function() {

  Luca.components.Template = Luca.View.extend({
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.View.prototype.initialize.apply(this, arguments);
      if (!(this.template || this.markup)) {
        throw "Templates must specify which template / markup to use";
      }
    },
    beforeRender: function() {
      return $(this.el).html(this.markup || JST[this.template](this.options));
    },
    render: function() {
      return $(this.container).append(this.el);
    }
  });

  Luca.register("template", "Luca.components.Template");

}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/form_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-form-view-wrapper\' id=\'', cid ,'-wrapper\'>\n  <div class=\'form-view-header\'>\n    <div class=\'toolbar-container top\' id=\'', cid ,'-top-toolbar-container\'></div>\n  </div>\n  '); if(legend){ __p.push('\n  <fieldset>\n    <legend>\n      ', legend ,'\n    </legend>\n    <div class=\'form-view-flash-container\'></div>\n    <div class=\'form-view-body\'></div>\n  </fieldset>\n  '); } else { __p.push('\n  <ul class=\'form-view-flash-container\'></ul>\n  <div class=\'form-view-body\'></div>\n  '); } __p.push('\n  <div class=\'form-view-footer\'>\n    <div class=\'toolbar-container bottom\' id=\'', cid ,'-bottom-toolbar-container\'></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/grid_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-grid-view-wrapper\'>\n  <div class=\'grid-view-header\'>\n    <div class=\'toolbar-container top\'></div>\n  </div>\n  <div class=\'grid-view-body\'>\n    <table cellpadding=\'0\' cellspacing=\'0\' class=\'luca-ui-grid-view scrollable-table\' width=\'100%\'>\n      <thead class=\'fixed\'></thead>\n      <tbody class=\'scrollable\'></tbody>\n    </table>\n  </div>\n  <div class=\'grid-view-footer\'>\n    <div class=\'toolbar-container bottom\'></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/grid_view_empty_text"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'empty-text-wrapper\'>\n  <p>\n    ', text ,'\n  </p>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/basic"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'', classes ,'\' id=\'', id ,'\' style=\'', style ,'\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/tab_selector_container"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-tab-container\' id=\'', cid ,'-tab-container\'>\n  <ul></ul>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/tab_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-tab-panel-container\' id=\'', cid ,'-tab-panel-container\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/toolbar_wrapper"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-toolbar-wrapper\' id=\'', id ,'\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/button_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label>&nbsp</label>\n<input class=\'', input_class ,'\' id=\'', input_id ,'\' style=\'', inputStyles ,'\' type=\'', input_type ,'\' value=\'', input_value ,'\' />\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/checkbox_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  ', label ,'\n  <input name=\'', input_name ,'\' style=\'', inputStyles ,'\' type=\'checkbox\' value=\'', input_value ,'\' />\n</label>\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/file_upload_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  ', label ,'\n</label>\n<input id=\'', input_id ,'\' name=\'', input_name ,'\' style=\'', inputStyles ,'\' type=\'file\' />\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/hidden_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<input id=\'', input_id ,'\' name=\'', input_name ,'\' type=\'hidden\' value=\'', input_value ,'\' />\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/select_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  ', label ,'\n</label>\n<select id=\'', input_id ,'\' name=\'', input_name ,'\' style=\'', inputStyles ,'\'></select>\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/text_area_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  ', label ,'\n</label>\n<textarea class=\'', input_class ,'\' id=\'', input_id ,'\' name=\'', input_name ,'\' style=\'', inputStyles ,'\'></textarea>\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/text_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label class=\'control-label\' for=\'', input_id ,'\'>\n  ', label ,'\n</label>\n'); if( typeof(addOn) !== "undefined" ) { __p.push('\n<span class=\'add-on\'>\n  ', addOn ,'\n</span>\n'); } __p.push('\n<input id=\'', input_id ,'\' name=\'', input_name ,'\' placeholder=\'', placeHolder ,'\' style=\'', inputStyles ,'\' type=\'text\' />\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sample/contents"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<p>Sample Contents</p>\n');}return __p.join('');};
}).call(this);
(function() {



}).call(this);
