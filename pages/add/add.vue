<template>
  <view class="topBackground">
    <!-- 页面内容 -->
    <view class="Background"></view>
    <!-- 引用自定义tabbar组件 -->
    <tab-bar :activeTab="tab"></tab-bar>
	<add></add>
  </view>
</template>

<script>
	import add from "/components/add/add.vue"
	import TabBar from '/components//TabBar.vue';
	export default {
        components: {
			add,
			TabBar
		},
		data() {
			return {
				
			};
		},
		metaInfo: {
		  // 页面标题
		  title: 'add',
		},
	}
</script>

<style lang="less">
	
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

</style>
