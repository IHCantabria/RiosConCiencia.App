(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2461d300"],{"18b1":function(t,e,i){t.exports=i.p+"img/titleDepth.54288626.jpg"},"2c9a":function(t,e,i){t.exports=i.p+"img/yellowDepth.5e117ba5.jpg"},4127:function(t,e,i){"use strict";var s=i("b430"),a=i.n(s);a.a},"658e":function(t,e,i){t.exports=i.p+"img/helpDepth3.f72a21a1.jpg"},"75c1":function(t,e,i){t.exports=i.p+"img/blueDepth.0b4dd207.jpg"},7983:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"form-section form-section-picts"},[i("div",{staticClass:"header-section"},[t._m(0),i("div",{staticClass:"header-section__help",on:{click:function(e){return t.$_toggleHelp()}}},[i("b-icon",{attrs:{icon:"information-outline",type:"is-info"}})],1)]),i("b-field",{directives:[{name:"show",rawName:"v-show",value:t.isHelpActive,expression:"isHelpActive"}],attrs:{message:"Para medir la profundidad del río, utilizaremos un palo de colores. Cada color representa un tramo de profundidad. Meteremos el palo en el río y observaremos hasta qué color se moja el palo."}}),i("div",{staticClass:"block guide-section"},[i("div",{staticClass:"guide-step"},[i("img",{attrs:{src:t.$_getImgUrl(t.formDepth.id,0,1)}}),i("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("ESTO ES UNA PALO DE COLORES ")])],1),i("div",{staticClass:"guide-step"},[i("img",{attrs:{src:t.$_getImgUrl(t.formDepth.id,0,2)}}),i("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("METEMOS EL PALO EN EL RÍO ")])],1),i("div",{staticClass:"guide-step"},[i("img",{attrs:{src:t.$_getImgUrl(t.formDepth.id,0,3)}}),i("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("MIRAMOS EL COLOR DEL PALO")])],1)]),i("div",{staticClass:"img-header"},[i("img",{staticClass:"img-header__pic",attrs:{src:t.$_getImgUrl(t.formDepth.id,0,0)}}),i("b-icon",{staticClass:"img-header__icon",attrs:{icon:"checkbox-marked-circle-outline",type:"is-info"}})],1),i("b-field",{staticClass:"img-section"},t._l(t.formDepth.data.depthRiverOptions,(function(e){return i("div",{key:e.id,staticClass:"img-container"},[i("span",{staticClass:"img-option-text"},[t._v(t._s(t._f("upperCase")(e.color)))]),i("b-radio-button",{staticClass:"img-option",attrs:{"native-value":e},model:{value:t.values.waterDepth,callback:function(e){t.$set(t.values,"waterDepth",e)},expression:"values.waterDepth"}},[i("img",{class:t.isSelected(e)?"img-option__active":"img-option__inactive",attrs:{src:t.$_getImgUrl(t.formDepth.id,e.id,1)}}),i("div",{class:["overlay",t.isSelected(e)?"overlay__active":"overlay__inactive"]})])],1)})),0)],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h5",{staticClass:"title is-5 header-section__text"},[i("span",[t._v("MEDIMOS LA PROFUNDIDAD DEL RÍO")])])}],n=(i("d3b7"),i("ddb0"),i("5530")),o=i("2f62"),c=i("ce86"),r={data:function(){return{values:{waterDepth:0}}},mixins:[c["a"]],computed:Object(n["a"])({},Object(o["d"])({formDepth:function(t){return t.formPictsSections.depth}}),{isSectionValid:function(){return!0}}),created:function(){this.imgFolder=i("fa86")},mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificPictsSectionValues({name:"depth",values:this.values,isValid:this.isSectionValid})},methods:Object(n["a"])({},Object(o["b"])({updateSpecificPictsSectionValues:"updateSpecificPictsSectionValues"}),{init:function(){this.values.waterDepth=null},isSelected:function(t){return this.values.waterDepth==t}})},p=r,l=(i("4127"),i("2877")),u=Object(l["a"])(p,s,a,!1,null,"766f2a4a",null);e["default"]=u.exports},8427:function(t,e,i){t.exports=i.p+"img/greenDepth.6d4b83e1.jpg"},9546:function(t,e,i){t.exports=i.p+"img/helpDepth1.2294cbab.jpg"},aca9:function(t,e,i){t.exports=i.p+"img/redDepth.d0b58317.jpg"},b430:function(t,e,i){},ce86:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var s=i("fa7d"),a={data:function(){return{imgFolder:null,helpActive:!1}},computed:{isHelpActive:function(){return this.helpActive}},methods:{$_getImgUrl:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.imgFolder?this.imgFolder("./".concat(Object(s["b"])(t,e,i))):""},$_toggleHelp:function(){this.helpActive=!this.helpActive}}}},e2c4:function(t,e,i){t.exports=i.p+"img/helpDepth2.6688e761.jpg"},fa86:function(t,e,i){var s={"./blueDepth.jpg":"75c1","./greenDepth.jpg":"8427","./helpDepth1.jpg":"9546","./helpDepth2.jpg":"e2c4","./helpDepth3.jpg":"658e","./redDepth.jpg":"aca9","./titleDepth.jpg":"18b1","./yellowDepth.jpg":"2c9a"};function a(t){var e=n(t);return i(e)}function n(t){if(!i.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}a.keys=function(){return Object.keys(s)},a.resolve=n,t.exports=a,a.id="fa86"}}]);
//# sourceMappingURL=chunk-2461d300.75c1ecd3.js.map