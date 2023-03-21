<template>
	<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="pageContent">
			<image src="/static/IDCreate/picture&name/camera.png" mode="aspectFit" class="camera"></image>
			<view class="inputBox">
				<input type="text" placeholder="请输入ta的名字" class="input" placeholder-style="color:#cea697;"> 
				<image src="/static/IDCreate/picture&name/pen.png" mode="aspectFill"></image>
			</view>

			<view class="buttonBox">
				<view class="button1">
					跳过,暂不确定
				</view>
				<view class="button2">
					确认
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
				Text:"照片和名字",
				placeholderText:"#cea697"
			};
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
		align-content: center;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 3rem;
	}
	.camera{
		width: 33vw;
		height: 33vw;
	}
	.inputBox{
		margin-top: 3rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		align-items: center;
		width: 90vw;
		height: 8vh;
		background-color: #fdfcfa;
		border-radius: 3vw;
		/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
		box-shadow: 7px 11px 20px 1px rgb(249, 189, 125, 0.7);
		.input{
			width: 80%;
			height: 80%;
			color: #cea697;
		}

		image{
			width: 2rem;
			height: 2rem;
			z-index: 99;
		}
	}
	

	.buttonBox{
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 15rem;
		.button1{
			height: fit-content;
			border: solid rgb(244,210,159);
			box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
			border-radius: 1rem;
			padding: 0.5rem;
			width: 10rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.button2{
			height: fit-content;
			background-color:rgb(252,165,71) ;
			box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
			border-radius: 1rem;
			padding: 0.5rem;
			width: 10rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 1rem;
		}
	}



</style>
