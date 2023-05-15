"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const idCard = () => "../../components/IDCard/IDCard.js";
const _sfc_main = {
  components: {
    navBar,
    idCard
  },
  data() {
    return {
      Text: "\u5BA0\u7269\u8EAB\u4EFD\u8BC1",
      Nav: "/pages/home/home?tab=home"
    };
  },
  computed: {
    idCardList() {
      return common_vendor.index.getStorageSync("idCardList");
    }
  },
  methods: {
    addCard() {
      common_vendor.index.navigateTo({
        url: "/pages/IDCreate/IDCreate/IDCreate"
      });
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  const _component_idCard = common_vendor.resolveComponent("idCard");
  (_component_nav_bar + _component_idCard)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: $data.Text,
      Nav: $data.Nav
    }),
    b: common_vendor.f($options.idCardList, (item, index, i0) => {
      return {
        a: index,
        b: "69e0eab4-1-" + i0,
        c: common_vendor.p({
          dataList: item
        })
      };
    }),
    c: common_vendor.o((...args) => $options.addCard && $options.addCard(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/pages/petList/petList.vue"]]);
wx.createPage(MiniProgramPage);
