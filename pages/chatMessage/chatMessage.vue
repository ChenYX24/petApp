<template>
	<view class="topBackground">
		<view class="Background">
			<nav-bar :text="Text"></nav-bar>
			<view class="mainContainer">
				<view class="container">
				    <view 
				      class="tab" 
				      :class="{ selected: selectedTab === 'template' }" 
				      @click="selectedTab = 'template'"
				    >
				        聊天	
						<view v-if="selectedTab === 'template'" class="triangle"></view>
				    </view>
				    <view 
				      class="tab" 
				      :class="{ selected: selectedTab === 'creation', rightTab: true }" 
				      @click="selectedTab = 'creation'"
				    >
					  <view v-if="selectedTab === 'creation'" class="triangleR"></view>
				      通知
				    </view>
				  </view>
				  <view v-if="selectedTab === 'template'" class="contextBox T">
					  <view class="scroll-view-content" >
	                 <view v-for="(comment, index) in commentsarr" :key="comment.userId" >
	                   <message :text="comment.text" :avatarUrl="comment.avatarUrl" :username="comment.username"  :messagetime="comment.messagetime" @tap="toChat(comment.userId)"></message>
	                 </view>
					  </view>
				  </view>
				  <view v-if="selectedTab === 'creation'" class="contextBox C">
					  <view class="scroll-view-content" >
					  <view v-for="(comment, index) in commentsarr1" :key="comment.userId" >
					    <message :text="comment.text" :avatarUrl="comment.avatarUrl" :username="comment.username" :messagetime="comment.messagetime" @tap="toChat(comment.userId)"></message>
					  </view>
					  </view>
					</view>
			</view>
            
		</view>
	</view>
</template>

<script>
	import navBar from '/components//navBar/navBar.vue';
    import comments from '/components///comments.vue';
	import message from '/components///message.vue';
	export default {
		components: {
		  navBar,
		  comments,
		  message
		},
		data() {
			return {
				selectedTab: 'template',
				Text:"聊天室",
				commentsarr: [
					{
					        userId: 1,
					        text: "小萌家的猫粮有优惠券欸！！！",
					        avatarUrl: "/static/activity/头像4.jpeg",
					        username: "喵喵-小萌家",
							messagetime:"19:00"
					      },
							{
								userId: 1,
								text: "你好，我是狗狗医生，很高兴为你服务！",
								avatarUrl: "/static/activity/头像6.jpg",
								username: "狗狗医生",
								messagetime:"昨天"
							  },
							  {
									  userId: 1,
									  text: "#接龙 汪汪大学习 小花 报名",
									  avatarUrl: "/static/activity/头像7.jpg",
									  username: "汪家活动群",
									  messagetime:"4月30日"
									},
											
											
						
				],
				commentsarr1: [
					{
					        userId: 1,
					        text: "赞了你的活动",
					        avatarUrl: "/static/activity/头像4.jpeg",
					        username: "喵喵",
							messagetime:"19:00"
					      },
						  {
						          userId: 1,
						          text: "请求添加好友",
						          avatarUrl: "/static/activity/头像5.jpg",
						          username: "狐狸li",
								  messagetime:"昨天"
						        },
				],
			}
		},
		methods: {
			toChat(userId){
				
			  console.log(userId)
			  uni.navigateTo({
				url: '/pages/chatchat/chatchat?userId='+userId
			  })

			},
		}
	}
</script>

<style scoped lang="less">
nav-bar{
	margin-top: 3vh;
}
.mainContainer{
	position: absolute;
	display: flex;
	flex-direction: column;
	height: 90vh;
}
.topBackground{
	width: 100vw;
	height: 100vh;
	background-color: #ffb776;
	overflow: hidden;
}
.Background{
		width: 100%;
	    height: 100vh;
	    background-color: #fffdf7;
	    position: relative;
	   padding-top: 7%;
	    border-top-left-radius: 2rem;
	    border-top-right-radius: 2rem;
		box-shadow: 0px -20px 10px -8px rgba(247,142,72,0.5);
	}
	.container {
	  display: flex;
	  width: 100vw;
	  position: relative;
	  top: 5vh;
	  
	  
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
	z-index: 3;
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
	.contextBox.T {

	
	    display: flex;
	    width: 100%;
	    height: 100%;
	    max-height: 100vh;
	    z-index: 2;
	    background-color: #ffffff;
	    position: relative;
	    overflow-y: scroll;
	    flex-direction: column;
	    top: 6%;
	    align-items: center;
		  }
	.scroll-view-content{
		position: relative;
		    display: flex;
		    grid-template-columns: 1fr;
		    width: 100%;
		    height: 80vh;
		    overflow-y: scroll;
		    justify-items: center;
		    align-content: center;
		    flex-direction: column;
		    align-items: center;
	}
</style>
