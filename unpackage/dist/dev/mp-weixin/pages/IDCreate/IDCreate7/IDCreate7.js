"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  onLoad: function() {
    this.name = "姓名 " + common_vendor.index.getStorageSync("petName");
    this.breed = common_vendor.index.getStorageSync("breed");
    this.sex = common_vendor.index.getStorageSync("sex");
    this.city = common_vendor.index.getStorageSync("city");
    if (!this.city) {
      this.city = "位置 未知";
    } else {
      this.city = "位置 " + this.city;
    }
    let birthday = new Date(common_vendor.index.getStorageSync("birthday"));
    if (this.sex == 1) {
      this.sexImg = "/static/IDCreate/final/IDBOY.png";
      this.ImgBackground = "/static/IDCreate/final/BIMG.png";
      this.sex = "性别 弟弟";
    } else {
      this.sexImg = "/static/IDCreate/final/IDGIRL.png";
      this.ImgBackground = "/static/IDCreate/final/GIMG.png";
      this.sex = "性别 妹妹";
    }
    this.birthdayY = birthday.getFullYear();
    this.birthdayM = this.padZero(birthday.getMonth() + 1);
    this.birthdayD = this.padZero(birthday.getDate());
    this.birthday = "生日 " + this.birthdayY + "年  " + this.birthdayM + "月  " + this.birthdayD + "日";
  },
  data() {
    return {
      Text: "创建完成",
      name: "",
      breed: "",
      sex: "",
      birthdayY: "",
      birthdayM: "",
      birthdayD: "",
      city: "未知",
      Image: "/static/home/cat.png",
      ImgBackground: ""
    };
  },
  methods: {
    nextpage() {
      if (this.isActive) {
        common_vendor.index.navigateTo({
          url: `/pages/IDCreate/IDCreate3/IDCreate3`
        });
      }
    },
    padZero(num) {
      return num < 10 ? "0" + num : num;
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
    b: common_vendor.t($data.name),
    c: common_vendor.t($data.sex),
    d: common_vendor.t(_ctx.birthday),
    e: common_vendor.t($data.city),
    f: $data.Image,
    g: `url(${this.ImgBackground})`,
    h: `url(${this.sexImg})`
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-87750e9b"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/IDCreate/IDCreate7/IDCreate7.vue"]]);
wx.createPage(MiniProgramPage);
