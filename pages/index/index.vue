<template>
	<view class="index-content">
		<view>
			<!-- <uni-header :contClick="getVisible"></uni-header> -->
			<uni-header @contClick="getVisible" @serClick="serClick"></uni-header>
			<!-- <view class="" @click="getVisible('uniDrawerShow')">
				444444444
			</view> -->
			<view class="index-swper">
				<swiper indicator-dots autoplay interval="4000" circular>
					<swiper-item v-for="(item, index) in albums" :key="index">
						<view>
							<image :src="item.blurPicUrl" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="menu-list">
				<view @click="mydaily">
					<view class="menu-item">
						<image src="@/static/icon/calendar.png" mode=""></image>
					</view>
					<view class="menu-name sl">
						每日推荐
					</view>
				</view>
				<view @click="navlist('../songlist/songlist')">
					<view class="menu-item">
						<image src="@/static/icon/songlist.png" mode=""></image>
					</view>
					<view class="menu-name sl">
						歌单列表
					</view>
				</view>
				<view @click="navlist('../top/top')">
					<view class="menu-item">
						<image src="@/static/icon/top.png" mode=""></image>
					</view>
					<view class="menu-name sl">
						排行榜
					</view>
				</view>
				<view @click="navlist('../radiostation/radiostation')">
					<view class="menu-item">
						<image src="@/static/icon/radiostation.png" mode=""></image>
					</view>
					<view class="menu-name sl">
						电台
					</view>
				</view>
				<view @click="myFm">
					<view class="menu-item">
						<image src="@/static/icon/fm.png" mode=""></image>
					</view>
					<view class="menu-name sl">
						私人FM
					</view>
				</view>
			</view>
			<view class="index-title">
				<view class="index-tit-cont">
					推荐歌单
				</view>
				<view class="index-tit-more" @click="moreSongList" hover-class="bg_gray">
					更多歌单<uni-icons type="arrowright" size="11"></uni-icons>
				</view>
			</view>
			<view class="index-recommend-list">
				<view class=""  v-for="(item, index) in result" :key="index" @click="navigateTo(item.id)">
					<songslist :songs_list="item"></songslist>
				</view>
			</view>
			<view class="index-title">
				<view class="index-tit-cont">
					歌曲/新碟
				</view>
				<view class="index-tit-more" hover-class="bg_gray" @click="moreNewSong">
					更多新歌<uni-icons type="arrowright" size="11"></uni-icons>
				</view>
			</view>
			<swiper :duration="1000" :style="{height:'644rpx'}">
				<swiper-item>
					<view class="swiper-item">
						<view class="" v-for="(item, index) in songs" :key="index">
							<song :song="item" :getsong="getsong1"></song>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="" v-for="(item, index) in dishs" :key="index">
							<song :song="item" :getsong="getsong2"></song>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="index-title">
				<view class="index-tit-cont">
					最新MV
				</view>
				<view class="index-tit-more" @click="getMvTab" hover-class="bg_gray">
					更多MV<uni-icons type="arrowright" size="11"></uni-icons>
				</view>
			</view>
			<view class="mv-list" v-show="mvlist">
				<view class="" v-for="(item, index) in mvlist" :key="index">
					<mv :mv="item" :getmv="getmv"></mv>
				</view>
			</view>
		</view>
		<view class="" v-if="fab">
			<uni-fab
				@trigger="trigger"
				:content="content"
			></uni-fab>
		</view>
		<uni-drawer ref="uniDrawerShow" class="uniDrawer">
		    <view style="padding:30rpx;" class="user-bbox" v-if="userMse.user">
				
				<view class="bg" :style="{'background-image':'url('+userMse.user.profile.backgroundUrl+')'}"></view>
				<view class="user-tit">账号信息</view>
				<view class="uni-ava">
					<image :src="userMse.user.profile.avatarUrl" mode=""></image>
				</view>
				<view class="uni-name">昵称 : <view class="f-n">{{userMse.user.profile.nickname}}</view></view>
				<view class="userId">UID : <view class="f-n">{{userMse.user.profile.userId}}</view></view>
				<view class="uni-birthday">生日 : <view class="f-n">{{userMse.user.birthday}}</view></view>
		    </view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniHeader from '@/components/header/index.vue'
	import songslist from '@/components/songslist/index.vue'
	import song from '@/components/song/index.vue'
	import mv from '@/components/mv/index.vue'
	export default {
		data() {
			return {
				userMse:{},
				play:this.$playMusic.playSong.flag,
				fab:false,
				albums : {},
				result : {},
				songs : {},
				dishs : {},
				mvlist : {},
				content:[
					{
						iconPath:'../../static/music/2.png',
						selectedIconPath:'../../static/music/2.png',
					},
					{
						iconPath:'../../static/music/play.png',
						selectedIconPath:'../../static/music//pause.png',
						active: this.$playMusic.playSong.flag
					},
					{
						iconPath:'../../static/music/3.png',
						selectedIconPath:'../../static/music/3.png',
					},
					{
						iconPath:'../../static/music/4.png',
						selectedIconPath:'../../static/music/4.png',
					}
				]
			}
		},
		components: {uniHeader,uniIcons,songslist,song,mv,'uni-drawer':uniDrawer},
		onLoad() {
			this.carousel()
			this.recommendList()
			this.newsongs()
			this.dish()
			this.getmvlist()
		},
		onShow() {
			this.fab = this.$innerAudioContext.src
			this.play = this.$playMusic.playSong.flag
			this.content[1].active = this.$playMusic.playSong.flag
			this.getUserMessage()
		},
		filters:{
			playCount(cont){
				return Math.floor(cont / 10000) + '万'
			}
		},
		methods: {
			getUserMessage(){
				let userMse = this.$login.getUserMessage()
				this.userMse = userMse
				console.log(userMse,'用户信息')
			},
			getVisible(){
				this.$refs['uniDrawerShow'].open()
				console.log('contClick')
			},
			serClick(){
				console.log('搜索框')
				uni.navigateTo({
					url: `../search/search`
				})
			},
			carousel(){
				this.$request({
					url:"/album/newest"
				}).then((data)=>{
					if(data.data.code == 200){
						this.albums = data.data.albums
					}
				})
			},
			recommendList(){
				this.$request({
					url:'/personalized?limit=6'
				}).then((data) => {
					if(data.data.code == 200){
						this.result = data.data.result
						console.log('推荐歌单',data.data.result)
					}
				})
			},
			newsongs(){
				this.$request({
					url:'/personalized/newsong'
				}).then((data) => {
					if(data.data.code == 200){
						let songs = data.data.result
						this.songs = songs.slice(0,4)
						console.log('推荐歌曲',songs.slice(0,4))
					}
				})
			},
			dish(){
				this.$request({
					url:"/top/album?offset=0&limit=4"
				}).then((data)=>{
					if(data.data.code == 200){
						let dishs = data.data.albums
						this.dishs = dishs.map((item)=>{
							return {
								id : item.id,
								picUrl : item.picUrl,
								name : item.name,
								song : {
									artists:[{
										...item.artists[0]
									}]
								}
							}
						})
						console.log('推荐歌单',this.dishs)
					}
				})
			},
			getmvlist(){
				this.$request({
					url:"/mv/first?limit=4"
				}).then((data)=>{
					if(data.data.code = 200){
						this.mvlist = data.data.data
						console.log('推荐MV',this.mvlist)
					}
				})
			},
			navigateTo(id){
				uni.navigateTo({
					url: `../playlist/playlist?id=`+id
				})
			},
			navlist(url){
				uni.navigateTo({
					url:url
				})
			},
			getMvTab(){
				uni.switchTab({
					url:'../mv/mv'
				})
			},
			mydaily(){
				if(this.$login.LOGIN()){
					uni.navigateTo({
						url: `../daily/daily`
					})
				}else{
					uni.showModal({
					    title: '游客状态',
					    content: '请先登录',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								uni.switchTab({
									url: `../me/me`
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			myFm(){
				if(this.$login.LOGIN()){
					uni.navigateTo({
						url: `../fm/fm`
					})
				}else{
					// uni.showToast({
					//     title: '请先登录',
					//     duration: 2000
					// })
					uni.showModal({
					    title: '游客状态',
					    content: '请先登录',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								uni.switchTab({
									url: `../me/me`
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			moreSongList(){
				uni.navigateTo({
					url: `../moresonglist/moresonglist`
				})
			},
			moreNewSong(){
				uni.navigateTo({
					url: `../newsong/newsong`
				})
			},
			getmv(id){
				uni.navigateTo({
					url: `../mvdetails/mvdetails?id=`+id
				})
			},
			getsong1(id){
				// uni.setStorageSync('playlist',this.songs)
				let songs = this.songs
				songs = songs.map((item)=>{
					return {
						...item,
						al:{
							picUrl:item.picUrl,
							
						}
					}
				})
				songs = {
					tracks:[...songs]
				}
				console.log(songs,'getsong1新歌')
				uni.setStorageSync('playlist',songs)
				uni.navigateTo({
					url: `../music/music?id=`+id
				})
			},
			getsong2(id){
				let songs = this.dishs
				songs = songs.map((item)=>{
					return {
						...item,
						al:{
							picUrl:item.picUrl,
							
						}
					}
				})
				songs = {
					tracks:[...songs]
				}
				console.log(songs,'getsong2碟')
				uni.setStorageSync('playlist',songs)
				uni.navigateTo({
					url: `../music/music?id=`+id
				})
			},
			trigger(e){
				console.log(e,this.$songId)
				this.content[e.index].active = !e.item.active
				if(e.index == 3){
					uni.navigateTo({
						url: `../music/music?id=`+uni.getStorageSync('songid')
					})
				}
				if(e.index == 1){
					if(this.play){
						this.$innerAudioContext.pause()
					}else{
						this.$innerAudioContext.play()
					}
					this.play = this.$playMusic.playSong.flag
					console.log(this.$playMusic.playSong,'555')
				}
				if(e.index == 0){
					this.$playMusic.upPlay()
				}
				if(e.index == 2){
					this.$playMusic.nextPlay()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index-content{
		.uniDrawer{
			height: calc(100%-110rpx);
			border-radius:0 20rpx 20rpx 0;
			top: 110rpx;
			// position: relative;
			.user-bbox{
				display: flex;
				flex-direction: column;
				// justify-content: space-around;
				align-items: center;
				position: relative;
				height: 100%;
				.uni-ava{
					image{
						height: 100rpx;
						width: 100rpx;
						border-radius: 50%;
					}
				}
				.f-n{
					font-weight: normal !important;
					display: inline;
				}
				&>view{
					padding: 0 20rpx;
					width: 100%;
					font-size: 30rpx;
					font-weight: bold;
					line-height: 100rpx;
					height: 100rpx;
				}
				.user-tit{
					margin-top: 80rpx ;
				}
				.bg{
					position: absolute;
					width: 93%;
					// height: 100vh;
					height: 100vh;
					bottom: 0rpx;
					left: 0;
					z-index: -1;
					filter: blur(3rpx);
					opacity: 0.4;
					background-repeat: no-repeat;
					background-position: center;
					background-size: cover;
				}
			}
		}
		.bg_gray{
			color: gray !important;
			font-weight: bold;
		}
		.index-swper{
			swiper-item{
				view{
					margin-left: 20rpx;
					width: 710rpx;
					height: 100%;
					border-radius: 10rpx;
					overflow: hidden;
					image{
						width: 100%;
					}
				}
			}
		}
		.menu-list{
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			&>view{
				margin-right: 55rpx;
			}
			&>view:last-child{
				margin: 0;
			}
			.menu-item{
				width: 80rpx;
				height: 80rpx;
				border-radius: 100%;
				background-color: #f54825;
				image{
					margin: 20%;
					width: 60%;
					height: 60%;
				}
				& image:last-child{
					margin-bottom: 30%;
				}
			}
			.menu-name{
				text-align: center;
				font-size: 20rpx;
				font-weight: 600;
				line-height: 40rpx;
			}
		}
		.index-title{
			margin-top: 20rpx;
			width: 750rpx;
			font-size: 28rpx;
			display: flex;
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
		.index-recommend-list{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			&>view{
				text-align: center;
				width: 220rpx;
				height: 220rpx;
				margin: 10rpx;
			}
		}
		.mv-list{
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
	}
</style>
