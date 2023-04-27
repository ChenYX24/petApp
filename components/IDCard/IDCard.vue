<template>
	<view class="IDCard" :style="{backgroundImage: `url(${this.sexImg})`}" @tap="click">
		<view class="IDText" :style="{color:`${this.textColor}`}">
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
</template>

<script>
	export default {
		name:"IDCard",
		data() {
			return {
				
			};
		},
		computed: {
			name() {
				let name=this.dataList.name
				return name;
			},
			city(){
				if(!this.dataList.city){
					return "位置 未知"
				}
				else
				{
					return "位置 "+this.dataList.city
				}
			},
			sexImg(){
				if(this.dataList.sex==1)
				{
					return "/static/IDCreate/final/IDBOY.png"
				}
				else{
					return "/static/IDCreate/final/IDGIRL.png"
				}
			},
			ImgBackground(){
				if(this.dataList.sex==1)
				{
					return "/static/IDCreate/final/BIMG.png"
				}
				else{
					return "/static/IDCreate/final/GIMG.png"
				}
			},
			sex(){
				if(this.dataList.sex==1)
				{
					return "性别 弟弟"
				}
				else{
					return "性别 妹妹"
				}
			},
			textColor(){
				if(this.dataList.sex==1)
				{
					return "#0e496f"
				}
				else{
					return "#ac496f"
				}
			},
			birthday(){
				let birthday=new Date(this.dataList.birthday)
				let a=birthday.getFullYear();
				let b=this.padZero(birthday.getMonth() + 1);
				let c=this.padZero(birthday.getDate());
				let day="生日 "+a+"年  "+b+"月  "+c+"日"
				return day
			},
			Image(){
				let img=this.dataList.Image
				return img
			}
		},
		props:{
			dataList:{
				type: Object,
			}
		},
		methods:{
			padZero(num) {
			   return num < 10 ? '0' + num : num;
			 },
		}
	}
</script>

<style lang="less">
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
		font-size: 11pt;
			
	}
</style>