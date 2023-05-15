"use strict";
const common_vendor = require("../../../common/vendor.js");
const comments = () => "../../../components/comments.js";
var socket = null;
const _sfc_main = {
  components: {
    comments
  },
  data() {
    return {
      activityThoughtId: "1",
      text: "",
      Text: "\u65B0\u5EFA\u670B\u53CB\u5708",
      commentsarr: [],
      avatarUrl: "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/dog.png",
      avatarUrl1: "/static/activity/\u5934\u50CF1.jpg",
      avatarUrl2: "/static/activity/\u5934\u50CF2.jpeg",
      swiperList: [
        { imgUrl: "/static//activity/\u67F4\u72AC.jpg" },
        { imgUrl: "/static//activity/\u67F4\u72AC2.jpg" },
        { imgUrl: "/static//activity/\u67F4\u72AC3.jpg" }
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
      console.log("\u8BC4\u8BBA\u5DF2\u5B58\u50A8\uFF1A");
      const comment = {
        text: this.text,
        avatarUrl: common_vendor.index.getStorageSync("avatarUrl"),
        username: common_vendor.index.getStorageSync("nickName")
      };
      this.commentsarr.push(comment);
      const key = "commentByUser";
      const value = this.text;
      wx.setStorageSync(key, value);
      console.log("\u8BC4\u8BBA\u5DF2\u5B58\u50A8\uFF1A", key, value);
      var message = {
        username: 2,
        to: "\u6BCF\u4E00\u4E2A\u6D3B\u52A8\u7B14\u8BB0",
        message: this.text,
        activityThought: 1
      };
      common_vendor.index.sendSocketMessage({
        data: JSON.stringify(message)
      });
      common_vendor.index.request({
        url: "http://localhost:88/interaction/comment/action?actionType=0&commentText=" + this.text + "&activityThoughtId=" + this.activityThoughtId + "&userId=" + common_vendor.index.getStorageSync("userId"),
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "Authorization": common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          console.log(res);
        },
        fail: (res) => {
          console.log(res);
        }
      });
      this.text = "";
    },
    handleKey() {
      console.log("\u8BC4\u8BBA\u5DF2\u5B58\u50A8\uFF1A");
    }
  },
  onLoad() {
    var that = this;
    common_vendor.index.request({
      url: "http://localhost:88/interaction/comment/listById/?activityThoughtId=" + this.activityThoughtId,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Authorization": common_vendor.index.getStorageSync("token")
      },
      success: (res) => {
        var arr = res.data.commentList;
        for (let i = 0; i < arr.length; i++) {
          var comment = {
            text: arr[i].comment,
            avatarUrl: arr[i].avatarUrl,
            username: arr[i].username
          };
          this.commentsarr.push(comment);
        }
        console.log(res);
        console.log(this.commentsarr);
        console.log(that.commentsarr);
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },
  onShow() {
    const userId = common_vendor.index.getStorageSync("userId");
    socket = common_vendor.index.connectSocket({
      url: "wss://localhost:15002/websocket/" + this.activityThoughtId + "/" + userId,
      complete: () => {
      }
    });
    socket.onOpen(() => {
      console.log("conn");
    });
    var that = this;
    socket.onMessage((res) => {
      console.log(res.data);
      var msg = JSON.parse(res.data);
      console.log(msg);
      if (msg.fromusername != userId && msg.textMessage != void 0) {
        const comment = {
          text: msg.textMessage
        };
        that.commentsarr.push(comment);
      }
    });
    socket.onClose(() => {
      console.log("close");
    });
    socket.onError((err) => {
      console.log(err);
    });
  },
  onHide() {
    socket.close();
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
        a: "7cc80e78-1-" + i0,
        b: common_vendor.p({
          text: comment.text,
          avatarUrl: comment.avatarUrl,
          username: comment.username
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/pages/activity/activityPage/activityPage.vue"]]);
wx.createPage(MiniProgramPage);
