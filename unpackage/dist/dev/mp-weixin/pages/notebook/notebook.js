"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const tip = () => "../../components/tip.js";
const _sfc_main = {
  components: {
    TabBar,
    tip
  },
  onLoad: function(options) {
    this.tab = options.tab;
  },
  data() {
    return {
      tab: ""
    };
  }
};
if (!Array) {
  const _component_tip = common_vendor.resolveComponent("tip");
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  (_component_tip + _component_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: "驱虫,就是今天"
    }),
    b: common_vendor.p({
      text: "第二天"
    }),
    c: common_vendor.p({
      activeTab: $data.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-17181d6d"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/notebook/notebook.vue"]]);
wx.createPage(MiniProgramPage);
