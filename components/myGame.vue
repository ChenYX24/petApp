<template>
  <view class="flex-wrap">
    <view class="flex-col relative equal-division-item space-y-6" >
      <image class="image_5" :src="imageSrc"  @click="clickActivity" />
      <view class="flex-row items-center space-x-6">
		<view class="tag" v-if="tag ">{{ tag }}</view>
        <image class="image_6" :class="{heart_animation:isAnimation}" :src="heartIcon" @tap="toggleHeart"/>
        
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "myActivity",
  props: {
    imageSrc: String,
	tag:String,
	activityThoughtId:String,
	activityThoughtUserId:String,
	index:Number
  },
  data() {
    return {
      isHeartActive: false,
	  isAnimation:false,
    };
  },
  computed: {
    heartIcon() {
      return this.isHeartActive
        ? "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/myActivity/redHeart.png"
        : "https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/activity/点赞.png";
    },
  },
  methods: {
    async toggleHeart() {
      this.isHeartActive = !this.isHeartActive;
      if (this.isHeartActive) {
        await this.$nextTick();
		console.log(111)
          this.isAnimation=true;
        setTimeout(() => {
          this.isAnimation=false;
        }, 1000);
      }
    },
	clickActivity(){
		uni.navigateTo({
		  url: `/pages/gamePlay/gamePlay?url=${this.index}`,
		});
	}
  },
};
</script>

<style lang="less">
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 1vw;
}
.equal-division-item {
  padding: 24rpx;
  width: 40vw;
  background-color: #ffffff;
  border-radius: 22rpx;
  box-shadow: 10rpx 10rpx 24rpx #edd8c880;
  height: 450rpx;
  position: relative;
  margin-bottom: 20rpx;
}
.space-y-6 > view:not(:first-child),
.space-y-6 > text:not(:first-child),
.space-y-6 > image:not(:first-child) {
  margin-top: 12rpx;
}
.image_5 {
  border-radius: 10rpx;
  width: 100%;
  height: 390rpx;
}
.space-x-6 > view:not(:first-child),
.space-x-6 > text:not(:first-child),
.space-x-6 > image:not(:first-child) {
  margin-left: 12rpx;
}
.flex-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}
.tag{
	color: rgb(191,180,169);
	flex: 1;
}
.image_6 {
  width: 52rpx;
  height: 52rpx;
  transition: all 0.3s;
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
</style>