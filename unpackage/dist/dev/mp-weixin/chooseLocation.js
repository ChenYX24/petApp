"use strict";
const common_vendor = require("./common/vendor.js");
const ThirdPartySDK_amapWx_130 = require("./ThirdPartySDK/amap-wx.130.js");
const _sfc_main = {
  name: "chooseLocation",
  props: {},
  data() {
    return {
      NowLocation: "华南理工大学C10",
      amapPlugin: null,
      key: "53142a6ebba0f0d52481e81910658876",
      //高德key
      keywords: "",
      tipLocations: []
    };
  },
  onLoad() {
    this.amapPlugin = new ThirdPartySDK_amapWx_130.amap.AMapWX({
      key: this.key
    });
    this.getNowLocation();
  },
  watch: {
    keywords(newVal) {
      if (newVal !== "") {
        this.getTipLocations();
      } else {
        this.getNowLocation();
      }
    }
  },
  methods: {
    chooseWhat(trueLocation) {
      console.log(trueLocation);
      this.$emit("chooseWhat", trueLocation);
    },
    getNowLocation() {
      this.amapPlugin = new ThirdPartySDK_amapWx_130.amap.AMapWX({
        key: this.key
      });
      common_vendor.index.showLoading({
        title: "获取信息中"
      });
      this.amapPlugin.getRegeo({
        success: (data) => {
          console.log(data);
          var temp = [{ name: "" }];
          temp[0].name = data[0].name;
          this.tipLocations = temp;
          common_vendor.index.hideLoading();
        }
      });
    },
    getTipLocations() {
      this.amapPlugin = new ThirdPartySDK_amapWx_130.amap.AMapWX({
        key: this.key
      });
      common_vendor.index.showLoading({
        title: "获取信息中"
      });
      const that = this;
      this.amapPlugin.getInputtips({
        keywords: this.keywords,
        location: "",
        success: function(data) {
          console.log(data);
          if (data && data.tips) {
            that.tipLocations = data.tips;
          }
          common_vendor.index.hideLoading();
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.keywords === "" ? 1 : "",
    b: $data.keywords,
    c: common_vendor.o(($event) => $data.keywords = $event.detail.value),
    d: common_vendor.f($data.tipLocations, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.chooseWhat(item.name))
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/school/团小萌/团小萌/petApp/components/chooseLocation.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
