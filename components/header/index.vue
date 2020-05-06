<template>
	<view class="header-content">
		<!-- <view class="cont" @click="contClick"> -->
		<view class="cont" @click="contClick">
			<uni-icons type="bars" size="20"></uni-icons>
		</view>
		<view class="tit">
			发现音乐
		</view>
		<view class="ser" @click="serClick">
			<uni-icons type="search" size="20"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		// props:['contClick','serClick'],
		methods:{
			contClick(){
				this.$emit('contClick')
			},
			serClick(){
				this.$emit('serClick')
			}
		}
	}
</script>

<style lang="scss">
	.header-content{
		box-sizing: border-box;
		padding: 0 30rpx;
		text-align: center;
		height: 80rpx;
		width: 750rpx;
		display: flex;
		color: #797979;
		font-size: 30rpx;
		line-height: 80rpx;
		font-family: "仿宋";
		font-weight: 700;
		view{
		}
		.tit{
			flex: 1;
		}
	}
</style>
