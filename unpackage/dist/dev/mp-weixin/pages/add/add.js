"use strict";
const common_vendor = require("../../common/vendor.js");
const add = () => "../../components/add/add.js";
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  components: {
    add,
    TabBar
  },
  data() {
    return {};
  },
  metaInfo: {
    title: "add"
  }
};
if (!Array) {
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  const _easycom_add2 = common_vendor.resolveComponent("add");
  (_component_tab_bar + _easycom_add2)();
}
const _easycom_add = () => "../../components/add/add.js";
if (!Math) {
  _easycom_add();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      activeTab: _ctx.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/pages/add/add.vue"]]);
wx.createPage(MiniProgramPage);
