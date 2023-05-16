<template>
	<view   class="activityPage">
		<view class="slideShow">
			<view class="back-container" @click="backToActivity">
			  <image src="/static/activity/返回活动图.png" class="back"></image>
			</view>
			<view class="wechatImageWrapper" @tap="getUser">
			  <image :src="avatarUrl" class="wechatImage"></image>
			</view>
			 <view class="zhuanfa-container">
			        <image src="/static/activity/转发.png" class="zhuanfa"></image>
			 </view>
			   <swiper :indicator-dots="true" :current="current" class="swiper">
			            <swiper-item v-for="(item, index) in swiperList" :key="index">
			           <image :src="item" mode="aspectFill" style="height: 80vh; width: 100%;"></image>
			         </swiper-item>
			   </swiper>
		</view>
		
		<view class="comment">
			    <view  class="Text">
					<text class="Text1"> {{ text1 }}</text>
					<text class="Text2">{{ text2 }}</text>
					<text class="Text3">{{ text3 }}</text>
				</view>
             <view class="scroll-view-content" >
				 
<!-- 			   <view class="commentForBlog">
			   	  <view class="UserCommentImage1" @tap="getUser">
			   	    <image :src="avatarUrl1" class="UseImage1"></image>
			   	  </view>
				  <view class="commentInformation">
				  		<text class="UserName">用户10001</text>
						<text class="UserComment">风景不错！</text>				
				  </view>
			   </view>
			   <view class="commentForBlog">
			   	  <view class="UserCommentImage1" @tap="getUser">
			   	    <image :src="avatarUrl2" class="UseImage1"></image>
			   	  </view>
				  <view class="commentInformation">
				  		<text class="UserName">用户10002</text>
				  		<text class="UserComment">这是哪里呀~</text>				
				  </view>
			   </view>
			   <view class="commentForBlog">
				   
			   	  <view class="UserCommentImage1" @tap="getUser">
			   	    <image :src="avatarUrl2" class="UseImage1"></image>
			   	  </view>
			   				  <view class="commentInformation">
			   				  		<text class="UserName">用户10002</text>
			   				  		<text class="UserComment">可以一起去吖~</text>				
			   				  </view>
			   </view> -->
			   
			   
			   
			   
			  <view v-for="(comment, index) in commentsarr" :key="index">
			    <comments :text="comment.text" :avatarUrl="comment.avatarUrl" :username="comment.username"></comments>
			  </view>
           </view>
		   
		   <view class="view3">
		   	  <view class="review">
				  <image class="icon" src="../../../static/activity/留言.png" @click="handleKey"></image>
				  <input v-model="text"  type="text" placeholder="评论一下 ..." placeholder-style="color:#cea697;" @confirm="handleEnterKey"/>
			  </view>
		   </view>
		   
		</view>
	</view>
</template>

