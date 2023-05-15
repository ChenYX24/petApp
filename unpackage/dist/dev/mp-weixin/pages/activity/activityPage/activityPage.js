"use strict";
const common_vendor = require("../../../common/vendor.js");
const comments = () => "../../../components/comments.js";
const _sfc_main = {
  components: {
    comments
  },
  data() {
    return {
      text: "",
      Text: "新建朋友圈",
      commentsarr: [],
      text1: "#春日派对",
      text2: "今天小柴探索森林新地图去咯~~",
      text3: "2023-05-16",
      avatarUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/dog.png",
      avatarUrl1: "/static/activity/头像1.jpg",
      avatarUrl2: "/static/activity/头像2.jpeg",
      swiperList: [
        "/static//activity/柴犬.jpg",
        "/static//activity/柴犬2.jpg",
        "/static//activity/柴犬3.jpg"
      ]
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    backToActivity() {
      common_vendor.index.navigateTo({
        url: "/pages/activity/activity"
      });
    },
    getUser() {
      common_vendor.index.navigateTo({
        url: "/pages/home/home"
      });
    },
    handleEnterKey() {
      console.log("评论已存储：");
      const comment = {
        text: this.text
      };
      this.commentsarr.push(comment);
      const key = "commentByUser";
      const value = this.text;
      common_vendor.wx$1.setStorageSync(key, value);
      this.text = "";
      console.log("评论已存储：", key, value);
    },
    initData() {
      this.swiperList = common_vendor.wx$1.getStorageSync("imageSrc") || this.swiperList;
      this.text2 = common_vendor.wx$1.getStorageSync("inputValue") || this.text2;
    },
    handleKey() {
      console.log("评论已存储：");
    }
  }
};
if (!Array) {
  const _component_comments = common_vendor.resolveComponent("comments");
  _component_comments();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.backToActivity && $options.backToActivity(...args)),
    b: $data.avatarUrl,
    c: common_vendor.o((...args) => $options.getUser && $options.getUser(...args)),
    d: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    e: _ctx.current,
    f: common_vendor.t($data.text1),
    g: common_vendor.t($data.text2),
    h: common_vendor.t($data.text3),
    i: $data.avatarUrl1,
    j: common_vendor.o((...args) => $options.getUser && $options.getUser(...args)),
    k: $data.avatarUrl2,
    l: common_vendor.o((...args) => $options.getUser && $options.getUser(...args)),
    m: $data.avatarUrl2,
    n: common_vendor.o((...args) => $options.getUser && $options.getUser(...args)),
    o: common_vendor.p({
      text: 123456
    }),
    p: common_vendor.f($data.commentsarr, (comment, index, i0) => {
      return {
        a: "498e323e-1-" + i0,
        b: common_vendor.p({
          text: comment.text
        }),
        c: index
      };
    }),
    q: common_vendor.o((...args) => $options.handleKey && $options.handleKey(...args)),
    r: common_vendor.o((...args) => $options.handleEnterKey && $options.handleEnterKey(...args)),
    s: $data.text,
    t: common_vendor.o(($event) => $data.text = $event.detail.value)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/activity/activityPage/activityPage.vue"]]);
wx.createPage(MiniProgramPage);
