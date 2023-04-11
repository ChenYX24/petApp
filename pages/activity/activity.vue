<template>
  <view class="topBackground">
    <!-- 页面内容 -->
    <view class="Background">活动
	<view class="gridBox">
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
  },
  data() {
  	return {
  		tab: '',
		src:"https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/642d276b5a7e3f0310451545/642d27bc99e5b100119e7a73/16806809026616325675.png",
		tag:["春日派对","夏日对派"]
  	}
  },
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
.gridBox{
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
}
.topBackground{
    width: 100vw;
    height: 100vh;
    background-color: #ffb776;
}
</style>