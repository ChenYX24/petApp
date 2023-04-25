"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const tip = () => "../../components/tip.js";
const TopBar = () => "../../components/TopBar.js";
const _sfc_main = {
  components: {
    TabBar,
    tip,
    TopBar
  },
  onLoad: function(options) {
    this.tab = options.tab;
  },
  data() {
    return {
      tab: "",
      texts: ["提醒", "记录"],
      index: 0
    };
  },
  methods: {
    toWhere(key) {
      this.index = key;
    },
    // 起点
    touchStart(event) {
      this.startTime = Date.now();
      this.startPosition = event.changedTouches[0].clientX;
    },
    // 终点,计算移动距离
    touchEnd(event) {
      const endTime = Date.now();
      if (endTime - this.startTime > 2e3) {
        return;
      }
      this.endPosition = event.changedTouches[0].clientX;
      if (Math.abs(this.endPosition - this.startPosition) > 10) {
        this.endPosition = event.changedTouches[0].clientX;
        var elePosition = this.endPosition - this.startPosition > 0 ? "right" : "left";
      } else {
        return;
      }
      console.log(elePosition);
      if (elePosition === "right") {
        this.index = 0;
      }
      if (elePosition === "left") {
        this.index = 1;
      }
    }
  }
};
if (!Array) {
  const _component_top_bar = common_vendor.resolveComponent("top-bar");
  const _component_tip = common_vendor.resolveComponent("tip");
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  (_component_top_bar + _component_tip + _component_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.toWhere),
    b: common_vendor.p({
      texts: $data.texts,
      index: $data.index
    }),
    c: this.index === 0
  }, this.index === 0 ? {
    d: common_vendor.p({
      text: "驱虫,就是今天",
      flag: true
    }),
    e: common_vendor.p({
      text: "第二天",
      flag: false
    }),
    f: common_vendor.p({
      flag: true
    }),
    g: common_vendor.p({
      activeTab: $data.tab
    })
  } : {
    h: common_vendor.p({
      text: "记录"
    }),
    i: common_vendor.p({
      text: "第二天",
      flag: true
    }),
    j: common_vendor.p({
      activeTab: $data.tab
    })
  }, {
    k: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    l: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-17181d6d"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/notebook/notebook.vue"]]);
wx.createPage(MiniProgramPage);
