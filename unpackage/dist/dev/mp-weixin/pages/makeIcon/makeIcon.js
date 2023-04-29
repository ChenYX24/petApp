"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "\u5236\u4F5C\u8868\u60C5\u5305",
      Nav: "/pages/home/home",
      selectedTab: "template",
      isHeartActive: false,
      isAnimation: false,
      emoticons: [],
      selectedImage: "",
      likeIcon: []
    };
  },
  mounted() {
    for (let i = 1; i <= 12; i++) {
      this.emoticons.push({
        src: `/static/emoticon/${i}.png`
      });
    }
    if (this.emoticons) {
      this.selectedImage = this.emoticons[0].src;
    }
    this.likeIcon = common_vendor.index.getStorageSync("likeIcon");
    const index = this.likeIcon.findIndex((item) => item == this.selectedImage);
    if (index > -1) {
      this.isHeartActive = true;
    } else {
      this.isHeartActive = false;
    }
  },
  computed: {
    heartIcon() {
      return this.isHeartActive ? "../../static/myActivity/redHeart.png" : "/static/activity/\u70B9\u8D5E.png";
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
      this.selectedImage = image.src;
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
      text: $data.Text,
      Nav: $data.Nav
    }),
    b: $data.selectedImage
  }, $data.selectedImage ? {
    c: $data.selectedImage
  } : {}, {
    d: $options.heartIcon,
    e: common_vendor.o((...args) => $options.toggleHeart && $options.toggleHeart(...args)),
    f: $data.isAnimation ? 1 : "",
    g: $data.selectedTab === "template"
  }, $data.selectedTab === "template" ? {} : {}, {
    h: $data.selectedTab === "template" ? 1 : "",
    i: common_vendor.o(($event) => $data.selectedTab = "template"),
    j: $data.selectedTab === "creation"
  }, $data.selectedTab === "creation" ? {} : {}, {
    k: $data.selectedTab === "creation" ? 1 : "",
    l: common_vendor.o(($event) => $data.selectedTab = "creation"),
    m: $data.selectedTab === "template"
  }, $data.selectedTab === "template" ? {
    n: common_vendor.f($data.emoticons, (image, index, i0) => {
      return {
        a: index,
        b: image.src,
        c: common_vendor.o(($event) => $options.showImage(image), index)
      };
    })
  } : {}, {
    o: $data.selectedTab === "creation"
  }, $data.selectedTab === "creation" ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9a8299cf"], ["__file", "D:/uniapp/petApp/pages/makeIcon/makeIcon.vue"]]);
wx.createPage(MiniProgramPage);
