<template>
	<view class="commentForBlog">
		  <view class="UserCommentImage1" @tap="getUser">
		    <image :src="avatarUrl1" class="UseImage1"></image>
		  </view>
			 <view class="commentInformation"  >
					  	<text class="UserName">{{ username }}</text>
						<text class="UserComment">{{ text }}</text>				
			 </view> 
	</view>
</template>

<script>
	export default {
		name:"comments",
		props: {
		    text: {
		      type: String,
		      default: ""
		    }
		  },
		data() {
			return {
				avatarUrl1:"https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/home/dog.png",
				username:"团小萌",
				
			};
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
  	border-bottom: 2px solid rgba(206, 166, 151, 0.15);
  	
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
  		color: rgba(191, 180, 169, 1);
  	}
  	.UserComment{
  		position:absolute;
  		bottom:2vh;
  		color: rgba(191, 180, 169, 1);
  	}
  }
</style>