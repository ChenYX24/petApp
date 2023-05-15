"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    bgColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      imageList: [],
      selectedImages: []
    };
  },
  mounted() {
    this.getImages();
  },
  methods: {
    getImages() {
      for (let i = 0; i < 20; i++) {
        this.imageList.push(`https://picsum.photos/200/300?random=${i}`);
      }
    },
    selectImage(index) {
      if (this.selectedImages.includes(index)) {
        this.selectedImages.splice(this.selectedImages.indexOf(index), 1);
      } else {
        this.selectedImages.push(index);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.imageList, (item, index, i0) => {
      return common_vendor.e({
        a: item,
        b: $data.selectedImages.includes(index)
      }, $data.selectedImages.includes(index) ? {} : {}, {
        c: index,
        d: common_vendor.o(($event) => $options.selectImage(index), index)
      });
    }),
    b: $props.bgColor
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/fjh28/Desktop/petApp/components/CustomAlbum/CustomAlbum.vue"]]);
wx.createComponent(Component);
