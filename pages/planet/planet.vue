<template>
  <view class="topBackground">
    <!-- 页面内容 -->
    <view class="Background">
		<view class="inputBox">
         <picker mode="selector" :range="provinces" @change="onProvinceChange" class="picker">
           <view class="picker-text">{{ currentProvince }}</view>
         </picker>
		 <image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/planet/position.png" mode="aspectFill" ></image>
		</view>
		<view class="button2" :class="{ active: isActive }" @tap="canTap">
			<view class="catAndDog">
				<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/planet/cat.png" mode="aspectFill" class="image"></image>
			</view>
			<view class="page" :class="{ active: isActive }">
				<text v-if="!isActive" >
					点击加入{{trueProvince}}星球
				</text>
				<text v-if="isActive">扫描二维码</text><br />
				<text v-if="isActive">立即加入{{trueProvince}}星球~</text>
				<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/planet/code.jpg" mode="aspectFill" v-if="isActive"  class="code"> </image>
			</view>

			<view class="catAndDog">
				<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/planet/dog.png" mode="aspectFill" class="image"></image>
			</view>
		</view>
		
		<view class="advantage">
			<text>尊敬的宠物主人：\n\n
			您好！感谢您抽出时间阅读这封信。我们是一款致力于提供全方位服务的宠物APP，我们相信，您的宠物是您生活中最为重要的事物之一，因此我们想通过这样一个社群，为您和您的宠物提供更好、更全面的服务。\n\n
			我们的社群有许多优势与特色，让我们帮您介绍一下：\n\n
			1. 每日实时更新优惠、降价、团购链接。我们了解您和您的宠物对购物的需求，因此我们一直在不断地寻找并为您提供更好的购物方案，希望通过我们的社群，您和您的宠物能够更加舒适地享受生活。\n\n
			2. 新品/试用装免费领取。相信各位宠物主人都追求更多的选择，因此我们定期推出宠物市场中的最新产品及试用装，并且在社群中向您提供免费领取的机会，希望您和您的宠物可以一同体验最新、最优质的产品。\n\n
			3. 抢先一步报名人宠活动。我们为您和您的宠物定期举办不同的活动，比如宠物健康讲座、高质量海外宠物游等等，通过我们的社群，您能够第一时间获取活动信息并报名参加，与其他宠物主人一起共享有趣的宠物生活。\n\n
			4. 宠主人交流论坛。除了上述优势之外，我们还为您打造了一个全新的宠物主人交流论坛，您可以与其他宠物主人交流心得
			</text>
			
		</view>

    <!-- 引用自定义tabbar组件 -->
    <tab-bar :activeTab="tab"></tab-bar><!--将 activeTab 绑定到 Vue 实例中的 tab 变量上，tab为true时-->
	</view>

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
	this.currentProvince=uni.getStorageSync('city')
	if(!this.currentProvince){
		this.currentProvince="请选择省份"
	}
  },

  data() {
  	return {
  		tab: '',
		inputValue: '',
		trueProvince:'xx',
		provinces: ['北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'],
	    currentProvince: '请选择省份',
		isActive:false,
  	}
  },
		 computed: {
		    isCanActive() {
		      return this.currentProvince !== '请选择省份';
		    }
		  },
		  methods: {
		        onProvinceChange(event) {
		          const provinceIndex = event.detail.value
		          this.currentProvince = this.provinces[provinceIndex]
				  if (this.currentProvince !== '请选择省份') {
				      this.trueProvince = this.currentProvince
				    }
					//#ifdef MP-WEIXIN
					wx.setStorageSync('city', this.currentProvince);
					//#endif
					//#ifndef MP-WEIXIN
					localStorage.setItem('city', this.currentProvince);
					//#endif
		        },
				canTap(){
					if(this.isCanActive)
					{
						this.isActive=!this.isActive;
					}
				}
		      }
};
</script>

<style scoped lang="less">
.planet {
  position: relative;
  padding-bottom: 100px;
}

.Background {
    width: 100%;
    height: calc(100vh - 20vh);
    background-color: #fffdf7;
    position: relative;
    top: 14vh;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0px -20px 10px -8px rgba(247,142,72,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.topBackground{
    width: 100vw;
    height: 100vh;
	background-image: linear-gradient(90deg, #ffb675, #ffd29e);
}
.advantage{
	display: flex;
	
	width: 90%;
    height: 80vh;

    position: relative;
    top: 5.5vh;
	color: #cea697;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;

    flex-direction: column;
    align-items: center;
	background: rgba(255, 255, 255, 1);
	box-shadow: 5px 5px 12px 0px rgba(237, 216, 200, 0.5);
	text{
		width: 80%;   
	}
}
.inputBox{
		margin-top: 0px;
		top: 2vh;
		display: flex;
		position: absolute;
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

		.picker-text {

		  font-size: 16px;
		  color: #cea697;
		}
		.picker{
			display: flex;
			flex-direction: row;
			align-content: center;
			justify-content: flex-start;
			align-items: center;
			width: 80%;
			height: 80%;
		}
}
.button2{
	        margin-top: 0px;
		    top: 3vh;
		    width: 85vw;
		    height: 8vh;
			background-color:rgba(252,206,181,0.67) ;
			border-radius: 5vw;
			padding: 0.5rem;
            position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			align-content: center;
			color: #cea697;
			font-weight: bold;
			font-size: 13pt;//字体
			margin-top: 5.5rem;
			transition: height 2s ease-out;
			.catAndDog{
				display: flex;
				flex-direction: column-reverse;
				justify-content: flex-start;
				align-content: center;
				align-items: center;
				height: 100%;
				.image{
					width: 5rem;
					height: 5rem;
					z-index: 99;
					position: relative;
					bottom: 0;
				}
			}

		.page{

			transition: height 2s ease-out;
			overflow: hidden;
			height: auto;
		}
		.page.active{
			font-size: 11pt;//字体
			display: flex;
			flex-direction: column;
			align-content: center;
			justify-content: center;
			align-items: center;
			height: 100%;
		}
		.code{
			width: 10rem;
			height: 10rem;
			z-index: 99;
		}
		}
.button2.active{
	height: 55vh!important;
	background-color:rgba(252,206,181,0.67)!important ;
	box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
	align-items: flex-start;
	transition: height 2s ease-out;
}

.parent {
  position: relative;
  border: 2px solid #ccc;
  height: 200px;
  overflow: hidden;
  transition: height 0.5s ease-out;
}

.child {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  transition: height 0.5s ease-out;
}


</style>