(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37a58ed9"],{9114:function(e,r,a){"use strict";var t=a("a606"),i=a.n(t);i.a},a606:function(e,r,a){},b67c:function(e,r,a){e.exports=a.p+"basico.pdf"},f71c:function(e,r,a){"use strict";a.r(r);var t=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"form-section"},[a("div",{staticClass:"header-section"},[e._m(0),a("a",{staticClass:"header-section__help",attrs:{href:e.pdfLink,target:"_blank"}},[a("b-icon",{attrs:{icon:"information-outline",type:"is-primary"}})],1)]),a("b-field",{attrs:{label:"a. ¿El agua del río fluye?"}}),a("b-field",[a("b-radio-button",{attrs:{"native-value":!1,type:"is-danger"},model:{value:e.values.waterFlow,callback:function(r){e.$set(e.values,"waterFlow",r)},expression:"values.waterFlow"}},[a("b-icon",{attrs:{icon:"close"}}),a("span",[e._v("No")])],1),a("b-radio-button",{attrs:{"native-value":!0,type:"is-success"},model:{value:e.values.waterFlow,callback:function(r){e.$set(e.values,"waterFlow",r)},expression:"values.waterFlow"}},[a("b-icon",{attrs:{icon:"check"}}),a("span",[e._v("Si")])],1)],1),a("b-field",{attrs:{label:"b. ¿Es el nivel del agua habitual para la época del año?",message:{"*Hay que seleccionar una opción":e.waterLevelHasErrors},type:{"is-danger":e.waterLevelHasErrors}}},[a("b-select",{attrs:{icon:"arrow-expand-vertical",placeholder:"Seleccione una opción"},model:{value:e.values.waterLevel,callback:function(r){e.$set(e.values,"waterLevel",r)},expression:"values.waterLevel"}},e._l(e.formBasic.data.waterLevelOptions,(function(r,t){return a("option",{key:t,domProps:{value:r}},[e._v(e._s(r.name))])})),0)],1),a("b-field",{attrs:{label:"Si hay algún problema crítico, intenta explicar su causa:"}},[a("b-input",{attrs:{maxlength:"200",type:"textarea"},model:{value:e.values.waterLevelCriticalProblem,callback:function(r){e.$set(e.values,"waterLevelCriticalProblem",r)},expression:"values.waterLevelCriticalProblem"}})],1),a("b-field",{attrs:{label:"c. Anchura media del cauce (m)",message:{"*Hay que seleccionar una opción":e.riverBedWidthHasErrors},type:{"is-danger":e.riverBedWidthHasErrors}}},[a("b-select",{attrs:{icon:"arrow-expand-horizontal",placeholder:"Seleccione una opción"},model:{value:e.values.riverBedWidth,callback:function(r){e.$set(e.values,"riverBedWidth",r)},expression:"values.riverBedWidth"}},e._l(e.formBasic.data.riverBedWidthOptions,(function(r,t){return a("option",{key:t,domProps:{value:r}},[e._v(e._s(r.name))])})),0)],1),a("b-field",{attrs:{label:"d. Profundidad media del cauce (cm)",message:{"*Hay que seleccionar una opción":e.riverBedDepthHasErrors},type:{"is-danger":e.riverBedDepthHasErrors},riverSideWidthHasErrors:""}},[a("b-select",{attrs:{icon:"arrow-expand-down",placeholder:"Seleccione una opción"},model:{value:e.values.riverBedDepth,callback:function(r){e.$set(e.values,"riverBedDepth",r)},expression:"values.riverBedDepth"}},e._l(e.formBasic.data.riverBedDepthOptions,(function(r,t){return a("option",{key:t,domProps:{value:r}},[e._v(e._s(r.name))])})),0)],1),a("b-field",{attrs:{label:"e. Anchura media de la zona de ribera (m)"}}),a("div",{staticClass:"two-controls"},[a("b-field",{attrs:{label:"Izquierda",message:{"*Hay que seleccionar una opción":e.riverSideWidthLeftHasErrors},type:{"is-danger":e.riverSideWidthLeftHasErrors},"custom-class":"is-small"}},[a("b-select",{attrs:{icon:"arrow-expand-horizontal",placeholder:"Seleccione una opción"},model:{value:e.values.riverSideWidthLeft,callback:function(r){e.$set(e.values,"riverSideWidthLeft",r)},expression:"values.riverSideWidthLeft"}},e._l(e.formBasic.data.riverSideWidthOptions,(function(r,t){return a("option",{key:t,domProps:{value:r}},[e._v(e._s(r.name))])})),0)],1),a("b-field",{attrs:{label:"Derecha",message:{"*Hay que seleccionar una opción":e.riverSideWidthRightHasErrors},type:{"is-danger":e.riverSideWidthRightHasErrors},"custom-class":"is-small"}},[a("b-select",{attrs:{icon:"arrow-expand-horizontal",placeholder:"Seleccione una opción"},model:{value:e.values.riverSideWidthRight,callback:function(r){e.$set(e.values,"riverSideWidthRight",r)},expression:"values.riverSideWidthRight"}},e._l(e.formBasic.data.riverSideWidthOptions,(function(r,t){return a("option",{key:t,domProps:{value:r}},[e._v(e._s(r.name))])})),0)],1)],1),a("b-field",{attrs:{label:"f. ¿Que color tiene el agua?"}},[a("b-select",{attrs:{icon:"invert-colors"},model:{value:e.values.waterColor,callback:function(r){e.$set(e.values,"waterColor",r)},expression:"values.waterColor"}},e._l(e.formBasic.data.waterColorOptions,(function(r,t){return a("option",{key:t,domProps:{value:r}},[e._v(e._s(r.name))])})),0)],1),a("b-field",{attrs:{label:"g. ¿Que olor tiene el agua?"}},[a("b-select",{attrs:{icon:"grain"},model:{value:e.values.waterSmell,callback:function(r){e.$set(e.values,"waterSmell",r)},expression:"values.waterSmell"}},e._l(e.formBasic.data.waterSmellOptions,(function(r,t){return a("option",{key:t,domProps:{value:r}},[e._v(e._s(r.name))])})),0)],1),a("b-field",{attrs:{label:"h. Existen..."}}),a("div",{staticClass:"block"},e._l(e.formBasic.data.waterElementsOptions,(function(r,t){return a("b-checkbox",{key:t,attrs:{"native-value":r},model:{value:e.values.waterElements,callback:function(r){e.$set(e.values,"waterElements",r)},expression:"values.waterElements"}},[e._v(" "+e._s(r.name)+" ")])})),1),a("b-field",{attrs:{label:"i. ¿En que condiciones se encuentran las márgenes de nuestro río?",message:{"*Selecciona las condiciones en cada margen del río":e.riverConditionsHasErrors},type:"is-danger"}}),e._m(1),e._l(e.formBasic.data.riverMarginConditionOptions,(function(r,t){return a("div",{key:t,staticClass:"checkboxes-rows"},[a("b-checkbox",{attrs:{"native-value":r},model:{value:e.values.riverMarginConditionsLeft,callback:function(r){e.$set(e.values,"riverMarginConditionsLeft",r)},expression:"values.riverMarginConditionsLeft"}}),a("b-checkbox",{attrs:{"native-value":r},model:{value:e.values.riverMarginConditionsRight,callback:function(r){e.$set(e.values,"riverMarginConditionsRight",r)},expression:"values.riverMarginConditionsRight"}}),e._v(" "+e._s(r.name)+" ")],1)})),a("div",{staticClass:"checks-container"},[a("b-field",{attrs:{label:"j. ¿Cuáles son los usos del suelo en las márgenes del río?",message:{"*Selecciona al menos un uso del suelo en cada margen":e.landUseHasErrors},type:"is-danger"}}),e._m(2),e._l(e.formBasic.data.riverMarginLandUseOptions,(function(r,t){return a("div",{key:t,staticClass:"checkboxes-rows"},[a("b-checkbox",{attrs:{"native-value":r},model:{value:e.values.riverMarginLandUseLeft,callback:function(r){e.$set(e.values,"riverMarginLandUseLeft",r)},expression:"values.riverMarginLandUseLeft"}}),a("b-checkbox",{attrs:{"native-value":r},model:{value:e.values.riverMarginLandUseRight,callback:function(r){e.$set(e.values,"riverMarginLandUseRight",r)},expression:"values.riverMarginLandUseRight"}}),e._v(" "+e._s(r.name)+" ")],1)}))],2)],2)},i=[function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("h5",{staticClass:"title is-5 header-section__text"},[a("span",[e._v("1. Inspección Básica del Tramo (500m)")])])},function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"checkboxes-rows"},[a("label",{staticClass:"checkboxes-rows__title"},[e._v("izq.")]),a("label",{staticClass:"checkboxes-rows__title"},[e._v("der.")])])},function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"checkboxes-rows"},[a("label",{staticClass:"checkboxes-rows__title"},[e._v("izq.")]),a("label",{staticClass:"checkboxes-rows__title"},[e._v("der.")])])}],s=(a("a4d3"),a("4de4"),a("e439"),a("dbb4"),a("b64b"),a("d3b7"),a("159b"),a("ddb0"),a("ade3")),n=a("2f62");function l(e,r){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?l(Object(a),!0).forEach((function(r){Object(s["a"])(e,r,a[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))}))}return e}var c={data:function(){return{pdfLink:a("b67c"),values:{waterFlow:!0,waterLevel:null,waterColor:"",waterSmell:"",waterElements:[],waterLevelCriticalProblem:"",riverBedWidth:null,riverBedDepth:null,riverSideWidthLeft:null,riverSideWidthRight:null,riverMarginConditionsLeft:[],riverMarginConditionsRight:[],riverMarginLandUseLeft:[],riverMarginLandUseRight:[]}}},computed:o({},Object(n["d"])({formBasic:function(e){return e.formSections.basic}}),{landUseHasErrors:function(){return 0===this.values.riverMarginLandUseLeft.length||0===this.values.riverMarginLandUseRight.length},riverConditionsHasErrors:function(){return 0===this.values.riverMarginConditionsLeft.length||0===this.values.riverMarginConditionsRight.length},waterLevelHasErrors:function(){return null===this.values.waterLevel},riverBedWidthHasErrors:function(){return null===this.values.riverBedWidth},riverBedDepthHasErrors:function(){return null===this.values.riverBedDepth},riverSideWidthRightHasErrors:function(){return null===this.values.riverSideWidthRight},riverSideWidthLeftHasErrors:function(){return null===this.values.riverSideWidthLeft},isSectionValid:function(){return!this.landUseHasErrors&&!this.riverConditionsHasErrors&&!this.waterLevelHasErrors&&!this.riverBedWidthHasErrors&&!this.riverBedDepthHasErrors&&!this.riverSideWidthRightHasErrors&&!this.riverSideWidthLeftHasErrors}}),mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificSectionValues({name:"basic",values:this.values,isValid:this.isSectionValid})},methods:o({},Object(n["b"])({updateSpecificSectionValues:"updateSpecificSectionValues"}),{init:function(){this.values.waterColor=this.formBasic.data.waterColorOptions[0],this.values.waterSmell=this.formBasic.data.waterSmellOptions[0]}})},u=c,d=(a("9114"),a("2877")),v=Object(d["a"])(u,t,i,!1,null,"9fefcf96",null);r["default"]=v.exports}}]);
//# sourceMappingURL=chunk-37a58ed9.08d6f528.js.map