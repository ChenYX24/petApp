"use strict";
const common_vendor = require("../common/vendor.js");
const navBar = () => "./navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "新建提醒/记录",
      inputValue: "",
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      leftSelected: true,
      rightSelected: false,
      leftImageUrl: "/static/notebook/选择_已选择.png",
      rightImageUrl: "/static/notebook/选择_未选择.png",
      thirdImageUrl: "/static/notebook/选择_已选择.png",
      fourthImageUrl: "/static/notebook/选择_已选择.png"
    };
  },
  onShow() {
    this.dataList = [];
  },
  methods: {
    onOptionChanged(event) {
      console.log(event.detail.value);
    },
    buttonClicked() {
      const data = `${this.text1}
${this.text2}
${this.text3}
${this.text4}
${this.inputValue}`;
      const leftSelected = this.leftSelected ? "1" : "0";
      const rightSelected = this.rightSelected ? "1" : "0";
      if (this.isActive) {
        common_vendor.index.navigateTo({
          url: `/pages/notebook/notebook?data=${encodeURIComponent(data)}&leftSelected=${leftSelected}&rightSelected=${rightSelected}`,
          success: () => {
            common_vendor.index.$emit("buttonClicked");
          }
        });
      }
    },
    selectLeft() {
      this.leftSelected = !this.leftSelected;
      this.rightSelected = false;
      this.isActive = this.leftSelected || this.rightSelected;
      if (this.leftSelected) {
        this.leftImageUrl = this.thirdImageUrl;
        this.rightImageUrl = "/static/notebook/选择_未选择.png";
      } else {
        this.leftImageUrl = "/static/notebook/选择_未选择.png";
      }
    },
    selectRight() {
      this.rightSelected = !this.rightSelected;
      this.leftSelected = false;
      this.isActive = this.leftSelected || this.rightSelected;
      if (this.rightSelected) {
        this.rightImageUrl = this.fourthImageUrl;
        this.leftImageUrl = "/static/notebook/选择_未选择.png";
      } else {
        this.rightImageUrl = "/static/notebook/选择_未选择.png";
      }
    }
  },
  computed: {
    isActive() {
      return this.inputValue.trim() !== "" || this.text1.trim() !== "" || this.text2.trim() !== "" || this.text3.trim() !== "" || this.text4.trim() !== "";
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
      text: $data.Text
    }),
    b: $data.text1 !== "" ? 1 : "",
    c: $data.text1,
    d: common_vendor.o(($event) => $data.text1 = $event.detail.value),
    e: $data.text2 !== "" ? 1 : "",
    f: $data.text2,
    g: common_vendor.o(($event) => $data.text2 = $event.detail.value),
    h: $data.text3 !== "" ? 1 : "",
    i: $data.text3,
    j: common_vendor.o(($event) => $data.text3 = $event.detail.value),
    k: $data.text4 !== "" ? 1 : "",
    l: $data.text4,
    m: common_vendor.o(($event) => $data.text4 = $event.detail.value),
    n: $data.leftImageUrl,
    o: $data.leftSelected ? "rgba(230, 209, 198, 1)" : "#9f9f9f",
    p: common_vendor.o((...args) => $options.selectLeft && $options.selectLeft(...args)),
    q: $data.rightImageUrl,
    r: $data.rightSelected ? "rgba(230, 209, 198, 1)" : "#9f9f9f",
    s: common_vendor.o((...args) => $options.selectRight && $options.selectRight(...args)),
    t: $data.inputValue || $data.text1 !== "" ? 1 : "",
    v: $data.inputValue,
    w: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    x: $options.isActive ? 1 : "",
    y: common_vendor.o((...args) => $options.buttonClicked && $options.buttonClicked(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/fjh28/Desktop/petApp/components/notebookform.vue"]]);
wx.createComponent(Component);
