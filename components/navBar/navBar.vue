<template>
	<view class="navBar">
		<view class="status_bar" :style="{height:navH + 'px' }">
		            <!-- 这里是状态栏 -->
		</view>
		<view class="navFixed" :style="{top:navH + 'px' }">
			<view class="nav">
			<!-- &lt;代替‘<’ -->
			<view class="back" @click="backClick()">
				{{back}}
			</view>
			<view class="text">
				{{text}}
			</view>
			</view>
		</view>
		
		<view style="height: 2rem;">
		</view>
	</view>
	
	
</template>

<script>
	export default {
		name:"navBar",
   props: {
      text: {
        type: String,
      }
    },
	data() {
		return {
			back: "<",
			navH:null
		}
	},
	methods: {
		backClick() {
			uni.navigateBack({
				delta: 1
			});
		}
	},
	created() {
		//#ifdef MP-WEIXIN
		//胶囊位置
		const menuButtonInfo=uni.getMenuButtonBoundingClientRect()
		this.navH=menuButtonInfo.top
		//#endif
	}
	}
</script>

<style >
	.navFixed{
		position: fixed;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 2rem;
		
	}	
	.nav{
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		align-content: center;
		justify-content: flex-start;
	}
	.status_bar {
        width: 100%;
    }
	.back{
		font-size: 20px;
		margin-right: 0.5rem;
		color: #cea697;
	    font-weight: bolder;
		opacity: 0.7;
	}
	.text{
		font-size: 20px;
		color: #cea697;
		opacity: 0.7;
	}



</style>