"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      roomId: ""
    };
  },
  computed: {
    url() {
      return decodeURIComponent(this.$route.query.url);
    }
  },
  onLoad(query) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      console.log("摄像头权限已获取");
    }).catch(function(err) {
      console.log("获取摄像头权限失败：" + err.name + ": " + err.message);
    });
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
      console.log("麦克风权限已获取");
    }).catch(function(err) {
      console.log("获取麦克风权限失败：" + err.name + ": " + err.message);
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.url
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/pages/videoChat/videoChat.vue"]]);
wx.createPage(MiniProgramPage);
