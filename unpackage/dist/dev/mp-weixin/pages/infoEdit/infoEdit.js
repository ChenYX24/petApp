"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "编辑资料",
      inputValue: "",
      text1: "",
      Nav: "/pages/home/home?tab=home",
      text2: "",
      text3: "",
      text4: ""
    };
  },
  computed: {
    isActive() {
      return this.inputValue.trim() !== "" || this.text1.trim() !== "" || this.text2.trim() !== "" || this.text3.trim() !== "" || this.text4.trim() !== "";
    }
  },
  methods: {
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多选择的图片数量，此处为1
        sizeType: ["compressed"],
        // 压缩图片
        sourceType: ["album", "camera"],
        // 可以从相册选择或拍照
        success: (res) => {
          this.imageSrc = res.tempFilePaths[0];
        }
      });
    },
    buttonClicked() {
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: $data.Text,
      Nav: $data.Nav
    }),
    b: _ctx.imageSrc ? _ctx.imageSrc : "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/picture&name/camera.png",
    c: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    d: $data.inputValue,
    e: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    f: $data.text1 !== "" ? 1 : "",
    g: $data.text1,
    h: common_vendor.o(($event) => $data.text1 = $event.detail.value),
    i: $data.text2 !== "" ? 1 : "",
    j: $data.text2,
    k: common_vendor.o(($event) => $data.text2 = $event.detail.value),
    l: $data.text3 !== "" ? 1 : "",
    m: $data.text3,
    n: common_vendor.o(($event) => $data.text3 = $event.detail.value),
    o: $data.text4 !== "" ? 1 : "",
    p: $data.text4,
    q: common_vendor.o(($event) => $data.text4 = $event.detail.value),
    r: $options.isActive ? 1 : "",
    s: common_vendor.o((...args) => $options.buttonClicked && $options.buttonClicked(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/pages/infoEdit/infoEdit.vue"]]);
wx.createPage(MiniProgramPage);
