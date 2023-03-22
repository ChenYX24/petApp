<template>
	<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="pageContent">
			

		  <view class="selectBox">
			<view class="image-wrapper" @tap="selectLeft">
			  <image :src="leftImageUrl" class="image" />
			  <view class="text" :style="{color:leftSelected?'#fca547':'#9f9f9f'}">
			  	狗狗
			  </view>
			</view>
			<view class="image-wrapper" @tap="selectRight">
			  <image :src="rightImageUrl" class="image" />
			  <view class="text" :style="{color:rightSelected?'#fca547':'#9f9f9f'}">
			  	猫猫
			  </view>
			</view>
		  </view>
			<view class="buttonBox">
				<view class="button1">
					其它
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
				Text:"选择类型",
				isActive: false,
                leftSelected: false,
			    rightSelected: false,
			    leftImageUrl: '/static/IDCreate/selectDogOrCat/leftNS.png',
			    rightImageUrl: '/static/IDCreate/selectDogOrCat/rightNS.png',
			    thirdImageUrl: '/static/IDCreate/selectDogOrCat/leftS.png',
				fourthImageUrl: '/static/IDCreate/selectDogOrCat/rightS.png'
			};
		},
		  methods: {
			  nextpage(){
				  if(this.isActive){
					  
					  //狗
					  if(this.leftSelected)
					  {
						//#ifdef MP-WEIXIN
						wx.setStorageSync('breed', 1);
						//#endif
						//#ifndef MP-WEIXIN
						localStorage.setItem('breed', 1)
						//#endif
					  }
					  else if(this.rightSelected)
					  {
						//#ifdef MP-WEIXIN
						wx.setStorageSync('breed', 2);
						//#endif
						//#ifndef MP-WEIXIN
						localStorage.setItem('breed', 2)
						//#endif
					  }
					  else{
						//#ifdef MP-WEIXIN
						wx.setStorageSync('breed', 3);
						//#endif
						//#ifndef MP-WEIXIN
						localStorage.setItem('breed', 3)
						//#endif
					  }
					  uni.navigateTo({
					   url: `/pages/IDCreate/IDCreate3/IDCreate3`,
					  })  

				  }
			  },
		      selectLeft() {
		        this.leftSelected = !this.leftSelected;
		        this.rightSelected = false;
		        this.isActive = this.leftSelected || this.rightSelected;
		  
		        if (this.leftSelected) {
		          this.leftImageUrl = this.thirdImageUrl;
				  this.rightImageUrl = '/static/IDCreate/selectDogOrCat/rightNS.png';
		        } 
				else{
				  this.leftImageUrl='/static/IDCreate/selectDogOrCat/leftNS.png';
				}
		      },
		      selectRight() {
		        this.rightSelected = !this.rightSelected;
		        this.leftSelected = false;
		        this.isActive = this.leftSelected || this.rightSelected;
		  
		        if (this.rightSelected) {
		          this.rightImageUrl = this.fourthImageUrl;
				  this.leftImageUrl = '/static/IDCreate/selectDogOrCat/leftNS.png';
		        } 
				else{
				  this.rightImageUrl='/static/IDCreate/selectDogOrCat/rightNS.png';
				}
		      },
		    },
		  };
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
	
	.selectBox{
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 3rem;
		.image-wrapper{
			display: flex;
			flex-direction: column;
			align-content: center;
			justify-content: center;
			align-items: center;
			.image{
			width:40vw;
			height: 40vw;
			margin: 1rem;
			}
			.text{
				font-weight: bold;
			}
		}
	}
	.buttonBox{
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom:10rem;
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
