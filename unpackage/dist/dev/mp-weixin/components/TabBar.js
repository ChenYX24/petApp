"use strict";
const common_vendor = require("../common/vendor.js");
const add = () => "./add/add.js";
const _sfc_main = {
  components: {
    add
  },
  data() {
    return {
      tab: "memo",
      isAdd: false
    };
  },
  props: {
    activeTab: {
      type: String,
      default: "memo"
    }
  },
  methods: {
    changeAdd() {
      this.isAdd = !this.isAdd;
    },
    switchTab(tab) {
      if (tab === "add") {
        this.isAdd = !this.isAdd;
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
if (!Array) {
  const _easycom_add2 = common_vendor.resolveComponent("add");
  _easycom_add2();
}
const _easycom_add = () => "./add/add.js";
if (!Math) {
  _easycom_add();
}
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
    i: common_vendor.o(($event) => $options.switchTab("home")),
    j: $data.isAdd ? 1 : "",
    k: common_vendor.o($options.changeAdd),
    l: common_vendor.p({
      isShow: $data.isAdd
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-89ca1f91"], ["__file", "D:/school/团小萌/团小萌/petApp/components/TabBar.vue"]]);
wx.createComponent(Component);
