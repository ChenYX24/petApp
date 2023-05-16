"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "comments",
  props: {
    text: {
      type: String,
      default: ""
    },
    avatarUrl: {
      type: String,
      default: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/dog.png"
    },
    username: {
      type: String,
      default: "团小萌"
    }
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.avatarUrl,
    b: common_vendor.o((...args) => _ctx.getUser && _ctx.getUser(...args)),
    c: common_vendor.t($props.username),
    d: common_vendor.t($props.text)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/components/comments.vue"]]);
wx.createComponent(Component);
