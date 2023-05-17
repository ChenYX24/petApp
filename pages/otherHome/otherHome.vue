<template>
  <view class="topBackground">
    <!-- 页面内容 -->
	<nav-bar :text="Text"></nav-bar>

    <view class="Background">

<!-- 		<view class="login" @tap="wxLogin">
			登陆
		</view> -->
		<!-- 新增的大view -->
		    <view class="newWrapper">
		    
		      <!-- 新增的view -->
		      <view class="userInfo">
		        <view class="wechatImageWrapper" @tap="getUserProfile">
		          <image :src="avatarUrl" class="wechatImage"></image>
		        </view>
		        <view class="userNameWrapper">
		          <view class="userName">{{nickName}}</view>
		          <view class="settingsButton" @tap="">待定></view>
		        </view>
		      </view>
		      
		      <!-- 新增的view -->
		      <view class="customNumbers">
		        <view class="numberWrapper" v-for="(item, index) in ['宠物', '勋章', '喜欢']" :key="index" @tap="customTap(index)">
		          <view class="customNumber" >{{ custom[index] }}</view>
		          <view class="customNumberText">{{ item }}</view>
		        </view>
		      </view>
		      
		    </view>
		<view class="icon chat" @tap="getOtherActivity">
			<image src="/static/home/chat.png" class="collectImg"></image>
			<view class="collectText">
				<view class="line2">查看</view>
				<view class="line2">他的活动</view>
				<view class="line2">《</view>
			</view>
		</view>
		<view class="icon make" @tap="addFriend">
			<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/dog.png" class="makeImg"></image>
			  <view class="makeText">
			    <view class="line1">添加</view>
			    <view class="line1">为朋友</view>
			    <view class="line1">》</view>
			  </view>
		</view>
		<view class="icon collect" @tap="goChat">
			<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/cat.png" class="collectImg"></image>
			<view class="collectText">
				<view class="line2">发送</view>
				<view class="line2">消息</view>
				<view class="line2">《</view>
			</view>
		</view>

	</view>
  </view>
</template>

<script>
import navBar from '/components//navBar/navBar.vue';
import CustomAlbum from '/components//CustomAlbum/CustomAlbum.vue'
export default {
  components: {
    navBar,
	CustomAlbum
  },
  async onLoad(options) {
	this.tab=options.tab
	
	//获取从评论获取的用户ID   用于查询
	this.userId=options.userId
	console.log(this.userId)
	
	//获取用户的头像和昵称
	uni.request({
	    url: getApp().globalData.host+"/user/info?userId="+this.userId,
		method:'GET',
	    header: {
			"Content-Type": 'application/json',
			"Authorization": uni.getStorageSync("token")
	    },
	    success: (res) => {
	        console.log(res);
			this.nickName=res.data.user.nickname
			this.avatarUrl=res.data.user.backgroundImage
	    },
		  fail: (res) => {
			  console.log(res);
		  }
	});
	
	
	//获取本地缓存的firends
	var temp=uni.getStorageSync("friends");
	if(temp==""||temp==undefined){
		this.friends=[]
	}
	else{
		this.friends=temp;
	}
	console.log(temp);
	
	
  },
  data() {
  	return {
  		tab: '',
		token:'',
		nickName: '用户名',
		avatarUrl: 'https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/cat.png',
		userInfo:{},
		hasUserInfo:false,
		//建议存在本机的缓存中
		customNumberItems: ['宠物', '勋章', '喜欢'],
		
		
		//otherHome
		userId:'',
		Text:"返回",
		Nav:"/pages/activity/activityPage/activityPage",
		friends:[]
		
  	}
  },
  computed:{
	  idCardList(){
		  //这个应该要是获取
		  return uni.getStorageSync('idCardList')
	  },
	  custom(){
		  //这个应该要是获取   徽章和宠物身份证那些
		  if(this.idCardList)
		  {
			  return [this.idCardList.length,99,4]
		  }
		 else{
			 return [0,99,4]
		 }
	  },
	   customTapFunctions() {
	      // 返回一个函数数组，每个函数接收一个参数 index
	      return [
	        () => {
	          console.log('customTap0');
			  uni.navigateTo({
			  	 url: `/pages/petList/petList`,
			  })
	        },
	        () => {
	          console.log('customTap1');
	        },
	        () => {
	          console.log('customTap2');
	        }
	      ];
	    }

  },
  created:function(){

  },
  methods:{
	  customTap(index){
			  this.customTapFunctions[index]();
	  },
	goChat(){
		uni.navigateTo({
			url:'/pages/chatchat/chatchat'
		})
	},
	addFriend(){
		//存在本地
		var friend={
			userId:this.userId,
			nickName: '用户名',
			avatarUrl: 'https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/cat.png',
		}
		this.friends.push(friend)
		//#ifdef MP-WEIXIN
		 wx.setStorageSync('friends', this.friends)
		  //#endif
		 //#ifndef MP-WEIXIN
		 localStorage.setItem('friends', JSON.stringify(this.friends))
		 //#endif
		 
		 
		 //跳转到好友列表那里
	},
	getOtherActivity(){
		
	}
  }

};
</script>

