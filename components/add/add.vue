<template>
	<view class="addContainer" :class="{show:isShow}">
		<view class="imgAndText">
			<image src="/static/add/addNotebook.png" mode="widthFix" class="addImg imgNote" @tap="addNote"></image>
			<text class="Text notbookT">新建备忘事件</text>
		</view>
		<view class="imgAndText">
			<image src="/static/add/addActivityNote.png" mode="widthFix" class="addImg"  @tap="ActivityThoughtCreate"></image>
			<text class="Text notbookT">新建活动笔记</text>
		</view>
		<view class="imgAndText">
			<image src="/static/add/addPetIDCard.png" mode="widthFix" class="addImg" @tap="IDCreate"></image>
			<text class="Text">新建宠物身份证</text>
		</view>
		<view class="imgAndText">
			<image src="/static/add/addPetIcon.png" mode="widthFix" class="addImg face imgNote"></image>
			<text class="Text notbookT">新建萌宠表情</text>
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
			},
			addNote(){
				this.$emit('updateAdd');
				uni.navigateTo({
					 url: `/pages/notebook/notebookForm`,
				})
			},
			ActivityThoughtCreate() {
				this.$emit('updateAdd');
				uni.navigateTo({
					 url: `/pages/activity/ActivityThoughtCreate`,
				})
			}
		},
	}
</script>

<style lang="less">
	.addContainer{
	z-index: 998;
	background-color: rgba(255, 255, 255, 0.3);
	position: fixed;
	display: grid;
	grid-template-columns: repeat(2, 200px);
	grid-template-rows: repeat(2, 200px);

	bottom: -100%;
	left: 0;
	right: 0;
	height: 100%;		
	// animation: slide-up 0.5s ease-in-out forwards;
	transition: bottom 0.5s ease-in-out;
	align-items: center;
	justify-items: center;
	justify-content: center;
	align-content: center;
		.imgAndText{
			box-shadow: 5px 7px 8px -1px rgba(239,219,208,0.5);
			height: 40vw;
			width: 40vw;
			background-color: #fcceb5;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 3vw;
			border-radius: 10%;
			.addImg{
				height: 15vw;
				width: 15vw;
			}
			.addImg.imgNote{
				margin-bottom: 0.5rem;
			}
			.addImg.face{
				height: 13vw;
				width: 13vw;
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