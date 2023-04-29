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
    },
    addNote() {
      const item = ["", "", "", "", ""];
      const index = -1;
      common_vendor.wx$1.setStorageSync("myData", { item, index });
      this.$emit("updateAdd");
      common_vendor.index.navigateTo({
        url: `/pages/notebook/notebookForm`
      });
    },
    ActivityThoughtCreate() {
      this.$emit("updateAdd");
      common_vendor.index.navigateTo({
        url: `/pages/activity/ActivityThoughtCreate`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.addNote && $options.addNote(...args)),
    b: common_vendor.o((...args) => $options.ActivityThoughtCreate && $options.ActivityThoughtCreate(...args)),
    c: common_vendor.o((...args) => $options.IDCreate && $options.IDCreate(...args)),
    d: $props.isShow ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/components/add/add.vue"]]);
wx.createComponent(Component);
