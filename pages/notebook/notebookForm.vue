<template>
	<view class="notebookForm">
		
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
   <view class="form">
       <view class="input-container">
		<image class="icon" src="/static/notebook//宠物 .png" mode="aspectFill" />
        <input v-model="text1" :class="{ 'active': text1 !== '' }" type="text" placeholder="小羽" placeholder-style="color:#cea697;"/>
       </view>
	
    <view class="input-container">
	 <image class="icon" src="/static/notebook//备忘录.png" mode="aspectFill" />
      <input v-model="text2" :class="{ 'active': text2 !== '' }" type="text" placeholder="输入事件名称，如洗澡" placeholder-style="color:#cea697;" />
    </view>
	
    <view class="input-container" >
      <image class="icon" src="/static//notebook/时间.png"/>
      <input v-model="text3" :class="{ 'active': text3 !== '' }" type="text" placeholder="时间" placeholder-style="color:#cea697;" />
    </view>
	
    <view class="input-container">
      <image class="icon" src="/static/planet/position.png" />
      <input v-model="text4" :class="{ 'active': text4 !== '' }" type="text" placeholder="地点" placeholder-style="color:#cea697;"/>
    </view>
	
	 <view class="selectBox">
		<view class="image-wrapper" @tap="selectLeft">
		  <image :src="leftImageUrl" class="image" />
		  <view class="text" :style="{color:leftSelected?'rgba(230, 209, 198, 1)':'#9f9f9f'}">
		  	提醒
		  </view>
		</view>
		<view class="image-wrapper" @tap="selectRight">
		  <image :src="rightImageUrl" class="image" />
		  <view class="text" :style="{color:rightSelected?'rgba(230, 209, 198, 1)':'#9f9f9f'}">
		  	记录
		  </view>
		</view>
	 </view>
  </view>
	
	<view class="beizhu">
		<image src="/static//notebook/提醒.png" mode="aspectFill"></image>
		<input  type="text" placeholder="其他备注"  :class="{ 'active': inputValue||text1 !== '' }" class="input" placeholder-style="color:#cea697;" v-model="inputValue"/>
	</view>
		
	<view class="buttonBox">
		<view class="button2" :class="{ active: isActive }" @tap="buttonClicked">
			发布
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
			return {
				tapchangeReceived: false,
				Text:"新建提醒/记录",
				items: [],
				inputValue: '',
				text1:'',
				Nav:"/pages/notebook/notebook",
				text2:'',
				text3:'',
				text4:'',
               leftSelected: true,
			   rightSelected: false,
			   leftImageUrl: '/static/notebook/选择_已选择.png',
			   rightImageUrl: '/static/notebook/选择_未选择.png',
			   thirdImageUrl: '/static/notebook/选择_已选择.png',
			   fourthImageUrl: '/static/notebook/选择_已选择.png',
			   indexInForm:-1,
			}
		},
		onShow() {
		    // 每次页面显示时清空之前的数据
		    this.dataList = []
		    // 重新加载页面数据

		  },
		  
		methods: {
			onOptionChanged(event) {
			      console.log(event.detail.value)
			    },
			buttonClicked(){
			
            const data = `${this.text1}\n${this.text2}\n${this.text3}\n${this.text4}\n${this.inputValue}`         
            const leftSelected = this.leftSelected ? '1' : '0'
            const rightSelected = this.rightSelected ? '1' : '0'
			const indexInForm=this.indexInForm
			
			uni.request({
			     url: 'http://43.140.198.154:88/reminder/save/',
			     method:'POST',
			        data: {
			           
			             "reminderId": 0,
			             "petId": 0,
			             "userId": 0,
			             "reminderName": "string",
			             "type": "string",
			             "content": data,
			             "plannedDate": "string",
			             "period": "string",
			             "isDone": "string",
			             "advanceDay": "string",
			             "reminderTimeMoment": "string"
			           
			        },
			     params: {interfaceState:'state'},
			        header: {
			      "Content-Type": 'application/json',
			      "Authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvdVZjVzQwdGZzcmlmM3ZzQ3pmRjdFcjRqTm04Iiwic2Vzc2lvbl9rZXkiOiIyMDFCTkVBUFEzcENreDVra0E1aTB3PT0iLCJleHAiOjE2ODI1ODExMDF9.0XkPv_JsFnT5ByDqoJJ9WTbwcD5TGTPeUC5ZYy77zBc'
			        },
			        success: (res) => {
			            console.log(res.data);
			        },
         
			    });
			
            if (this.isActive) {
              uni.navigateTo({
                  url: `/pages/notebook/notebook?data=${encodeURIComponent(data)}&leftSelected=${leftSelected}&rightSelected=${rightSelected}&indexInForm=${indexInForm}`,
                  success: () => {
                    uni.$emit('buttonClicked')
                  }
                })
             }
         },
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
		mounted() {
		  uni.$on("tapchange", () => {
		    this.tapchangeReceived = true;
		  });
		},
		onLoad() {
			
		    const data = wx.getStorageSync('myData');
		    this.indexInForm = data.index;
		    const items = data.item.split('\n');
		    this.text1 = items[0] || '';
		    this.text2 = items[1] || '';
		    this.text3 = items[2] || '';
		    this.text4 = items[3] || '';
		    this.inputValue = items[4] || '';
		  },

		computed: {
		   isActive() {
		     return (this.inputValue.trim() !== '')||(this.text1.trim() !== '')||(this.text2.trim() !== '')||(this.text3.trim() !== '')||(this.text4.trim() !== '');
		   }
		 },

	}
