"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "选择到家日期",
      placeholderText: "#cea697",
      inputValue: "",
      imageSrc: "",
      breed: "",
      name: ""
    };
  },
  computed: {
    isActive() {
      return this.inputValue.trim() !== "";
    }
  },
  onLoad() {
    this.breed = common_vendor.index.getStorageSync("breed");
    this.name = common_vendor.index.getStorageSync("petName");
  },
  methods: {
    nextpage() {
      if (this.isActive) {
        common_vendor.index.navigateTo({
          url: `/pages/IDCreate/IDCreate6/IDCreate6`
        });
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
    b: $data.inputValue,
    c: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    d: this.breed == 1 ? "/static/IDCreate//selectTime/dogHome.png" : this.breed == 2 ? "/static/IDCreate//selectTime/catHome.png" : "/static/IDCreate//selectTime/dogHome.png",
    e: common_vendor.t($data.name),
    f: $options.isActive ? 1 : "",
    g: common_vendor.o((...args) => $options.nextpage && $options.nextpage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9dcc425f"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/IDCreate/IDCreate6/IDCreate6.vue"]]);
wx.createPage(MiniProgramPage);
