"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const myActivity = () => "../../components/myActivity/myActivity.js";
const _sfc_main = {
  components: {
    TabBar,
    myActivity
  },
  onLoad: function(options) {
    this.tab = options.tab;
    this.city = common_vendor.index.getStorageSync("city");
    if (!this.city) {
      this.city = "\u672A\u77E5";
    }
  },
  mounted() {
    const firstImage = JSON.parse(wx.getStorageSync("firstImage"));
    if (!this.imageSrcArr.includes(firstImage)) {
      this.imageSrcArr.push(firstImage);
    }
    wx.setStorageSync("imageSrcArr", JSON.stringify(this.imageSrcArr));
  },
  onShow() {
    const imageSrcArr = JSON.parse(wx.getStorageSync("imageSrcArr"));
    this.imageSrcArr = imageSrcArr || [];
  },
  data() {
    return {
      tab: "",
      src: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/dog.png",
      src1: "/static//activity/\u67F4\u72AC.jpg",
      imageSrcArr: [],
      activityThoughtArr: [],
      tag: ["\u6625\u65E5\u6D3E\u5BF9", "\u590F\u65E5\u5BF9\u6D3E"],
      navH: null,
      city: "\u672A\u77E5"
    };
  },
  async onLoad() {
    await common_vendor.index.request({
      url: getApp().globalData.host + "/activityThought/listByUserId?userId=" + common_vendor.index.getStorageSync("userId"),
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "Authorization": common_vendor.index.getStorageSync("token")
      }
    }).then((res) => {
      console.log(res.data.activityThoughtList);
      var resActivityThought = res.data.activityThoughtList;
      console.log(resActivityThought);
      for (var i = 0; i < resActivityThought.length; i++) {
        var activityThought = {
          imageSrc: resActivityThought[i].photos,
          activityThoughtId: resActivityThought[i].activityThoughtId,
          activityThoughtUserId: resActivityThought[i].userId
        };
        this.activityThoughtArr.push(activityThought);
      }
      console.log(this.activityThoughtArr);
    }).catch((res) => {
      console.log(res);
    });
  },
  created() {
    const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    this.navH = menuButtonInfo.top;
  }
};
if (!Array) {
  const _easycom_myActivity2 = common_vendor.resolveComponent("myActivity");
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  (_easycom_myActivity2 + _component_tab_bar)();
}
const _easycom_myActivity = () => "../../components/myActivity/myActivity.js";
if (!Math) {
  _easycom_myActivity();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.city),
    b: $data.navH + "px",
    c: common_vendor.f($data.imageSrcArr, (imagesrc, index, i0) => {
      return {
        a: "da48f91d-0-" + i0,
        b: common_vendor.p({
          imageSrc: imagesrc,
          tag: $data.tag
        }),
        c: index
      };
    }),
    d: common_vendor.f($data.activityThoughtArr, (activityThought, index, i0) => {
      return {
        a: "da48f91d-1-" + i0,
        b: common_vendor.p({
          imageSrc: activityThought.imageSrc[0],
          tag: $data.tag,
          activityThoughtId: activityThought.activityThoughtId,
          activityThoughtUserId: activityThought.activityThoughtUserId
        }),
        c: index
      };
    }),
    e: common_vendor.p({
      imageSrc: $data.src1,
      tag: $data.tag
    }),
    f: common_vendor.p({
      imageSrc: $data.src,
      tag: $data.tag
    }),
    g: common_vendor.p({
      imageSrc: $data.src
    }),
    h: common_vendor.p({
      imageSrc: $data.src
    }),
    i: common_vendor.p({
      imageSrc: $data.src,
      tag: $data.tag
    }),
    j: common_vendor.p({
      imageSrc: $data.src
    }),
    k: common_vendor.p({
      activeTab: $data.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da48f91d"], ["__file", "D:/uniapp/petApp/pages/activity/activity.vue"]]);
wx.createPage(MiniProgramPage);
