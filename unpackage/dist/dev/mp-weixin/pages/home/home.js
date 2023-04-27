"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const CustomAlbum = () => "../../components/CustomAlbum/CustomAlbum.js";
const _sfc_main = {
  components: {
    TabBar,
    CustomAlbum
  },
  onLoad: function(options) {
    this.tab = options.tab;
  },
  data() {
    return {
      tab: "",
      token: "",
      customNumberItems: ["宠物", "勋章", "喜欢"]
    };
  },
  computed: {
    idCardList() {
      return common_vendor.index.getStorageSync("idCardList");
    },
    custom() {
      if (this.idCardList) {
        return [this.idCardList.length, 99, 4];
      } else {
        return [0, 99, 4];
      }
    }
  },
  methods: {
    handleSelectedImages(selectedImages) {
      console.log("Selected images:", selectedImages);
    },
    goSet() {
      common_vendor.index.navigateTo({
        url: `/pages/setting/setting`
      });
    },
    wxLogin() {
      var that = this;
      if (!this.token) {
        common_vendor.index.showModal({
          mask: true,
          title: "温馨提示",
          content: "授权微信登录后才能正常使用",
          success(res) {
            if (res.confirm) {
              common_vendor.index.login({
                provider: "weixin",
                success: function(loginRes) {
                  const code = loginRes.code;
                  console.log(code);
                  common_vendor.index.request({
                    url: "https://mock.apifox.cn/m1/2440038-0-default/user/login/",
                    method: "GET",
                    data: {
                      code
                    },
                    success: function(res2) {
                      common_vendor.index.setStorageSync("token", res2.data.token);
                      that.token = common_vendor.index.getStorageSync("token");
                      console.log(that.token);
                    },
                    fail: function(res2) {
                      common_vendor.index.showToast({
                        title: "登录失败",
                        icon: "none"
                      });
                    }
                  });
                },
                fail: function(loginRes) {
                  common_vendor.index.showToast({
                    title: "登录失败",
                    icon: "none"
                  });
                }
              });
            } else if (res.cancel)
              ;
          }
        });
      }
      console.log("login");
    }
  }
};
if (!Array) {
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  _component_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.wxLogin && $options.wxLogin(...args)),
    b: common_vendor.o((...args) => $options.goSet && $options.goSet(...args)),
    c: common_vendor.f(["宠物", "勋章", "喜欢"], (item, index, i0) => {
      return {
        a: common_vendor.t($options.custom[index]),
        b: common_vendor.t(item),
        c: index
      };
    }),
    d: common_vendor.p({
      activeTab: $data.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
