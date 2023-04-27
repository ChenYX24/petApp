<template>
	<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="pageContent" >
			<view class="IDCard" :style="{backgroundImage: `url(${this.sexImg})`}">
				<view class="IDText">
					<view class="name">
						{{name}}
					</view>
					<view class="sex">
						{{sex}}
					</view>
					<view class="birthday">
						{{birthday}}
					</view>
					<view class="city">
						{{city}}
					</view>
				</view>				
				<image :src="Image" class="IMG" mode="aspectFit" :style="{backgroundImage: `url(${this.ImgBackground})`}"></image>
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
			this.name="姓名 "+uni.getStorageSync('petName')
			this.breed=uni.getStorageSync('breed')
			this.sex=uni.getStorageSync('sex')
			this.city=uni.getStorageSync('city')
			if(!this.city){
				this.city="位置 未知"
			}
			else
			{
				this.city="位置 "+this.city
			}
			let birthday=new Date(uni.getStorageSync('birthday'))
			if(this.sex==1)
			{
				this.sexImg="/static/IDCreate/final/IDBOY.png"
				this.ImgBackground="/static/IDCreate/final/BIMG.png"
				this.sex="性别 弟弟"
			}
			else{
				this.sexImg="/static/IDCreate/final/IDGIRL.png"
				this.ImgBackground="/static/IDCreate/final/GIMG.png"
				this.sex="性别 妹妹"
			}
			this.birthdayY=birthday.getFullYear();
			this.birthdayM=this.padZero(birthday.getMonth() + 1)
			this.birthdayD=this.padZero(birthday.getDate());
			this.birthday="生日 "+this.birthdayY+"年  "+this.birthdayM+"月  "+this.birthdayD+"日"
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
				Image:"/static/home/cat.png",
				ImgBackground:"",
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
		position: relative;
		top: 0rem;
		height: 100%;
	}
	.IDCard{
		background-size: cover;  /* 缩放图像以填满元素 */
		background-position: center;  /* 将图像居中 */
		width: 100%;
		height: 60vw;
		display: grid;
		align-items: center;
		justify-items: center;
		grid-template-columns: 10vw 50vw 32vw 8vw;;
	}
	.IMG{
		width: 100%;
		height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: repeat-x;
	}
	.IDText{
		grid-column-start: 2;
		    white-space: nowrap;
			
	}

</style>
