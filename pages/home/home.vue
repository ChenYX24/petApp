<template>
  <view class="topBackground">
    <!-- 页面内容 -->
    <view class="Background">主页</view>
    <!-- 引用自定义tabbar组件 -->
    <tab-bar :activeTab="tab"></tab-bar>
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
  		tab: ''
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
    box-shadow: 0px -20px 10px -4px rgb(229 163 119 / 50%);
}
.topBackground{
    width: 100vw;
    height: 100vh;
    background-color: #ffb776;
}
</style>