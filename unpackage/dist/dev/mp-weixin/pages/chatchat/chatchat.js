"use strict";
const common_vendor = require("../../common/vendor.js");
const navBar = () => "../../components/navBar/navBar.js";
const _sfc_main = {
  components: {
    navBar
  },
  data() {
    return {
      messages: [],
      messageText: "",
      selectedImage: null,
      socket: null,
      Text: "\u5C18",
      clientId: ""
    };
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:2333");
    this.socket.onopen = () => {
      console.log("WebSocket\u8FDE\u63A5\u5DF2\u6253\u5F00");
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.clientId) {
        this.clientId = data.clientId;
      } else {
        this.messages.push(data);
      }
    };
    this.socket.onclose = () => {
      console.log("WebSocket\u8FDE\u63A5\u5DF2\u5173\u95ED");
    };
    this.socket.onerror = (error) => {
      console.error("WebSocket\u53D1\u751F\u9519\u8BEF", error);
    };
  },
  methods: {
    sendTextMessage() {
      const newMessage = {
        content: this.messageText,
        senderId: this.clientId,
        isMine: true,
        type: "text"
      };
      this.messages.push(newMessage);
      this.messageText = "";
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(newMessage));
      } else {
        console.error("WebSocket\u8FDE\u63A5\u672A\u5EFA\u7ACB\u6216\u5DF2\u5173\u95ED");
      }
    },
    shouldAddMargin(index, isMine) {
      if (index === 0) {
        return false;
      }
      const previousMessage = this.messages[index - 1];
      return previousMessage.isMine !== isMine;
    },
    chooseImage() {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.addEventListener("change", (event) => {
        const imageFile = event.target.files[0];
        this.sendImage(imageFile);
      });
      fileInput.click();
    },
    sendImage(imageFile) {
      if (!imageFile) {
        console.error("\u672A\u9009\u62E9\u56FE\u7247\u6587\u4EF6");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        const imageMessage = {
          type: "image",
          content: imageData,
          senderId: this.clientId,
          isMine: true
        };
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(imageMessage));
        } else {
          console.error("WebSocket\u8FDE\u63A5\u672A\u5EFA\u7ACB\u6216\u5DF2\u5173\u95ED");
        }
        this.messages.push(imageMessage);
      };
      reader.onerror = (error) => {
        console.error("\u8BFB\u53D6\u56FE\u7247\u6587\u4EF6\u5931\u8D25:", error);
      };
      reader.readAsDataURL(imageFile);
    },
    startCall() {
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      text: $data.Text
    }),
    b: common_vendor.f($data.messages, (message, index, i0) => {
      return common_vendor.e({
        a: message.type === "text"
      }, message.type === "text" ? {
        b: common_vendor.t(message.content)
      } : message.type === "image" ? {
        d: message.content
      } : {}, {
        c: message.type === "image",
        e: index,
        f: message.isMine ? 1 : "",
        g: !message.isMine ? 1 : "",
        h: $options.shouldAddMargin(index, message.isMine) ? 1 : ""
      });
    }),
    c: $data.selectedImage
  }, $data.selectedImage ? {
    d: $data.selectedImage
  } : {}, {
    e: $data.messageText,
    f: common_vendor.o(($event) => $data.messageText = $event.detail.value),
    g: common_vendor.o((...args) => $options.sendTextMessage && $options.sendTextMessage(...args)),
    h: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    i: common_vendor.o((...args) => $options.startCall && $options.startCall(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/pages/chatchat/chatchat.vue"]]);
wx.createPage(MiniProgramPage);