(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-384c9809"],{"09a4":function(t,e,i){t.exports=i.p+"img/helpSmell1.16cd5908.jpg"},"12fd":function(t,e,i){var n={"./animalsEnv.jpg":"e662","./campingEnv.jpg":"ad92","./factoryEnv.jpg":"2d8d","./forestEnv.jpg":"c84d","./helpEnv1.gif":"948d","./helpSmell1.jpg":"09a4","./helpSmell2.jpg":"867e","./helpSmell3.jpg":"ca17","./houseEnv.jpg":"8d2a","./orchardEnv.jpg":"cf4b","./parkingEnv.jpg":"d62c","./plantsEnv.jpg":"433e","./recreationEnv.jpg":"2b87","./roadsEnv.jpg":"ab4c","./titleEnv.jpg":"b671","./titleSmell.jpg":"86c2","./trainEnv.jpg":"c1a8","./treatmentEnv.jpg":"d971"};function c(t){var e=s(t);return i(e)}function s(t){if(!i.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}c.keys=function(){return Object.keys(n)},c.resolve=s,t.exports=c,c.id="12fd"},1905:function(t,e,i){},2830:function(t,e,i){"use strict";var n=i("1905"),c=i.n(n);c.a},"2b87":function(t,e,i){t.exports=i.p+"img/recreationEnv.1ae0283b.jpg"},"2d8d":function(t,e,i){t.exports=i.p+"img/factoryEnv.898489b7.jpg"},"433e":function(t,e,i){t.exports=i.p+"img/plantsEnv.3a994a4c.jpg"},"867e":function(t,e,i){t.exports=i.p+"img/helpSmell2.a1ca3bd3.jpg"},"86c2":function(t,e,i){t.exports=i.p+"img/titleSmell.27a8a482.jpg"},"8d2a":function(t,e,i){t.exports=i.p+"img/houseEnv.f40951dc.jpg"},"948d":function(t,e,i){t.exports=i.p+"img/helpEnv1.be1f7512.gif"},ab4c:function(t,e,i){t.exports=i.p+"img/roadsEnv.a75b78ba.jpg"},ad92:function(t,e,i){t.exports=i.p+"img/campingEnv.244111c0.jpg"},b671:function(t,e,i){t.exports=i.p+"img/titleEnv.7b55dd4d.jpg"},c1a8:function(t,e,i){t.exports=i.p+"img/trainEnv.87c24ec9.jpg"},c740:function(t,e,i){"use strict";var n=i("23e7"),c=i("b727").findIndex,s=i("44d2"),a=i("ae40"),o="findIndex",r=!0,p=a(o);o in[]&&Array(1)[o]((function(){r=!1})),n({target:"Array",proto:!0,forced:r||!p},{findIndex:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}}),s(o)},c84d:function(t,e,i){t.exports=i.p+"img/forestEnv.03d54297.jpg"},ca17:function(t,e,i){t.exports=i.p+"img/helpSmell3.cb11372e.jpg"},ce86:function(t,e,i){"use strict";i.d(e,"a",(function(){return c}));var n=i("fa7d"),c={data:function(){return{imgFolder:null,helpActive:!1}},computed:{isHelpActive:function(){return this.helpActive}},methods:{$_getImgUrl:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.imgFolder?this.imgFolder("./".concat(Object(n["b"])(t,e,i))):""},$_toggleHelp:function(){this.helpActive=!this.helpActive}}}},cf4b:function(t,e,i){t.exports=i.p+"img/orchardEnv.88108ad4.jpg"},d62c:function(t,e,i){t.exports=i.p+"img/parkingEnv.5f840b5b.jpg"},d971:function(t,e,i){t.exports=i.p+"img/treatmentEnv.687a610a.jpg"},e662:function(t,e,i){t.exports=i.p+"img/animalsEnv.d0812d7d.jpg"},f894:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"form-section form-section-picts"},[i("div",{staticClass:"header-section"},[t._m(0),i("div",{staticClass:"header-section__help",on:{click:function(e){return t.$_toggleHelp()}}},[i("b-icon",{attrs:{icon:"information-outline",type:"is-info"}})],1)]),i("b-field",{directives:[{name:"show",rawName:"v-show",value:t.isHelpActive,expression:"isHelpActive"}],attrs:{message:"Giraremos sobre nosotros mismos 180º para observar qué elementos encontramos en los alrededores del río."}}),i("div",{staticClass:"block guide-section"},[i("div",{staticClass:"guide-step"},[i("img",{attrs:{src:t.$_getImgUrl(t.formEnv.id,0,1)}}),i("b-tag",{staticClass:"guide-step__text",attrs:{type:"is-info"}},[t._v("MIRAMOS A NUESTRO ALREDEDOR")])],1)]),i("div",{staticClass:"img-header"},[i("img",{staticClass:"img-header__pic",attrs:{src:t.$_getImgUrl(t.formEnv.id,0,0)}}),i("b-icon",{staticClass:"img-header__icon",attrs:{icon:"checkbox-marked-circle-outline",type:"is-info"}})],1),i("b-field",{staticClass:"img-section"},t._l(t.formEnv.data.envRiverOptions,(function(e){return i("div",{key:e.id,staticClass:"img-container"},[i("b-checkbox-button",{staticClass:"img-option",attrs:{"native-value":e},model:{value:t.values.waterEnv,callback:function(e){t.$set(t.values,"waterEnv",e)},expression:"values.waterEnv"}},[i("img",{class:t.isSelected(e)?"img-option__active":"img-option__inactive",attrs:{src:t.$_getImgUrl(t.formEnv.id,e.id,1)}}),i("div",{class:["overlay",t.isSelected(e)?"overlay__active":"overlay__inactive"]})])],1)})),0)],1)},c=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h5",{staticClass:"title is-5 header-section__text"},[i("span",[t._v("GÍRATE Y MIRA")])])}],s=(i("c740"),i("d3b7"),i("ddb0"),i("5530")),a=i("2f62"),o=i("ce86"),r={data:function(){return{values:{waterEnv:null}}},mixins:[o["a"]],computed:Object(s["a"])({},Object(a["d"])({formEnv:function(t){return t.formPictsSections.env}}),{isSectionValid:function(){return!0}}),created:function(){this.imgFolder=i("12fd")},mounted:function(){this.init()},beforeUpdate:function(){this.updateSpecificPictsSectionValues({name:"env",values:this.values,isValid:this.isSectionValid})},methods:Object(s["a"])({},Object(a["b"])({updateSpecificPictsSectionValues:"updateSpecificPictsSectionValues"}),{init:function(){this.values.waterEnv=[]},isSelected:function(t){return this.values.waterEnv?-1!=this.values.waterEnv.findIndex((function(e){return e.id==t.id})):""}})},p=r,l=(i("2830"),i("2877")),d=Object(l["a"])(p,n,c,!1,null,"7a827616",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-384c9809.0da0f75e.js.map