<script>
	import comments from '/components///comments.vue';

	var socket=null;
	export default {
        components: {
          comments,
        },
		data() {
			return {
				activityThoughtId:'3',
				text:'',
				Text:'新建朋友圈',
				commentsarr: [],
				text1: '#春日派对',
				text2: '今天小柴探索森林新地图去咯~~',
				text3: '2023-05-16',
				avatarUrl:"https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/dog.png",
				avatarUrl1:"/static/activity/头像1.jpg",
				avatarUrl2:"/static/activity/头像2.jpeg",
				swiperList: [
				           '/static//activity/柴犬.jpg',
				            '/static//activity/柴犬2.jpg',
				            '/static//activity/柴犬3.jpg'

				      ],
			}
		},
		
		mounted() {
		    this.initData()
		  },
		methods: {
			backToActivity(){
				uni.navigateTo({
					url:"/pages/activity/activity"
				})
			},
			getUser(){
				uni.navigateTo({
					url:"/pages/home/home"
				})
			},
			handleEnterKey() {
			 console.log('评论已存储：');
			  const comment = {
				text: this.text,
				avatarUrl:uni.getStorageSync("avatarUrl"),
				username:uni.getStorageSync("nickName")
			  };
			  this.commentsarr.push(comment);
				  
			  // 在这里处理按下回车键的事件
			  const key = 'commentByUser'; // 存储的键名
			  const value = this.text; // 存储的键值
			  
			  // 判断当前运行环境，选择合适的存储方式
			  //#ifdef MP-WEIXIN
			  wx.setStorageSync(key, value);
			  //#endif
			  
			  //#ifndef MP-WEIXIN
			  localStorage.setItem(key, value);
			  //#endif
			  
			  console.log('评论已存储：', key, value);
			  
			  
			  var message = {
				username: 2,//userId
				to: "每一个活动笔记",//连接该活动的所有人
				message: this.text,
				activityThought: 1//活动笔记Id
			}
			  // uni.sendSocketMessage(message); 

			  //及时通信的逻辑	
			  uni.sendSocketMessage({
			    data: JSON.stringify(message)
			  });
			  //保存评论消息actionType
			  uni.request({
			      url: getApp().globalData.host+"/interaction/comment/action?actionType="+"0"+"&commentText="+this.text+
				  "&activityThoughtId="+this.activityThoughtId+"&userId="+uni.getStorageSync("userId"),
			  	  method:'POST',
			      header: {
			  		"Content-Type": 'application/json',
			  		"Authorization": uni.getStorageSync("token")
			      },
			      success: (res) => {
			          console.log(res);
			      },
				  fail: (res) => {
					  console.log(res);
				  }
			  });
			  
			  
			  
			  //还原输入框
			  this.text = '';
			  
			  
			  
			},
			handleKey(){
				console.log('评论已存储：');
			},
			initData() {
	      // 从本地缓存或本地存储中获取数据，并初始化页面属性
	     // #ifdef MP-WEIXIN
	      this.swiperList = wx.getStorageSync('imageSrc') || this.swiperList
	      this.text2 = wx.getStorageSync('inputValue') || this.text2
	      //#endif
	      //#ifndef MP-WEIXIN
	      this.swiperList = JSON.parse(localStorage.getItem('imageSrc')) || []
	      this.text2 = localStorage.getItem('inputValue') || ''
	      //#endif
			},
		},
		onLoad(){
			console.log(getApp().globalData)
			var that=this;
			uni.request({
			    url: getApp().globalData.host+"/interaction/comment/listById?activityThoughtId="+this.activityThoughtId,
				method:'GET',
			    header: {
					"Content-Type": 'application/json',
					"Authorization": uni.getStorageSync("token")
			    },
				
			    success: (res) => {
					var arr=res.data.commentList
					for (let i = 0; i < arr.length; i++) {
						var comment={
							text: arr[i].comment,
							avatarUrl:arr[i].avatarUrl,
							username:arr[i].username
						}
						
						this.commentsarr.push(comment)
					}
			        console.log(res);
			    },
			  fail: (res) => {
				  console.log(res);
			  }
			});
		},
		onShow() {
			const userId =uni.getStorageSync('userId')
			socket = uni.connectSocket({ 
			            url: getApp().globalData.webSocketHost+'/websocket/'+this.activityThoughtId+"/"+userId, //仅为示例，并非真实接口地址。  第一个参数是活动笔记的ID 第二个是用户ID
			            complete: ()=> {}
			        });
			socket.onOpen(()=>{
				console.log('conn')
				// socket.send(()=>{
				// 				  // data: JSON.stringify(message)	
				// 				  data: 	
				// })
			});
			var that=this;
			socket.onMessage(res=>{
				console.log(res.data)
				var msg=JSON.parse(res.data)
				console.log(msg)
				
				//处理接收到的别人的数据
				if(msg.fromusername!=userId&&msg.textMessage!=undefined){
					//说明这是别人发的消息  并且不是空的
					
					//还要获取别人的信息
					const comment = {
						text:msg.textMessage,
					};
					that.commentsarr.push(comment);
				}
				
				
				
			});//获取服务器传来的数据，做相应处理
			
			
			socket.onClose(()=>{console.log('close')});
			socket.onError((err)=>{console.log(err)});
		},
		onHide(){
			socket.close();
		}
		
	}
</script>

