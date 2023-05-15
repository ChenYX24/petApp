<template>

    <!-- 页面内容 -->
 <view class="Background">
	 
    <view class="flex-col group space-y-27" :style="{marginTop:navH + 'px' }">
        <view class="flex-row items-center">
          <image class="image" src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/location.png"/>
          <text class="text">{{city}}</text>
        </view>
        <view class="flex-col justify-start items-end search">
			<input type="text" />
          <image mode="aspectFill" class="image_2" src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/search.png"/>
        </view>
    </view>
	
	<view class="flex-col group_2 space-y-10">
	  <image class="image_3" src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/helloanimal.png"/>
	</view>
	<!--四个图标-->
	<view class=" space-y-14">
	<view class="flex-row equal-division space-x-8">
	  <view class="flex-col items-center equal-division-item space-y-8">
	    <image class="image_4" src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/party.png"/>
	    <text class="font_1">派对</text>
	  </view>
	  <view class="flex-col items-center equal-division-item space-y-8">
	    <image
	      class="image_4"
	      src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/outdoors.png"
	    />
	    <text class="font_1">户外</text>
	  </view>
	  <view class="flex-col items-center equal-division-item space-y-8">
	    <image
	      class="image_4"
	      src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/exercise.png"
	    />
	    <text class="font_1">运动</text>
	  </view>
	  <view class="flex-col items-center equal-division-item space-y-8">
	    <image
	      class="image_4"
	      src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/travel.png"
	    />
	    <text class="font_1">旅行</text>
	  </view>
	</view>
	</view>
	
	<view class="gridBox">
		<view v-for="(imagesrc, index) in imageSrcArr" :key="index">
		  <myActivity :imageSrc="imagesrc" :tag="tag"></myActivity>
		</view>
		<myActivity :imageSrc="src1" :tag="tag"></myActivity>
		<myActivity :imageSrc="src" :tag="tag"></myActivity>
		<myActivity :imageSrc="src"></myActivity>
		<myActivity :imageSrc="src"></myActivity>
		<myActivity :imageSrc="src" :tag="tag"></myActivity>
		<myActivity :imageSrc="src"></myActivity>
		<myActivity :imageSrc="src"></myActivity>
		<myActivity :imageSrc="src"></myActivity>
		<myActivity :imageSrc="src"></myActivity>
	</view>
	<!-- 引用自定义tabbar组件 -->
	<tab-bar :activeTab="tab"></tab-bar>
	</view>



</template>

<script>
import TabBar from '/components//TabBar.vue';
import myActivity from '/components/myActivity/myActivity.vue'
export default {
  components: {
    TabBar,
	myActivity
  },
  onLoad: function (options) {
	this.tab=options.tab;
	this.city=uni.getStorageSync('city')
	if(!this.city){
		this.city="未知"
	}
  },
  mounted() {
      // 获取存储的图像数组第一个元素
        //#ifdef MP-WEIXIN
        const firstImage = JSON.parse(wx.getStorageSync('firstImage'));
        //#endif
      
        //#ifndef MP-WEIXIN
        const firstImage = JSON.parse(localStorage.getItem('firstImage'));
        //#endif
      
        // 将第一个元素添加到数组中
        this.imageSrcArr.push(firstImage);
      
        // 存储图像数组到本地
        //#ifdef MP-WEIXIN
        wx.setStorageSync('imageSrcArr', JSON.stringify(this.imageSrcArr));
        //#endif
      
        //#ifndef MP-WEIXIN
        localStorage.setItem('imageSrcArr', JSON.stringify(this.imageSrcArr));
        //#endif
    },
	onShow() {
	    // 页面显示时重新读取本地存储中的数据
	    //#ifdef MP-WEIXIN
	    const imageSrcArr = JSON.parse(wx.getStorageSync('imageSrcArr'));
	    //#endif
	
	    //#ifndef MP-WEIXIN
	    const imageSrcArr = JSON.parse(localStorage.getItem('imageSrcArr'));
	    //#endif
	
	    this.imageSrcArr = imageSrcArr || [];
	  },
  data() {
  	return {
  		tab: '',
		src:"https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/dog.png",
		src1:"/static//activity/柴犬.jpg",
		imageSrcArr: [],
		tag:["春日派对","夏日对派"],
		navH:null,
		city:"未知",
  	}
  },
  created() {
  	//#ifdef MP-WEIXIN
  	//胶囊位置
  	const menuButtonInfo=uni.getMenuButtonBoundingClientRect()
  	this.navH=menuButtonInfo.top
  	//#endif
  }
};
</script>

<style scoped lang="less">

.Background{

    background-color: #fffdf7;
    position: relative;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
	box-shadow: 0px -20px 10px -8px rgba(247,142,72,0.5);
}
.gridBox{
	margin-top: 1vh;
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
}
.group {
	margin-top: 3vh;
    padding: 0 58rpx;
  }
  .space-y-27 > view:not(:first-child),
  .space-y-27 > text:not(:first-child),
  .space-y-27 > image:not(:first-child) {
    margin-top: 54rpx;
  }
  .image {
    width: 54rpx;
    height: 56rpx;
  }
  .text {
    color: #cea697;
    font-size: 36rpx;
    font-family: HappyZcool;
    line-height: 31rpx;
  }
  .search {
    padding: 28rpx 0;
    background-color: #ffffff;
    border-radius: 24rpx;
    box-shadow: 10rpx 10rpx 24rpx #edd8c880;
	display: flex;
	 justify-content: flex-end;
	 input{
		 width: 80%;
		 height: 80%;
		 color: #cea697;
	 }
  }
  .image_2 {
    margin-right: 30rpx;
    width: 40rpx;
    height: 40rpx;
  }
  .group_2 {
    margin-top: 54rpx;
  }
  .space-y-10 > view:not(:first-child),
  .space-y-10 > text:not(:first-child),
  .space-y-10 > image:not(:first-child) {
    margin-top: 20rpx;
  }
  .image_3 {
    margin: 0 38rpx;
    border-radius: 56rpx;
    width: 674rpx;
    height: 286rpx;
  }
  .space-y-14 > view:not(:first-child),
  .space-y-14 > text:not(:first-child),
  .space-y-14 > image:not(:first-child) {
    margin-top: 28rpx;
  }
  .equal-division {
    padding: 0 22rpx;
	    display: flex;
	    flex-direction: row;
  }
  .space-x-8 > view:not(:first-child),
  .space-x-8 > text:not(:first-child),
  .space-x-8 > image:not(:first-child) {
    margin-left: 16rpx;
  }
  .equal-division-item {
    flex: 1 1 176rpx;
    padding: 8rpx 0;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
  }
  .space-y-8 > view:not(:first-child),
  .space-y-8 > text:not(:first-child),
  .space-y-8 > image:not(:first-child) {
    margin-top: 16rpx;
	display: flex;
	 flex-direction: column;
  }
  .image_4 {
    width: 128rpx;
    height: 128rpx;
  }
  .font_1 {
    font-size: 32rpx;
    font-family: HappyZcool;
    line-height: 27rpx;
    color: #cea697;
  }
  .flex-row{
	      display: flex;
	      align-content: center;
	      align-items: center;
  }
</style>