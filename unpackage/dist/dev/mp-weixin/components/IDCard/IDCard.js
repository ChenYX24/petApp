"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "IDCard",
  data() {
    return {};
  },
  computed: {
    name() {
      let name = this.dataList.name;
      return name;
    },
    city() {
      if (!this.dataList.city) {
        return "\u4F4D\u7F6E \u672A\u77E5";
      } else {
        return "\u4F4D\u7F6E " + this.dataList.city;
      }
    },
    sexImg() {
      if (this.dataList.sex == 1) {
        return "/static/IDCreate/final/IDBOY.png";
      } else {
        return "/static/IDCreate/final/IDGIRL.png";
      }
    },
    ImgBackground() {
      if (this.dataList.sex == 1) {
        return "/static/IDCreate/final/BIMG.png";
      } else {
        return "/static/IDCreate/final/GIMG.png";
      }
    },
    sex() {
      if (this.dataList.sex == 1) {
        return "\u6027\u522B \u5F1F\u5F1F";
      } else {
        return "\u6027\u522B \u59B9\u59B9";
      }
    },
    textColor() {
      if (this.dataList.sex == 1) {
        return "#0e496f";
      } else {
        return "#ac496f";
      }
    },
    birthday() {
      let birthday = new Date(this.dataList.birthday);
      let a = birthday.getFullYear();
      let b = this.padZero(birthday.getMonth() + 1);
      let c = this.padZero(birthday.getDate());
      let day = "\u751F\u65E5 " + a + "\u5E74  " + b + "\u6708  " + c + "\u65E5";
      return day;
    },
    Image() {
      let img = this.dataList.Image;
      return img;
    }
  },
  props: {
    dataList: {
      type: Object
    }
  },
  methods: {
    padZero(num) {
      return num < 10 ? "0" + num : num;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.name),
    b: common_vendor.t($options.sex),
    c: common_vendor.t($options.birthday),
    d: common_vendor.t($options.city),
    e: `${this.textColor}`,
    f: $options.Image,
    g: `url(${this.ImgBackground})`,
    h: `url(${this.sexImg})`,
    i: common_vendor.o((...args) => _ctx.click && _ctx.click(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/components/IDCard/IDCard.vue"]]);
wx.createComponent(Component);
