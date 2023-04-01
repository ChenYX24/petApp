<template>
	<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="pageContent">
			<view class="cameraInput">
				<image :src="imageSrc?imageSrc:'/static/IDCreate/picture&name/camera.png'" mode="aspectFit" class="camera" @tap="chooseImage"></image>
				<view class="inputBox">
					<input type="text" placeholder="请输入ta的名字" class="input" placeholder-style="color:#cea697;" v-model="inputValue"> 
					<image src="/static/IDCreate/picture&name/pen.png" mode="aspectFill"></image>
				</view>
			</view>
			
			<view class="buttonBox">
				<view class="button1">
					跳过,暂不确定
				</view>
				<view class="button2" :class="{ active: isActive }" @tap="nextpage">
					确认
				</view>
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
				Text:"照片和名字",
				placeholderText:"#cea697",
				inputValue: '',
				imageSrc: '',
				nickName:'',
				headerUrl:'',
				//直传接收数据
				host : '',
				signature : '',
				ossAccessKeyId : '',
				policy : '',
				key : '',
				securityToken : '' 
			};
		},
		 computed: {
		    isActive() {
		      return this.inputValue.trim() !== '';
		    }
		  },
		  onLoad() {
			// //#ifdef MP-WEIXIN
		 //  	this.login()
			// //#endif
		  },
		  methods:{
			  nextpage(){
				  // console.log(111)
				  // uni.request({
				  //     url: 'https://mock.apifox.cn/m1/2440038-0-default/pet/info/', //仅为示例，并非真实接口地址。
					 //  method:'GET',
				  //     data: {
						//   petId:2
				  //     },
				  //     header: {
				  //         Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiJidzJlaWtpVFczNjlZeFNQOFBHZXZBPT0iLCJleHAiOjE2NzkzMDAxNzh9.ZtgHvMvGtTaf-bWFxRRKoBl1oqNUMTtGDLHazBkQgPY' //自定义请求头信息
				  //     },
				  //     success: (res) => {
				  //         console.log(res.data);
				  //         console.log(res);
				  //     },
					 //  fail:(res)=>{
						//   console.log(666)
					 //  }
				  // });
				  if(this.isActive){
					  //#ifdef MP-WEIXIN
					  wx.setStorageSync('petName', this.inputValue);
					  //#endif
					  //#ifndef MP-WEIXIN
					  localStorage.setItem('petName', this.inputValue)
					  //#endif
					  uni.navigateTo({
					  	 url: `/pages/IDCreate/IDCreate2/IDCreate2`,
					  })
				  }
			  },
			  chooseImage() {
				  const that=this;
			        uni.chooseImage({
			          count: 1, // 最多选择的图片数量，此处为1
			          sizeType: ['compressed'], // 压缩图片
			          sourceType: ['album', 'camera'], // 可以从相册选择或拍照
					  
			          success:async (res) => {
			            this.imageSrc = res.tempFilePaths[0]
						//直传
						  try {
						    const signatureRes = await uni.request({
						      url: 'http://43.140.198.154:88/thirdParty/getUploadSignature/',
						      method: 'GET',
						      header: {
						        Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiJYQitLTUhncTVaZXRjTktsSE1mOEJnPT0iLCJleHAiOjE2Nzk5MTgyMDV9.6VI_tg8bjN06KEV3uFmTTU3kDxyy_INGeNjTWbsaMpY'
						      }
						    })
						    console.log(signatureRes)
						    this.host = signatureRes.data.data.host
						    this.signature = signatureRes.data.data.signature
						    this.ossAccessKeyId = signatureRes.data.data.ossAccessKeyId
						    this.policy = signatureRes.data.data.policy
						    this.securityToken = signatureRes.data.data.securityToken
						  } catch (err) {
						    console.log('请求签名失败', err)
						  };
						const filePath = res.tempFilePaths[0]; // 待上传文件的文件路径
						const date = new Date()
						const year = date.getFullYear() // 年份
						const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份（注意要加1，因为getMonth返回的是0-11）
						const day = date.getDate().toString().padStart(2, '0') // 当月的第几天
						const formattedDate = `${year}-${month}-${day}`
						const key = `${formattedDate}/xxx.jpg`;
						console.log(that.host+key);
						uni.uploadFile({
									url: that.host, //仅为示例，非真实的接口地址
									filePath: filePath,
									name: 'file',
									formData: {
										key,
										policy:that.policy,
										OSSAccessKeyId: that.ossAccessKeyId,
										signature:that.signature,
										// 'x-oss-security-token': this.securityToken // 使用STS签名时必传。
									  },
									success: (uploadFileRes) => {
										console.log(uploadFileRes);
										    if (res.statusCode === 204) {
										      console.log('上传成功');
										    }
										console.log(111);
									},
									fail:function(err){
										console.log(that.filePath)
									}
								});
			          }
			        })
			      },
				  
				  
				  getUserOpenId(userInfo){
				  	var that =this
				  	uni.login({
				  		provider:'weixin',
				  		success(loginAuth){
				  			var data={'code':loginAuth.code}
				  			var path='/user/getOpenId'
							console.log(loginAuth)
				  			// that.$http(path,data).then((response)=>{
				  			// 	userInfo['openid']=response
				  			// 	console.log(userInfo)
				  			// })
				  		}
				  	})
				  },
				  login(){
				  	var that=this
				  	uni.showModal({
				  		mask:true,
				  		title:'温馨提示',
				  		content:'授权微信登录后才能正常使用',
				  		success(res) {
				  			if(res.confirm){
				  				uni.getUserProfile({
				  					desc:'获取您的昵称、头像',
				  					success: (userRes) => {
				  						if(userRes.errMsg=='getUserProfile:ok'&&userRes.userInfo!=undefined)
				  						{
				  							var userInfo={
				  								avatarUrl:userRes.userInfo.avatarUrl,
				  								nickName:userRes.userInfo.nickName
				  							}
				  							//对页面变量赋值
				  							that.nickName=userRes.userInfo.nickName;
				  							that.headerUrl=userRes.userInfo.avatarUrl;
				  							//请求openid
				  							that.getUserOpenId(userInfo)
											console.log(that.nickName)
				  						}else{
				  							uni.showToast({
				  								icon:"none",
				  								title:"获取失败"
				  							})
				  						}
				  					},
				  					fail:error=>{}
				  				});
				  			}else if(res.cancel){}
				  		}
				  	})
				  }
		  }
	}
</script>

<style scoped lang="less">
	.IDBG{
		background-color: #fff4f2;
		height: 100%;
		  position: fixed;
		  top: 0;
		  right: 0;
		  bottom: 0;
		  left: 0;
	}
	.pageContent{
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: flex-start;	
		align-items: center;
		position: relative;
		top: 0rem;
		height: 100%;
	}
	.cameraInput{
		position: absolute;
		top: 3rem;
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
		margin-top: 3rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		align-items: center;
		width: 90vw;
		height: 8vh;
		background-color: #fdfcfa;
		border-radius: 3vw;
		/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
		box-shadow: 7px 11px 20px 1px rgb(249, 189, 125, 0.7);
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
	}
	

	.buttonBox{
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 10rem;
		.button1{
			height: 3rem;
			border: solid #f4d29f;
			box-shadow: 11px 15px 24px -9px rgb(249, 189, 125 , 70%);
			border-radius: 2rem;
			padding: 0.5rem;
			width: 15rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 12pt;
			color: rgba(206,166,151,0.67);
		}
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
			font-size: 18pt;

		}
		.button2.active{
			background-color:rgba(252,165,71,0.67)!important ;
			box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
		}
	}



</style>
