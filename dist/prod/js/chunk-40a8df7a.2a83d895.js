(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40a8df7a"],{"1d26":function(e,t,i){"use strict";var a=i("cc0e"),s=i.n(a);s.a},"64e2":function(e,t,i){e.exports=i.p+"diagnostico.pdf"},a19c:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"form-section"},[i("div",{staticClass:"header-section"},[e._m(0),i("a",{staticClass:"header-section__help",attrs:{href:e.pdfLink,target:"_blank"}},[i("b-icon",{attrs:{icon:"information-outline",type:"is-primary"}})],1)]),i("b-field",{attrs:{message:{"*Seleccione una opción":e.bioQualityHasErrors},type:{"is-danger":e.bioQualityHasErrors}}},[i("b-select",{attrs:{placeholder:"Selecciona calidad biológica del agua",icon:"thumbs-up-down",expanded:""},model:{value:e.values.bioQualityIndex,callback:function(t){e.$set(e.values,"bioQualityIndex",t)},expression:"values.bioQualityIndex"}},e._l(e.formBiological.data.bioQualityOptions,(function(t,a){return i("option",{key:a,domProps:{value:t}},[e._v(" "+e._s(t.name))])})),0)],1),null!==e.values.bioQualityIndex?i("div",{staticClass:"results"},[i("div",{staticClass:"block"},[i("b-message",{staticClass:"results-display",attrs:{title:e.values.bioQualityIndex.name,type:"is-info",closable:!1}},[e._v(" "+e._s(e.values.bioQualityIndex.description)+" "),i("div",{staticClass:"results__rate"},[i("b-rate",{attrs:{"icon-pack":"mdi",icon:"star",size:"is-medium","show-text":!1,disabled:!0},model:{value:e.values.bioQualityIndex.value,callback:function(t){e.$set(e.values.bioQualityIndex,"value",t)},expression:"values.bioQualityIndex.value"}})],1)])],1)]):e._e()],1)},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("h5",{staticClass:"title is-5 header-section__text"},[i("span",[e._v("6. Calidad Biológica del Agua")])])}],n=(i("a4d3"),i("4de4"),i("e439"),i("dbb4"),i("b64b"),i("d3b7"),i("159b"),i("ddb0"),i("ade3")),o=i("2f62");function l(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function c(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?l(Object(i),!0).forEach((function(t){Object(n["a"])(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var r={data:function(){return{pdfLink:i("64e2"),values:{bioQualityIndex:0}}},computed:c({},Object(o["d"])({formBiological:function(e){return e.formSections.biological}}),{bioQualityHasErrors:function(){return null===this.values.bioQualityIndex},isSectionValid:function(){return!this.bioQualityHasErrors}}),mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificSectionValues({name:"biological",values:this.values,isValid:this.isSectionValid})},methods:c({},Object(o["b"])({updateSpecificSectionValues:"updateSpecificSectionValues"}),{init:function(){this.values.bioQualityIndex=null}})},u=r,d=(i("1d26"),i("2877")),b=Object(d["a"])(u,a,s,!1,null,"cd74cc2a",null);t["default"]=b.exports},cc0e:function(e,t,i){}}]);
//# sourceMappingURL=chunk-40a8df7a.2a83d895.js.map