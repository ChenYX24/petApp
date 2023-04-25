<template>
	
  <view class="topBackground">
	  <view class="add" @click="addNote">
	    <image class="addImg" src="/static/tabbar/add.png" ></image>
	  </view>
    <!-- 页面内容 -->
    <view class="Background">
     
    <notebookform v-show="isshow"></notebookform>

	</view>
    <!-- 引用自定义tabbar组件 -->
    <tab-bar :activeTab="tab"></tab-bar>
  
	<add></add>
  </view>
      <notebookform v-show="isshow"></notebookform>
</template>

<script >

	import TabBar from '/components//TabBar.vue';
	import notebookform from '/components///notebookform.vue';
	export default {
        components: {
            notebookform,
			TabBar,

		},
		data() {
            return {
         isshow:false
         }
		},
		methods: {
           
         addNote(){
			 this.isshow=true;
		 }
	    },
		metaInfo: {
		  // 页面标题
		  title: 'add',
		},
		
	}
</script>

<style lang="less">
	.addImg{
			   width: 4rem;
			   height: 4rem;
			   z-index: 99;
	}
	.Background{
		width: 100%;
	    height: 80vh;
	    background-color: #fffdf7;
	    position: relative;
	    top: 20vh;
	    border-top-left-radius: 2rem;
	    border-top-right-radius: 2rem;
		box-shadow: 0px -20px 10px -8px rgba(247,142,72,0.5);
	}
	.topBackground{
	    width: 100vw;
	    height: 100vh;
	    background-color: #ffb776;
	}

</style>
