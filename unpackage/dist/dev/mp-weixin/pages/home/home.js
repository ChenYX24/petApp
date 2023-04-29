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
      nickName: "\u7528\u6237\u540D",
      avatarUrl: "../../static/home/cat.png",
      userInfo: {},
      hasUserInfo: false,
      customNumberItems: ["\u5BA0\u7269", "\u52CB\u7AE0", "\u559C\u6B22"]
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
    },
    customTapFunctions() {
      return [
        () => {
          console.log("customTap0");
          common_vendor.index.navigateTo({
            url: `/pages/petList/petList`
          });
        },
        () => {
          console.log("customTap1");
        },
        () => {
          console.log("customTap2");
        }
      ];
    }
  },
  created: function() {
    if (common_vendor.index.getStorageSync("avatarUrl") !== "") {
      this.avatarUrl = common_vendor.index.getStorageSync("avatarUrl");
    }
    if (common_vendor.index.getStorageSync("nickName") !== "") {
      this.nickName = common_vendor.index.getStorageSync("nickName");
    }
    this.hasUserInfo = common_vendor.index.getStorageSync("hasUserInfo");
    console.log(this.hasUserInfo);
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
    customTap(index) {
      this.customTapFunctions[index]();
    },
    getUserProfile() {
      if (this.hasUserInfo)
        ;
      else {
        wx.getUserProfile({
          desc: "\u7528\u4E8E\u663E\u793A\u7528\u6237\u8D44\u6599",
          success: (res) => {
            console.log(res);
            this.userInfo = res.userInfo;
            this.hasUserInfo = true;
            this.avatarUrl = this.userInfo.avatarUrl;
            this.nickName = this.userInfo.nickName;
            common_vendor.index.setStorageSync("avatarUrl", this.avatarUrl);
            common_vendor.index.setStorageSync("nickName", this.nickName);
            common_vendor.index.setStorageSync("hasUserInfo", this.hasUserInfo);
            common_vendor.index.request({
              url: "http://localhost:88/user/update/",
              method: "POST",
              data: {
                userId: common_vendor.index.getStorageSync("userId"),
                nickname: this.nickName,
                backgroundImage: this.avatarUrl
              },
              header: {
                "Content-Type": "application/json",
                "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiIyMDFCTkVBUFEzcENreDVra0E1aTB3PT0iLCJleHAiOjE2ODI1ODExMDF9.0XkPv_JsFnT5ByDqoJJ9WTbwcD5TGTPeUC5ZYy77zBc"
              },
              success: (res2) => {
                console.log(res2.data);
              },
              fail: (res2) => {
                console.log(res2.data);
              }
            });
          },
          fail: (res) => {
            console.log(res);
            that.hasUserInfo = false;
          }
        });
      }
    },
    wxLogin() {
      var that2 = this;
      if (!this.token) {
        common_vendor.index.showModal({
          mask: true,
          title: "\u6E29\u99A8\u63D0\u793A",
          content: "\u6388\u6743\u5FAE\u4FE1\u767B\u5F55\u540E\u624D\u80FD\u6B63\u5E38\u4F7F\u7528",
          success(res) {
            if (res.confirm) {
              common_vendor.index.login({
                provider: "weixin",
                success: function(loginRes) {
                  const code = loginRes.code;
                  console.log(code);
                  common_vendor.index.request({
                    url: "http://localhost:88/user/login",
                    method: "GET",
                    data: {
                      code
                    },
                    success: function(res2) {
                      console.log(res2);
                      common_vendor.index.setStorageSync("token", res2.data.token);
                      that2.token = common_vendor.index.getStorageSync("token");
                      console.log(that2.token);
                      common_vendor.index.setStorageSync("token", res2.data.userId);
                    },
                    fail: function(res2) {
                      common_vendor.index.showToast({
                        title: "\u767B\u5F55\u5931\u8D25",
                        icon: "none"
                      });
                    }
                  });
                },
                fail: function(loginRes) {
                  common_vendor.index.showToast({
                    title: "\u767B\u5F55\u5931\u8D25",
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
    },
    goMake() {
      common_vendor.index.navigateTo({
        url: "/pages/makeIcon/makeIcon"
      });
    },
    goCollect() {
      common_vendor.index.navigateTo({
        url: "/pages/fovIcon/fovIcon"
      });
    }
  }
};
if (!Array) {
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  _component_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatarUrl,
    b: common_vendor.o((...args) => $options.getUserProfile && $options.getUserProfile(...args)),
    c: common_vendor.t($data.nickName),
    d: common_vendor.o((...args) => $options.goSet && $options.goSet(...args)),
    e: common_vendor.f(["\u5BA0\u7269", "\u52CB\u7AE0", "\u559C\u6B22"], (item, index, i0) => {
      return {
        a: common_vendor.t($options.custom[index]),
        b: common_vendor.t(item),
        c: index,
        d: common_vendor.o(($event) => $options.customTap(index), index)
      };
    }),
    f: common_vendor.o((...args) => $options.goMake && $options.goMake(...args)),
    g: common_vendor.o((...args) => $options.goCollect && $options.goCollect(...args)),
    h: common_vendor.p({
      activeTab: $data.tab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"], ["__file", "D:/uniapp/petApp/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
