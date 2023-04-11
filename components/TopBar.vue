<template>
	<view>
		  <!-- <li v-for="item in this.texts">{{item}}</li> -->
		  <view v-for="(item,key) in this.texts">
			  		  <span  v-if="index===key" class="topbarchoosed" @click="toWhere(key)">{{item}}</span>
					  <span  v-else class="topbar" @click="toWhere(key)">{{item}}</span>
		  </view>

		  
	</view>
</template>

<script>
	export default {
		name:"TopBar",
		props: {
			texts: {
			 type: Array,
		     required: false,
			 default: ["提醒","记录"],
			},
			index:{
				type: Number,
				required: false,
				default: 0,
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			toWhere(key){
				this.$emit("toWhere",key)
			}
		}
	}
</script>

<style  lang="less">
.topbarchoosed {
	font-size: 36px;
	font-weight: 400;
	letter-spacing: 0px;
	line-height: 0px;
	color: rgba(255, 255, 255, 1);
	text-align: left;
	vertical-align: top;
	margin: 22px;
	
	float: left;
	padding-bottom: 23px;//下滑线与文字中间的距离
	border-bottom: 5px solid rgba(255, 255, 255, 1);     
}
.topbar {
	font-size: 24px;
	font-weight: 400;
	letter-spacing: 0px;
	line-height: 0px;
	color: rgba(255, 255, 255, 1);
	text-align: left;
	vertical-align: top;
	margin: 22px;
	
	float: left;
	
}
</style>