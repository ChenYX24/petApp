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
      provinces: ["\u5317\u4EAC\u5E02", "\u5929\u6D25\u5E02", "\u4E0A\u6D77\u5E02", "\u91CD\u5E86\u5E02", "\u6CB3\u5317\u7701", "\u5C71\u897F\u7701", "\u8FBD\u5B81\u7701", "\u5409\u6797\u7701", "\u9ED1\u9F99\u6C5F\u7701", "\u6C5F\u82CF\u7701", "\u6D59\u6C5F\u7701", "\u5B89\u5FBD\u7701", "\u798F\u5EFA\u7701", "\u6C5F\u897F\u7701", "\u5C71\u4E1C\u7701", "\u6CB3\u5357\u7701", "\u6E56\u5317\u7701", "\u6E56\u5357\u7701", "\u5E7F\u4E1C\u7701", "\u6D77\u5357\u7701", "\u56DB\u5DDD\u7701", "\u8D35\u5DDE\u7701", "\u4E91\u5357\u7701", "\u9655\u897F\u7701", "\u7518\u8083\u7701", "\u9752\u6D77\u7701", "\u53F0\u6E7E\u7701", "\u5185\u8499\u53E4\u81EA\u6CBB\u533A", "\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A", "\u897F\u85CF\u81EA\u6CBB\u533A", "\u5B81\u590F\u56DE\u65CF\u81EA\u6CBB\u533A", "\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A", "\u9999\u6E2F\u7279\u522B\u884C\u653F\u533A", "\u6FB3\u95E8\u7279\u522B\u884C\u653F\u533A"],
      currentProvince: "\u8BF7\u9009\u62E9\u7701\u4EFD",
      isActive: false
    };
  },
  computed: {
    isCanActive() {
      return this.currentProvince !== "\u8BF7\u9009\u62E9\u7701\u4EFD";
    }
  },
  methods: {
    onProvinceChange(event) {
      const provinceIndex = event.detail.value;
      this.currentProvince = this.provinces[provinceIndex];
      if (this.currentProvince !== "\u8BF7\u9009\u62E9\u7701\u4EFD") {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d8c429a1"], ["__file", "D:/uniapp/petApp/pages/planet/planet.vue"]]);
wx.createPage(MiniProgramPage);
