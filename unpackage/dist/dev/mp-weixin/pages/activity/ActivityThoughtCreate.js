"use strict";
const common_vendor = require("../../common/vendor.js");
const ThirdPartySDK_myApi = require("../../ThirdPartySDK/myApi.js");
const navBar = () => "../../components/navBar/navBar.js";
const chooseLocation = () => "../../components/chooseLocation2.js";
const _sfc_main = {
  components: {
    navBar,
    chooseLocation
  },
  data() {
    return {
      Nav: "/pages/notebook/notebook",
      Text: "新建朋友圈",
      activities: [
        "coding",
        "coding",
        "coding"
      ],
      currentActivity: "请选择你参加的活动",
      tureActivity: "xx",
      inputValue: "",
      imageSrc: [],
      isChooseLocation: false,
      trueLocation: "您所在位置",
      imageUrls: [],
      uuid: ""
      //伪随机数
    };
  },
  mounted() {
    this.activities = ["code"];
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
    generateNewUUID() {
      this.generateUUID();
    },
    radioChange: function(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
        }
      }
    },
    showImage(index) {
    },
    deleteImage(index) {
      console.log(index);
    },
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 9,
        // 最多选择的图片数量，此处为1
        sizeType: ["compressed"],
        // 压缩图片
        sourceType: ["album", "camera"],
        // 可以从相册选择或拍照
        success: (res) => {
          this.imageSrc.push(...res.tempFilePaths);
        }
      });
    },
    awaitUploadFile(host, signature, ossAccessKeyId, policy) {
      const filePath = this.imageSrc;
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      for (var i = 0; i < filePath.length; i++) {
        this.generateNewUUID();
        const key = `${formattedDate}/` + this.uuid + ".jpg";
        common_vendor.index.uploadFile({
          url: host,
          filePath: filePath[i],
          name: "file",
          formData: {
            key,
            policy,
            OSSAccessKeyId: ossAccessKeyId,
            signature
            // 'x-oss-security-token': this.securityToken // 使用STS签名时必传。
          },
          success: (uploadFileRes) => {
            this.imageUrls.push(host + "/" + key);
            console.log(host + key);
            console.log(uploadFileRes);
          },
          fail: function(err) {
            console.log(err);
          }
        });
      }
    },
    awaituploadFrom() {
      common_vendor.index.request({
        url: "http://43.140.198.154:88/activityThought/save",
        method: "POST",
        data: {
          content: this.inputValue,
          data: "['1','2']",
          //
          location: this.trueLocation,
          activityName: this.currentActivity,
          userId: 1
        },
        params: { interfaceState: "state" },
        header: {
          "Content-Type": "application/json",
          "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiIyMDFCTkVBUFEzcENreDVra0E1aTB3PT0iLCJleHAiOjE2ODI1ODExMDF9.0XkPv_JsFnT5ByDqoJJ9WTbwcD5TGTPeUC5ZYy77zBc"
        },
        success: (res) => {
          console.log(res.data);
        },
        complete: () => {
          common_vendor.index.navigateTo({
            url: `/pages/notebook/notebook`
          });
        }
      });
    },
    async pushActivityThought() {
      var signatureRes = {};
      try {
        const a = await ThirdPartySDK_myApi.request("http://43.140.198.154:88/thirdParty/getUploadSignature/", {});
        signatureRes = a;
      } catch (err) {
        console.error(err);
        return;
      }
      console.log(signatureRes);
      console.log(signatureRes.data);
      var host = signatureRes.data.host;
      var signature = signatureRes.data.signature;
      var ossAccessKeyId = signatureRes.data.ossAccessKeyId;
      var policy = signatureRes.data.policy;
      try {
        const bs = await this.awaitUploadFile(host, signature, ossAccessKeyId, policy);
        console.log(bs);
        ;
        this.awaituploadFrom();
      } catch (err) {
        console.error(err);
      }
    },
    onActivityChange(event) {
      const activityIndex = event.detail.value;
      this.currentActivity = this.activities[activityIndex];
      if (this.currentActivity !== "请选择你参加的活动") {
        this.trueActivity = this.currentActivity;
      }
    },
    getTrueLocation(Location) {
      console.log(Location);
      this.isChooseLocation = !this.isChooseLocation;
      this.trueLocation = Location;
    },
    toChooseLocation() {
      this.isChooseLocation = !this.isChooseLocation;
    }
  },
  computed: {
    isActive() {
      return this.inputValue.trim() !== "";
    },
    S0Height() {
      var startH = 150;
      var Hresult = 0;
      if (this.imageSrc.length === 0) {
        Hresult = startH;
      }
      Hresult = (this.imageSrc.length - 1) / 3 * 100 + startH;
      return {
        height: Hresult + "px"
      };
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  const _component_choose_location = common_vendor.resolveComponent("choose-location");
  (_component_nav_bar + _component_choose_location)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isChooseLocation
  }, !$data.isChooseLocation ? common_vendor.e({
    b: common_vendor.p({
      text: $data.Text,
      Nav: $data.Nav
    }),
    c: common_vendor.f($data.imageSrc, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    d: $data.imageSrc.length !== 9
  }, $data.imageSrc.length !== 9 ? {
    e: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    f: common_vendor.s($options.S0Height),
    g: common_vendor.t($data.currentActivity),
    h: $data.activities,
    i: common_vendor.o((...args) => $options.onActivityChange && $options.onActivityChange(...args)),
    j: $data.inputValue === "" ? 1 : "",
    k: $data.inputValue,
    l: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    m: common_vendor.t($data.trueLocation),
    n: common_vendor.o((...args) => $options.toChooseLocation && $options.toChooseLocation(...args)),
    o: $options.isActive ? 1 : "",
    p: common_vendor.o((...args) => $options.pushActivityThought && $options.pushActivityThought(...args))
  }) : {}, {
    q: $data.isChooseLocation
  }, $data.isChooseLocation ? {
    r: common_vendor.o($options.getTrueLocation)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/pages/activity/ActivityThoughtCreate.vue"]]);
wx.createPage(MiniProgramPage);
