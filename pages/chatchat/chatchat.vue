<template>
  <view class="chat-container">
    <nav-bar :text="Text"></nav-bar>
    <view class="message-list" id="chatContainer">
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

	<view class="controlBox">
		<view class="input-area">
		  <!-- 文本输入框 -->
			<input
			  class="text-input"
			  type="text"
			  placeholder="请输入消息"
			  v-model="messageText"
			  @confirm="sendTextMessage"
			  @focus="handleInputFocus"
			/>

			<view class="send-button" v-if="messageText.trim() !== ''" @click="sendTextMessage">
			      发送
			</view>
			<view class="emoji-button" v-if="messageText.trim() === ''" @click="toggleEmojiArea">
			  <image src="/static/myActivity/redHeart.png" mode="aspectFit"></image>
			</view>
		  <!-- + 号按钮 -->
		    <view class="expand-button" v-if="messageText.trim() === ''" @click="toggleInputArea">
		      <image src="/static/chatchat/more.png" mode="aspectFit"></image>
		    </view>


		</view>
		<!-- 展开的内容 -->
		<view class="expanded-content" v-if="expandInputArea">

		  <!-- 图片选择按钮 -->
		<image class="image-button" @click="chooseImage" src="/static/chatchat/img.png" mode="aspectFit"></image>


		  <!-- 通话按钮 -->
		<image class="call-button" @click="startCall" src="/static/chatchat/vid.png" mode="aspectFit"></image>

		</view>
		 <!-- 表情区域 -->
		  <view class="emoji-area" v-if="expandEmojiArea">
			<!-- Add your emoji options here -->
			<view class="contextBox T">
				<image
					v-for="(image, index) in emoticons" 
					:key="index" 
					:src="image" 
					@click="sendImageMessage(image)"
					class="emoticon"
					mode="widthFix"
				>
				</image>
				<view class="placeholder"></view>
			</view>
			111
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
	  clientId:'',
	  expandInputArea: false, // 控制输入区域展开和收起
	  expandEmojiArea: false, // 控制表情区域展开和收起
	  emoticons: []
    };
  },
  onLoad(){
  	//#ifdef MP-WEIXIN
  	this.emoticons=uni.getStorageSync('likeIcon')
  	//#endif
  	//#ifndef MP-WEIXIN
  	this.emoticons=JSON.parse(uni.getStorageSync('likeIcon'))
  	//#endif
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
		  if(data.type=='text')
		  {
		  this.$nextTick(() => {
				const chatContainer = document.getElementById('chatContainer');
					chatContainer.scrollTop = 10000;
			  });
		  }
		  if(data.type=='image')
		  {
			  this.$nextTick(() => {
			    const chatContainer = document.getElementById('chatContainer');
			    const containerHeight = chatContainer.scrollHeight;
			    const containerPadding = parseInt(getComputedStyle(chatContainer).paddingBottom);
			    const imageBottomOffset = containerHeight + containerPadding;
			    chatContainer.scrollTop = imageBottomOffset > 0 ? imageBottomOffset : 0;
			  });
		  }
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
	toggleEmojiArea() {
		this.expandInputArea=false
		this.expandEmojiArea = !this.expandEmojiArea;
	  },
	toggleInputArea() {
		this.expandEmojiArea=false
		this.expandInputArea = !this.expandInputArea;
	},
	handleInputFocus(){
		this.expandEmojiArea=false
		this.expandInputArea=false
	},
	sendTextMessage() {
	if (this.messageText.trim() !== '') {
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
		this.$nextTick(() => {
		      const chatContainer = document.getElementById('chatContainer');
					chatContainer.scrollTop = 10000;
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
		  const fileInput = document.createElement('input');
		  fileInput.type = 'file';
		  fileInput.accept = 'image/*';
		  fileInput.addEventListener('change', (event) => {
		    const imageFile = event.target.files[0];
		    this.sendImage(imageFile);
		  });
		  fileInput.click();
		  
		},
	sendImageMessage(image){
		const newMessage = {
		    type: 'image',
		    content: image,
		    senderId: this.clientId,
		    isMine: true
		  };
		
		  this.messages.push(newMessage);
		
		  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
		    this.socket.send(JSON.stringify(newMessage));
		  } else {
		    console.error('WebSocket连接未建立或已关闭');
		  }
		
		  this.$nextTick(() => {
		    const chatContainer = document.getElementById('chatContainer');
		    const containerHeight = chatContainer.scrollHeight;
		    const containerPadding = parseInt(getComputedStyle(chatContainer).paddingBottom);
		    const imageBottomOffset = containerHeight + containerPadding;
		    chatContainer.scrollTop = imageBottomOffset > 0 ? imageBottomOffset : 0;
		  });
	},
	sendImage(imageFile) {
	  if (!imageFile) {
	    console.error('未选择图片文件');
	    return;
	  }
	  const reader = new FileReader();
	  reader.onload = (event) => {
	    const imageData = event.target.result;
	    const imageMessage = {
	      type: 'image',
	      content: imageData,
	      senderId: this.clientId,
	      isMine: true
	    };
	
	    // 创建一个新的 Image 对象
	    const image = new Image();
	    image.onload = () => {
	      // 图片加载完成后执行滚动操作
	      this.$nextTick(() => {
	        const chatContainer = document.getElementById('chatContainer');
	        const containerHeight = chatContainer.scrollHeight;
	        const containerPadding = parseInt(getComputedStyle(chatContainer).paddingBottom);
	        const imageBottomOffset = containerHeight + containerPadding;
	        chatContainer.scrollTop = imageBottomOffset > 0 ? imageBottomOffset : 0;
	      });
	    };
	    image.src = imageData;
	
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
      const roomId = 999;
      const encodedRoomId = encodeURIComponent(roomId);
      // const fullUrl = `https://meliveta.scutbot.icu/?&roomId=${encodedRoomId}`;
	  const fullUrl = `https://ameliveta.scutbot.icu`;
      uni.navigateTo({
		  url: `/pages/videoChat/videoChat?url=${encodeURIComponent(fullUrl)}`
      });
    }
  }
};
  
</script>
<style lang="less">
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
  padding: 20px 20px 20vh 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: rgba(255, 244, 242, 1);

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
.controlBox{
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: rgba(255, 255, 255, 1);
	box-shadow: 5px 5px 12px 0px rgba(237, 216, 200, 0.5);
}
.input-area {
  display: flex;
  align-items: center;
  padding: 10px;
  position: relative;
  justify-content: space-between
}
.input-area::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 5%;
  width: 90%;
  border-bottom: 1px solid rgba(230, 209, 198, 1);
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
  max-width: 60vw;
}
.send-button{
    margin-left: 10px;
    padding: 6px 12px;
    color: #f5f5f5;
    cursor: pointer;
    border-radius: 20.5px;
    background: #fdbf80;
    width: 15vw;
    margin-right: 3vw;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
}

.image-button{
	width: 25vw;
	height: 50%;
}
.call-button{
	width:25vw;
	height: 50%;
}
.expand-button{
	width: 10%;
	margin-left: 10px;
	text-align: center;
	image{
	  height: 10vw;
	  width: 10vw;
	}
}
.emoji-button {
	margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
	image{
	  height: 10vw;
	  width: 10vw;
	}
}
.expanded-content {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    flex-direction: row;
    max-width: 100vw;
    height: 20vh;
}
.emoji-area {
  /* Add your styles for the emoji area here */
  height: 20vh;
}
  .contextBox {
	  display: flex;
	  flex-wrap: wrap;
	  align-content: flex-start;
	  width: 100%;
	  height: 100%;
	  max-height: 100vh; /* 视口高度 */
	  z-index: 2;
	  background-color: #ffffff;
	  position: relative;
	  top: 5%;
	  overflow-y: scroll; /* 允许垂直滚动 */
  }
  .emoticon {
      width: calc(100% / 3);
	  max-height: 34vw;

  }
  .placeholder {
  		
    height: 30%;  
  		width: 100%;
  }
</style>