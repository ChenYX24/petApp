"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "\u8BBE\u7F6E",
      Nav: "/pages/home/home"
    };
  },
  methods: {
    goLanguage() {
      common_vendor.index.navigateTo({
        url: "/pages/settingLanguage/settingLanguage"
      });
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
      text: $data.Text,
      Nav: $data.Nav
    }),
    b: common_vendor.o((...args) => $options.goLanguage && $options.goLanguage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-018cdf56"], ["__file", "D:/uniapp/petApp/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
