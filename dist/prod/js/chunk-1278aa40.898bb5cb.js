(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1278aa40"],{"0cd7":function(t,e,i){t.exports=i.p+"img/hazelPlants.da977ee4.jpg"},"273d":function(t,e,i){t.exports=i.p+"img/ashTreePlants.213a7a67.jpg"},3994:function(t,e,i){t.exports=i.p+"img/bambuPlants.9821e232.jpg"},"55dd":function(t,e,i){t.exports=i.p+"img/titlePlants.7b55dd4d.jpg"},8750:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"form-section form-section-picts"},[i("div",{staticClass:"header-section"},[t._m(0),i("div",{staticClass:"header-section__help",on:{click:function(e){return t.$_toggleHelp()}}},[i("b-icon",{attrs:{icon:"information-outline",type:"is-info"}})],1)]),i("b-field",{directives:[{name:"show",rawName:"v-show",value:t.isHelpActive,expression:"isHelpActive"}],attrs:{message:"\n      Giraremos sobre nosotros mismos 180º para observar si encontramos en los alrededores del río las plantas que os mostramos a continuación. "}}),i("div",{staticClass:"block guide-section"},[i("div",{staticClass:"guide-step"},[i("img",{attrs:{src:t.$_getImgUrl(t.formPlants.id,0,1)}}),i("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("MIRAMOS A NUESTRO ALREDEDOR")])],1)]),i("div",{staticClass:"img-header"},[i("img",{staticClass:"img-header__pic",attrs:{src:t.$_getImgUrl(t.formPlants.id,0,0)}}),i("b-icon",{staticClass:"img-header__icon",attrs:{icon:"checkbox-marked-circle-outline",type:"is-info"}})],1),i("b-field",{staticClass:"img-section"},t._l(t.formPlants.data.plantsRiverOptions,(function(e){return i("div",{key:e.id,staticClass:"img-container"},[i("span",{staticClass:"img-option-text"},[t._v(t._s(t._f("upperCase")(e.name)))]),i("b-checkbox-button",{staticClass:"img-option",attrs:{"native-value":e},model:{value:t.values.waterPlants,callback:function(e){t.$set(t.values,"waterPlants",e)},expression:"values.waterPlants"}},[i("img",{class:t.isSelected(e)?"img-option__active":"img-option__inactive",attrs:{src:t.$_getImgUrl(t.formPlants.id,e.id,1)}}),i("div",{class:["overlay",t.isSelected(e)?"overlay__active":"overlay__inactive"]})])],1)})),0)],1)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h5",{staticClass:"title is-5 header-section__text"},[i("span",[t._v("GÍRATE Y MIRA")])])}],a=(i("c740"),i("d3b7"),i("ddb0"),i("5530")),c=i("2f62"),o=i("ce86"),r={data:function(){return{values:{waterPlants:null}}},mixins:[o["a"]],computed:Object(a["a"])({},Object(c["d"])({formPlants:function(t){return t.formPictsSections.plants}}),{isSectionValid:function(){return!0}}),created:function(){this.imgFolder=i("bfcd")},mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificPictsSectionValues({name:"plants",values:this.values,isValid:this.isSectionValid})},methods:Object(a["a"])({},Object(c["b"])({updateSpecificPictsSectionValues:"updateSpecificPictsSectionValues"}),{init:function(){this.values.waterPlants=[]},isSelected:function(t){return this.values.waterPlants?-1!=this.values.waterPlants.findIndex((function(e){return e.id==t.id})):""}})},l=r,d=(i("d7fc"),i("2877")),u=Object(d["a"])(l,s,n,!1,null,"4fe29c89",null);e["default"]=u.exports},"88fa":function(t,e,i){},"95a3":function(t,e,i){t.exports=i.p+"img/nettlePlants.a0151c03.jpg"},bfcd:function(t,e,i){var s={"./ashTreePlants.jpg":"273d","./bambuPlants.jpg":"3994","./hazelPlants.jpg":"0cd7","./helpPlants1.gif":"d225","./nettlePlants.jpg":"95a3","./oakPlants.jpg":"f20f","./pampasGrassPlants.jpg":"c979","./saintJosephPlants.jpg":"f197","./titlePlants.jpg":"55dd"};function n(t){var e=a(t);return i(e)}function a(t){if(!i.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}n.keys=function(){return Object.keys(s)},n.resolve=a,t.exports=n,n.id="bfcd"},c740:function(t,e,i){"use strict";var s=i("23e7"),n=i("b727").findIndex,a=i("44d2"),c=i("ae40"),o="findIndex",r=!0,l=c(o);o in[]&&Array(1)[o]((function(){r=!1})),s({target:"Array",proto:!0,forced:r||!l},{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),a(o)},c979:function(t,e,i){t.exports=i.p+"img/pampasGrassPlants.83889a4a.jpg"},ce86:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var s=i("fa7d"),n={data:function(){return{imgFolder:null,helpActive:!1}},computed:{isHelpActive:function(){return this.helpActive}},methods:{$_getImgUrl:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.imgFolder?this.imgFolder("./".concat(Object(s["b"])(t,e,i))):""},$_toggleHelp:function(){this.helpActive=!this.helpActive}}}},d225:function(t,e,i){t.exports=i.p+"img/helpPlants1.be1f7512.gif"},d7fc:function(t,e,i){"use strict";var s=i("88fa"),n=i.n(s);n.a},f197:function(t,e,i){t.exports=i.p+"img/saintJosephPlants.52af7ad5.jpg"},f20f:function(t,e,i){t.exports=i.p+"img/oakPlants.b32bd3ce.jpg"}}]);
//# sourceMappingURL=chunk-1278aa40.898bb5cb.js.map