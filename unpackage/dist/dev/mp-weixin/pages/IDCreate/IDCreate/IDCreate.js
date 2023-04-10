"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "\u7167\u7247\u548C\u540D\u5B57",
      placeholderText: "#cea697",
      inputValue: "",
      imageSrc: "",
      nickName: "",
      headerUrl: "",
      host: "",
      signature: "",
      ossAccessKeyId: "",
      policy: "",
      key: "",
      securityToken: ""
    };
  },
  computed: {
    isActive() {
      return this.inputValue.trim() !== "";
    }
  },
  onLoad() {
  },
  methods: {
    nextpage() {
      if (this.isActive) {
        wx.setStorageSync("petName", this.inputValue);
        common_vendor.index.navigateTo({
          url: `/pages/IDCreate/IDCreate2/IDCreate2`
        });
      }
    },
    chooseImage() {
      const that = this;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: async (res) => {
          this.imageSrc = res.tempFilePaths[0];
          try {
            const signatureRes = await common_vendor.index.request({
              url: "http://43.140.198.154:88/thirdParty/getUploadSignature/",
              method: "GET",
              header: {
                Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiJYQitLTUhncTVaZXRjTktsSE1mOEJnPT0iLCJleHAiOjE2Nzk5MTgyMDV9.6VI_tg8bjN06KEV3uFmTTU3kDxyy_INGeNjTWbsaMpY"
              }
            });
            console.log(signatureRes);
            this.host = signatureRes.data.data.host;
            this.signature = signatureRes.data.data.signature;
            this.ossAccessKeyId = signatureRes.data.data.ossAccessKeyId;
            this.policy = signatureRes.data.data.policy;
            this.securityToken = signatureRes.data.data.securityToken;
          } catch (err) {
            console.log("\u8BF7\u6C42\u7B7E\u540D\u5931\u8D25", err);
          }
          const filePath = res.tempFilePaths[0];
          const date = new Date();
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const formattedDate = `${year}-${month}-${day}`;
          const key = `${formattedDate}/xxx.jpg`;
          console.log(that.host + key);
          common_vendor.index.uploadFile({
            url: that.host,
            filePath,
            name: "file",
            formData: {
              key,
              policy: that.policy,
              OSSAccessKeyId: that.ossAccessKeyId,
              signature: that.signature
            },
            success: (uploadFileRes) => {
              console.log(uploadFileRes);
              if (res.statusCode === 204) {
                console.log("\u4E0A\u4F20\u6210\u529F");
              }
              console.log(111);
            },
            fail: function(err) {
              console.log(that.filePath);
            }
          });
        }
      });
    },
    getUserOpenId(userInfo) {
      common_vendor.index.login({
        provider: "weixin",
        success(loginAuth) {
          ({ "code": loginAuth.code });
          console.log(loginAuth);
        }
      });
    },
    login() {
      var that = this;
      common_vendor.index.showModal({
        mask: true,
        title: "\u6E29\u99A8\u63D0\u793A",
        content: "\u6388\u6743\u5FAE\u4FE1\u767B\u5F55\u540E\u624D\u80FD\u6B63\u5E38\u4F7F\u7528",
        success(res) {
          if (res.confirm) {
            common_vendor.index.getUserProfile({
              desc: "\u83B7\u53D6\u60A8\u7684\u6635\u79F0\u3001\u5934\u50CF",
              success: (userRes) => {
                if (userRes.errMsg == "getUserProfile:ok" && userRes.userInfo != void 0) {
                  var userInfo = {
                    avatarUrl: userRes.userInfo.avatarUrl,
                    nickName: userRes.userInfo.nickName
                  };
                  that.nickName = userRes.userInfo.nickName;
                  that.headerUrl = userRes.userInfo.avatarUrl;
                  that.getUserOpenId(userInfo);
                  console.log(that.nickName);
                } else {
                  common_vendor.index.showToast({
                    icon: "none",
                    title: "\u83B7\u53D6\u5931\u8D25"
                  });
                }
              },
              fail: (error) => {
              }
            });
          } else if (res.cancel)
            ;
        }
      });
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: $data.Text
    }),
    b: $data.imageSrc ? $data.imageSrc : "/static/IDCreate/picture&name/camera.png",
    c: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    d: $data.inputValue,
    e: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    f: $options.isActive ? 1 : "",
    g: common_vendor.o((...args) => $options.nextpage && $options.nextpage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-99e14386"], ["__file", "D:/uniapp/petApp/pages/IDCreate/IDCreate/IDCreate.vue"]]);
wx.createPage(MiniProgramPage);
