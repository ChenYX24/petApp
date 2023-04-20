<template>
	
  <view class="topBackground">
    <!-- 页面内容 -->
    <view class="Background">
		  <view class="selectBox">
			<view class="image-wrapper" @tap="selectLeft">
			  <image :src="leftImageUrl" class="image" />
			  <view class="text" :style="{color:leftSelected?'#fca547':'#9f9f9f'}">
			  	提醒
			  </view>
			</view>
			<view class="image-wrapper" @tap="selectRight">
			  <image :src="rightImageUrl" class="image" />
			  <view class="text" :style="{color:rightSelected?'#fca547':'#9f9f9f'}">
			  	记录
			  </view>
			</view>
		  </view>


	</view>
    <!-- 引用自定义tabbar组件 -->
    <tab-bar :activeTab="tab"></tab-bar>

	<add></add>
  </view>
</template>

<script >
	import add from "/components/add/add.vue"
	import TabBar from '/components//TabBar.vue';
	export default {
        components: {
			add,
			TabBar
		},
		data() {
            
           return{
			   leftSelected: true,
			   rightSelected: false,
			   leftImageUrl: '/static/notebook/选择_已选择.png',
			   rightImageUrl: '/static/notebook/选择_未选择.png',
			   thirdImageUrl: '/static/notebook/选择_已选择.png',
			   fourthImageUrl: '/static/notebook/选择_已选择.png'
		   };

		},
		methods: {
          selectLeft() {
		        this.leftSelected = !this.leftSelected;
		        this.rightSelected = false;
		        this.isActive = this.leftSelected || this.rightSelected;
		  
		        if (this.leftSelected) {
		          this.leftImageUrl = this.thirdImageUrl;
				  this.rightImageUrl = '/static/notebook/选择_未选择.png';
		        } 
				else{
				  this.leftImageUrl='/static/notebook/选择_未选择.png';
				}
		      },
		      selectRight() {
		        this.rightSelected = !this.rightSelected;
		        this.leftSelected = false;
		        this.isActive = this.leftSelected || this.rightSelected;
		  
		        if (this.rightSelected) {
		          this.rightImageUrl = this.fourthImageUrl;
				  this.leftImageUrl = '/static/notebook/选择_未选择.png';
		        } 
				else{
				  this.rightImageUrl='/static/notebook/选择_未选择.png';
				}
		      },

	    },
		metaInfo: {
		  // 页面标题
		  title: 'add',
		},
		
	}
</script>

<style lang="less">
	.selectBox{
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 3rem;
		.image-wrapper{
			display: flex;
			flex-direction: row;
			align-content: center;
			justify-content: center;
			align-items: center;
			.image{
			width:10vw;
			height: 10vw;
			margin-left: 1rem;
			}
			.text{
				font-weight: bold;
			}
		}
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
