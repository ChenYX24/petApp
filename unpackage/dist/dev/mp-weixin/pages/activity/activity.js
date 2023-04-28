"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const myActivity = () => "../../components/myActivity/myActivity.js";
const _sfc_main = {
  components: {
    TabBar,
    myActivity
  },
  onLoad: function(options) {
    this.tab = options.tab;
  },
  data() {
    return {
      tab: "",
      src: "/static//activity/dog.png",
      tag: ["\u6625\u65E5\u6D3E\u5BF9", "\u590F\u65E5\u5BF9\u6D3E"],
      navH: null
    };
  },
  created() {
    const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    this.navH = menuButtonInfo.top;
  }
};
if (!Array) {
  const _easycom_myActivity2 = common_vendor.resolveComponent("myActivity");
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  (_easycom_myActivity2 + _component_tab_bar)();
}
const _easycom_myActivity = () => "../../components/myActivity/myActivity.js";
if (!Math) {
  _easycom_myActivity();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.navH + "px",
    b: common_vendor.p({
      imageSrc: $data.src,
      tag: $data.tag
    }),
    c: common_vendor.p({
      imageSrc: $data.src
    }),
    d: common_vendor.p({
      imageSrc: $data.src
    }),
    e: common_vendor.p({
      imageSrc: $data.src,
      tag: $data.tag
    }),
    f: common_vendor.p({
      imageSrc: $data.src
    }),
    g: common_vendor.p({
      imageSrc: $data.src
    }),
    h: common_vendor.p({
      imageSrc: $data.src
    }),
    i: common_vendor.p({
      imageSrc: $data.src
    }),
    j: common_vendor.p({
      activeTab: $data.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da48f91d"], ["__file", "D:/uniapp/petApp/pages/activity/activity.vue"]]);
wx.createPage(MiniProgramPage);
