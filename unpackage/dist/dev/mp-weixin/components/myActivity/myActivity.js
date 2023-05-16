"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "myActivity",
  props: {
    imageSrc: String,
    tag: Array
  },
  data() {
    return {
      isHeartActive: false,
      isAnimation: false
    };
  },
  computed: {
    heartIcon() {
      return this.isHeartActive ? "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/myActivity/redHeart.png" : "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/\u70B9\u8D5E.png";
    }
  },
  methods: {
    async toggleHeart() {
      this.isHeartActive = !this.isHeartActive;
      if (this.isHeartActive) {
        await this.$nextTick();
        console.log(111);
        this.isAnimation = true;
        setTimeout(() => {
          this.isAnimation = false;
        }, 1e3);
      }
    },
    clickActivity() {
      common_vendor.index.navigateTo({
        url: `/pages/activity/activityPage/activityPage`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.imageSrc,
    b: common_vendor.o((...args) => $options.clickActivity && $options.clickActivity(...args)),
    c: $props.tag && $props.tag.length > 0
  }, $props.tag && $props.tag.length > 0 ? {
    d: common_vendor.t($props.tag[0])
  } : {}, {
    e: $data.isAnimation ? 1 : "",
    f: $options.heartIcon,
    g: common_vendor.o((...args) => $options.toggleHeart && $options.toggleHeart(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/components/myActivity/myActivity.vue"]]);
wx.createComponent(Component);
