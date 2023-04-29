<template>
	<view class="IDBG">
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
		<view class="pageContent">
			<view class="settingContainer">
				<view class="setBox">
					<view class="setText">
						消息通知
					</view>
				<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/setting/D.png" mode="aspectFit" class="setD"></image>
				</view>
				<view class="setBox">
					<view class="setText">
						隐私
					</view>
				<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/setting/D.png" mode="aspectFit" class="setD"></image>
				</view>
				<view class="setBox">
					<view class="setText">
						权限
					</view>
				<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/setting/D.png" mode="aspectFit" class="setD"></image>
				</view>
				<view class="setBox" @tap="goLanguage">
					<view class="setText">
						语言
					</view>
				<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/setting/D.png" mode="aspectFit" class="setD"></image>
				</view>
			</view>
			<view class="buttonGroup">
				<view class="button">
					切换账号
				</view>
				<view class="button">
					退出登陆
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
				Nav:"/pages/home/home"
			};
		},
		  methods: {
			  goLanguage(){
				  uni.navigateTo({
				  	url:'/pages/settingLanguage/settingLanguage'
				  })
			  }
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
		width: 80vw;
		// height: 199px;
		opacity: 1;
		border-radius: 25px;
		background: rgba(255, 253, 247, 1);
		box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);

	}
	.setD{
		width: 25px;
		height: 25px;
		transform: rotate(180deg);
	}
	.setBox{
		    display: flex;
		    flex-direction: row;
		    justify-content: space-between;
		    align-items: center;
		    padding-bottom: 5px;
			margin: 15px;
	}
	.setBox:not(:last-child){
		border-bottom: 2px solid rgba(206, 166, 151, 0.15);
		
	}
	.setBox:last-child{
		margin-bottom: 12px!important;
	}
	.setText{
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0px;
		line-height: 26.06px;
		color: rgba(230, 209, 198, 1);
		text-align: left;
		vertical-align: top;
		margin-left: 5px;
	}
	.button{
    width: 332px;
    height: 75px;
    opacity: 1;
    border-radius: 25px;
    background: #fffdf7;
    box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
    font-size: 20px;
    font-weight: 700;
    color: #e6d1c6;
    text-align: center;
    align-items: center;
    display: flex;
	justify-content: center;		
	}
	.button:last-child
	{
		margin-top: 1rem;
	}
	.buttonGroup
	{
		position: absolute;
		bottom:10rem;
	}

</style>
