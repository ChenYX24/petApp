<template>
	<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="pageContent">
			<image :src="this.sex"></image>
			<view class="name">
				{{name}}
			</view>
			<view class="city">
				{{city}}
			</view>
			<view class="birthdayY">
				{{birthdayY}}
			</view>
			<view class="birthdayM">
				{{birthdayM}}
			</view>
			<view class="birthdayD">
				{{birthdayD}}
			</view>
		</view>

	</view>
</template>

<script>
	import navBar from '/components//navBar/navBar.vue';
	export default {
		components: {
		  navBar,
		},
		onLoad: function () {
			this.name=uni.getStorageSync('petName')
			this.breed=uni.getStorageSync('breed')
			this.sex=uni.getStorageSync('sex')
			this.city=uni.getStorageSync('city')
			if(!this.city){
				this.city="未知"
			}
			let birthday=new Date(uni.getStorageSync('birthday'))
			if(this.sex==1)
			{
				this.sex="/static/IDCreate/final/IDBOY.png"
			}
			else{
				this.sex="/static/IDCreate/final/IDGIRL.png"
			}
			this.birthdayY=birthday.getFullYear();
			this.birthdayM=this.padZero(birthday.getMonth() + 1)
			this.birthdayD=this.padZero(birthday.getDate());
		},
		data() {
			return {
				Text:"创建完成",
				name:"",
				breed:"",
				sex:"",
				birthdayY:"",
				birthdayM:"",
				birthdayD:"",
				city:"未知",
				Image:"",
			};
		},
		  methods: {
			  nextpage(){
				  if(this.isActive){
					  uni.navigateTo({
					   url: `/pages/IDCreate/IDCreate3/IDCreate3`,
					  })  

				  }
			  },
			 padZero(num) {
			    return num < 10 ? '0' + num : num;
			  }
			},
			}
		     
</script>

<style scoped lang="less">
	.IDBG{
		background-color: #fff4f2;
		height: 100%;
		  position: fixed;
		  top: 0;
		  right: 0;
		  bottom: 0;
		  left: 0;
	}
	.pageContent{
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: flex-start;	
		align-items: center;
		position: relative;
		top: 0rem;
		height: 100%;
	}

</style>
