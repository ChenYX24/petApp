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
      tag: ["春日派对", "夏日对派"],
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da48f91d"], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/activity/activity.vue"]]);
wx.createPage(MiniProgramPage);
