/*! jQuery v1.7.1 jquery.com | jquery.org/license */

(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=r.unshift,l=i.toString,c=i.hasOwnProperty,h=r.forEach,p=r.map,d=r.reduce,v=r.reduceRight,m=r.filter,g=r.every,y=r.some,b=r.indexOf,w=r.lastIndexOf,E=Array.isArray,S=Object.keys,x=s.bind,T=function(e){if(e instanceof T)return e;if(!(this instanceof T))return new T(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=T),exports._=T):e._=T,T.VERSION="1.4.2";var N=T.each=T.forEach=function(e,t,r){if(e==null)return;if(h&&e.forEach===h)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(T.has(e,o)&&t.call(r,e[o],o,e)===n)return};T.map=T.collect=function(e,t,n){var r=[];return e==null?r:p&&e.map===p?e.map(t,n):(N(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),r)},T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduce===d)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);N(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),arguments.length>2?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=T.keys(e);s=o.length}N(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.find=T.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},T.filter=T.select=function(e,t,n){var r=[];return e==null?r:m&&e.filter===m?e.filter(t,n):(N(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)}),r)},T.reject=function(e,t,n){var r=[];return e==null?r:(N(e,function(e,i,s){t.call(n,e,i,s)||(r[r.length]=e)}),r)},T.every=T.all=function(e,t,r){t||(t=T.identity);var i=!0;return e==null?i:g&&e.every===g?e.every(t,r):(N(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=T.some=T.any=function(e,t,r){t||(t=T.identity);var i=!1;return e==null?i:y&&e.some===y?e.some(t,r):(N(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};T.contains=T.include=function(e,t){var n=!1;return e==null?n:b&&e.indexOf===b?e.indexOf(t)!=-1:(n=C(e,function(e){return e===t}),n)},T.invoke=function(e,t){var n=u.call(arguments,2);return T.map(e,function(e){return(T.isFunction(t)?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,function(e){return e[t]})},T.where=function(e,t){return T.isEmpty(t)?[]:T.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&T.isEmpty(e))return-Infinity;var r={computed:-Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&T.isEmpty(e))return Infinity;var r={computed:Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},T.shuffle=function(e){var t,n=0,r=[];return N(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r};var k=function(e){return T.isFunction(e)?e:function(t){return t[e]}};T.sortBy=function(e,t,n){var r=k(t);return T.pluck(T.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t);return N(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)}),i};T.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(T.has(e,t)?e[t]:e[t]=[]).push(n)})},T.countBy=function(e,t,n){return L(e,t,n,function(e,t,n){T.has(e,t)||(e[t]=0),e[t]++})},T.sortedIndex=function(e,t,n,r){n=n==null?T.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},T.toArray=function(e){return e?e.length===+e.length?u.call(e):T.values(e):[]},T.size=function(e){return e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return t!=null&&!n?u.call(e,0,t):e[0]},T.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},T.last=function(e,t,n){return t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]},T.rest=T.tail=T.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},T.compact=function(e){return T.filter(e,function(e){return!!e})};var A=function(e,t,n){return N(e,function(e){T.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n};T.flatten=function(e,t){return A(e,t,[])},T.without=function(e){return T.difference(e,u.call(arguments,1))},T.uniq=T.unique=function(e,t,n,r){var i=n?T.map(e,n,r):e,s=[],o=[];return N(i,function(n,r){if(t?!r||o[o.length-1]!==n:!T.contains(o,n))o.push(n),s.push(e[r])}),s},T.union=function(){return T.uniq(a.apply(r,arguments))},T.intersection=function(e){var t=u.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.indexOf(t,e)>=0})})},T.difference=function(e){var t=a.apply(r,u.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){var e=u.call(arguments),t=T.max(T.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=T.pluck(e,""+r);return n},T.object=function(e,t){var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(b&&e.indexOf===b)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(w&&e.lastIndexOf===w)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};T.bind=function(t,n){var r,i;if(t.bind===x&&x)return x.apply(t,u.call(arguments,1));if(!T.isFunction(t))throw new TypeError;return i=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=t.prototype;var e=new O,s=t.apply(e,i.concat(u.call(arguments)));return Object(s)===s?s:e}return t.apply(n,i.concat(u.call(arguments)))}},T.bindAll=function(e){var t=u.call(arguments,1);return t.length==0&&(t=T.functions(e)),N(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(u.call(arguments,1)))},T.throttle=function(e,t){var n,r,i,s,o,u,a=T.debounce(function(){o=s=!1},t);return function(){n=this,r=arguments;var f=function(){i=null,o&&(u=e.apply(n,r)),a()};return i||(i=setTimeout(f,t)),s?o=!0:(s=!0,u=e.apply(n,r)),a(),u}},T.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},T.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},T.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},T.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},T.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)T.has(e,n)&&(t[t.length]=n);return t},T.values=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push(e[n]);return t},T.pairs=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push([n,e[n]]);return t},T.invert=function(e){var t={};for(var n in e)T.has(e,n)&&(t[e[n]]=n);return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return N(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)T.contains(n,i)||(t[i]=e[i]);return t},T.defaults=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]==null&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e),r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length,u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,f=t.constructor;if(a!==f&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(f)&&f instanceof f))return!1;for(var c in e)if(T.has(e,c)){o++;if(!(u=T.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(T.has(t,c)&&!(o--))break;u=!o}}return n.pop(),r.pop(),u};T.isEqual=function(e,t){return M(e,t,[],[])},T.isEmpty=function(e){if(e==null)return!0;if(T.isArray(e)||T.isString(e))return e.length===0;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!!e&&e.nodeType===1},T.isArray=E||function(e){return l.call(e)=="[object Array]"},T.isObject=function(e){return e===Object(e)},N(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!!e&&!!T.has(e,"callee")}),typeof /./!="function"&&(T.isFunction=function(e){return typeof e=="function"}),T.isFinite=function(e){return T.isNumber(e)&&isFinite(e)},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||l.call(e)=="[object Boolean]"},T.isNull=function(e){return e===null},T.isUndefined=function(e){return e===void 0},T.has=function(e,t){return c.call(e,t)},T.noConflict=function(){return e._=t,this},T.identity=function(e){return e},T.times=function(e,t,n){for(var r=0;r<e;r++)t.call(n,r)},T.random=function(e,t){return t==null&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=T.invert(_.escape);var D={escape:new RegExp("["+T.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(_.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),T.result=function(e,t){if(e==null)return null;var n=e[t];return T.isFunction(n)?n.call(e):n},T.mixin=function(e){N(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(T,e))}})};var P=0;T.uniqueId=function(e){var t=P++;return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","  ":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){n=T.defaults({},n,T.templateSettings);var r=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,n,r,o,u){s+=e.slice(i,u).replace(j,function(e){return"\\"+B[e]}),s+=n?"'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?"'+\n((__t=("+r+"))==null?'':__t)+\n'":o?"';\n"+o+"\n__p+='":"",i=u+t.length}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(n.variable||"obj","_",s)}catch(u){throw u.source=s,u}if(t)return o(t,T);var a=function(e){return o.call(this,e,T)};return a.source="function("+(n.variable||"obj")+"){\n"+s+"}",a},T.chain=function(e){return T(e).chain()};var F=function(e){return this._chain?T(e).chain():e};T.mixin(T),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),N(["concat","join","slice"],function(e){var t=r[e];T.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
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
// Backbone.js 0.9.2

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var l=this,y=l.Backbone,z=Array.prototype.slice,A=Array.prototype.splice,g;g="undefined"!==typeof exports?exports:l.Backbone={};g.VERSION="0.9.2";var f=l._;!f&&"undefined"!==typeof require&&(f=require("underscore"));var i=l.jQuery||l.Zepto||l.ender;g.setDomLibrary=function(a){i=a};g.noConflict=function(){l.Backbone=y;return this};g.emulateHTTP=!1;g.emulateJSON=!1;var p=/\s+/,k=g.Events={on:function(a,b,c){var d,e,f,g,j;if(!b)return this;a=a.split(p);for(d=this._callbacks||(this._callbacks=
{});e=a.shift();)f=(j=d[e])?j.tail:{},f.next=g={},f.context=c,f.callback=b,d[e]={tail:g,next:j?j.next:f};return this},off:function(a,b,c){var d,e,h,g,j,q;if(e=this._callbacks){if(!a&&!b&&!c)return delete this._callbacks,this;for(a=a?a.split(p):f.keys(e);d=a.shift();)if(h=e[d],delete e[d],h&&(b||c))for(g=h.tail;(h=h.next)!==g;)if(j=h.callback,q=h.context,b&&j!==b||c&&q!==c)this.on(d,j,q);return this}},trigger:function(a){var b,c,d,e,f,g;if(!(d=this._callbacks))return this;f=d.all;a=a.split(p);for(g=
z.call(arguments,1);b=a.shift();){if(c=d[b])for(e=c.tail;(c=c.next)!==e;)c.callback.apply(c.context||this,g);if(c=f){e=c.tail;for(b=[b].concat(g);(c=c.next)!==e;)c.callback.apply(c.context||this,b)}}return this}};k.bind=k.on;k.unbind=k.off;var o=g.Model=function(a,b){var c;a||(a={});b&&b.parse&&(a=this.parse(a));if(c=n(this,"defaults"))a=f.extend({},c,a);b&&b.collection&&(this.collection=b.collection);this.attributes={};this._escapedAttributes={};this.cid=f.uniqueId("c");this.changed={};this._silent=
{};this._pending={};this.set(a,{silent:!0});this.changed={};this._silent={};this._pending={};this._previousAttributes=f.clone(this.attributes);this.initialize.apply(this,arguments)};f.extend(o.prototype,k,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.get(a);return this._escapedAttributes[a]=f.escape(null==
b?"":""+b)},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c||(c={});if(!d)return this;d instanceof o&&(d=d.attributes);if(c.unset)for(e in d)d[e]=void 0;if(!this._validate(d,c))return!1;this.idAttribute in d&&(this.id=d[this.idAttribute]);var b=c.changes={},h=this.attributes,g=this._escapedAttributes,j=this._previousAttributes||{};for(e in d){a=d[e];if(!f.isEqual(h[e],a)||c.unset&&f.has(h,e))delete g[e],(c.silent?this._silent:
b)[e]=!0;c.unset?delete h[e]:h[e]=a;!f.isEqual(j[e],a)||f.has(h,e)!=f.has(j,e)?(this.changed[e]=a,c.silent||(this._pending[e]=!0)):(delete this.changed[e],delete this._pending[e])}c.silent||this.change(c);return this},unset:function(a,b){(b||(b={})).unset=!0;return this.set(a,null,b)},clear:function(a){(a||(a={})).unset=!0;return this.set(f.clone(this.attributes),a)},fetch:function(a){var a=a?f.clone(a):{},b=this,c=a.success;a.success=function(d,e,f){if(!b.set(b.parse(d,f),a))return!1;c&&c(b,d)};
a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},save:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c=c?f.clone(c):{};if(c.wait){if(!this._validate(d,c))return!1;e=f.clone(this.attributes)}a=f.extend({},c,{silent:!0});if(d&&!this.set(d,c.wait?a:c))return!1;var h=this,i=c.success;c.success=function(a,b,e){b=h.parse(a,e);if(c.wait){delete c.wait;b=f.extend(d||{},b)}if(!h.set(b,c))return false;i?i(h,a):h.trigger("sync",h,a,c)};c.error=g.wrapError(c.error,
h,c);b=this.isNew()?"create":"update";b=(this.sync||g.sync).call(this,b,this,c);c.wait&&this.set(e,a);return b},destroy:function(a){var a=a?f.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(this.isNew())return d(),!1;a.success=function(e){a.wait&&d();c?c(b,e):b.trigger("sync",b,e,a)};a.error=g.wrapError(a.error,b,a);var e=(this.sync||g.sync).call(this,"delete",this,a);a.wait||d();return e},url:function(){var a=n(this,"urlRoot")||n(this.collection,"url")||t();
return this.isNew()?a:a+("/"==a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){a||(a={});var b=this._changing;this._changing=!0;for(var c in this._silent)this._pending[c]=!0;var d=f.extend({},a.changes,this._silent);this._silent={};for(c in d)this.trigger("change:"+c,this,this.get(c),a);if(b)return this;for(;!f.isEmpty(this._pending);){this._pending=
{};this.trigger("change",this,a);for(c in this.changed)!this._pending[c]&&!this._silent[c]&&delete this.changed[c];this._previousAttributes=f.clone(this.attributes)}this._changing=!1;return this},hasChanged:function(a){return!arguments.length?!f.isEmpty(this.changed):f.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this.changed):!1;var b,c=!1,d=this._previousAttributes,e;for(e in a)if(!f.isEqual(d[e],b=a[e]))(c||(c={}))[e]=b;return c},previous:function(a){return!arguments.length||
!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;var a=f.extend({},this.attributes,a),c=this.validate(a,b);if(!c)return!0;b&&b.error?b.error(this,c,b):this.trigger("error",this,c,b);return!1}});var r=g.Collection=function(a,b){b||(b={});b.model&&(this.model=b.model);b.comparator&&(this.comparator=b.comparator);
this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,{silent:!0,parse:b.parse})};f.extend(r.prototype,k,{model:o,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},add:function(a,b){var c,d,e,g,i,j={},k={},l=[];b||(b={});a=f.isArray(a)?a.slice():[a];c=0;for(d=a.length;c<d;c++){if(!(e=a[c]=this._prepareModel(a[c],b)))throw Error("Can't add an invalid model to a collection");g=e.cid;i=e.id;j[g]||this._byCid[g]||null!=i&&(k[i]||this._byId[i])?
l.push(c):j[g]=k[i]=e}for(c=l.length;c--;)a.splice(l[c],1);c=0;for(d=a.length;c<d;c++)(e=a[c]).on("all",this._onModelEvent,this),this._byCid[e.cid]=e,null!=e.id&&(this._byId[e.id]=e);this.length+=d;A.apply(this.models,[null!=b.at?b.at:this.models.length,0].concat(a));this.comparator&&this.sort({silent:!0});if(b.silent)return this;c=0;for(d=this.models.length;c<d;c++)if(j[(e=this.models[c]).cid])b.index=c,e.trigger("add",e,this,b);return this},remove:function(a,b){var c,d,e,g;b||(b={});a=f.isArray(a)?
a.slice():[a];c=0;for(d=a.length;c<d;c++)if(g=this.getByCid(a[c])||this.get(a[c]))delete this._byId[g.id],delete this._byCid[g.cid],e=this.indexOf(g),this.models.splice(e,1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g);return this},push:function(a,b){a=this._prepareModel(a,b);this.add(a,b);return a},pop:function(a){var b=this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){a=this._prepareModel(a,b);this.add(a,f.extend({at:0},b));return a},
shift:function(a){var b=this.at(0);this.remove(b,a);return b},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return f.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);1==this.comparator.length?
this.models=this.sortBy(b):this.models.sort(b);a.silent||this.trigger("reset",this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]);b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);this._reset();this.add(a,f.extend({silent:!0},b));b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?f.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;a.success=function(d,
e,f){b[a.add?"add":"reset"](b.parse(d,f),a);c&&c(b,d)};a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},create:function(a,b){var c=this,b=b?f.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||c.add(a,b);var d=b.success;b.success=function(e,f){b.wait&&c.add(e,b);d?d(e,f):e.trigger("sync",a,f,b)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId=
{};this._byCid={}},_prepareModel:function(a,b){b||(b={});a instanceof o?a.collection||(a.collection=this):(b.collection=this,a=new this.model(a,b),a._validate(a.attributes,b)||(a=!1));return a},_removeReference:function(a){this==a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"==a||"remove"==a)&&c!=this||("destroy"==a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,
arguments))}});f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),function(a){r.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});var u=g.Router=function(a){a||(a={});a.routes&&(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)},B=/:\w+/g,
C=/\*\w+/g,D=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(u.prototype,k,{initialize:function(){},route:function(a,b,c){g.history||(g.history=new m);f.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,
this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(D,"\\$&").replace(B,"([^/]+)").replace(C,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var m=g.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")},s=/^[#\/]/,E=/msie [\w.]+/;m.started=!1;f.extend(m.prototype,k,{interval:50,getHash:function(a){return(a=(a?a.location:window.location).href.match(/#(.*)$/))?a[1]:
""},getFragment:function(a,b){if(null==a)if(this._hasPushState||b){var a=window.location.pathname,c=window.location.search;c&&(a+=c)}else a=this.getHash();a.indexOf(this.options.root)||(a=a.substr(this.options.root.length));return a.replace(s,"")},start:function(a){if(m.started)throw Error("Backbone.history has already been started");m.started=!0;this.options=f.extend({},{root:"/"},this.options,a);this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=
!(!this.options.pushState||!window.history||!window.history.pushState);var a=this.getFragment(),b=document.documentMode;if(b=E.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b))this.iframe=i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);this._hasPushState?i(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!b?i(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,
this.interval));this.fragment=a;a=window.location;b=a.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&b&&a.hash&&(this.fragment=this.getHash().replace(s,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},
stop:function(){i(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);m.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a==this.fragment)return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return f.any(this.handlers,
function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){if(!m.started)return!1;if(!b||!0===b)b={trigger:b};var c=(a||"").replace(s,"");this.fragment!=c&&(this._hasPushState?(0!=c.indexOf(this.options.root)&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.getHash(this.iframe))&&(b.replace||
this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a))},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});var v=g.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()},F=/^(\S+)\s*(.*)$/,w="model,collection,el,id,attributes,className,tagName".split(",");
f.extend(v.prototype,k,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();return this},make:function(a,b,c){a=document.createElement(a);b&&i(a).attr(b);c&&i(a).html(c);return a},setElement:function(a,b){this.$el&&this.undelegateEvents();this.$el=a instanceof i?a:i(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=n(this,"events"))){this.undelegateEvents();
for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Method "'+a[b]+'" does not exist');var d=b.match(F),e=d[1],d=d[2],c=f.bind(c,this),e=e+(".delegateEvents"+this.cid);""===d?this.$el.bind(e,c):this.$el.delegate(d,e,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=w.length;b<c;b++){var d=w[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,
!1);else{var a=n(this,"attributes")||{};this.id&&(a.id=this.id);this.className&&(a["class"]=this.className);this.setElement(this.make(this.tagName,a),!1)}}});o.extend=r.extend=u.extend=v.extend=function(a,b){var c=G(this,a,b);c.extend=this.extend;return c};var H={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=H[a];c||(c={});var e={type:d,dataType:"json"};c.url||(e.url=n(b,"url")||t());if(!c.data&&b&&("create"==a||"update"==a))e.contentType="application/json",
e.data=JSON.stringify(b.toJSON());g.emulateJSON&&(e.contentType="application/x-www-form-urlencoded",e.data=e.data?{model:e.data}:{});if(g.emulateHTTP&&("PUT"===d||"DELETE"===d))g.emulateJSON&&(e.data._method=d),e.type="POST",e.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)};"GET"!==e.type&&!g.emulateJSON&&(e.processData=!1);return i.ajax(f.extend(e,c))};g.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d;a?a(b,e,c):b.trigger("error",b,e,c)}};var x=function(){},G=function(a,
b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)};f.extend(d,a);x.prototype=a.prototype;d.prototype=new x;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},n=function(a,b){return!a||!a[b]?null:f.isFunction(a[b])?a[b]():a[b]},t=function(){throw Error('A "url" property or function must be specified');}}).call(this);
((function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};h=function(a){var b,c,d,e,f,g,i;i=[];for(b in a){e=a[b],c={key:b};if(_.isRegExp(e))c.type="$regex",c.value=e;else if(_(e).isObject()&&!_(e).isArray())for(f in e){g=e[f];if(n(f,g)){c.type=f;switch(f){case"$elemMatch":case"$relationMatch":c.value=h(g);break;case"$computed":d={},d[b]=g,c.value=h(d);break;default:c.value=g}}}else c.type="$equal",c.value=e;c.type==="$equal"&&_(c.value).isObject()&&(c.type="$oEqual"),i.push(c)}return i},n=function(a,b){switch(a){case"$in":case"$nin":case"$all":case"$any":return _(b).isArray();case"$size":return _(b).isNumber();case"$regex":return _(b).isRegExp();case"$like":case"$likeI":return _(b).isString();case"$between":return _(b).isArray()&&b.length===2;case"$cb":return _(b).isFunction();default:return!0}},m=function(a,b){switch(a){case"$like":case"$likeI":case"$regex":return _(b).isString();case"$contains":case"$all":case"$any":case"$elemMatch":return _(b).isArray();case"$size":return _(b).isArray()||_(b).isString();case"$in":case"$nin":return b!=null;case"$relationMatch":return b!=null&&b.models;default:return!0}},i=function(b,c,d,e,g){switch(b){case"$equal":return _(d).isArray()?o.call(d,c)>=0:d===c;case"$oEqual":return _(d).isEqual(c);case"$contains":return o.call(d,c)>=0;case"$ne":return d!==c;case"$lt":return d<c;case"$gt":return d>c;case"$lte":return d<=c;case"$gte":return d>=c;case"$between":return c[0]<d&&d<c[1];case"$in":return o.call(c,d)>=0;case"$nin":return o.call(c,d)<0;case"$all":return _(c).all(function(a){return o.call(d,a)>=0});case"$any":return _(d).any(function(a){return o.call(c,a)>=0});case"$size":return d.length===c;case"$exists":case"$has":return d!=null===c;case"$like":return d.indexOf(c)!==-1;case"$likeI":return d.toLowerCase().indexOf(c.toLowerCase())!==-1;case"$regex":return c.test(d);case"$cb":return c.call(e,d);case"$elemMatch":return f(d,c,!1,a,"elemMatch");case"$relationMatch":return f(d.models,c,!1,a,"relationMatch");case"$computed":return f([e],c,!1,a,"computed");default:return!1}},f=function(a,b,c,d,e){var f;return e==null&&(e=!1),f=e?b:h(b),d(a,function(a){var b,d,g,h,j;for(h=0,j=f.length;h<j;h++){d=f[h],b=function(){switch(e){case"elemMatch":return a[d.key];case"computed":return a[d.key]();default:return a.get(d.key)}}(),g=m(d.type,b),g&&(g=i(d.type,d.value,b,a,d.key));if(c===g)return c}return!c})},b=function(a,b){var c,d,e,f;f=[];for(d=0,e=a.length;d<e;d++)c=a[d],b(c)&&f.push(c);return f},k=function(a,b){var c,d,e,f;f=[];for(d=0,e=a.length;d<e;d++)c=a[d],b(c)||f.push(c);return f},a=function(a,b){var c,d,e;for(d=0,e=a.length;d<e;d++){c=a[d];if(b(c))return!0}return!1},j={$and:function(a,c){return f(a,c,!1,b)},$or:function(a,c){return f(a,c,!0,b)},$nor:function(a,b){return f(a,b,!0,k)},$not:function(a,b){return f(a,b,!1,k)}},c=function(a,b,c){var d,f,g,h;return g=JSON.stringify(b),d=(h=a._query_cache)!=null?h:a._query_cache={},f=d[g],f||(f=e(a,b,c),d[g]=f),f},d=function(a,b){var c,d,e;return c=_.intersection(["$and","$not","$or","$nor"],_(b).keys()),d=a.models,c.length===0?j.$and(d,b):(e=function(a,c){return j[c](a,b[c])},_.reduce(c,e,d))},e=function(a,b,c){var e;return e=d(a,b),c.sortBy&&(e=l(e,c)),e},l=function(a,b){return _(b.sortBy).isString()?a=_(a).sortBy(function(a){return a.get(b.sortBy)}):_(b.sortBy).isFunction()&&(a=_(a).sortBy(b.sortBy)),b.order==="desc"&&(a=a.reverse()),a},g=function(a,b){var c,d,e,f;return b.offset?e=b.offset:b.page?e=(b.page-1)*b.limit:e=0,c=e+b.limit,d=a.slice(e,c),b.pager&&_.isFunction(b.pager)&&(f=Math.ceil(a.length/b.limit),b.pager(f,d)),d};if(typeof require!="undefined"){if(typeof _=="undefined"||_===null)_=require("underscore");if(typeof Backbone=="undefined"||Backbone===null)Backbone=require("backbone")}Backbone.QueryCollection=Backbone.Collection.extend({query:function(a,b){var d;return b==null&&(b={}),b.cache?d=c(this,a,b):d=e(this,a,b),b.limit&&(d=g(d,b)),d},where:function(a,b){return b==null&&(b={}),new this.constructor(this.query(a,b))},reset_query_cache:function(){return this._query_cache={}}}),typeof exports!="undefined"&&(exports.QueryCollection=Backbone.QueryCollection)})).call(this)
;
(function() {



}).call(this);
/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/

