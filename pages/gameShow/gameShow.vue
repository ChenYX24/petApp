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
				imageSrcArr: ["/static/gameimg/sheep.png","/static/gameimg/catDrag.png","/static/gameimg/wheel.png","/static/gameimg/find.png","/static/gameimg/drogDump.png","/static/gameimg/clickMatch.png","/static/gameimg/catchSheep.png","/static/gameimg/puzzle.png"],
				activityThoughtArr:[],
				tag:["开枪扫羊","猫猫拖拽","大转盘","找猫猫","狗狗跳一跳","猫猫点消","羊羊快跑","猫猫拼图"],
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
	height: 96%;
	overflow-y: scroll; /* 设置垂直滚动条 */
	}
	.gridBox{
		margin-top: 1vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
	}
</style>
