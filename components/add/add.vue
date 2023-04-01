<template>
	<view class="addContainer" :class="{show:isShow}">
		<view class="imgAndText">
			<image src="/static/add//addPetIDCard.png" mode="widthFix" class="addImg" @tap="IDCreate"></image>
			<text class="Text">新建宠物身份证</text>
		</view>
		<view class="imgAndText">
			<image src="/static/add//addNotebook.png" mode="widthFix" class="addImg imgNote"></image>
			<text class="Text notbookT">新建备忘事件</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"add",
		data() {
			return {
				
			};
		},
		props: {
			isShow: {
				type: Boolean,
				default: false,
			},
		},
		methods: {
			IDCreate() {
				this.$emit('updateAdd');
				uni.navigateTo({
					 url: `/pages/IDCreate/IDCreate/IDCreate`,
				})
			}
		},
	}
</script>

<style lang="less">
	.addContainer{
		background-color: rgba(255, 255, 255, 0.3);
		position: fixed;
		display: flex;
		bottom: -100%;
		left: 0;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-content: center;
		height: 100%;
		// animation: slide-up 0.5s ease-in-out forwards;
		transition: bottom 0.5s ease-in-out;
		.imgAndText{
			box-shadow: 5px 7px 8px -1px rgba(239,219,208,0.5);
			height: 40vw;
			width: 40vw;
			background-color: #fcceb5;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 5vw;
			border-radius: 10%;
			.addImg{
				height: 20vw;
				width: 20vw;
			}
			.addImg.imgNote{
				margin-bottom: 0.5rem;
			}
			.Text
			{
				color: #ffffff;
				font-family: SimHei;
			}
		}
	}
	.addContainer.show{
		bottom: 0;
	}
	// @keyframes slide-up {
	//   0% {
	//     bottom: -200px;
	//     opacity: 0;
	//   }
	//   100% {
	//     bottom: 0;
	//     opacity: 1;
	//   }
	// }
</style>