"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "\u9009\u62E9\u7C7B\u578B",
      isActive: false,
      leftSelected: false,
      rightSelected: false,
      leftImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectDogOrCat/leftNS.png",
      rightImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectDogOrCat/rightNS.png",
      thirdImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectDogOrCat/leftS.png",
      fourthImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectDogOrCat/rightS.png"
    };
  },
  methods: {
    nextpage() {
      if (this.isActive) {
        if (this.leftSelected) {
          wx.setStorageSync("breed", 1);
        } else if (this.rightSelected) {
          wx.setStorageSync("breed", 2);
        } else {
          wx.setStorageSync("breed", 3);
        }
        common_vendor.index.navigateTo({
          url: `/pages/IDCreate/IDCreate3/IDCreate3`
        });
      }
    },
    selectLeft() {
      this.leftSelected = !this.leftSelected;
      this.rightSelected = false;
      this.isActive = this.leftSelected || this.rightSelected;
      if (this.leftSelected) {
        this.leftImageUrl = this.thirdImageUrl;
        this.rightImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectDogOrCat/rightNS.png";
      } else {
        this.leftImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectDogOrCat/leftNS.png";
      }
    },
    selectRight() {
      this.rightSelected = !this.rightSelected;
      this.leftSelected = false;
      this.isActive = this.leftSelected || this.rightSelected;
      if (this.rightSelected) {
        this.rightImageUrl = this.fourthImageUrl;
        this.leftImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectDogOrCat/leftNS.png";
      } else {
        this.rightImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectDogOrCat/rightNS.png";
      }
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: $data.Text
    }),
    b: $data.leftImageUrl,
    c: $data.leftSelected ? "#fca547" : "#9f9f9f",
    d: common_vendor.o((...args) => $options.selectLeft && $options.selectLeft(...args)),
    e: $data.rightImageUrl,
    f: $data.rightSelected ? "#fca547" : "#9f9f9f",
    g: common_vendor.o((...args) => $options.selectRight && $options.selectRight(...args)),
    h: $data.isActive ? 1 : "",
    i: common_vendor.o((...args) => $options.nextpage && $options.nextpage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-decd52d9"], ["__file", "D:/uniapp/petApp/pages/IDCreate/IDCreate2/IDCreate2.vue"]]);
wx.createPage(MiniProgramPage);
