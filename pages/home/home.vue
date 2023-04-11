<template>
  <view class="topBackground">
    <!-- 页面内容 -->
    <view class="Background">
		<view class="login" @tap="wxLogin">
			登陆
		</view>
		<!-- 引用自定义tabbar组件 -->
		<tab-bar :activeTab="tab"></tab-bar>
	</view>


  </view>
</template>

<script>
import TabBar from '/components//TabBar.vue';

export default {
  components: {
    TabBar,
  },
  onLoad: function (options) {
	this.tab=options.tab
  },
  data() {
  	return {
  		tab: '',
		token:'',
  	}
  },
  methods:{
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
						      url: 'https://mock.apifox.cn/m1/2440038-0-default/user/login/',
						      method: 'GET',
						      data: {
						        code: code
						      },
						      success: function(res) {
						        // 登录成功，将自定义登录态存储在本地
								//#ifdef MP-WEIXIN
						        uni.setStorageSync('token', res.data.token);
								that.token=uni.getStorageSync('token');
								console.log(that.token);
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

		console.log('login')
		
	},

  }

};
</script>

<style scoped>
.Background{
	width: 100%;
    height: 80vh;
    background-color: #fffdf7;
    position: relative;
    top: 20vh;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
	box-shadow: 0px -20px 10px -8px rgba(247,142,72,0.5);
}
.topBackground{
    width: 100vw;
    height: 100vh;
    background-color: #ffb776;
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
</style>