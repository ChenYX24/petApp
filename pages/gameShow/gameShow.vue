<template>
	<view class="IDBG">
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
		<view class="pageContent">
			<view class="gridBox">
<!-- 				<view v-for="(imagesrc, index) in imageSrcArr" :key="index">
				  <myActivity :imageSrc="imagesrc" :tag="tag"></myActivity>
				  
				</view> -->
				<myActivity :imageSrc="src1" :tag="tag"></myActivity>
				<myActivity :imageSrc="src" :tag="tag"></myActivity>
				<myActivity :imageSrc="src"></myActivity>
				<myActivity :imageSrc="src"></myActivity>
				<myActivity :imageSrc="src" :tag="tag"></myActivity>
				<myActivity :imageSrc="src"></myActivity>
				<myActivity :imageSrc="src1" :tag="tag"></myActivity>
				<myActivity :imageSrc="src" :tag="tag"></myActivity>
				<myActivity :imageSrc="src"></myActivity>
				<myActivity :imageSrc="src"></myActivity>
				<myActivity :imageSrc="src" :tag="tag"></myActivity>
				<myActivity :imageSrc="src"></myActivity>
			</view>
		</view>

	</view>
</template>

<script>
	import navBar from '/components//navBar/navBar.vue';
	import myActivity from '/components/myActivity/myActivity.vue'
	export default {
		components: {
		  navBar,
		  myActivity,
		},
		data() {
			return {
				Text:"返回HOME",
				
				Nav:"/pages/home/home?tab=home",
				imageSrcArr: [],
				activityThoughtArr:[],
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
	padding-top: 10%;
	}
	.gridBox{
		margin-top: 1vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
	}
	


	
	 
</style>