</script>

<style lang="less">
.notebookForm{
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
    width: 100vw;
    height: 100vh;
	opacity: 1;
	background: linear-gradient(90deg, rgba(255, 243, 202, 1) 0%, rgba(255, 253, 247, 1) 100%), rgba(255, 253, 247, 1);
	box-shadow: 0px -10px 5px 0px rgba(247, 142, 72, 0.25);
}
.form{
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	top: 8vh;
	width: 90vw;
	height: 30vh;
	opacity: 1;
	border-radius: 25px;
	background: rgba(255, 253, 247, 1);
	box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
}
.input-container {
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-content: center;
 align-items: center;
  height: calc(16% - 5px);
  margin: 5px 0;
  margin-left: 4vw;
  width: 90%;
  border-bottom: 1px solid rgba(206, 166, 151, 0.15);
  input {
		margin-left: 2vw;
		width: 80%;
		height: 80%;
		color: #cea697;
		font-weight: bold;
  }
  
 .active {
   color:rgba(130, 65, 0, 1);
 }
  .icon{
		width: 2rem;
		height: 2rem;
		z-index: 99;
  }

}

//单选框
.selectBox{
		display: flex;
		flex-direction: row;
		margin-left: 38vw;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 1vh;
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

//备注框
.icon {
  width: 20%;
  margin-right: 5%;
}

.beizhu{
    position: absolute;
	display: flex;
	left: 22px;
	top: 50vh;
	height: 9vh;
	opacity: 1;
	border-radius: 25px;
	box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
	font-size: 16px;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
	width: 90vw;
	height: 8vh;
	background-color: #fdfcfa;
	/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */

	input{
		margin-left: 2vw;
		width: 80%;
		height: 80%;
		color: #cea697;
		font-weight: bold;
	}
	.active {
	  color:rgba(130, 65, 0, 1);
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
		align-content: center;//交叉轴方向上居中对齐
		justify-content: center;//水平方向上居中对齐
		align-items: center;
		position: absolute;
		bottom: 10rem;

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
			font-size: 18pt;//字体大小

		}
		.button2.active{
			background-color:rgba(252,165,71,0.67)!important ;
			box-shadow: 11px 15px 24px -9px rgba(249, 189, 125, 0.7);
		}
	}
</style>