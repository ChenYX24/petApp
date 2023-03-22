"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tab: "memo"
    };
  },
  props: {
    activeTab: {
      type: String,
      default: "memo"
    }
  },
  methods: {
    switchTab(tab) {
      if (tab === "add") {
        common_vendor.wx$1.redirectTo({
          url: "/pages/add/add"
        });
      } else {
        this.tab = tab;
        switch (tab) {
          case "memo":
            common_vendor.wx$1.redirectTo({
              url: `/pages/notebook/notebook?tab=${tab}`
            });
            break;
          case "planet":
            common_vendor.wx$1.redirectTo({
              url: `/pages/planet/planet?tab=${tab}`
            });
            break;
          case "activity":
            common_vendor.wx$1.redirectTo({
              url: `/pages/activity/activity?tab=${tab}`
            });
            break;
          case "home":
            common_vendor.wx$1.redirectTo({
              url: `/pages/home/home?tab=${tab}`
            });
            break;
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.activeTab === "memo" ? 1 : "",
    b: common_vendor.o(($event) => $options.switchTab("memo")),
    c: $props.activeTab === "planet" ? 1 : "",
    d: common_vendor.o(($event) => $options.switchTab("planet")),
    e: common_vendor.o(($event) => $options.switchTab("add")),
    f: $props.activeTab === "activity" ? 1 : "",
    g: common_vendor.o(($event) => $options.switchTab("activity")),
    h: $props.activeTab === "home" ? 1 : "",
    i: common_vendor.o(($event) => $options.switchTab("home"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-89ca1f91"], ["__file", "C:/Users/fjh28/Desktop/petApp/components/TabBar.vue"]]);
wx.createComponent(Component);
