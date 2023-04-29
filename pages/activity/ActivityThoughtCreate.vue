<template>

	<view class="ActivityThoughtCreate" v-if="!isChooseLocation">
		<nav-bar :text="Text"></nav-bar>
		<view class="Separator S0" :style="S0Height">
			<view v-for="(item,index) in imageSrc" :key="index">
				<div>
					<image :src="item" class="image" mode="aspectFit"></image>
<!-- 						<image 
						src="../..
https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/planet/position.png" 
						@click="deleteImage(index)"
						class="imageDelete Location">
						</image> -->
				</div>	
			</view>
			<image src='https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/picture&name/camera.png' class="camera" v-if="imageSrc.length!==9" @tap="chooseImage"></image>
			
			<!-- <image class="ActivityImage"  src="https://img.js.design/assets/smartFill/img211164da6ef470.jpg" ></image> -->
		</view>
		
		<view class="Separator S1">
		<view class="inputBox">
		 <picker mode="selector" :range="activities" @change="onActivityChange" class="picker">
		   <view class="text">{{ currentActivity }}</view>
		 </picker>
		 <image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/planet/position.png" mode="aspectFill" ></image>
		</view>
		</view>
		
		<span class="Separator S2">	
			<input v-model="inputValue"
			:class="{ 'active': inputValue === ''}" 
			type="text" placeholder="记录下此刻的感受吧……" 
			placeholder-class="text" />
		</span>
		
		<view class="Location Separator" @tap="toChooseLocation">
			<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/planet/position.png" class="imageGPS Location"></image>
			<text class="text" >{{trueLocation}}</text>
		</view>
		
		<view class="buttonBox">
			<view class="button2" :class="{ active: isActive }" @tap="pushActivityThought">
				发布
			</view>
		</view>
	</view>
	<view v-if="isChooseLocation">
		<choose-location @chooseWhat="getTrueLocation"></choose-location>
	</view>

</template>
	
<script>
	import navBar from '/components//navBar/navBar.vue';
	import chooseLocation from '../../components/chooseLocation.vue';
	export default {
		components: {
		  navBar,
		  chooseLocation,
		},
		data() {
			return{	
				Text:'新建朋友圈',
				activities:[
						'coding',
						'coding',
						'coding'
					],
				currentActivity:'请选择你参加的活动',
				tureActivity:'xx',
				inputValue: '',
				imageSrc: [],
				isChooseLocation: false,
				trueLocation: '您所在位置',
				imageUrls: []
			}
		},
		mounted(){
				//钩子函数
				//在页面加载完成的时候，获取后端的活动
				this.activities=['code'];
				
		},
		methods:{
			 radioChange: function(evt) {
						for (let i = 0; i < this.items.length; i++) {
							if (this.items[i].value === evt.detail.value) {
								this.current = i; 
								break; 
							}
						}
			},
			showImage(index) {
			  // 点击图片触发的方法，可以在这里显示大图等操作
			},
			deleteImage(index){
				console.log(index);
			},
			chooseImage() {
			      uni.chooseImage({
			        count: 9, // 最多选择的图片数量，此处为1
			        sizeType: ['compressed'], // 压缩图片
			        sourceType: ['album', 'camera'], // 可以从相册选择或拍照
			        success: (res) => {
			          this.imageSrc.push(...res.tempFilePaths)
			        }
			      })
			},

			async pushActivityThought(){
				//上传活动任务，并返回首页   
				//先把用户已经确定的图片遍历上传到服务器中  将服务器回调的URL存在data中
				
				//获取签名数据
				
				async function request(url, data) {
					//异步请求的封装
				  return new Promise((resolve, reject) => {
					uni.request({
					  url,
					  data,
					  header:{
						  Authorization: uni.getStorageSync('token'),//请求的token
					  },
					  success: (res) => {
						resolve(res.data);
					  },
					  fail: (error) => {
						  //请求签名错误   提示用户服务器异常
						reject(error);
					  }
					})
				  })
				};
				

					var signatureRes= {};
					try{
						const a=await request('http://localhost:88/thirdParty/getUploadSignature/',{});
						signatureRes=a;
					}catch(err){
						console.error(err);
					}
					console.log(signatureRes);
					console.log(signatureRes.data);
					var host = signatureRes.data.host;
					var signature = signatureRes.data.signature;
					var ossAccessKeyId = signatureRes.data.ossAccessKeyId;
					var policy = signatureRes.data.policy;
					// var securityToken = signatureRes.data.data.securityToken;
					const filePath = this.imageSrc;
					const date = new Date();
					const year = date.getFullYear();
					const month = (date.getMonth() + 1).toString().padStart(2, "0");
					const day = date.getDate().toString().padStart(2, "0");
					const formattedDate = `${year}-${month}-${day}`;
					
					
					for (var i = 0; i < filePath.length; i++) {
						const key = `${formattedDate}/`+'nanoid'+'.jpg';
						console.log(host + key);
						uni.uploadFile({
						  url: host,
						  filePath: filePath[i],
						  name: "file",
						  formData: {
						    key,
						    policy: policy,
						    OSSAccessKeyId: ossAccessKeyId,
						    signature: signature
						    // 'x-oss-security-token': this.securityToken // 使用STS签名时必传。
						  },
						  success: (uploadFileRes) => {
							this.imageUrls.push(host + key);
						    console.log(uploadFileRes);
						    console.log(111);
						  },
						  fail: function(err) {
						    console.log(that.filePath);
						  }
						});
					}

				
				//再上传图片路径
				uni.request({
				    url: 'http://localhost:88/activityThought/save',
					method:'POST',
				    data: {
				        content: this.inputValue,
						data: this.imageUrls,
						location: this.trueLocation,
						activityName: this.currentActivity,
						userId: 1
				    },
					params: {interfaceState:'state'},
				    header: {
						"Content-Type": 'application/json',
						"Authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiIyMDFCTkVBUFEzcENreDVra0E1aTB3PT0iLCJleHAiOjE2ODI1ODExMDF9.0XkPv_JsFnT5ByDqoJJ9WTbwcD5TGTPeUC5ZYy77zBc'
				    },
				    success: (res) => {
				        console.log(res.data);
				    },
					  complete: () => {
						uni.navigateTo({
							 url: `/pages/notebook/notebook`,
						})
					  }
				});
			},
			onActivityChange(event){
				const activityIndex = event.detail.value
				this.currentActivity = this.activities[activityIndex]
				if (this.currentActivity !== '请选择你参加的活动') {
				    this.trueActivity = this.currentActivity
				  }
			},
			getTrueLocation(Location){
				console.log(Location);
				this.isChooseLocation=!this.isChooseLocation;
				this.trueLocation=Location;
			},
			toChooseLocation(){
				// uni.navigateTo({
				// 	 url: `/components/chooseLocation`,
				// })
				this.isChooseLocation=!this.isChooseLocation;
			},
		},
		computed: {
			isActive() {
			  return (this.inputValue.trim() !== '');
			},
			S0Height(){
				var startH=150;
				var Hresult=0;
				if(this.imageSrc.length===0){
					Hresult=startH;
				}
				Hresult=((this.imageSrc.length-1)/3)*100+startH;
				return{
					height: Hresult+'px',
				};
			}
		}
	}
