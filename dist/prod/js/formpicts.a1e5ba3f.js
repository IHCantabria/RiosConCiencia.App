(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["formpicts"],{a762:function(e,n,t){},a764:function(e,n,t){"use strict";var a=t("a762"),i=t.n(a);i.a},c37d:function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"section"},[e._l(Object.keys(e.formSections),(function(n,a){return t("keep-alive",{key:a},[t(n,{directives:[{name:"show",rawName:"v-show",value:e.activeSectionName===n,expression:"activeSectionName === section"}],tag:"component"})],1)})),e.isPictsDataLoaded?e._e():t("app-data-loader",{on:{"data-load-ready":e.onDataLoad,"data-load-error":e.onDataLoadError}}),e.isPictsDataLoaded?e._e():t("spinner",{attrs:{"is-loading":!e.dataReady}})],2)},i=[],o=(t("b64b"),t("d3b7"),t("5530")),c=t("2f62"),r=t("8e89"),u={name:"PictsView",components:{info:function(){return t.e("chunk-e2b930aa").then(t.bind(null,"fb5e"))},flow:function(){return t.e("chunk-c5b64f44").then(t.bind(null,"6508"))},width:function(){return t.e("chunk-acbb6ab6").then(t.bind(null,"81e5"))},depth:function(){return t.e("chunk-66886b1e").then(t.bind(null,"7983"))},temp:function(){return t.e("chunk-cdf8cfb4").then(t.bind(null,"feed"))},env:function(){return t.e("chunk-a0e9c74c").then(t.bind(null,"f894"))},color:function(){return t.e("chunk-bd6056aa").then(t.bind(null,"2ec3"))},smell:function(){return t.e("chunk-68942ec0").then(t.bind(null,"1e4a"))},garbage:function(){return t.e("chunk-b657610c").then(t.bind(null,"98ad"))},plants:function(){return t.e("chunk-005dca3a").then(t.bind(null,"8750"))},animals:function(){return t.e("chunk-28ad7c46").then(t.bind(null,"a75a"))},game:function(){return Promise.all([t.e("chunk-741f5406"),t.e("chunk-1d039110")]).then(t.bind(null,"865e"))},"app-data-loader":function(){return Promise.all([t.e("chunk-741f5406"),t.e("chunk-2a6b4aac")]).then(t.bind(null,"6498"))},spinner:function(){return t.e("chunk-5e45d951").then(t.bind(null,"3a5e"))}},mixins:[r["a"]],data:function(){return{dataReady:!1}},beforeRouteLeave:function(e,n,t){this.formSections.width?"/"!=e.path&&"/about"!=e.path||0===Object.keys(this.formSections.width.results).length?t():this.$buefy.dialog.confirm({title:"Formulario Incompleto",message:"¿Seguro que desea abandonar esta sección? El formulario no ha sido completado y las respuestas actuales no estarán guardadas cuando vuelva a entrar.",confirmText:"Confirmar",cancelText:"No Abandonar",type:"is-danger",hasIcon:!0,onCancel:function(){return t(!1)},onConfirm:function(){return t()}}):t()},mounted:function(){this.init()},computed:Object(o["a"])({},Object(c["d"])({activeSectionId:function(e){return e.activeSectionId},formSections:function(e){return e.formPictsSections}}),{},Object(c["c"])({activeSectionName:"activeSectionName",isPictsDataLoaded:"isPictsDataLoaded"})),methods:Object(o["a"])({},Object(c["b"])({setActiveForm:"setActiveForm",setActiveSection:"setActiveSection"}),{onDataLoad:function(){this.dataReady=!0},init:function(){this.setActiveForm(1),this.setActiveSection(0)},onDataLoadError:function(){this.dataReady=!0;var e=this.isComputedOnline?"No ha sido posible cargar datos maestros del formulario, el servidor esta caido":" No es posible cargar datos maestros del formulario si no dispones de conexión a internet";this.$buefy.toast.open({message:e,type:"is-danger",duration:4e3}),this.dataReady=!1,this.$router.push("/")}})},s=u,d=(t("a764"),t("2877")),l=Object(d["a"])(s,a,i,!1,null,"31a52945",null);n["default"]=l.exports}}]);