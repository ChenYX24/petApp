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
    this.city = common_vendor.index.getStorageSync("city");
    if (!this.city) {
      this.city = "未知";
    }
  },
  mounted() {
    const firstImage = JSON.parse(common_vendor.wx$1.getStorageSync("firstImage"));
    this.imageSrcArr.push(firstImage);
  },
  data() {
    return {
      tab: "",
      src: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/dog.png",
      src1: "/static//activity/柴犬.jpg",
      imageSrcArr: [],
      tag: ["春日派对", "夏日对派"],
      navH: null,
      city: "未知"
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
    a: common_vendor.t($data.city),
    b: $data.navH + "px",
    c: common_vendor.f($data.imageSrcArr, (imagesrc, index, i0) => {
      return {
        a: "da48f91d-0-" + i0,
        b: common_vendor.p({
          imageSrc: imagesrc,
          tag: $data.tag
        }),
        c: index
      };
    }),
    d: common_vendor.p({
      imageSrc: $data.src1,
      tag: $data.tag
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
      imageSrc: $data.src,
      tag: $data.tag
    }),
    i: common_vendor.p({
      imageSrc: $data.src
    }),
    j: common_vendor.p({
      imageSrc: $data.src
    }),
    k: common_vendor.p({
      imageSrc: $data.src
    }),
    l: common_vendor.p({
      imageSrc: $data.src
    }),
    m: common_vendor.p({
      activeTab: $data.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da48f91d"], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/activity/activity.vue"]]);
wx.createPage(MiniProgramPage);
