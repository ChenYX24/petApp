<template>
  <view class="topBackground" @touchstart="touchStart" @touchend="touchEnd">
	  <view class="text">
<!-- 		  <text class="text1">XXX的提醒事项</text><br/>
		  <text class="text2">不要忘记哦~</text> -->
		  <top-bar :texts="texts" @toWhere="toWhere" :index="index"></top-bar>
	  </view>

    <!-- 页面内容 -->
    <view v-if="this.index===0" class="Background" scroll-y="true" >
		<view class="scroll-view-content" >
		
          <tip :list="listremind" :flag="false"></tip>
		<view class="bottom-space"></view> <!-- 添加这个元素 -->
		</view>
		<!-- 引用自定义tabbar组件 -->
		<tab-bar :activeTab="tab"></tab-bar>
	</view>
	
	<view v-else class="Background" scroll-y="true" >
		<view class="scroll-view-content" >
		<tip :list="list" :flag="true"></tip>

		<view class="bottom-space"></view> <!-- 添加这个元素 -->
		</view>
		<!-- 引用自定义tabbar组件 -->
		<tab-bar :activeTab="tab"></tab-bar>
	</view>

  </view>
       <notebookform v-show="isshow"></notebookform>
</template>

<script>
	
import TabBar from '/components//TabBar.vue';
import  tip from '/components//tip.vue';
import TopBar from '/components//TopBar.vue';
	import notebookform from '/components///notebookform.vue';
	
export default {
  components: {
    TabBar,
	tip,
	TopBar,
	notebookform
  },
  data() {

  	 const storedList = uni.getStorageSync('list');
  	    const storedListRemind = uni.getStorageSync('listremind');
  	    return {
  	      tab: '',
  	      texts: ["提醒", "记录"],
  	      index: 0,
  	      listremind: storedListRemind ? JSON.parse(storedListRemind) : ["写代码", "吃饭", "睡觉", "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"],
  	      list: storedList ? JSON.parse(storedList) : ["写代码", "吃饭饭", "睡觉觉"],
  	      isshow: false
  	    }
  },
onLoad(options) {
	this.tab=options.tab;
  const { data, leftSelected, rightSelected, indexInForm } = options;
  const decodedData = decodeURIComponent(data).replace(/%0A/g, '\n');
  console.log(indexInForm);
  if (leftSelected === '1') {
	if(indexInForm!=-1){
		this.listremind[indexInForm] = decodedData;
		//#ifdef MP-WEIXIN
		wx.setStorageSync('listremind', JSON.stringify(this.listremind));
		//#endif
		//#ifndef MP-WEIXIN
		localStorage.setItem('listremind', JSON.stringify(this.listremind))
		//#endif
	}else if(indexInForm==-1){
		this.listremind.push(decodedData);
		//#ifdef MP-WEIXIN
		wx.setStorageSync('listremind', JSON.stringify(this.listremind));
		//#endif
		//#ifndef MP-WEIXIN
		localStorage.setItem('listremind', JSON.stringify(this.listremind))
		//#endif
	}

	
  }
  if (rightSelected === '1') {
	  if(indexInForm!=-1){
	  	this.list[indexInForm] = decodedData;
	  	//#ifdef MP-WEIXIN
	  	wx.setStorageSync('listremind', JSON.stringify(this.list));
	  	//#endif
	  	//#ifndef MP-WEIXIN
	  	localStorage.setItem('listremind', JSON.stringify(this.list))
	  	//#endif
	  } else if(indexInForm==-1){
		  this.list.push(decodedData),
		  //#ifdef MP-WEIXIN
		  wx.setStorageSync('list', JSON.stringify(this.list));
		  //#endif
		  //#ifndef MP-WEIXIN
		  localStorage.setItem('list', JSON.stringify(this.list))
		  //#endif
	  }

  }
},
  methods:{
	  toWhere(key){
		  this.index=key
		  //页面显示逻辑
	  },
	  // 起点
	  touchStart(event) {
	    this.startTime = Date.now()
	    this.startPosition = event.changedTouches[0].clientX
	  },
	  // 终点,计算移动距离
	


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