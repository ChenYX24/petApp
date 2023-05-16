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
                  title: "提示",
                  content: "您拒绝了访问相册的权限，无法加载图片。",
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/AlbumPage/AlbumPage.vue"]]);
wx.createPage(MiniProgramPage);
