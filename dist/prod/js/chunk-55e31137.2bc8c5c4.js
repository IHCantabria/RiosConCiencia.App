(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55e31137"],{"0cd7":function(t,e,s){t.exports=s.p+"img/hazelPlants.da977ee4.jpg"},"1d4b":function(t,e,s){},"273d":function(t,e,s){t.exports=s.p+"img/ashTreePlants.213a7a67.jpg"},3994:function(t,e,s){t.exports=s.p+"img/bambuPlants.9821e232.jpg"},"55dd":function(t,e,s){t.exports=s.p+"img/titlePlants.7b55dd4d.jpg"},8750:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-section-picts form-section"},[s("div",{staticClass:"header-section"},[t._m(0),s("div",{staticClass:"header-section__help",on:{click:function(e){return t.$_toggleHelp()}}},[s("b-icon",{attrs:{icon:"information-outline",type:"is-info"}})],1)]),s("b-field",{directives:[{name:"show",rawName:"v-show",value:t.isHelpActive,expression:"isHelpActive"}],attrs:{message:"\n      Giraremos sobre nosotros mismos 180º para observar si encontramos en los alrededores del río las plantas que os mostramos a continuación. Pueden ser plantas autóctonas y que se consideran buenas (p.e. ortigas, avellanos, fresnos y robles) o plantas exóticas invasoras que se consideran malas (p.e. plumero, vara de San José y bambú japonés)."}}),s("div",{staticClass:"block guide-section"},[s("div",{staticClass:"guide-step"},[s("img",{attrs:{src:t.$_getImgUrl(t.formPlants.id,0,1)}}),s("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("MIRAMOS A NUESTRO ALREDEDOR")])],1)]),s("div",{staticClass:"img-header"},[s("img",{staticClass:"img-header__pic",attrs:{src:t.$_getImgUrl(t.formPlants.id,0,0)}}),s("b-icon",{staticClass:"img-header__icon",attrs:{icon:"checkbox-marked-circle-outline",type:"is-info"}})],1),s("b-field",{staticClass:"img-section"},[s("div",{staticClass:"img-container"},[s("span",{staticClass:"img-option-text"},[t._v("NO HAY PLANTAS BUENAS")]),s("b-checkbox-button",{staticClass:"img-option",attrs:{"native-value":!1},model:{value:t.absence,callback:function(e){t.absence=e},expression:"absence"}},[s("img",{class:t.absence?"img-option__active":"img-option__inactive",attrs:{src:t.$_getImgUrl(t.formPlants.id,8,1)}}),s("div",{class:["overlay",t.absence?"overlay__active":"overlay__inactive"]})])],1),t._l(t.formPlants.data.plantsRiverOptions,(function(e){return s("div",{key:e.id,staticClass:"img-container"},[s("span",{staticClass:"img-option-text"},[t._v(t._s(t._f("upperCase")(e.name)))]),s("b-checkbox-button",{staticClass:"img-option",attrs:{"native-value":e},model:{value:t.values.waterPlants,callback:function(e){t.$set(t.values,"waterPlants",e)},expression:"values.waterPlants"}},[s("img",{class:t.isSelected(e)?"img-option__active":"img-option__inactive",attrs:{src:t.$_getImgUrl(t.formPlants.id,e.id,1)}}),s("div",{class:["overlay",t.isSelected(e)?"overlay__active":"overlay__inactive"]})])],1)}))],2)],1)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h5",{staticClass:"title is-5 header-section__text"},[s("span",[t._v("GÍRATE Y MIRA")])])}],i=(s("4de4"),s("c740"),s("d3b7"),s("ddb0"),s("5530")),o=s("2f62"),c=s("ce86"),r={data:function(){return{values:{waterPlants:null}}},mixins:[c["a"]],computed:Object(i["a"])({},Object(o["d"])({formPlants:function(t){return t.formPictsSections.plants},goodPlantsAbsence:function(t){return t.goodPlantsAbsence}}),{absence:{get:function(){return this.goodPlantsAbsence},set:function(t){this.setGoodPlantsAbsence(t)}},isSectionValid:function(){return!0}}),watch:{absence:function(t){t&&this.removeGoodPlants()},values:{deep:!0,handler:function(){this.absence&&this.checkGoodPlants()&&(this.absence=!1)}}},created:function(){this._loadAssests()},mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificPictsSectionValues({name:"plants",values:this.values,isValid:this.isSectionValid})},methods:Object(i["a"])({},Object(o["b"])({updateSpecificPictsSectionValues:"updateSpecificPictsSectionValues",setGoodPlantsAbsence:"setGoodPlantsAbsence"}),{init:function(){this.values.waterPlants=[],this.setGoodPlantsAbsence(!1)},checkGoodPlants:function(){return this.values.waterPlants.filter((function(t){return t.isGood})).length>0},_loadAssests:function(){this.imgFolder=s("bfcd")},isSelected:function(t){return this.values.waterPlants?-1!=this.values.waterPlants.findIndex((function(e){return e.id==t.id})):""},removeGoodPlants:function(){this.values.waterPlants=this.values.waterPlants.filter((function(t){return!t.isGood}))}})},l=r,u=(s("c89e"),s("2877")),d=Object(u["a"])(l,n,a,!1,null,"eef0a79a",null);e["default"]=d.exports},"95a3":function(t,e,s){t.exports=s.p+"img/nettlePlants.a0151c03.jpg"},"9e1f":function(t,e,s){t.exports=s.p+"img/absence.945afb14.jpg"},bfcd:function(t,e,s){var n={"./absence.jpg":"9e1f","./ashTreePlants.jpg":"273d","./bambuPlants.jpg":"3994","./hazelPlants.jpg":"0cd7","./helpPlants1.gif":"d225","./nettlePlants.jpg":"95a3","./oakPlants.jpg":"f20f","./pampasGrassPlants.jpg":"c979","./saintJosephPlants.jpg":"f197","./titlePlants.jpg":"55dd"};function a(t){var e=i(t);return s(e)}function i(t){if(!s.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}a.keys=function(){return Object.keys(n)},a.resolve=i,t.exports=a,a.id="bfcd"},c740:function(t,e,s){"use strict";var n=s("23e7"),a=s("b727").findIndex,i=s("44d2"),o=s("ae40"),c="findIndex",r=!0,l=o(c);c in[]&&Array(1)[c]((function(){r=!1})),n({target:"Array",proto:!0,forced:r||!l},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),i(c)},c89e:function(t,e,s){"use strict";var n=s("1d4b"),a=s.n(n);a.a},c979:function(t,e,s){t.exports=s.p+"img/pampasGrassPlants.83889a4a.jpg"},ce86:function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var n=s("fa7d"),a={data:function(){return{imgFolder:null,helpActive:!1}},computed:{isHelpActive:function(){return this.helpActive}},methods:{$_getImgUrl:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.imgFolder?this.imgFolder("./".concat(Object(n["b"])(t,e,s))):""},$_toggleHelp:function(){this.helpActive=!this.helpActive}}}},d225:function(t,e,s){t.exports=s.p+"img/helpPlants1.be1f7512.gif"},f197:function(t,e,s){t.exports=s.p+"img/saintJosephPlants.52af7ad5.jpg"},f20f:function(t,e,s){t.exports=s.p+"img/oakPlants.b32bd3ce.jpg"}}]);