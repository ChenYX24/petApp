"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const idCard = () => "../../../components/IDCard/IDCard.js";
const _sfc_main = {
  components: {
    navBar,
    idCard
  },
  onLoad: function() {
    this.name = "姓名 " + common_vendor.index.getStorageSync("petName");
    this.breed = common_vendor.index.getStorageSync("breed");
    this.sex = common_vendor.index.getStorageSync("sex");
    this.city = common_vendor.index.getStorageSync("city");
    let birthday = new Date(common_vendor.index.getStorageSync("birthday"));
    this.dataOb = { "name": this.name, "breed": this.breed, "sex": this.sex, "city": this.city, "birthday": birthday, "Image": common_vendor.index.getStorageSync("petImageMatting") };
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
      Image: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/cat.png",
      ImgBackground: "",
      textColor: "",
      dataOb: {},
      idCardList: []
    };
  },
  methods: {
    nextpage() {
      let temp = common_vendor.index.getStorageSync("idCardList");
      if (!temp) {
        this.idCardList = [];
        this.idCardList.push(this.dataOb);
      } else {
        this.idCardList = temp;
        this.idCardList.push(this.dataOb);
      }
      common_vendor.wx$1.setStorageSync("idCardList", this.idCardList);
      console.log(this.dataOb);
      common_vendor.index.reLaunch({
        url: `/pages/petList/petList`
      });
    },
    share() {
    },
    padZero(num) {
      return num < 10 ? "0" + num : num;
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  const _component_idCard = common_vendor.resolveComponent("idCard");
  (_component_nav_bar + _component_idCard)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: $data.Text
    }),
    b: common_vendor.p({
      dataList: $data.dataOb
    }),
    c: common_vendor.o((...args) => $options.share && $options.share(...args)),
    d: common_vendor.o((...args) => $options.nextpage && $options.nextpage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-87750e9b"], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/IDCreate/IDCreate7/IDCreate7.vue"]]);
wx.createPage(MiniProgramPage);
