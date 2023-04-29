"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "navBar",
  props: {
    text: {
      type: String
    },
    Nav: {
      type: String
    }
  },
  data() {
    return {
      back: "<",
      navH: null
    };
  },
  methods: {
    backClick() {
      if (this.Nav) {
        common_vendor.index.navigateTo({
          url: `${this.Nav}`
        });
      } else {
        common_vendor.index.navigateBack({
          delta: 1
        });
      }
    }
  },
  created() {
    const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    this.navH = menuButtonInfo.top;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.navH + "px",
    b: common_vendor.t($data.back),
    c: common_vendor.o(($event) => $options.backClick()),
    d: common_vendor.t($props.text),
    e: $data.navH + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/components/navBar/navBar.vue"]]);
wx.createComponent(Component);
