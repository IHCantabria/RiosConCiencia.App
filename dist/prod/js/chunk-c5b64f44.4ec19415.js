(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c5b64f44"],{"379f":function(t,e,i){t.exports=i.p+"img/river.ddfc0f23.jpg"},"395b":function(t,e,i){t.exports=i.p+"img/titleFlow.6f8be3d1.jpg"},6508:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"form-section-picts form-section"},[i("div",{staticClass:"header-section"},[t._m(0),i("div",{staticClass:"header-section__help",on:{click:function(e){return t.$_toggleHelp()}}},[i("b-icon",{attrs:{icon:"information-outline",type:"is-info"}})],1)]),i("b-field",{directives:[{name:"show",rawName:"v-show",value:t.isHelpActive,expression:"isHelpActive"}],attrs:{message:"Observamos si el agua del río se mueve o si por el contrario, está estancada."}}),i("div",{staticClass:"img-header"},[i("img",{staticClass:"img-header__pic",attrs:{src:t.$_getImgUrl(1,0,0)}}),i("b-icon",{staticClass:"img-header__icon",attrs:{icon:"checkbox-marked-circle-outline",type:"is-info"}})],1),i("b-field",{staticClass:"img-section"},[i("div",{staticClass:"img-container"},[i("span",{staticClass:"img-option-text"},[t._v("NO SE MUEVE")]),i("b-radio-button",{staticClass:"img-option",attrs:{"native-value":!1},model:{value:t.values.waterFlow,callback:function(e){t.$set(t.values,"waterFlow",e)},expression:"values.waterFlow"}},[i("img",{class:0==t.values.waterFlow?"img-option__active":"img-option__inactive",attrs:{src:t.$_getImgUrl(1,1,1)}}),i("div",{class:["overlay",0==t.values.waterFlow?"overlay__active":"overlay__inactive"]})])],1),i("div",{staticClass:"img-container"},[i("span",{staticClass:"img-option-text"},[t._v("SI SE MUEVE")]),i("b-radio-button",{staticClass:"\n        img-option",attrs:{"native-value":!0},model:{value:t.values.waterFlow,callback:function(e){t.$set(t.values,"waterFlow",e)},expression:"values.waterFlow"}},[i("img",{class:1==t.values.waterFlow?"img-option__active":"img-option__inactive",attrs:{src:t.$_getImgUrl(1,2,1)}}),i("div",{class:["overlay",1==t.values.waterFlow?"overlay__active":"overlay__inactive"]})])],1)])],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h5",{staticClass:"title is-5 header-section__text"},[i("span",[t._v("MIRAMOS AL RÍO")])])}],o=(i("d3b7"),i("ddb0"),i("5530")),n=i("2f62"),c=i("ce86"),l={data:function(){return{values:{waterFlow:0}}},mixins:[c["a"]],computed:Object(o["a"])({},Object(n["d"])({formFlow:function(t){return t.formPictsSections.flow}}),{isSectionValid:function(){return!0}}),created:function(){this._loadAssests()},mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificPictsSectionValues({name:"flow",values:this.values,isValid:this.isSectionValid})},methods:Object(o["a"])({},Object(n["b"])({updateSpecificPictsSectionValues:"updateSpecificPictsSectionValues"}),{init:function(){this.values.waterFlow=null},_loadAssests:function(){this.imgFolder=i("ea7f")}})},r=l,u=(i("e381"),i("2877")),v=Object(u["a"])(r,s,a,!1,null,"7885f15e",null);e["default"]=v.exports},"8b2e":function(t,e,i){},ce86:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var s=i("fa7d"),a={data:function(){return{imgFolder:null,helpActive:!1}},computed:{isHelpActive:function(){return this.helpActive}},methods:{$_getImgUrl:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.imgFolder?this.imgFolder("./".concat(Object(s["b"])(t,e,i))):""},$_toggleHelp:function(){this.helpActive=!this.helpActive}}}},e155:function(t,e,i){t.exports=i.p+"img/riverFlow.9477b378.gif"},e381:function(t,e,i){"use strict";var s=i("8b2e"),a=i.n(s);a.a},ea7f:function(t,e,i){var s={"./river.jpg":"379f","./riverFlow.gif":"e155","./titleFlow.jpg":"395b"};function a(t){var e=o(t);return i(e)}function o(t){if(!i.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}a.keys=function(){return Object.keys(s)},a.resolve=o,t.exports=a,a.id="ea7f"}}]);