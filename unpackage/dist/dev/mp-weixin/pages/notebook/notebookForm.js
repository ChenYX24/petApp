"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      tapchangeReceived: false,
      Text: "新建提醒/记录",
      items: [],
      inputValue: "",
      text1: "",
      // Nav:"/pages/notebook/notebook?tab=memo",
      text2: "",
      text3: "",
      text4: "",
      leftSelected: true,
      rightSelected: false,
      leftImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/选择_已选择.png",
      rightImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/选择_未选择.png",
      thirdImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/选择_已选择.png",
      fourthImageUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/选择_已选择.png",
      indexInForm: -1
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
      const indexInForm = this.indexInForm;
      common_vendor.index.request({
        url: "http://43.140.198.154:88/reminder/save/",
        method: "POST",
        data: {
          "reminderId": 0,
          "petId": 0,
          "userId": 0,
          "reminderName": "string",
          "type": "string",
          "content": data,
          "plannedDate": "string",
          "period": "string",
          "isDone": "string",
          "advanceDay": "string",
          "reminderTimeMoment": "string"
        },
        params: { interfaceState: "state" },
        header: {
          "Content-Type": "application/json",
          "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiIyMDFCTkVBUFEzcENreDVra0E1aTB3PT0iLCJleHAiOjE2ODI1ODExMDF9.0XkPv_JsFnT5ByDqoJJ9WTbwcD5TGTPeUC5ZYy77zBc"
        },
        success: (res) => {
          console.log(res.data);
        }
      });
      if (this.isActive) {
        common_vendor.index.navigateTo({
          url: `/pages/notebook/notebook?data=${encodeURIComponent(data)}&leftSelected=${leftSelected}&rightSelected=${rightSelected}&indexInForm=${indexInForm}`,
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
        this.rightImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/选择_未选择.png";
      } else {
        this.leftImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/选择_未选择.png";
      }
    },
    selectRight() {
      this.rightSelected = !this.rightSelected;
      this.leftSelected = false;
      this.isActive = this.leftSelected || this.rightSelected;
      if (this.rightSelected) {
        this.rightImageUrl = this.fourthImageUrl;
        this.leftImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/选择_未选择.png";
      } else {
        this.rightImageUrl = "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/选择_未选择.png";
      }
    }
  },
  mounted() {
    common_vendor.index.$on("tapchange", () => {
      this.tapchangeReceived = true;
    });
  },
  onLoad() {
    const data = common_vendor.wx$1.getStorageSync("myData");
    this.indexInForm = data.index;
    const items = data.item.split("\n");
    this.text1 = items[0] || "";
    this.text2 = items[1] || "";
    this.text3 = items[2] || "";
    this.text4 = items[3] || "";
    this.inputValue = items[4] || "";
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/notebook/notebookForm.vue"]]);
wx.createPage(MiniProgramPage);
