(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4285524e"],{"1fc7":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-section"},[a("div",{staticClass:"header-section"},[t._m(0),a("a",{staticClass:"header-section__help",attrs:{href:t.pdfLink,target:"_blank"}},[a("b-icon",{attrs:{icon:"information-outline",type:"is-primary"}})],1)]),a("b-field",{attrs:{label:"a. Grado de inclusión de las piedras, cantos y gravas en rápidos y pozas",message:{"*Hay que seleccionar una opción":t.stonesInPoolsHasErrors},type:{"is-danger":t.stonesInPoolsHasErrors}}},[a("b-select",{attrs:{icon:"gradient",placeholder:"Seleccione una opción"},model:{value:t.values.stonesInPools,callback:function(e){t.$set(t.values,"stonesInPools",e)},expression:"values.stonesInPools"}},t._l(t.formHabitat.data.stonesInPoolsOptions,(function(e,s){return a("option",{key:s,domProps:{value:e}},[t._v(t._s(e.name))])})),0)],1),a("b-field",{attrs:{label:"b. Frecuencia de rápidos",message:{"*Hay que seleccionar una opción":t.rapidsFrequencyHasErrors},type:{"is-danger":t.rapidsFrequencyHasErrors}}},[a("b-select",{attrs:{icon:"waves",placeholder:"Seleccione una opción"},model:{value:t.values.rapidsFrequency,callback:function(e){t.$set(t.values,"rapidsFrequency",e)},expression:"values.rapidsFrequency"}},t._l(t.formHabitat.data.rapidFrequencyOptions,(function(e,s){return a("option",{key:s,domProps:{value:e}},[t._v(t._s(e.name))])})),0)],1),a("b-field",{attrs:{label:"c. Composición del sustrato",message:{"*Hay que seleccionar una opción para cada elemento":t.substrateHasErrors},type:{"is-danger":t.substrateHasErrors}}}),a("div",{staticClass:"block"},t._l(t.values.substrateComposition,(function(e,s){return a("div",{key:s,staticClass:"radio-rows"},[a("div",{staticClass:"radio-rows__label-container"},[t._v(" "+t._s(e.name)+" ")]),a("div",{staticClass:"radio-rows__options-container"},[a("b-field",t._l(t.formHabitat.data.substrateCompositionPresenceOptions,(function(e){return a("b-radio-button",{key:e.id,attrs:{"native-value":e},model:{value:t.values.substrateComposition[s].value,callback:function(e){t.$set(t.values.substrateComposition[s],"value",e)},expression:"values.substrateComposition[index].value"}},[t._v(t._s(e.name))])})),1)],1)])})),0),a("b-field",{attrs:{label:"d. Regímenes de velocidad y profundidad"}}),a("b-taglist",t._l(t.velocityAndDepthTypes,(function(e,s){return a("b-tag",{key:s,attrs:{type:"is-info"}},[t._v(t._s(e))])})),1),a("b-field",{attrs:{message:{"*Hay que seleccionar una opción":t.velocityAndDepthHasErrors},type:{"is-danger":t.velocityAndDepthHasErrors}}},[a("b-select",{attrs:{icon:"format-list-bulleted-type",placeholder:"Seleccione una opción"},model:{value:t.values.velocityAndDepth,callback:function(e){t.$set(t.values,"velocityAndDepth",e)},expression:"values.velocityAndDepth"}},t._l(t.formHabitat.data.velocityAndDepthOptions,(function(e,s){return a("option",{key:s,domProps:{value:e}},[t._v(t._s(e.name))])})),0)],1),a("b-field",{attrs:{label:"e. Sombre en el cauce",message:{"*Hay que seleccionar una opción":t.riverShadowsHasErrors},type:{"is-danger":t.riverShadowsHasErrors}}},[a("b-select",{attrs:{icon:"box-shadow",placeholder:"Seleccione una opción"},model:{value:t.values.riverShadows,callback:function(e){t.$set(t.values,"riverShadows",e)},expression:"values.riverShadows"}},t._l(t.formHabitat.data.riverShadowsOptions,(function(e,s){return a("option",{key:s,domProps:{value:e}},[t._v(t._s(e.name))])})),0)],1),a("b-field",{attrs:{label:"f. Presencia de elementos de heterogeneidad",message:{"*Hay que seleccionar una opción para cada elemento":t.randomElementsHasErrors},type:{"is-danger":t.randomElementsHasErrors}}}),a("div",{staticClass:"block"},t._l(t.values.randomElements,(function(e,s){return a("div",{key:s,staticClass:"radio-rows"},[a("div",{staticClass:"radio-rows__label-container"},[t._v(" "+t._s(e.name)+" ")]),a("div",{staticClass:"radio-rows__options-container"},[1==e.id?[a("b-field",t._l(t.randomElementPresenceOptionsFilter,(function(e){return a("b-radio-button",{key:e.id,staticClass:"radio-rows__options-container-item",attrs:{"native-value":e},model:{value:t.values.randomElements[s].value,callback:function(e){t.$set(t.values.randomElements[s],"value",e)},expression:"values.randomElements[index].value"}},[t._v(t._s(e.name))])})),1)]:[a("b-field",t._l(t.formHabitat.data.randomElementPresenceOptions,(function(e){return a("b-radio-button",{key:e.id,staticClass:"radio-rows__options-container-item",attrs:{"native-value":e},model:{value:t.values.randomElements[s].value,callback:function(e){t.$set(t.values.randomElements[s],"value",e)},expression:"values.randomElements[index].value"}},[t._v(t._s(e.name))])})),1)]],2)])})),0),a("b-field",{attrs:{label:"g. Cobertura de la vegatación acúatica",message:{"*Hay que seleccionar una opción para cada elemento":t.aquaticVegetationHasErrors},type:{"is-danger":t.aquaticVegetationHasErrors}}}),a("div",{staticClass:"block"},t._l(t.values.aquaticVegetation,(function(e,s){return a("div",{key:s,staticClass:"radio-rows"},[a("div",{staticClass:"radio-rows__label-container"},[t._v(" "+t._s(e.name)+" ")]),a("div",{staticClass:"radio-rows__options-container"},[a("b-field",t._l(t.formHabitat.data.aquaticVegetationCoverageOptions,(function(e){return a("b-radio-button",{key:e.id,staticClass:"radio-rows__options-container-item",attrs:{"native-value":e},model:{value:t.values.aquaticVegetation[s].value,callback:function(e){t.$set(t.values.aquaticVegetation[s],"value",e)},expression:"values.aquaticVegetation[index].value"}},[t._v(t._s(e.name))])})),1)],1)])})),0),a("b-field",{attrs:{label:"h. Valor del Índice del Hábitat Fluvial (IHF)"}}),a("div",{staticClass:"results"},[a("div",{staticClass:"block"},[a("b-message",{staticClass:"results-display",attrs:{title:t.habitatIndex.cat.name,type:"is-info",closable:!1}},[t._v(" "+t._s(t.habitatIndex.cat.description)+" "),a("div",{staticClass:"results__rate"},[a("b-rate",{attrs:{"icon-pack":"mdi",icon:"star",max:3,size:"is-medium","show-text":!1,disabled:!0},model:{value:t.habitatIndex.cat.value,callback:function(e){t.$set(t.habitatIndex.cat,"value",e)},expression:"habitatIndex.cat.value"}})],1),a("div",{staticClass:"block"},[t._v(t._s(t.habitatIndexTotalPoints)+" puntos")])])],1)])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h5",{staticClass:"title is-5 header-section__text"},[a("span",[t._v("4. Índice del Hábitat Fluvial (100m)")])])}],r=(a("a4d3"),a("e01a"),a("d28b"),a("4de4"),a("e439"),a("dbb4"),a("b64b"),a("d3b7"),a("e25e"),a("3ca3"),a("159b"),a("ddb0"),a("ade3")),i=a("2f62");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){Object(r["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={data:function(){return{pdfLink:a("3ec7"),values:{stonesInPools:null,substrateComposition:[],rapidsFrequency:null,velocityAndDepth:null,riverShadows:null,randomElements:[],aquaticVegetation:[],habitatIndex:{}},velocityAndDepthTypes:["rápido / profundo","lento / profundo","lento / poco profundo","rápido / poco profundo"]}},computed:l({},Object(i["d"])({formHabitat:function(t){return t.formSections.habitat}}),{randomElementPresenceOptionsFilter:function(){return this.formHabitat.data.randomElementPresenceOptions.filter((function(t){return 2!=t.id}))},substrateCompositionSUM:function(){return this.getTotalPoints(this.values.substrateComposition)},randomElementsSUM:function(){return this.getTotalPoints(this.values.randomElements)},aquaticVegetationSUM:function(){return this.getTotalPoints(this.values.aquaticVegetation)},habitatIndexTotalPoints:function(){return parseInt(this.values.stonesInPools?this.values.stonesInPools.points:0)+parseInt(this.values.rapidsFrequency?this.values.rapidsFrequency.points:0)+parseInt(this.substrateCompositionSUM)+parseInt(this.values.velocityAndDepth?this.values.velocityAndDepth.points:0)+parseInt(this.values.riverShadows?this.values.riverShadows.points:0)+parseInt(this.randomElementsSUM)+parseInt(this.aquaticVegetationSUM)},habitatIndex:function(){return{cat:this.getHabitatCategory(this.habitatIndexTotalPoints),totalPoints:this.habitatIndexTotalPoints}},substrateHasErrors:function(){var t=!0,e=!1,a=void 0;try{for(var s,n=this.values.substrateComposition[Symbol.iterator]();!(t=(s=n.next()).done);t=!0){var r=s.value;if(0===Object.keys(r.value).length)return!0}}catch(i){e=!0,a=i}finally{try{t||null==n.return||n.return()}finally{if(e)throw a}}return!1},randomElementsHasErrors:function(){var t=!0,e=!1,a=void 0;try{for(var s,n=this.values.randomElements[Symbol.iterator]();!(t=(s=n.next()).done);t=!0){var r=s.value;if(0===Object.keys(r.value).length)return!0}}catch(i){e=!0,a=i}finally{try{t||null==n.return||n.return()}finally{if(e)throw a}}return!1},aquaticVegetationHasErrors:function(){var t=!0,e=!1,a=void 0;try{for(var s,n=this.values.aquaticVegetation[Symbol.iterator]();!(t=(s=n.next()).done);t=!0){var r=s.value;if(0===Object.keys(r.value).length)return!0}}catch(i){e=!0,a=i}finally{try{t||null==n.return||n.return()}finally{if(e)throw a}}return!1},stonesInPoolsHasErrors:function(){return null===this.values.stonesInPools},rapidsFrequencyHasErrors:function(){return null===this.values.rapidsFrequency},velocityAndDepthHasErrors:function(){return null===this.values.velocityAndDepth},riverShadowsHasErrors:function(){return null===this.values.riverShadows},isSectionValid:function(){return!this.substrateHasErrors&&!this.randomElementsHasErrors&&!this.stonesInPoolsHasErrors&&!this.rapidsFrequencyHasErrors&&!this.velocityAndDepthHasErrors&&!this.riverShadowsHasErrors&&!this.aquaticVegetationHasErrors}}),mounted:function(){this.init()},beforeUpdate:function(){this.values.habitatIndex=this.habitatIndex,this.updateSpecificSectionValues({name:"habitat",values:this.values,isValid:this.isSectionValid})},methods:l({},Object(i["b"])({updateSpecificSectionValues:"updateSpecificSectionValues"}),{init:function(){this.prepareComplexObjects()},prepareComplexObjects:function(){var t=!0,e=!1,a=void 0;try{for(var s,n=this.formHabitat.data.substrateCompositionOptions[Symbol.iterator]();!(t=(s=n.next()).done);t=!0){var r=s.value;this.values.substrateComposition.push(l({},r,{value:{}}))}}catch(g){e=!0,a=g}finally{try{t||null==n.return||n.return()}finally{if(e)throw a}}var i=!0,o=!1,u=void 0;try{for(var c,d=this.formHabitat.data.aquaticVegetationOptions[Symbol.iterator]();!(i=(c=d.next()).done);i=!0){var v=c.value;this.values.aquaticVegetation.push(l({},v,{value:{}}))}}catch(g){o=!0,u=g}finally{try{i||null==d.return||d.return()}finally{if(o)throw u}}var p=!0,f=!1,b=void 0;try{for(var m,h=this.formHabitat.data.randomElementOptions[Symbol.iterator]();!(p=(m=h.next()).done);p=!0){var y=m.value;this.values.randomElements.push(l({},y,{value:{}}))}}catch(g){f=!0,b=g}finally{try{p||null==h.return||h.return()}finally{if(f)throw b}}},getTotalPoints:function(t){var e=0,a=!0,s=!1,n=void 0;try{for(var r,i=t[Symbol.iterator]();!(a=(r=i.next()).done);a=!0){var o=r.value;o.value.points&&(e+=o.value.points)}}catch(l){s=!0,n=l}finally{try{a||null==i.return||i.return()}finally{if(s)throw n}}return e},getHabitatCategory:function(t){return t>60?this.formHabitat.data.habitatIndexCategoriesOptions[0]:this.habitatIndexTotalPoints<40?this.formHabitat.data.habitatIndexCategoriesOptions[2]:this.formHabitat.data.habitatIndexCategoriesOptions[1]}})},c=u,d=(a("3bf1"),a("2877")),v=Object(d["a"])(c,s,n,!1,null,"413e8166",null);e["default"]=v.exports},"3bf1":function(t,e,a){"use strict";var s=a("8996"),n=a.n(s);n.a},"3ec7":function(t,e,a){t.exports=a.p+"habitat.pdf"},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var s=a("1d80"),n=a("5899"),r="["+n+"]",i=RegExp("^"+r+r+"*"),o=RegExp(r+r+"*$"),l=function(t){return function(e){var a=String(s(e));return 1&t&&(a=a.replace(i,"")),2&t&&(a=a.replace(o,"")),a}};t.exports={start:l(1),end:l(2),trim:l(3)}},8996:function(t,e,a){},d28b:function(t,e,a){var s=a("746f");s("iterator")},e01a:function(t,e,a){"use strict";var s=a("23e7"),n=a("83ab"),r=a("da84"),i=a("5135"),o=a("861d"),l=a("9bf2").f,u=a("e893"),c=r.Symbol;if(n&&"function"==typeof c&&(!("description"in c.prototype)||void 0!==c().description)){var d={},v=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof v?new c(t):void 0===t?c():c(t);return""===t&&(d[e]=!0),e};u(v,c);var p=v.prototype=c.prototype;p.constructor=v;var f=p.toString,b="Symbol(test)"==String(c("test")),m=/^Symbol\((.*)\)[^)]+$/;l(p,"description",{configurable:!0,get:function(){var t=o(this)?this.valueOf():this,e=f.call(t);if(i(d,t))return"";var a=b?e.slice(7,-1):e.replace(m,"$1");return""===a?void 0:a}}),s({global:!0,forced:!0},{Symbol:v})}},e25e:function(t,e,a){var s=a("23e7"),n=a("e583");s({global:!0,forced:parseInt!=n},{parseInt:n})},e583:function(t,e,a){var s=a("da84"),n=a("58a8").trim,r=a("5899"),i=s.parseInt,o=/^[+-]?0[Xx]/,l=8!==i(r+"08")||22!==i(r+"0x16");t.exports=l?function(t,e){var a=n(String(t));return i(a,e>>>0||(o.test(a)?16:10))}:i}}]);
//# sourceMappingURL=chunk-4285524e.8bfecd57.js.map