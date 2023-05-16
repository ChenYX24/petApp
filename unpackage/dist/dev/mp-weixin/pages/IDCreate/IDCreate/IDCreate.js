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
      Nav: "/pages/home/home?tab=home",
      placeholderText: "#cea697",
      inputValue: "",
      imageSrc: "",
      uuid: "",
      //伪随机数
      host: "",
      signature: "",
      ossAccessKeyId: "",
      policy: "",
      securityToken: ""
    };
  },
  computed: {
    isActive() {
      return this.inputValue.trim() !== "";
    }
  },
  methods: {
    generateUUID() {
      let d = new Date().getTime();
      if (typeof performance !== "undefined" && typeof performance.now === "function") {
        d += performance.now();
      }
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : r & 3 | 8).toString(16);
      });
      this.uuid = uuid;
    },
    async nextpage() {
      console.log(this.imageSrc);
      if (this.imageSrc != "") {
        const that = this;
        try {
          const signatureRes = await common_vendor.index.request({
            url: getApp().globalData.host + "/thirdParty/getUploadSignature/",
            method: "GET",
            header: {
              Authorization: common_vendor.index.getStorageSync("token")
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
        const filePath = this.imageSrc;
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        this.generateUUID();
        const key = `${formattedDate}/` + this.uuid + ".jpg";
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
            if (uploadFileRes.statusCode === 204) {
              console.log("上传成功");
              console.log(that.host + "/" + key);
              var petImage = that.host + "/" + key;
              common_vendor.wx$1.setStorageSync("petImage", petImage);
            }
          },
          fail: function(err) {
            console.log(that.filePath);
          }
        });
      }
      if (this.isActive) {
        common_vendor.wx$1.setStorageSync("petName", this.inputValue);
        common_vendor.index.navigateTo({
          url: `/pages/IDCreate/IDCreate2/IDCreate2`
        });
      }
    },
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多选择的图片数量，此处为1
        sizeType: ["compressed"],
        // 压缩图片
        sourceType: ["album", "camera"],
        // 可以从相册选择或拍照
        success: (res) => {
          this.imageSrc = res.tempFilePaths[0];
        }
      });
    }
    // chooseImage() {
    //       const that = this;
    //       common_vendor.index.chooseImage({
    //         count: 1,
    //         // 最多选择的图片数量，此处为1
    //         sizeType: ["compressed"],
    //         // 压缩图片
    //         sourceType: ["album", "camera"],
    //         // 可以从相册选择或拍照
    //         success: async (res) => {
    //           this.imageSrc = res.tempFilePaths[0];
    //           try {
    //             const signatureRes = await common_vendor.index.request({
    //               url: "http://43.140.198.154:88/thirdParty/getUploadSignature/",
    //               method: "GET",
    //               header: {
    //                 Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiJYQitLTUhncTVaZXRjTktsSE1mOEJnPT0iLCJleHAiOjE2Nzk5MTgyMDV9.6VI_tg8bjN06KEV3uFmTTU3kDxyy_INGeNjTWbsaMpY"
    //               }
    //             });
    //             console.log(signatureRes);
    //             this.host = signatureRes.data.data.host;
    //             this.signature = signatureRes.data.data.signature;
    //             this.ossAccessKeyId = signatureRes.data.data.ossAccessKeyId;
    //             this.policy = signatureRes.data.data.policy;
    //             this.securityToken = signatureRes.data.data.securityToken;
    //           } catch (err) {
    //             console.log("请求签名失败", err);
    //           }
    //           const filePath = res.tempFilePaths[0];
    //           const date = new Date();
    //           const year = date.getFullYear();
    //           const month = (date.getMonth() + 1).toString().padStart(2, "0");
    //           const day = date.getDate().toString().padStart(2, "0");
    //           const formattedDate = `${year}-${month}-${day}`;
    //           const key = `${formattedDate}/xxx.jpg`;
    //           console.log(that.host + key);
    //           common_vendor.index.uploadFile({
    //             url: that.host,
    //             //仅为示例，非真实的接口地址
    //             filePath,
    //             name: "file",
    //             formData: {
    //               key,
    //               policy: that.policy,
    //               OSSAccessKeyId: that.ossAccessKeyId,
    //               signature: that.signature
    //               // 'x-oss-security-token': this.securityToken // 使用STS签名时必传。
    //             },
    //             success: (uploadFileRes) => {
    //               console.log(uploadFileRes);
    //               if (res.statusCode === 204) {
    //                 console.log("上传成功");
    //               }
    //               console.log(111);
    //             },
    //             fail: function(err) {
    //               console.log(that.filePath);
    //             }
    //           });
    //         }
    //       });
    //     },
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
    b: $data.imageSrc ? $data.imageSrc : "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/picture&name/camera.png",
    c: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    d: $data.inputValue,
    e: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    f: $options.isActive ? 1 : "",
    g: common_vendor.o((...args) => $options.nextpage && $options.nextpage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-99e14386"], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/IDCreate/IDCreate/IDCreate.vue"]]);
wx.createPage(MiniProgramPage);
