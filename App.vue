<template>
  <view class="app">
  </view>
</template>

<script>
export default {

 data() {
    return {
    }
  },
  async onShow() {
  	uni.hideHomeButton()
  },

}
</script>

<style lang="scss">

 // uni-tabbar {
 //        .uni-tabbar { // tab背景
 //            background-image: linear-gradient(to top, #FAF8F8, #FFFFFF)!important; // tab背景图片或者渐变色，背景色和背景图片最多选择一个进行设置
	// 		border-top-left-radius: 30px!important;
	// 		border-top-right-radius: 30px!important;
	// 		box-shadow: 0px -12px 10px -10px rgb(252 223 205 / 50%) !important;
	// 		.uni-tabbar-border { // tabBar上边框
 //                background-color: #F7F4F4!important; // tabBar上边框的颜色
 //            }
 //            .uni-tabbar__bd { // tabBar单项
 //                .uni-tabbar__icon { // 图标
 //                    width: 48upx!important;
 //                    height: 48upx!important;
 //                }
	// 			.uni-tabbar__icon:nth-child(3){
	// 				width: 60upx!important;
	// 				height: 60upx!important;
	// 			}
 //                .uni-tabbar__label { // 文字
 //                    font-size: 80upx!important;
 //                }
 //            }
	// 		.uni-tabbar__icon.uni-tabbar__icon__diff {
	// 		    margin-top: 30px
	// 		}
 //        }
 //    }
</style>
