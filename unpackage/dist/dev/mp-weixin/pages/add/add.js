"use strict";
const common_vendor = require("../../common/vendor.js");
const add = () => "../../components/add/add.js";
const TabBar = () => "../../components/TabBar.js";
const tip = () => "../../components/tip.js";
const _sfc_main = {
  components: {
    add,
    TabBar,
    tip
  },
  data() {
    return {
      tips: []
      // 存储已经创建的组件实例
    };
  },
  methods: {
    createNewComponent() {
      console.log("创建新组件");
      const newComponent = new tip();
      this.tips.push(newComponent.$mount());
    }
  },
  metaInfo: {
    title: "add"
  }
};
if (!Array) {
  const _component_tip = common_vendor.resolveComponent("tip");
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  const _easycom_add2 = common_vendor.resolveComponent("add");
  (_component_tip + _component_tab_bar + _easycom_add2)();
}
const _easycom_add = () => "../../components/add/add.js";
if (!Math) {
  _easycom_add();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.createNewComponent && $options.createNewComponent(...args)),
    b: common_vendor.f(_ctx.components, (component, index, i0) => {
      return {
        a: "2af107eb-0-" + i0,
        b: index
      };
    }),
    c: common_vendor.p({
      activeTab: _ctx.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/pages/add/add.vue"]]);
wx.createPage(MiniProgramPage);