!function(e){"use strict";e(function(){e.support.transition=function(){var e=function(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in t)if(e.style[n]!==undefined)return t[n]}();return e&&{end:e}}()})}(window.jQuery),!function(e){"use strict";var t='[data-dismiss="alert"]',n=function(n){e(n).on("click",t,this.close)};n.prototype.close=function(t){function s(){i.trigger("closed").remove()}var n=e(this),r=n.attr("data-target"),i;r||(r=n.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,"")),i=e(r),t&&t.preventDefault(),i.length||(i=n.hasClass("alert")?n:n.parent()),i.trigger(t=e.Event("close"));if(t.isDefaultPrevented())return;i.removeClass("in"),e.support.transition&&i.hasClass("fade")?i.on(e.support.transition.end,s):s()},e.fn.alert=function(t){return this.each(function(){var r=e(this),i=r.data("alert");i||r.data("alert",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.alert.Constructor=n,e(document).on("click.alert.data-api",t,n.prototype.close)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.button.defaults,n)};t.prototype.setState=function(e){var t="disabled",n=this.$element,r=n.data(),i=n.is("input")?"val":"html";e+="Text",r.resetText||n.data("resetText",n[i]()),n[i](r[e]||this.options[e]),setTimeout(function(){e=="loadingText"?n.addClass(t).attr(t,t):n.removeClass(t).removeAttr(t)},0)},t.prototype.toggle=function(){var e=this.$element.closest('[data-toggle="buttons-radio"]');e&&e.find(".active").removeClass("active"),this.$element.toggleClass("active")},e.fn.button=function(n){return this.each(function(){var r=e(this),i=r.data("button"),s=typeof n=="object"&&n;i||r.data("button",i=new t(this,s)),n=="toggle"?i.toggle():n&&i.setState(n)})},e.fn.button.defaults={loadingText:"loading..."},e.fn.button.Constructor=t,e(document).on("click.button.data-api","[data-toggle^=button]",function(t){var n=e(t.target);n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=n,this.options.slide&&this.slide(this.options.slide),this.options.pause=="hover"&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.prototype={cycle:function(t){return t||(this.paused=!1),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},to:function(t){var n=this.$element.find(".item.active"),r=n.parent().children(),i=r.index(n),s=this;if(t>r.length-1||t<0)return;return this.sliding?this.$element.one("slid",function(){s.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",e(r[t]))},pause:function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition.end&&(this.$element.trigger(e.support.transition.end),this.cycle()),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(t,n){var r=this.$element.find(".item.active"),i=n||r[t](),s=this.interval,o=t=="next"?"left":"right",u=t=="next"?"first":"last",a=this,f;this.sliding=!0,s&&this.pause(),i=i.length?i:this.$element.find(".item")[u](),f=e.Event("slide",{relatedTarget:i[0]});if(i.hasClass("active"))return;if(e.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(f);if(f.isDefaultPrevented())return;i.addClass(t),i[0].offsetWidth,r.addClass(o),i.addClass(o),this.$element.one(e.support.transition.end,function(){i.removeClass([t,o].join(" ")).addClass("active"),r.removeClass(["active",o].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger("slid")},0)})}else{this.$element.trigger(f);if(f.isDefaultPrevented())return;r.removeClass("active"),i.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return s&&this.cycle(),this}},e.fn.carousel=function(n){return this.each(function(){var r=e(this),i=r.data("carousel"),s=e.extend({},e.fn.carousel.defaults,typeof n=="object"&&n),o=typeof n=="string"?n:s.slide;i||r.data("carousel",i=new t(this,s)),typeof n=="number"?i.to(n):o?i[o]():s.interval&&i.cycle()})},e.fn.carousel.defaults={interval:5e3,pause:"hover"},e.fn.carousel.Constructor=t,e(document).on("click.carousel.data-api","[data-slide]",function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=e.extend({},i.data(),n.data());i.carousel(s),t.preventDefault()})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.collapse.defaults,n),this.options.parent&&(this.$parent=e(this.options.parent)),this.options.toggle&&this.toggle()};t.prototype={constructor:t,dimension:function(){var e=this.$element.hasClass("width");return e?"width":"height"},show:function(){var t,n,r,i;if(this.transitioning)return;t=this.dimension(),n=e.camelCase(["scroll",t].join("-")),r=this.$parent&&this.$parent.find("> .accordion-group > .in");if(r&&r.length){i=r.data("collapse");if(i&&i.transitioning)return;r.collapse("hide"),i||r.data("collapse",null)}this.$element[t](0),this.transition("addClass",e.Event("show"),"shown"),e.support.transition&&this.$element[t](this.$element[0][n])},hide:function(){var t;if(this.transitioning)return;t=this.dimension(),this.reset(this.$element[t]()),this.transition("removeClass",e.Event("hide"),"hidden"),this.$element[t](0)},reset:function(e){var t=this.dimension();return this.$element.removeClass("collapse")[t](e||"auto")[0].offsetWidth,this.$element[e!==null?"addClass":"removeClass"]("collapse"),this},transition:function(t,n,r){var i=this,s=function(){n.type=="show"&&i.reset(),i.transitioning=0,i.$element.trigger(r)};this.$element.trigger(n);if(n.isDefaultPrevented())return;this.transitioning=1,this.$element[t]("in"),e.support.transition&&this.$element.hasClass("collapse")?this.$element.one(e.support.transition.end,s):s()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},e.fn.collapse=function(n){return this.each(function(){var r=e(this),i=r.data("collapse"),s=typeof n=="object"&&n;i||r.data("collapse",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.collapse.defaults={toggle:!0},e.fn.collapse.Constructor=t,e(document).on("click.collapse.data-api","[data-toggle=collapse]",function(t){var n=e(this),r,i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""),s=e(i).data("collapse")?"toggle":n.data();n[e(i).hasClass("in")?"addClass":"removeClass"]("collapsed"),e(i).collapse(s)})}(window.jQuery),!function(e){"use strict";function r(){e(t).each(function(){i(e(this)).removeClass("open")})}function i(t){var n=t.attr("data-target"),r;return n||(n=t.attr("href"),n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")),r=e(n),r.length||(r=t.parent()),r}var t="[data-toggle=dropdown]",n=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};n.prototype={constructor:n,toggle:function(t){var n=e(this),s,o;if(n.is(".disabled, :disabled"))return;return s=i(n),o=s.hasClass("open"),r(),o||(s.toggleClass("open"),n.focus()),!1},keydown:function(t){var n,r,s,o,u,a;if(!/(38|40|27)/.test(t.keyCode))return;n=e(this),t.preventDefault(),t.stopPropagation();if(n.is(".disabled, :disabled"))return;o=i(n),u=o.hasClass("open");if(!u||u&&t.keyCode==27)return n.click();r=e("[role=menu] li:not(.divider) a",o);if(!r.length)return;a=r.index(r.filter(":focus")),t.keyCode==38&&a>0&&a--,t.keyCode==40&&a<r.length-1&&a++,~a||(a=0),r.eq(a).focus()}},e.fn.dropdown=function(t){return this.each(function(){var r=e(this),i=r.data("dropdown");i||r.data("dropdown",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.dropdown.Constructor=n,e(document).on("click.dropdown.data-api touchstart.dropdown.data-api",r).on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",t,n.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",t+", [role=menu]",n.prototype.keydown)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.backdrop(function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body),t.$element.show(),n&&t.$element[0].offsetWidth,t.$element.addClass("in").attr("aria-hidden",!1),t.enforceFocus(),n?t.$element.one(e.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")})},hide:function(t){t&&t.preventDefault();var n=this;t=e.Event("hide"),this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1,this.escape(),e(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),e.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var t=this;e(document).on("focusin.modal",function(e){t.$element[0]!==e.target&&!t.$element.has(e.target).length&&t.$element.focus()})},escape:function(){var e=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&e.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end),t.hideModal()},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n),t.hideModal()})},hideModal:function(e){this.$element.hide().trigger("hidden"),this.backdrop()},removeBackdrop:function(){this.$backdrop.remove(),this.$backdrop=null},backdrop:function(t){var n=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var i=e.support.transition&&r;this.$backdrop=e('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?e.proxy(this.$element[0].focus,this.$element[0]):e.proxy(this.hide,this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),i?this.$backdrop.one(e.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,e.proxy(this.removeBackdrop,this)):this.removeBackdrop()):t&&t()}},e.fn.modal=function(n){return this.each(function(){var r=e(this),i=r.data("modal"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof n=="object"&&n);i||r.data("modal",i=new t(this,s)),typeof n=="string"?i[n]():s.show&&i.show()})},e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.modal.Constructor=t,e(document).on("click.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this),r=n.attr("href"),i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());t.preventDefault(),i.modal(s).one("hide",function(){n.focus()})})}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("tooltip",e,t)};t.prototype={constructor:t,init:function(t,n,r){var i,s;this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.enabled=!0,this.options.trigger=="click"?this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this)):this.options.trigger!="manual"&&(i=this.options.trigger=="hover"?"mouseenter":"focus",s=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(i+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,e.proxy(this.leave,this))),this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(t){return t=e.extend({},e.fn[this.type].defaults,t,this.$element.data()),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},enter:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);if(!n.options.delay||!n.options.delay.show)return n.show();clearTimeout(this.timeout),n.hoverState="in",this.timeout=setTimeout(function(){n.hoverState=="in"&&n.show()},n.options.delay.show)},leave:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!n.options.delay||!n.options.delay.hide)return n.hide();n.hoverState="out",this.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},show:function(){var e,t,n,r,i,s,o;if(this.hasContent()&&this.enabled){e=this.tip(),this.setContent(),this.options.animation&&e.addClass("fade"),s=typeof this.options.placement=="function"?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,t=/in/.test(s),e.detach().css({top:0,left:0,display:"block"}).insertAfter(this.$element),n=this.getPosition(t),r=e[0].offsetWidth,i=e[0].offsetHeight;switch(t?s.split(" ")[1]:s){case"bottom":o={top:n.top+n.height,left:n.left+n.width/2-r/2};break;case"top":o={top:n.top-i,left:n.left+n.width/2-r/2};break;case"left":o={top:n.top+n.height/2-i/2,left:n.left-r};break;case"right":o={top:n.top+n.height/2-i/2,left:n.left+n.width}}e.offset(o).addClass(s).addClass("in")}},setContent:function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},hide:function(){function r(){var t=setTimeout(function(){n.off(e.support.transition.end).detach()},500);n.one(e.support.transition.end,function(){clearTimeout(t),n.detach()})}var t=this,n=this.tip();return n.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?r():n.detach(),this},fixTitle:function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(t){return e.extend({},t?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},tip:function(){return this.$tip=this.$tip||e(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);n[n.tip().hasClass("in")?"hide":"show"]()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}},e.fn.tooltip=function(n){return this.each(function(){var r=e(this),i=r.data("tooltip"),s=typeof n=="object"&&n;i||r.data("tooltip",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.tooltip.Constructor=t,e.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!1}}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("popover",e,t)};t.prototype=e.extend({},e.fn.tooltip.Constructor.prototype,{constructor:t,setContent:function(){var e=this.tip(),t=this.getTitle(),n=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t),e.find(".popover-content > *")[this.options.html?"html":"text"](n),e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-content")||(typeof n.content=="function"?n.content.call(t[0]):n.content),e},tip:function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}}),e.fn.popover=function(n){return this.each(function(){var r=e(this),i=r.data("popover"),s=typeof n=="object"&&n;i||r.data("popover",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.popover.Constructor=t,e.fn.popover.defaults=e.extend({},e.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(e){"use strict";function t(t,n){var r=e.proxy(this.process,this),i=e(t).is("body")?e(window):e(t),s;this.options=e.extend({},e.fn.scrollspy.defaults,n),this.$scrollElement=i.on("scroll.scroll-spy.data-api",r),this.selector=(this.options.target||(s=e(t).attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=e("body"),this.refresh(),this.process()}t.prototype={constructor:t,refresh:function(){var t=this,n;this.offsets=e([]),this.targets=e([]),n=this.$body.find(this.selector).map(function(){var t=e(this),n=t.data("target")||t.attr("href"),r=/^#\w/.test(n)&&e(n);return r&&r.length&&[[r.position().top,n]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},process:function(){var e=this.$scrollElement.scrollTop()+this.options.offset,t=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,n=t-this.$scrollElement.height(),r=this.offsets,i=this.targets,s=this.activeTarget,o;if(e>=n)return s!=(o=i.last()[0])&&this.activate(o);for(o=r.length;o--;)s!=i[o]&&e>=r[o]&&(!r[o+1]||e<=r[o+1])&&this.activate(i[o])},activate:function(t){var n,r;this.activeTarget=t,e(this.selector).parent(".active").removeClass("active"),r=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',n=e(r).parent("li").addClass("active"),n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate")}},e.fn.scrollspy=function(n){return this.each(function(){var r=e(this),i=r.data("scrollspy"),s=typeof n=="object"&&n;i||r.data("scrollspy",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.scrollspy.Constructor=t,e.fn.scrollspy.defaults={offset:10},e(window).on("load",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);t.scrollspy(t.data())})})}(window.jQuery),!function(e){"use strict";var t=function(t){this.element=e(t)};t.prototype={constructor:t,show:function(){var t=this.element,n=t.closest("ul:not(.dropdown-menu)"),r=t.attr("data-target"),i,s,o;r||(r=t.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));if(t.parent("li").hasClass("active"))return;i=n.find(".active:last a")[0],o=e.Event("show",{relatedTarget:i}),t.trigger(o);if(o.isDefaultPrevented())return;s=e(r),this.activate(t.parent("li"),n),this.activate(s,s.parent(),function(){t.trigger({type:"shown",relatedTarget:i})})},activate:function(t,n,r){function o(){i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),t.addClass("active"),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active"),r&&r()}var i=n.find("> .active"),s=r&&e.support.transition&&i.hasClass("fade");s?i.one(e.support.transition.end,o):o(),i.removeClass("in")}},e.fn.tab=function(n){return this.each(function(){var r=e(this),i=r.data("tab");i||r.data("tab",i=new t(this)),typeof n=="string"&&i[n]()})},e.fn.tab.Constructor=t,e(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault(),e(this).tab("show")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.typeahead.defaults,n),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.$menu=e(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};t.prototype={constructor:t,select:function(){var e=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(e)).change(),this.hide()},updater:function(e){return e},show:function(){var t=e.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:t.top+t.height,left:t.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(t){var n;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(n=e.isFunction(this.source)?this.source(this.query,e.proxy(this.process,this)):this.source,n?this.process(n):this)},process:function(t){var n=this;return t=e.grep(t,function(e){return n.matcher(e)}),t=this.sorter(t),t.length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(e){return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){var t=[],n=[],r=[],i;while(i=e.shift())i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query)?n.push(i):r.push(i):t.push(i);return t.concat(n,r)},highlighter:function(e){var t=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return e.replace(new RegExp("("+t+")","ig"),function(e,t){return"<strong>"+t+"</strong>"})},render:function(t){var n=this;return t=e(t).map(function(t,r){return t=e(n.options.item).attr("data-value",r),t.find("a").html(n.highlighter(r)),t[0]}),t.first().addClass("active"),this.$menu.html(t),this},next:function(t){var n=this.$menu.find(".active").removeClass("active"),r=n.next();r.length||(r=e(this.$menu.find("li")[0])),r.addClass("active")},prev:function(e){var t=this.$menu.find(".active").removeClass("active"),n=t.prev();n.length||(n=this.$menu.find("li").last()),n.addClass("active")},listen:function(){this.$element.on("blur",e.proxy(this.blur,this)).on("keypress",e.proxy(this.keypress,this)).on("keyup",e.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",e.proxy(this.keydown,this)),this.$menu.on("click",e.proxy(this.click,this)).on("mouseenter","li",e.proxy(this.mouseenter,this))},eventSupported:function(e){var t=e in this.$element;return t||(this.$element.setAttribute(e,"return;"),t=typeof this.$element[e]=="function"),t},move:function(e){if(!this.shown)return;switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prev();break;case 40:e.preventDefault(),this.next()}e.stopPropagation()},keydown:function(t){this.suppressKeyPressRepeat=!~e.inArray(t.keyCode,[40,38,9,13,27]),this.move(t)},keypress:function(e){if(this.suppressKeyPressRepeat)return;this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}e.stopPropagation(),e.preventDefault()},blur:function(e){var t=this;setTimeout(function(){t.hide()},150)},click:function(e){e.stopPropagation(),e.preventDefault(),this.select()},mouseenter:function(t){this.$menu.find(".active").removeClass("active"),e(t.currentTarget).addClass("active")}},e.fn.typeahead=function(n){return this.each(function(){var r=e(this),i=r.data("typeahead"),s=typeof n=="object"&&n;i||r.data("typeahead",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},e.fn.typeahead.Constructor=t,e(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(t){var n=e(this);if(n.data("typeahead"))return;t.preventDefault(),n.typeahead(n.data())})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=e.extend({},e.fn.affix.defaults,n),this.$window=e(window).on("scroll.affix.data-api",e.proxy(this.checkPosition,this)).on("click.affix.data-api",e.proxy(function(){setTimeout(e.proxy(this.checkPosition,this),1)},this)),this.$element=e(t),this.checkPosition()};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var t=e(document).height(),n=this.$window.scrollTop(),r=this.$element.offset(),i=this.options.offset,s=i.bottom,o=i.top,u="affix affix-top affix-bottom",a;typeof i!="object"&&(s=o=i),typeof o=="function"&&(o=i.top()),typeof s=="function"&&(s=i.bottom()),a=this.unpin!=null&&n+this.unpin<=r.top?!1:s!=null&&r.top+this.$element.height()>=t-s?"bottom":o!=null&&n<=o?"top":!1;if(this.affixed===a)return;this.affixed=a,this.unpin=a=="bottom"?r.top-n:null,this.$element.removeClass(u).addClass("affix"+(a?"-"+a:""))},e.fn.affix=function(n){return this.each(function(){var r=e(this),i=r.data("affix"),s=typeof n=="object"&&n;i||r.data("affix",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.affix.Constructor=t,e.fn.affix.defaults={offset:0},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this),n=t.data();n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),t.affix(n)})})}(window.jQuery);
(function() {
  var UnderscoreExtensions, lucaUtilityHelper,
    __slice = Array.prototype.slice;

  lucaUtilityHelper = function() {
    var args, fallback, payload, result, _ref;
    payload = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (arguments.length === 0) {
      return (_ref = _(Luca.Application.instances).values()) != null ? _ref[0] : void 0;
    }
    if (_.isString(payload) && (result = Luca.cache(payload))) return result;
    if (_.isString(payload) && (result = Luca.find(payload))) return result;
    if (_.isString(payload) && (result = Luca.registry.find(payload))) {
      return result;
    }
    if (payload instanceof jQuery && (result = Luca.find(payload))) return result;
    if (_.isObject(payload) && (payload.ctype != null)) {
      return Luca.util.lazyComponent(payload);
    }
    if (_.isFunction(fallback = _(args).last())) return fallback();
  };

  (window || global).Luca = function() {
    return lucaUtilityHelper.apply(this, arguments);
  };

  Luca.VERSION = '0.9.78';

  _.extend(Luca, {
    core: {},
    collections: {},
    containers: {},
    components: {},
    models: {},
    concerns: {},
    util: {},
    fields: {},
    registry: {},
    options: {},
    config: {},
    logger: function(trackerMessage) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        args.unshift(trackerMessage);
        return console.log(this, args);
      };
    },
    getHelper: function() {
      return function() {
        return lucaUtilityHelper.apply(this, arguments);
      };
    }
  });

  _.extend(Luca, Backbone.Events);

  Luca.config.maintainStyleHierarchy = true;

  Luca.config.maintainClassHierarchy = true;

  Luca.config.autoApplyClassHierarchyAsCssClasses = true;

  Luca.autoRegister = Luca.config.autoRegister = true;

  Luca.developmentMode = Luca.config.developmentMode = false;

  Luca.enableGlobalObserver = Luca.config.enableGlobalObserver = false;

  Luca.config.enableBoostrap = Luca.config.enableBootstrap = true;

  Luca.config.enhancedViewProperties = true;

  Luca.keys = Luca.config.keys = {
    ENTER: 13,
    ESCAPE: 27,
    KEYLEFT: 37,
    KEYUP: 38,
    KEYRIGHT: 39,
    KEYDOWN: 40,
    SPACEBAR: 32,
    FORWARDSLASH: 191
  };

  Luca.keyMap = Luca.config.keyMap = _(Luca.keys).inject(function(memo, value, symbol) {
    memo[value] = symbol.toLowerCase();
    return memo;
  }, {});

  Luca.config.showWarnings = true;

  Luca.setupCollectionSpace = function(options) {
    var baseParams, modelBootstrap;
    if (options == null) options = {};
    baseParams = options.baseParams, modelBootstrap = options.modelBootstrap;
    if (baseParams != null) {
      Luca.Collection.baseParams(baseParams);
    } else {
      Luca.warn('You should remember to set the base params for Luca.Collection class.  You can do this by defining a property or function on Luca.config.baseParams');
    }
    if (modelBootstrap != null) {
      return Luca.Collection.bootstrap(modelBootstrap);
    } else {
      return Luca.warn("You should remember to set the model bootstrap location for Luca.Collection.  You can do this by defining a property or function on Luca.config.modelBootstrap");
    }
  };

  Luca.initialize = function(namespace, options) {
    var defaults, object;
    if (options == null) options = {};
    defaults = {
      views: {},
      collections: {},
      models: {},
      components: {},
      lib: {},
      util: {},
      concerns: {},
      register: function() {
        return Luca.register.apply(this, arguments);
      },
      onReady: function() {
        return Luca.onReady.apply(this, arguments);
      },
      getApplication: function() {
        var _ref;
        return (_ref = Luca.getApplication) != null ? _ref.apply(this, arguments) : void 0;
      },
      getCollectionManager: function() {
        var _ref;
        return (_ref = Luca.CollectionManager.get) != null ? _ref.apply(this, arguments) : void 0;
      },
      route: Luca.routeHelper
    };
    object = {};
    object[namespace] = _.extend(Luca.getHelper(), defaults);
    _.extend(Luca.config, options);
    _.extend(window || global, object);
    Luca.concern.namespace("" + namespace + ".concerns");
    Luca.registry.namespace("" + namespace + ".views");
    Luca.Collection.namespace("" + namespace + ".collections");
    return Luca.on("ready", function() {
      return Luca.setupCollectionSpace(options);
    });
  };

  Luca.onReady = function(callback) {
    Luca.define.close();
    Luca.trigger("ready");
    return $(function() {
      return callback.apply(this, arguments);
    });
  };

  Luca.warn = function(message) {
    if (Luca.config.showWarnings === true) return console.log(message);
  };

  Luca.find = function(el) {
    return Luca($(el).data('luca-id'));
  };

  Luca.supportsEvents = Luca.supportsBackboneEvents = function(obj) {
    return Luca.isComponent(obj) || (_.isFunction(obj != null ? obj.trigger : void 0) || _.isFunction(obj != null ? obj.bind : void 0));
  };

  Luca.isComponent = function(obj) {
    return Luca.isBackboneModel(obj) || Luca.isBackboneView(obj) || Luca.isBackboneCollection(obj);
  };

  Luca.isComponentPrototype = function(obj) {
    return Luca.isViewPrototype(obj) || Luca.isModelPrototype(obj) || Luca.isCollectionPrototype(obj);
  };

  Luca.isBackboneModel = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return _.isFunction(obj != null ? obj.set : void 0) && _.isFunction(obj != null ? obj.get : void 0) && _.isObject(obj != null ? obj.attributes : void 0);
  };

  Luca.isBackboneView = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return _.isFunction(obj != null ? obj.render : void 0) && !_.isUndefined(obj != null ? obj.el : void 0);
  };

  Luca.isBackboneCollection = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return _.isFunction(obj != null ? obj.fetch : void 0) && _.isFunction(obj != null ? obj.reset : void 0);
  };

  Luca.isViewPrototype = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return (obj != null) && (obj.prototype != null) && (obj.prototype.make != null) && (obj.prototype.$ != null) && (obj.prototype.render != null);
  };

  Luca.isModelPrototype = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return (obj != null) && (typeof obj.prototype === "function" ? obj.prototype((obj.prototype.save != null) && (obj.prototype.changedAttributes != null)) : void 0);
  };

  Luca.isCollectionPrototype = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return (obj != null) && (obj.prototype != null) && !Luca.isModelPrototype(obj) && (obj.prototype.reset != null) && (obj.prototype.select != null) && (obj.prototype.reject != null);
  };

  Luca.inheritanceChain = function(obj) {
    return Luca.parentClasses(obj);
  };

  Luca.parentClasses = function(obj) {
    var list, metaData, _base;
    list = [];
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    metaData = typeof obj.componentMetaData === "function" ? obj.componentMetaData() : void 0;
    metaData || (metaData = typeof (_base = obj.prototype).componentMetaData === "function" ? _base.componentMetaData() : void 0);
    return list = (metaData != null ? metaData.classHierarchy() : void 0) || [obj.displayName || obj.prototype.displayName];
  };

  Luca.parentClass = function(obj, resolve) {
    var parent, _base, _ref, _ref2, _ref3;
    if (resolve == null) resolve = true;
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    parent = typeof obj.componentMetaData === "function" ? (_ref = obj.componentMetaData()) != null ? _ref.meta["super class name"] : void 0 : void 0;
    parent || (parent = typeof (_base = obj.prototype).componentMetaData === "function" ? (_ref2 = _base.componentMetaData()) != null ? _ref2.meta["super class name"] : void 0 : void 0);
    parent || obj.displayName || ((_ref3 = obj.prototype) != null ? _ref3.displayName : void 0);
    if (resolve) {
      return Luca.util.resolve(parent);
    } else {
      return parent;
    }
  };

  Luca.template = function(template_name, variables) {
    var jst, luca, needle, template, _ref;
    window.JST || (window.JST = {});
    if (_.isFunction(template_name)) return template_name(variables);
    luca = (_ref = Luca.templates) != null ? _ref[template_name] : void 0;
    jst = typeof JST !== "undefined" && JST !== null ? JST[template_name] : void 0;
    if (!((luca != null) || (jst != null))) {
      needle = new RegExp("" + template_name + "$");
      luca = _(Luca.templates).detect(function(fn, template_id) {
        return needle.exec(template_id);
      });
      jst = _(JST).detect(function(fn, template_id) {
        return needle.exec(template_id);
      });
    }
    if (!(luca || jst)) throw "Could not find template named " + template_name;
    template = luca || jst;
    if (variables != null) return template(variables);
    return template;
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

  UnderscoreExtensions = {
    module: function(base, module) {
      _.extend(base, module);
      if (base.included && _(base.included).isFunction()) {
        return base.included.apply(base);
      }
    },
    "delete": function(object, key) {
      var value;
      value = object[key];
      delete object[key];
      return value;
    },
    idle: function(code, delay) {
      var handle;
      if (delay == null) delay = 1000;
      if (window.DISABLE_IDLE) delay = 0;
      handle = void 0;
      return function() {
        if (handle) window.clearTimeout(handle);
        return handle = window.setTimeout(_.bind(code, this), delay);
      };
    },
    idleShort: function(code, delay) {
      var handle;
      if (delay == null) delay = 100;
      if (window.DISABLE_IDLE) delay = 0;
      handle = void 0;
      return function() {
        if (handle) window.clearTimeout(handle);
        return handle = window.setTimeout(_.bind(code, this), delay);
      };
    },
    idleMedium: function(code, delay) {
      var handle;
      if (delay == null) delay = 2000;
      if (window.DISABLE_IDLE) delay = 0;
      handle = void 0;
      return function() {
        if (handle) window.clearTimeout(handle);
        return handle = window.setTimeout(_.bind(code, this), delay);
      };
    },
    idleLong: function(code, delay) {
      var handle;
      if (delay == null) delay = 5000;
      if (window.DISABLE_IDLE) delay = 0;
      handle = void 0;
      return function() {
        if (handle) window.clearTimeout(handle);
        return handle = window.setTimeout(_.bind(code, this), delay);
      };
    }
  };

  _.mixin(UnderscoreExtensions);

}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/bootstrap_form_controls"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="btn-group form-actions">\n  <a class="btn btn-primary submit-button">\n    <i class="icon icon-ok icon-white"></i>\n    Save Changes\n  </a>\n  <a class="btn reset-button cancel-button">\n    <i class="icon icon-remove"></i>\n    Cancel\n  </a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/collection_loader_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="progress-modal" class="modal" style="display: none">\n  <div class="progress progress-info progress-striped active">\n    <div class="bar" style="width:0%;"></div>\n  </div>\n  <div class="message">Initializing...</div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/form_alert"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="', className ,'">\n  <a class="close" href="#" data-dismiss="alert">x</a>\n  ', message ,'\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/grid_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="luca-ui-g-view-wrapper">\n  <div class="g-view-header"></div>\n  <div class="luca-ui-g-view-body">\n    <table class="luca-ui-g-view scrollable-table" width="100%" cellpadding=0 cellspacing=0>\n      <thead class="fixed"></thead>\n      <tbody class="scrollable"></tbody>\n      <tfoot></tfoot>\n    </table>\n  </div>\n  <div class="luca-ui-g-view-header"></div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/grid_view_empty_text"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="empty-text empty-text-wrapper">\n  <p>', text ,'</p>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/load_mask"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="load-mask">\n  <div class="progress progress-striped active">\n    <div class="bar" style="width:0%"></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/nav_bar"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="navbar-inner">\n  <div class="luca-ui-navbar-body container">\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/pagination"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="pagination">\n  <a class="btn previous">\n    <i class="icon icon-chevron-left"></i>\n  </a>\n  <div class="pagination-group">\n  </div>\n  <a class="btn next">\n    <i class="icon icon-chevron-right"></i>\n  </a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/basic"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="', id ,'" class="', classes ,'" style="', style ,'"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/tab_selector_container"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="', cid ,'-tab-selector" class="tab-selector-container">\n  <ul id="', cid ,'-tabs-nav" class="nav nav-tabs">\n    '); for(var i = 0; i < components.length; i++ ) { __p.push('\n    '); var component = components[i];__p.push('\n    <li class="tab-selector" data-target="', i ,'">\n      <a data-target="', i ,'">\n        ', component.title ,'\n      </a>\n    </li>\n    '); } __p.push('\n  </ul>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/tab_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<ul id="', cid ,'-tabs-selector" class="nav ', navClass ,'"></ul>\n<div id="', cid ,'-tab-view-content" class="tab-content"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/toolbar_wrapper"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="luca-ui-toolbar-wrapper" id="', id ,'"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/button_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label>&nbsp;</label>\n<input style="', inputStyles ,'" class="btn ', input_class ,'" value="', input_value ,'" type="', input_type ,'" id="<%= input_id" />\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/button_field_link"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<a class="btn ', input_class ,'">\n  '); if(icon_class.length) { __p.push('\n  <i class="', icon_class ,'"></i>\n  ', input_value ,'\n  '); } __p.push('\n</a>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_array"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="control-group">\n  <label for="', input_id ,'"><%= label =>\n  <div class="controls"><div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_array_item"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  <input id="', input_id ,'" type="checkbox" name="', input_name ,'" value="', value ,'" />\n</label>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n  <input type="checkbox" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n</label>\n\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/file_upload_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n  <input type="file" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n</label>\n\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/hidden_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(' <input type="hidden" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/select_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n</label>\n<div class="controls">\n <select name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" ></select>\n  '); if(helperText) { __p.push('\n  <p class="helper-text help-block">\n    ', helperText ,'\n  </p>\n  '); } __p.push('\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/text_area_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n</label>\n<div class="controls">\n <textarea placeholder="', placeHolder ,'" name="', input_name ,'" style="', inputStyles ,'" >', input_value ,'</textarea>\n  '); if(helperText) { __p.push('\n  <p class="helper-text help-block">\n    ', helperText ,'\n  </p>\n  '); } __p.push('\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/text_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(''); if(typeof(label)!=="undefined" && (typeof(hideLabel) !== "undefined" && !hideLabel) || (typeof(hideLabel)==="undefined")) {__p.push('\n<label class="control-label" for="', input_id ,'">', label ,'</label>\n'); } __p.push('\n\n<div class="controls">\n'); if( typeof(addOn) !== "undefined" ) { __p.push('\n  <span class="add-on">', addOn ,'</span>\n'); } __p.push('\n<input type="text" placeholder="', placeHolder ,'" name="', input_name ,'" style="', inputStyles ,'" value="', input_value ,'" />\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/table_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<thead></thead>\n<tbody class="table-body"></tbody>\n<tfoot></tfoot>\n<caption></caption>\n');}return __p.join('');};
}).call(this);
(function() {
  var currentNamespace,
    __slice = Array.prototype.slice;

  Luca.util.resolve = function(accessor, source_object) {
    var resolved;
    try {
      source_object || (source_object = window || global);
      resolved = _(accessor.split(/\./)).inject(function(obj, key) {
        return obj = obj != null ? obj[key] : void 0;
      }, source_object);
    } catch (e) {
      console.log("Error resolving", accessor, source_object);
      throw e;
    }
    return resolved;
  };

  Luca.util.nestedValue = Luca.util.resolve;

  Luca.util.argumentsLogger = function(prompt) {
    return function() {
      return console.log(prompt, arguments);
    };
  };

  Luca.util.read = function() {
    var args, property;
    property = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (_.isFunction(property)) {
      return property.apply(this, args);
    } else {
      return property;
    }
  };

  Luca.util.classify = function(string) {
    if (string == null) string = "";
    return _.string.camelize(_.string.capitalize(string));
  };

  Luca.util.hook = function(eventId) {
    var fn, parts, prefix;
    if (eventId == null) eventId = "";
    parts = eventId.split(':');
    prefix = parts.shift();
    parts = _(parts).map(function(p) {
      return _.string.capitalize(p);
    });
    return fn = prefix + parts.join('');
  };

  Luca.util.toCssClass = function() {
    var componentName, exclusions, part, parts, transformed;
    componentName = arguments[0], exclusions = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    parts = componentName.split('.');
    transformed = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        if (!(_(exclusions).indexOf(part) === -1)) continue;
        part = _.str.underscored(part);
        part = part.replace(/_/g, '-');
        _results.push(part);
      }
      return _results;
    })();
    return transformed.join('-');
  };

  Luca.util.isIE = function() {
    try {
      Object.defineProperty({}, '', {});
      return false;
    } catch (e) {
      return true;
    }
  };

  currentNamespace = window || global;

  Luca.util.namespace = function(namespace) {
    if (namespace == null) return currentNamespace;
    currentNamespace = _.isString(namespace) ? Luca.util.resolve(namespace, window || global) : namespace;
    if (currentNamespace != null) return currentNamespace;
    return currentNamespace = eval("(window||global)." + namespace + " = {}");
  };

  Luca.util.lazyComponent = function(config) {
    var componentClass, constructor, ctype;
    if (_.isObject(config)) ctype = config.ctype || config.type;
    if (_.isString(config)) ctype = config;
    componentClass = Luca.registry.lookup(ctype);
    if (!componentClass) {
      throw "Invalid Component Type: " + ctype + ".  Did you forget to register it?";
    }
    constructor = eval(componentClass);
    return new constructor(config);
  };

  Luca.util.selectProperties = function(iterator, object, context) {
    var values;
    values = _(object).values();
    return _(values).select(iterator);
  };

  Luca.util.loadScript = function(url, callback) {
    var script;
    script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          return callback();
        } else {
          return script.onload = function() {
            return callback();
          };
        }
      };
    }
    script.src = url;
    return document.body.appendChild(script);
  };

  Luca.util.make = Backbone.View.prototype.make;

  Luca.util.list = function(list, options, ordered) {
    var container, item, _i, _len;
    if (options == null) options = {};
    container = ordered ? "ol" : "ul";
    container = Luca.util.make(container, options);
    if (_.isArray(list)) {
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        $(container).append(Luca.util.make("li", {}, item));
      }
    }
    return container.outerHTML;
  };

  Luca.util.label = function(contents, type, baseClass) {
    var cssClass;
    if (contents == null) contents = "";
    if (baseClass == null) baseClass = "label";
    cssClass = baseClass;
    if (type != null) cssClass += " " + baseClass + "-" + type;
    return Luca.util.make("span", {
      "class": cssClass
    }, contents);
  };

  Luca.util.badge = function(contents, type, baseClass) {
    var cssClass;
    if (contents == null) contents = "";
    if (baseClass == null) baseClass = "badge";
    cssClass = baseClass;
    if (type != null) cssClass += " " + baseClass + "-" + type;
    return Luca.util.make("span", {
      "class": cssClass
    }, contents);
  };

  Luca.util.setupHooks = function(set) {
    var _this = this;
    set || (set = this.hooks);
    return _(set).each(function(eventId) {
      var callback, fn;
      fn = Luca.util.hook(eventId);
      callback = function() {
        var _ref;
        return (_ref = this[fn]) != null ? _ref.apply(this, arguments) : void 0;
      };
      if (eventId != null ? eventId.match(/once:/) : void 0) {
        callback = _.once(callback);
      }
      return _this.on(eventId, callback, _this);
    });
  };

  Luca.util.setupHooksAdvanced = function(set) {
    var _this = this;
    set || (set = this.hooks);
    return _(set).each(function(eventId) {
      var callback, entry, fn, hookSetup, _i, _len, _results;
      hookSetup = _this[Luca.util.hook(eventId)];
      if (!_.isArray(hookSetup)) hookSetup = [hookSetup];
      _results = [];
      for (_i = 0, _len = hookSetup.length; _i < _len; _i++) {
        entry = hookSetup[_i];
        fn = _.isString(entry) ? _this[entry] : void 0;
        if (_.isFunction(entry)) fn = entry;
        callback = function() {
          var _ref;
          return (_ref = this[fn]) != null ? _ref.apply(this, arguments) : void 0;
        };
        if (eventId != null ? eventId.match(/once:/) : void 0) {
          callback = _.once(callback);
        }
        _results.push(_this.on(eventId, callback, _this));
      }
      return _results;
    });
  };

}).call(this);
(function() {

  Luca.DevelopmentToolHelpers = {
    refreshCode: function() {
      var view;
      view = this;
      _(this.eventHandlerProperties()).each(function(prop) {
        return view[prop] = view.definitionClass()[prop];
      });
      if (this.autoBindEventHandlers === true) this.bindAllEventHandlers();
      return this.delegateEvents();
    },
    eventHandlerProperties: function() {
      var handlerIds;
      handlerIds = _(this.events).values();
      return _(handlerIds).select(function(v) {
        return _.isString(v);
      });
    },
    eventHandlerFunctions: function() {
      var handlerIds,
        _this = this;
      handlerIds = _(this.events).values();
      return _(handlerIds).map(function(handlerId) {
        if (_.isFunction(handlerId)) {
          return handlerId;
        } else {
          return _this[handlerId];
        }
      });
    }
  };

}).call(this);
(function() {
  var __slice = Array.prototype.slice;

  Luca.DeferredBindingProxy = (function() {

    function DeferredBindingProxy(object, operation, wrapWithUnderscore) {
      var fn;
      this.object = object;
      if (wrapWithUnderscore == null) wrapWithUnderscore = true;
      if (_.isFunction(operation)) {
        fn = operation;
      } else if (_.isString(operation) && _.isFunction(this.object[operation])) {
        fn = this.object[operation];
      }
      if (!_.isFunction(fn)) {
        throw "Must pass a function or a string representing one";
      }
      if (wrapWithUnderscore === true) {
        this.fn = _.bind(function() {
          return _.defer(fn);
        }, this.object);
      } else {
        this.fn = _.bind(fn, this.object);
      }
      this;
    }

    DeferredBindingProxy.prototype.until = function(watch, trigger) {
      if ((watch != null) && !(trigger != null)) {
        trigger = watch;
        watch = this.object;
      }
      watch.once(trigger, this.fn);
      return this.object;
    };

    return DeferredBindingProxy;

  })();

  Luca.EventRelayer = (function() {

    function EventRelayer(options) {
      if (options == null) options = {};
      this.target = options.target, this.events = options.events, this.prefix = options.prefix, this.source = options.source;
      if (this.events.length > 0 && this.target && this.source) this.setup();
      this;
    }

    EventRelayer.prototype.prefixedBy = function(prefix) {
      this.prefix = prefix != null ? prefix : "";
      return this;
    };

    EventRelayer.prototype.from = function(source) {
      this.source = source;
      return this;
    };

    EventRelayer.prototype.to = function(target) {
      this.target = target;
      return this;
    };

    EventRelayer.prototype.setup = function(target) {
      var eventId, prefix, _i, _len, _ref, _results;
      this.target = target;
      prefix = this.prefix;
      target = this.target;
      _ref = this.events;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        eventId = _ref[_i];
        console.log("Binding to ", eventId, prefix, this.target.name, this.source.name);
        _results.push(this.source.on(eventId, function() {
          var args, trigger;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          trigger = _([prefix, eventId]).compact().join(':');
          args.unshift(trigger);
          return this.trigger.apply(this, args);
        }, target));
      }
      return _results;
    };

    return EventRelayer;

  })();

  Luca.Events = {
    relays: function() {
      var events;
      events = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return new Luca.EventRelayer({
        relayer: this,
        events: events
      });
    },
    defer: function(operation, wrapWithUnderscore) {
      if (wrapWithUnderscore == null) wrapWithUnderscore = true;
      return new Luca.DeferredBindingProxy(this, operation, wrapWithUnderscore);
    },
    once: function(trigger, callback, context) {
      var onceFn;
      context || (context = this);
      onceFn = function() {
        callback.apply(context, arguments);
        return this.unbind(trigger, onceFn);
      };
      return this.bind(trigger, onceFn);
    }
  };

  Luca.EventsExt = {
    waitUntil: function(trigger, context) {
      return this.waitFor.call(this, trigger, context);
    },
    waitFor: function(trigger, context) {
      var proxy, self;
      self = this;
      return proxy = {
        on: function(target) {
          return target.waitFor.call(target, trigger, context);
        },
        and: function() {
          var fn, runList, _i, _len, _results;
          runList = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          _results = [];
          for (_i = 0, _len = runList.length; _i < _len; _i++) {
            fn = runList[_i];
            fn = _.isFunction(fn) ? fn : self[fn];
            _results.push(self.once(trigger, fn, context));
          }
          return _results;
        },
        andThen: function() {
          return self.and.apply(self, arguments);
        }
      };
    },
    relayEvent: function(trigger) {
      var _this = this;
      return {
        on: function() {
          var components;
          components = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return {
            to: function() {
              var component, target, targets, _i, _len, _results;
              targets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              _results = [];
              for (_i = 0, _len = targets.length; _i < _len; _i++) {
                target = targets[_i];
                _results.push((function() {
                  var _j, _len2, _results2,
                    _this = this;
                  _results2 = [];
                  for (_j = 0, _len2 = components.length; _j < _len2; _j++) {
                    component = components[_j];
                    _results2.push(component.on(trigger, function() {
                      var args;
                      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                      args.unshift(trigger);
                      return target.trigger.apply(target, args);
                    }));
                  }
                  return _results2;
                }).call(_this));
              }
              return _results;
            }
          };
        }
      };
    }
  };

}).call(this);
(function() {

  Luca.concern = function(mixinName) {
    var namespace, resolved;
    namespace = _(Luca.concern.namespaces).detect(function(space) {
      var _ref;
      return ((_ref = Luca.util.resolve(space)) != null ? _ref[mixinName] : void 0) != null;
    });
    namespace || (namespace = "Luca.concerns");
    resolved = Luca.util.resolve(namespace)[mixinName];
    if (resolved == null) {
      console.log("Could not find " + mixinName + " in ", Luca.concern.namespaces);
    }
    return resolved;
  };

  Luca.concern.namespaces = ["Luca.concerns"];

  Luca.concern.namespace = function(namespace) {
    Luca.concern.namespaces.push(namespace);
    return Luca.concern.namespaces = _(Luca.concern.namespaces).uniq();
  };

  Luca.concern.setup = function() {
    var module, _i, _len, _ref, _ref2, _ref3, _ref4, _results;
    if (((_ref = this.concerns) != null ? _ref.length : void 0) > 0) {
      _ref2 = this.concerns;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        module = _ref2[_i];
        _results.push((_ref3 = Luca.concern(module)) != null ? (_ref4 = _ref3.__initializer) != null ? _ref4.call(this, this, module) : void 0 : void 0);
      }
      return _results;
    }
  };

  Luca.decorate = function(target) {
    var componentClass, componentName, componentPrototype;
    try {
      if (_.isString(target)) {
        componentName = target;
        componentClass = Luca.util.resolve(componentName);
      }
      if (_.isFunction(target)) componentClass = target;
      componentPrototype = componentClass.prototype;
      componentName = componentName || componentClass.displayName;
      componentName || (componentName = componentPrototype.displayName);
    } catch (e) {
      console.log(e.message);
      console.log(e.stack);
      console.log("Error calling Luca.decorate on ", componentClass, componentPrototype, componentName);
      throw e;
    }
    return {
      "with": function(mixinName) {
        var fn, method, mixinDefinition, mixinPrivates, sanitized, superclassMixins, _ref;
        mixinDefinition = Luca.concern(mixinName);
        mixinDefinition.__displayName || (mixinDefinition.__displayName = mixinName);
        mixinPrivates = _(mixinDefinition).chain().keys().select(function(key) {
          return ("" + key).match(/^__/) || key === "classMethods";
        });
        sanitized = _(mixinDefinition).omit(mixinPrivates.value());
        _.extend(componentPrototype, sanitized);
        if (mixinDefinition.classMethods != null) {
          _ref = mixinDefinition.classMethods;
          for (method in _ref) {
            fn = _ref[method];
            componentClass[method] = _.bind(fn, componentClass);
          }
        }
        if (mixinDefinition != null) {
          if (typeof mixinDefinition.__included === "function") {
            mixinDefinition.__included(componentName, componentClass, mixinDefinition);
          }
        }
        superclassMixins = componentPrototype._superClass().prototype.concerns;
        componentPrototype.concerns || (componentPrototype.concerns = []);
        componentPrototype.concerns.push(mixinName);
        componentPrototype.concerns = componentPrototype.concerns.concat(superclassMixins);
        componentPrototype.concerns = _(componentPrototype.concerns).chain().uniq().compact().value();
        return componentPrototype;
      }
    };
  };

}).call(this);
(function() {
  var ComponentDefinition, cd,
    __slice = Array.prototype.slice;

  ComponentDefinition = (function() {

    function ComponentDefinition(componentName, autoRegister) {
      var parts;
      this.autoRegister = autoRegister != null ? autoRegister : true;
      this.namespace = Luca.util.namespace();
      this.componentId = this.componentName = componentName;
      this.superClassName = 'Luca.View';
      this.properties || (this.properties = {});
      this._classProperties || (this._classProperties = {});
      if (componentName.match(/\./)) {
        this.namespaced = true;
        parts = componentName.split('.');
        this.componentId = parts.pop();
        this.namespace = parts.join('.');
        Luca.registry.addNamespace(parts.join('.'));
      }
      Luca.define.__definitions.push(this);
    }

    ComponentDefinition.create = function(componentName, autoRegister) {
      if (autoRegister == null) autoRegister = Luca.config.autoRegister;
      return new ComponentDefinition(componentName, autoRegister);
    };

    ComponentDefinition.prototype.isValid = function() {
      if (!_.isObject(this.properties)) return false;
      if (Luca.util.resolve(this.superClassName) == null) return false;
      if (this.componentName == null) return false;
      return true;
    };

    ComponentDefinition.prototype.isDefined = function() {
      return this.defined === true;
    };

    ComponentDefinition.prototype.isOpen = function() {
      return !!(this.isValid() && !this.isDefined());
    };

    ComponentDefinition.prototype.meta = function(key, value) {
      var data, metaKey;
      metaKey = this.namespace + '.' + this.componentId;
      metaKey = metaKey.replace(/^\./, '');
      data = Luca.registry.addMetaData(metaKey, key, value);
      return this.properties.componentMetaData = function() {
        return Luca.registry.getMetaDataFor(metaKey);
      };
    };

    ComponentDefinition.prototype["in"] = function(namespace) {
      this.namespace = namespace;
      return this;
    };

    ComponentDefinition.prototype.from = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    ComponentDefinition.prototype["extends"] = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    ComponentDefinition.prototype.extend = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    ComponentDefinition.prototype.triggers = function() {
      var hook, hooks, _i, _len;
      hooks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _.defaults(this.properties || (this.properties = {}), {
        hooks: []
      });
      for (_i = 0, _len = hooks.length; _i < _len; _i++) {
        hook = hooks[_i];
        this.properties.hooks.push(hook);
      }
      this.properties.hooks = _.uniq(this.properties.hooks);
      this.meta("hooks", this.properties.hooks);
      return this;
    };

    ComponentDefinition.prototype.includes = function() {
      var include, includes, _i, _len;
      includes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _.defaults(this.properties || (this.properties = {}), {
        include: []
      });
      for (_i = 0, _len = includes.length; _i < _len; _i++) {
        include = includes[_i];
        this.properties.include.push(include);
      }
      this.properties.include = _.uniq(this.properties.include);
      this.meta("includes", this.properties.include);
      return this;
    };

    ComponentDefinition.prototype.mixesIn = function() {
      var concern, concerns, _i, _len;
      concerns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _.defaults(this.properties || (this.properties = {}), {
        concerns: []
      });
      for (_i = 0, _len = concerns.length; _i < _len; _i++) {
        concern = concerns[_i];
        this.properties.concerns.push(concern);
      }
      this.properties.concerns = _.uniq(this.properties.concerns);
      this.meta("concerns", this.properties.concerns);
      return this;
    };

    ComponentDefinition.prototype.contains = function() {
      var components;
      components = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _.defaults(this.properties, {
        components: []
      });
      this.properties.components = components;
      return this;
    };

    ComponentDefinition.prototype.validatesConfigurationWith = function(validationConfiguration) {
      if (validationConfiguration == null) validationConfiguration = {};
      this.meta("configuration validations", validationConfiguration);
      this.properties.validatable = true;
      return this;
    };

    ComponentDefinition.prototype.beforeDefinition = function(callback) {
      this._classProperties.beforeDefinition = callback;
      return this;
    };

    ComponentDefinition.prototype.afterDefinition = function(callback) {
      this._classProperties.afterDefinition = callback;
      return this;
    };

    ComponentDefinition.prototype.classConfiguration = function(properties) {
      if (properties == null) properties = {};
      this.meta("class configuration", _.keys(properties));
      _.defaults((this._classProperties || (this._classProperties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.configuration = function(properties) {
      if (properties == null) properties = {};
      this.meta("public configuration", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.publicConfiguration = function(properties) {
      if (properties == null) properties = {};
      this.meta("public configuration", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.privateConfiguration = function(properties) {
      if (properties == null) properties = {};
      this.meta("private configuration", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.classInterface = function(properties) {
      if (properties == null) properties = {};
      this.meta("class interface", _.keys(properties));
      _.defaults((this._classProperties || (this._classProperties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.methods = function(properties) {
      if (properties == null) properties = {};
      this.meta("public interface", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.public = function(properties) {
      if (properties == null) properties = {};
      this.meta("public interface", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.publicInterface = function(properties) {
      if (properties == null) properties = {};
      this.meta("public interface", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.private = function(properties) {
      if (properties == null) properties = {};
      this.meta("private interface", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.privateInterface = function(properties) {
      if (properties == null) properties = {};
      this.meta("private interface", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.definePrototype = function(properties) {
      var at, componentType, definition, _base, _ref, _ref2;
      if (properties == null) properties = {};
      _.defaults((this.properties || (this.properties = {})), properties);
      at = this.namespaced ? Luca.util.resolve(this.namespace, window || global) : window || global;
      if (this.namespaced && !(at != null)) {
        eval("(window||global)." + this.namespace + " = {}");
        at = Luca.util.resolve(this.namespace, window || global);
      }
      this.meta("super class name", this.superClassName);
      this.meta("display name", this.componentName);
      this.properties.displayName = this.componentName;
      this.properties.componentMetaData = function() {
        return Luca.registry.getMetaDataFor(this.displayName);
      };
      if ((_ref = this._classProperties) != null) {
        if (typeof _ref.beforeDefinition === "function") {
          _ref.beforeDefinition(this);
        }
      }
      definition = at[this.componentId] = Luca.extend(this.superClassName, this.componentName, this.properties);
      if (this.autoRegister === true) {
        if (Luca.isViewPrototype(definition)) componentType = "view";
        if (Luca.isCollectionPrototype(definition)) {
          (_base = Luca.Collection).namespaces || (_base.namespaces = []);
          Luca.Collection.namespaces.push(this.namespace);
          componentType = "collection";
        }
        if (Luca.isModelPrototype(definition)) componentType = "model";
        Luca.registerComponent(_.string.underscored(this.componentId), this.componentName, componentType);
      }
      this.defined = true;
      if (!_.isEmpty(this._classProperties)) {
        _.extend(definition, this._classProperties);
      }
      if (definition != null) {
        if ((_ref2 = definition.afterDefinition) != null) {
          _ref2.call(definition, this);
        }
      }
      return definition;
    };

    return ComponentDefinition;

  })();

  cd = ComponentDefinition.prototype;

  cd.concerns = cd.behavesAs = cd.uses = cd.mixesIn;

  cd.register = cd.defines = cd.defaults = cd.exports = cd.defaultProperties = cd.definePrototype;

  cd.defaultsTo = cd.enhance = cd["with"] = cd.definePrototype;

  cd.publicMethods = cd.publicInterface;

  cd.privateMethods = cd.privateInterface;

  cd.classMethods = cd.classInterface;

  _.extend((Luca.define = ComponentDefinition.create), {
    __definitions: [],
    incomplete: function() {
      return _(Luca.define.__definitions).select(function(definition) {
        return definition.isOpen();
      });
    },
    close: function() {
      var open, _i, _len, _ref;
      _ref = Luca.define.incomplete();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        open = _ref[_i];
        if (open.isValid()) open.register();
      }
      return Luca.define.__definitions.length = 0;
    },
    findDefinition: function(componentName) {
      return _(Luca.define.__definitions).detect(function(definition) {
        return definition.componentName === componentName;
      });
    }
  });

  Luca.register = function(componentName) {
    return new ComponentDefinition(componentName, true);
  };

  _.mixin({
    def: Luca.define
  });

  Luca.extend = function(superClassName, childName, properties) {
    var definition, include, superClass, _i, _len, _ref;
    if (properties == null) properties = {};
    superClass = Luca.util.resolve(superClassName, window || global);
    if (!_.isFunction(superClass != null ? superClass.extend : void 0)) {
      throw "Error defining " + childName + ". " + superClassName + " is not a valid component to extend from";
    }
    properties.displayName = childName;
    properties._superClass = function() {
      superClass.displayName || (superClass.displayName = superClassName);
      return superClass;
    };
    properties._super = function(method, context, args) {
      var _ref;
      if (context == null) context = this;
      if (args == null) args = [];
      return (_ref = this._superClass().prototype[method]) != null ? _ref.apply(context, args) : void 0;
    };
    definition = superClass.extend(properties);
    if (_.isArray(properties != null ? properties.include : void 0)) {
      _ref = properties.include;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        include = _ref[_i];
        if (_.isString(include)) include = Luca.util.resolve(include);
        _.extend(definition.prototype, include);
      }
    }
    return definition;
  };

}).call(this);
(function() {

  Luca.concerns.ApplicationEventBindings = {
    __initializer: function() {
      var app, eventTrigger, handler, _len, _ref, _ref2, _results;
      if (_.isEmpty(this.applicationEvents)) return;
      app = this.app;
      if (_.isString(app) || _.isUndefined(app)) {
        app = (_ref = Luca.Application) != null ? typeof _ref.get === "function" ? _ref.get(app) : void 0 : void 0;
      }
      if (!Luca.supportsEvents(app)) {
        throw "Error binding to the application object on " + (this.name || this.cid);
      }
      _ref2 = this.applicationEvents;
      _results = [];
      for (handler = 0, _len = _ref2.length; handler < _len; handler++) {
        eventTrigger = _ref2[handler];
        if (_.isString(handler)) handler = this[handler];
        if (!_.isFunction(handler)) {
          throw "Error registering application event " + eventTrigger + " on " + (this.name || this.cid);
        }
        _results.push(app.on(eventTrigger, handler, this));
      }
      return _results;
    }
  };

}).call(this);
(function() {
  var relayAs,
    __slice = Array.prototype.slice;

  Luca.concerns.CollectionEventBindings = {
    __initializer: function() {
      Luca.concerns.CollectionEventBindings.__setup.call(this);
      if (Luca.isBackboneCollection(this.collection)) {
        this.collection.on("reset", relayAs("collection:reset"), this);
        this.collection.on("add", relayAs("collection:add"), this);
        this.collection.on("remove", relayAs("collection:remove"), this);
        return this.collection.on("change", relayAs("collection:change"), this);
      }
    },
    __setup: function() {
      var collection, eventTrigger, handler, key, manager, signature, _ref, _ref2, _results;
      if (_.isEmpty(this.collectionEvents)) return;
      manager = this.collectionManager || Luca.CollectionManager.get();
      _ref = this.collectionEvents;
      _results = [];
      for (signature in _ref) {
        handler = _ref[signature];
        _ref2 = signature.split(" "), key = _ref2[0], eventTrigger = _ref2[1];
        collection = manager.getOrCreate(key);
        if (!collection) throw "Could not find collection specified by " + key;
        if (_.isString(handler)) handler = this[handler];
        if (!_.isFunction(handler)) throw "invalid collectionEvents configuration";
        try {
          _results.push(collection.on(eventTrigger, handler, this));
        } catch (e) {
          console.log("Error Binding To Collection in registerCollectionEvents", this);
          throw e;
        }
      }
      return _results;
    }
  };

  relayAs = function(eventName) {
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift(eventName);
      return this.trigger.apply(this, args);
    };
  };

}).call(this);
(function() {

  Luca.concerns.Deferrable = {
    configure_collection: function(setAsDeferrable) {
      var collectionManager, _ref, _ref2;
      if (setAsDeferrable == null) setAsDeferrable = true;
      if (!this.collection) return;
      if (_.isString(this.collection) && (collectionManager = (_ref = Luca.CollectionManager) != null ? _ref.get() : void 0)) {
        this.collection = collectionManager.getOrCreate(this.collection);
      }
      if (_.isObject(this.collection) && !Luca.isBackboneCollection(this.collection)) {
        this.collection = new Luca.Collection(this.collection.initial_set, this.collection);
      }
      if ((_ref2 = this.collection) != null ? _ref2.deferrable_trigger : void 0) {
        this.deferrable_trigger = this.collection.deferrable_trigger;
      }
      if (setAsDeferrable) return this.deferrable = this.collection;
    }
  };

}).call(this);
(function() {

  Luca.concerns.DomHelpers = {
    __initializer: function() {
      var additional, additionalClasses, classes, cssClass, _i, _j, _len, _len2, _ref, _results;
      additionalClasses = _(this.additionalClassNames || []).clone();
      if (this.wrapperClass != null) this.$wrap(this.wrapperClass);
      if (_.isString(additionalClasses)) {
        additionalClasses = additionalClasses.split(" ");
      }
      if (this.gridSpan) additionalClasses.push("span" + this.gridSpan);
      if (this.gridOffset) additionalClasses.push("offset" + this.gridOffset);
      if (this.gridRowFluid) additionalClasses.push("row-fluid");
      if (this.gridRow) additionalClasses.push("row");
      if (additionalClasses == null) return;
      for (_i = 0, _len = additionalClasses.length; _i < _len; _i++) {
        additional = additionalClasses[_i];
        this.$el.addClass(additional);
      }
      if (Luca.config.autoApplyClassHierarchyAsCssClasses === true) {
        classes = (typeof this.componentMetaData === "function" ? (_ref = this.componentMetaData()) != null ? _ref.styleHierarchy() : void 0 : void 0) || [];
        _results = [];
        for (_j = 0, _len2 = classes.length; _j < _len2; _j++) {
          cssClass = classes[_j];
          if (cssClass !== "luca-view" && cssClass !== "backbone-view") {
            _results.push(this.$el.addClass(cssClass));
          }
        }
        return _results;
      }
    },
    $wrap: function(wrapper) {
      if (_.isString(wrapper) && !wrapper.match(/[<>]/)) {
        wrapper = this.make("div", {
          "class": wrapper,
          "data-wrapper": true
        });
      }
      return this.$el.wrap(wrapper);
    },
    $wrapper: function() {
      return this.$el.parent('[data-wrapper="true"]');
    },
    $template: function(template, variables) {
      if (variables == null) variables = {};
      return this.$el.html(Luca.template(template, variables));
    },
    $html: function(content) {
      return this.$el.html(content);
    },
    $append: function(content) {
      return this.$el.append(content);
    },
    $attach: function() {
      return this.$container().append(this.el);
    },
    $bodyEl: function() {
      return this.$el;
    },
    $container: function() {
      return $(this.container);
    }
  };

}).call(this);
(function() {

  Luca.concerns.EnhancedProperties = {
    __initializer: function() {
      if (Luca.config.enhancedViewProperties !== true) return;
      if (_.isString(this.collection) && Luca.CollectionManager.get()) {
        this.collection = Luca.CollectionManager.get().getOrCreate(this.collection);
      }
      if (this.template != null) this.$template(this.template, this);
      if (_.isString(this.collectionManager)) {
        return this.collectionManager = Luca.CollectionManager.get(this.collectionManager);
      }
    }
  };

}).call(this);
(function() {
  var FilterModel,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Luca.concerns.Filterable = {
    __included: function(component, module) {
      return _.extend(Luca.Collection.prototype, {
        __filters: {}
      });
    },
    __initializer: function(component, module) {
      var filter, _base, _ref,
        _this = this;
      if (this.filterable === false) return;
      if (!Luca.isBackboneCollection(this.collection)) {
        this.collection = typeof (_base = Luca.CollectionManager).get === "function" ? (_ref = _base.get()) != null ? _ref.getOrCreate(this.collection) : void 0 : void 0;
      }
      if (!Luca.isBackboneCollection(this.collection)) {
        this.debug("Skipping Filterable due to no collection being present on " + (this.name || this.cid));
        this.debug("Collection", this.collection);
        return;
      }
      this.getCollection || (this.getCollection = function() {
        return this.collection;
      });
      filter = this.getFilterState();
      this.querySources || (this.querySources = []);
      this.optionsSources || (this.optionsSources = []);
      this.query || (this.query = {});
      this.queryOptions || (this.queryOptions = {});
      this.querySources.push((function(options) {
        if (options == null) options = {};
        return _this.getFilterState().toQuery();
      }));
      this.optionsSources.push((function(options) {
        if (options == null) options = {};
        return _this.getFilterState().toOptions();
      }));
      filter.on("change", function() {
        var options, prepared;
        filter = _.clone(_this.getQuery());
        options = _.clone(_this.getQueryOptions());
        prepared = _this.prepareRemoteFilter(filter, options);
        if (_this.isRemote()) {
          return _this.collection.applyFilter(prepared, {
            remote: true
          });
        } else {
          return _this.trigger("refresh");
        }
      });
      return module;
    },
    prepareRemoteFilter: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) options = {};
      if (options.limit != null) filter.limit = options.limit;
      if (options.page != null) filter.page = options.page;
      if (options.sortBy != null) filter.sortBy = options.sortBy;
      return filter;
    },
    isRemote: function() {
      return this.getQueryOptions().remote === true;
    },
    getFilterState: function() {
      var _base, _name;
      return (_base = this.collection.__filters)[_name = this.cid] || (_base[_name] = new FilterModel(this.filterable));
    },
    setSortBy: function(sortBy, options) {
      if (options == null) options = {};
      return this.getFilterState().setOption('sortBy', sortBy, options);
    },
    applyFilter: function(query, options) {
      if (query == null) query = {};
      if (options == null) options = {};
      options = _.defaults(options, this.getQueryOptions());
      query = _.defaults(query, this.getQuery());
      return this.getFilterState().set({
        query: query,
        options: options
      }, options);
    }
  };

  FilterModel = (function(_super) {

    __extends(FilterModel, _super);

    function FilterModel() {
      FilterModel.__super__.constructor.apply(this, arguments);
    }

    FilterModel.prototype.defaults = {
      options: {},
      query: {}
    };

    FilterModel.prototype.setOption = function(option, value, options) {
      var payload;
      payload = {};
      payload[option] = value;
      return this.set('options', _.extend(this.toOptions(), payload), options);
    };

    FilterModel.prototype.setQueryOption = function(option, value, options) {
      var payload;
      payload = {};
      payload[option] = value;
      return this.set('query', _.extend(this.toQuery(), payload), options);
    };

    FilterModel.prototype.toOptions = function() {
      return this.toJSON().options;
    };

    FilterModel.prototype.toQuery = function() {
      return this.toJSON().query;
    };

    FilterModel.prototype.toRemote = function() {
      var options;
      options = this.toOptions();
      return _.extend(this.toQuery(), {
        limit: options.limit,
        page: options.page,
        sortBy: options.sortBy
      });
    };

    return FilterModel;

  })(Backbone.Model);

}).call(this);
(function() {

  Luca.concerns.GridLayout = {
    _initializer: function() {
      if (this.gridSpan) this.$el.addClass("span" + this.gridSpan);
      if (this.gridOffset) this.$el.addClass("offset" + this.gridOffset);
      if (this.gridRowFluid) this.$el.addClass("row-fluid");
      if (this.gridRow) return this.$el.addClass("row");
    }
  };

}).call(this);
(function() {

  Luca.concerns.LoadMaskable = {
    __initializer: function() {
      var _this = this;
      if (this.loadMask !== true) return;
      if (this.loadMask === true) {
        this.defer(function() {
          _this.$el.addClass('with-mask');
          if (_this.$('.load-mask').length === 0) {
            _this.loadMaskTarget().prepend(Luca.template(_this.loadMaskTemplate, _this));
            return _this.$('.load-mask').hide();
          }
        }).until("after:render");
        this.on(this.loadmaskEnableEvent || "enable:loadmask", this.applyLoadMask, this);
        return this.on(this.loadmaskDisableEvent || "disable:loadmask", this.applyLoadMask, this);
      }
    },
    showLoadMask: function() {
      return this.trigger("enable:loadmask");
    },
    hideLoadMask: function() {
      return this.trigger("disable:loadmask");
    },
    loadMaskTarget: function() {
      if (this.loadMaskEl != null) {
        return this.$(this.loadMaskEl);
      } else {
        return this.$bodyEl();
      }
    },
    disableLoadMask: function() {
      this.$('.load-mask .bar').css("width", "100%");
      this.$('.load-mask').hide();
      return clearInterval(this.loadMaskInterval);
    },
    enableLoadMask: function() {
      var maxWidth,
        _this = this;
      this.$('.load-mask').show().find('.bar').css("width", "0%");
      maxWidth = this.$('.load-mask .progress').width();
      if (maxWidth < 20 && (maxWidth = this.$el.width()) < 20) {
        maxWidth = this.$el.parent().width();
      }
      this.loadMaskInterval = setInterval(function() {
        var currentWidth, newWidth;
        currentWidth = _this.$('.load-mask .bar').width();
        newWidth = currentWidth + 12;
        return _this.$('.load-mask .bar').css('width', newWidth);
      }, 200);
      if (this.loadMaskTimeout == null) return;
      return _.delay(function() {
        return _this.disableLoadMask();
      }, this.loadMaskTimeout);
    },
    applyLoadMask: function() {
      if (this.$('.load-mask').is(":visible")) {
        return this.disableLoadMask();
      } else {
        return this.enableLoadMask();
      }
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
  var applyModalConfig;

  Luca.concerns.ModalView = {
    closeOnEscape: true,
    showOnInitialize: false,
    backdrop: false,
    __initializer: function() {
      this.$el.addClass("modal");
      this.on("before:render", applyModalConfig, this);
      return this;
    },
    container: function() {
      return $('body');
    },
    toggle: function() {
      return this.$el.modal('toggle');
    },
    show: function() {
      return this.$el.modal('show');
    },
    hide: function() {
      return this.$el.modal('hide');
    }
  };

  applyModalConfig = function() {
    this.$el.addClass('modal');
    if (this.fade === true) this.$el.addClass('fade');
    $('body').append(this.$el);
    this.$el.modal({
      backdrop: this.backdrop === true,
      keyboard: this.closeOnEscape === true,
      show: this.showOnInitialize === true
    });
    return this;
  };

}).call(this);
(function() {

  Luca.concerns.ModelPresenter = {
    classMethods: {
      getPresenter: function(format) {
        var _ref;
        return (_ref = this.presenters) != null ? _ref[format] : void 0;
      },
      registerPresenter: function(format, config) {
        this.presenters || (this.presenters = {});
        return this.presenters[format] = config;
      }
    },
    presentAs: function(format) {
      var attributeList,
        _this = this;
      try {
        attributeList = this.componentMetaData().componentDefinition().getPresenter(format);
        if (attributeList == null) return this.toJSON();
        return _(attributeList).reduce(function(memo, attribute) {
          memo[attribute] = _this.read(attribute);
          return memo;
        }, {});
      } catch (e) {
        console.log("Error presentAs", e.stack, e.message);
        return this.toJSON();
      }
    }
  };

}).call(this);
(function() {

  Luca.concerns.Paginatable = {
    paginatorViewClass: 'Luca.components.PaginationControl',
    paginationSelector: ".toolbar.bottom",
    __included: function() {
      return _.extend(Luca.Collection.prototype, {
        __paginators: {}
      });
    },
    __initializer: function() {
      var collection, paginationState, _base, _ref,
        _this = this;
      if (this.paginatable === false) return;
      if (!Luca.isBackboneCollection(this.collection)) {
        this.collection = typeof (_base = Luca.CollectionManager).get === "function" ? (_ref = _base.get()) != null ? _ref.getOrCreate(this.collection) : void 0 : void 0;
      }
      if (!Luca.isBackboneCollection(this.collection)) {
        this.debug("Skipping Paginatable due to no collection being present on " + (this.name || this.cid));
        this.debug("collection", this.collection);
        return;
      }
      _.bindAll(this, "paginationControl", "pager");
      this.getCollection || (this.getCollection = function() {
        return this.collection;
      });
      collection = this.getCollection();
      paginationState = this.getPaginationState();
      this.optionsSources || (this.optionsSources = []);
      this.queryOptions || (this.queryOptions = {});
      this.optionsSources.push(function() {
        var options;
        options = _(paginationState.toJSON()).pick('limit', 'page', 'sortBy');
        return _.extend(options, {
          pager: _this.pager
        });
      });
      paginationState.on("change:page", function(state) {
        var filter, options, prepared;
        filter = _.clone(_this.getQuery());
        options = _.clone(_this.getQueryOptions());
        prepared = _this.prepareRemoteFilter(filter, options);
        if (_this.isRemote()) {
          return _this.collection.applyFilter(prepared, {
            remote: true
          });
        } else {
          return _this.trigger("refresh");
        }
      });
      return this.on("before:render", this.renderPaginationControl, this);
    },
    pager: function(numberOfPages, models) {
      this.getPaginationState().set({
        numberOfPages: numberOfPages,
        itemCount: models.length
      });
      return this.paginationControl().updateWithPageCount(numberOfPages, models);
    },
    isRemote: function() {
      return this.getQueryOptions().remote === true;
    },
    getPaginationState: function() {
      var _base, _name;
      return (_base = this.collection.__paginators)[_name = this.cid] || (_base[_name] = this.paginationControl().state);
    },
    paginationContainer: function() {
      return this.$(">" + this.paginationSelector);
    },
    setCurrentPage: function(page, options) {
      if (page == null) page = 1;
      if (options == null) options = {};
      return this.getPaginationState().set('page', page, options);
    },
    setPage: function(page, options) {
      if (page == null) page = 1;
      if (options == null) options = {};
      return this.getPaginationState().set('page', page, options);
    },
    setLimit: function(limit, options) {
      if (limit == null) limit = 0;
      if (options == null) options = {};
      return this.getPaginationState().set('limit', limit, options);
    },
    paginationControl: function() {
      if (this.paginator != null) return this.paginator;
      _.defaults(this.paginatable || (this.paginatable = {}), {
        page: 1,
        limit: 20
      });
      this.paginator = Luca.util.lazyComponent({
        type: "pagination_control",
        collection: this.getCollection(),
        defaultState: this.paginatable,
        parent: this.name || this.cid,
        debugMode: this.debugMode
      });
      return this.paginator;
    },
    renderPaginationControl: function() {
      var control;
      control = this.paginationControl();
      this.paginationContainer().append(control.render().$el);
      return control;
    }
  };

}).call(this);
(function() {

  Luca.concerns.QueryCollectionBindings = {
    getCollection: function() {
      return this.collection;
    },
    loadModels: function(models, options) {
      var _ref;
      if (models == null) models = [];
      if (options == null) options = {};
      return (_ref = this.getCollection()) != null ? _ref.reset(models, options) : void 0;
    },
    applyQuery: function(query, queryOptions) {
      if (query == null) query = {};
      if (queryOptions == null) queryOptions = {};
      this.query = query;
      this.queryOptions = queryOptions;
      this.refresh();
      return this;
    },
    getQuery: function(options) {
      var query, querySource, _i, _len, _ref;
      if (options == null) options = {};
      query = this.query || (this.query = {});
      _ref = _(this.querySources || []).compact();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        querySource = _ref[_i];
        query = _.extend(query, querySource(options) || {});
      }
      return query;
    },
    getQueryOptions: function(options) {
      var optionSource, _i, _len, _ref;
      if (options == null) options = {};
      options = this.queryOptions || (this.queryOptions = {});
      _ref = _(this.optionsSources || []).compact();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        optionSource = _ref[_i];
        options = _.extend(options, optionSource(options) || {});
      }
      return options;
    },
    getModels: function(query, options) {
      var _ref;
      if ((_ref = this.collection) != null ? _ref.query : void 0) {
        query || (query = this.getQuery());
        options || (options = this.getQueryOptions());
        return this.collection.query(query, options);
      } else {
        return this.collection.models;
      }
    }
  };

}).call(this);
(function() {

  Luca.concerns.StateModel = {
    __initializer: function() {
      var attribute, fn, handler, _ref,
        _this = this;
      if (this.stateful == null) return;
      if ((this.state != null) && !Luca.isBackboneModel(this.state)) return;
      if (_.isObject(this.stateful) && !(this.defaultState != null)) {
        this.defaultState = this.stateful;
      }
      this.state = new Backbone.Model(this.defaultState || {});
      this.set || (this.set = function() {
        return _this.state.set.apply(_this.state, arguments);
      });
      this.get || (this.get = function() {
        return _this.state.get.apply(_this.state, arguments);
      });
      if (!_.isEmpty(this.stateChangeEvents)) {
        _ref = this.stateChangeEvents;
        for (attribute in _ref) {
          handler = _ref[attribute];
          fn = _.isString(handler) ? this[handler] : handler;
          if (attribute === "*") {
            this.on("state:change", fn, this);
          } else {
            this.on("state:change:" + attribute, fn, this);
          }
        }
      }
      return this.state.on("change", function(state) {
        var changed, value, _ref2, _results;
        _this.trigger("state:change", state);
        _ref2 = state.changedAttributes();
        _results = [];
        for (changed in _ref2) {
          value = _ref2[changed];
          _results.push(_this.trigger("state:change:" + changed, value, state.previous(changed)));
        }
        return _results;
      });
    }
  };

}).call(this);
(function() {

  Luca.concerns.Templating = {
    __initializer: function() {
      var template, templateContent, templateVars;
      templateVars = Luca.util.read.call(this, this.bodyTemplateVars) || {};
      if (template = this.bodyTemplate) {
        this.$el.empty();
        templateContent = Luca.template(template, templateVars);
        return Luca.View.prototype.$html.call(this, templateContent);
      }
    }
  };

}).call(this);
(function() {
  var componentCacheStore, registry;

  registry = {
    classes: {},
    model_classes: {},
    collection_classes: {},
    namespaces: ['Luca.containers', 'Luca.components']
  };

  componentCacheStore = {
    cid_index: {},
    name_index: {}
  };

  Luca.config.defaultComponentClass = Luca.defaultComponentClass = 'Luca.View';

  Luca.config.defaultComponentType = Luca.defaultComponentType = 'view';

  Luca.registry.aliases = {
    grid: "grid_view",
    form: "form_view",
    text: "text_field",
    button: "button_field",
    select: "select_field",
    card: "card_view",
    paged: "card_view",
    wizard: "card_view",
    collection: "collection_view",
    list: "collection_view",
    multi: "collection_multi_view",
    table: "table_view"
  };

  Luca.registerComponent = function(component, prototypeName, componentType) {
    if (componentType == null) componentType = "view";
    Luca.trigger("component:registered", component, prototypeName);
    switch (componentType) {
      case "model":
        return registry.model_classes[component] = prototypeName;
      case "collection":
        return registry.collection_classes[component] = prototypeName;
      default:
        return registry.classes[component] = prototypeName;
    }
  };

  Luca.development_mode_register = function(component, prototypeName) {
    var existing, liveInstances, prototypeDefinition;
    existing = registry.classes[component];
    if (Luca.enableDevelopmentTools === true && (existing != null)) {
      prototypeDefinition = Luca.util.resolve(existing, window);
      liveInstances = Luca.registry.findInstancesByClassName(prototypeName);
      _(liveInstances).each(function(instance) {
        var _ref;
        return instance != null ? (_ref = instance.refreshCode) != null ? _ref.call(instance, prototypeDefinition) : void 0 : void 0;
      });
    }
    return Luca.registerComponent(component, prototypeName);
  };

  Luca.registry.addNamespace = Luca.registry.namespace = function(identifier) {
    registry.namespaces.push(identifier);
    return registry.namespaces = _(registry.namespaces).uniq();
  };

  Luca.registry.namespaces = function(resolve) {
    if (resolve == null) resolve = true;
    return _(registry.namespaces).map(function(namespace) {
      if (resolve) {
        return Luca.util.resolve(namespace);
      } else {
        return namespace;
      }
    });
  };

  Luca.registry.lookup = function(ctype) {
    var alias, c, className, fullPath, parents, _ref;
    if (alias = Luca.registry.aliases[ctype]) ctype = alias;
    c = registry.classes[ctype];
    if (c != null) return c;
    className = Luca.util.classify(ctype);
    parents = Luca.registry.namespaces();
    return fullPath = (_ref = _(parents).chain().map(function(parent) {
      return parent[className];
    }).compact().value()) != null ? _ref[0] : void 0;
  };

  Luca.registry.instances = function() {
    return _(componentCacheStore.cid_index).values();
  };

  Luca.registry.findInstancesByClass = function(componentClass) {
    return Luca.registry.findInstancesByClassName(componentClass.displayName);
  };

  Luca.registry.findInstancesByClassName = function(className) {
    var instances;
    if (!_.isString(className)) className = className.displayName;
    instances = Luca.registry.instances();
    return _(instances).select(function(instance) {
      var isClass, _ref;
      isClass = instance.displayName === className;
      return instance.displayName === className || (typeof instance._superClass === "function" ? (_ref = instance._superClass()) != null ? _ref.displayName : void 0 : void 0) === className;
    });
  };

  Luca.registry.classes = function(toString) {
    if (toString == null) toString = false;
    return _(_.extend({}, registry.classes, registry.model_classes, registry.collection_classes)).map(function(className, ctype) {
      if (toString) {
        return className;
      } else {
        return {
          className: className,
          ctype: ctype
        };
      }
    });
  };

  Luca.registry.find = function(search) {
    return Luca.util.resolve(search) || Luca.define.findDefinition(search);
  };

  Luca.cache = Luca.cacheInstance = function(cacheKey, object) {
    var lookup_id;
    if (cacheKey == null) return;
    if ((object != null ? object.doNotCache : void 0) === true) return object;
    if (object != null) componentCacheStore.cid_index[cacheKey] = object;
    object = componentCacheStore.cid_index[cacheKey];
    if ((object != null ? object.component_name : void 0) != null) {
      componentCacheStore.name_index[object.component_name] = object.cid;
    } else if ((object != null ? object.name : void 0) != null) {
      componentCacheStore.name_index[object.name] = object.cid;
    }
    if (object != null) return object;
    lookup_id = componentCacheStore.name_index[cacheKey];
    return componentCacheStore.cid_index[lookup_id];
  };

}).call(this);
(function() {
  var MetaDataProxy;

  Luca.registry.componentMetaData = {};

  Luca.registry.getMetaDataFor = function(componentName) {
    return new MetaDataProxy(Luca.registry.componentMetaData[componentName]);
  };

  Luca.registry.addMetaData = function(componentName, key, value) {
    var data, _base;
    data = (_base = Luca.registry.componentMetaData)[componentName] || (_base[componentName] = {});
    data[key] = _(value).clone();
    return data;
  };

  MetaDataProxy = (function() {

    function MetaDataProxy(meta) {
      this.meta = meta != null ? meta : {};
      _.defaults(this.meta, {
        "super class name": "",
        "display name": "",
        "public interface": [],
        "public configuration": [],
        "private interface": [],
        "private configuration": [],
        "class configuration": [],
        "class interface": []
      });
    }

    MetaDataProxy.prototype.superClass = function() {
      return Luca.util.resolve(this.meta["super class name"]);
    };

    MetaDataProxy.prototype.componentDefinition = function() {
      return Luca.registry.find(this.meta["display name"]);
    };

    MetaDataProxy.prototype.componentPrototype = function() {
      var _ref;
      return (_ref = this.componentDefinition()) != null ? _ref.prototype : void 0;
    };

    MetaDataProxy.prototype.prototypeFunctions = function() {
      return _.functions(this.componentPrototype());
    };

    MetaDataProxy.prototype.classAttributes = function() {
      return _.uniq(this.classInterface().concat(this.classConfiguration()));
    };

    MetaDataProxy.prototype.publicAttributes = function() {
      return _.uniq(this.publicInterface().concat(this.publicConfiguration()));
    };

    MetaDataProxy.prototype.privateAttributes = function() {
      return _.uniq(this.privateInterface().concat(this.privateConfiguration()));
    };

    MetaDataProxy.prototype.classMethods = function() {
      var list;
      list = _.functions(this.componentDefinition());
      return _(list).intersection(this.classAttributes());
    };

    MetaDataProxy.prototype.publicMethods = function() {
      return _(this.prototypeFunctions()).intersection(this.publicAttributes());
    };

    MetaDataProxy.prototype.privateMethods = function() {
      return _(this.prototypeFunctions()).intersection(this.privateAttributes());
    };

    MetaDataProxy.prototype.classConfiguration = function() {
      return this.meta["class configuration"];
    };

    MetaDataProxy.prototype.publicConfiguration = function() {
      return this.meta["public configuration"];
    };

    MetaDataProxy.prototype.privateConfiguration = function() {
      return this.meta["private configuration"];
    };

    MetaDataProxy.prototype.classInterface = function() {
      return this.meta["class interface"];
    };

    MetaDataProxy.prototype.publicInterface = function() {
      return this.meta["public interface"];
    };

    MetaDataProxy.prototype.privateInterface = function() {
      return this.meta["private interface"];
    };

    MetaDataProxy.prototype.triggers = function() {
      return this.meta["hooks"];
    };

    MetaDataProxy.prototype.hooks = function() {
      return this.meta["hooks"];
    };

    MetaDataProxy.prototype.styleHierarchy = function() {
      var list;
      list = _(this.classHierarchy()).map(function(cls) {
        return Luca.util.toCssClass(cls, 'views', 'components', 'core', 'fields', 'containers');
      });
      return _(list).without('backbone-view', 'luca-view');
    };

    MetaDataProxy.prototype.classHierarchy = function() {
      var list, proxy, _ref, _ref2, _ref3, _ref4;
      list = [this.meta["display name"], this.meta["super class name"]];
      proxy = (_ref = this.superClass()) != null ? (_ref2 = _ref.prototype) != null ? typeof _ref2.componentMetaData === "function" ? _ref2.componentMetaData() : void 0 : void 0 : void 0;
      while (!!proxy) {
        list = list.concat(proxy != null ? proxy.classHierarchy() : void 0);
        proxy = (_ref3 = proxy.superClass()) != null ? (_ref4 = _ref3.prototype) != null ? typeof _ref4.componentMetaData === "function" ? _ref4.componentMetaData() : void 0 : void 0 : void 0;
      }
      return _(list).uniq();
    };

    return MetaDataProxy;

  })();

}).call(this);
(function() {
  var __slice = Array.prototype.slice;

  Luca.Observer = (function() {

    function Observer(options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, Backbone.Events);
      this.type = this.options.type;
      if (this.options.debugAll) {
        this.bind("all", function(trigger, one, two) {
          return console.log("ALL", trigger, one, two);
        });
      }
    }

    Observer.prototype.relay = function() {
      var args, triggerer;
      triggerer = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      console.log("Relaying", trigger, args);
      this.trigger("event", triggerer, args);
      return this.trigger("event:" + args[0], triggerer, args.slice(1));
    };

    return Observer;

  })();

  Luca.Observer.enableObservers = function(options) {
    if (options == null) options = {};
    Luca.enableGlobalObserver = true;
    Luca.ViewObserver = new Luca.Observer(_.extend(options, {
      type: "view"
    }));
    return Luca.CollectionObserver = new Luca.Observer(_.extend(options, {
      type: "collection"
    }));
  };

}).call(this);
(function() {
  var bindAllEventHandlers, bindEventHandlers, view,
    __slice = Array.prototype.slice;

  view = Luca.register("Luca.View");

  view["extends"]("Backbone.View");

  view.includes("Luca.Events", "Luca.concerns.DomHelpers");

  view.mixesIn("DomHelpers", "Templating", "EnhancedProperties", "CollectionEventBindings", "ApplicationEventBindings", "StateModel");

  view.triggers("before:initialize", "after:initialize", "before:render", "after:render", "first:activation", "activation", "deactivation");

  view.defines({
    initialize: function(options) {
      this.options = options != null ? options : {};
      this.trigger("before:initialize", this, this.options);
      _.extend(this, this.options);
      if (this.autoBindEventHandlers === true || this.bindAllEvents === true) {
        bindAllEventHandlers.call(this);
      }
      if (this.name != null) this.cid = _.uniqueId(this.name);
      this.$el.attr("data-luca-id", this.name || this.cid);
      Luca.cacheInstance(this.cid, this);
      this.setupHooks(_(Luca.View.prototype.hooks.concat(this.hooks)).uniq());
      Luca.concern.setup.call(this);
      this.delegateEvents();
      return this.trigger("after:initialize", this);
    },
    setupHooks: Luca.util.setupHooks,
    registerEvent: function(selector, handler) {
      this.events || (this.events = {});
      this.events[selector] = handler;
      return this.delegateEvents();
    },
    definitionClass: function() {
      var _ref;
      return (_ref = Luca.util.resolve(this.displayName, window)) != null ? _ref.prototype : void 0;
    },
    collections: function() {
      return Luca.util.selectProperties(Luca.isBackboneCollection, this);
    },
    models: function() {
      return Luca.util.selectProperties(Luca.isBackboneModel, this);
    },
    views: function() {
      return Luca.util.selectProperties(Luca.isBackboneView, this);
    },
    debug: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (!(this.debugMode || (window.LucaDebugMode != null))) return;
      return console.log([this.name || this.cid].concat(__slice.call(args)));
    },
    trigger: function() {
      if (Luca.enableGlobalObserver) {
        if (Luca.developmentMode === true || this.observeEvents === true) {
          Luca.ViewObserver || (Luca.ViewObserver = new Luca.Observer({
            type: "view"
          }));
          Luca.ViewObserver.relay(this, arguments);
        }
      }
      return Backbone.View.prototype.trigger.apply(this, arguments);
    }
  });

  Luca.View._originalExtend = Backbone.View.extend;

  Luca.View.renderStrategies = {
    legacy: function(_userSpecifiedMethod) {
      var autoTrigger, deferred, fn, target, trigger,
        _this = this;
      view = this;
      if (this.deferrable) {
        target = this.deferrable_target;
        if (!Luca.isBackboneCollection(this.deferrable)) {
          this.deferrable = this.collection;
        }
        target || (target = this.deferrable);
        trigger = this.deferrable_event ? this.deferrable_event : Luca.View.deferrableEvent;
        deferred = function() {
          _userSpecifiedMethod.call(view);
          return view.trigger("after:render", view);
        };
        view.defer(deferred).until(target, trigger);
        view.trigger("before:render", this);
        autoTrigger = this.deferrable_trigger || this.deferUntil;
        if (!(autoTrigger != null)) {
          target[this.deferrable_method || "fetch"].call(target);
        } else {
          fn = _.once(function() {
            var _base, _name;
            return typeof (_base = _this.deferrable)[_name = _this.deferrable_method || "fetch"] === "function" ? _base[_name]() : void 0;
          });
          (this.deferrable_target || this).bind(this.deferrable_trigger, fn);
        }
        return this;
      } else {
        this.trigger("before:render", this);
        _userSpecifiedMethod.apply(this, arguments);
        this.trigger("after:render", this);
        return this;
      }
    },
    improved: function(_userSpecifiedMethod) {
      var deferred,
        _this = this;
      this.trigger("before:render", this);
      deferred = function() {
        _userSpecifiedMethod.apply(_this, arguments);
        return _this.trigger("after:render", _this);
      };
      console.log("doing the improved one", this.deferrable);
      if ((this.deferrable != null) && !_.isString(this.deferrable)) {
        throw "Deferrable property is expected to be a event id";
      }
      if (_.isString(this.deferrable)) {
        console.log("binding to " + this.deferrable + " on " + this.cid);
        return view.on(this.deferrable, function() {
          console.log("did the improved one");
          deferred.call(view);
          return view.unbind(listenForEvent, this);
        });
      } else {
        return deferred.call(this);
      }
    }
  };

  Luca.View.renderWrapper = function(definition) {
    var _userSpecifiedMethod;
    _userSpecifiedMethod = definition.render;
    _userSpecifiedMethod || (_userSpecifiedMethod = function() {
      return this.trigger("empty:render");
    });
    definition.render = function() {
      var strategy;
      strategy = Luca.View.renderStrategies[this.renderStrategy || (this.renderStrategy = "legacy")];
      if (!_.isFunction(strategy)) {
        throw "Invalid rendering strategy.  Please see Luca.View.renderStrategies";
      }
      strategy.call(this, _userSpecifiedMethod);
      return this;
    };
    return definition;
  };

  bindAllEventHandlers = function() {
    var config, _i, _len, _ref, _results;
    _ref = [this.events, this.componentEvents, this.collectionEvents, this.applicationEvents];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      config = _ref[_i];
      if (!_.isEmpty(config)) _results.push(bindEventHandlers.call(this, config));
    }
    return _results;
  };

  bindEventHandlers = function(events) {
    var eventSignature, handler, _results;
    if (events == null) events = {};
    _results = [];
    for (eventSignature in events) {
      handler = events[eventSignature];
      if (_.isString(handler)) {
        _results.push(_.bindAll(this, handler));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Luca.View.deferrableEvent = "reset";

  Luca.View.extend = function(definition) {
    var componentClass, module, _i, _len, _ref;
    if (definition == null) definition = {};
    definition = Luca.View.renderWrapper(definition);
    if (definition.concerns != null) {
      definition.concerns || (definition.concerns = definition.concerns);
    }
    componentClass = Luca.View._originalExtend.call(this, definition);
    if ((definition.concerns != null) && _.isArray(definition.concerns)) {
      _ref = definition.concerns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        Luca.decorate(componentClass)["with"](module);
      }
    }
    return componentClass;
  };

}).call(this);
(function() {
  var model, setupComputedProperties;

  model = Luca.define('Luca.Model');

  model["extends"]('Backbone.Model');

  model.includes('Luca.Events');

  model.defines({
    initialize: function() {
      Backbone.Model.prototype.initialize(this, arguments);
      setupComputedProperties.call(this);
      return Luca.concern.setup.call(this);
    },
    read: function(attr) {
      if (_.isFunction(this[attr])) {
        return this[attr].call(this);
      } else {
        return this.get(attr) || this[attr];
      }
    },
    get: function(attr) {
      var _ref;
      if ((_ref = this.computed) != null ? _ref.hasOwnProperty(attr) : void 0) {
        return this._computed[attr];
      } else {
        return Backbone.Model.prototype.get.call(this, attr);
      }
    }
  });

  setupComputedProperties = function() {
    var attr, dependencies, _ref, _results,
      _this = this;
    if (_.isUndefined(this.computed)) return;
    this._computed = {};
    _ref = this.computed;
    _results = [];
    for (attr in _ref) {
      dependencies = _ref[attr];
      this.on("change:" + attr, function() {
        return _this._computed[attr] = _this.read(attr);
      });
      if (_.isString(dependencies)) dependencies = dependencies.split(',');
      _results.push(_(dependencies).each(function(dep) {
        _this.on("change:" + dep, function() {
          return _this.trigger("change:" + attr);
        });
        if (_this.has(dep)) return _this.trigger("change:" + attr);
      }));
    }
    return _results;
  };

  Luca.Model._originalExtend = Backbone.Model.extend;

  Luca.Model.extend = function(definition) {
    var componentClass, module, _i, _len, _ref;
    if (definition == null) definition = {};
    if (definition.concerns != null) {
      definition.concerns || (definition.concerns = definition.concerns);
    }
    componentClass = Luca.Model._originalExtend.call(this, definition);
    if ((definition.concerns != null) && _.isArray(definition.concerns)) {
      _ref = definition.concerns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        Luca.decorate(componentClass)["with"](module);
      }
    }
    return componentClass;
  };

}).call(this);
(function() {
  var collection;

  collection = Luca.define('Luca.Collection');

  collection["extends"]('Backbone.QueryCollection');

  collection.includes('Luca.Events');

  collection.triggers("after:initialize", "before:fetch", "after:response");

  collection.defines({
    model: Luca.Model,
    cachedMethods: [],
    remoteFilter: false,
    initialize: function(models, options) {
      var table,
        _this = this;
      if (models == null) models = [];
      this.options = options;
      _.extend(this, this.options);
      this._reset();
      if (this.cached) {
        console.log('The @cached property of Luca.Collection is being deprecated.  Please change to cache_key');
      }
      if (this.cache_key || (this.cache_key = this.cached)) {
        this.bootstrap_cache_key = Luca.util.read(this.cache_key);
      }
      if (this.registerAs || this.registerWith) {
        console.log("This configuration API is deprecated.  use @name and @manager properties instead");
      }
      this.name || (this.name = this.registerAs);
      this.manager || (this.manager = this.registerWith);
      this.manager = _.isFunction(this.manager) ? this.manager() : this.manager;
      if (this.name && !this.manager) this.manager = Luca.CollectionManager.get();
      if (this.manager) {
        this.name || (this.name = Luca.util.read(this.cache_key));
        this.name = Luca.util.read(this.name);
        if (!(this.private || this.anonymous)) {
          this.bind("after:initialize", function() {
            return _this.register(_this.manager, _this.name, _this);
          });
        }
      }
      if (this.useLocalStorage === true && (window.localStorage != null)) {
        table = this.bootstrap_cache_key || this.name;
        throw "Must specify a cache_key property or method to use localStorage";
        this.localStorage = new Luca.LocalStore(table);
      }
      if (_.isArray(this.data) && this.data.length > 0) {
        this.memoryCollection = true;
      }
      if (this.useNormalUrl !== true) this.__wrapUrl();
      Backbone.Collection.prototype.initialize.apply(this, [models, this.options]);
      if (models) {
        this.reset(models, {
          silent: true,
          parse: options != null ? options.parse : void 0
        });
      }
      Luca.concern.setup.call(this);
      Luca.util.setupHooks.call(this, this.hooks);
      this.setupMethodCaching();
      return this.trigger("after:initialize");
    },
    __wrapUrl: function() {
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
      this.base_params = _(Luca.Collection.baseParams()).clone();
      return this;
    },
    applyFilter: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) options = {};
      options = _(options).clone();
      if ((options.remote != null) === true || this.remoteFilter === true) {
        this.applyParams(filter);
        return this.fetch(_.extend(options, {
          refresh: true,
          remote: true
        }));
      } else {
        return this.reset(this.query(filter, options));
      }
    },
    applyParams: function(params) {
      this.base_params = _(Luca.Collection.baseParams()).clone() || {};
      _.extend(this.base_params, params);
      return this;
    },
    register: function(collectionManager, key, collection) {
      if (key == null) key = "";
      collectionManager || (collectionManager = Luca.CollectionManager.get());
      if (!(key.length >= 1)) {
        throw "Attempt to register a collection without specifying a key.";
      }
      if (_.isString(collectionManager)) {
        collectionManager = Luca.util.resolve(collectionManager);
      }
      if (collectionManager == null) {
        throw "Attempt to register with a non existent collection manager.";
      }
      if (_.isFunction(collectionManager.add)) {
        return collectionManager.add(key, collection);
      }
      if (_.isObject(collectionManager)) {
        return collectionManager[key] = collection;
      }
    },
    loadFromBootstrap: function() {
      if (!this.bootstrap_cache_key) return;
      this.reset(this.cached_models());
      return this.trigger("bootstrapped", this);
    },
    bootstrap: function() {
      return this.loadFromBootstrap();
    },
    cached_models: function() {
      return Luca.Collection.cache(this.bootstrap_cache_key);
    },
    fetch: function(options) {
      var url;
      if (options == null) options = {};
      this.trigger("before:fetch", this);
      if (this.memoryCollection === true) return this.reset(this.data);
      if (this.cached_models().length && !(options.refresh === true || options.remote === true)) {
        return this.bootstrap();
      }
      url = _.isFunction(this.url) ? this.url() : this.url;
      if (!((url && url.length > 1) || this.localStorage)) return true;
      this.fetching = true;
      try {
        return Backbone.Collection.prototype.fetch.apply(this, arguments);
      } catch (e) {
        console.log("Error in Collection.fetch", e);
        throw e;
      }
    },
    onceLoaded: function(fn, options) {
      var wrapped,
        _this = this;
      if (options == null) options = {};
      _.defaults(options, {
        autoFetch: true
      });
      if (this.length > 0 && !this.fetching) {
        fn.apply(this, [this]);
        return;
      }
      wrapped = function() {
        return fn.apply(_this, [_this]);
      };
      this.bind("reset", function() {
        wrapped();
        return this.unbind("reset", this);
      });
      if (!(this.fetching || !options.autoFetch)) return this.fetch();
    },
    ifLoaded: function(fn, options) {
      var scope,
        _this = this;
      if (options == null) {
        options = {
          scope: this,
          autoFetch: true
        };
      }
      scope = options.scope || this;
      if (this.length > 0 && !this.fetching) fn.apply(scope, [this]);
      this.bind("reset", function(collection) {
        return fn.call(scope, collection);
      });
      if (!(this.fetching === true || !options.autoFetch || this.length > 0)) {
        return this.fetch();
      }
    },
    parse: function(response) {
      var models;
      this.fetching = false;
      this.trigger("after:response", response);
      models = this.root != null ? response[this.root] : response;
      if (this.bootstrap_cache_key) {
        Luca.Collection.cache(this.bootstrap_cache_key, models);
      }
      return models;
    },
    restoreMethodCache: function() {
      var config, name, _ref, _results;
      _ref = this._methodCache;
      _results = [];
      for (name in _ref) {
        config = _ref[name];
        if (config.original != null) {
          config.args = void 0;
          _results.push(this[name] = config.original);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    clearMethodCache: function(method) {
      return this._methodCache[method].value = void 0;
    },
    clearAllMethodsCache: function() {
      var config, name, _ref, _results;
      _ref = this._methodCache;
      _results = [];
      for (name in _ref) {
        config = _ref[name];
        _results.push(this.clearMethodCache(name));
      }
      return _results;
    },
    setupMethodCaching: function() {
      var cache, membershipEvents, _ref;
      if (!(((_ref = this.cachedMethods) != null ? _ref.length : void 0) > 0)) {
        return;
      }
      collection = this;
      membershipEvents = ["reset", "add", "remove"];
      cache = this._methodCache = {};
      return _(this.cachedMethods).each(function(method) {
        var dependencies, membershipEvent, watchForChangesOn, _i, _len;
        cache[method] = {
          name: method,
          original: collection[method],
          value: void 0
        };
        collection[method] = function() {
          var _base;
          return (_base = cache[method]).value || (_base.value = cache[method].original.apply(collection, arguments));
        };
        for (_i = 0, _len = membershipEvents.length; _i < _len; _i++) {
          membershipEvent = membershipEvents[_i];
          collection.bind(membershipEvent, function() {
            return collection.clearAllMethodsCache();
          });
        }
        dependencies = method.split(':')[1];
        if (dependencies) {
          watchForChangesOn = dependencies.split(",");
          return _(watchForChangesOn).each(function(dependency) {
            return collection.bind("change:" + dependency, function() {
              return collection.clearMethodCache({
                method: method
              });
            });
          });
        }
      });
    },
    query: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) options = {};
      if (Backbone.QueryCollection != null) {
        return Backbone.QueryCollection.prototype.query.apply(this, arguments);
      } else {
        return this.models;
      }
    }
  });

  _.extend(Luca.Collection.prototype, {
    trigger: function() {
      if (Luca.enableGlobalObserver) {
        Luca.CollectionObserver || (Luca.CollectionObserver = new Luca.Observer({
          type: "collection"
        }));
        Luca.CollectionObserver.relay(this, arguments);
      }
      return Backbone.View.prototype.trigger.apply(this, arguments);
    }
  });

  Luca.Collection._originalExtend = Backbone.Collection.extend;

  Luca.Collection.extend = function(definition) {
    var componentClass, module, _i, _len, _ref;
    if (definition == null) definition = {};
    if (definition.concerns != null) {
      definition.concerns || (definition.concerns = definition.concerns);
    }
    componentClass = Luca.Collection._originalExtend.call(this, definition);
    if ((definition.concerns != null) && _.isArray(definition.concerns)) {
      _ref = definition.concerns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        Luca.decorate(componentClass)["with"](module);
      }
    }
    return componentClass;
  };

  Luca.Collection.namespace = function(namespace) {
    var _base;
    if (_.isString(namespace)) namespace = Luca.util.resolve(namespace);
    if (namespace != null) Luca.Collection.__defaultNamespace = namespace;
    (_base = Luca.Collection).__defaultNamespace || (_base.__defaultNamespace = window || global);
    return Luca.util.read(Luca.Collection.__defaultNamespace);
  };

  Luca.Collection.baseParams = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    if (obj) Luca.Collection._baseParams = obj;
    return Luca.util.read(Luca.Collection._baseParams);
  };

  Luca.Collection.resetBaseParams = function() {
    return Luca.Collection._baseParams = {};
  };

  Luca.Collection._bootstrapped_models = {};

  Luca.Collection.bootstrap = function(obj) {
    return _.extend(Luca.Collection._bootstrapped_models, obj);
  };

  Luca.Collection.cache = function(key, models) {
    if (models) return Luca.Collection._bootstrapped_models[key] = models;
    return Luca.Collection._bootstrapped_models[key] || [];
  };

}).call(this);
(function() {
  var attachToolbar;

  attachToolbar = function(config, targetEl) {
    var action, container, hasBody, id, toolbar;
    if (config == null) config = {};
    config.orientation || (config.orientation = "top");
    config.ctype || (config.ctype = this.toolbarType || "panel_toolbar");
    id = "" + this.cid + "-tbc-" + config.orientation;
    toolbar = Luca.util.lazyComponent(config);
    container = this.make("div", {
      "class": "toolbar-container " + config.orientation,
      id: id
    }, toolbar.render().el);
    hasBody = this.bodyClassName || this.bodyTagName;
    action = (function() {
      switch (config.orientation) {
        case "top":
        case "left":
          if (hasBody) {
            return "before";
          } else {
            return "prepend";
          }
          break;
        case "bottom":
        case "right":
          if (hasBody) {
            return "after";
          } else {
            return "append";
          }
      }
    })();
    return (targetEl || this.$bodyEl())[action](container);
  };

  _.def("Luca.components.Panel")["extends"]("Luca.View")["with"]({
    topToolbar: void 0,
    bottomToolbar: void 0,
    loadMask: false,
    loadMaskTemplate: ["components/load_mask"],
    loadMaskTimeout: 3000,
    mixins: ["LoadMaskable"],
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
    applyStyles: function(styles, body) {
      var setting, target, value;
      if (styles == null) styles = {};
      if (body == null) body = false;
      target = body ? this.$bodyEl() : this.$el;
      for (setting in styles) {
        value = styles[setting];
        target.css(setting, value);
      }
      return this;
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.View.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      if (this.styles != null) this.applyStyles(this.styles);
      if (this.bodyStyles != null) this.applyStyles(this.bodyStyles, true);
      return typeof this.renderToolbars === "function" ? this.renderToolbars() : void 0;
    },
    $bodyEl: function() {
      var bodyEl, className, element, newElement;
      element = this.bodyTagName || "div";
      className = this.bodyClassName || "view-body";
      this.bodyEl || (this.bodyEl = "" + element + "." + className);
      bodyEl = this.$(this.bodyEl);
      if (bodyEl.length > 0) return bodyEl;
      if (bodyEl.length === 0 && ((this.bodyClassName != null) || (this.bodyTagName != null))) {
        newElement = this.make(element, {
          "class": className,
          "data-auto-appended": true
        });
        $(this.el).append(newElement);
        return this.$(this.bodyEl);
      }
      return $(this.el);
    },
    $wrap: function(wrapper) {
      if (_.isString(wrapper) && !wrapper.match(/[<>]/)) {
        wrapper = this.make("div", {
          "class": wrapper
        });
      }
      return this.$el.wrap(wrapper);
    },
    $template: function(template, variables) {
      if (variables == null) variables = {};
      return this.$html(Luca.template(template, variables));
    },
    $empty: function() {
      return this.$bodyEl().empty();
    },
    $html: function(content) {
      return this.$bodyEl().html(content);
    },
    $append: function(content) {
      return this.$bodyEl().append(content);
    },
    renderToolbars: function() {
      var _this = this;
      return _(["top", "left", "right", "bottom"]).each(function(orientation) {
        var config;
        if (config = _this["" + orientation + "Toolbar"]) {
          return _this.renderToolbar(orientation, config);
        }
      });
    },
    renderToolbar: function(orientation, config) {
      if (orientation == null) orientation = "top";
      if (config == null) config = {};
      config.parent = this;
      config.orientation = orientation;
      return attachToolbar.call(this, config, config.targetEl);
    }
  });

}).call(this);
(function() {
  var field;

  field = Luca.register("Luca.core.Field");

  field["extends"]("Luca.View");

  field.triggers("before:validation", "after:validation", "on:change");

  field.publicConfiguration({
    labelAlign: 'top',
    className: 'luca-ui-text-field luca-ui-field',
    statuses: ["warning", "error", "success"]
  });

  field.publicInterface({
    disable: function() {
      return this.getInputElement().attr('disabled', true);
    },
    enable: function() {
      return this.getInputElement().attr('disabled', false);
    },
    getValue: function() {
      var raw, _ref;
      raw = (_ref = this.getInputElement()) != null ? _ref.attr('value') : void 0;
      if (_.str.isBlank(raw)) return raw;
      switch (this.valueType) {
        case "integer":
          return parseInt(raw);
        case "string":
          return "" + raw;
        case "float":
          return parseFloat(raw);
        default:
          return raw;
      }
    },
    setValue: function(value) {
      var _ref;
      return (_ref = this.getInputElement()) != null ? _ref.attr('value', value) : void 0;
    },
    updateState: function(state) {
      var _this = this;
      return _(this.statuses).each(function(cls) {
        _this.$el.removeClass(cls);
        return _this.$el.addClass(state);
      });
    }
  });

  field.privateConfiguration({
    isField: true,
    template: 'fields/text_field'
  });

  field.defines({
    initialize: function(options) {
      var _ref;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_class || (this.input_class = "");
      this.input_type || (this.input_type = "");
      this.helperText || (this.helperText = "");
      if (!(this.label != null) || this.label.length === 0) this.label = this.name;
      if (this.required && !((_ref = this.label) != null ? _ref.match(/^\*/) : void 0)) {
        this.label || (this.label = "*" + this.label);
      }
      this.inputStyles || (this.inputStyles = "");
      this.input_value || (this.input_value = this.value || "");
      if (this.disabled) this.disable();
      this.updateState(this.state);
      this.placeHolder || (this.placeHolder = "");
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
    beforeRender: function() {
      if (Luca.config.enableBoostrap) this.$el.addClass('control-group');
      if (this.required) return this.$el.addClass('required');
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    },
    getInputElement: function() {
      return this.input || (this.input = this.$('input').eq(0));
    }
  });

}).call(this);
(function() {
  var applyDOMConfig, container, createGetterMethods, createMethodsToGetComponentsByRole, doComponents, doLayout, indexComponent, validateContainerConfiguration;

  container = Luca.register("Luca.core.Container");

  container["extends"]("Luca.components.Panel");

  container.triggers("before:components", "before:render:components", "before:layout", "after:components", "after:layout", "first:activation");

  container.defines({
    className: 'luca-ui-container',
    componentTag: 'div',
    componentClass: 'luca-ui-panel',
    isContainer: true,
    rendered: false,
    components: [],
    componentEvents: {},
    initialize: function(options) {
      var component, _i, _len, _ref;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.components || (this.components = this.fields || (this.fields = this.pages || (this.pages = this.cards || (this.cards = this.views))));
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        if (_.isString(component)) {
          component = {
            type: component,
            role: component,
            name: component
          };
        }
      }
      _.bindAll(this, "beforeRender");
      this.setupHooks(Luca.core.Container.prototype.hooks);
      validateContainerConfiguration(this);
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
    beforeRender: function() {
      var _ref;
      doLayout.call(this);
      doComponents.call(this);
      return (_ref = Luca.components.Panel.prototype.beforeRender) != null ? _ref.apply(this, arguments) : void 0;
    },
    customizeContainerEl: function(containerEl, panel, panelIndex) {
      return containerEl;
    },
    prepareLayout: function() {
      var componentsWithClassBasedAssignment, containerAssignment, specialComponent, targetEl, _i, _len, _results;
      container = this;
      this.componentContainers = _(this.components).map(function(component, index) {
        return applyDOMConfig.call(container, component, index);
      });
      componentsWithClassBasedAssignment = this._().select(function(component) {
        var _ref;
        return _.isString(component.container) && ((_ref = component.container) != null ? _ref.match('.') : void 0) && container.$(component.container).length > 0;
      });
      if (componentsWithClassBasedAssignment.length > 0) {
        _results = [];
        for (_i = 0, _len = componentsWithClassBasedAssignment.length; _i < _len; _i++) {
          specialComponent = componentsWithClassBasedAssignment[_i];
          containerAssignment = _.uniqueId('container');
          targetEl = container.$(specialComponent.container);
          if (targetEl.length > 0) {
            $(targetEl).attr('data-container-assignment', containerAssignment);
            _results.push(specialComponent.container += "[data-container-assignment='" + containerAssignment + "']");
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    prepareComponents: function() {
      var _this = this;
      container = this;
      return _(this.components).each(function(component, index) {
        var ce, componentContainerElement, componentExtension, panel, _ref, _ref2;
        ce = componentContainerElement = (_ref = _this.componentContainers) != null ? _ref[index] : void 0;
        ce["class"] = ce["class"] || ce.className || ce.classes;
        if (_this.generateComponentElements) {
          panel = _this.make(_this.componentTag, componentContainerElement, '');
          _this.$append(panel);
        }
        if (container.defaults != null) {
          component = _.defaults(component, container.defaults || {});
        }
        if (_.isArray(container.extensions) && _.isObject((_ref2 = container.extensions) != null ? _ref2[index] : void 0)) {
          componentExtension = container.extensions[index];
          component = _.extend(component, componentExtension);
        }
        if ((component.role != null) && _.isObject(container.extensions) && _.isObject(container.extensions[component.role])) {
          componentExtension = container.extensions[component.role];
          component = _.extend(component, componentExtension);
        }
        if (component.container == null) {
          if (_this.generateComponentElements) {
            component.container = "#" + componentContainerElement.id;
          }
          return component.container || (component.container = _this.$bodyEl());
        }
      });
    },
    createComponents: function() {
      var map,
        _this = this;
      if (this.componentsCreated === true) return;
      map = this.componentIndex = {
        name_index: {},
        cid_index: {},
        role_index: {}
      };
      container = this;
      this.components = _(this.components).map(function(object, index) {
        var component, created, _ref;
        component = Luca.isComponent(object) ? object : (object.type || (object.type = object.ctype), !(object.type != null) ? object.components != null ? object.type = object.ctype = 'container' : object.type = object.ctype = Luca.defaultComponentType : void 0, object._parentCid || (object._parentCid = container.cid), created = Luca.util.lazyComponent(object));
        if (!component.container && ((_ref = component.options) != null ? _ref.container : void 0)) {
          component.container = component.options.container;
        }
        component.getParent || (component.getParent = function() {
          return Luca(component._parentCid);
        });
        if (!(component.container != null)) {
          console.log(component, index, _this);
          console.error("could not assign container property to component on container " + (_this.name || _this.cid));
        }
        indexComponent(component).at(index)["in"](_this.componentIndex);
        return component;
      });
      this.componentsCreated = true;
      return map;
    },
    renderComponents: function(debugMode) {
      this.debugMode = debugMode != null ? debugMode : "";
      this.debug("container render components");
      container = this;
      return _(this.components).each(function(component) {
        try {
          component.trigger("before:attach");
          this.$(component.container).eq(0).append(component.el);
          component.trigger("after:attach");
          return component.render();
        } catch (e) {
          console.log("Error Rendering Component " + (component.name || component.cid), component);
          if (_.isObject(e)) {
            console.log(e.message);
            console.log(e.stack);
          }
          if ((Luca.silenceRenderErrors != null) !== true) throw e;
        }
      });
    },
    firstActivation: function() {
      var activator;
      activator = this;
      return this.each(function(component, index) {
        var _ref;
        if ((component != null ? component.previously_activated : void 0) !== true) {
          if (component != null) {
            if ((_ref = component.trigger) != null) {
              _ref.call(component, "first:activation", component, activator);
            }
          }
          return component.previously_activated = true;
        }
      });
    },
    _: function() {
      return _(this.components);
    },
    pluck: function(attribute) {
      return this._().pluck(attribute);
    },
    invoke: function(method) {
      return this._().invoke(method);
    },
    select: function(fn) {
      return this._().select(fn);
    },
    detect: function(fn) {
      return this._().detect(attribute);
    },
    reject: function(fn) {
      return this._().reject(fn);
    },
    map: function(fn) {
      return this._().map(fn);
    },
    registerComponentEvents: function(eventList) {
      var component, componentNameOrRole, eventId, handler, listener, _ref, _ref2, _results,
        _this = this;
      container = this;
      _ref = eventList || this.componentEvents || {};
      _results = [];
      for (listener in _ref) {
        handler = _ref[listener];
        _ref2 = listener.split(' '), componentNameOrRole = _ref2[0], eventId = _ref2[1];
        if (!_.isFunction(this[handler])) {
          console.log("Error registering component event", listener, componentNameOrRole, eventId);
          throw "Invalid component event definition " + listener + ". Specified handler is not a method on the container";
        }
        if (componentNameOrRole === "*") {
          _results.push(this.eachComponent(function(component) {
            return component.on(eventId, _this[handler], container);
          }));
        } else {
          component = this.findComponentForEventBinding(componentNameOrRole);
          if (!((component != null) && Luca.isComponent(component))) {
            console.log("Error registering component event", listener, componentNameOrRole, eventId);
            throw "Invalid component event definition: " + componentNameOrRole;
          }
          _results.push(component != null ? component.bind(eventId, this[handler], container) : void 0);
        }
      }
      return _results;
    },
    subContainers: function() {
      return this.select(function(component) {
        return component.isContainer === true;
      });
    },
    roles: function() {
      return _(this.allChildren()).pluck('role');
    },
    allChildren: function() {
      var children, grandchildren;
      children = this.components;
      grandchildren = _(this.subContainers()).invoke('allChildren');
      return _([children, grandchildren]).chain().compact().flatten().value();
    },
    findComponentForEventBinding: function(nameRoleOrGetter, deep) {
      if (deep == null) deep = true;
      return this.findComponentByName(nameRoleOrGetter, deep) || this.findComponentByGetter(nameRoleOrGetter, deep) || this.findComponentByRole(nameRoleOrGetter, deep);
    },
    findComponentByGetter: function(getter, deep) {
      if (deep == null) deep = false;
      return _(this.allChildren()).detect(function(component) {
        return component.getter === getter;
      });
    },
    findComponentByRole: function(role, deep) {
      if (deep == null) deep = false;
      return _(this.allChildren()).detect(function(component) {
        return component.role === role || component.type === role || component.ctype === role;
      });
    },
    findComponentByName: function(name, deep) {
      if (deep == null) deep = false;
      return _(this.allChildren()).detect(function(component) {
        return component.name === name;
      });
    },
    findComponentById: function(id, deep) {
      if (deep == null) deep = false;
      return this.findComponent(id, "cid_index", deep);
    },
    findComponent: function(needle, haystack, deep) {
      var component, position, sub_container, _ref;
      if (haystack == null) haystack = "name";
      if (deep == null) deep = false;
      if (this.componentsCreated !== true) this.createComponents();
      position = (_ref = this.componentIndex) != null ? _ref[haystack][needle] : void 0;
      component = this.components[position];
      if (component) return component;
      if (deep === true) {
        sub_container = _(this.components).detect(function(component) {
          return component != null ? typeof component.findComponent === "function" ? component.findComponent(needle, haystack, true) : void 0 : void 0;
        });
        return sub_container != null ? typeof sub_container.findComponent === "function" ? sub_container.findComponent(needle, haystack, true) : void 0 : void 0;
      }
    },
    each: function(fn) {
      return this.eachComponent(fn, false);
    },
    eachComponent: function(fn, deep) {
      var _this = this;
      if (deep == null) deep = true;
      return _(this.components).each(function(component, index) {
        var _ref;
        fn.call(component, component, index);
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
      return this.$("[data-luca-parent='" + (this.name || this.cid) + "']");
    },
    getComponent: function(needle) {
      return this.components[needle];
    },
    isRootComponent: function() {
      return this.rootComponent === true || !(this.getParent != null);
    },
    getRootComponent: function() {
      if (this.isRootComponent()) {
        return this;
      } else {
        return this.getParent().getRootComponent();
      }
    },
    selectByAttribute: function(attribute, value, deep) {
      var components;
      if (value == null) value = void 0;
      if (deep == null) deep = false;
      components = _(this.components).map(function(component) {
        var matches, test;
        matches = [];
        test = component[attribute];
        if (test === value || (!(value != null) && (test != null))) {
          matches.push(component);
        }
        if (deep === true) {
          matches.push(typeof component.selectByAttribute === "function" ? component.selectByAttribute(attribute, value, true) : void 0);
        }
        return _.compact(matches);
      });
      return _.flatten(components);
    }
  });

  Luca.core.Container.componentRenderer = function(container, component) {
    var attachMethod;
    attachMethod = $(component.container)[component.attachWith || "append"];
    return attachMethod(component.render().el);
  };

  doLayout = function() {
    this.trigger("before:layout", this);
    this.prepareLayout();
    return this.trigger("after:layout", this);
  };

  applyDOMConfig = function(panel, panelIndex) {
    var config, style_declarations;
    style_declarations = [];
    if (panel.height != null) {
      style_declarations.push("height: " + (_.isNumber(panel.height) ? panel.height + 'px' : panel.height));
    }
    if (panel.width != null) {
      style_declarations.push("width: " + (_.isNumber(panel.width) ? panel.width + 'px' : panel.width));
    }
    if (panel.float) style_declarations.push("float: " + panel.float);
    config = {
      "class": (panel != null ? panel.classes : void 0) || this.componentClass,
      id: "" + this.cid + "-" + panelIndex,
      style: style_declarations.join(';'),
      "data-luca-parent": this.name || this.cid
    };
    if (this.customizeContainerEl != null) {
      config = this.customizeContainerEl(config, panel, panelIndex);
    }
    return config;
  };

  createGetterMethods = function() {
    var childrenWithGetter;
    container = this;
    childrenWithGetter = _(this.allChildren()).select(function(component) {
      return component.getter != null;
    });
    return _(childrenWithGetter).each(function(component) {
      var _name;
      return container[_name = component.getter] || (container[_name] = function() {
        return component;
      });
    });
  };

  createMethodsToGetComponentsByRole = function() {
    var childrenWithRole;
    container = this;
    childrenWithRole = _(this.allChildren()).select(function(component) {
      return component.role != null;
    });
    return _(childrenWithRole).each(function(component) {
      var getter;
      getter = _.str.camelize("get_" + component.role);
      return container[getter] || (container[getter] = function() {
        return component;
      });
    });
  };

  doComponents = function() {
    this.trigger("before:components", this, this.components);
    this.prepareComponents();
    this.createComponents();
    this.trigger("before:render:components", this, this.components);
    this.renderComponents();
    this.trigger("after:components", this, this.components);
    if (this.skipGetterMethods !== true) {
      createGetterMethods.call(this);
      createMethodsToGetComponentsByRole.call(this);
    }
    return this.registerComponentEvents();
  };

  validateContainerConfiguration = function() {
    return true;
  };

  indexComponent = function(component) {
    return {
      at: function(index) {
        return {
          "in": function(map) {
            if (component.cid != null) map.cid_index[component.cid] = index;
            if (component.role != null) map.role_index[component.role] = index;
            if (component.name != null) {
              return map.name_index[component.name] = index;
            }
          }
        };
      }
    };
  };

}).call(this);
(function() {
  var guessCollectionClass, handleInitialCollections, loadInitialCollections;

  Luca.CollectionManager = (function() {

    CollectionManager.prototype.name = "primary";

    CollectionManager.prototype.__collections = {};

    CollectionManager.prototype.relayEvents = true;

    function CollectionManager(options) {
      var existing, manager, _base, _base2;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      manager = this;
      if (existing = typeof (_base = Luca.CollectionManager).get === "function" ? _base.get(this.name) : void 0) {
        throw 'Attempt to create a collection manager with a name which already exists';
      }
      this.collectionNamespace || (this.collectionNamespace = Luca.util.read(Luca.Collection.namespace));
      (_base2 = Luca.CollectionManager).instances || (_base2.instances = {});
      _.extend(this, Backbone.Events);
      _.extend(this, Luca.Events);
      Luca.CollectionManager.instances[this.name] = manager;
      Luca.CollectionManager.get = function(name) {
        if (name == null) return manager;
        return Luca.CollectionManager.instances[name];
      };
      this.state = new Luca.Model();
      if (this.initialCollections) handleInitialCollections.call(this);
    }

    CollectionManager.prototype.add = function(key, collection) {
      var _base;
      return (_base = this.currentScope())[key] || (_base[key] = collection);
    };

    CollectionManager.prototype.allCollections = function() {
      return _(this.currentScope()).values();
    };

    CollectionManager.prototype.create = function(key, collectionOptions, initialModels) {
      var CollectionClass, collection, collectionManager;
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      CollectionClass = collectionOptions.base;
      CollectionClass || (CollectionClass = guessCollectionClass.call(this, key));
      if (collectionOptions.private) collectionOptions.name = "";
      try {
        collection = new CollectionClass(initialModels, collectionOptions);
      } catch (e) {
        console.log("Error creating collection", CollectionClass, collectionOptions, key);
        throw e;
      }
      this.add(key, collection);
      collectionManager = this;
      if (this.relayEvents === true) {
        this.bind("*", function() {
          return console.log("Relay Events on Collection Manager *", collection, arguments);
        });
      }
      return collection;
    };

    CollectionManager.prototype.currentScope = function() {
      var current_scope, _base;
      if (current_scope = this.getScope()) {
        return (_base = this.__collections)[current_scope] || (_base[current_scope] = {});
      } else {
        return this.__collections;
      }
    };

    CollectionManager.prototype.each = function(fn) {
      return _(this.all()).each(fn);
    };

    CollectionManager.prototype.get = function(key) {
      return this.currentScope()[key];
    };

    CollectionManager.prototype.getScope = function() {
      return;
    };

    CollectionManager.prototype.destroy = function(key) {
      var c;
      c = this.get(key);
      delete this.currentScope()[key];
      return c;
    };

    CollectionManager.prototype.getOrCreate = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.get(key) || this.create(key, collectionOptions, initialModels, false);
    };

    CollectionManager.prototype.collectionCountDidChange = function() {
      if (this.allCollectionsLoaded()) {
        this.trigger("all_collections_loaded");
        return this.trigger("initial:load");
      }
    };

    CollectionManager.prototype.allCollectionsLoaded = function() {
      return this.totalCollectionsCount() === this.loadedCollectionsCount();
    };

    CollectionManager.prototype.totalCollectionsCount = function() {
      return this.state.get("collections_count");
    };

    CollectionManager.prototype.loadedCollectionsCount = function() {
      return this.state.get("loaded_collections_count");
    };

    CollectionManager.prototype.private = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.create(key, collectionOptions, initialModels, true);
    };

    return CollectionManager;

  })();

  Luca.CollectionManager.isRunning = function() {
    return _.isEmpty(Luca.CollectionManager.instances) !== true;
  };

  Luca.CollectionManager.destroyAll = function() {
    return Luca.CollectionManager.instances = {};
  };

  Luca.CollectionManager.loadCollectionsByName = function(set, callback) {
    var collection, name, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = set.length; _i < _len; _i++) {
      name = set[_i];
      collection = this.getOrCreate(name);
      collection.once("reset", function() {
        return callback(collection);
      });
      _results.push(collection.fetch());
    }
    return _results;
  };

  guessCollectionClass = function(key) {
    var classified, guess, guesses, _ref;
    classified = Luca.util.classify(key);
    if (_.isString(this.collectionNamespace)) {
      this.collectionNamespace = Luca.util.resolve(this.collectionNamespace);
    }
    guess = (this.collectionNamespace || (window || global))[classified];
    guess || (guess = (this.collectionNamespace || (window || global))["" + classified + "Collection"]);
    if (!(guess != null) && ((_ref = Luca.Collection.namespaces) != null ? _ref.length : void 0) > 0) {
      guesses = _(Luca.Collection.namespaces.reverse()).map(function(namespace) {
        return Luca.util.resolve("" + namespace + "." + classified) || Luca.util.resolve("" + namespace + "." + classified + "Collection");
      });
      guesses = _(guesses).compact();
      if (guesses.length > 0) guess = guesses[0];
    }
    return guess;
  };

  loadInitialCollections = function() {
    var collectionDidLoad, set,
      _this = this;
    collectionDidLoad = function(collection) {
      var current;
      current = _this.state.get("loaded_collections_count");
      _this.state.set("loaded_collections_count", current + 1);
      _this.trigger("collection_loaded", collection.name);
      return collection.unbind("reset");
    };
    set = this.initialCollections;
    return Luca.CollectionManager.loadCollectionsByName.call(this, set, collectionDidLoad);
  };

  handleInitialCollections = function() {
    var _this = this;
    this.state.set({
      loaded_collections_count: 0,
      collections_count: this.initialCollections.length
    });
    this.state.bind("change:loaded_collections_count", function() {
      return _this.collectionCountDidChange();
    });
    if (this.useProgressLoader) {
      this.loaderView || (this.loaderView = new Luca.components.CollectionLoaderView({
        manager: this,
        name: "collection_loader_view"
      }));
    }
    loadInitialCollections.call(this);
    this.initialCollectionsLoadedu;
    return this;
  };

}).call(this);
(function() {

  Luca.SocketManager = (function() {

    function SocketManager(options) {
      this.options = options != null ? options : {};
      _.extend(Backbone.Events);
      this.loadProviderSource();
    }

    SocketManager.prototype.connect = function() {
      switch (this.options.provider) {
        case "socket.io":
          return this.socket = io.connect(this.options.host);
        case "faye.js":
          return this.socket = new Faye.Client(this.options.host + (this.options.namespace || ""));
      }
    };

    SocketManager.prototype.providerSourceLoaded = function() {
      return this.connect();
    };

    SocketManager.prototype.providerSourceUrl = function() {
      switch (this.options.provider) {
        case "socket.io":
          return "" + this.options.host + "/socket.io/socket.io.js";
        case "faye.js":
          return "" + this.options.host + "/faye.js";
      }
    };

    SocketManager.prototype.loadProviderSource = function() {
      var script,
        _this = this;
      script = document.createElement('script');
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", this.providerSourceUrl());
      script.onload = _.bind(this.providerSourceLoaded, this);
      if (Luca.util.isIE()) {
        script.onreadystatechange = function() {
          if (script.readyState === "loaded") return _this.providerSourceLoaded();
        };
      }
      return document.getElementsByTagName('head')[0].appendChild(script);
    };

    return SocketManager;

  })();

}).call(this);
(function() {

  _.def('Luca.containers.SplitView')["extends"]('Luca.core.Container')["with"]({
    componentType: 'split_view',
    containerTemplate: 'containers/basic',
    className: 'luca-ui-split-view',
    componentClass: 'luca-ui-panel'
  });

}).call(this);
(function() {

  _.def('Luca.containers.ColumnView')["extends"]('Luca.core.Container')["with"]({
    componentType: 'column_view',
    className: 'luca-ui-column-view',
    components: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      console.log("Column Views are deprecated in favor of just using grid css on a normal container");
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setColumnWidths();
    },
    componentClass: 'luca-ui-column',
    containerTemplate: "containers/basic",
    generateComponentElements: true,
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

}).call(this);
(function() {
  var component;

  component = Luca.define("Luca.containers.CardView");

  component["extends"]("Luca.core.Container");

  component.defaults({
    className: 'luca-ui-card-view-wrapper',
    activeCard: 0,
    components: [],
    hooks: ['before:card:switch', 'after:card:switch'],
    componentClass: 'luca-ui-card',
    generateComponentElements: true,
    initialize: function(options) {
      this.options = options;
      this.components || (this.components = this.pages || (this.pages = this.cards));
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      this.setupHooks(this.hooks);
      return this.defer(this.simulateActivationEvent, this).until("after:render");
    },
    simulateActivationEvent: function() {
      var c;
      c = this.activeComponent();
      if ((c != null) && this.$el.is(":visible")) {
        return c != null ? c.trigger("activation", this, c, c) : void 0;
      }
    },
    prepareComponents: function() {
      var _ref;
      if ((_ref = Luca.core.Container.prototype.prepareComponents) != null) {
        _ref.apply(this, arguments);
      }
      this.componentElements().hide();
      return this.activeComponentElement().show();
    },
    activeComponentElement: function() {
      return this.componentElements().eq(this.activeCard);
    },
    activeComponent: function() {
      return this.getComponent(this.activeCard);
    },
    customizeContainerEl: function(containerEl, panel, panelIndex) {
      containerEl.style += panelIndex === this.activeCard ? "display:block;" : "display:none;";
      return containerEl;
    },
    atFirst: function() {
      return this.activeCard === 0;
    },
    atLast: function() {
      return this.activeCard === this.components.length - 1;
    },
    next: function() {
      if (this.atLast()) return;
      return this.activate(this.activeCard + 1);
    },
    previous: function() {
      if (this.atFirst()) return;
      return this.activate(this.activeCard - 1);
    },
    cycle: function() {
      var nextIndex;
      nextIndex = this.atLast() ? 0 : this.activeCard + 1;
      return this.activate(nextIndex);
    },
    find: function(name) {
      return Luca(name);
    },
    firstActivation: function() {
      var _ref;
      return (_ref = this.activeComponent()) != null ? _ref.trigger("first:activation", this, this.activeComponent()) : void 0;
    },
    activate: function(index, silent, callback) {
      var activationContext, current, previous,
        _this = this;
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
      if (silent !== true) {
        this.trigger("before:card:switch", previous, current);
        if (previous != null) {
          previous.trigger("before:deactivation", this, previous, current);
        }
        if (current != null) {
          current.trigger("before:activation", this, previous, current);
        }
        _.defer(function() {
          return _this.$el.data(_this.activeAttribute || "active-card", current.name);
        });
      }
      this.componentElements().hide();
      if (current.previously_activated !== true) {
        current.trigger("first:activation");
        current.previously_activated = true;
      }
      this.activeCard = index;
      this.activeComponentElement().show();
      if (silent !== true) {
        this.trigger("after:card:switch", previous, current);
        if (previous != null) {
          previous.trigger("deactivation", this, previous, current);
        }
        if (current != null) {
          current.trigger("activation", this, previous, current);
        }
      }
      activationContext = this;
      if (Luca.containers.CardView.activationContext === "current") {
        activationContext = current;
      }
      if (_.isFunction(callback)) {
        return callback.apply(activationContext, [this, previous, current]);
      }
    }
  });

  Luca.containers.CardView.activationContext = "current";

}).call(this);
(function() {

  _.def("Luca.ModalView")["extends"]("Luca.core.Container")["with"]({
    closeOnEscape: true,
    showOnInitialize: false,
    backdrop: false,
    className: "luca-ui-container modal",
    container: function() {
      return $('body');
    },
    toggle: function() {
      return this.$el.modal('toggle');
    },
    show: function() {
      return this.$el.modal('show');
    },
    hide: function() {
      return this.$el.modal('hide');
    },
    render: function() {
      this.$el.addClass('modal');
      if (this.fade === true) this.$el.addClass('fade');
      $('body').append(this.$el);
      this.$el.modal({
        backdrop: this.backdrop === true,
        keyboard: this.closeOnEscape === true,
        show: this.showOnInitialize === true
      });
      return this;
    }
  });

  _.def("Luca.containers.ModalView")["extends"]("Luca.ModalView")["with"]();

}).call(this);
(function() {

  _.def("Luca.PageView")["extends"]("Luca.containers.CardView")["with"]({
    version: 2
  });

}).call(this);
(function() {
  var buildButton, make, panelToolbar, prepareButtons;

  panelToolbar = Luca.register("Luca.components.PanelToolbar");

  panelToolbar["extends"]("Luca.View");

  panelToolbar.defines({
    buttons: [],
    className: "luca-ui-toolbar btn-toolbar",
    well: true,
    orientation: 'top',
    autoBindEventHandlers: true,
    events: {
      "click a.btn, click .dropdown-menu li": "clickHandler"
    },
    initialize: function(options) {
      var _ref;
      this.options = options != null ? options : {};
      this._super("initialize", this, arguments);
      if (this.group === true && ((_ref = this.buttons) != null ? _ref.length : void 0) >= 0) {
        return this.buttons = [
          {
            group: true,
            buttons: this.buttons
          }
        ];
      }
    },
    clickHandler: function(e) {
      var eventId, hook, me, my, source;
      me = my = $(e.target);
      if (me.is('i')) me = my = $(e.target).parent();
      if (this.selectable === true) {
        my.siblings().removeClass("is-selected");
        me.addClass('is-selected');
      }
      if (!(eventId = my.data('eventid'))) return;
      hook = Luca.util.hook(eventId);
      source = this.parent || this;
      if (_.isFunction(source[hook])) {
        return source[hook].call(this, me, e);
      } else {
        return source.trigger(eventId, me, e);
      }
    },
    beforeRender: function() {
      this._super("beforeRender", this, arguments);
      if (this.well === true) this.$el.addClass('well');
      if (this.selectable === true) this.$el.addClass('btn-selectable');
      this.$el.addClass("toolbar-" + this.orientation);
      if (this.align === "right") this.$el.addClass("pull-right");
      if (this.align === "left") return this.$el.addClass("pull-left");
    },
    render: function() {
      var element, _i, _len, _ref;
      this.$el.empty();
      _ref = prepareButtons(this.buttons);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        this.$el.append(element);
      }
      return this;
    }
  });

  make = Backbone.View.prototype.make;

  buildButton = function(config, wrap) {
    var autoWrapClass, buttonAttributes, buttonEl, buttons, dropdownEl, dropdownItems, label, object, white, wrapper,
      _this = this;
    if (wrap == null) wrap = true;
    if ((config.ctype != null) || (config.type != null)) {
      config.className || (config.className = "");
      config.className += 'toolbar-component';
      object = Luca(config).render();
      if (Luca.isBackboneView(object)) return object.$el;
    }
    if (config.spacer) {
      return make("div", {
        "class": "spacer " + config.spacer
      });
    }
    if (config.text) {
      return make("div", {
        "class": "toolbar-text"
      }, config.text);
    }
    wrapper = 'btn-group';
    if (config.wrapper != null) wrapper += "" + config.wrapper;
    if (config.align != null) {
      wrapper += "pull-" + config.align + " align-" + config.align;
    }
    if (config.selectable === true) wrapper += 'btn-selectable';
    if ((config.group != null) && (config.buttons != null)) {
      buttons = prepareButtons(config.buttons, false);
      return make("div", {
        "class": wrapper
      }, buttons);
    } else {
      label = config.label || (config.label = "");
      config.eventId || (config.eventId = _.string.dasherize(config.label.toLowerCase()));
      if (config.icon) {
        if (_.string.isBlank(label)) label = " ";
        if (config.white) white = "icon-white";
        label = "<i class='" + (white || "") + " icon-" + config.icon + "' /> " + label;
      }
      buttonAttributes = {
        "class": _.compact(["btn", config.classes, config.className]).join(" "),
        "data-eventId": config.eventId,
        title: config.title || config.description
      };
      if (config.color != null) {
        buttonAttributes["class"] += " btn-" + config.color;
      }
      if (config.selected != null) buttonAttributes["class"] += " is-selected";
      if (config.dropdown) {
        label = "" + label + " <span class='caret'></span>";
        buttonAttributes["class"] += " dropdown-toggle";
        buttonAttributes["data-toggle"] = "dropdown";
        dropdownItems = _(config.dropdown).map(function(dropdownItem) {
          var link;
          link = make("a", {}, dropdownItem[1]);
          return make("li", {
            "data-eventId": dropdownItem[0]
          }, link);
        });
        dropdownEl = make("ul", {
          "class": "dropdown-menu"
        }, dropdownItems);
      }
      buttonEl = make("a", buttonAttributes, label);
      autoWrapClass = "btn-group";
      if (config.align != null) autoWrapClass += " align-" + config.align;
      if (wrap === true) {
        return make("div", {
          "class": autoWrapClass
        }, [buttonEl, dropdownEl]);
      } else {
        return buttonEl;
      }
    }
  };

  prepareButtons = function(buttons, wrap) {
    var button, _i, _len, _results;
    if (buttons == null) buttons = [];
    if (wrap == null) wrap = true;
    _results = [];
    for (_i = 0, _len = buttons.length; _i < _len; _i++) {
      button = buttons[_i];
      _results.push(buildButton(button, wrap));
    }
    return _results;
  };

}).call(this);
(function() {

  _.def('Luca.containers.PanelView')["extends"]('Luca.core.Container')["with"]({
    className: 'luca-ui-panel',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Container.prototype.initialize.apply(this, arguments);
    },
    afterLayout: function() {
      var contents;
      if (this.template) {
        contents = (Luca.templates || JST)[this.template](this);
        return this.$el.html(contents);
      }
    },
    render: function() {
      return $(this.container).append(this.$el);
    },
    afterRender: function() {
      var _ref,
        _this = this;
      if ((_ref = Luca.core.Container.prototype.afterRender) != null) {
        _ref.apply(this, arguments);
      }
      if (this.css) {
        return _(this.css).each(function(value, property) {
          return _this.$el.css(property, value);
        });
      }
    }
  });

}).call(this);
(function() {
  var tabView;

  _.def('Luca.containers.TabView')["extends"]('Luca.containers.CardView')["with"];

  tabView = Luca.register("Luca.containers.TabView");

  tabView.triggers("before:select", "after:select");

  tabView.publicConfiguration({
    tab_position: 'top',
    tabVerticalOffset: '50px'
  });

  tabView.privateConfiguration({
    additionalClassNames: 'tabbable',
    navClass: "nav-tabs",
    bodyTemplate: "containers/tab_view",
    bodyEl: "div.tab-content"
  });

  tabView.defines({
    initialize: function(options) {
      this.options = options != null ? options : {};
      if (this.navStyle === "list") this.navClass = "nav-list";
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "select", "highlightSelectedTab");
      this.setupHooks(this.hooks);
      return this.bind("after:card:switch", this.highlightSelectedTab);
    },
    activeTabSelector: function() {
      return this.tabSelectors().eq(this.activeCard || this.activeTab || this.activeItem);
    },
    beforeLayout: function() {
      var _ref;
      this.$el.addClass("tabs-" + this.tab_position);
      this.activeTabSelector().addClass('active');
      this.createTabSelectors();
      return (_ref = Luca.containers.CardView.prototype.beforeLayout) != null ? _ref.apply(this, arguments) : void 0;
    },
    afterRender: function() {
      var tabContainerId, _ref;
      if ((_ref = Luca.containers.CardView.prototype.afterRender) != null) {
        _ref.apply(this, arguments);
      }
      tabContainerId = this.tabContainer().attr("id");
      this.registerEvent("click #" + tabContainerId + " li a", "select");
      if (Luca.config.enableBoostrap && (this.tab_position === "left" || this.tab_position === "right")) {
        this.tabContainerWrapper().addClass("span2");
        return this.tabContentWrapper().addClass("span9");
      }
    },
    createTabSelectors: function() {
      tabView = this;
      return this.each(function(component, index) {
        var icon, link, selector, _ref;
        if (component.tabIcon) {
          icon = "<i class='icon-" + component.tabIcon + "'></i>";
        }
        link = "<a href='#'>" + (icon || '') + " " + component.title + "</a>";
        selector = tabView.make("li", {
          "class": "tab-selector",
          "data-target": index
        }, link);
        tabView.tabContainer().append(selector);
        if ((component.navHeading != null) && !((_ref = tabView.navHeadings) != null ? _ref[component.navHeading] : void 0)) {
          $(selector).before(tabView.make('li', {
            "class": "nav-header"
          }, component.navHeading));
          tabView.navHeadings || (tabView.navHeadings = {});
          return tabView.navHeadings[component.navHeading] = true;
        }
      });
    },
    highlightSelectedTab: function() {
      this.tabSelectors().removeClass('active');
      return this.activeTabSelector().addClass('active');
    },
    select: function(e) {
      var me, my;
      e.preventDefault();
      me = my = $(e.target);
      this.trigger("before:select", this);
      this.activate(my.parent().data('target'));
      return this.trigger("after:select", this);
    },
    componentElements: function() {
      return this.$(">.tab-content >." + this.componentClass);
    },
    tabContentWrapper: function() {
      return $("#" + this.cid + "-tab-view-content");
    },
    tabContainerWrapper: function() {
      return $("#" + this.cid + "-tabs-selector");
    },
    tabContainer: function() {
      return this.$("ul." + this.navClass, this.tabContainerWrapper());
    },
    tabSelectors: function() {
      return this.$('li.tab-selector', this.tabContainer());
    }
  });

}).call(this);
(function() {

  _.def('Luca.containers.Viewport').extend('Luca.containers.CardView')["with"]({
    activeItem: 0,
    additionalClassNames: 'luca-ui-viewport',
    fullscreen: true,
    fluid: false,
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      if (Luca.config.enableBoostrap === true) {
        this.wrapperClass = this.fluid === true ? Luca.containers.Viewport.fluidWrapperClass : Luca.containers.Viewport.defaultWrapperClass;
      }
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      if (this.fullscreen === true) return this.enableFullscreen();
    },
    enableFluid: function() {
      return this.enableWrapper();
    },
    disableFluid: function() {
      return this.disableWrapper();
    },
    enableWrapper: function() {
      if (this.wrapperClass != null) {
        return this.$el.parent().addClass(this.wrapperClass);
      }
    },
    disableWrapper: function() {
      if (this.wrapperClass != null) {
        return this.$el.parent().removeClass(this.wrapperClass);
      }
    },
    enableFullscreen: function() {
      $('html,body').addClass('luca-ui-fullscreen');
      return this.$el.addClass('fullscreen-enabled');
    },
    disableFullscreen: function() {
      $('html,body').removeClass('luca-ui-fullscreen');
      return this.$el.removeClass('fullscreen-enabled');
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      if (this.topNav != null) this.renderTopNavigation();
      if (this.bottomNav != null) return this.renderBottomNavigation();
    },
    height: function() {
      return this.$el.height();
    },
    width: function() {
      return this.$el.width();
    },
    afterRender: function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.after) != null) {
        _ref.apply(this, arguments);
      }
      if (Luca.config.enableBoostrap === true && this.containerClassName) {
        return this.$el.children().wrap('<div class="#{ containerClassName }" />');
      }
    },
    renderTopNavigation: function() {
      var _base;
      if (this.topNav == null) return;
      if (_.isString(this.topNav)) {
        this.topNav = Luca.util.lazyComponent(this.topNav);
      }
      if (_.isObject(this.topNav)) {
        (_base = this.topNav).ctype || (_base.ctype = this.topNav.type || "nav_bar");
        if (!Luca.isBackboneView(this.topNav)) {
          this.topNav = Luca.util.lazyComponent(this.topNav);
        }
      }
      this.topNav.app = this;
      return $('body').prepend(this.topNav.render().el);
    },
    renderBottomNavigation: function() {}
  });

  Luca.containers.Viewport.defaultWrapperClass = 'row';

  Luca.containers.Viewport.fluidWrapperClass = 'row-fluid';

}).call(this);
(function() {

  _.def('Luca.components.Template')["extends"]('Luca.View')["with"]({
    initialize: function(options) {
      this.options = options != null ? options : {};
      console.log("The Use of Luca.components.Template directly is being DEPRECATED");
      return Luca.View.prototype.initialize.apply(this, arguments);
    }
  });

}).call(this);
(function() {
  var application,
    __slice = Array.prototype.slice;

  application = Luca.register("Luca.Application");

  application["extends"]("Luca.containers.Viewport");

  application.triggers("controller:change", "action:change");

  application.publicInterface({
    name: "MyApp",
    defaultState: {},
    autoBoot: false,
    autoStartHistory: "before:render",
    useCollectionManager: true,
    collectionManager: {},
    collectionManagerClass: "Luca.CollectionManager",
    plugin: false,
    useController: true,
    useKeyHandler: false,
    keyEvents: {},
    components: [
      {
        type: 'template',
        name: 'welcome',
        template: 'sample/welcome',
        templateContainer: "Luca.templates"
      }
    ],
    useSocketManager: false,
    socketManagerOptions: {},
    initialize: function(options) {
      var alreadyRunning, app, appName,
        _this = this;
      this.options = options != null ? options : {};
      app = this;
      appName = this.name;
      alreadyRunning = typeof Luca.getApplication === "function" ? Luca.getApplication() : void 0;
      Luca.Application.registerInstance(this);
      this.state = new Luca.Model(this.defaultState);
      this.setupCollectionManager();
      this.setupSocketManager();
      Luca.containers.Viewport.prototype.initialize.apply(this, arguments);
      if (this.useController === true) this.setupMainController();
      this.defer(function() {
        return app.render();
      }).until(this, "ready");
      this.setupRouter();
      if (this.useKeyRouter === true) {
        console.log("The useKeyRouter property is being deprecated. switch to useKeyHandler instead");
      }
      if ((this.useKeyHandler === true || this.useKeyRouter === true) && (this.keyEvents != null)) {
        this.setupKeyHandler();
      }
      if (!(this.plugin === true || alreadyRunning)) {
        Luca.getApplication = function(name) {
          if (name == null) return app;
          return Luca.Application.instances[name];
        };
      }
      if (this.autoBoot) {
        if (Luca.util.resolve(this.name)) {
          throw "Attempting to override window." + this.name + " when it already exists";
        }
        $(function() {
          window[appName] = app;
          return app.boot();
        });
      }
      return Luca.trigger("application:available", this);
    },
    activeView: function() {
      var active;
      if (active = this.activeSubSection()) {
        return this.view(active);
      } else {
        return this.view(this.activeSection());
      }
    },
    activeSection: function() {
      return this.get("active_section");
    },
    activeSubSection: function() {
      return this.get("active_sub_section");
    },
    activePages: function() {
      var _this = this;
      return this.$('.luca-ui-controller').map(function(index, element) {
        return $(element).data('active-section');
      });
    },
    boot: function() {
      return this.trigger("ready");
    },
    collection: function() {
      return this.collectionManager.getOrCreate.apply(this.collectionManager, arguments);
    },
    get: function(attribute) {
      return this.state.get(attribute);
    },
    set: function(attribute, value, options) {
      return this.state.set.apply(this.state, arguments);
    },
    view: function(name) {
      return Luca.cache(name);
    },
    navigate_to: function(component_name, callback) {
      return this.getMainController().navigate_to(component_name, callback);
    }
  });

  application.privateInterface({
    keyHandler: function(e) {
      var control, isInputEvent, keyEvent, keyname, meta, source, _ref;
      if (!(e && this.keyEvents)) return;
      isInputEvent = $(e.target).is('input') || $(e.target).is('textarea');
      if (isInputEvent) return;
      keyname = Luca.keyMap[e.keyCode];
      if (!keyname) return;
      meta = (e != null ? e.metaKey : void 0) === true;
      control = (e != null ? e.ctrlKey : void 0) === true;
      source = this.keyEvents;
      source = meta ? this.keyEvents.meta : source;
      source = control ? this.keyEvents.control : source;
      source = meta && control ? this.keyEvents.meta_control : source;
      if (keyEvent = source != null ? source[keyname] : void 0) {
        if ((this[keyEvent] != null) && _.isFunction(this[keyEvent])) {
          return (_ref = this[keyEvent]) != null ? _ref.call(this) : void 0;
        } else {
          return this.trigger(keyEvent, e, keyname);
        }
      }
    },
    setupControllerBindings: function() {
      var app, _ref, _ref2,
        _this = this;
      app = this;
      if ((_ref = this.getMainController()) != null) {
        _ref.bind("after:card:switch", function(previous, current) {
          _this.state.set({
            active_section: current.name
          });
          return app.trigger("controller:change", previous.name, current.name);
        });
      }
      return (_ref2 = this.getMainController()) != null ? _ref2.each(function(component) {
        var type;
        type = component.type || component.ctype;
        if (type.match(/controller$/)) {
          return component.bind("after:card:switch", function(previous, current) {
            _this.state.set({
              active_sub_section: current.name
            });
            return app.trigger("action:change", previous.name, current.name);
          });
        }
      }) : void 0;
    },
    setupMainController: function() {
      var definedComponents,
        _this = this;
      if (this.useController === true) {
        definedComponents = this.components || [];
        this.components = [
          {
            type: 'controller',
            name: "main_controller",
            role: "main_controller",
            components: definedComponents
          }
        ];
        this.getMainController = function() {
          return _this.findComponentByRole('main_controller');
        };
        return this.defer(this.setupControllerBindings, false).until("after:components");
      }
    },
    setupCollectionManager: function() {
      var collectionManagerOptions, _base, _ref, _ref2, _ref3;
      if (this.useCollectionManager !== true) return;
      if ((this.collectionManager != null) && (((_ref = this.collectionManager) != null ? _ref.get : void 0) != null)) {
        return;
      }
      if (_.isString(this.collectionManagerClass)) {
        this.collectionManagerClass = Luca.util.resolve(this.collectionManagerClass);
      }
      collectionManagerOptions = this.collectionManagerOptions || {};
      if (_.isObject(this.collectionManager) && !_.isFunction((_ref2 = this.collectionManager) != null ? _ref2.get : void 0)) {
        collectionManagerOptions = this.collectionManager;
        this.collectionManager = void 0;
      }
      if (_.isString(this.collectionManager)) {
        collectionManagerOptions = {
          name: this.collectionManager
        };
      }
      this.collectionManager = typeof (_base = Luca.CollectionManager).get === "function" ? _base.get(collectionManagerOptions.name) : void 0;
      if (!_.isFunction((_ref3 = this.collectionManager) != null ? _ref3.get : void 0)) {
        return this.collectionManager = new this.collectionManagerClass(collectionManagerOptions);
      }
    },
    setupSocketManager: function() {
      return this.socket = new Luca.SocketManager(this.socketManagerOptions);
    },
    setupRouter: function() {
      var action, endpoint, fn, page, routePattern, routerClass, routerConfig, _ref, _ref2;
      if (!(this.router != null) && !(this.routes != null)) return;
      routerClass = Luca.Router;
      if (_.isString(this.router)) routerClass = Luca.util.resolve(this.router);
      routerConfig = routerClass.prototype;
      routerConfig.routes || (routerConfig.routes = {});
      routerConfig.app = this;
      if (_.isObject(this.routes)) {
        _ref = this.routes;
        for (routePattern in _ref) {
          endpoint = _ref[routePattern];
          _ref2 = endpoint.split(' '), page = _ref2[0], action = _ref2[1];
          fn = _.uniqueId(page);
          routerConfig[fn] = Luca.Application.routeTo(page).action(action);
          routerConfig.routes[routePattern] = fn;
        }
      }
      this.router = new routerClass(routerConfig);
      if (this.router && this.autoStartHistory) {
        if (this.autoStartHistory === true) {
          this.autoStartHistory = "before:render";
        }
        return this.defer(Luca.Application.startHistory, false).until(this, this.autoStartHistory);
      }
    },
    setupKeyHandler: function() {
      var handler, keyEvent, _base, _i, _len, _ref, _results;
      if (!this.keyEvents) return;
      (_base = this.keyEvents).control_meta || (_base.control_meta = {});
      if (this.keyEvents.meta_control) {
        _.extend(this.keyEvents.control_meta, this.keyEvents.meta_control);
      }
      handler = _.bind(this.keyHandler, this);
      _ref = this.keypressEvents || ["keydown"];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        keyEvent = _ref[_i];
        _results.push($(document).on(keyEvent, handler));
      }
      return _results;
    }
  });

  application.classInterface({
    instances: {},
    pageHierarchy: function() {
      var app, getTree, mainController;
      app = Luca();
      mainController = app.getMainController();
      getTree = function(node) {
        if (!((node.components != null) || (node.pages != null))) return {};
        return _(node.components || node.pages).reduce(function(memo, page) {
          memo[page.name] = page.name;
          if (page.navigate_to != null) memo[page.name] = getTree(page);
          return memo;
        }, {});
      };
      return getTree(mainController);
    },
    registerInstance: function(app) {
      return Luca.Application.instances[app.name] = app;
    },
    routeTo: function() {
      var callback, first, last, pages, routeHelper, specifiedAction;
      pages = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      last = _(pages).last();
      first = _(pages).first();
      callback = void 0;
      specifiedAction = void 0;
      routeHelper = function() {
        var action, args, index, nextItem, page, path, target, _i, _len, _results;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        path = this.app || Luca();
        index = 0;
        if (pages.length === 1 && (target = Luca(first))) {
          pages = target.controllerPath();
        }
        _results = [];
        for (_i = 0, _len = pages.length; _i < _len; _i++) {
          page = pages[_i];
          if (!(_.isString(page))) continue;
          nextItem = pages[++index];
          target = Luca(page);
          if (page === last) {
            callback = (specifiedAction != null) && (target[specifiedAction] != null) ? _.bind(target[specifiedAction], target) : target.routeHandler != null ? target.routeHandler : void 0;
          }
          callback || (callback = _.isFunction(nextItem) ? _.bind(nextItem, target) : _.isObject(nextItem) ? (action = nextItem.action && (target[action] != null)) ? _.bind(target[action], target) : void 0 : void 0);
          _results.push(path = path.navigate_to(page, function() {
            return callback != null ? callback.apply(target, args) : void 0;
          }));
        }
        return _results;
      };
      routeHelper.action = function(action) {
        specifiedAction = action;
        return routeHelper;
      };
      return routeHelper;
    },
    startHistory: function() {
      return Backbone.history.start();
    }
  });

  application.afterDefinition(function() {
    return Luca.routeHelper = Luca.Application.routeTo;
  });

  application.register();

}).call(this);
(function() {
  var toolbar;

  _.def('Luca.components.Toolbar')["extends"]('Luca.core.Container')["with"];

  toolbar = Luca.register("Luca.components.Toolbar");

  toolbar["extends"]("Luca.core.Container");

  toolbar.defines({
    className: 'luca-ui-toolbar toolbar',
    position: 'bottom',
    prepareComponents: function() {
      var _this = this;
      return _(this.components).each(function(component) {
        return component.container = _this.$el;
      });
    },
    render: function() {
      $(this.container).append(this.el);
      return this;
    }
  });

}).call(this);
(function() {
  var loaderView;

  loaderView = Luca.register("Luca.components.CollectionLoaderView");

  loaderView["extends"]("Luca.View");

  loaderView.defines({
    className: 'luca-ui-collection-loader-view',
    template: "components/collection_loader_view",
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.components.Template.prototype.initialize.apply(this, arguments);
      this.container || (this.container = $('body'));
      this.manager || (this.manager = Luca.CollectionManager.get());
      return this.setupBindings();
    },
    modalContainer: function() {
      return $("#progress-modal", this.el);
    },
    setupBindings: function() {
      var _this = this;
      this.manager.bind("collection_loaded", function(name) {
        var collectionName, loaded, progress, total;
        loaded = _this.manager.loadedCollectionsCount();
        total = _this.manager.totalCollectionsCount();
        progress = parseInt((loaded / total) * 100);
        collectionName = _.string.titleize(_.string.humanize(name));
        _this.modalContainer().find('.progress .bar').attr("style", "width: " + progress + "%;");
        return _this.modalContainer().find('.message').html("Loaded " + collectionName + "...");
      });
      return this.manager.bind("all_collections_loaded", function() {
        _this.modalContainer().find('.message').html("All done!");
        return _.delay(function() {
          return _this.modalContainer().modal('hide');
        }, 400);
      });
    }
  });

}).call(this);
(function() {
  var collectionView, make;

  collectionView = Luca.register("Luca.components.CollectionView");

  collectionView["extends"]("Luca.components.Panel");

  collectionView.mixesIn("QueryCollectionBindings", "LoadMaskable", "Filterable", "Paginatable");

  collectionView.triggers("before:refresh", "after:refresh", "refresh", "empty:results");

  collectionView.publicConfiguration({
    tagName: "ol",
    bodyClassName: "collection-ui-panel",
    itemTagName: 'li',
    itemClassName: 'collection-item',
    itemTemplate: void 0,
    itemRenderer: void 0,
    itemProperty: void 0
  });

  collectionView.defines({
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.bindAll(this, "refresh");
      if (!((this.collection != null) || this.options.collection)) {
        console.log("Error on initialize of collection view", this);
        throw "Collection Views must specify a collection";
      }
      if (!((this.itemTemplate != null) || (this.itemRenderer != null) || (this.itemProperty != null))) {
        throw "Collection Views must specify an item template or item renderer function";
      }
      if (_.isString(this.collection)) {
        if (Luca.CollectionManager.get()) {
          this.collection = Luca.CollectionManager.get().getOrCreate(this.collection);
        } else {
          console.log("String Collection but no collection manager");
        }
      }
      if (!Luca.isBackboneCollection(this.collection)) {
        console.log("Missing Collection on " + (this.name || this.cid), this, this.collection);
        throw "Collection Views must have a valid backbone collection";
      }
      this.collection.on("before:fetch", function() {
        return _this.trigger("enable:loadmask");
      });
      this.collection.bind("reset", function() {
        _this.refresh();
        return _this.trigger("disable:loadmask");
      });
      this.collection.bind("remove", function() {
        return _this.refresh();
      });
      this.collection.bind("add", function() {
        return _this.refresh();
      });
      if (this.observeChanges === true) {
        this.collection.on("change", this.refreshModel, this);
      }
      Luca.components.Panel.prototype.initialize.apply(this, arguments);
      return this.on("refresh", this.refresh, this);
    },
    attributesForItem: function(item, model) {
      return _.extend({}, {
        "class": this.itemClassName,
        "data-index": item.index,
        "data-model-id": item.model.get('id')
      });
    },
    contentForItem: function(item) {
      var content, templateFn;
      if (item == null) item = {};
      if ((this.itemTemplate != null) && (templateFn = Luca.template(this.itemTemplate))) {
        return content = templateFn.call(this, item);
      }
      if ((this.itemRenderer != null) && _.isFunction(this.itemRenderer)) {
        return content = this.itemRenderer.call(this, item, item.model, item.index);
      }
      if (this.itemProperty && (item.model != null)) {
        return content = item.model.read(this.itemProperty);
      }
      return "";
    },
    makeItem: function(model, index) {
      var attributes, content, item;
      item = this.prepareItem != null ? this.prepareItem.call(this, model, index) : {
        model: model,
        index: index
      };
      attributes = this.attributesForItem(item, model);
      content = this.contentForItem(item);
      try {
        return make(this.itemTagName, attributes, content);
      } catch (e) {
        return console.log("Error generating DOM element for CollectionView", this, model, index);
      }
    },
    locateItemElement: function(id) {
      return this.$("." + this.itemClassName + "[data-model-id='" + id + "']");
    },
    refreshModel: function(model) {
      var index;
      index = this.collection.indexOf(model);
      this.locateItemElement(model.get('id')).empty().append(this.contentForItem({
        model: model,
        index: index
      }, model));
      return this.trigger("model:refreshed", index, model);
    },
    refresh: function(query, options, models) {
      var index, model, _i, _len;
      query || (query = this.getQuery());
      options || (options = this.getQueryOptions());
      models || (models = this.getModels(query, options));
      this.$bodyEl().empty();
      this.trigger("before:refresh", models, query, options);
      if (models.length === 0) this.trigger("empty:results");
      index = 0;
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        model = models[_i];
        this.$append(this.makeItem(model, index++));
      }
      this.trigger("after:refresh", models, query, options);
      return this;
    },
    registerEvent: function(domEvent, selector, handler) {
      var eventTrigger;
      if (!(handler != null) && _.isFunction(selector)) {
        handler = selector;
        selector = void 0;
      }
      eventTrigger = _([domEvent, "" + this.itemTagName + "." + this.itemClassName, selector]).compact().join(" ");
      return Luca.View.prototype.registerEvent(eventTrigger, handler);
    },
    render: function() {
      this.refresh();
      if (this.$el.parent().length > 0 && (this.container != null)) this.$attach();
      return this;
    }
  });

  make = Luca.View.prototype.make;

}).call(this);
(function() {
  var controller;

  controller = Luca.register("Luca.components.Controller");

  controller["extends"]("Luca.containers.CardView");

  controller.publicInterface({
    "default": function(callback) {
      return this.navigate_to(this.defaultPage || this.defaultCard, callback);
    },
    activePage: function() {
      return this.activeSection();
    },
    navigate_to: function(section, callback) {
      var _this = this;
      section || (section = this.defaultCard);
      this.activate(section, false, function(activator, previous, current) {
        if (current.activatedByController !== true) {
          current.trigger("on:controller:activation");
          current.activatedByController = true;
        }
        _this.state.set({
          active_section: current.name
        });
        if (_.isFunction(callback)) return callback.call(current);
      });
      return this.find(section);
    }
  });

  controller.classMethods({
    controllerPath: function() {
      var atBase, component, list;
      component = this;
      list = [component.name];
      atBase = false;
      while (component && !atBase) {
        component = typeof component.getParent === "function" ? component.getParent() : void 0;
        if ((component != null ? component.role : void 0) === "main_controller") {
          atBase = true;
        }
        if ((component != null) && !atBase) list.push(component.name);
      }
      return list.reverse();
    }
  });

  controller.afterDefinition(function() {
    return Luca.View.prototype.hooks.push("on:controller:activation");
  });

  controller.defines({
    additionalClassNames: 'luca-ui-controller',
    activeAttribute: "active-section",
    stateful: true,
    initialize: function(options) {
      var _ref;
      this.options = options;
      this.defaultCard || (this.defaultCard = this.defaultPage || (this.defaultPage = ((_ref = this.components[0]) != null ? _ref.name : void 0) || 0));
      this.defaultPage || (this.defaultPage = this.defaultCard);
      this.defaultState || (this.defaultState = {
        active_section: this.defaultPage
      });
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      if (this.defaultCard == null) {
        throw "Controllers must specify a defaultCard property and/or the first component must have a name";
      }
      this._().each(function(component) {
        return component.controllerPath = Luca.components.Controller.controllerPath;
      });
      return this.on("after:render", this["default"], this);
    },
    each: function(fn) {
      var _this = this;
      return _(this.components).each(function(component) {
        return fn.call(_this, component);
      });
    },
    activeSection: function() {
      return this.get("active_section");
    },
    pageControllers: function(deep) {
      if (deep == null) deep = false;
      return this.controllers.apply(this, arguments);
    },
    controllers: function(deep) {
      if (deep == null) deep = false;
      return this.select(function(component) {
        var type;
        type = component.type || component.ctype;
        return type === "controller" || type === "page_controller";
      });
    },
    availablePages: function() {
      return this.availableSections.apply(this, arguments);
    },
    availableSections: function() {
      var base,
        _this = this;
      base = {};
      base[this.name] = this.sectionNames();
      return _(this.controllers()).reduce(function(memo, controller) {
        memo[controller.name] = controller.sectionNames();
        return memo;
      }, base);
    },
    pageNames: function() {
      return this.sectionNames();
    },
    sectionNames: function(deep) {
      if (deep == null) deep = false;
      return this.pluck('name');
    }
  });

}).call(this);
(function() {
  var buttonField;

  buttonField = Luca.register("Luca.fields.ButtonField");

  buttonField["extends"]("Luca.core.Field");

  buttonField.triggers("button:click");

  buttonField.publicConfiguration({
    readOnly: true,
    input_value: void 0,
    input_type: "button",
    icon_class: void 0,
    input_name: void 0,
    white: void 0
  });

  buttonField.privateConfiguration({
    isButton: true,
    template: "fields/button_field",
    events: {
      "click input": "click_handler"
    }
  });

  buttonField.privateInterface({
    click_handler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      return this.trigger("button:click");
    },
    initialize: function(options) {
      var _ref;
      this.options = options != null ? options : {};
      _.extend(this.options);
      _.bindAll(this, "click_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      if ((_ref = this.icon_class) != null ? _ref.length : void 0) {
        return this.template = "fields/button_field_link";
      }
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('button'));
      this.input_name || (this.input_name = this.name || (this.name = this.input_id));
      this.input_value || (this.input_value = this.label || (this.label = this.text));
      this.input_class || (this.input_class = this["class"]);
      this.icon_class || (this.icon_class = "");
      if (this.icon_class.length && !this.icon_class.match(/^icon-/)) {
        this.icon_class = "icon-" + this.icon_class;
      }
      if (this.white) return this.icon_class += " icon-white";
    },
    setValue: function() {
      return true;
    }
  });

}).call(this);
(function() {
  var checkboxArray, make;

  make = Luca.View.prototype.make;

  checkboxArray = Luca.register("Luca.fields.CheckboxArray");

  checkboxArray["extends"]("Luca.core.Field");

  checkboxArray.defines({
    version: 2,
    template: "fields/checkbox_array",
    className: "luca-ui-checkbox-array",
    events: {
      "click input": "clickHandler"
    },
    selectedItems: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.concerns.Deferrable);
      _.bindAll(this, "renderCheckboxes", "clickHandler", "checkSelected");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.valueField || (this.valueField = "id");
      return this.displayField || (this.displayField = "name");
    },
    afterInitialize: function(options) {
      var cbArray;
      this.options = options != null ? options : {};
      try {
        this.configure_collection();
      } catch (e) {
        console.log("Error Configuring Collection", this, e.message);
      }
      cbArray = this;
      if (!Luca.isBackboneCollection(this.collection)) {
        throw "Checkbox Array Fields must specify a @collection property";
      }
      if (this.collection.length > 0) {
        return this.renderCheckboxes();
      } else {
        return this.defer("renderCheckboxes").until(this.collection, "reset");
      }
    },
    clickHandler: function(event) {
      var checkbox;
      checkbox = $(event.target);
      if (checkbox.prop('checked')) {
        return this.selectedItems.push(checkbox.val());
      } else {
        if (_(this.selectedItems).include(checkbox.val())) {
          return this.selectedItems = _(this.selectedItems).without(checkbox.val());
        }
      }
    },
    controls: function() {
      return this.$('.controls');
    },
    renderCheckboxes: function() {
      var _this = this;
      this.controls().empty();
      this.selectedItems = [];
      this.collection.each(function(model) {
        var element, inputElement, input_id, label, value;
        value = model.get(_this.valueField);
        label = model.get(_this.displayField);
        input_id = _.uniqueId("" + _this.cid + "_checkbox");
        inputElement = make("input", {
          type: "checkbox",
          "class": "array-checkbox",
          name: _this.input_name,
          value: value,
          id: input_id
        });
        element = make("label", {
          "for": input_id
        }, inputElement);
        $(element).append(" " + label);
        return _this.controls().append(element);
      });
      this.trigger("checkboxes:rendered", this.checkboxesRendered = true);
      return this;
    },
    uncheckAll: function() {
      return this.allFields().prop('checked', false);
    },
    allFields: function() {
      return this.controls().find("input[type='checkbox']");
    },
    checkSelected: function(items) {
      var checkbox, value, _i, _len, _ref;
      if (items != null) this.selectedItems = items;
      this.uncheckAll();
      _ref = this.selectedItems;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        checkbox = this.controls().find("input[value='" + value + "']");
        checkbox.prop('checked', true);
      }
      return this.selectedItems;
    },
    getValue: function() {
      var field, _i, _len, _ref, _results;
      _ref = this.allFields();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        if (this.$(field).prop('checked')) _results.push(this.$(field).val());
      }
      return _results;
    },
    setValue: function(items) {
      var cbArray;
      this.selectedItems = items;
      if (this.checkboxesRendered === true) {
        return this.checkSelected(items);
      } else {
        cbArray = this;
        return this.defer(function() {
          return cbArray.checkSelected(items);
        }).until("checkboxes:rendered");
      }
    },
    getValues: function() {
      return this.getValue();
    },
    setValues: function(items) {
      return this.setValue(items);
    }
  });

}).call(this);
(function() {
  var checkboxField;

  checkboxField = Luca.register("Luca.fields.CheckboxField");

  checkboxField["extends"]("Luca.core.Field");

  checkboxField.triggers("checked", "unchecked");

  checkboxField.publicConfiguration({
    send_blanks: true,
    input_value: 1
  });

  checkboxField.privateConfiguration({
    template: 'fields/checkbox_field',
    events: {
      "change input": "change_handler"
    }
  });

  checkboxField.privateInterface({
    change_handler: function(e) {
      var me, my;
      me = my = $(e.target);
      if (me.is(":checked")) {
        this.trigger("checked");
      } else {
        this.trigger("unchecked");
      }
      return this.trigger("on:change", this, e, me.is(":checked"));
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.bindAll(this, "change_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      return this.label || (this.label = this.name);
    }
  });

  checkboxField.publicInterface({
    setValue: function(checked) {
      return this.getInputElement().attr('checked', checked);
    },
    getValue: function() {
      return this.getInputElement().is(":checked");
    }
  });

  checkboxField.defines({
    version: 1
  });

}).call(this);
(function() {
  var fileUpload;

  fileUpload = Luca.register("Luca.fields.FileUploadField");

  fileUpload["extends"]("Luca.core.Field");

  fileUpload.defines({
    version: 1,
    template: 'fields/file_upload_field',
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      return this.helperText || (this.helperText = "");
    }
  });

}).call(this);
(function() {
  var hiddenField;

  hiddenField = Luca.register("Luca.fields.HiddenField");

  hiddenField["extends"]("Luca.core.Field");

  hiddenField.defines({
    template: 'fields/hidden_field',
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_value || (this.input_value = this.value);
      return this.label || (this.label = this.name);
    }
  });

}).call(this);
(function() {
  var labelField;

  labelField = Luca.register("Luca.components.LabelField");

  labelField["extends"]("Luca.core.Field");

  labelField.defines({
    formatter: function(value) {
      value || (value = this.getValue());
      return _.str.titleize(value);
    },
    setValue: function(value) {
      this.trigger("change", value, this.getValue());
      this.getInputElement().attr('value', value);
      return this.$('.value').html(this.formatter(value));
    }
  });

}).call(this);
(function() {
  var selectField;

  selectField = Luca.register("Luca.fields.SelectField");

  selectField["extends"]("Luca.core.Field");

  selectField.triggers("after:select");

  selectField.defines({
    events: {
      "change select": "change_handler"
    },
    template: "fields/select_field",
    includeBlank: true,
    blankValue: '',
    blankText: 'Select One',
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.concerns.Deferrable);
      _.bindAll(this, "change_handler", "populateOptions", "beforeFetch");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      if (_.isUndefined(this.retainValue)) return this.retainValue = true;
    },
    afterInitialize: function() {
      var _ref, _ref2, _ref3;
      if ((_ref = this.collection) != null ? _ref.data : void 0) {
        this.valueField || (this.valueField = "id");
        this.displayField || (this.displayField = "name");
        this.parseData();
      }
      try {
        this.configure_collection(this.setAsDeferrable);
      } catch (e) {
        console.log("Error Configuring Collection", this, e.message);
      }
      if ((_ref2 = this.collection) != null) {
        _ref2.bind("before:fetch", this.beforeFetch);
      }
      return (_ref3 = this.collection) != null ? _ref3.bind("reset", this.populateOptions) : void 0;
    },
    parseData: function() {
      var _this = this;
      return this.collection.data = _(this.collection.data).map(function(record) {
        var hash;
        if (!_.isArray(record)) return record;
        hash = {};
        hash[_this.valueField] = record[0];
        hash[_this.displayField] = record[1] || record[0];
        return hash;
      });
    },
    getInputElement: function() {
      return this.input || (this.input = this.$('select').eq(0));
    },
    afterRender: function() {
      var _ref, _ref2, _ref3;
      if (((_ref = this.collection) != null ? (_ref2 = _ref.models) != null ? _ref2.length : void 0 : void 0) > 0) {
        return this.populateOptions();
      } else {
        return (_ref3 = this.collection) != null ? _ref3.trigger("reset") : void 0;
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
      this.getInputElement().html('');
      if (this.includeBlank) {
        return this.getInputElement().append("<option value='" + this.blankValue + "'>" + this.blankText + "</option>");
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
          return _this.getInputElement().append(option);
        });
      }
      this.trigger("after:populate:options", this);
      return this.setValue(this.currentValue);
    }
  });

}).call(this);
(function() {

  _.def('Luca.fields.TextAreaField')["extends"]('Luca.core.Field')["with"]({
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
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.input_class || (this.input_class = this["class"]);
      this.input_value || (this.input_value = "");
      this.inputStyles || (this.inputStyles = "height:" + this.height + ";width:" + this.width);
      this.placeHolder || (this.placeHolder = "");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
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

}).call(this);
(function() {
  var textField;

  textField = Luca.register('Luca.fields.TextField');

  textField["extends"]('Luca.core.Field');

  textField.defines({
    events: {
      "blur input": "blur_handler",
      "focus input": "focus_handler",
      "change input": "change_handler"
    },
    template: 'fields/text_field',
    autoBindEventHandlers: true,
    send_blanks: true,
    keyEventThrottle: 300,
    initialize: function(options) {
      this.options = options != null ? options : {};
      if (this.enableKeyEvents) this.registerEvent("keyup input", "keyup_handler");
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.input_class || (this.input_class = this["class"]);
      this.input_value || (this.input_value = this.value || "");
      if (this.prepend) {
        this.$el.addClass('input-prepend');
        this.addOn = this.prepend;
      }
      if (this.append) {
        this.$el.addClass('input-append');
        this.addOn = this.append;
      }
      this.placeHolder || (this.placeHolder = "");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    keyup_handler: function(e) {
      return this.trigger("on:keyup", this, e);
    },
    blur_handler: function(e) {
      return this.trigger("on:blur", this, e);
    },
    focus_handler: function(e) {
      return this.trigger("on:focus", this, e);
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    }
  });

}).call(this);
(function() {
  var typeAheadField;

  typeAheadField = Luca.register("Luca.fields.TypeAheadField");

  typeAheadField["extends"]("Luca.fields.TextField");

  typeAheadField.defines({
    getSource: function() {
      return Luca.util.read(this.source) || [];
    },
    matcher: function(item) {
      return true;
    },
    beforeRender: function() {
      Luca.fields.TextField.prototype.beforeRender.apply(this, arguments);
      return this.getInputElement().attr('data-provide', 'typeahead');
    },
    afterRender: function() {
      Luca.fields.TextField.prototype.afterRender.apply(this, arguments);
      return this.getInputElement().typeahead({
        matcher: this.matcher,
        source: this.getSource()
      });
    }
  });

}).call(this);
(function() {
  var toolbar;

  toolbar = Luca.register("Luca.components.FormButtonToolbar");

  toolbar["extends"]("Luca.components.Toolbar");

  toolbar.defines({
    className: 'luca-ui-form-toolbar form-actions',
    position: 'bottom',
    includeReset: false,
    render: function() {
      $(this.container).append(this.el);
      return this;
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.components.Toolbar.prototype.initialize.apply(this, arguments);
      this.components = [
        {
          ctype: 'button_field',
          label: 'Submit',
          "class": 'btn submit-button'
        }
      ];
      if (this.includeReset) {
        return this.components.push({
          ctype: 'button_field',
          label: 'Reset',
          "class": 'btn reset-button'
        });
      }
    }
  });

}).call(this);
(function() {
  var formView;

  formView = Luca.register("Luca.components.FormView");

  formView["extends"]("Luca.core.Container");

  formView.triggers("before:submit", "before:reset", "before:load", "before:load:new", "before:load:existing", "after:submit", "after:reset", "after:load", "after:load:new", "after:load:existing", "after:submit:success", "after:submit:fatal_error", "after:submit:error");

  formView.defines({
    tagName: 'form',
    className: 'luca-ui-form-view',
    events: {
      "click .submit-button": "submitHandler",
      "click .reset-button": "resetHandler"
    },
    toolbar: true,
    legend: "",
    bodyClassName: "form-view-body",
    version: 1,
    initialize: function(options) {
      this.options = options != null ? options : {};
      if (this.loadMask == null) this.loadMask = Luca.config.enableBoostrap;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      this.components || (this.components = this.fields);
      _.bindAll(this, "submitHandler", "resetHandler", "renderToolbars");
      this.state || (this.state = new Backbone.Model);
      this.setupHooks(this.hooks);
      this.applyStyleClasses();
      if (this.toolbar !== false && (!this.topToolbar && !this.bottomToolbar)) {
        if (this.toolbar === "both" || this.toolbar === "top") {
          this.topToolbar = this.getDefaultToolbar();
        }
        if (this.toolbar !== "top") {
          return this.bottomToolbar = this.getDefaultToolbar();
        }
      }
    },
    getDefaultToolbar: function() {
      return Luca.components.FormView.defaultFormViewToolbar;
    },
    applyStyleClasses: function() {
      if (Luca.config.enableBoostrap) this.applyBootstrapStyleClasses();
      if (this.labelAlign) this.$el.addClass("label-align-" + this.labelAlign);
      if (this.fieldLayoutClass) return this.$el.addClass(this.fieldLayoutClass);
    },
    applyBootstrapStyleClasses: function() {
      if (this.labelAlign === "left") this.inlineForm = true;
      if (this.well) this.$el.addClass('well');
      if (this.searchForm) this.$el.addClass('form-search');
      if (this.horizontalForm) this.$el.addClass('form-horizontal');
      if (this.inlineForm) return this.$el.addClass('form-inline');
    },
    resetHandler: function(e) {
      var me, my;
      me = my = $(e != null ? e.target : void 0);
      this.trigger("before:reset", this);
      this.reset();
      return this.trigger("after:reset", this);
    },
    submitHandler: function(e) {
      var me, my;
      me = my = $(e != null ? e.target : void 0);
      this.trigger("before:submit", this);
      if (this.loadMask === true) this.trigger("enable:loadmask", this);
      if (this.hasModel()) return this.submit();
    },
    afterComponents: function() {
      var _ref,
        _this = this;
      if ((_ref = Luca.core.Container.prototype.afterComponents) != null) {
        _ref.apply(this, arguments);
      }
      return this.eachField(function(field) {
        field.getForm = function() {
          return _this;
        };
        return field.getModel = function() {
          return _this.currentModel();
        };
      });
    },
    eachField: function(iterator) {
      return _(this.getFields()).map(iterator);
    },
    getField: function(name) {
      var passOne;
      passOne = _(this.getFields('name', name)).first();
      if (passOne != null) return passOne;
      return _(this.getFields('input_name', name)).first();
    },
    getFields: function(attr, value) {
      var fields;
      fields = this.selectByAttribute("isField", true, true);
      if ((attr != null) && (value != null)) {
        fields = _(fields).select(function(field) {
          var property;
          property = field[attr];
          if (_.isFunction(property)) property = property.call(field);
          return property === value;
        });
      }
      return fields;
    },
    loadModel: function(current_model) {
      var event, fields, form, _ref;
      this.current_model = current_model;
      form = this;
      fields = this.getFields();
      this.trigger("before:load", this, this.current_model);
      if (this.current_model) {
        if ((_ref = this.current_model.beforeFormLoad) != null) {
          _ref.apply(this.current_model, this);
        }
        event = "before:load:" + (this.current_model.isNew() ? "new" : "existing");
        this.trigger(event, this, this.current_model);
      }
      this.setValues(this.current_model);
      this.trigger("after:load", this, this.current_model);
      if (this.current_model) {
        return this.trigger("after:load:" + (this.current_model.isNew() ? "new" : "existing"), this, this.current_model);
      }
    },
    reset: function() {
      if (this.current_model != null) return this.loadModel(this.current_model);
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
    setValues: function(source, options) {
      var fields,
        _this = this;
      if (options == null) options = {};
      source || (source = this.currentModel());
      fields = this.getFields();
      _(fields).each(function(field) {
        var field_name, value;
        field_name = field.input_name || field.name;
        if (value = source[field_name]) {
          if (_.isFunction(value)) value = value.apply(_this);
        }
        if (!value && Luca.isBackboneModel(source)) value = source.get(field_name);
        if (field.readOnly !== true) {
          return field != null ? field.setValue(value) : void 0;
        }
      });
      if ((options.silent != null) !== true) return this.syncFormWithModel();
    },
    getValues: function(options) {
      var values,
        _this = this;
      if (options == null) options = {};
      if (options.reject_blank == null) options.reject_blank = true;
      if (options.skip_buttons == null) options.skip_buttons = true;
      if (options.blanks === false) options.reject_blank = true;
      values = _(this.getFields()).inject(function(memo, field) {
        var allowBlankValues, key, skip, value, valueIsBlank;
        value = field.getValue();
        key = field.input_name || field.name;
        valueIsBlank = !!(_.str.isBlank(value) || _.isUndefined(value));
        allowBlankValues = !options.reject_blank && !field.send_blanks;
        if (options.debug) {
          console.log("" + key + " Options", options, "Value", value, "Value Is Blank?", valueIsBlank, "Allow Blanks?", allowBlankValues);
        }
        if (options.skip_buttons && field.isButton) {
          skip = true;
        } else {
          if (valueIsBlank && allowBlankValues === false) skip = true;
          if (field.input_name === "id" && valueIsBlank === true) skip = true;
        }
        if (options.debug) console.log("Skip is true on " + key);
        if (skip !== true) memo[key] = value;
        return memo;
      }, options.defaults || {});
      return values;
    },
    submit_success_handler: function(model, response, xhr) {
      this.trigger("after:submit", this, model, response);
      if (this.loadMask === true) this.trigger("disable:loadmask", this);
      if (response && (response != null ? response.success : void 0) === true) {
        return this.trigger("after:submit:success", this, model, response);
      } else {
        return this.trigger("after:submit:error", this, model, response);
      }
    },
    submit_fatal_error_handler: function(model, response, xhr) {
      this.trigger("after:submit", this, model, response);
      return this.trigger("after:submit:fatal_error", this, model, response);
    },
    submit: function(save, saveOptions) {
      if (save == null) save = true;
      if (saveOptions == null) saveOptions = {};
      _.bindAll(this, "submit_success_handler", "submit_fatal_error_handler");
      saveOptions.success || (saveOptions.success = this.submit_success_handler);
      saveOptions.error || (saveOptions.error = this.submit_fatal_error_handler);
      this.syncFormWithModel();
      if (!save) return;
      return this.current_model.save(this.current_model.toJSON(), saveOptions);
    },
    hasModel: function() {
      return this.current_model != null;
    },
    currentModel: function(options) {
      if (options == null) options = {};
      if (options === true || (options != null ? options.refresh : void 0) === true) {
        this.syncFormWithModel();
      }
      return this.current_model;
    },
    syncFormWithModel: function() {
      var _ref;
      return (_ref = this.current_model) != null ? _ref.set(this.getValues()) : void 0;
    },
    setLegend: function(legend) {
      this.legend = legend;
      return $('fieldset legend', this.el).first().html(this.legend);
    },
    flash: function(message) {
      if (this.$('.toolbar-container.top').length > 0) {
        return this.$('.toolbar-container.top').after(message);
      } else {
        return this.$bodyEl().prepend(message);
      }
    },
    successFlashDelay: 1500,
    successMessage: function(message) {
      var _this = this;
      this.$('.alert.alert-success').remove();
      this.flash(Luca.template("components/form_alert", {
        className: "alert alert-success",
        message: message
      }));
      return _.delay(function() {
        return _this.$('.alert.alert-success').fadeOut();
      }, this.successFlashDelay || 0);
    },
    errorMessage: function(message) {
      this.$('.alert.alert-error').remove();
      return this.flash(Luca.template("components/form_alert", {
        className: "alert alert-error",
        message: message
      }));
    }
  });

  Luca.components.FormView.defaultFormViewToolbar = {
    buttons: [
      {
        icon: "remove-sign",
        label: "Reset",
        eventId: "click:reset",
        className: "reset-button",
        align: 'right'
      }, {
        icon: "ok-sign",
        white: true,
        label: "Save Changes",
        eventId: "click:submit",
        color: "success",
        className: 'submit-button',
        align: 'right'
      }
    ]
  };

}).call(this);
(function() {

  _.def('Luca.components.GridView').extend('Luca.components.Panel')["with"]({
    bodyTemplate: "components/grid_view",
    autoBindEventHandlers: true,
    events: {
      "dblclick table tbody tr": "double_click_handler",
      "click table tbody tr": "click_handler"
    },
    className: 'luca-ui-g-view',
    rowClass: "luca-ui-g-row",
    wrapperClass: "luca-ui-g-view-wrapper",
    additionalWrapperClasses: [],
    wrapperStyles: {},
    scrollable: true,
    emptyText: 'No Results To display.',
    tableStyle: 'striped',
    defaultHeight: 285,
    defaultWidth: 756,
    maxWidth: void 0,
    hooks: ["before:grid:render", "before:render:header", "before:render:row", "after:grid:render", "row:double:click", "row:click", "after:collection:load"],
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.concerns.Deferrable);
      if (this.loadMask == null) this.loadMask = Luca.config.enableBoostrap;
      if (this.loadMask === true) {
        this.loadMaskEl || (this.loadMaskEl = ".luca-ui-g-view-body");
      }
      Luca.components.Panel.prototype.initialize.apply(this, arguments);
      this.configure_collection(true);
      this.collection.bind("before:fetch", function() {
        if (_this.loadMask === true) return _this.trigger("enable:loadmask");
      });
      this.collection.bind("reset", function(collection) {
        _this.refresh();
        if (_this.loadMask === true) _this.trigger("disable:loadmask");
        return _this.trigger("after:collection:load", collection);
      });
      return this.collection.bind("change", function(model) {
        var cells, rowEl;
        if (_this.rendered !== true) return;
        try {
          rowEl = _this.getRowEl(model.id || model.get('id') || model.cid);
          cells = _this.render_row(model, _this.collection.indexOf(model), {
            cellsOnly: true
          });
          return $(rowEl).html(cells.join(" "));
        } catch (error) {
          return console.log("Error in change handler for GridView.collection", error, _this, model);
        }
      });
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.components.Panel.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      this.trigger("before:grid:render", this);
      this.table = this.$('table.luca-ui-g-view');
      this.header = this.$("thead");
      this.body = this.$("tbody");
      this.footer = this.$("tfoot");
      this.wrapper = this.$("." + this.wrapperClass);
      this.applyCssClasses();
      if (this.scrollable) this.setDimensions();
      this.renderHeader();
      this.emptyMessage();
      return $(this.container).append(this.$el);
    },
    afterRender: function() {
      var _ref;
      if ((_ref = Luca.components.Panel.prototype.afterRender) != null) {
        _ref.apply(this, arguments);
      }
      this.rendered = true;
      this.refresh();
      return this.trigger("after:grid:render", this);
    },
    applyCssClasses: function() {
      var _ref,
        _this = this;
      if (this.scrollable) this.$el.addClass('scrollable-g-view');
      _(this.additionalWrapperClasses).each(function(containerClass) {
        var _ref;
        return (_ref = _this.wrapper) != null ? _ref.addClass(containerClass) : void 0;
      });
      if (Luca.config.enableBoostrap) this.table.addClass('table');
      return _((_ref = this.tableStyle) != null ? _ref.split(" ") : void 0).each(function(style) {
        return _this.table.addClass("table-" + style);
      });
    },
    setDimensions: function(offset) {
      var _this = this;
      this.height || (this.height = this.defaultHeight);
      this.$('.luca-ui-g-view-body').height(this.height);
      this.$('tbody.scrollable').height(this.height - 23);
      this.container_width = (function() {
        return $(_this.container).width();
      })();
      this.width || (this.width = this.container_width > 0 ? this.container_width : this.defaultWidth);
      this.width = _([this.width, this.maxWidth || this.width]).max();
      this.$('.luca-ui-g-view-body').width(this.width);
      this.$('.luca-ui-g-view-body table').width(this.width);
      return this.setDefaultColumnWidths();
    },
    resize: function(newWidth) {
      var difference, distribution,
        _this = this;
      difference = newWidth - this.width;
      this.width = newWidth;
      this.$('.luca-ui-g-view-body').width(this.width);
      this.$('.luca-ui-g-view-body table').width(this.width);
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
        return parseInt(column.width || (column.width = default_column_width));
      });
      return this.padLastColumn();
    },
    lastColumn: function() {
      return this.columns[this.columns.length - 1];
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
    getRowEl: function(id) {
      return this.$("[data-record-id=" + id + "]", 'table');
    },
    render_row: function(row, row_index, options) {
      var altClass, cells, content, model_id, rowClass, _ref,
        _this = this;
      if (options == null) options = {};
      rowClass = this.rowClass;
      model_id = (row != null ? row.get : void 0) && (row != null ? row.attributes : void 0) ? row.get('id') : '';
      this.trigger("before:render:row", row, row_index);
      cells = _(this.columns).map(function(column, col_index) {
        var display, style, value;
        value = _this.cell_renderer(row, column, col_index);
        style = column.width ? "width:" + column.width + "px;" : "";
        display = _.isUndefined(value) ? "" : value;
        return "<td style='" + style + "' class='column-" + col_index + "'>" + display + "</td>";
      });
      if (options.cellsOnly) return cells;
      altClass = '';
      if (this.alternateRowClasses) {
        altClass = row_index % 2 === 0 ? "even" : "odd";
      }
      content = "<tr data-record-id='" + model_id + "' data-row-index='" + row_index + "' class='" + rowClass + " " + altClass + "' id='row-" + row_index + "'>" + cells + "</tr>";
      if (options.contentOnly === true) return content;
      return (_ref = this.body) != null ? _ref.append(content) : void 0;
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
      $("." + this.rowClass, this.body).removeClass('selected-row');
      return me.addClass('selected-row');
    }
  });

}).call(this);
(function() {
  var loadMask;

  loadMask = Luca.register("Luca.components.LoadMask");

  loadMask["extends"]("Luca.View");

  loadMask.defines({
    className: "luca-ui-load-mask",
    bodyTemplate: "components/load_mask"
  });

}).call(this);
(function() {
  var multiView, propagateCollectionComponents, validateComponent;

  multiView = Luca.register("Luca.components.MultiCollectionView");

  multiView["extends"]("Luca.containers.CardView");

  multiView.mixesIn("QueryCollectionBindings", "LoadMaskable", "Filterable", "Paginatable");

  multiView.triggers("before:refresh", "after:refresh", "refresh", "empty:results");

  multiView.defines({
    version: 1,
    stateful: true,
    defaultState: {
      activeView: 0
    },
    viewContainerClass: "luca-ui-multi-view-container",
    initialize: function(options) {
      var view, _i, _len, _ref;
      this.options = options != null ? options : {};
      this.components || (this.components = this.views);
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        validateComponent(view);
      }
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      this.on("refresh", this.refresh, this);
      this.on("after:card:switch", this.refresh, this);
      return this.on("after:components", propagateCollectionComponents, this);
    },
    relayAfterRefresh: function(models, query, options) {
      return this.trigger("after:refresh", models, query, options);
    },
    refresh: function() {
      var _ref;
      return (_ref = this.activeComponent()) != null ? _ref.trigger("refresh") : void 0;
    }
  });

  propagateCollectionComponents = function() {
    var component, container, _i, _len, _ref, _results,
      _this = this;
    container = this;
    _ref = this.components;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      component.on("after:refresh", function(models, query, options) {
        _this.debug("collection member after refresh");
        return _this.trigger("after:refresh", models, query, options);
      });
      _results.push(_.extend(component, {
        collection: container.getCollection(),
        getQuery: function() {
          return container.getQuery.call(container);
        },
        getQueryOptions: function() {
          return container.getQueryOptions.call(container);
        }
      }));
    }
    return _results;
  };

  validateComponent = function(component) {
    var type;
    type = component.type || component.ctype;
    if (type === "collection" || type === "collection_view" || type === "table" || type === "table_view") {
      return;
    }
    throw "The MultiCollectionView expects to contain multiple collection views";
  };

}).call(this);
(function() {
  var navBar;

  navBar = Luca.register("Luca.components.NavBar");

  navBar["extends"]("Luca.View");

  navBar.defines({
    fixed: true,
    position: 'top',
    className: 'navbar',
    brand: "Luca.js",
    bodyTemplate: 'nav_bar',
    bodyClassName: 'luca-ui-navbar-body',
    beforeRender: function() {
      if (this.fixed) this.$el.addClass("navbar-fixed-" + this.position);
      if (this.brand != null) {
        this.content().append("<a class='brand' href='#'>" + this.brand + "</a>");
      }
      if (this.template) {
        return this.content().append(Luca.template(this.template, this));
      }
    },
    render: function() {
      return this;
    },
    content: function() {
      return this.$('.container').eq(0);
    }
  });

}).call(this);
(function() {
  var pageController;

  pageController = Luca.register("Luca.PageController");

  pageController["extends"]("Luca.components.Controller");

  pageController.defines({
    version: 2
  });

}).call(this);
(function() {
  var paginationControl;

  paginationControl = Luca.register("Luca.components.PaginationControl");

  paginationControl["extends"]("Luca.View");

  paginationControl.defines({
    template: "components/pagination",
    stateful: true,
    autoBindEventHandlers: true,
    events: {
      "click a[data-page-number]": "selectPage",
      "click a.next": "nextPage",
      "click a.prev": "previousPage"
    },
    afterInitialize: function() {
      var _ref,
        _this = this;
      _.bindAll(this, "updateWithPageCount");
      return (_ref = this.state) != null ? _ref.on("change", function(state, numberOfPages) {
        return _this.updateWithPageCount(state.get('numberOfPages'));
      }) : void 0;
    },
    limit: function() {
      var _ref;
      return parseInt(this.state.get('limit') || ((_ref = this.collection) != null ? _ref.length : void 0));
    },
    page: function() {
      return parseInt(this.state.get('page') || 1);
    },
    nextPage: function() {
      if (!this.nextEnabled()) return;
      return this.state.set('page', this.page() + 1);
    },
    previousPage: function() {
      if (!this.previousEnabled()) return;
      return this.state.set('page', this.page() - 1);
    },
    selectPage: function(e) {
      var me, my;
      me = my = this.$(e.target);
      if (!me.is('a.page')) me = my = my.closest('a.page');
      my.siblings().removeClass('is-selected');
      me.addClass('is-selected');
      return this.setPage(my.data('page-number'));
    },
    setPage: function(page, options) {
      if (page == null) page = 1;
      if (options == null) options = {};
      return this.state.set('page', page, options);
    },
    setLimit: function(limit, options) {
      if (limit == null) limit = 1;
      if (options == null) options = {};
      return this.state.set('limit', limit, options);
    },
    pageButtonContainer: function() {
      return this.$('.group');
    },
    previousEnabled: function() {
      return this.page() > 1;
    },
    nextEnabled: function() {
      return this.page() < this.totalPages();
    },
    previousButton: function() {
      return this.$('a.page.prev');
    },
    nextButton: function() {
      return this.$('a.page.next');
    },
    pageButtons: function() {
      return this.$('a[data-page-number]', this.pageButtonContainer());
    },
    updateWithPageCount: function(pageCount, models) {
      var modelCount,
        _this = this;
      this.pageCount = pageCount;
      if (models == null) models = [];
      modelCount = models.length;
      this.pageButtonContainer().empty();
      _(this.pageCount).times(function(index) {
        var button, page;
        page = index + 1;
        button = _this.make("a", {
          "data-page-number": page,
          "class": "page"
        }, page);
        return _this.pageButtonContainer().append(button);
      });
      this.toggleNavigationButtons();
      this.selectActivePageButton();
      return this;
    },
    toggleNavigationButtons: function() {
      this.$('a.next, a.prev').addClass('disabled');
      if (this.nextEnabled()) this.nextButton().removeClass('disabled');
      if (this.previousEnabled()) {
        return this.previousButton().removeClass('disabled');
      }
    },
    selectActivePageButton: function() {
      return this.activePageButton().addClass('is-selected');
    },
    activePageButton: function() {
      return this.pageButtons().filter("[data-page-number='" + (this.page()) + "']");
    },
    totalPages: function() {
      return this.pageCount;
    },
    totalItems: function() {
      var _ref;
      return parseInt(((_ref = this.collection) != null ? _ref.length : void 0) || 0);
    },
    itemsPerPage: function(value, options) {
      if (options == null) options = {};
      if (value != null) this.state.set("limit", value, options);
      return parseInt(this.state.get("limit"));
    }
  });

}).call(this);
(function() {

  _.def('Luca.components.RecordManager')["extends"]('Luca.containers.CardView')["with"]({
    events: {
      "click .record-manager-grid .edit-link": "edit_handler",
      "click .record-manager-filter .filter-button": "filter_handler",
      "click .record-manager-filter .reset-button": "reset_filter_handler",
      "click .add-button": "add_handler",
      "click .refresh-button": "filter_handler",
      "click .back-to-search-button": "back_to_search_handler"
    },
    record_manager: true,
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      if (!this.name) throw "Record Managers must specify a name";
      _.bindAll(this, "add_handler", "edit_handler", "filter_handler", "reset_filter_handler");
      if (this.filterConfig) _.extend(this.components[0][0], this.filterConfig);
      if (this.gridConfig) _.extend(this.components[0][1], this.gridConfig);
      if (this.editorConfig) _.extend(this.components[1][0], this.editorConfig);
      return this.bind("after:card:switch", function() {
        if (_this.activeCard === 0) _this.trigger("activation:search", _this);
        if (_this.activeCard === 1) {
          return _this.trigger("activation:editor", _this);
        }
      });
    },
    components: [
      {
        ctype: 'split_view',
        relayFirstActivation: true,
        components: [
          {
            ctype: 'form_view'
          }, {
            ctype: 'grid_view'
          }
        ]
      }, {
        ctype: 'form_view'
      }
    ],
    getSearch: function(activate, reset) {
      if (activate == null) activate = false;
      if (reset == null) reset = true;
      if (activate === true) this.activate(0);
      if (reset === true) this.getEditor().clear();
      return _.first(this.components);
    },
    getFilter: function() {
      return _.first(this.getSearch().components);
    },
    getGrid: function() {
      return _.last(this.getSearch().components);
    },
    getCollection: function() {
      return this.getGrid().collection;
    },
    getEditor: function(activate, reset) {
      var _this = this;
      if (activate == null) activate = false;
      if (reset == null) reset = false;
      if (activate === true) {
        this.activate(1, function(activator, previous, current) {
          return current.reset();
        });
      }
      return _.last(this.components);
    },
    beforeRender: function() {
      var _ref;
      this.$el.addClass("" + this.resource + "-manager");
      if ((_ref = Luca.containers.CardView.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      this.$el.addClass("" + this.resource + " record-manager");
      this.$el.data('resource', this.resource);
      $(this.getGrid().el).addClass("" + this.resource + " record-manager-grid");
      $(this.getFilter().el).addClass("" + this.resource + " record-manager-filter");
      return $(this.getEditor().el).addClass("" + this.resource + " record-manager-editor");
    },
    afterRender: function() {
      var collection, editor, filter, grid, manager, _ref,
        _this = this;
      if ((_ref = Luca.containers.CardView.prototype.afterRender) != null) {
        _ref.apply(this, arguments);
      }
      manager = this;
      grid = this.getGrid();
      filter = this.getFilter();
      editor = this.getEditor();
      collection = this.getCollection();
      grid.bind("row:double:click", function(grid, model, index) {
        manager.getEditor(true);
        return editor.loadModel(model);
      });
      editor.bind("before:submit", function() {
        $('.form-view-flash-container', _this.el).html('');
        return $('.form-view-body', _this.el).spin("large");
      });
      editor.bind("after:submit", function() {
        return $('.form-view-body', _this.el).spin(false);
      });
      editor.bind("after:submit:fatal_error", function() {
        $('.form-view-flash-container', _this.el).append("<li class='error'>There was an internal server error saving this record.  Please contact developers@benchprep.com to report this error.</li>");
        return $('.form-view-body', _this.el).spin(false);
      });
      editor.bind("after:submit:error", function(form, model, response) {
        return _(response.errors).each(function(error) {
          return $('.form-view-flash-container', _this.el).append("<li class='error'>" + error + "</li>");
        });
      });
      editor.bind("after:submit:success", function(form, model, response) {
        $('.form-view-flash-container', _this.el).append("<li class='success'>Successfully Saved Record</li>");
        model.set(response.result);
        form.loadModel(model);
        grid.refresh();
        return _.delay(function() {
          $('.form-view-flash-container li.success', _this.el).fadeOut(1000);
          return $('.form-view-flash-container', _this.el).html('');
        }, 4000);
      });
      return filter.eachComponent(function(component) {
        try {
          return component.bind("on:change", _this.filter_handler);
        } catch (e) {
          return;
        }
      });
    },
    firstActivation: function() {
      this.getGrid().trigger("first:activation", this, this.getGrid());
      return this.getFilter().trigger("first:activation", this, this.getGrid());
    },
    reload: function() {
      var editor, filter, grid, manager;
      manager = this;
      grid = this.getGrid();
      filter = this.getFilter();
      editor = this.getEditor();
      filter.clear();
      return grid.applyFilter();
    },
    manageRecord: function(record_id) {
      var model,
        _this = this;
      model = this.getCollection().get(record_id);
      if (model) return this.loadModel(model);
      console.log("Could Not Find Model, building and fetching");
      model = this.buildModel();
      model.set({
        id: record_id
      }, {
        silent: true
      });
      return model.fetch({
        success: function(model, response) {
          return _this.loadModel(model);
        }
      });
    },
    loadModel: function(current_model) {
      this.current_model = current_model;
      this.getEditor(true).loadModel(this.current_model);
      return this.trigger("model:loaded", this.current_model);
    },
    currentModel: function() {
      return this.getEditor(false).currentModel();
    },
    buildModel: function() {
      var collection, editor, model;
      editor = this.getEditor(false);
      collection = this.getCollection();
      collection.add([{}], {
        silent: true,
        at: 0
      });
      return model = collection.at(0);
    },
    createModel: function() {
      return this.loadModel(this.buildModel());
    },
    reset_filter_handler: function(e) {
      this.getFilter().clear();
      return this.getGrid().applyFilter(this.getFilter().getValues());
    },
    filter_handler: function(e) {
      return this.getGrid().applyFilter(this.getFilter().getValues());
    },
    edit_handler: function(e) {
      var me, model, my, record_id;
      me = my = $(e.currentTarget);
      record_id = my.parents('tr').data('record-id');
      if (record_id) model = this.getGrid().collection.get(record_id);
      return model || (model = this.getGrid().collection.at(row_index));
    },
    add_handler: function(e) {
      var me, my, resource;
      me = my = $(e.currentTarget);
      return resource = my.parents('.record-manager').eq(0).data('resource');
    },
    destroy_handler: function(e) {},
    back_to_search_handler: function() {}
  });

}).call(this);
(function() {
  var router;

  router = Luca.register("Luca.Router");

  router["extends"]("Backbone.Router");

  router.defines({
    routes: {
      "": "default"
    },
    initialize: function(options) {
      var _ref,
        _this = this;
      this.options = options;
      _.extend(this, this.options);
      this.routeHandlers = _(this.routes).values();
      _(this.routeHandlers).each(function(route_id) {
        return _this.bind("route:" + route_id, function() {
          return _this.trigger.apply(_this, ["change:navigation", route_id].concat(_(arguments).flatten()));
        });
      });
      return (_ref = Backbone.Router.initialize) != null ? _ref.apply(this, arguments) : void 0;
    },
    navigate: function(route, triggerRoute) {
      if (triggerRoute == null) triggerRoute = false;
      Backbone.Router.prototype.navigate.apply(this, arguments);
      return this.buildPathFrom(Backbone.history.getFragment());
    },
    buildPathFrom: function(matchedRoute) {
      var _this = this;
      return _(this.routes).each(function(route_id, route) {
        var args, regex;
        regex = _this._routeToRegExp(route);
        if (regex.test(matchedRoute)) {
          args = _this._extractParameters(regex, matchedRoute);
          return _this.trigger.apply(_this, ["change:navigation", route_id].concat(args));
        }
      });
    }
  });

}).call(this);
(function() {
  var tableView;

  tableView = Luca.register("Luca.components.TableView");

  tableView["extends"]("Luca.components.CollectionView");

  tableView.publicConfiguration({
    widths: [],
    columns: [],
    emptyText: "There are no results to display"
  });

  tableView.privateConfiguration({
    additionalClassNames: "table",
    tagName: "table",
    bodyTemplate: "table_view",
    bodyTagName: "tbody",
    bodyClassName: "table-body",
    stateful: true,
    itemTagName: "tr",
    observeChanges: true
  });

  tableView.privateMethods({
    itemRenderer: function(item, model) {
      return Luca.components.TableView.rowRenderer.call(this, item, model);
    },
    initialize: function(options) {
      var column, index, width,
        _this = this;
      this.options = options != null ? options : {};
      Luca.components.CollectionView.prototype.initialize.apply(this, arguments);
      index = 0;
      this.columns = (function() {
        var _i, _len, _ref, _results;
        _ref = this.columns;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          if (width = this.widths[index]) column.width = width;
          if (_.isString(column)) {
            column = {
              reader: column
            };
          }
          if (!(column.header != null)) {
            column.header = _.str.titleize(_.str.humanize(column.reader));
          }
          index++;
          _results.push(column);
        }
        return _results;
      }).call(this);
      return this.defer(function() {
        return Luca.components.TableView.renderHeader.call(_this, _this.columns, _this.$('thead'));
      }).until("after:render");
    }
  });

  tableView.classMethods({
    renderHeader: function(columns, targetElement) {
      var column, content, index, th, _i, _len, _results;
      index = 0;
      content = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = columns.length; _i < _len; _i++) {
          column = columns[_i];
          _results.push("<th data-col-index='" + (index++) + "'>" + column.header + "</th>");
        }
        return _results;
      })();
      this.$(targetElement).append("<tr>" + (content.join('')) + "</tr>");
      index = 0;
      _results = [];
      for (_i = 0, _len = columns.length; _i < _len; _i++) {
        column = columns[_i];
        if (!(column.width != null)) continue;
        th = this.$("th[data-col-index='" + (index++) + "']", targetElement);
        _results.push(th.css('width', column.width));
      }
      return _results;
    },
    rowRenderer: function(item, model, index) {
      var colIndex, columnConfig, _i, _len, _ref, _results;
      colIndex = 0;
      _ref = this.columns;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        columnConfig = _ref[_i];
        _results.push(Luca.components.TableView.renderColumn.call(this, columnConfig, item, model, colIndex++));
      }
      return _results;
    },
    renderColumn: function(column, item, model, index) {
      var cellValue;
      cellValue = model.read(column.reader);
      if (_.isFunction(column.renderer)) {
        cellValue = column.renderer.call(this, cellValue, model, column);
      }
      return Backbone.View.prototype.make("td", {
        "data-col-index": index
      }, cellValue);
    }
  });

  tableView.register();

}).call(this);
(function() {

  _.def("Luca.components.ToolbarDialog")["extends"]("Luca.View")["with"]({
    className: "luca-ui-toolbar-dialog span well",
    styles: {
      "position": "absolute",
      "z-Index": "3000",
      "float": "left"
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      return this._super("initialize", this, arguments);
    },
    createWrapper: function() {
      return this.make("div", {
        "class": "component-picker span4 well",
        style: "position: absolute; z-index:12000"
      });
    },
    show: function() {
      return this.$el.parent().show();
    },
    hide: function() {
      return this.$el.parent().hide();
    },
    toggle: function() {
      return this.$el.parent().toggle();
    }
  });

}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);



(function() {



}).call(this);



