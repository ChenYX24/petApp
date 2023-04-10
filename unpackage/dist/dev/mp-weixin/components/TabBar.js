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
        console.log(this.tab, this.activeTab);
        this.isAdd = !this.isAdd;
      } else {
        this.tab = tab;
        switch (tab) {
          case "memo":
            wx.redirectTo({
              url: `/pages/notebook/notebook?tab=${tab}`
            });
            break;
          case "planet":
            wx.redirectTo({
              url: `/pages/planet/planet?tab=${tab}`
            });
            break;
          case "activity":
            wx.redirectTo({
              url: `/pages/activity/activity?tab=${tab}`
            });
            break;
          case "home":
            wx.redirectTo({
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
    a: $props.activeTab === "memo" ? "/static/tabbar/notebook.png" : "/static/tabbar/notebook2.png",
    b: $props.activeTab === "memo" ? 1 : "",
    c: common_vendor.o(($event) => $options.switchTab("memo")),
    d: $props.activeTab === "planet" ? "/static/tabbar/planet.png" : "/static/tabbar/planet2.png",
    e: $props.activeTab === "planet" ? 1 : "",
    f: common_vendor.o(($event) => $options.switchTab("planet")),
    g: common_vendor.o(($event) => $options.switchTab("add")),
    h: $props.activeTab === "activity" ? "/static/tabbar/activity.png" : "/static/tabbar/activity2.png",
    i: $props.activeTab === "activity" ? 1 : "",
    j: common_vendor.o(($event) => $options.switchTab("activity")),
    k: $props.activeTab === "home" ? "/static/tabbar/home.png" : "/static/tabbar/home2.png",
    l: $props.activeTab === "home" ? 1 : "",
    m: common_vendor.o(($event) => $options.switchTab("home")),
    n: $data.isAdd ? 1 : "",
    o: common_vendor.o($options.changeAdd),
    p: common_vendor.p({
      isShow: $data.isAdd
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-89ca1f91"], ["__file", "D:/uniapp/petApp/components/TabBar.vue"]]);
wx.createComponent(Component);
