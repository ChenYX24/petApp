<template>
	<view class="IDBG">
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
		<view class="pageContent">
			<view class="gridBox">
<!-- 				<view v-for="(imagesrc, index) in imageSrcArr" :key="index">
				  <myActivity :imageSrc="imagesrc" :tag="tag"></myActivity>
				  
				</view> -->
				<view v-for="(imagesrc, index) in imageSrcArr" :key="index">
				          <myGame :imageSrc="imageSrcArr[index]" :tag="tag[index]" :index=index></myGame>
				</view>
				<view v-for="(imagesrc, index) in imageSrcArr" :key="index">
				          <myGame :imageSrc="imageSrcArr[index]" :tag="tag[index]" :index=index></myGame>
				</view>
				<view v-for="(imagesrc, index) in imageSrcArr" :key="index">
				          <myGame :imageSrc="imageSrcArr[index]" :tag="tag[index]" :index=index></myGame>
				</view>
			


			</view>
		</view>

	</view>
</template>

<script>
	import navBar from '/components//navBar/navBar.vue';
	import myActivity from '/components/myActivity/myActivity.vue';
	import myGame from '/components/myGame.vue';
	export default {
		components: {
		  navBar,
		  myActivity,
		  myGame
		},
		data() {
			return {
				Text:"返回HOME",
				
				Nav:"/pages/home/home?tab=home",
				imageSrcArr: ["/static/gameimg/猫咪拖拽.png","/static/gameimg/猫咪拖拽.png","/static/gameimg/猫咪拖拽.png"],
				activityThoughtArr:[],
				tag:["开枪扫羊","纸牌接龙","猫猫拖拽"],
			};
		},
		onLoad(){
		},
		mounted() {
		  
		},
		computed: {
		},
		methods: {
			
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
	align-items: center;
	position: relative;
	top: 0rem;
	height: 100%;
	overflow-y: scroll; /* 设置垂直滚动条 */
	}
	.gridBox{
		margin-top: 1vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
	}
	


	
	 
</style>
