"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    const currentDate = this.getDate({
      format: true
    });
    return {
      Text: "\u9009\u62E9\u51FA\u751F\u65E5\u671F",
      placeholderText: "#cea697",
      inputValue: "",
      imageSrc: "",
      breed: "",
      name: "",
      date: "\u8BF7\u9009\u62E9ta\u7684\u51FA\u751F\u65E5\u671F",
      trueDate: "xx",
      currentDate
    };
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
    isActive() {
      return this.trueDate !== "xx";
    }
  },
  onLoad() {
    this.breed = common_vendor.index.getStorageSync("breed");
    this.name = common_vendor.index.getStorageSync("petName");
  },
  methods: {
    bindDateChange: function(e) {
      this.date = e.detail.value;
      this.trueDate = this.getDaysSinceDate(e.detail.value, this.currentDate);
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    getDaysSinceDate(dateString, nowDateString) {
      const date = new Date(dateString);
      const now = new Date(nowDateString);
      const diff = now.getTime() - date.getTime();
      const days = Math.floor(diff / 864e5);
      return days;
    },
    nextpage() {
      if (this.isActive) {
        wx.setStorageSync("birthday", this.date);
        common_vendor.index.navigateTo({
          url: `/pages/IDCreate/IDCreate6/IDCreate6`
        });
      }
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
    b: common_vendor.t($data.date),
    c: $data.date,
    d: $options.startDate,
    e: $options.endDate,
    f: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    g: this.breed == 1 ? "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectTime/dogBirthday.png" : this.breed == 2 ? "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectTime/catBirthday.png" : "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectTime/dogBirthday.png",
    h: common_vendor.t($data.name),
    i: common_vendor.t($data.trueDate),
    j: $options.isActive ? 1 : "",
    k: common_vendor.o((...args) => $options.nextpage && $options.nextpage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9c7ada79"], ["__file", "D:/uniapp/petApp/pages/IDCreate/IDCreate5/IDCreate5.vue"]]);
wx.createPage(MiniProgramPage);
