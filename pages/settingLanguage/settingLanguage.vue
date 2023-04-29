<template>
	<view class="IDBG">
		<nav-bar :text="Text" :Nav="Nav"></nav-bar>
		<view class="pageContent">
			<view class="settingContainer">
				<view v-for="(item,index) in name" :key="index" :class="index === name.length - 1 ? 'last-item' : 'item'" @tap="toggleIndex(index)">
					<view class="setBox">
						<view class="setText">
							{{item}}
						</view>
						<view v-if="isActive===index" class="setD">
							√
						</view>
					</view>
				</view>
			</view>
			<view class="buttonGroup">
				<view class="button2" :class="{ active: isActive!=-1 }" @tap="nextpage">
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
			return {
				Text:"设置语言",
				Nav:"/pages/setting/setting",
				isActive: 0,
				name:["跟随系统","简体中文","繁体中文","English","日本語","한국어"]
			};
		},
		  methods: {
			  nextpage(){
				  if(this.isActive!=-1){			  
					uni.navigateTo({
					 url: "/pages/setting/setting"
					})    
				  }
			},
			toggleIndex(index){
				if(this.isActive===index)
				{
					this.isActive=-1
				}
				else
				{
					this.isActive=index
				}
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
		flex-direction: column;
		align-content: center;
		justify-content: flex-start;	
		align-items: center;
		position: relative;
		top: 0rem;
		height: 100%;
	}
	.settingContainer{
		margin-top: 2rem;
		width: 80vw;
		// height: 199px;
		opacity: 1;
		border-radius: 25px;
		background: rgba(255, 253, 247, 1);
		box-shadow: 5px 10px 5px 0px rgba(239, 219, 208, 0.25);

	}
	.last-item>.setBox
	{
		margin-bottom: 12px!important;
	}
	:not(.last-item)>.setBox{
		border-bottom: 2px solid rgba(206, 166, 151, 0.15);
		
	}
	.setD{
		width: 25px;
		height: 25px;		
		color: rgba(230, 209, 198, 1);
		font-size: 18px;
		font-weight: 700;
	}
	.setBox{
		    display: flex;
		    flex-direction: row;
		    justify-content: space-between;
		    align-items: center;
		    padding-bottom: 5px;
			margin: 15px;
	}

	.setText{
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0px;
		line-height: 26.06px;
		color: rgba(230, 209, 198, 1);
		text-align: left;
		vertical-align: top;
		margin-left: 5px;
	}

	.buttonGroup
	{
		position: absolute;
		bottom:10rem;
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

</style>
