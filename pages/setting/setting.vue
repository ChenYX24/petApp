<template>
	<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="pageContent">
			<view class="settingContainer">
				<view class="setBox">
					<view class="setText">
						消息通知
					</view>
					<view class="setD">
						
					</view>
				</view>
				<view class="setBox">
					<view class="setText">
						隐私
					</view>
					<view class="setD">
						
					</view>
				</view>
				<view class="setBox">
					<view class="setText">
						权限
					</view>
					<view class="setD">
						
					</view>
				</view>
				<view class="setBox">
					<view class="setText">
						语言
					</view>
					<view class="setD">
						
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import navBar from '/components//navBar/navBar.vue';
	export default {
		components: {
		  navBar,
		},
		data() {
			return {
				Text:"设置",
			};
		},
		  methods: {
			  
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
	.settingContainer{
		margin-top: 2rem;
		width: 332px;
		height: 199px;
		opacity: 1;
		border-radius: 25px;
		background: rgba(255, 253, 247, 1);
		box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);

	}
	.setD{
		
	}

</style>
