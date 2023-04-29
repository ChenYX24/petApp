<template>
	<view  class="tips"  :class="['tips', { 'bg-yellow': flag, 'bg-red': !flag }]" v-for="(item, index) in list" :key="index" @click="tipchange(item,index)">
		<image src="https://tuanpet-cyx.oss-cn-guangzhou.aliyuncs.com/static/notebook/删除.png" class="img" @click.stop="remove(index)"></image>
		<text class="Text" > {{ item }}</text>
	</view>
</template>

<script>
	export default {
		name:"tip",
		data() {
			return {
				textValue: "", // 存储来自父组件的text属性的值
			};
		},
		methods:{
     tipchange(item, index) 
     {   wx.setStorageSync('myData', { item, index });
		 uni.navigateTo({ url: `/pages/notebook/notebookForm`, // 传递参数 
    success: function() { uni.$emit("tipchange", { item, index }); 
	  }, }); 
	    },
		remove(index){
				  console.log(index);
				    this.list.splice(index, 1); // 删除对应的提示信息
		},
      },

		props: {
		    list: {
		      type: String,
		      required: true,
			  },
            
			flag: {
			  type: Boolean,
			  default: false,
			},
		    
		},
		watch: {
		    text(newValue) {
		      this.textValue = newValue; // 监听text属性的变化，并将新值赋给textValue
		    },
		  },
	}
</script>

<style lang="less">
.tips {
    margin: 0.7rem;
    width: 85vw;
    min-height: 20vh;
    overflow-wrap: anywhere;
    border-radius: 1.2rem;
    background-color: #fff3cd;
    display: flex;
    position: relative;
    flex-direction: row;
    align-content: center;
    align-items: flex-start;
    justify-content: flex-start;
    top: 2rem;
	background: linear-gradient(90deg, #fff3cc, #fffdf7);
    box-shadow: 7px 11px 20px 1px rgb(249, 189, 125, 0.7);
    color: rgb(127, 112, 75);
    font-size: 15pt;
}
.tips:not(:first-of-type) {
  color: rgb(166, 146, 96) ;
}
.Text{
	font-weight: bold;
	margin-left: 2rem;
	margin-top: 1rem;
	margin-right: 1rem;
}
.bg-yellow {
  z-index: 99;
  background: linear-gradient(90deg, #fff3ca, #fffdf7);
}
.img{
	position: absolute;
	width:3rem;
	height:3rem;
	right:0;
	top:0;
	z-index: 99;
}
.bg-red {
  z-index: 99;
  background: linear-gradient(90deg, #ffdac9, #fffdf7);
}
</style>