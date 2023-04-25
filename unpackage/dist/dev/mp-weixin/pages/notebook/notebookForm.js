"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
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
      selectedOption: "reminder"
    };
  },
  methods: {
    onOptionChanged(event) {
      console.log(event.detail.value);
    }
  },
  computed: {
    isActive() {
      return this.inputValue.trim() !== "" || this.text1.trim() !== "" || this.text2.trim() !== "" || this.text3.trim() !== "" || this.text4.trim() !== "";
    }
  },
  nextpage() {
    if (this.isActive) {
      common_vendor.index.navigateTo({
        url: `/pages/IDCreate/IDCreate6/IDCreate6`
      });
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
    n: $data.selectedOption === "reminder",
    o: common_vendor.o((...args) => $options.onOptionChanged && $options.onOptionChanged(...args)),
    p: $data.selectedOption === "record",
    q: common_vendor.o((...args) => $options.onOptionChanged && $options.onOptionChanged(...args)),
    r: $data.inputValue || $data.text1 !== "" ? 1 : "",
    s: $data.inputValue,
    t: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    v: $options.isActive ? 1 : "",
    w: common_vendor.o((...args) => _ctx.nextpage && _ctx.nextpage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/pages/notebook/notebookForm.vue"]]);
wx.createPage(MiniProgramPage);
