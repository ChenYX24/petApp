"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      Text: "\u8BBE\u7F6E\u8BED\u8A00",
      Nav: "/pages/setting/setting",
      isActive: 0,
      name: ["\u8DDF\u968F\u7CFB\u7EDF", "\u7B80\u4F53\u4E2D\u6587", "\u7E41\u4F53\u4E2D\u6587", "English", "\u65E5\u672C\u8A9E", "\uD55C\uAD6D\uC5B4"]
    };
  },
  methods: {
    nextpage() {
      if (this.isActive != -1) {
        common_vendor.index.navigateTo({
          url: "/pages/setting/setting"
        });
      }
    },
    toggleIndex(index) {
      if (this.isActive === index) {
        this.isActive = -1;
      } else {
        this.isActive = index;
      }
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: $data.Text,
      Nav: $data.Nav
    }),
    b: common_vendor.f($data.name, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item),
        b: $data.isActive === index
      }, $data.isActive === index ? {} : {}, {
        c: index,
        d: common_vendor.n(index === $data.name.length - 1 ? "last-item" : "item"),
        e: common_vendor.o(($event) => $options.toggleIndex(index), index)
      });
    }),
    c: $data.isActive != -1 ? 1 : "",
    d: common_vendor.o((...args) => $options.nextpage && $options.nextpage(...args))
  };
}

const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1fcc329"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/settingLanguage/settingLanguage.vue"]]);

wx.createPage(MiniProgramPage);
