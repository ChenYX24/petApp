<template>
  <view class="topBackground" @touchstart="touchStart" @touchend="touchEnd">
	  <view class="text">
<!-- 		  <text class="text1">XXX的提醒事项</text><br/>
		  <text class="text2">不要忘记哦~</text> -->
		  <top-bar :texts="texts" @toWhere="toWhere" :index="index"></top-bar>
	  <view class="add" @click="addNote">
	    <image class="addImg" src="/static/tabbar/add.png" ></image>
	  </view>
	  </view>

    <!-- 页面内容 -->
    <view v-if="this.index===0" class="Background" scroll-y="true">
		<view class="scroll-view-content">
		
		<tip text="驱虫,就是今天" :flag="true"></tip>
		<tip text="第二天" :flag="false"/>
		<tip :flag="true"></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<view class="bottom-space"></view> <!-- 添加这个元素 -->
		</view>
		<!-- 引用自定义tabbar组件 -->
		<tab-bar :activeTab="tab"></tab-bar>
	</view>
	
	<view v-else class="Background" scroll-y="true">
		<view class="scroll-view-content">
		<tip text="记录" ></tip>
		<tip text="第二天" :flag="true"></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<tip ></tip>
		<view class="bottom-space"></view> <!-- 添加这个元素 -->
		</view>
		<!-- 引用自定义tabbar组件 -->
		<tab-bar :activeTab="tab"></tab-bar>
	</view>
	
	

  </view>
</template>

<script>
import TabBar from '/components//TabBar.vue';
import  tip from '/components//tip.vue';
import TopBar from '/components//TopBar.vue';
export default {
  components: {
    TabBar,
	tip,
	TopBar
  },
  onLoad: function (options) {
	this.tab=options.tab;
  },
  data() {
  	return {
  		tab: '',
		texts:["提醒","记录"],
		index:0
  	}
  },
  methods:{
	  toWhere(key){
		  this.index=key
		  //页面显示逻辑
	  },
	  addNote(){
	     
	  					  uni.navigateTo({
	  					  	 url: `/pages/notebook/notebookForm`,
	  					  })
	  			
	  },
	  // 起点
	  touchStart(event) {
	    this.startTime = Date.now()
	    this.startPosition = event.changedTouches[0].clientX
	  },
	  // 终点,计算移动距离
	  touchEnd(event) {
	  	const endTime = Date.now()
	  	if (endTime - this.startTime > 2000) {
	  		return;
	  	}
	  	this.endPosition = event.changedTouches[0].clientX
	   
	       
	      //当移动距离超过10时判断左滑右滑。
	  	if (Math.abs(this.endPosition - this.startPosition) > 10) {
	  	  this.endPosition = event.changedTouches[0].clientX
	  	  var elePosition = this.endPosition - this.startPosition > 0 ? "right" : "left"
	   
	  	} else {
	  		return;
	  	}
	  				
	  	console.log(elePosition)
		//判断左滑还是右滑
		if(elePosition==="right"){
			this.index=0
		}
		if(elePosition==="left"){
			this.index=1
		}
					
	  }
  }

};
</script>

<style scoped lang="less">
.Background {
    width: 100%;
    height: calc(100vh - 20vh);
    background-color: #fffdf7;
    position: relative;
    top: 10vh;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0px -20px 10px -8px rgba(247,142,72,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.scroll-view-content {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    justify-items: center;
}
.bottom-space {
    width: 100%;
    height: 5rem;
}

.text{
	display: flex;
	flex-direction: column;
	font-weight: bold;
	position: relative;
	height: 14vh;
	top: 7vh;
	color: #fffdf7;
	margin-left: 1rem;
	.text1{
			font-size: 17pt;//字体
	}
	.add {
		display: flex;
		flex-direction: row-reverse;
     
		margin-right: 5vw;
       .addImg{
		   width: 4rem;
		   height: 4rem;
		   z-index: 99;
	   }
	  }
	
}

.topBackground{
    width: 100vw;
    height: 100vh;
	background-image: linear-gradient(90deg, #ffb675, #ffd29e);

}

</style>