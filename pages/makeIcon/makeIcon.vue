<template>
	<view class="IDBG">
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
		<view class="pageContent">
			<view class="imgContainer">
				 <image v-if="selectedImage" :src="selectedImage" class="selectedImage"></image>
				<image class="like" :src="heartIcon" mode="aspectFit" @tap="toggleHeart" :class="{heart_animation:isAnimation}"></image>
			</view>
			<view class="container">
			    <view 
			      class="tab" 
			      :class="{ selected: selectedTab === 'template' }" 
			      @click="selectedTab = 'template'"
			    >
			      模板
					<view v-if="selectedTab === 'template'" class="triangle"></view>
			    </view>
			    <view 
			      class="tab" 
			      :class="{ selected: selectedTab === 'creation', rightTab: true }" 
			      @click="selectedTab = 'creation'"
			    >
				  <view v-if="selectedTab === 'creation'" class="triangleR"></view>
			      创作
			    </view>
			  </view>
				<view v-if="selectedTab === 'template'" class="contextBox T">
					<image
						v-for="(image, index) in emoticons" 
						:key="index" 
						:src="image.src" 
						@click="showImage(image)"
						class="emoticon"
						mode="widthFix"
					>
					</image>
					<view class="placeholder"></view>
				</view>
			  <view v-if="selectedTab === 'creation'" class="contextBox C">

				<view class="Hcontrol">
					<slider :value="H" min="0" max="360" color="rgba(0,0,0,0)" selected-color="rgba(0,0,0,0)" @change="updateH"/>
				</view>
				<view class="Scontrol" :style="gradientStyleS">
					<slider :value="S" min="0" max="100" color="rgba(0,0,0,0)" selected-color="rgba(0,0,0,0)" @change="updateS"/>
				</view>
				<view class="Bcontrol" :style="gradientStyleB">
					<slider :value="B" min="0" max="100" color="rgba(0,0,0,0)" selected-color="rgba(0,0,0,0)" @change="updateB"/>
				</view>
				<view class="viewBox">
					<view class="outerBlock">
						<view class="color-block" :style="{ backgroundColor: finalColor }"></view>
					</view>
					<view class="iconGroup">
						<view class="Outpen" :class="{active:isEdit}" @tap="isEdit=true">
							<image class="pen" src="/static/emoticonIcon/edit.png" mode="widthFix"></image>
						</view>
						<view class="Outeraser" :class="{active:!isEdit}" @tap="isEdit=false">
							<image class="eraser" src="/static/emoticonIcon/eraser.png" mode="widthFix"></image>
						</view>
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
				Text:"制作表情包",
				Nav:"/pages/home/home",
				selectedTab: 'template',
				isHeartActive:false,
				isAnimation:false,
				emoticons: [], 
				selectedImage: '', 
				likeIcon:[],
				H:180,
				S:50,
				B:50,
				isEdit:true,
			};
		},
		mounted() {
		    // 之后要在服务端动态获取图片
		    for (let i = 1; i <= 12; i++) {
		        this.emoticons.push({
		            src: `/static/emoticon/${i}.png`,
		        });
		    }
			if(this.emoticons)
			{
				this.selectedImage=this.emoticons[0].src
			}
			//#ifdef MP-WEIXIN
			this.likeIcon=uni.getStorageSync('likeIcon')
			//#endif
			//#ifndef MP-WEIXIN
			var likeIconT = uni.getStorageSync('likeIcon');
			if (likeIconT) {
			    try {
				this.likeIcon=JSON.parse(uni.getStorageSync('likeIcon'))
			    } catch (e) {
			        console.error(e); // 输出错误信息
			    }
			}
			//#endif
			// 检查图片是否已经在 likeIcon 数组中
			const index = this.likeIcon.findIndex(item => item == this.selectedImage);
			if (index > -1) {
				// 如果图片已经在数组中，已收藏
				this.isHeartActive=true
			} else {
				// 如果图片不在数组中，未收藏
				this.isHeartActive=false
			}
		},
		computed: {
		  heartIcon() {
		    return this.isHeartActive
		      ? "../../static/myActivity/redHeart.png"
		      : "/static/activity/点赞.png";
		  },
			finalColor() {
				  return `hsl(${this.H},${this.S}%, ${this.realB}%)`;
				},
		gradientStyleS() {
		  return {
			background: `linear-gradient(90deg, hsl(${this.H}, 0%, ${this.realB}%) 0%, hsl(${this.H}, 100%, ${this.realB}%) 100%)`
		  }
		  },
		  gradientStyleB() {
		    return {
		  	"background":`linear-gradient(90deg,hsl(${this.H},${this.S}%,0%) 0%, hsl(${this.H},${this.S}%,100%) 100%)`
		    };
		},
		realB(){
			return 100-this.B
		}
		},
		  methods: {
			  async toggleHeart() {
			    this.isHeartActive = !this.isHeartActive;
			    if (this.isHeartActive) {
			      await this.$nextTick();
			        this.isAnimation=true;
			      setTimeout(() => {
			        this.isAnimation=false;
			      }, 1000);
			    }
				// 检查图片是否已经在 likeIcon 数组中
				const index = this.likeIcon.findIndex(item => item === this.selectedImage);
				if (index > -1) {
					// 如果图片已经在数组中，那么将其从数组中删除
					this.likeIcon.splice(index, 1);
				} else {
					// 如果图片不在数组中，那么将其添加到数组中
					this.likeIcon.push(this.selectedImage);
				}
				//#ifdef MP-WEIXIN
				wx.setStorageSync('likeIcon', this.likeIcon);
				//#endif
				//#ifndef MP-WEIXIN
				localStorage.setItem('likeIcon', JSON.stringify(this.likeIcon));
				//#endif
			  },
			   showImage(image) {
			          this.selectedImage = image.src;
					  // 检查图片是否已经在 likeIcon 数组中
					  const index = this.likeIcon.findIndex(item => item == this.selectedImage);
					  if (index > -1) {
					  	// 如果图片已经在数组中，已收藏
					  	this.isHeartActive=true
					  } else {
					  	// 如果图片不在数组中，未收藏
					  	this.isHeartActive=false
					  }
			      },
				  updateH(e){
					this.H = e.detail.value;
				  },
				  updateS(e){
				  	this.S = e.detail.value;
				  },
				  updateB(e){
				  	this.B = e.detail.value;
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
    align-items: center;
    position: relative;
    top: 0rem;
    height: 100%;
    padding-top: 10%;
	}
	.imgContainer{
    width: 85vw;
    height: 130vw;
    opacity: 1;
    border-radius: 11px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 5px 5px 12px 0px rgba(237, 216, 200, 0.5);
	position: relative;

	}
	.container {
	  display: flex;
	  width: 100vw;
	  position: relative;
	  top: 5%;
	}
	
	.tab {
	  flex: 1;
	  background: rgba(245, 241, 230, 1);
	  text-align: left;
	  vertical-align: top;
	  font-weight: 700;
	  letter-spacing: 0px;
	  text-align: center;
	  position: relative;
	}
	.tab:not(.rightTab){
		    border-top-left-radius: 50px;
	}
	.rightTab{
		    border-top-right-radius: 50px;
	}
	.tab.selected {
	  background: rgba(255, 255, 255, 1);
	  box-shadow: 10px -5px 9px -4px rgba(237, 216, 200, 0.5);
	  z-index: 3;
	  font-size: 24px;
	  line-height: 54.75px;
	  color: rgba(130, 65, 0, 0.5);
	  height: 100%;
	}
	
	.tab:not(.selected) {
	  z-index: 0;
	  font-size: 20px;
	  line-height: 28.96px;
	  color: rgba(130, 65, 0, 0.3);
	  position: relative;
	  top: 35%;
	}

	.contextBox
	{
		width: 100%;
		height: 100%;
		z-index: 2;
		background-color:  #ffffff;
		position: relative;
		top: 5%;

	}
	.contextBox.C{
    display: flex;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    z-index: 2;
    background-color: #ffffff;
    position: relative;
    top: 5%;
    overflow-y: scroll;
    flex-direction: column;
    align-items: center;
    align-content: center;
		.color-block {
		  width: 100px;
		  height: 100px;
		}
	}
	
	.triangle {
	position: absolute;
    top: 0;
    right: -10px;
    z-index: 1;
    width: 20px;
    height: 59px;
    background: #ffffff;
    transform-origin: left;
    transform: skew(20deg);
	box-shadow: 10px -5px 9px -4px rgba(237, 216, 200, 0.5);
	}
	.triangleR {
	position: absolute;
    top: 0;
    left: -10px;
    z-index: 1;
    width: 20px;
    height: 59px;
    background: #ffffff;
    transform-origin: left;
    transform: skew(-20deg);
    box-shadow: -10px -5px 9px -4px rgba(237, 216, 200, 0.5);
	}
	.heart_animation {
	  transform: scale(1);
	  animation: heartPulse 0.6s linear;
	}
	@keyframes heartPulse {
	  0%{
		  transform: scale(1);
	  	  transform: rotate(0deg);
	  }
	  8.3% {
	    transform: scale(0.804);
		transform: rotate(17.0deg);
	  }
	  16.6%{
	    transform: scale(1.186);
		transform: rotate(3.2deg);
	  }
	  25%{
		  transform: scale(1.292);
		  transform: rotate(-7.8deg);
	  }
	  33.3%{
		  transform: scale(1.309);
		  transform: rotate(-12deg);
	  }
	  41.6% {
	    transform: scale(1.220);
	  	transform: rotate(-7.2deg);
	  }
	  50%{
	    transform: scale(0.942);
	  	transform: rotate(0.8deg);
	  }
	  58.3%{
	  	  transform: scale(0.800);
	  	  transform: rotate(2.8deg);
	  }
	  66.6%{
	  	  transform: scale(0.886);
	  	  transform: rotate(1.7deg);
	  }
	  75% {
	    transform: scale(0.954);
	  	transform: rotate(0.6deg);
	  }
	  83.3%{
	  	  transform: scale(0.984);
	  	  transform: rotate(0.1deg);
	  }
	  91.6%{
	  	  transform: scale(0.997);
	  	  transform: rotate(0deg);
	  }
	  100%{
		  transform: scale(1);
	  	  transform: rotate(0deg);
	  }
	  }
	  .like
	  {
    width: 80rpx;
    height: 80rpx;
    transition: all 0.3s;
    position: absolute;
    bottom: 5%;
    right: 5%;
	  }
	  .contextBox {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  max-height: 100vh; /* 视口高度 */
  z-index: 2;
  background-color: #ffffff;
  position: relative;
  top: 5%;
  overflow-y: scroll; /* 允许垂直滚动 */
	  }
	  
	  .emoticon {
	      width: calc(100% / 3);
		  max-height: 34vw;
	  }
	  .selectedImage {
		  position: relative;
	      width: 80%;
		  max-height: 80%;
		  left: 50%;
		  top: 50%;
		  transform: translate(-50%, -50%);
	  }

	  //#ifdef MP-WEIXIN
	  .placeholder {
		
	    height: 30%;  
		width: 100%;
	  }
	  //#endif
	  //#ifndef MP-WEIXIN
	  .placeholder {
		
	    height: 25%;  
		width: 100%;
	  }
	  //#endif
	  .Hcontrol{
		margin: 5%;
		width: 90vw;
		height: 5vw;
	    border: 4px solid rgb(237, 216, 200);
		opacity: 1;
		border-radius: 9999px;
		background: linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(247, 255, 0, 1) 16.76%, rgba(13, 255, 0, 1) 33.89%, rgba(0, 255, 242, 1) 49.45%, rgba(0, 38, 255, 1) 63.33%, rgba(208, 0, 255, 1) 83.33%, rgba(255, 0, 0, 1) 100%);  
	  }
	  .Scontrol{
			margin: 5%;
			width: 90vw;
			height: 5vw;
	  		opacity: 1;
	  		border-radius: 9999px;
			border: 4px solid rgb(237, 216, 200);
	  }
	  .Bcontrol{
			margin: 5%;
			width: 90vw;
			height: 5vw;
			border: 4px solid rgb(237, 216, 200);
	  		opacity: 1;
	  		border-radius: 9999px;
			transform: rotate(180deg);
			slider{
				transform: rotate(180deg);
			}
	  }
	  slider{
		      margin: 0;
	  }
	  .viewBox{
		  display: flex;
		  flex-direction: row;
		  align-items: center;
		  justify-content: space-between;
		  width: 80%;
		  margin-top: 20px;
	  }
	  .pen,.eraser{
		  width: 54px;
		  height: 54px;
	  }
	  .Outpen,.Outeraser{
		margin-left: 5%;
		margin-right: 5%;
	  	width: 75px;
	  	height: 75px;
	  }
	  .active{
	  	width: 85px;
	  	height: 85px;
	  	border-radius: 11px;
	  	background: rgba(255, 252, 245, 1);
	  	box-shadow: 5px 5px 12px 0px rgba(237, 216, 200, 0.5);
	  }

	  .pen,.eraser{
		  width: 20vw;
		  height: 20vw;
	  }	  .iconGroup{
		  display: flex;
		  align-items: center;
		  flex-direction: row;
		  
	  }

</style>
