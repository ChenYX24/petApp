"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "选择类型",
      isActive: false,
      leftSelected: false,
      rightSelected: false,
      leftImageUrl: "/static/IDCreate/selectDogOrCat/leftNS.png",
      rightImageUrl: "/static/IDCreate/selectDogOrCat/rightNS.png",
      thirdImageUrl: "/static/IDCreate/selectDogOrCat/leftS.png",
      fourthImageUrl: "/static/IDCreate/selectDogOrCat/rightS.png"
    };
  },
  methods: {
    nextpage() {
      if (this.isActive) {
        if (this.leftSelected) {
          common_vendor.wx$1.setStorageSync("breed", 1);
        } else if (this.rightSelected) {
          common_vendor.wx$1.setStorageSync("breed", 2);
        } else {
          common_vendor.wx$1.setStorageSync("breed", 3);
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
        this.rightImageUrl = "/static/IDCreate/selectDogOrCat/rightNS.png";
      } else {
        this.leftImageUrl = "/static/IDCreate/selectDogOrCat/leftNS.png";
      }
    },
    selectRight() {
      this.rightSelected = !this.rightSelected;
      this.leftSelected = false;
      this.isActive = this.leftSelected || this.rightSelected;
      if (this.rightSelected) {
        this.rightImageUrl = this.fourthImageUrl;
        this.leftImageUrl = "/static/IDCreate/selectDogOrCat/leftNS.png";
      } else {
        this.rightImageUrl = "/static/IDCreate/selectDogOrCat/rightNS.png";
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-decd52d9"], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/IDCreate/IDCreate2/IDCreate2.vue"]]);
wx.createPage(MiniProgramPage);
