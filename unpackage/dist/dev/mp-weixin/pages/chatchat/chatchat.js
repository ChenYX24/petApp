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
      // 存储聊天消息
      messageText: "",
      // 输入框中的消息文本
      selectedImage: null,
      // 已选择的图片
      socket: null,
      // WebSocket对象
      Text: "尘",
      clientId: ""
    };
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:2333");
    this.socket.onopen = () => {
      console.log("WebSocket连接已打开");
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
      console.log("WebSocket连接已关闭");
    };
    this.socket.onerror = (error) => {
      console.error("WebSocket发生错误", error);
    };
  },
  methods: {
    sendTextMessage() {
      const newMessage = {
        content: this.messageText,
        senderId: this.clientId,
        // 添加senderId字段
        isMine: true,
        type: "text"
      };
      this.messages.push(newMessage);
      this.messageText = "";
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(newMessage));
      } else {
        console.error("WebSocket连接未建立或已关闭");
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
        console.error("未选择图片文件");
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
          console.error("WebSocket连接未建立或已关闭");
        }
        this.messages.push(imageMessage);
      };
      reader.onerror = (error) => {
        console.error("读取图片文件失败:", error);
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/fjh28/Desktop/petApp/pages/chatchat/chatchat.vue"]]);
wx.createPage(MiniProgramPage);
