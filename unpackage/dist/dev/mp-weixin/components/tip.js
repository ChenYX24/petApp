"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "tip",
  data() {
    return {
      textValue: ""
    };
  },
  methods: {
    tipchange(item, index) {
      common_vendor.wx$1.setStorageSync("myData", { item, index });
      common_vendor.index.navigateTo({
        url: `/pages/notebook/notebookForm`,
        // 传递参数 
        success: function() {
          common_vendor.index.$emit("tipchange", { item, index });
        }
      });
    },
    remove(index) {
      console.log(index);
      this.list.splice(index, 1);
    }
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
        a: common_vendor.o(($event) => $options.remove(index), index),
        b: common_vendor.t(item),
        c: index,
        d: common_vendor.o(($event) => $options.tipchange(item, index), index)
      };
    }),
    b: common_vendor.n({
      "bg-yellow": $props.flag,
      "bg-red": !$props.flag
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/components/tip.vue"]]);
wx.createComponent(Component);
