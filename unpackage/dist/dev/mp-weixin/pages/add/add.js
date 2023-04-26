"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const notebookform = () => "../../components/notebookform.js";
const _sfc_main = {
  components: {
    notebookform,
    TabBar
  },
  data() {
    return {
      isshow: false
    };
  },
  methods: {
    addNote() {
      this.isshow = true;
    }
  },
  metaInfo: {
    // 页面标题
    title: "add"
  }
};
if (!Array) {
  const _component_notebookform = common_vendor.resolveComponent("notebookform");
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  const _easycom_add2 = common_vendor.resolveComponent("add");
  (_component_notebookform + _component_tab_bar + _easycom_add2)();
}
const _easycom_add = () => "../../components/add/add.js";
if (!Math) {
  _easycom_add();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.addNote && $options.addNote(...args)),
    b: $data.isshow,
    c: common_vendor.p({
      activeTab: _ctx.tab
    }),
    d: $data.isshow
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/pages/add/add.vue"]]);
wx.createPage(MiniProgramPage);
