(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9834842"],{"135f":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-section"},[a("div",{staticClass:"header-section"},[e._m(0),a("div",{staticClass:"header-section__help"},[a("a",{staticClass:"header-section__help-item",attrs:{href:e.pdfLink,target:"_blank"}},[a("b-icon",{attrs:{icon:"information-outline",type:"is-primary"}})],1),a("a",{staticClass:"header-section__help-item",attrs:{href:e.pdfLink2,target:"_blank"}},[a("b-icon",{attrs:{icon:"book-information-variant",type:"is-primary"}})],1)])]),a("b-field",{attrs:{label:"a. Estructura de las riberas, grado de naturalidad"}}),a("b-field",{attrs:{message:{"*Hay que seleccionar una opción":e.naturalnessHasErrors},type:{"is-danger":e.naturalnessHasErrors}}},[a("b-select",{attrs:{icon:"tree",placeholder:"Seleccione una opción"},model:{value:e.values.riverbankNaturalness,callback:function(t){e.$set(e.values,"riverbankNaturalness",t)},expression:"values.riverbankNaturalness"}},e._l(e.formRiverQuality.data.riverbankNaturalnessOptions,(function(t,i){return a("option",{key:i,domProps:{value:t}},[e._v(e._s(t.name))])})),0)],1),a("b-field",{attrs:{label:"b. Conexión con las formas vegetales adyacentes"}}),a("b-field",{attrs:{message:{"*Hay que seleccionar una opción":e.connectionsHasErrors},type:{"is-danger":e.connectionsHasErrors}}},[a("b-select",{attrs:{icon:"transition",placeholder:"Seleccione una opción"},model:{value:e.values.riverbankConections,callback:function(t){e.$set(e.values,"riverbankConections",t)},expression:"values.riverbankConections"}},e._l(e.formRiverQuality.data.riverbankConectionsOptions,(function(t,i){return a("option",{key:i,domProps:{value:t}},[e._v(e._s(t.name))])})),0)],1),a("b-field",{attrs:{label:"c. Continuidad de la vegetación"}}),a("b-field",{attrs:{message:{"*Hay que seleccionar una opción":e.vegetationsHasErrors},type:{"is-danger":e.vegetationsHasErrors}}},[a("b-select",{attrs:{icon:"transit-connection",placeholder:"Seleccione una opción"},model:{value:e.values.riverbankVegetations,callback:function(t){e.$set(e.values,"riverbankVegetations",t)},expression:"values.riverbankVegetations"}},e._l(e.formRiverQuality.data.riverbankVegetationsOptions,(function(t,i){return a("option",{key:i,domProps:{value:t}},[e._v(e._s(t.name))])})),0)],1),e.isSectionValid?a("div",[a("b-field",{attrs:{label:"d. Valor del QRISI"}}),a("div",{staticClass:"results"},[a("div",{staticClass:"block"},[a("b-message",{staticClass:"results-display",attrs:{title:e.qrisiIndex.cat.name,type:"is-info",closable:!1}},[e._v(" "+e._s(e.qrisiIndex.cat.description)+" "),a("div",{staticClass:"results__rate"},[a("b-rate",{attrs:{"icon-pack":"mdi",icon:"star",max:3,size:"is-medium","show-text":!1,disabled:!0},model:{value:e.qrisiIndex.cat.value,callback:function(t){e.$set(e.qrisiIndex.cat,"value",t)},expression:"qrisiIndex.cat.value"}})],1)])],1)])],1):e._e()],1)},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("h5",{staticClass:"title is-5 header-section__text"},[a("span",[e._v("7. Calidad del Bosque de Ribera (QRISI)")])])}],n=(a("d3b7"),a("ddb0"),a("5530")),r=a("2f62"),o={data:function(){return{pdfLink:null,pdfLink2:null,values:{riverbankNaturalness:0,riverbankConections:null,riverbankVegetations:null}}},created:function(){this.pdfLink=a("cd6e"),this.pdfLink2=a("3f41")},computed:Object(n["a"])({},Object(r["d"])({formRiverQuality:function(e){return e.formExpertSections.riverQuality}}),{qrisiIndexTotalPoints:function(){return this.isSectionValid?parseInt(this.values.riverbankNaturalness.value)+parseInt(this.values.riverbankVegetations.value)+parseInt(this.values.riverbankConections.value):0},qrisiIndex:function(){return{cat:this.getRiverQualityCategory(this.qrisiIndexTotalPoints),totalPoints:this.qrisiIndexTotalPoints}},naturalnessHasErrors:function(){return null===this.values.riverbankNaturalness},vegetationsHasErrors:function(){return null===this.values.riverbankVegetations},connectionsHasErrors:function(){return null===this.values.riverbankConections},isSectionValid:function(){return!this.naturalnessHasErrors&&!this.vegetationsHasErrors&&!this.connectionsHasErrors}}),mounted:function(){this.init()},beforeUpdate:function(){this.values.qrisiIndex=this.qrisiIndex,this.updateSpecificExpertSectionValues({name:"riverQuality",values:this.values,isValid:this.isSectionValid})},methods:Object(n["a"])({},Object(r["b"])({updateSpecificExpertSectionValues:"updateSpecificExpertSectionValues"}),{init:function(){this.values.riverbankNaturalness=null},getRiverQualityCategory:function(e){return e<=4?this.formRiverQuality.data.qrisiCategoriesOptions[2]:e>4&&e<=8?this.formRiverQuality.data.qrisiCategoriesOptions[1]:this.formRiverQuality.data.qrisiCategoriesOptions[0]}})},l=o,c=(a("5d8e"),a("2877")),u=Object(c["a"])(l,i,s,!1,null,"4302f657",null);t["default"]=u.exports},"3f41":function(e,t,a){e.exports=a.p+"pdfs/fichaQRISI2019.pdf"},"5d8e":function(e,t,a){"use strict";var i=a("716a"),s=a.n(i);s.a},"716a":function(e,t,a){},cd6e:function(e,t,a){e.exports=a.p+"pdfs/ribera.pdf"}}]);