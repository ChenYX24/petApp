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
      avatarUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/dog.png",
      avatarUrl1: "/static/activity/头像1.jpg",
      avatarUrl2: "/static/activity/头像2.jpeg",
      swiperList: [
        { imgUrl: "/static//activity/柴犬.jpg" },
        { imgUrl: "/static//activity/柴犬2.jpg" },
        { imgUrl: "/static//activity/柴犬3.jpg" }
      ]
    };
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
        a: item.imgUrl,
        b: index
      };
    }),
    e: _ctx.current,
    f: $data.avatarUrl1,
    g: common_vendor.o((...args) => $options.getUser && $options.getUser(...args)),
    h: $data.avatarUrl2,
    i: common_vendor.o((...args) => $options.getUser && $options.getUser(...args)),
    j: $data.avatarUrl2,
    k: common_vendor.o((...args) => $options.getUser && $options.getUser(...args)),
    l: common_vendor.p({
      text: 123456
    }),
    m: common_vendor.f($data.commentsarr, (comment, index, i0) => {
      return {
        a: "b883b432-1-" + i0,
        b: common_vendor.p({
          text: comment.text
        }),
        c: index
      };
    }),
    n: common_vendor.o((...args) => $options.handleKey && $options.handleKey(...args)),
    o: common_vendor.o((...args) => $options.handleEnterKey && $options.handleEnterKey(...args)),
    p: $data.text,
    q: common_vendor.o(($event) => $data.text = $event.detail.value)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/pages/activity/activityPage/activityPage.vue"]]);
wx.createPage(MiniProgramPage);