<style lang="less">
	.activityPage{
		display: flex;
		flex-direction: column;
		height:100%;
		background-color: antiquewhite;
	}
	.slideShow{
		height:80%;
	}
.swiper {
  height: 62vh;
}
  .wechatImageWrapper {
    position: absolute;
    top: 4vh;
    left: 11vw;
    z-index: 1;
  }
  .wechatImage {
    width: 18vw;
    height: 18vw;
    opacity: 1;
    border: 2px solid rgba(125, 91, 91, 1);
    border-radius: 50%;
    background: rgba(255, 253, 247, 1);
  }
.comment{
	
  background-color: aqua;
  position: absolute;
  top: 61%;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
      align-items: center;
  border-radius: 23px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 12px 0px rgba(237, 66, 13, 0.5);
  .Text{
	  position:relative;
	  border-bottom: 2px solid rgba(206, 166, 151, 0.15);
	  height:9vh ;
	  width:100vw ;
	  .Text1{
	  	   position: absolute;
	  	   left:10vw;
	  	   top:1vh;
	  	   font-size: 20px;
	  	   font-weight: 400;
	  	   letter-spacing: 0px;
	  	   line-height: 20.5px;
	  	   color: rgba(191, 180, 169, 1);
	  }	
	  .Text2{
	  	   position: absolute;
	  	   left:10vw;
	  	   top:3vh;
	  	   font-size: 15px;
	  	   font-weight: 400;
	  	   letter-spacing: 0px;
	  	   line-height: 20.5px;
	  	   color: rgba(191, 180, 169, 1);
	  }	
	  .Text3{
	  	   position: absolute;
	  	   right:10vw;
	  	   top:5vh;
	  	   font-size: 15px;
	  	   font-weight: 400;
	  	   letter-spacing: 0px;
	  	   line-height: 20.5px;
	  	   color: rgba(191, 180, 169, 1);
	  }
  }
  
}
.scroll-view-content{
	position:relative;
	display: grid;
	grid-template-columns: 1fr;
	width: 100%;
	height: 20vh;
	overflow-y: scroll;
	justify-items: center;
}
.commentForBlog{
	position:relative;
	display: flex;
	flex-direction: row;
	height:10vh;
	width:90vw;
	border-bottom: 2px solid rgba(206, 166, 151, 0.15);
	
}
.UserCommentImage1{
	display: flex;
	justify-content: space-between;
	align-items: center;
 margin-left: 5vw;
 .UseImage1 {
   width: 15vw;
   height: 15vw;
   opacity: 1;
   border: 2px solid rgba(125, 91, 91, 1);
   border-radius: 50%;
   background: rgba(255, 253, 247, 1);
 }
}
.commentInformation{
	margin-left: 5vw;
    display: flex;
    flex-direction: column;
	.UserName{
		position:absolute;
		top:1.5vh;
		color: rgba(191, 180, 169, 1);
	}
	.UserComment{
		position:absolute;
		bottom:2vh;
		color: rgba(191, 180, 169, 1);
	}
}
.swiper-item-img {
  width: 100%;
  height: 100%;
}
.zhuanfa-container {
  position: absolute;
  top: 3vh;
  right: 10px;
  z-index: 1;
}
.zhuanfa{
	width:17vw;
	height: 12vh;
	
}
.back-container {
  position: absolute;
  top: 5vh;
  left: 10px;
  z-index: 1;
}
.back{
	width:10vw;
	height: 7vh;
	
}
.view3{
	margin: 1px;
	position: absolute;
	bottom: 0vh;
	width: 100vw;
	height: 10vh;
	z-index: 99;
}
.review{
	position: absolute;
	left: 10px;
	bottom: 2vh;
	width: 241px;
	height: 41px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
	border-radius: 20.5px;
	background:rgba(235, 219, 210, 0.5);
	z-index: 99;
	.icon{
		    position:absolute;
			top:1vh;
			left:3vw;
			width: 2rem;
			height: 2rem;
			z-index: 99;
	}
	input {
			margin-left: 15vw;
			width: 80%;
			height: 80%;
			color: #cea697;
			font-weight: bold;
	}
}
</style>

