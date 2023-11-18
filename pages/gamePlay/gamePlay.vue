<template>
	<view class="IDBG">
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
		<view class="pageContent">
		  <view >
			<web-view :fullscreen="false" :src="fullUrl" style="height:110vh;width:96vw"></web-view>
		  </view>	
		</view>
		<view class="block"></view>		
	</view>
</template>

<script>
	import navBar from '/components//navBar/navBar.vue';
	export default {
		components: {
		  navBar,
		},
		onLoad: function (options) {
			this.url=options.url
		},
		data() {//初始化数据
			return {
				Text:"小游戏",
				url: 'sheep',
				Nav:'/pages/home/home',
			};
		},
		computed: {
		  fullUrl() {
			return `/static/game/${this.url}.html`;
		  }
		},
		  methods:{
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
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        top: 0rem;
        height: 100%;
    }
    .block{
        background-color: #fff4f2;
        width: 100vw;
        height: 5vw;
        position: absolute; 
        bottom: 0;
        left: 0;
        z-index: 10; 
    }

</style>
