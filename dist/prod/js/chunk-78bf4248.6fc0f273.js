(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78bf4248"],{"1fc7":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-section"},[a("h5",{staticClass:"title is-5"},[t._v("4. Índice del Hábitat Fluvial (100m)")]),a("b-field",{attrs:{label:"a. Grado de inclusión de las piedras, cantos y gravas en rápidos y pozas"}},[a("b-select",{attrs:{icon:"gradient"},model:{value:t.values.stonesInPools,callback:function(e){t.$set(t.values,"stonesInPools",e)},expression:"values.stonesInPools"}},t._l(t.formHabitat.data.stonesInPoolsOptions,(function(e,n){return a("option",{key:n,domProps:{value:e}},[t._v(t._s(e.name))])})),0)],1),a("b-field",{attrs:{label:"b. Frecuencia de rápidos"}},[a("b-select",{attrs:{icon:"waves"},model:{value:t.values.rapidsFrequency,callback:function(e){t.$set(t.values,"rapidsFrequency",e)},expression:"values.rapidsFrequency"}},t._l(t.formHabitat.data.rapidFrequencyOptions,(function(e,n){return a("option",{key:n,domProps:{value:e}},[t._v(t._s(e.name))])})),0)],1),a("b-field",{attrs:{label:"c. Composición del sustrato",message:{"*Hay que seleccionar una opción para cada elemento":t.substrateHasErrors},type:{"is-danger":t.substrateHasErrors}}}),a("div",{staticClass:"block"},t._l(t.values.substrateComposition,(function(e,n){return a("div",{key:n,staticClass:"radio-rows"},[a("div",{staticClass:"radio-rows__label-container"},[t._v(" "+t._s(e.name)+" ")]),t._l(t.formHabitat.data.substrateCompositionPresenceOptions,(function(e){return a("b-radio",{key:e.id,attrs:{"native-value":e},model:{value:t.values.substrateComposition[n].value,callback:function(e){t.$set(t.values.substrateComposition[n],"value",e)},expression:"values.substrateComposition[index].value"}},[t._v(t._s(e.name))])}))],2)})),0),a("b-field",{attrs:{label:"d. Regímenes de velocidad y profundidad"}}),a("b-taglist",t._l(t.velocityAndDepthTypes,(function(e,n){return a("b-tag",{key:n,attrs:{type:"is-info"}},[t._v(t._s(e))])})),1),a("b-field",[a("b-select",{attrs:{icon:"format-list-bulleted-type"},model:{value:t.values.velocityAndDepth,callback:function(e){t.$set(t.values,"velocityAndDepth",e)},expression:"values.velocityAndDepth"}},t._l(t.formHabitat.data.velocityAndDepthOptions,(function(e,n){return a("option",{key:n,domProps:{value:e}},[t._v(t._s(e.name))])})),0)],1),a("b-field",{attrs:{label:"e. Sombre en el cauce"}},[a("b-select",{attrs:{icon:"box-shadow"},model:{value:t.values.riverShadows,callback:function(e){t.$set(t.values,"riverShadows",e)},expression:"values.riverShadows"}},t._l(t.formHabitat.data.riverShadowsOptions,(function(e,n){return a("option",{key:n,domProps:{value:e}},[t._v(t._s(e.name))])})),0)],1),a("b-field",{attrs:{label:"f. Presencia de elementos de heterogeneidad",message:{"*Hay que seleccionar una opción para cada elemento":t.randomElementsHasErrors},type:{"is-danger":t.randomElementsHasErrors}}}),a("div",{staticClass:"block"},t._l(t.values.randomElements,(function(e,n){return a("div",{key:n,staticClass:"radio-rows"},[a("div",{staticClass:"radio-rows__label-container"},[t._v(" "+t._s(e.name)+" ")]),t._l(t.formHabitat.data.randomElementPresenceOptions,(function(e){return a("b-radio",{key:e.id,attrs:{"native-value":e},model:{value:t.values.randomElements[n].value,callback:function(e){t.$set(t.values.randomElements[n],"value",e)},expression:"values.randomElements[index].value"}},[t._v(t._s(e.name))])}))],2)})),0),a("b-field",{attrs:{label:"g. Cobertura de la vegatación acúatica",message:{"*Hay que seleccionar una opción para cada elemento":t.aquaticVegetationHasErrors},type:{"is-danger":t.aquaticVegetationHasErrors}}}),a("div",{staticClass:"block"},t._l(t.values.aquaticVegetation,(function(e,n){return a("div",{key:n,staticClass:"radio-rows"},[a("div",{staticClass:"radio-rows__label-container"},[t._v(" "+t._s(e.name)+" ")]),t._l(t.formHabitat.data.aquaticVegetationCoverageOptions,(function(e){return a("b-radio",{key:e.id,attrs:{"native-value":e},model:{value:t.values.aquaticVegetation[n].value,callback:function(e){t.$set(t.values.aquaticVegetation[n],"value",e)},expression:"values.aquaticVegetation[index].value"}},[t._v(t._s(e.name))])}))],2)})),0),a("b-field",{attrs:{label:"h. Valor del Índice del Hábitat Fluvial (IHF)"}}),a("div",{staticClass:"results"},[a("div",{staticClass:"block"},[a("b-message",{attrs:{title:t.habitatIndex.cat.name,type:"is-info",closable:!1}},[t._v(" "+t._s(t.habitatIndex.cat.description)+" "),a("div",{staticClass:"results__rate"},[a("b-rate",{attrs:{"icon-pack":"mdi",icon:"star",max:3,size:"is-medium","show-text":!1,disabled:!0},model:{value:t.habitatIndex.cat.value,callback:function(e){t.$set(t.habitatIndex.cat,"value",e)},expression:"habitatIndex.cat.value"}})],1),a("div",{staticClass:"block"},[t._v(t._s(t.habitatIndexTotalPoints)+" puntos")])])],1)])],1)},i=[],s=(a("a4d3"),a("e01a"),a("d28b"),a("4de4"),a("e439"),a("dbb4"),a("b64b"),a("d3b7"),a("e25e"),a("3ca3"),a("159b"),a("ddb0"),a("ade3")),r=a("2f62");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={data:function(){return{values:{stonesInPools:{},substrateComposition:[],rapidsFrequency:{},velocityAndDepth:{},riverShadows:{},randomElements:[],aquaticVegetation:[],habitatIndex:{}},velocityAndDepthTypes:["rápido / profundo","lento / profundo","lento / poco profundo","rápido / poco profundo"]}},computed:l({},Object(r["d"])({formHabitat:function(t){return t.formSections.habitat}}),{substrateCompositionSUM:function(){return this.getTotalPoints(this.values.substrateComposition)},randomElementsSUM:function(){return this.getTotalPoints(this.values.randomElements)},aquaticVegetationSUM:function(){return this.getTotalPoints(this.values.aquaticVegetation)},habitatIndexTotalPoints:function(){return parseInt(this.values.stonesInPools.points)+parseInt(this.values.rapidsFrequency.points)+parseInt(this.substrateCompositionSUM)+parseInt(this.values.velocityAndDepth.points)+parseInt(this.values.riverShadows.points)+parseInt(this.randomElementsSUM)+parseInt(this.aquaticVegetationSUM)},habitatIndex:function(){return{cat:this.getHabitatCategory(this.habitatIndexTotalPoints),totalPoints:this.habitatIndexTotalPoints}},substrateHasErrors:function(){var t=!0,e=!1,a=void 0;try{for(var n,i=this.values.substrateComposition[Symbol.iterator]();!(t=(n=i.next()).done);t=!0){var s=n.value;if(0===Object.keys(s.value).length)return!0}}catch(r){e=!0,a=r}finally{try{t||null==i.return||i.return()}finally{if(e)throw a}}return!1},randomElementsHasErrors:function(){var t=!0,e=!1,a=void 0;try{for(var n,i=this.values.randomElements[Symbol.iterator]();!(t=(n=i.next()).done);t=!0){var s=n.value;if(0===Object.keys(s.value).length)return!0}}catch(r){e=!0,a=r}finally{try{t||null==i.return||i.return()}finally{if(e)throw a}}return!1},aquaticVegetationHasErrors:function(){var t=!0,e=!1,a=void 0;try{for(var n,i=this.values.aquaticVegetation[Symbol.iterator]();!(t=(n=i.next()).done);t=!0){var s=n.value;if(0===Object.keys(s.value).length)return!0}}catch(r){e=!0,a=r}finally{try{t||null==i.return||i.return()}finally{if(e)throw a}}return!1},isSectionValid:function(){return!this.substrateHasErrors&&!this.randomElementsHasErrors&&!this.aquaticVegetationHasErrors}}),mounted:function(){this.init()},beforeUpdate:function(){this.values.habitatIndex=this.habitatIndex,this.updateSectionValues({values:this.values,isValid:this.isSectionValid})},methods:l({},Object(r["b"])({updateSectionValues:"updateSectionValues"}),{init:function(){this.values.stonesInPools=this.formHabitat.data.stonesInPoolsOptions[0],this.values.rapidsFrequency=this.formHabitat.data.rapidFrequencyOptions[0],this.values.velocityAndDepth=this.formHabitat.data.velocityAndDepthOptions[0],this.values.riverShadows=this.formHabitat.data.riverShadowsOptions[0],this.prepareComplexObjects()},prepareComplexObjects:function(){var t=!0,e=!1,a=void 0;try{for(var n,i=this.formHabitat.data.substrateCompositionOptions[Symbol.iterator]();!(t=(n=i.next()).done);t=!0){var s=n.value;this.values.substrateComposition.push(l({},s,{value:{}}))}}catch(g){e=!0,a=g}finally{try{t||null==i.return||i.return()}finally{if(e)throw a}}var r=!0,o=!1,u=void 0;try{for(var c,d=this.formHabitat.data.aquaticVegetationOptions[Symbol.iterator]();!(r=(c=d.next()).done);r=!0){var v=c.value;this.values.aquaticVegetation.push(l({},v,{value:{}}))}}catch(g){o=!0,u=g}finally{try{r||null==d.return||d.return()}finally{if(o)throw u}}var b=!0,p=!1,f=void 0;try{for(var m,h=this.formHabitat.data.randomElementOptions[Symbol.iterator]();!(b=(m=h.next()).done);b=!0){var y=m.value;this.values.randomElements.push(l({},y,{value:{}}))}}catch(g){p=!0,f=g}finally{try{b||null==h.return||h.return()}finally{if(p)throw f}}},getTotalPoints:function(t){var e=0,a=!0,n=!1,i=void 0;try{for(var s,r=t[Symbol.iterator]();!(a=(s=r.next()).done);a=!0){var o=s.value;o.value.points&&(e+=o.value.points)}}catch(l){n=!0,i=l}finally{try{a||null==r.return||r.return()}finally{if(n)throw i}}return e},getHabitatCategory:function(t){return t>60?this.formHabitat.data.habitatIndexCategoriesOptions[0]:this.habitatIndexTotalPoints<40?this.formHabitat.data.habitatIndexCategoriesOptions[2]:this.formHabitat.data.habitatIndexCategoriesOptions[1]}})},c=u,d=(a("3831"),a("2877")),v=Object(d["a"])(c,n,i,!1,null,"227656cb",null);e["default"]=v.exports},3831:function(t,e,a){"use strict";var n=a("cbaa"),i=a.n(n);i.a},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var n=a("1d80"),i=a("5899"),s="["+i+"]",r=RegExp("^"+s+s+"*"),o=RegExp(s+s+"*$"),l=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(r,"")),2&t&&(a=a.replace(o,"")),a}};t.exports={start:l(1),end:l(2),trim:l(3)}},cbaa:function(t,e,a){},d28b:function(t,e,a){var n=a("746f");n("iterator")},e01a:function(t,e,a){"use strict";var n=a("23e7"),i=a("83ab"),s=a("da84"),r=a("5135"),o=a("861d"),l=a("9bf2").f,u=a("e893"),c=s.Symbol;if(i&&"function"==typeof c&&(!("description"in c.prototype)||void 0!==c().description)){var d={},v=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof v?new c(t):void 0===t?c():c(t);return""===t&&(d[e]=!0),e};u(v,c);var b=v.prototype=c.prototype;b.constructor=v;var p=b.toString,f="Symbol(test)"==String(c("test")),m=/^Symbol\((.*)\)[^)]+$/;l(b,"description",{configurable:!0,get:function(){var t=o(this)?this.valueOf():this,e=p.call(t);if(r(d,t))return"";var a=f?e.slice(7,-1):e.replace(m,"$1");return""===a?void 0:a}}),n({global:!0,forced:!0},{Symbol:v})}},e25e:function(t,e,a){var n=a("23e7"),i=a("e583");n({global:!0,forced:parseInt!=i},{parseInt:i})},e583:function(t,e,a){var n=a("da84"),i=a("58a8").trim,s=a("5899"),r=n.parseInt,o=/^[+-]?0[Xx]/,l=8!==r(s+"08")||22!==r(s+"0x16");t.exports=l?function(t,e){var a=i(String(t));return r(a,e>>>0||(o.test(a)?16:10))}:r}}]);
//# sourceMappingURL=chunk-78bf4248.6fc0f273.js.map