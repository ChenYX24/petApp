<template>
	<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="pageContent">
			<view class="pictureInput">
				
				<view class="inputBox">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="input">{{date}}</view>
					</picker>
					<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/picture&name/pen.png" mode="aspectFill"></image>
				</view>
				<image :src="this.breed==1?'https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectTime/dogHome.png':this.breed==2?'https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectTime/catHome.png':'https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/IDCreate/selectTime/dogHome.png'" mode="widthFix" class="picture"></image>
				<view class="text">
					{{name}}已经来到这个家{{trueDate}}天啦~
				</view>
			</view>
			
			<view class="buttonBox">
				<view class="button1">
					跳过,暂不确定
				</view>
				<view class="button2" :class="{ active: isActive }" @tap="nextpage">
					确认
				</view>
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
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				Text:"选择到家日期",
				placeholderText:"#cea697",
				inputValue: '',
				imageSrc: '',
				breed:'',
				name:'',
				date: '请选择ta的到家日期',
				trueDate:'xx',
				currentDate:currentDate
			};
		},
		 computed: {
			 startDate() {
				 return this.getDate('start');
			 },
			 endDate() {
				 return this.getDate('end');
			 },
		    isActive() {
		      return this.trueDate !== 'xx';
		    }
		  },
		  onLoad() {
		  	this.breed=uni.getStorageSync('breed');
			this.name=uni.getStorageSync('petName');
		  },
		  methods:{
			  bindDateChange: function(e) {
				  this.date = e.detail.value
				  this.trueDate=this.getDaysSinceDate(e.detail.value,this.currentDate)
			  },
		   getDate(type) {
					  const date = new Date();
					  let year = date.getFullYear();
					  let month = date.getMonth() + 1;
					  let day = date.getDate();
					  if (type === 'start') {
						  year = year - 60;
					  } else if (type === 'end') {
						  //当天结束
						  year = year;
					  }
					  month = month > 9 ? month : '0' + month;
					  day = day > 9 ? day : '0' + day;
					  return `${year}-${month}-${day}`;
				  },
				   getDaysSinceDate(dateString,nowDateString){
				    const date = new Date(dateString); // 将字符串转换为Date对象
				    const now = new Date(nowDateString); // 获取当前时间
				    const diff = now.getTime() - date.getTime(); // 计算时间差的毫秒数
				    const days = Math.floor(diff / 86400000); // 将时间差的毫秒数转换为天数
				    return days;
				  },
			  async nextpage(){
				  if(this.isActive){
					  console.log(this.date)
					  //#ifdef MP-WEIXIN
					  wx.setStorageSync('homeday', this.date);
					  //#endif
					  //#ifndef MP-WEIXIN
					  localStorage.setItem('homeday', this.date);
					  //#endif
				  }
				  
				  
				  //保存宠物的信息
				  await uni.request({
				      url: getApp().globalData.host+'/pet/save/',
					  method:'POST',
				      data: {	
						"userId": uni.getStorageSync("userId"),
						"age": uni.getStorageSync("breed"),
						"weight": "",
						"address": uni.getStorageSync("city"),
						"imageMatting": "",
						"petName": uni.getStorageSync("petName"),
						"isSterilization": uni.getStorageSync("xx"),//1表示未绝育  2表示已经绝育
						"dateOfArrival": uni.getStorageSync("homeday"),
						"sex": uni.getStorageSync("sex"),//性别1表示男  2表示已经女
						"petPhoto": uni.getStorageSync("petImage"),
						"birthday": uni.getStorageSync("birthday"),
						"petType": "",
				      },
				      header: {
				  		"Content-Type": 'application/json',
				  		"Authorization": uni.getStorageSync("token")
				      },
				      success: (res) => {
				          console.log(res.data.pet.imageMatting);
						  //#ifdef MP-WEIXIN
						  wx.setStorageSync('petImageMatting', res.data.pet.imageMatting);
						  //#endif
						  //#ifndef MP-WEIXIN
						  localStorage.setItem('petImageMatting', res.data.pet.imageMatting)
						  //#endif
				      },
				  	  complete: () => {
						  uni.navigateTo({
						  	 url: `/pages/IDCreate/IDCreate7/IDCreate7`,
						  })
						  
						  
				  	  }
				  });
				  
			  },
		  }
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
	.pictureInput{
		position: absolute;
		top: 3rem;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
	}
	.picture{
    width: 70vw;
    height: 66vw;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
	}
	.text{
		font-size: 15pt;
		color: #cea697;
		opacity: 1;
		font-weight: bolder;
	}
	.inputBox{
		margin-top: 3rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		align-items: center;
		width: 90vw;
		height: 8vh;
		background-color: #fdfcfa;
		border-radius: 3vw;
		/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
		box-shadow: 7px 11px 20px 1px rgb(249, 189, 125, 0.7);
		picker
		{
			display: flex;
			flex-direction: row;
			align-content: center;
			justify-content: flex-start;
			align-items: center;
			width: 80%;
			height: 80%;
			.input{
			color: #cea697;
			}
		}

		image{
			width: 2rem;
			height: 2rem;
			z-index: 99;
		}
	}
	

	.buttonBox{
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 10rem;
		.button1{
			height: 3rem;
			border: solid #f4d29f;
			box-shadow: 11px 15px 24px -9px rgb(249, 189, 125 , 70%);
			border-radius: 2rem;
			padding: 0.5rem;
			width: 15rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 12pt;
			color: rgba(206,166,151,0.67);
		}
		.button2{
			height: 3rem;
			background-color:rgba(221,221,221,1) ;
			border-radius: 2rem;
			padding: 0.5rem;
			width: 15rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 1rem;
			color: #fff;
			font-weight: bold;
			font-size: 18pt;

		}
		.button2.active{
			background-color:rgba(252,165,71,0.67)!important ;
			box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
		}
	}



</style>
