"use strict";
const common_vendor = require("../../../common/vendor.js");
const navBar = () => "../../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "照片和名字",
      placeholderText: "#cea697",
      inputValue: "",
      imageSrc: "",
      nickName: "",
      headerUrl: "",
      //直传接收数据
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
        common_vendor.wx$1.setStorageSync("petName", this.inputValue);
        common_vendor.index.navigateTo({
          url: `/pages/IDCreate/IDCreate2/IDCreate2`
        });
      }
    },
    chooseImage() {
      const that = this;
      common_vendor.index.chooseImage({
        count: 1,
        // 最多选择的图片数量，此处为1
        sizeType: ["compressed"],
        // 压缩图片
        sourceType: ["album", "camera"],
        // 可以从相册选择或拍照
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
            console.log("请求签名失败", err);
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
            //仅为示例，非真实的接口地址
            filePath,
            name: "file",
            formData: {
              key,
              policy: that.policy,
              OSSAccessKeyId: that.ossAccessKeyId,
              signature: that.signature
              // 'x-oss-security-token': this.securityToken // 使用STS签名时必传。
            },
            success: (uploadFileRes) => {
              console.log(uploadFileRes);
              if (res.statusCode === 204) {
                console.log("上传成功");
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
        title: "温馨提示",
        content: "授权微信登录后才能正常使用",
        success(res) {
          if (res.confirm) {
            common_vendor.index.getUserProfile({
              desc: "获取您的昵称、头像",
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
                    title: "获取失败"
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-99e14386"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/IDCreate/IDCreate/IDCreate.vue"]]);
wx.createPage(MiniProgramPage);
