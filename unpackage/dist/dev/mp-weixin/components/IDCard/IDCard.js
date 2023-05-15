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
        return "位置 未知";
      } else {
        return "位置 " + this.dataList.city;
      }
    },
    sexImg() {
      if (this.dataList.sex == 1) {
        return "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/final/IDBOY.png";
      } else {
        return "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/final/IDGIRL.png";
      }
    },
    ImgBackground() {
      if (this.dataList.sex == 1) {
        return "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/final/BIMG.png";
      } else {
        return "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/final/GIMG.png";
      }
    },
    sex() {
      if (this.dataList.sex == 1) {
        return "性别 弟弟";
      } else {
        return "性别 妹妹";
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
      let day = "生日 " + a + "年  " + b + "月  " + c + "日";
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/fjh28/Desktop/petApp/components/IDCard/IDCard.vue"]]);
wx.createComponent(Component);
