"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "\u5DF2\u6536\u85CF",
      Nav: "/pages/home/home?tab=home",
      isHeartActive: false,
      isAnimation: false,
      selectedImage: "",
      likeIcon: [],
      emoticons: []
    };
  },
  onLoad() {
    this.emoticons = common_vendor.index.getStorageSync("likeIcon");
  },
  mounted() {
    let temp = common_vendor.index.getStorageSync("likeIcon");
    if (!temp) {
      this.likeIcon = [];
      wx.setStorageSync("likeIcon", this.likeIcon);
    } else {
      this.likeIcon = temp;
    }
    if (this.likeIcon) {
      this.selectedImage = this.likeIcon[0];
    }
    this.isHeartActive = true;
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
        this.isAnimation = true;
        setTimeout(() => {
          this.isAnimation = false;
        }, 1e3);
      }
      const index = this.likeIcon.findIndex((item) => item === this.selectedImage);
      if (index > -1) {
        this.likeIcon.splice(index, 1);
      } else {
        this.likeIcon.push(this.selectedImage);
      }
      wx.setStorageSync("likeIcon", this.likeIcon);
    },
    showImage(image) {
      this.selectedImage = image;
      const index = this.likeIcon.findIndex((item) => item == this.selectedImage);
      if (index > -1) {
        this.isHeartActive = true;
      } else {
        this.isHeartActive = false;
      }
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      text: $data.Text
    }),
    b: $data.selectedImage
  }, $data.selectedImage ? {
    c: $data.selectedImage
  } : {}, {
    d: $options.heartIcon,
    e: common_vendor.o((...args) => $options.toggleHeart && $options.toggleHeart(...args)),
    f: $data.isAnimation ? 1 : "",
    g: common_vendor.f($data.emoticons, (image, index, i0) => {
      return {
        a: index,
        b: image,
        c: common_vendor.o(($event) => $options.showImage(image), index)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f5798b04"], ["__file", "D:/uniapp/petApp/pages/fovIcon/fovIcon.vue"]]);
wx.createPage(MiniProgramPage);
