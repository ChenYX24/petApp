<template>
  <view class="chat-container">
    <nav-bar :text="Text"></nav-bar>
    <view class="message-list">
      <!-- 消息列表 -->
      <view
        v-for="(message, index) in messages"
        :key="index"
        class="message-item"
        :class="{
          mine: message.isMine,
          theirs: !message.isMine,
          'with-margin': shouldAddMargin(index, message.isMine)
        }"
      >
         <template v-if="message.type === 'text'">
           {{ message.content }}
         </template>
         <template v-else-if="message.type === 'image'">
           <image :src="message.content" mode="heightFix" />
         </template>
      </view>
    </view>

    <view class="input-area">
      <!-- 图片显示区域 -->
      <view v-if="selectedImage" class="selected-image">
        <image :src="selectedImage" mode="aspectFill" />
      </view>

      <!-- 文本输入框 -->
      <input
        class="text-input"
        type="text"
        placeholder="请输入消息"
        v-model="messageText"
      />

      <!-- 发送按钮 -->
      <view class="send-button" @click="sendTextMessage">
        发送
      </view>

      <!-- 图片选择按钮 -->
      <view class="image-button" @click="chooseImage">
        选择图片
      </view>

      <!-- 通话按钮 -->
      <view class="call-button" @click="startCall">
        通话
      </view>
    </view>
  </view>
</template>

<script>
import navBar from '/components//navBar/navBar.vue';

export default {
  components: {
    navBar,
  },
  data() {
    return {
      messages: [], // 存储聊天消息
      messageText: '', // 输入框中的消息文本
      selectedImage: null, // 已选择的图片
      socket: null, // WebSocket对象
      Text: '尘',
	  clientId:''
    };
  },
	mounted() {
	  // 创建WebSocket连接
	  this.socket = new WebSocket('ws://localhost:2333');
	
	  this.socket.onopen = () => {
	    console.log('WebSocket连接已打开');
	  };
	
	// 监听从服务器发送的消息
	  this.socket.onmessage = (event) => {
		const data = JSON.parse(event.data);

		if (data.clientId) {
		  // 接收到唯一标识符消息
		  this.clientId = data.clientId;
		} else {
		  // 接收到聊天消息
		  this.messages.push(data);
		}
	  };
	
	  this.socket.onclose = () => {
	    console.log('WebSocket连接已关闭');
	  };
	
	  this.socket.onerror = (error) => {
	    console.error('WebSocket发生错误', error);
	  };
	
	},
	methods: {
	sendTextMessage() {
	  const newMessage = {
		content: this.messageText,
		senderId: this.clientId,// 添加senderId字段
		isMine:true,
		type:'text'
	  };

	  this.messages.push(newMessage);
	  this.messageText = '';

	  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
		this.socket.send(JSON.stringify(newMessage));
	  } else {
		console.error('WebSocket连接未建立或已关闭');
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
		  const fileInput = document.createElement('input');
		  fileInput.type = 'file';
		  fileInput.accept = 'image/*';
		  fileInput.addEventListener('change', (event) => {
		    const imageFile = event.target.files[0];
		    this.sendImage(imageFile);
		  });
		  fileInput.click();
		},
	sendImage(imageFile) {
		
	  if (!imageFile) {
	    console.error('未选择图片文件');
	    return;
	  }
	  const reader = new FileReader();
	  reader.onload = (event) => {
	    const imageData =  event.target.result;;
	    const imageMessage = {
	      type: 'image',
	      content: imageData,
	      senderId: this.clientId,
	      isMine: true
	    };
	    // 将图片消息发送给服务器
	    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
	      this.socket.send(JSON.stringify(imageMessage));
	    } else {
	      console.error('WebSocket连接未建立或已关闭');
	    }
	
	    // 将图片消息添加到自己的消息列表中
	    this.messages.push(imageMessage);
	  };
	  reader.onerror = (error) => {
	    console.error('读取图片文件失败:', error);
	  };
	  reader.readAsDataURL(imageFile);
	},
    startCall() {
      // 开始通话的逻辑
      // 根据你选择的音视频通信组件或第三方插件的API来实现通话功能
    }
  }
};
</script>
<style>



.with-margin {
  margin-top: 10px;
}
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(255, 244, 242, 1);

}

.message-list {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 244, 242, 1);
  overflow-y: scroll;
}

.message-item {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  max-width: 70vw;
}

.mine {
  align-self: flex-end;
  background: rgba(255, 232, 207, 1);
  border-radius: 20px 20px 0px 20px;
}

.theirs {
  background: rgba(253, 252, 251, 1);
  border-radius: 20px 20px 20px 0px;
  align-self: flex-start;
}

.input-area {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;

}

.selected-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.text-input {
  flex: 1;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 20.5px;
  background: rgba(235, 219, 210, 0.5);
}

.send-button,
.image-button {
  margin-left: 10px;
  padding: 6px 12px;
  border-radius: 5px;
  background-color: #007aff;
  color: #fff;
}
.call-button {
  margin-left: 10px;
  padding: 6px 12px;
  border-radius: 5px;
  background-color: #ff3b30;
  color: #fff;
}

</style>
