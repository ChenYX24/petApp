"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "tip",
  data() {
    return {};
  },
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.text)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/components/tip.vue"]]);
wx.createComponent(Component);
