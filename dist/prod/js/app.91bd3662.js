(function(e){function t(t){for(var o,r,i=t[0],u=t[1],f=t[2],s=0,d=[];s<i.length;s++)r=i[s],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&d.push(a[r][0]),a[r]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);l&&l(t);while(d.length)d.shift()();return c.push.apply(c,f||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],o=!0,r=1;r<n.length;r++){var i=n[r];0!==a[i]&&(o=!1)}o&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},r={app:0},a={app:0},c=[];function i(e){return u.p+"js/"+({about:"about",formfields:"formfields",formpictos:"formpictos"}[e]||e)+"."+{about:"47af811d","chunk-54e53ef4":"e92a3d20","chunk-6947bc4a":"37165919","chunk-cb9ee21a":"3bc362e1","chunk-fc2e9bb2":"31f7732e","chunk-f4528a60":"a977af71",formfields:"ab2f3328",formpictos:"0ac04b44","chunk-77723f9c":"f2fed1f5","chunk-e4e2cc30":"9221e005","chunk-6e341ba8":"d15f885c","chunk-2d0b692a":"5b0f3a29","chunk-4af9d82c":"532e1e18","chunk-7fbcb9f0":"f4a4a1eb","chunk-c83245a6":"01f72931","chunk-dad65ecc":"1789a481"}[e]+".js"}function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-54e53ef4":1,"chunk-6947bc4a":1,"chunk-cb9ee21a":1,"chunk-77723f9c":1,"chunk-e4e2cc30":1,"chunk-6e341ba8":1,"chunk-4af9d82c":1,"chunk-7fbcb9f0":1,"chunk-c83245a6":1,"chunk-dad65ecc":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var o="css/"+({about:"about",formfields:"formfields",formpictos:"formpictos"}[e]||e)+"."+{about:"31d6cfe0","chunk-54e53ef4":"5092cb0c","chunk-6947bc4a":"c56b6393","chunk-cb9ee21a":"74f509ad","chunk-fc2e9bb2":"31d6cfe0","chunk-f4528a60":"31d6cfe0",formfields:"31d6cfe0",formpictos:"31d6cfe0","chunk-77723f9c":"cc02d668","chunk-e4e2cc30":"4c6da000","chunk-6e341ba8":"f7163324","chunk-2d0b692a":"31d6cfe0","chunk-4af9d82c":"56a84528","chunk-7fbcb9f0":"b32ce239","chunk-c83245a6":"b2d3e01f","chunk-dad65ecc":"b1e294e9"}[e]+".css",a=u.p+o,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var f=c[i],s=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(s===o||s===a))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){f=d[i],s=f.getAttribute("data-href");if(s===o||s===a)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var o=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=o,delete r[e],l.parentNode.removeChild(l),n(c)},l.href=a;var h=document.getElementsByTagName("head")[0];h.appendChild(l)})).then((function(){r[e]=0})));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var c=new Promise((function(t,n){o=a[e]=[t,n]}));t.push(o[2]=c);var f,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=i(e);var d=new Error;f=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",d.name="ChunkLoadError",d.type=o,d.request=r,n[1](d)}a[e]=void 0}};var l=setTimeout((function(){f({type:"timeout",target:s})}),12e4);s.onerror=s.onload=f,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],s=f.push.bind(f);f.push=t,f=f.slice();for(var d=0;d<f.length;d++)t(f[d]);var l=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"35ad":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("a026"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app grid-container"},[n("header",{staticClass:"app__header"},[n("app-header")],1),n("main",{staticClass:"app__main"},[e.dataReady?n("router-view"):e._e(),n("app-data-loader",{on:{"data-load-ready":e.onDataLoad,"data-load-error":e.onDataLoadError}})],1),n("footer",{staticClass:"app__footer"},[e.dataReady?n("app-footer"):e._e()],1)])},a=[],c=(n("d3b7"),{name:"App",components:{AppHeader:function(){return n.e("chunk-54e53ef4").then(n.bind(null,"3f6f"))},AppFooter:function(){return n.e("chunk-6947bc4a").then(n.bind(null,"ec0b"))},AppDataLoader:function(){return Promise.all([n.e("chunk-fc2e9bb2"),n.e("chunk-f4528a60")]).then(n.bind(null,"f103"))}},data:function(){return{dataReady:!1}},methods:{onDataLoad:function(){this.dataReady=!0,console.log("Form ready")},onDataLoadError:function(e){console.error("Error inicializando app. ".concat(e))}}}),i=c,u=(n("5c0b"),n("2877")),f=Object(u["a"])(i,r,a,!1,null,null,null),s=f.exports,d=n("8c4f"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"welcome"},[n("intro")],1)},h=[],p={name:"welcome",components:{intro:function(){return n.e("chunk-cb9ee21a").then(n.bind(null,"a380"))}}},m=p,b=(n("66ac"),Object(u["a"])(m,l,h,!1,null,"3188e0d3",null)),v=b.exports;o["a"].use(d["a"]);var g,k=[{path:"/",name:"welcome",component:v},{path:"/formfields",name:"formfields",component:function(){return n.e("formfields").then(n.bind(null,"6da4"))}},{path:"/formpictos",name:"formpictos",component:function(){return n.e("formpictos").then(n.bind(null,"68ec"))}},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"d7a9"))}}],y=new d["a"]({routes:k}),_=y,w=(n("b64b"),n("ade3")),O=n("2f62"),D="SET_USER_POSITION",S="SET_ACTIVE_SECTION",T="LOAD_FORM_DATA",j="SET_ACTIVE_USER";o["a"].use(O["a"]);var E=new O["a"].Store({state:{user:{},userPosition:null,activeSectionId:0,formSections:{}},getters:{isFirstSection:function(e){return 0===e.activeSectionId},isLastSection:function(e){return e.activeSectionId===Object.keys(e.formSections).length-1}},mutations:(g={},Object(w["a"])(g,T,(function(e,t){e.formSections=t})),Object(w["a"])(g,D,(function(e,t){e.userPosition=t})),Object(w["a"])(g,S,(function(e,t){e.activeSectionId=t})),Object(w["a"])(g,j,(function(e,t){e.user=t})),g),actions:{setActiveUser:function(e,t){e.commit(j,t)},loadFormData:function(e,t){e.commit(T,t)},setActiveSection:function(e,t){e.commit(S,t)},setUserPosition:function(e,t){e.commit(D,t)}},modules:{}}),A=n("9483");Object(A["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var C=n("289d"),L=(n("5363"),n("4a31")),P=n("0dae"),N=n("b166"),R=n("d546"),x={data:function(){return{currentDateTime:(new Date).getTime(),spainLocaleObj:R["a"]}},methods:{$_calculeGraphOffset:function(e){var t=-1*new Date(e).getTimezoneOffset()/60;return t},$_calculeDatesToNowCast:function(){var e=new Date(this.currentDateTime),t=Object(P["a"])(e,1);return{ini:this._formatDateRequestData(e),end:this._formatDateRequestData(t)}},$_getDateNowtoRequest:function(){return this._formatDateRequestData(this.currentDateTime)},$_getLocalDate:function(){var e=Object(N["a"])(this.currentDateTime,"dd/MM/yyyy");return e},$_getLocalTime:function(){var e=Object(N["a"])(this.currentDateTime,"HH:mm");return e},_formatDateRequestData:function(e){var t=Object(L["formatToTimeZone"])(e,"YYYY-MM-DD[T]HH:mm:ss.S",{timeZone:"Etc/UTC"})+"Z";return t}}};o["a"].mixin(x),o["a"].use(C["a"]),o["a"].config.productionTip=!1,new o["a"]({router:_,store:E,render:function(e){return e(s)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var o=n("9c0c"),r=n.n(o);r.a},"66ac":function(e,t,n){"use strict";var o=n("35ad"),r=n.n(o);r.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.91bd3662.js.map