(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/renderless/AppResetState.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/renderless/AppResetState.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_DCoterillo_Repositorio_RiosConCiencia_App_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mounted: function mounted() {\n    var _this = this;\n\n    this.$nextTick(function () {\n      _this.init();\n    });\n  },\n  methods: Object(C_DCoterillo_Repositorio_RiosConCiencia_App_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__[\"mapActions\"])({\n    setActiveUser: \"setActiveUser\",\n    clearExpertFormResponses: \"clearExpertFormResponses\",\n    clearPictsFormResponses: \"clearPictsFormResponses\",\n    clearRiverSections: \"clearRiverSections\"\n  }), {\n    init: function init() {\n      var _this2 = this;\n\n      this.$root.$on(\"logout\", function () {\n        _this2.logout();\n      });\n      this.$root.$on(\"clearExpert\", function () {\n        _this2.finishedExpertForm();\n      });\n      this.$root.$on(\"clearPicts\", function () {\n        _this2.finishedPictsForm();\n      });\n    },\n    logout: function logout() {\n      this.setActiveUser({});\n      this.clearRiverSections({});\n      this.clearPictsFormResponses();\n      this.clearExpertFormResponses();\n      this.$router.push(\"login\");\n    },\n    finishedExpertForm: function finishedExpertForm() {\n      this.clearExpertFormResponses();\n      this.$router.push(\"/\");\n    },\n    finishedPictsForm: function finishedPictsForm() {\n      this.clearPictsFormResponses();\n      this.$router.push(\"/\");\n    }\n  }),\n  render: function render() {\n    return null;\n  }\n});\n\n//# sourceURL=webpack:///./src/components/renderless/AppResetState.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/components/renderless/AppResetState.vue":
/*!*****************************************************!*\
  !*** ./src/components/renderless/AppResetState.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AppResetState_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppResetState.vue?vue&type=script&lang=js& */ \"./src/components/renderless/AppResetState.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _AppResetState_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/renderless/AppResetState.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/renderless/AppResetState.vue?");

/***/ }),

/***/ "./src/components/renderless/AppResetState.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./src/components/renderless/AppResetState.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppResetState_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AppResetState.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/renderless/AppResetState.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppResetState_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/renderless/AppResetState.vue?");

/***/ })

}]);