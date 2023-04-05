<template>
<view class="tabContainer">
	    <div class="placeholder"></div>

  <view class="tab-bar">
    <view class="tab-item"  @click="switchTab('memo')">
      <image class="imgGroup notebIcon leftIcon" src="/static/tabbar/notebook.png"></image>
	  	<view class="dot" :class="{active: activeTab === 'memo'}"></view>
    </view>
    <view class="tab-item"  @click="switchTab('planet')">
      <image class="imgGroup leftIcon" src="/static/tabbar/planet.png"></image>
	  	<view class="dot" :class="{active: activeTab === 'planet'}"></view>
    </view>
    <view class="tab-item add" @click="switchTab('add')">
      <image class="imgGroup addImg" src="/static/tabbar/add.png"></image>
    </view>
    <view class="tab-item"  @click="switchTab('activity')">
      <image class="imgGroup" src="/static/tabbar/activity.png"></image>
	  	<view class="dot" :class="{active: activeTab === 'activity'}"></view>
    </view>
    <view class="tab-item"  @click="switchTab('home')">
      <image class="imgGroup" src="/static/tabbar/home.png"></image>
	  	<view class="dot" :class="{active: activeTab === 'home'}"></view>
    </view>
	<!-- 底部橘色的小圆点 -->
<!-- 	<add v-if="isAdd"></add> -->
  </view>
  <add :class="{show:isAdd}" :isShow="isAdd" @updateAdd="changeAdd"></add>
  </view>
</template>

<script>
import add from "/components/add//add.vue"
export default {
  components: {
    add,
  },
  data() {
    return {
		tab:'memo',
		isAdd:false,
    };
  },
   props: {
      activeTab: {
        type: String,
        default: 'memo'
      }
    },
  methods: {
	  changeAdd(){
		  this.isAdd=!this.isAdd;
	  },

	//#ifdef MP-WEIXIN
	switchTab(tab) {
	  if (tab === 'add') {
	    // 点击加号按钮跳转到相应页面
	    // wx.redirectTo({
	    //   url: '/pages/add/add',
	    // });
		this.isAdd=!this.isAdd
	  } else {
	    // 切换选中的tab
	    this.tab = tab;
	    // 根据选中的tab跳转到相应页面
	    switch (tab) {
	      case 'memo':
	        wx.redirectTo({
	          url: `/pages/notebook/notebook?tab=${tab}`,
	        });
	        break;
	      case 'planet':
	        wx.redirectTo({
	          url: `/pages/planet/planet?tab=${tab}`,
	        });
	        break;
	      case 'activity':
	        wx.redirectTo({
	          url: `/pages/activity/activity?tab=${tab}`,
	        });
	        break;
	      case 'home':
	        wx.redirectTo({
	          url: `/pages/home/home?tab=${tab}`,
	        });
	        break;
	    }
	  }
	},
	//#endif
	//#ifndef MP-WEIXIN
	switchTab(tab) {
	  if (tab === 'add') {
	    // 点击加号按钮跳转到相应页面
	    // uni.redirectTo({
	    //   url: '/pages/add/add',
	    // });
		this.isAdd=!this.isAdd
	  } else {
	    // 切换选中的tab
	    this.tab = tab;
	    // 根据选中的tab跳转到相应页面
	    switch (tab) {
	      case 'memo':
	        uni.redirectTo({
	          url: `/pages/notebook/notebook?tab=${tab}`,
	        });
	        break;
	      case 'planet':
	        uni.redirectTo({
	          url: `/pages/planet/planet?tab=${tab}`,
	        });
	        break;
	      case 'activity':
	        uni.redirectTo({
	          url: `/pages/activity/activity?tab=${tab}`,
	        });
	        break;
	      case 'home':
	        uni.redirectTo({
	          url: `/pages/home/home?tab=${tab}`,
	        });
	        break;
	    }
	  }
	},
	//#endif

  },
};
</script>

<style scoped>
.tab-bar {
  z-index: 99;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 30px!important;
  border-top-right-radius: 30px!important;
  box-shadow: 0px -12px 10px -4px rgb(252 223 205 / 50%) !important;

}

.tab-item {
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26rpx;
  color: #888;
  text-align: center;
}

.dot.active {
  background-color: #fca547;
}

.tab-item.add {
  position: relative;
}

.dot {
  position: absolute;
  bottom: 1rem;
  width: 0.3rem;
  height: 0.3rem;
  background-color: rgba(255,255,255,0);
  border-radius: 50%;
}

 
 .tab-item.add image {
 width: 50px;
 height: 50px;
 }
 
 .tab-item.add text {
 font-size: 0;
 line-height: 0;
 height: 0;
 overflow: hidden;
 }
 
 
 .imgGroup{
	 width: 2rem;
	 height: 2rem;
 }
 
 .notebIcon{
	 width: 1.8rem;
	 height: 1.8rem;
	 top: 0.08rem !important;
 }
 
 .addImg{
	 transform:scale(1.08);
 }
 
 .leftIcon{
	 bottom: 0.1rem;
 }
.tabContainer::after {
  content: "";
  display: block;
  width: 100%;
  height: 100px; /* 占位元素的高度 */
}
.placeholder {
  display: block;
  width: 100%;
  height: 100px;
}
 </style>
 
