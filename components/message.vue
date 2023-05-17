<template>
	<view class="commentForBlog">
		  <view class="UserCommentImage1" @tap.stop="toOtherHome(userId)">
		    <image :src="avatarUrl" class="UseImage1"></image>
		  </view>
			 <view class="commentInformation"  >
					  	<text class="UserName">{{ username }}</text>
						<text class="UserComment">{{ text }}</text>				
			 </view> 
			 <view class="Time">
				  <text class="time">{{messagetime}}</text>
			 </view>
	</view>
</template>

<script>
	export default {
		name:"message",
		props: {
		    text: {
		      type: String,
		      default: ""
		    },
			avatarUrl:
			{
				type:String,
				default:"https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/dog.png"
			},
			username:{
				type: String,
				default: "团小萌"
			},
			messagetime:{
				type: String,
				default: "现在"
			}
		  },
		data() {
			return {
				
			};
		},
		methods:{
			toOtherHome(userId){
				
			  console.log(userId)
			  uni.navigateTo({
				url: '/pages/otherHome/otherHome?userId='+userId
			  })
			},
		}
	}
</script>

<style lang="less">
  .commentForBlog{
  	position:relative;
  	display: flex;
  	flex-direction: row;
  	height:10vh;
  	width:90vw;
	border-radius: 25px;
	background: linear-gradient(47deg, #f5ecc5 0%, #fffdf7 100%);
	margin:0.5vh;
  	margin-top:0.7vh;
  }
  
  .UserCommentImage1{
  	display: flex;
  	justify-content: space-between;
  	align-items: center;
   margin-left: 5vw;
   .UseImage1 {
     width: 15vw;
     height: 15vw;
     opacity: 1;
     border: 2px solid rgba(125, 91, 91, 1);
     border-radius: 50%;
     background: rgba(255, 253, 247, 1);
   }
  }
  .commentInformation{
  	margin-left: 5vw;
      display: flex;
      flex-direction: column;
  	.UserName{
  		position:absolute;

  		top:1.5vh;
  		font-size: 30px;
  		    font-weight: 800;
  		    line-height: 24px;
  		    color: rgba(130, 65, 0, 0.7);
  		    top: 1.5vh;
  		    color: #efb681;
  	}
  	.UserComment{
  		position:absolute;
  		bottom:1.5vh;
  		color: rgba(191, 180, 169, 1);
  	}
  }
  .Time{
	  .time{
		  position:absolute;
		  top:1vh;
		  right:1vh;
		  color: rgba(191, 180, 169, 1);
	  }
  }
</style>