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
  created() {
    console.log("登录");
    var that = this;
    if (!common_vendor.index.getStorageSync("token")) {
      common_vendor.index.showModal({
        mask: true,
        title: "温馨提示",
        content: "授权微信登录后才能正常使用",
        success(res) {
          if (res.confirm) {
            common_vendor.index.login({
              provider: "weixin",
              success: function(loginRes) {
                const code = loginRes.code;
                console.log(code);
                common_vendor.index.request({
                  url: "http://43.140.198.154:88/user/login",
                  method: "GET",
                  data: {
                    code
                  },
                  success: function(res2) {
                    console.log(res2);
                    common_vendor.index.setStorageSync("token", res2.data.token);
                    that.token = common_vendor.index.getStorageSync("token");
                    console.log(that.token);
                    common_vendor.index.setStorageSync("userId", res2.data.userId);
                  },
                  fail: function(res2) {
                    common_vendor.index.showToast({
                      title: "登录失败",
                      icon: "none"
                    });
                  }
                });
              },
              fail: function(loginRes) {
                common_vendor.index.showToast({
                  title: "登录失败",
                  icon: "none"
                });
              }
            });
          } else if (res.cancel)
            ;
        }
      });
    }
  },
  data() {
    const storedList = common_vendor.index.getStorageSync("list");
    const storedListRemind = common_vendor.index.getStorageSync("listremind");
    return {
      tab: "",
      texts: ["提醒", "记录"],
      index: 0,
      listremind: storedListRemind ? JSON.parse(storedListRemind) : ["写代码", "吃饭", "睡觉", "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"],
      list: storedList ? JSON.parse(storedList) : ["写代码", "吃饭饭", "睡觉觉"],
      isshow: false
    };
  },
  onLoad(options) {
    this.tab = options.tab;
    const { data, leftSelected, rightSelected, indexInForm } = options;
    const decodedData = decodeURIComponent(data).replace(/%0A/g, "\n");
    console.log(indexInForm);
    if (leftSelected === "1") {
      if (indexInForm != -1) {
        this.listremind[indexInForm] = decodedData;
        common_vendor.wx$1.setStorageSync("listremind", JSON.stringify(this.listremind));
      } else if (indexInForm == -1) {
        this.listremind.push(decodedData);
        common_vendor.wx$1.setStorageSync("listremind", JSON.stringify(this.listremind));
      }
    }
    if (rightSelected === "1") {
      if (indexInForm != -1) {
        this.list[indexInForm] = decodedData;
        common_vendor.wx$1.setStorageSync("listremind", JSON.stringify(this.list));
      } else if (indexInForm == -1) {
        this.list.push(decodedData), common_vendor.wx$1.setStorageSync("list", JSON.stringify(this.list));
      }
    }
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
    c: this.index === 0
  }, this.index === 0 ? {
    d: common_vendor.p({
      list: $data.listremind,
      flag: false
    }),
    e: common_vendor.p({
      activeTab: $data.tab
    })
  } : {
    f: common_vendor.p({
      list: $data.list,
      flag: true
    }),
    g: common_vendor.p({
      activeTab: $data.tab
    })
  }, {
    h: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    i: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    j: $data.isshow
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-17181d6d"], ["__file", "D:/school/团小萌/团小萌/petApp/pages/notebook/notebook.vue"]]);
wx.createPage(MiniProgramPage);
