<template>
  <view class="topBackground">
    <!-- 页面内容 -->
    <view class="Background">
		<view class="inputBox">
			<input type="text" placeholder="请输入ta的名字" class="input" placeholder-style="color:#cea697;" v-model="inputValue">
			<image src="/static/IDCreate/picture&name/pen.png" mode="aspectFill" ></image>
		</view>
		<view class="button2" :class="{ active: isActive }" @tap="nextpage">
			<image src="/static/IDCreate/picture&name/cat.png" mode="aspectFill" ></image>
			点击加入{{trueProvince}}星球
			<image src="/static/IDCreate/picture&name/dog.png" mode="aspectFill" ></image>
		</view>
		<view class="advantage">
			<text>加入星球的四点好处~</text>
			xxxxxxxxxxxxxxxxxxxxxx
		</view>
	</view>
    <!-- 引用自定义tabbar组件 -->
    <tab-bar :activeTab="tab"></tab-bar><!--将 activeTab 绑定到 Vue 实例中的 tab 变量上，tab为true时-->
  </view>
</template>

<script>
import TabBar from '/components//TabBar.vue';

export default {
  components: {
    TabBar,
  },
  onLoad: function (options) {
	this.tab=options.tab;

  },

  data() {
  	return {
  		tab: '',
		inputValue: '',
		trueProvince:'xx'
  	}
  },
		 computed: {
		    isActive() {
		      return this.inputValue.trim() !== '';
		    }
		  }
};
</script>

<style scoped lang="less">
.planet {
  position: relative;
  padding-bottom: 100px;
}
.Background{
	display: flex;
	
	width: 100%;
    height: 80vh;
    background-color: #fffdf7;
    position: relative;
    top: 20vh;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0px -20px 10px -4px rgb(229 163 119 / 50%);
    flex-direction: column;
       align-items: center;
}
.topBackground{
    width: 100vw;
    height: 100vh;
    background-color: #ffb776;
}
.advantage{
	display: flex;
	
	width: 90%;
    height: 80vh;
    background-color: #efdbd0;
    position: relative;
    top: 5.5vh;
	color: #cea697;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0px -20px 10px -4px rgb(239 219 208 / 50%);
    flex-direction: column;
       align-items: center;
}
.inputBox{
		margin-top: 0px;
		top: 2vh;
		display: flex;
		position: relative;
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
.button2{
	        margin-top: 0px;
		    top: 3vh;
		    width: 85vw;
		    height: 8vh;
			background-color:rgba(221,221,221,1) ;
			border-radius: 5vw;
			padding: 0.5rem;
            position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 1rem;
			color: #cea697;
			font-weight: bold;
			font-size: 13pt;//字体
		image{
			width: 5rem;
			height: 5rem;
			z-index: 99;
		}
		}
.button2.active{
	height: 55vh!important;
	background-color:rgba(252,206,181,0.67)!important ;
	box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
}

</style>