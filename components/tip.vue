<template>
	<view  class="tips">
		<text class="text"> {{text}}</text>
	</view>
</template>

<script>
	export default {
		name:"tip",
		data() {
			return {
				
			};
		},
		props: {
		    text: {
		      type: String,
		      required: true,
		    },
		},
	}
</script>

<style lang="less">
.tips{
	margin: 0.7rem;
	width: 85%;
	height: 20vh;
	border-radius: 1.2rem;
	background-color: #fff3cd;
	display: flex;
	position: relative;
	flex-direction: row;
	align-content: center;
    align-items: flex-start;
	justify-content: flex-start;
	top:2rem;
	box-shadow: 7px 11px 20px 1px rgb(249, 189, 125, 0.7);
	color: rgb(127, 112, 75) ;
	font-size: 15pt;
	
}
.tips:not(:first-of-type) {
  color: rgb(166, 146, 96) ;
}
.text{
	font-weight: bold;
	margin-left: 2rem;
	margin-top: 1rem;
}
</style>