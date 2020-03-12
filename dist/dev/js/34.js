(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/layout/AppNotificationUpdate.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/layout/AppNotificationUpdate.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/event-bus */ \"./src/utils/event-bus.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  mounted: function mounted() {\n    var _this = this;\n\n    _utils_event_bus__WEBPACK_IMPORTED_MODULE_0__[\"default\"].$on(\"update_available\", function () {\n      _this.update();\n    });\n  },\n  methods: {\n    update: function update() {\n      var notif = this.$buefy.notification.open({\n        message: \"Hay una versi\\xF3n mas reciente de la aplicaci\\xF3n, cierra esta notificaci\\xF3n para instalarla\",\n        position: \"is-top\",\n        type: \"is-warning\",\n        hasIcon: true,\n        closable: true,\n        indefinite: true\n      });\n      notif.$on(\"close\", function () {\n        _utils_event_bus__WEBPACK_IMPORTED_MODULE_0__[\"default\"].$emit(\"launch_update\");\n      });\n    }\n  },\n  render: function render() {\n    return null;\n  }\n});\n\n//# sourceURL=webpack:///./src/components/layout/AppNotificationUpdate.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/components/layout/AppNotificationUpdate.vue":
/*!*********************************************************!*\
  !*** ./src/components/layout/AppNotificationUpdate.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AppNotificationUpdate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppNotificationUpdate.vue?vue&type=script&lang=js& */ \"./src/components/layout/AppNotificationUpdate.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _AppNotificationUpdate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/layout/AppNotificationUpdate.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/layout/AppNotificationUpdate.vue?");

/***/ }),

/***/ "./src/components/layout/AppNotificationUpdate.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./src/components/layout/AppNotificationUpdate.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppNotificationUpdate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AppNotificationUpdate.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/layout/AppNotificationUpdate.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppNotificationUpdate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/layout/AppNotificationUpdate.vue?");

/***/ })

}]);