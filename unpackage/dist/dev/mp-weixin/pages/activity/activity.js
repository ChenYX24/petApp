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
      src: "https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/642d276b5a7e3f0310451545/642d27bc99e5b100119e7a73/16806809026616325675.png",
      tag: ["春日派对", "夏日对派"]
    };
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
    a: common_vendor.p({
      imageSrc: $data.src,
      tag: $data.tag
    }),
    b: common_vendor.p({
      imageSrc: $data.src
    }),
    c: common_vendor.p({
      imageSrc: $data.src
    }),
    d: common_vendor.p({
      imageSrc: $data.src,
      tag: $data.tag
    }),
    e: common_vendor.p({
      imageSrc: $data.src
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
      activeTab: $data.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da48f91d"], ["__file", "D:/uniapp/petApp/pages/activity/activity.vue"]]);
wx.createPage(MiniProgramPage);
