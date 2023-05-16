<template>
	<view class="editData">
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
		
		<view class="cameraInput">
			<image :src="imageSrc?imageSrc:'https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/picture&name/camera.png'" mode="aspectFit" class="camera" @tap="chooseImage"></image><!--@tap是点击事件，一旦点击则将chooseimage进行响应-->
			<view class="inputBox">
				<input type="text" placeholder="昵称" class="input" placeholder-style="color:#cea697;" v-model="inputValue"> <!--v-model是双向绑定，将文本框的值与inputvalue绑定-->
			</view>
		</view>
		
		<view class="form">
		     <view class="input-container">
		      <input v-model="text1" :class="{ 'active': text1 !== '' }" type="text" placeholder="手机号码" placeholder-style="color:#cea697;"/>
		     </view>
			
		  <view class="input-container">
		    <input v-model="text2" :class="{ 'active': text2 !== '' }" type="text" placeholder="生日" placeholder-style="color:#cea697;" />
		  </view>
			
		  <view class="input-container" >
		    <input v-model="text3" :class="{ 'active': text3 !== '' }" type="text" placeholder="性别" placeholder-style="color:#cea697;" />
		  </view>
			
		  <view class="input-container">
		    <input v-model="text4" :class="{ 'active': text4 !== '' }" type="text" placeholder="地区" placeholder-style="color:#cea697;"/>
		  </view>
			
		</view>
		
		<view class="buttonBox">
			<view class="button" :class="{ active: isActive }" @tap="buttonClicked">
				保存
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
				Text:"编辑资料",
				inputValue: '',
				text1:'',
				Nav:"/pages/home/home?tab=home",
				text2:'',
				text3:'',
				text4:'',
				imageSrc:'',
				avatarUrl:''
			}
		},
		computed: {
			   isActive() {
			     return (this.inputValue.trim() !== '')||(this.text1.trim() !== '')||(this.text2.trim() !== '')||(this.text3.trim() !== '')||(this.text4.trim() !== '');
			   }
			 },
		created() {
			//获取信息进行回显
			uni.request({
			     url: getApp().globalData.host+'/user/info/',
			     method:'GET',
			        data: {
			             "userId": uni.getStorageSync('userId'),
			        },
			        header: {
			      "Content-Type": 'application/json',
			      "Authorization": uni.getStorageSync('token'),
			        },
			        success: (res) => {
			            console.log(res.data);
						this.inputValue=res.data.user.nickname;
						this.text1=res.data.user.phone;
						this.text2=res.data.user.birthday;
						this.text3=res.data.user.sex;
						this.text4=res.data.user.city;
			        }
			         
			    });
		},
		methods: {
			chooseImage() {
			      uni.chooseImage({
			        count: 1, // 最多选择的图片数量，此处为1
			        sizeType: ['compressed'], // 压缩图片
			        sourceType: ['album', 'camera'], // 可以从相册选择或拍照
			        success: (res) => {
			          this.imageSrc = res.tempFilePaths[0]
			        }
			      })
			    },
			buttonClicked(){
				//发送并保存用户信息
				
				//TODO 差上传图片到服务器   而且进来应该要回显
				
				
				uni.request({
				     url: getApp().globalData.host+'/user/update/',
				     method:'POST',
				        data: {
				             "userId": uni.getStorageSync('userId'),
				             "nickname": this.inputValue,
				             "backgroundImage": '',
				        },
				        header: {
				      "Content-Type": 'application/json',
				      "Authorization": uni.getStorageSync('token'),
				        },
				        success: (res) => {
				            console.log(res.data);
							uni.setStorageSync('nickName',this.inputValue);
							uni.setStorageSync('nickName',this.inputValue);
				        },
						complete() {
							uni.navigateTo({
								 url: `/pages/home/home`,
							})
						}
				         
				    });
				
			   
			},
			
		},

        
	}
</script>

<style lang="less">
.editData{
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	height: 100vh;
	opacity: 1;
	background: rgba(252, 242, 227, 1);
	box-shadow: 0px -10px 5px 0px rgba(247, 142, 72, 0.25);
}
.Text{
	font-size: 20px;
	font-weight: 500;
	color: rgba(130, 65, 0, 1);
}
.cameraInput{
		position: absolute;
		top: 5.5rem;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
	}
.camera{
		width: 33vw;
		height: 33vw;
	}
.inputBox{
		font-weight: bold;
		margin-top: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		align-items: center;
		width: 340px;
		height: 61px;
		border-radius: 25px;
		background: rgba(255, 253, 247, 1);
		box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
		
		input{
			margin-left: 2vw;
			width: 80%;
			height: 80%;
			color: #cea697;
		}

	}
.form{
	position:relative;
	margin-top: 15rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	top: 8vh;
	width: 90vw;
	height: 30vh;
	opacity: 1;
	border-radius: 25px;
	background: rgba(255, 253, 247, 1);
	box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
}
.input-container {
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-content: center;
 align-items: center;
  height: calc(25% - 5px);
  margin: 5px 0;
  margin-left: 4vw;
  width: 90%;
  border-bottom: 2px solid rgba(206, 166, 151, 0.15);
  input {
		margin-left: 2vw;
		width: 80%;
		height: 80%;
		color: #cea697;
		font-weight: bold;
  }
  
}
.buttonBox{
	
		display: flex;
		flex-direction: column;
		align-content: center;//交叉轴方向上居中对齐
		justify-content: center;//水平方向上居中对齐
		align-items: center;
		position: absolute;
		bottom: 8rem;

		.button{
			height: 3rem;
			background-color:rgba(221,221,221,1) ;
			border-radius: 2rem;
			padding: 0.5rem;
			width: 15rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 1rem;
			color: #fff;
			font-weight: bold;
			font-size: 18pt;//字体大小

		}
		.button.active{
			background-color:rgba(252,165,71,0.67)!important ;
			box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
		}
	}
</style>