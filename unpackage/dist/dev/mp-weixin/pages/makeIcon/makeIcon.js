"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "制作表情包",
      Nav: "/pages/home/home",
      selectedTab: "template",
      isHeartActive: false,
      isAnimation: false,
      emoticons: [],
      selectedImage: "",
      likeIcon: [],
      H: 180,
      S: 50,
      B: 50,
      isEdit: true
    };
  },
  mounted() {
    for (let i = 1; i <= 12; i++) {
      this.emoticons.push({
        src: `https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/emoticon/${i}.png`
      });
    }
    if (this.emoticons) {
      this.selectedImage = this.emoticons[0].src;
    }
    let temp = common_vendor.index.getStorageSync("likeIcon");
    if (!temp) {
      this.likeIcon = [];
      common_vendor.wx$1.setStorageSync("likeIcon", this.likeIcon);
    } else {
      this.likeIcon = temp;
    }
    const index = this.likeIcon.findIndex((item) => item == this.selectedImage);
    if (index > -1) {
      this.isHeartActive = true;
    } else {
      this.isHeartActive = false;
    }
  },
  computed: {
    heartIcon() {
      return this.isHeartActive ? "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/myActivity/redHeart.png" : "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/点赞.png";
    },
    finalColor() {
      return `hsl(${this.H},${this.S}%, ${this.realB}%)`;
    },
    gradientStyleS() {
      return {
        background: `linear-gradient(90deg, hsl(${this.H}, 0%, ${this.realB}%) 0%, hsl(${this.H}, 100%, ${this.realB}%) 100%)`
      };
    },
    gradientStyleB() {
      return {
        "background": `linear-gradient(90deg,hsl(${this.H},${this.S}%,0%) 0%, hsl(${this.H},${this.S}%,100%) 100%)`
      };
    },
    realB() {
      return 100 - this.B;
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
      common_vendor.wx$1.setStorageSync("likeIcon", this.likeIcon);
    },
    showImage(image) {
      this.selectedImage = image.src;
      const index = this.likeIcon.findIndex((item) => item == this.selectedImage);
      if (index > -1) {
        this.isHeartActive = true;
      } else {
        this.isHeartActive = false;
      }
    },
    updateH(e) {
      this.H = e.detail.value;
    },
    updateS(e) {
      this.S = e.detail.value;
    },
    updateB(e) {
      this.B = e.detail.value;
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
  }, $data.selectedTab === "creation" ? {
    p: $data.H,
    q: common_vendor.o((...args) => $options.updateH && $options.updateH(...args)),
    r: $data.S,
    s: common_vendor.o((...args) => $options.updateS && $options.updateS(...args)),
    t: common_vendor.s($options.gradientStyleS),
    v: $data.B,
    w: common_vendor.o((...args) => $options.updateB && $options.updateB(...args)),
    x: common_vendor.s($options.gradientStyleB),
    y: $options.finalColor,
    z: $data.isEdit ? 1 : "",
    A: common_vendor.o(($event) => $data.isEdit = true),
    B: !$data.isEdit ? 1 : "",
    C: common_vendor.o(($event) => $data.isEdit = false)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9a8299cf"], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/makeIcon/makeIcon.vue"]]);
wx.createPage(MiniProgramPage);
