(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c44c1f2"],{"932d":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"toolbar"},[i("div",{staticClass:"nav",attrs:{id:"nav"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.userIsLogged,expression:"userIsLogged"}],staticClass:"nav__link",on:{click:e.confirmLogout}},[i("router-link",{attrs:{to:""}},[i("b-icon",{attrs:{icon:"close-circle",size:"is-medium"}})],1)],1),i("div",{staticClass:"nav__link"},[i("router-link",{attrs:{to:"/"}},[i("b-icon",{attrs:{icon:"home-circle",size:"is-medium"}})],1)],1),i("div",{staticClass:"nav__link"},[i("router-link",{attrs:{to:"/about"}},[i("b-icon",{attrs:{icon:"help-circle",size:"is-medium"}})],1)],1)])])},o=[],a=i("5530"),r=i("2f62"),n={data:function(){return{}},computed:Object(a["a"])({},Object(r["c"])({userIsLogged:"userIsLogged"})),methods:{confirmLogout:function(){var e=this;this.$buefy.dialog.confirm({title:"Desconectar Usuario",message:"¿Seguro que quieres cerrar la sesión? Se perderán los datos de cualquier formulario no enviado.",confirmText:"Cerrar sesión",cancelText:"Volver atrás",type:"is-danger",hasIcon:!0,onConfirm:function(){return e.$root.$emit("logout")}})}}},c=n,u=(i("d4ae"),i("2877")),l=Object(u["a"])(c,s,o,!1,null,"0da7a1da",null);t["default"]=l.exports},d4ae:function(e,t,i){"use strict";var s=i("da45"),o=i.n(s);o.a},da45:function(e,t,i){}}]);