<style scoped lang="less">
  .newWrapper {
    display: flex;
    flex-direction: column;
	position: absolute; // 设置为绝对定位
    top: -20vh;; 
	width: 80vw;

  }
 .userInfo {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    align-self: flex-start;
  }
  .wechatImageWrapper {
    margin-right: 20px;
  }
  .wechatImage {
    width: 18vw;
    height: 18vw;
    opacity: 1;
    border: 2px solid rgba(125, 91, 91, 1);
    border-radius: 50%;
    background: rgba(255, 253, 247, 1);
  }
  .userNameWrapper {
    display: flex;
    flex-direction: column;
	height: 18vw;
  }
  .userName {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 21.6px;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    vertical-align: top;
    margin-bottom: auto; // 使userName元素在顶部
	// margin-top: 15%;
  }
  .settingsButton {
    width: 77px;
    height: 22px;
    opacity: 1;
    border-radius: 999px;
    background: rgba(255, 253, 247, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 19.21px;
    color: rgba(252, 182, 96, 1);
    text-align: right;
    vertical-align: top;
    margin-top: auto; // 使settingsButton元素在底部
	    // margin-bottom: 15%;
  }
  .customNumbers {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
	align-self: center; 
	}
  .numberWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .customNumber {
    font-size: 24px;
    font-weight: 400;
    color: rgba(255, 253, 247, 1);
	
  }
  .customNumberText {
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 253, 247, 1);
  }
.numberWrapper:not(:last-child)::after {
    content: "";
    width: 59.07px;
    height: 0px;
    opacity: 1;
    transform: rotate(90deg) translateY(-9vw);
    background: #fffdf7;
    border: 2px solid #fffdf7;
    position: absolute;
    top: 100%;
    transform-origin: right center;
}
	
.Background{
    width: 100%;
    height: calc(100vh - 30vh);
    background-color: #fffdf7;
    position: relative;
    top: 30vh;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0px -20px 10px -8px rgba(247,142,72,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.topBackground{
    width: 100vw;
    height: 100vh;
	position: relative; // 设置为相对定位，使newWrapper可以相对于它进行定位
	background-image: linear-gradient(90deg, #ffb675, #ffd29e);
}
.login{
	height: 30vw;
	width: 30vw;
	display: flex;
	background-color: aqua;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	float: none;
	margin: 0 auto;
}
.icon.chat{
	margin-top: 30px;
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
		width: 332px;
		height: 165px;
		opacity: 1;
		border-radius: 25px;
		background: linear-gradient(270deg, rgba(255, 243, 202, 1) 0%, rgba(255, 253, 247, 1) 100%);
		box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
}
.icon.make{
	margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    width: 332px;
    height: 165px;
    opacity: 1;
    border-radius: 25px;
    background: linear-gradient(90deg, #fff3ca 0%, #fffdf7 100%);
    box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
    flex-direction: row;
	}
.icon.collect{
	margin-top: 20px;
	margin-bottom: 30px;
    display: flex;
	flex-direction: row;
	width: 332px;
	height: 165px;
	opacity: 1;
	border-radius: 25px;
	background: linear-gradient(270deg, rgba(255, 243, 202, 1) 0%, rgba(255, 253, 247, 1) 100%);
	box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
	}
.makeText{
	margin-top: 2%;
	  display: flex;
	  flex-direction: column;
	  align-items: flex-end;
	width: 169px;
	height: 115px;
	opacity: 1;

}
.line1{
	/** 文本1 */
	font-size: 36px;
	font-weight: 400;
	letter-spacing: 0px;
	color:transparent;
	background: linear-gradient(90deg, rgba(255, 202, 146, 1) 0%, rgba(255, 202, 146, 0.32) 100%);
	-webkit-background-clip: text;
	text-align: right;
	vertical-align: top;
	white-space: nowrap;
}
.collectText{
	margin-top: 2%;
    display: flex;
    align-items: flex-start;
    width: 185px;
    height: 115px;
    opacity: 1;
    flex-direction: column;
}
.line2{
	/** 文本1 */
	font-size: 36px;
	font-weight: 400;
	letter-spacing: 0px;
	color:transparent;
	background: linear-gradient(90deg, rgba(255, 202, 146, 0.36) 0%, rgba(255, 202, 146, 1) 100%);
	-webkit-background-clip: text;
	text-align: left;
	vertical-align: top;
	order:1;
}
.makeImg{
    width: 150px;
    height: 150px;
    margin-top: 5px;
}
.collectImg{
    width: 150px;
    height: 150px;
    margin-top: 5px;
	order:2;
}
</style>