<template>
	<view class="chooseLocation">

		<view class="section">
		<view class="inputBox">
		<input v-model="keywords"
		:class="{ 'active': keywords === ''}" 
		type="text" placeholder="输入关键字" 
		placeholder-class="text" focus="true"/>
		 <image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/planet/position.png" mode="aspectFill" ></image>
		</view>
		</view>

		
		
		<view v-for="item in tipLocations" class="text_box" @click="chooseWhat(item.name)">
			{{item.name}}
		</view>
	</view>

</template>

<script>
	import amap from '../ThirdPartySDK/amap-wx.130.js'; 
	export default {
		name:"chooseLocation",
		props:{
			
		},
		data() {
			return {
				NowLocation:'华南理工大学C10',
				amapPlugin: null,
				key: '53142a6ebba0f0d52481e81910658876',//高德key
				keywords: '',
				tipLocations: [
					
				]
			};
		},
		onLoad() {
		        this.amapPlugin = new amap.AMapWX({  
		            key: this.key  
		        });  
		},
		created() {
			this.getNowLocation();
		},
		watch: {
			keywords(newVal){
				if(newVal!==''){
					this.getTipLocations();
				}
				else{
					this.getNowLocation();
				}

			}
		},
		methods:{
			chooseWhat(trueLocation){
				console.log(trueLocation);
				this.$emit("chooseWhat",trueLocation);
			},
			getNowLocation(){
				this.amapPlugin = new amap.AMapWX({
				    key: this.key  
				});  
				uni.showLoading({  
						title: '获取信息中'  
					});  
					this.amapPlugin.getRegeo({  
						success: (data) => {  
							console.log(data);
							var temp=[{name: ''}]
							temp[0].name=data[0].name;
							this.tipLocations = temp;  
							uni.hideLoading();  
						}  
					});  
			},
			getTipLocations(){
				
				this.amapPlugin = new amap.AMapWX({
				    key: this.key  
				});  
				uni.showLoading({
					title: '获取信息中'  
				});  
				const that=this;
				this.amapPlugin.getInputtips({
					keywords: this.keywords,
					location: '',
					success: function(data){
						console.log(data)
					  if(data && data.tips){ 
						  that.tipLocations=data.tips;
					  }
					  uni.hideLoading();
					}
				});
			}
		}
	}
</script>

<style lang="less">
.chooseLocation{
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: flex-start;
	overflow: auto;
	width: 100vw;
	height: 100vh;
	opacity: 1;
	background: rgba(255, 253, 247, 1);
	box-shadow: 0px -10px 5px 0px rgba(247, 142, 72, 0.25);
}
.section{
display: flex;
position: relative;
flex-direction: column;
align-items: center;
z-index: 1;
top: 50px;
  height: 30px;
  width: 100%;
  align-items: center;
}
.text_box{
  top: 150px;
  margin: 10px 25px;
  position: relative;
  border-bottom:1px solid #c3c3c3;
  padding-bottom:10px;
  
}
.inputBox{
		margin-top: 0px;
		top: 2vh;
		display: flex;
		position: absolute;
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
		.input{
			width: 80%;
			height: 80%;
			color: #cea697;
		}
		image{
			width: 2rem;
			height: 2rem;
			z-index: 99;
		}

		.picker-text {

		  font-size: 16px;
		  color: #cea697;
		}
		.picker{
			display: flex;
			flex-direction: row;
			align-content: center;
			justify-content: flex-start;
			align-items: center;
			width: 80%;
			height: 80%;
		}
}
</style>