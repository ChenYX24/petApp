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
      Text: "\u72D7\u72D7\u533B\u751F",
      clientId: "",
      expandInputArea: false,
      expandEmojiArea: false,
      emoticons: []
    };
  },
  onLoad() {
    this.emoticons = common_vendor.index.getStorageSync("likeIcon");
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
        if (data.type == "text") {
          this.$nextTick(() => {
            const chatContainer = document.getElementById("chatContainer");
            chatContainer.scrollTop = 1e4;
          });
        }
        if (data.type == "image") {
          this.$nextTick(() => {
            const chatContainer = document.getElementById("chatContainer");
            const containerHeight = chatContainer.scrollHeight;
            const containerPadding = parseInt(getComputedStyle(chatContainer).paddingBottom);
            const imageBottomOffset = containerHeight + containerPadding;
            chatContainer.scrollTop = imageBottomOffset > 0 ? imageBottomOffset : 0;
          });
        }
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
    toggleEmojiArea() {
      this.expandInputArea = false;
      this.expandEmojiArea = !this.expandEmojiArea;
    },
    toggleInputArea() {
      this.expandEmojiArea = false;
      this.expandInputArea = !this.expandInputArea;
    },
    handleInputFocus() {
      this.expandEmojiArea = false;
      this.expandInputArea = false;
    },
    sendTextMessage() {
      if (this.messageText.trim() !== "") {
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
        this.$nextTick(() => {
          const chatContainer = document.getElementById("chatContainer");
          chatContainer.scrollTop = 1e4;
        });
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
    sendImageMessage(image) {
      const newMessage = {
        type: "image",
        content: image,
        senderId: this.clientId,
        isMine: true
      };
      this.messages.push(newMessage);
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(newMessage));
      } else {
        console.error("WebSocket\u8FDE\u63A5\u672A\u5EFA\u7ACB\u6216\u5DF2\u5173\u95ED");
      }
      this.$nextTick(() => {
        const chatContainer = document.getElementById("chatContainer");
        const containerHeight = chatContainer.scrollHeight;
        const containerPadding = parseInt(getComputedStyle(chatContainer).paddingBottom);
        const imageBottomOffset = containerHeight + containerPadding;
        chatContainer.scrollTop = imageBottomOffset > 0 ? imageBottomOffset : 0;
      });
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
        const image = new Image();
        image.onload = () => {
          this.$nextTick(() => {
            const chatContainer = document.getElementById("chatContainer");
            const containerHeight = chatContainer.scrollHeight;
            const containerPadding = parseInt(getComputedStyle(chatContainer).paddingBottom);
            const imageBottomOffset = containerHeight + containerPadding;
            chatContainer.scrollTop = imageBottomOffset > 0 ? imageBottomOffset : 0;
          });
        };
        image.src = imageData;
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
      const fullUrl = `https://ameliveta.scutbot.icu`;
      common_vendor.index.navigateTo({
        url: `/pages/videoChat/videoChat?url=${encodeURIComponent(fullUrl)}`
      });
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
    c: common_vendor.o((...args) => $options.sendTextMessage && $options.sendTextMessage(...args)),
    d: common_vendor.o((...args) => $options.handleInputFocus && $options.handleInputFocus(...args)),
    e: $data.messageText,
    f: common_vendor.o(($event) => $data.messageText = $event.detail.value),
    g: $data.messageText.trim() !== ""
  }, $data.messageText.trim() !== "" ? {
    h: common_vendor.o((...args) => $options.sendTextMessage && $options.sendTextMessage(...args))
  } : {}, {
    i: $data.messageText.trim() === ""
  }, $data.messageText.trim() === "" ? {
    j: common_vendor.o((...args) => $options.toggleEmojiArea && $options.toggleEmojiArea(...args))
  } : {}, {
    k: $data.messageText.trim() === ""
  }, $data.messageText.trim() === "" ? {
    l: common_vendor.o((...args) => $options.toggleInputArea && $options.toggleInputArea(...args))
  } : {}, {
    m: $data.expandInputArea
  }, $data.expandInputArea ? {
    n: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    o: common_vendor.o((...args) => $options.startCall && $options.startCall(...args))
  } : {}, {
    p: $data.expandEmojiArea
  }, $data.expandEmojiArea ? {
    q: common_vendor.f($data.emoticons, (image, index, i0) => {
      return {
        a: index,
        b: image,
        c: common_vendor.o(($event) => $options.sendImageMessage(image), index)
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/petApp/pages/chatchat/chatchat.vue"]]);
wx.createPage(MiniProgramPage);
