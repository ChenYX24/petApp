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
      default: "\u56E2\u5C0F\u840C"
    }
  },
  data() {
    return {
      isAnimation: false
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.avatarUrl,
    b: common_vendor.o((...args) => _ctx.getUser && _ctx.getUser(...args)),
    c: common_vendor.t($props.username),
    d: common_vendor.t($props.text),
    e: _ctx.heartIcon,
    f: common_vendor.o((...args) => _ctx.toggleHeart && _ctx.toggleHeart(...args)),
    g: $data.isAnimation ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/components/comments.vue"]]);
wx.createComponent(Component);
