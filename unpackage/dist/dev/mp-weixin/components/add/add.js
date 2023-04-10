"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "add",
  data() {
    return {};
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    IDCreate() {
      this.$emit("updateAdd");
      common_vendor.index.navigateTo({
        url: `/pages/IDCreate/IDCreate/IDCreate`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.IDCreate && $options.IDCreate(...args)),
    b: $props.isShow ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/components/add/add.vue"]]);
wx.createComponent(Component);
