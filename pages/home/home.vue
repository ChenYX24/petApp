<template>
  <view class="topBackground">
    <!-- 页面内容 -->

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
		          <view class="settingsButton" @tap="goSet">设置></view>
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
		<view class="icon make" @tap="goMake">
			<image src="../../static/home/dog.png" class="makeImg"></image>
			  <view class="makeText">
			    <view class="line1">制作</view>
			    <view class="line1">萌宠表情包</view>
			    <view class="line1">》</view>
			  </view>
		</view>
		<view class="icon collect" @tap="goCollect">
			<image src="../../static/home/cat.png" class="collectImg"></image>
			<view class="collectText">
				<view class="line2">查看</view>
				<view class="line2">收藏表情包</view>
				<view class="line2">《</view>
			</view>
		</view>
		<!-- 引用自定义tabbar组件 -->
		<tab-bar :activeTab="tab"></tab-bar>
	</view>
  </view>
</template>

<script>
import TabBar from '/components//TabBar.vue';
import CustomAlbum from '/components//CustomAlbum/CustomAlbum.vue'
export default {
  components: {
    TabBar,
	CustomAlbum
  },
  onLoad: function (options) {
	this.tab=options.tab
  },
  data() {
  	return {
  		tab: '',
		token:'',
		nickName: '用户名',
		avatarUrl: '../../static/home/cat.png',
		userInfo:{},
		hasUserInfo:false,
		//建议存在本机的缓存中
		customNumberItems: ['宠物', '勋章', '喜欢']
  	}
  },
  computed:{
	  idCardList(){
		  return uni.getStorageSync('idCardList')
	  },
	  custom(){
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
	  //获取之前请求获取到的信息
	  if(uni.getStorageSync('avatarUrl')!==''){
			this.avatarUrl=uni.getStorageSync('avatarUrl');
	  }
	  if(uni.getStorageSync('nickName')!==''){
		  	this.nickName=uni.getStorageSync('nickName');
	  }
	  this.hasUserInfo=uni.getStorageSync('hasUserInfo');
	  console.log(this.hasUserInfo);
  },
  methods:{
	   handleSelectedImages(selectedImages) {
	        console.log('Selected images:', selectedImages);
	      },
		  goSet(){
				uni.navigateTo({
					 url: `/pages/setting/setting`,
				})
		  },
		  customTap(index){
			      this.customTapFunctions[index]();
		  },
		  getUserProfile(){
			 //判断是否已经获取过了用户头像等信息
			  if(this.hasUserInfo){
			//如果已经获取信息过了
			//就不再获取了 否则会频繁获取  不太合适 
			  }
			  else{
				  wx.getUserProfile({
				    desc: '用于显示用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				    success: (res) => {
				  	  console.log(res);
				  	  this.userInfo=res.userInfo;
				  	  this.hasUserInfo=true;
					  this.avatarUrl=this.userInfo.avatarUrl;
					  this.nickName=this.userInfo.nickName;
					  uni.setStorageSync('avatarUrl', this.avatarUrl);
					  uni.setStorageSync('nickName', this.nickName);
					  uni.setStorageSync('hasUserInfo',this.hasUserInfo);
					  
					  //将获取的信息上传到后端的服务器中
					  
					  uni.request({
					      url: 'http://localhost:88/user/update/',
					  	  method:'POST',
					      data: {
					        userId: uni.getStorageSync('userId'),
					  		nickname: this.nickName,
					  		backgroundImage: this.avatarUrl
					      },
					      header: {
					  		"Content-Type": 'application/json',
					  		"Authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiIyMDFCTkVBUFEzcENreDVra0E1aTB3PT0iLCJleHAiOjE2ODI1ODExMDF9.0XkPv_JsFnT5ByDqoJJ9WTbwcD5TGTPeUC5ZYy77zBc'
					      },
					      success: (res) => {
					          console.log(res.data);
					      },
						  fail: (res) => {
							  console.log(res.data);
						  }
					  });
				    },
				    fail: (res) => {
				  	  console.log(res);
				  	  that.hasUserInfo=false;
				    },
				  });
			  }
		  },
		wxLogin(){
		var that=this;
		if(!this.token){
			uni.showModal({
				mask:true,
				title:'温馨提示',
				content:'授权微信登录后才能正常使用',
				success(res) {
					if(res.confirm){
						uni.login({
						  provider: 'weixin',
						  success: function(loginRes) {
						    const code = loginRes.code;
							console.log(code);
						    // 将登录凭证发送到后端服务器进行验证和处理
						    uni.request({
						      url: 'https://mock.apifox.cn/m1/2440038-0-default/user/login',
						      method: 'GET',
						      data: {
						        code: code
						      },
						      success: function(res) {
						        // 登录成功，将自定义登录态存储在本地
								//#ifdef MP-WEIXIN
								console.log(res);
						        uni.setStorageSync('token', res.data.token);
								that.token=uni.getStorageSync('token');
								console.log(that.token);

								//除了token，userId也要保存，方便后面请求
								uni.setStorageSync('token', res.data.userId);
								
								//#endif
						      },
						      fail: function(res) {
						        // 登录失败，提示用户
						        uni.showToast({
						          title: '登录失败',
						          icon: 'none'
						        });
						      }
						    });
						  },
						  fail: function(loginRes) {
						    // 登录失败，提示用户
						    uni.showToast({
						      title: '登录失败',
						      icon: 'none'
						    });
						  }
						});
				}else if(res.cancel){}
				}
			})
		}
		else
		{
			uni.navigateTo({
				url:'/pages/infoEdit/infoEdit'
			})
		}
		
	},
	goMake(){
		uni.navigateTo({
			url:"/pages/makeIcon/makeIcon"
		})
	},
	goCollect(){
		uni.navigateTo({
			url:"/pages/fovIcon/fovIcon"
		})
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
.icon.make{
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