</script>

<style lang="less">
	.ActivityThoughtCreate{
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		overflow: auto;//溢出会自动的变成滚动条
		width: 100vw;
		height: 100vh;
		opacity: 1;
		// border-radius: 46px;
		background: rgba(255, 253, 247, 1);
		box-shadow: 0px -10px 5px 0px rgba(247, 142, 72, 0.25);
	}
	.ActivityImage{
			left: 15px;
			top: 101px;
			width: 145px;
			height: 145px;
			opacity: 1;
			background: rgba(204, 204, 204, 1);
	}
	.Separator{
		 display: flex;
		 flex-direction: row;
		 justify-content: left;
		 // align-content: center;
		 
		  
		  // margin: 5px 0;
		  width: 93.3%;
		  border-bottom: 3px solid rgba(206, 166, 151, 0.23);   
	}
	.inputBox{
			margin-top: 0px;
			top: 2vh;
			display: flex;
			position: static;
			flex-direction: row;
			justify-content: center;
			align-content: center;
			align-items: center;
			width: 90vw;
			height: 4vh;
			background-color: #fdfcfa;
			border-radius: 3vw;
			/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
			// box-shadow: 7px 11px 20px 1px rgb(249, 189, 125, 0.7);
			.input{
				width: 80%;
				height: 80%;
				color: #cea697;
			}
			image{
				width: 2rem;
				height: 2rem;
				z-index: 99;
			}
	
			.picker-text {
	
			  font-size: 16px;
			  color: #cea697;
			}
			.picker{
				display: flex;
				flex-direction: row;
				align-content: center;
				justify-content: flex-start;
				align-items: center;
				width: 80%;
				height: 80%;
			}
	}
	.S0{
		align-items: center;
		display: grid;
		position: relative;
		grid-template-columns: repeat(3,30vw);
		place-items: center;
		gap: 5px;
	}
	.S1{
		align-items: center;
		height: 46px;
	}
	.S2{
		align-items: flex-start;
		height: 225px;
	}
	.delete-icon{
	  position: absolute;
	  top: 0;
	  right: 0;
	  cursor: pointer;
	}


	.textActivity{
		font-size: 20px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 0px;
		color: rgba(206, 166, 151, 0.5);
		text-align: left;
		vertical-align: top;
	}
	.text{
		font-size: 18px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 35.6px;
		color: rgba(206, 166, 151, 0.5);
		text-align: left;
		vertical-align: top;
		align-self: flex-end;
		
	}
	
	.buttonBox{
			display: flex;
			flex-direction: column;
			align-content: center;//交叉轴方向上居中对齐
			justify-content: center;//水平方向上居中对齐
			align-items: center;
			position: static;
			bottom: 10rem;
	
			.button2{
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
			.button2.active{
				background-color:rgba(252,165,71,0.67)!important ;
				box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
			}
	}
	.camera{
		width: 100px;
		height: 100px;
	}
	.image{
		width: 100px;
		height: 100px;
		z-index: 1;
	}
	.imageGPS{
		width: 36px;
		height: 36px;
		opacity: 1;
		z-index: 2;
	}
	.imageDelete{
		width: 36px;
		height: 36px;
		opacity: 1;
		z-index: 2;
	}
	
	.Location{
		display: flex;
		flex-direction: row;
		justify-content: left;
	}
</style>
