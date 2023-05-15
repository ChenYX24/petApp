"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "TopBar",
  props: {
    texts: {
      type: Array,
      required: false,
      default: ["提醒", "记录"]
    },
    index: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    toWhere(key) {
      this.$emit("toWhere", key);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(this.texts, (item, key, i0) => {
      return common_vendor.e({
        a: $props.index === key
      }, $props.index === key ? {
        b: common_vendor.t(item),
        c: common_vendor.o(($event) => $options.toWhere(key))
      } : {
        d: common_vendor.t(item),
        e: common_vendor.o(($event) => $options.toWhere(key))
      });
    })
  };
}

const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/components/TopBar.vue"]]);

wx.createComponent(Component);
