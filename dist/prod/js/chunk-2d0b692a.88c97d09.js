(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b692a"],{"1e77":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-section"},[a("h5",{staticClass:"title is-5"},[e._v("0. Datos Iniciales")]),a("b-field",{attrs:{label:"Nombre del responsable"}},[a("label",[e._v(e._s(e.user.name))])]),a("b-field",{attrs:{label:"Acompañantes"}},[a("b-input",{model:{value:e.values.partners,callback:function(t){e.$set(e.values,"partners",t)},expression:"values.partners"}})],1),a("b-field",{attrs:{label:"Tramo",message:{"*Hay que seleccionar un tramo":e.riverSectionHasErrors},type:{"is-danger":e.riverSectionHasErrors}}},[a("b-select",{attrs:{icon:"go-kart-track",placeholder:"Seleccione Tramo"},model:{value:e.values.riverSection,callback:function(t){e.$set(e.values,"riverSection",t)},expression:"values.riverSection"}},e._l(e.userRiverSections,(function(t){return a("option",{key:t.id,domProps:{value:t}},[e._v(e._s(t.name))])})),0)],1),a("b-field",{attrs:{label:"Cuenca / Municipio"}},[e.values.riverSection?a("label",[e._v(e._s(e.values.riverSection.catchment)+" / "+e._s(e.values.riverSection.municipality))]):a("label",[e._v("-")])]),a("b-field",{attrs:{label:"Clima hoy",message:{"*Hay que seleccionar una opción":e.weatherHasErrors},type:{"is-danger":e.weatherHasErrors}}},[a("b-select",{attrs:{icon:"weather-lightning-rainy",placeholder:"Seleccione una opción"},model:{value:e.values.weatherToday,callback:function(t){e.$set(e.values,"weatherToday",t)},expression:"values.weatherToday"}},e._l(e.formInit.data.weatherOptions,(function(t){return a("option",{key:t.id,domProps:{value:t}},[e._v(e._s(t.name))])})),0)],1),a("b-field",{attrs:{label:"Clima últimos 2 días",message:{"*Hay que seleccionar una opción":e.weather48HasErrors},type:{"is-danger":e.weather48HasErrors}}},[a("b-select",{attrs:{icon:"weather-lightning-rainy",placeholder:"Seleccione una opción"},model:{value:e.values.weather48h,callback:function(t){e.$set(e.values,"weather48h",t)},expression:"values.weather48h"}},e._l(e.formInit.data.weatherOptions,(function(t){return a("option",{key:t.id,domProps:{value:t}},[e._v(e._s(t.name))])})),0)],1)],1)},i=[],n=(a("d3b7"),a("ddb0"),a("5530")),s=a("2f62"),l={computed:Object(n["a"])({},Object(s["d"])({user:function(e){return e.user},formInit:function(e){return e.formSections.init},userRiverSections:function(e){return e.userRiverSections}}),{riverSectionHasErrors:function(){return null===this.values.riverSection},weatherHasErrors:function(){return null===this.values.weatherToday},weather48HasErrors:function(){return null===this.values.weather48h},isSectionValid:function(){return!this.weatherHasErrors&&!this.weather48HasErrors&&!this.riverSectionHasErrors}}),mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificSectionValues({name:"init",values:this.values,isValid:this.isSectionValid})},data:function(){return{values:{partners:null,riverSection:null,weatherToday:null,weather48h:null}}},methods:Object(n["a"])({},Object(s["b"])({updateSpecificSectionValues:"updateSpecificSectionValues"}),{init:function(){this.values.partners=""}})},o=l,c=a("2877"),u=Object(c["a"])(o,r,i,!1,null,"12160419",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0b692a.88c97d09.js.map