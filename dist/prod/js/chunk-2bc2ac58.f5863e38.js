(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bc2ac58"],{"6fdd":function(t,e,n){},a3e4:function(t,e,n){"use strict";var i=n("6fdd"),c=n.n(i);c.a},a78b:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-steps",{attrs:{size:"is-small",animated:t.stepItemCfg.isAnimated,"has-navigation":t.stepItemCfg.hasNavigation},scopedSlots:t._u([{key:"navigation",fn:function(e){var i=e.previous,c=e.next;return t.stepItemCfg.customNavigation?[n("div",{staticClass:"customNavButtons"},[n("b-button",{attrs:{type:"is-primary","icon-pack":"mdi","icon-left":"less-than",disabled:t.isFirstSection},on:{click:function(t){return t.preventDefault(),i.action(t)}}},[t._v("Anterior ")]),n("b-button",{attrs:{type:"is-primary","icon-pack":"mdi","icon-right":"greater-than",disabled:t.isLastSection},on:{click:function(t){return t.preventDefault(),c.action(t)}}},[t._v(" Siguiente ")])],1)]:void 0}}],null,!0),model:{value:t.stepControl,callback:function(e){t.stepControl=e},expression:"stepControl"}},t._l(Object.keys(t.sections),(function(e,i){return n("b-step-item",{key:i,attrs:{label:i.toString(),clickable:t.stepItemCfg.isStepsClickable,type:t.sections[e].isValid?"is-success":"is-danger"}})})),1)},c=[],s=(n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),o=n("2f62");function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){Object(s["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var u={data:function(){return{stepItemCfg:{isStepsClickable:!0,isAnimated:!0,hasNavigation:!0,customNavigation:!0,prevIcon:"chevron-left",nextIcon:"chevron-right",isProfileSuccess:!0}}},computed:a({stepControl:{get:function(){return this.activeStep},set:function(t){this.setActiveSection(t)}}},Object(o["d"])({sections:function(t){return t.formSections},activeStep:function(t){return t.activeSectionId}}),{},Object(o["c"])({isFirstSection:"isFirstSection",isLastSection:"isLastSection"})),methods:a({},Object(o["b"])({setActiveSection:"setActiveSection"}))},p=u,l=(n("a3e4"),n("2877")),b=Object(l["a"])(p,i,c,!1,null,"ab575f10",null);e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2bc2ac58.f5863e38.js.map