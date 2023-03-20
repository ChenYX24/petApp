"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/notebook/notebook.js";
  "./pages/planet/planet.js";
  "./pages/activity/activity.js";
  "./pages/home/home.js";
  "./pages/add/add.js";
}
const _sfc_main = {
  data() {
    return {};
  },
  async onShow() {
    common_vendor.index.hideHomeButton();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
