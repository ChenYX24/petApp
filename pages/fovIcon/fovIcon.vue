<template>
	<view class="IDBG">
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
		<view class="pageContent">
			<view class="imgContainer">
				 <image v-if="selectedImage" :src="selectedImage" class="selectedImage"></image>
				<image class="like" :src="heartIcon" mode="aspectFit" @tap="toggleHeart" :class="{heart_animation:isAnimation}"></image>
			</view>
				<view class="contextBox T">
					<image
						v-for="(image, index) in emoticons" 
						:key="index" 
						:src="image" 
						@click="showImage(image)"
						class="emoticon"
						mode="widthFix"
					>
					</image>
					<view class="placeholder"></view>
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
				Text:"已收藏",
				Nav:"/pages/home/home",
				isHeartActive:false,
				isAnimation:false,
				selectedImage: '', 
				likeIcon:[],
				emoticons: []
			};
		},
		onLoad(){
			//#ifdef MP-WEIXIN
			this.emoticons=uni.getStorageSync('likeIcon')
			//#endif
			//#ifndef MP-WEIXIN
			this.emoticons=JSON.parse(uni.getStorageSync('likeIcon'))
			//#endif
		},
		mounted() {
		    // 之后要在服务端动态获取图片
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
			if(this.likeIcon)
			{
				this.selectedImage=this.likeIcon[0]
			}
			this.isHeartActive=true;
		},
		computed: {
		  heartIcon() {
		    return this.isHeartActive
		      ? "../../static/myActivity/redHeart.png"
		      : "/static/activity/点赞.png";
		  },
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
			          this.selectedImage = image;
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
</style>
