<template>
	<view  class="tips" :class="['tips', { 'bg-yellow': flag, 'bg-red': !flag }]">
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
		      required: false,
			  },
			flag: {
			  type: Boolean,
			  default: false,
			},
		    
		},
	}
</script>

<style lang="less">
.tips {
    margin: 0.7rem;
    width: 85vw;
    min-height: 20vh;
    max-height: 20vh;
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
.text{
	font-weight: bold;
	margin-left: 2rem;
	margin-top: 1rem;
}
.bg-yellow {
  z-index: 99;
  background: linear-gradient(90deg, #fff3ca, #fffdf7);
}

.bg-red {
  z-index: 99;
  background: linear-gradient(90deg, #ffdac9, #fffdf7);
}
</style>