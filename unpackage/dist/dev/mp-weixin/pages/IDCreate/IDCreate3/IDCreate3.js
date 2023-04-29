"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "\u9009\u62E9\u6027\u522B",
      isActive: false,
      leftSelected: false,
      rightSelected: false,
      leftImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/dogBoy.png",
      rightImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/dogGirl.png",
      thirdImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/dogBoyY.png",
      fourthImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/dogGirlY.png",
      CleftImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/catBoy.png",
      CrightImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/catGirl.png",
      CthirdImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/catBoyY.png",
      CfourthImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/catGirlY.png",
      breed: ""
    };
  },
  onLoad: function(options) {
    this.breed = common_vendor.index.getStorageSync("breed");
  },
  methods: {
    nextpage() {
      if (this.isActive) {
        if (this.leftSelected) {
          wx.setStorageSync("sex", 1);
        } else if (this.rightSelected) {
          wx.setStorageSync("sex", 2);
        }
        common_vendor.index.navigateTo({
          url: `/pages/IDCreate/IDCreate4/IDCreate4`
        });
      }
    },
    selectLeft() {
      this.leftSelected = !this.leftSelected;
      this.rightSelected = false;
      this.isActive = this.leftSelected || this.rightSelected;
      if (this.leftSelected) {
        this.leftImageUrl = this.thirdImageUrl;
        this.rightImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/dogGirl.png";
        this.CleftImageUrl = this.CthirdImageUrl;
        this.CrightImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/catGirl.png";
      } else {
        this.leftImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/dogBoy.png";
        this.CleftImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/catBoy.png";
      }
    },
    selectRight() {
      this.rightSelected = !this.rightSelected;
      this.leftSelected = false;
      this.isActive = this.leftSelected || this.rightSelected;
      if (this.rightSelected) {
        this.rightImageUrl = this.fourthImageUrl;
        this.leftImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/dogBoy.png";
        this.CrightImageUrl = this.CfourthImageUrl;
        this.CleftImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/catBoy.png";
      } else {
        this.rightImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/dogGirl.png";
        this.CrightImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectSex/catGirl.png";
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
    b: $data.breed == 1 ? $data.leftImageUrl : $data.breed == 2 ? $data.CleftImageUrl : $data.leftImageUrl,
    c: $data.leftSelected ? "#fca547" : "#9f9f9f",
    d: common_vendor.o((...args) => $options.selectLeft && $options.selectLeft(...args)),
    e: $data.breed == 1 ? $data.rightImageUrl : $data.breed == 2 ? $data.CrightImageUrl : $data.rightImageUrl,
    f: $data.rightSelected ? "#fca547" : "#9f9f9f",
    g: common_vendor.o((...args) => $options.selectRight && $options.selectRight(...args)),
    h: $data.isActive ? 1 : "",
    i: common_vendor.o((...args) => $options.nextpage && $options.nextpage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-61e445bc"], ["__file", "D:/uniapp/petApp/pages/IDCreate/IDCreate3/IDCreate3.vue"]]);
wx.createPage(MiniProgramPage);
