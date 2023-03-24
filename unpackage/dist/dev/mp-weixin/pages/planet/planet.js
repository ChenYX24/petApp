"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  components: {
    TabBar
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
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  _component_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.inputValue,
    b: common_vendor.o(($event) => _ctx.inputValue = $event.detail.value),
    c: common_vendor.p({
      activeTab: $data.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d8c429a1"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/planet/planet.vue"]]);
wx.createPage(MiniProgramPage);
