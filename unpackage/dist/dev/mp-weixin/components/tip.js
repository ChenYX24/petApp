"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "tip",
  data() {
    return {
      textValue: ""
      // 存储来自父组件的text属性的值
    };
  },
  props: {
    list: {
      type: String,
      required: true
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    text(newValue) {
      this.textValue = newValue;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    b: common_vendor.n({
      "bg-yellow": $props.flag,
      "bg-red": !$props.flag
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/fjh28/Desktop/petApp/components/tip.vue"]]);
wx.createComponent(Component);
