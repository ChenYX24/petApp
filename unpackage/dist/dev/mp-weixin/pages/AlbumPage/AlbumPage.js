"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imageList: []
    };
  },
  mounted() {
    this.getImages();
  },
  methods: {
    getImages() {
      const that = this;
      common_vendor.index.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            common_vendor.index.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                that.chooseImages();
              },
              fail() {
                common_vendor.index.showModal({
                  title: "\u63D0\u793A",
                  content: "\u60A8\u62D2\u7EDD\u4E86\u8BBF\u95EE\u76F8\u518C\u7684\u6743\u9650\uFF0C\u65E0\u6CD5\u52A0\u8F7D\u56FE\u7247\u3002",
                  showCancel: false
                });
              }
            });
          } else {
            that.chooseImages();
          }
        }
      });
    },
    chooseImages() {
      const that = this;
      common_vendor.index.chooseImage({
        count: 9,
        sourceType: ["album"],
        success(res) {
          that.imageList = that.imageList.concat(res.tempFilePaths);
        },
        fail(err) {
          console.log("Error:", err);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.imageList, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: common_vendor.o((...args) => $options.getImages && $options.getImages(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/pages/AlbumPage/AlbumPage.vue"]]);
wx.createPage(MiniProgramPage);
