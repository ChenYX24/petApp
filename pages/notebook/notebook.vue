<template>
  <view class="topBackground">
	  <view class="text">
		  <text class="text1">XXX的提醒事项</text><br/>
		  <text class="text2">不要忘记哦~</text>
	  </view>
    <!-- 页面内容 -->
    <scroll-view class="Background" scroll-y="true">
		<view class="scroll-view-content">
		<view class="tips"> 
		  <text class="tipstext1">驱虫，就是今天</text>
		</view>
		<view class="tips">
		  <text class="tipstext1">2天后</text>
		</view>
		<view class="tips">
		  <text class="tipstext1">3天后</text>
		</view>
		<view class="tips">
		  <text class="tipstext1">4天后</text>
		</view>
		<view class="tips">
		  <text class="tipstext1">5天后</text>
		</view>
		<view class="tips">
		  <text class="tipstext1">6天后</text>
		</view>
		</view>
	</scroll-view>
    <!-- 引用自定义tabbar组件 -->
    <tab-bar :activeTab="tab"></tab-bar>
  </view>
</template>

<script>
import TabBar from '/components//TabBar.vue';
import  tip from '/components//tip.vue';
export default {
  components: {
    TabBar,
	tip,
  },
  onLoad: function (options) {
	this.tab=options.tab;
  },
  data() {
  	return {
  		tab: ''
  	}
  },

};
</script>

<style scoped lang="less">
.Background{
	width: 100%;
    height: 80vh;
    background-color: #fffdf7;
    position: relative;
	display: flex;

    top: 14vh;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
	box-shadow: 0px -20px 10px -8px rgba(247,142,72,0.5);
    flex-direction: column;
	  justify-content: center;
    align-items: center;
}
.scroll-view-content {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
}
.tips{
	margin: 0.7rem;
	width: 85%;
	height: 20vh;
	border-radius: 1.2rem;
	background-color: #fff3cd;
	display: flex;
	position: relative;
	flex-direction: row;
	align-content: center;
    align-items: flex-start;
	justify-content: flex-start;
	top:2rem;
	box-shadow: 7px 11px 20px 1px rgb(249, 189, 125, 0.7);
	color: rgb(127, 112, 75) ;
	font-size: 15pt;
	
}
.tips:not(:first-of-type) {
  color: rgb(166, 146, 96) ;
}
.tipstext1{
	font-weight: bold;
	margin-left: 2rem;
	margin-top: 1rem;
}
.text{
	font-weight: bold;
	position: relative;
	top: 8vh;
	color: #fffdf7;
	margin-left: 1rem;
	.text1{
			font-size: 17pt;//字体
	}
}

.topBackground{
    width: 100vw;
    height: 100vh;
    background-color: #ffb776;

}
</style>