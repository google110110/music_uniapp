<template>
	<view class="mvvm">
		<view class="index-title">
			<view class="index-tit-cont">
				排行榜TOP
			</view>
			<view class="index-tit-more" @click="navMvTop" hover-class="bg_gray">
				更多数据<uni-icons type="arrowright" size="11"></uni-icons>
			</view>
		</view>
		<view class="mvvm-list">
			<view class="" v-for="(item, index) in top" :key="index">
				<mv :mv="item" :getmv="getmv"></mv>
			</view>
		</view>
		<view class="index-title">
			<view class="index-tit-cont">
				精选MV
			</view>
		</view>
		<view class="mvvm-list">
			<view class="" v-for="(item, index) in personalized" :key="index">
				<mv :mv="item" :getmv="getmv"></mv>
			</view>
		</view>
		<view class="index-title">
			<view class="index-tit-cont">
				最新MV
			</view>
		</view>
		<view class="mvvm-list">
			<view class="" v-for="(item, index) in first" :key="index">
				<mv :mv="item" :getmv="getmv"></mv>
			</view>
		</view>
		<view class="index-title">
			<view class="index-tit-cont red">
				精彩MV
			</view>
		</view>
		<view class="mvvm-mv">
			<!-- <my-ideos :url="mvurl" :autoplay="false"></my-ideos> -->
			<view class="" v-for="(item, index) in allmv" :key="index">
				<view class="video-img">
					<view class="video-play" v-if="flag != item.id" @click="videoPlay(item.id)">
						<image class="" src="../../static/tabs/mv.png" mode=""></image>
					</view>
					<image v-if="flag != item.id" :src="item.cover" mode=""></image>
					<video class="mv-video" v-if="flag == item.id" :src="src" controls autoplay page-gesture show-fullscreen-btn @error="error"></video>
				</view>
				<view class="video-tit sl" hover-class="video-tit-red" @click="getmv(item.id)">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mv from '@/components/mv/index.vue'
	import myVideos from "../../components/myvideo/index.vue"
	export default {
		data() {
			return {
				alltype:['内地','港台','欧美','日本','韩国'],
				src:'',
				allmv:[],
				personalized:{},
				first:{},
				top:{},
				offset:0,
				flag:0,
				before:true
			}
		},
		components:{
			mv,
			'my-videos':myVideos
		},
		onLoad() {
			this.getMvPersonalized()
			this.getMvFirst()
			this.getMvTop()
			this.getMvAll()
		},
		onReachBottom() {
			if(this.before){
				this.getMvAll()
			}
		},
		methods: {
			error(){
				uni.showModal({
					content: '视频加载错误',
					showCancel: false
				})
			},
			getmv(id){
				uni.navigateTo({
					url: `../mvdetails/mvdetails?id=`+id
				})
			},
			navMvType(){
				uni.navigateTo({
					url: "../mvtype/mvtype"
				})
			},
			navMvTop(){
				uni.navigateTo({
					url: "../mvtop/mvtop"
				})
			},
			getMvPersonalized(){
				this.$request({
					url:'/personalized/mv'
				}).then((data)=>{
					if(data.data.code == 200){
						let personalized = data.data.result
						personalized = personalized.map((item)=>{
							return {
								...item,
								cover:item.picUrl
							}
						})
						this.personalized = personalized
						console.log(personalized,'推荐')
					}
				})
			},
			getMvFirst(){
				this.$request({
					url:'/mv/first?limit=4'
				}).then((data)=>{
					if(data.data.code == 200){
						this.first = data.data.data
						console.log(this.first,'最新mv')
					}
				})
			},
			getMvTop(){
				this.$request({
					url:'/top/mv?limit=2'
				}).then((data)=>{
					if(data.data.code == 200){
						this.top = data.data.data
						console.log(this.top ,'最新mv')
					}
				})
			},
			getMvAll(area){
				let url = ''
				if(area){
					url = '/mv/all?area='+area+'&limit=5&offset='+this.offset
				}else{
					url = '/mv/all?&limit=5&offset='+this.offset
				}
				this.$request({
					url:url
				}).then((data)=>{
					if(data.data.code == 200){
						let allmv = data.data.data
						if(allmv.length < 5){
							this.before = false
						}
						this.allmv.push(...allmv)
						this.offset = this.offset+5
						console.log(this.allmv ,'全部',url)
					}
				})
			},
			videoPlay(id){
				this.$request({
					url:"/mv/url?id="+id
				}).then((data)=>{
					if(data.data.code == 200){
						this.src = data.data.data.url
						this.flag = id
						console.log(this.src)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.mvvm{
	.mvvm-mv{
		padding: 50rpx 10rpx;
		width: 100%;
		box-sizing: border-box;
		// height: 500rpx;
		margin-bottom: 30rpx;
		font-size: 25rpx;
		font-weight: 550;
		line-height: 40rpx;
		color: #6a6a6a;
		&>view{
			border-radius: 15rpx;
		}
		.hover-video{
			background-color: #C0C0C0;
		}
		.video-img{
			margin-top: 50rpx;
			width: 100%;
			height: 400rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;
			image{
				width: 100%;
				height: 100%;
			}
			.mv-video{
				width: 100%;
				height: 100%;
				// width: 500rpx;
				// height: 300rpx;
			}
			.video-play{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 150rpx;
					height: 120rpx;
				}
			}
		}
		&>view{
			padding: 0 30rpx;
		}
		.video-tit-red{
			color: #faf8f3;
			background-color: #828282;
		}
		.video-tit{
			border-radius: 10rpx;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 30rpx;
		}
	}
	.red{
		color: red;
		font-size: 35rpx !important;
		font-weight: normal !important;
	}
	.bg_gray{
		color: gray !important;
		font-weight: bold;
	}
	.mvvm-list{
		width: 750rpx;
		box-sizing: border-box;
		padding: 10rpx 18rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		&>view{
			width: 356rpx;
			box-sizing: border-box;
			padding: 3rpx 5rpx;
		}
	}
	.index-title{
		margin-top: 20rpx;
		width: 750rpx;
		font-size: 28rpx;
		display: flex;
		color: #a3a3a3;
		view{
			height: 60rpx;
			line-height: 60rpx;
			width: 50%;
			box-sizing: border-box;
			letter-spacing: 4rpx;
			font-weight: 650;
			padding: 0 40rpx;
		}
		.index-tit-cont{
			letter-spacing: 6rpx;
			font-size: 30rpx;
		}
		.index-tit-more{
			text-align: right;
			color: red;
		}
	}
}
</style>
