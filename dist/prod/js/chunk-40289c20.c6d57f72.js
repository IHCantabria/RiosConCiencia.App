(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40289c20"],{"04b4":function(t,i,e){t.exports=e.p+"img/blueWidth.fcbc3504.jpg"},"3cd7":function(t,i,e){"use strict";var s=e("6e43"),a=e.n(s);a.a},5847:function(t,i,e){t.exports=e.p+"img/helpWidth3.163f199d.jpg"},6710:function(t,i,e){t.exports=e.p+"img/redWidth.f94c141c.jpg"},"6e43":function(t,i,e){},"7ad6":function(t,i,e){t.exports=e.p+"img/turquoiseWidth.42d4e0f9.jpg"},"81e5":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"form-section form-section-picts"},[e("div",{staticClass:"header-section"},[t._m(0),e("div",{staticClass:"header-section__help",on:{click:function(i){return t.$_toggleHelp()}}},[e("b-icon",{attrs:{icon:"information-outline",type:"is-info"}})],1)]),e("b-field",{directives:[{name:"show",rawName:"v-show",value:t.isHelpActive,expression:"isHelpActive"}],attrs:{message:"Para medir la distancia del río, utilizaremos una cuerda de colores. Cada color representa un tramo de distancia. Es necesario la participación de 2 personas. Nos situaremos cada una a un lado de la cuerda. Finalmente, miraremos qué distancia completa el color."}}),e("div",{staticClass:"block guide-section"},[e("div",{staticClass:"guide-step"},[e("img",{attrs:{src:t.$_getImgUrl(t.formWidth.id,0,1)}}),e("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("ESTO ES UNA CUERDA DE COLORES ")])],1),e("div",{staticClass:"guide-step"},[e("img",{attrs:{src:t.$_getImgUrl(t.formWidth.id,0,2)}}),e("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("MEDIMOS LA DISTANCIA DEL RÍO ")])],1),e("div",{staticClass:"guide-step"},[e("img",{attrs:{src:t.$_getImgUrl(t.formWidth.id,0,3)}}),e("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("MIRAMOS EL COLOR DE LA CUERDA ")])],1)]),e("div",{staticClass:"img-header"},[e("img",{staticClass:"img-header__pic",attrs:{src:t.$_getImgUrl(t.formWidth.id,0,0)}}),e("b-icon",{staticClass:"img-header__icon",attrs:{icon:"checkbox-marked-circle-outline",type:"is-info"}})],1),e("b-field",{staticClass:"img-section"},t._l(t.formWidth.data.widthRiverOptions,(function(i){return e("div",{key:i.id,staticClass:"img-container"},[e("span",{staticClass:"img-option-text"},[t._v(t._s(t._f("upperCase")(i.color)))]),e("b-radio-button",{staticClass:"img-option",attrs:{"native-value":i},model:{value:t.values.waterWidth,callback:function(i){t.$set(t.values,"waterWidth",i)},expression:"values.waterWidth"}},[e("img",{class:t.isSelected(i)?"img-option__active":"img-option__inactive",attrs:{src:t.$_getImgUrl(t.formWidth.id,i.id,1)}}),e("div",{class:["overlay",t.isSelected(i)?"overlay__active":"overlay__inactive"]})])],1)})),0)],1)},a=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("h5",{staticClass:"title is-5 header-section__text"},[e("span",[t._v("MEDIMOS LA DISTANCIA DEL RÍO")])])}],n=(e("d3b7"),e("ddb0"),e("5530")),c=e("2f62"),o=e("ce86"),r={data:function(){return{values:{waterWidth:0}}},mixins:[o["a"]],computed:Object(n["a"])({},Object(c["d"])({formWidth:function(t){return t.formPictsSections.width}}),{isSectionValid:function(){return!0}}),created:function(){this.imgFolder=e("eb6f")},mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificPictsSectionValues({name:"width",values:this.values,isValid:this.isSectionValid})},methods:Object(n["a"])({},Object(c["b"])({updateSpecificPictsSectionValues:"updateSpecificPictsSectionValues"}),{init:function(){this.values.waterWidth=null},isSelected:function(t){return this.values.waterWidth==t}})},d=r,l=(e("3cd7"),e("2877")),u=Object(l["a"])(d,s,a,!1,null,"1a9da002",null);i["default"]=u.exports},"86b6":function(t,i,e){t.exports=e.p+"img/greenWidth.27289f70.jpg"},a839:function(t,i,e){t.exports=e.p+"img/titleWidth.e9e1079e.jpg"},ba19:function(t,i,e){t.exports=e.p+"img/helpWidth2.26d4139b.jpg"},ce86:function(t,i,e){"use strict";e.d(i,"a",(function(){return a}));var s=e("fa7d"),a={data:function(){return{imgFolder:null,helpActive:!1}},computed:{isHelpActive:function(){return this.helpActive}},methods:{$_getImgUrl:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.imgFolder?this.imgFolder("./".concat(Object(s["b"])(t,i,e))):""},$_toggleHelp:function(){this.helpActive=!this.helpActive}}}},e2b5:function(t,i,e){t.exports=e.p+"img/helpWidth1.2615e191.jpg"},eb6f:function(t,i,e){var s={"./blueWidth.jpg":"04b4","./greenWidth.jpg":"86b6","./helpWidth1.jpg":"e2b5","./helpWidth2.jpg":"ba19","./helpWidth3.jpg":"5847","./redWidth.jpg":"6710","./titleWidth.jpg":"a839","./turquoiseWidth.jpg":"7ad6","./yellowWidth.jpg":"f159"};function a(t){var i=n(t);return e(i)}function n(t){if(!e.o(s,t)){var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}return s[t]}a.keys=function(){return Object.keys(s)},a.resolve=n,t.exports=a,a.id="eb6f"},f159:function(t,i,e){t.exports=e.p+"img/yellowWidth.31a838a2.jpg"}}]);
//# sourceMappingURL=chunk-40289c20.c6d57f72.js.map