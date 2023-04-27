<template>
<view class="IDBG">
		<nav-bar :text="Text"></nav-bar>
		<view class="cardContainer">

			<idCard v-for="(item, index) in idCardList" :key="index" :dataList="item"></idCard>
			<view class="icon make" @tap="addCard">
				<view class="makeText">
					+
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import navBar from '/components//navBar/navBar.vue';
	import idCard from '/components//IDCard/IDCard.vue';
	export default {
		components: {
		  navBar,
		  idCard
		},
		data() {
			return {
				Text:"宠物身份证"
			};
		},
		computed:{
			idCardList(){
				return uni.getStorageSync('idCardList')
			},
		},
		methods:{
			addCard(){
				uni.navigateTo({
					url:"/pages/IDCreate/IDCreate/IDCreate"
				})
			}
		}
	}
</script>

<style lang="less">
.IDBG {
  background-color: #fff4f2;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
	.cardContainer{
		position: relative;
		top: 2%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
	}
.icon.make {
  width: 332px;
  height: 165px;
  opacity: 1;
  border-radius: 25px;
  background: linear-gradient(
    270deg,
    rgba(255, 243, 202, 1) 0%,
    rgba(255, 253, 247, 1) 100%
  );
  box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
}
	.makeText{
	opacity: 1;
    font-size: 80pt;
    font-weight: 900;
    color: #e6d1c6;
	position: relative;
	top: -4%;
}
</style>
