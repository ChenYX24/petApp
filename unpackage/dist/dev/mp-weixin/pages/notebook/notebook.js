"use strict";
const common_vendor = require("../../common/vendor.js");
const TabBar = () => "../../components/TabBar.js";
const tip = () => "../../components/tip.js";
const TopBar = () => "../../components/TopBar.js";
const notebookform = () => "../../components/notebookform.js";
const _sfc_main = {
  components: {
    TabBar,
    tip,
    TopBar,
    notebookform
  },
  onLoad: function(options) {
    this.tab = options.tab;
  },
  data() {
    return {
      tab: "",
      texts: ["\u63D0\u9192", "\u8BB0\u5F55"],
      index: 0,
      listremind: ["\u5199\u4EE3\u7801", "\u5403\u996D", "\u7761\u89C9"],
      list: ["\u5199\u4EE3\u7801", "\u5403\u996D\u996D", "\u7761\u89C9\u89C9"],
      isshow: false
    };
  },
  onLoad(options) {
    const { data, leftSelected, rightSelected } = options;
    const decodedData = decodeURIComponent(data).replace(/%0A/g, "\n");
    if (leftSelected === "1") {
      this.listremind.push(decodedData);
    }
    if (rightSelected === "1") {
      this.list.push(decodedData);
    }
  },
  methods: {
    toWhere(key) {
      this.index = key;
    },
    addNote() {
      common_vendor.index.navigateTo({
        url: `/pages/notebook/notebookForm`
      });
    },
    touchStart(event) {
      this.startTime = Date.now();
      this.startPosition = event.changedTouches[0].clientX;
    },
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
  const _component_notebookform = common_vendor.resolveComponent("notebookform");
  (_component_top_bar + _component_tip + _component_tab_bar + _component_notebookform)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.toWhere),
    b: common_vendor.p({
      texts: $data.texts,
      index: $data.index
    }),
    c: common_vendor.o((...args) => $options.addNote && $options.addNote(...args)),
    d: this.index === 0
  }, this.index === 0 ? {
    e: common_vendor.p({
      list: $data.listremind,
      flag: false
    }),
    f: common_vendor.p({
      activeTab: $data.tab
    })
  } : {
    g: common_vendor.p({
      list: $data.list,
      flag: true
    }),
    h: common_vendor.p({
      activeTab: $data.tab
    })
  }, {
    i: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    j: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    k: $data.isshow
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-17181d6d"], ["__file", "D:/uniapp/petApp/pages/notebook/notebook.vue"]]);
wx.createPage(MiniProgramPage);
