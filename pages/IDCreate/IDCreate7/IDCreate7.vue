<template>
	<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="pageContent" >
			<idCard :dataList="dataOb"></idCard>
			<view class="buttonBox">
			<view class="button2 active" @tap="share">
				分享
			</view>
			<view class="button2 active" @tap="nextpage">
				领取
			</view>
			</view>

		</view>

	</view>
</template>

<script>
	import navBar from '/components//navBar/navBar.vue';
	import idCard from '/components//IDCard/IDCard.vue';
	export default {
		components: {
		  navBar,
		  idCard
		},
		onLoad: function () {
			this.name="姓名 "+uni.getStorageSync('petName')
			this.breed=uni.getStorageSync('breed')
			this.sex=uni.getStorageSync('sex')
			this.city=uni.getStorageSync('city')
			let birthday=new Date(uni.getStorageSync('birthday'))
			this.dataOb={'name':this.name,'breed':this.breed,'sex':this.sex,'city':this.city,'birthday':birthday,'Image':this.Image}
		},
		data() {
			return {
				Text:"创建完成",
				name:"",
				breed:"",
				sex:"",
				birthdayY:"",
				birthdayM:"",
				birthdayD:"",
				city:"未知",
				Image:"/static/home/cat.png",
				ImgBackground:"",
				textColor:"",
				dataOb:{},
				idCardList:[],
			};
		},
		  methods: {
			  nextpage(){
				  let temp=uni.getStorageSync('idCardList')
				  if(!temp)
				  {
					  this.idCardList=[]
				  }
				  else
				  {
					  this.idCardList=temp;
					  this.idCardList.push(this.dataOb)
				  }
				
				  //#ifdef MP-WEIXIN
				  wx.setStorageSync('idCardList', this.idCardList);
				  //#endif
				  //#ifndef MP-WEIXIN
				  localStorage.setItem('idCardList', this.idCardList);
				  //#endif
					  uni.navigateTo({
					   url: `/pages/home/home`,
					  })  
			  },
			  share(){
				  // uni.share({
				  //     provider: 'weixin',
				  //     scene: 'WXSceneSession',  // 分享到聊天界面
				  //     type: 0,
				  //     title: '测试分享的标题',
				  //     summary: '测试分享的总结',
				  //     href: 'http://www.example.com',
				  //     imageUrl: 'http://www.example.com/image.png',
				  //     success: function (res) {
				  //         console.log('success:' + JSON.stringify(res));
				  //     },
				  //     fail: function (err) {
				  //         console.log('fail:' + JSON.stringify(err));
				  //     }
				  // });
			  },
			 padZero(num) {
			    return num < 10 ? '0' + num : num;
			  }
			},
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
		position: relative;
		top: 0rem;
		height: 100%;
		    display: flex;
		    justify-content: center;
	}
	
	.buttonBox{
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: absolute;
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
			font-size: 18pt;
	
		}
		.button2.active{
			background-color:rgba(252,165,71,0.67)!important ;
			box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
		}
	}

</style>
