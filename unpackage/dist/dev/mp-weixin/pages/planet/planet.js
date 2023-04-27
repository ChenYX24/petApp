"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  components: {
    TabBar
  },
  onLoad: function(options) {
    this.tab = options.tab;
  },
  data() {
    return {
      tab: "",
      inputValue: "",
      trueProvince: "xx",
      provinces: ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "海南省", "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省", "台湾省", "内蒙古自治区", "广西壮族自治区", "西藏自治区", "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区"],
      currentProvince: "请选择省份",
      isActive: false
    };
  },
  computed: {
    isCanActive() {
      return this.currentProvince !== "请选择省份";
    }
  },
  methods: {
    onProvinceChange(event) {
      const provinceIndex = event.detail.value;
      this.currentProvince = this.provinces[provinceIndex];
      if (this.currentProvince !== "请选择省份") {
        this.trueProvince = this.currentProvince;
      }
      common_vendor.wx$1.setStorageSync("city", this.currentProvince);
    },
    canTap() {
      if (this.isCanActive) {
        this.isActive = !this.isActive;
      }
    }
  }
};
if (!Array) {
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  _component_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.currentProvince),
    b: $data.provinces,
    c: common_vendor.o((...args) => $options.onProvinceChange && $options.onProvinceChange(...args)),
    d: !$data.isActive
  }, !$data.isActive ? {
    e: common_vendor.t($data.trueProvince)
  } : {}, {
    f: $data.isActive
  }, $data.isActive ? {} : {}, {
    g: $data.isActive
  }, $data.isActive ? {
    h: common_vendor.t($data.trueProvince)
  } : {}, {
    i: $data.isActive
  }, $data.isActive ? {} : {}, {
    j: $data.isActive ? 1 : "",
    k: $data.isActive ? 1 : "",
    l: common_vendor.o((...args) => $options.canTap && $options.canTap(...args)),
    m: common_vendor.p({
      activeTab: $data.tab
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d8c429a1"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/planet/planet.vue"]]);
wx.createPage(MiniProgramPage);
