<template>
	<view class="fm">
		<view class="fm-list" v-for="(item, index) in fmList" :key="index">
			<view class="fm-img" @click="getFmId(item)">
				<image :src="item.album.picUrl" mode=""></image>
			</view>
			<view class="fm-cont">
				<view class="fm-name sl">
					{{item.name}}
				</view>
				<view class="fm-name sl">
					{{item.artists[0].name}}
					<view class="" v-if="item.artists[1]">
						/{{item.artists[1].name}}
					</view>
				</view>
				<view class="fm-avaname sl">
					{{item.album.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fmList:[]
			};
		},
		onLoad() {
			this.getFm()
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
			this.getFm()
		},
		methods:{
			getFmId(item){
				console.log(item.id)
				uni.navigateTo({
					url:'../music/music?id='+item.id
				})
				let items = {
					...item,
					al:{
						picUrl:item.album.picUrl,
						name:item.artists[0].name
					}
				}
				let playlist = {
					tracks:[items]
				}
				uni.setStorageSync('playlist',playlist)
			},
			getFm(){
				this.$request({
					url:"/personal_fm"
				}).then((data)=>{
					if(data.data.code == 200){
						this.fmList = data.data.data
						console.log(this.fmList)
						uni.stopPullDownRefresh()
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.fm{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.fm-list{
		border-radius:10rpx;
		background-color: rgba(0,0,0,0.3);
		width: 80vw;
		margin-top: 3vh;
		.fm-img{
			image{
				margin:  0 auto;
				width: 80vw;
				max-height: 25vh;
				border-radius: 10rpx;
			}
		}
		.fm-cont{
			// position: absolute;
			margin:  0 auto;
			width: 80vw;
			height: 5vh;
			box-sizing: border-box;
			padding: 0 70rpx;
			font-size: 22rpx;
			line-height: 1.5vh;
			color: #fafaec;
			.fm-name{
				view{
					width: 80vw;
					display: inline;
				}
			}
		}
	}
}
</style>
