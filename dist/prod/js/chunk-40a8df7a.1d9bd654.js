(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40a8df7a"],{"1d26":function(i,e,t){"use strict";var a=t("cc0e"),s=t.n(a);s.a},"64e2":function(i,e,t){i.exports=t.p+"diagnostico.pdf"},a19c:function(i,e,t){"use strict";t.r(e);var a=function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("div",{staticClass:"form-section"},[t("div",{staticClass:"header-section"},[i._m(0),t("a",{staticClass:"header-section__help",attrs:{href:i.pdfLink,target:"_blank"}},[t("b-icon",{attrs:{icon:"information-outline",type:"is-primary"}})],1)]),t("b-field",{attrs:{message:{"*Seleccione una opción":i.bioQualityHasErrors},type:{"is-danger":i.bioQualityHasErrors}}},[t("b-select",{attrs:{placeholder:"Selecciona calidad biológica del agua",icon:"thumbs-up-down",expanded:""},model:{value:i.values.bioQualityIndex,callback:function(e){i.$set(i.values,"bioQualityIndex",e)},expression:"values.bioQualityIndex"}},i._l(i.formBiological.data.bioQualityOptions,(function(e,a){return t("option",{key:a,domProps:{value:e}},[i._v(" "+i._s(e.name))])})),0)],1),null!==i.values.bioQualityIndex?t("div",{staticClass:"results"},[t("div",{staticClass:"block"},[t("b-message",{staticClass:"results-display",attrs:{title:i.values.bioQualityIndex.name,type:"is-info",closable:!1}},[i._v(" "+i._s(i.values.bioQualityIndex.description)+" "),t("div",{staticClass:"results__rate"},[t("b-rate",{attrs:{"icon-pack":"mdi",icon:"star",size:"is-medium","show-text":!1,disabled:!0},model:{value:i.values.bioQualityIndex.value,callback:function(e){i.$set(i.values.bioQualityIndex,"value",e)},expression:"values.bioQualityIndex.value"}})],1)])],1)]):i._e()],1)},s=[function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("h5",{staticClass:"title is-5 header-section__text"},[t("span",[i._v("6. Calidad Biológica del Agua")])])}],l=(t("d3b7"),t("ddb0"),t("5530")),n=t("2f62"),o={data:function(){return{pdfLink:t("64e2"),values:{bioQualityIndex:0}}},computed:Object(l["a"])({},Object(n["d"])({formBiological:function(i){return i.formSections.biological}}),{bioQualityHasErrors:function(){return null===this.values.bioQualityIndex},isSectionValid:function(){return!this.bioQualityHasErrors}}),mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificSectionValues({name:"biological",values:this.values,isValid:this.isSectionValid})},methods:Object(l["a"])({},Object(n["b"])({updateSpecificSectionValues:"updateSpecificSectionValues"}),{init:function(){this.values.bioQualityIndex=null}})},c=o,u=(t("1d26"),t("2877")),d=Object(u["a"])(c,a,s,!1,null,"cd74cc2a",null);e["default"]=d.exports},cc0e:function(i,e,t){}}]);
//# sourceMappingURL=chunk-40a8df7a.1d9bd654.js.map