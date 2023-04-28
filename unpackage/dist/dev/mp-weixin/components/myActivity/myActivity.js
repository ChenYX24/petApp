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
      return this.isHeartActive ? "../../static/myActivity/redHeart.png" : "/static/activity/点赞.png";
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.imageSrc,
    b: $props.tag && $props.tag.length > 0
  }, $props.tag && $props.tag.length > 0 ? {
    c: common_vendor.t($props.tag[0])
  } : {}, {
    d: $data.isAnimation ? 1 : "",
    e: $options.heartIcon,
    f: common_vendor.o((...args) => $options.toggleHeart && $options.toggleHeart(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/components/myActivity/myActivity.vue"]]);
wx.createComponent(Component);
