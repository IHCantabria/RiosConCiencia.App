(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38096d15"],{"2a93":function(i,e,t){},"423b":function(i,e,t){"use strict";var a=t("2a93"),s=t.n(a);s.a},"64e2":function(i,e,t){i.exports=t.p+"pdfs/diagnostico.pdf"},b143:function(i,e,t){"use strict";t.r(e);var a=function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("div",{staticClass:"form-section"},[t("div",{staticClass:"header-section"},[i._m(0),t("a",{staticClass:"header-section__help",attrs:{href:i.pdfLink,target:"_blank"}},[t("b-icon",{attrs:{icon:"information-outline",type:"is-primary"}})],1)]),t("b-field",{attrs:{message:{"*Seleccione una opción":i.bioQualityHasErrors},type:{"is-danger":i.bioQualityHasErrors}}},[t("b-select",{attrs:{placeholder:"Selecciona calidad biológica del agua",icon:"thumbs-up-down",expanded:""},model:{value:i.values.bioQualityIndex,callback:function(e){i.$set(i.values,"bioQualityIndex",e)},expression:"values.bioQualityIndex"}},i._l(i.formBiological.data.bioQualityOptions,(function(e,a){return t("option",{key:a,domProps:{value:e}},[i._v(" "+i._s(e.name))])})),0)],1),null!==i.values.bioQualityIndex?t("div",{staticClass:"results"},[t("div",{staticClass:"block"},[t("b-message",{staticClass:"results-display",attrs:{title:i.values.bioQualityIndex.name,type:"is-info",closable:!1}},[i._v(" "+i._s(i.values.bioQualityIndex.description)+" "),t("div",{staticClass:"results__rate"},[t("b-rate",{attrs:{"icon-pack":"mdi",icon:"star",size:"is-medium","show-text":!1,disabled:!0},model:{value:i.values.bioQualityIndex.value,callback:function(e){i.$set(i.values.bioQualityIndex,"value",e)},expression:"values.bioQualityIndex.value"}})],1)])],1)]):i._e()],1)},s=[function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("h5",{staticClass:"title is-5 header-section__text"},[t("span",[i._v("6. Calidad Biológica del Agua")])])}],n=(t("d3b7"),t("ddb0"),t("5530")),l=t("2f62"),o={data:function(){return{pdfLink:null,values:{bioQualityIndex:0}}},created:function(){this.pdfLink=t("64e2")},computed:Object(n["a"])({},Object(l["d"])({formBiological:function(i){return i.formExpertSections.biological}}),{bioQualityHasErrors:function(){return null===this.values.bioQualityIndex},isSectionValid:function(){return!this.bioQualityHasErrors}}),mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificExpertSectionValues({name:"biological",values:this.values,isValid:this.isSectionValid})},methods:Object(n["a"])({},Object(l["b"])({updateSpecificExpertSectionValues:"updateSpecificExpertSectionValues"}),{init:function(){this.values.bioQualityIndex=null}})},u=o,c=(t("423b"),t("2877")),r=Object(c["a"])(u,a,s,!1,null,"45a7c89c",null);e["default"]=r.exports}}]);