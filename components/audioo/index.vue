<template>
	<view class="info" :style="bgStyle">
		<!-- '' -->
		<view class="bg"></view>
		<view class="content">
			<view class="top">
				<view class="name sl">{{audioList[audioPlaySrc].name}}</view>
				<view class="author sl">{{audioList[audioPlaySrc].al.name}}</view>
			</view>
			<view class="micImg">
				<image :class="playState?'zhuan':''" class="zhuan" :src="audioList[audioPlaySrc].al.picUrl" ></image>
			</view>
			<!-- <view class="micWord">Oh oh oh oh oooh</view> -->
			<view class="bot">
				 <view class="lineBar">
				 	<view class="time star">{{nowmiaoForc}}</view>
					<slider class="line" :value="nowmiao" min="0" :max="allmiao" @change="sliderChange" block-size="15" activeColor="#55A532" />
				 	<view class="time end">{{allmiaoForc}}</view>
				 </view>
				 <view class="btn">
				 	<view @tap="audioWayFunc">
						<image v-if="audioWay==0" class="iconbtn" src="../../static/audios/xunhuanbofang.png"></image>
						<image v-if="audioWay==2" class="iconbtn" src="../../static/audios/danquxunhuan.png"></image>
						<image v-if="audioWay==1" class="iconbtn" src="../../static/audios/suijibofang.png"></image>
					</view>
				 	<view class="palybtn">
				 		<view><image @tap="upPlay" class="iconbtn" src="../../static/audios/3.png"></image></view>
				 		<view @tap="play">
							<image v-if="!playState" class="iconbtn play" src="../../static/audios/1.png"></image>
							<image v-if="playState" class="iconbtn play" src="../../static/audios/0.png"></image>
						</view>
				 		<view><image @tap="nextPlay" class="iconbtn" src="../../static/audios/2.png"></image></view>
				 	</view>
				 	<view><image class="iconbtn" src="../../static/audios/list.png" @click="getlist"></image></view>
				 </view>
				<!-- <view class="tool">
				 	<view @tap="collectFunc">
						<image v-if="!collect" class="iconbtn" src="/static/image/icon/shoucang.png"></image>
						<image v-if="collect" class="iconbtn" src="/static/image/icon/shoucang-2.png"></image>
					</view>
				 	<view><image class="iconbtn" src="/static/image/icon/xiazai.png"></image></view>
				 	<view><image class="iconbtn" src="/static/image/icon/share.png"></image></view>
				 	<view><image class="iconbtn" src="/static/image/icon/liuyanjianyi.png"></image></view>
				 </view> -->
			</view>
		</view>
	</view>
</template>

<script>
	// 
	// let this.$innerAudioContext = ''
	export default {
		data() {
			return {
				songid:0,
				nowmiao:0,//当前时间
				allmiao:0,//全部时间
				lineBarWid:520,//进度条的宽度跟css一只
				playState:0,//播放状态
				audioCont:'',
				audioPlaySrc:0,//当前播放的歌曲index
				audioWay:0,//播放方式 0顺序播放 1随机播放 2单曲循环
				collect:0,//是否收藏
			}
		},
		props:['audioList','newid'],
		computed:{
			width:function (){
				return 'width:' + this.nowmiao/this.allmiao * this.lineBarWid + 'rpx'
			},
			playWidth:function () {
				return 'transform:translate3d(' + (this.nowmiao / this.allmiao) * this.lineBarWid + 'rpx,0,0);'
			},
			nowmiaoForc:function (){
				return this.$pubFuc.secondFormact(this.nowmiao)
			},
			allmiaoForc:function(){
				return this.$pubFuc.secondFormact(this.allmiao)
			},
			bgStyle:function (){
				return 'background-image:url('+this.audioList[this.audioPlaySrc].al.picUrl+')' || 'background-color:block;'
				// let index = this.$playMusic.audioPlaySrc || 0
				// return 'background-image:url('+this.audioList[index].al.picUrl+')'
			}
		},
		// onLoad() {
		// 	this.audioPlaySrc = 0
		// 	this.songid = this.audioList[this.audioPlaySrc].id
		// 	console.log(this.audioList[this.audioPlaySrc],'===',this.songid)
		// 	// this.audioInit()
		// },
		onShow() {
			// this.nowmiao = this.$playMusic.nowmiao
			// console.log(uni.getStorageSync('songid'),'55555')
			// this.songid = this.audioList[this.audioPlaySrc].id || uni.getStorageSync('songid')
		},
		mounted:function() {
			this.nowmiao = this.$playMusic.nowmiao
			if(this.newid){
				this.$playMusic.getSongId(this.newid)
			}
			this.songid = uni.getStorageSync('songid')
			this.audioList.find((item,index)=>{
				if(this.newid){
					if(item.id == this.newid){
						this.audioPlaySrc = index
						this.$playMusic.setAudioPlaySrc(index)
						console.log(this.songid ,'55555',index)
						return index
					}
				}else{
					if(item.id == this.songid){
						this.audioPlaySrc = index
						this.$playMusic.setAudioPlaySrc(index)
						console.log(this.songid ,'55555',index)
						return index
					}
				}
			})
			// }
			// this.songid = this.audioList[this.audioPlaySrc].id || uni.getStorageSync('songid')
			// this.$playMusic.setSongId(this.songid)
			// this.$playMusic.getSongId(this.songid)
			console.log(this.$playMusic.audioList,'===',this.songid)
			// if(this.newid){
			// 	this.getSongUrl(this.newid)
			// }else{
			// 	this.getSongUrl(this.songid)
			// }
			this.getSongUrl(this.newid)
		},
		methods:{
			getlist(){
				console.log('1111')
			},
			getSongUrl(songid){
				this.$playMusic.getSongUrl(songid)
				this.audioInit()
				// this.$request({
				// 	url:'/song/url?id='+songid
				// }).then((data)=>{
				// 	if(data.data.code == 200){
				// 		let url = data.data.data[0].url
				// 		this.$songId = data.data.data[0].id
				// 		console.log(this.$songId,'00000')
				// 		if(url){
				// 			this.songUrl = url
				// 			this.audioInit(url)
				// 		}else{
				// 			uni.showModal({
				// 			    title: '收费歌曲',
				// 			    content: '该手歌曲为收费歌曲，换其他歌听吧',
				// 			    success: function (res) {
				// 			        if (res.confirm) {
				// 			            console.log('用户点击确定');
				// 			        } else if (res.cancel) {
				// 			            console.log('用户点击取消');
				// 			        }
				// 			    }
				// 			});
				// 		}
						
				// 	}
				// })
			},
			audioInit(){
				// this.$playMusic.audioInit()
				let dura = setInterval(()=>{
					this.allmiao = Math.floor(this.$innerAudioContext.duration)
					if(this.allmiao){
						clearInterval(dura)
					}
				},500)
					this.$innerAudioContext.onPlay(()=>{
						this.playFunc()
					})
					this.$innerAudioContext.onPause(()=>{
						this.pauseFunc()
					})
					this.$innerAudioContext.onTimeUpdate((e)=>{
						this.nowmiao = Math.floor(this.$innerAudioContext.currentTime)
					})
					this.$innerAudioContext.onEnded(()=>{
						this.nextPlay()
					})
			},
			// audioInit(songsrc){
			// 	let src = songsrc
			// 	if(this.$innerAudioContext.src){
			// 		this.$innerAudioContext.pause()
			// 		// this.$innerAudioContext.destroy()
			// 		// this.$innerAudioContext = uni.createInnerAudioContext()
			// 		// console.log('----------',this.$innerAudioContext)
			// 		//销毁====================
			// 	}
			// 	// console.log('----------',this.$innerAudioContext)
			// 	// this.$innerAudioContext = uni.createInnerAudioContext();
			// 	let innerAudioContext = this.$innerAudioContext
			// 	this.$innerAudioContext.src = src
			// 	this.$innerAudioContext.autoplay = true
			// 	// 获取时长
			// 	let dura = setInterval(()=>{
			// 		this.allmiao = Math.floor(this.$innerAudioContext.duration)
			// 		if(this.allmiao){
			// 			clearInterval(dura)
			// 		}
			// 	},500)
			// 	//监听事件
			// 	this.$innerAudioContext.onError(()=>{
			// 		uni.showModal({
			// 		    title: '收费歌曲',
			// 		    content: '该手歌曲为收费歌曲，换其他歌听吧',
			// 		    success: function (res) {
			// 		        if (res.confirm) {
			// 		            console.log('用户点击确定');
			// 		        } else if (res.cancel) {
			// 		            console.log('用户点击取消');
			// 		        }
			// 		    }
			// 		});
			// 		return
			// 	})
			// 	this.$innerAudioContext.onPlay(()=>{
			// 		this.playFunc()
			// 	})
			// 	this.$innerAudioContext.onPause(()=>{
			// 		this.pauseFunc()
			// 	})
			// 	this.$innerAudioContext.onTimeUpdate((e)=>{
			// 		this.nowmiao = Math.floor(this.$innerAudioContext.currentTime)
			// 	})
			// 	this.$innerAudioContext.onEnded(()=>{
			// 		this.nextPlay()
			// 	})
			// },
			playFunc(){
				this.playState = this.$playMusic.playFunc()
			},
			pauseFunc(){
				this.playState = this.$playMusic.pauseFunc()
			},
			sliderChange(e) {
				this.nowmiao = e.detail.value
				this.$innerAudioContext.seek(this.nowmiao)
			},
			play(){
				this.$playMusic.play()
				// if(this.playState){
				// 	//暂停
				// 	this.$innerAudioContext.pause()
				// }else{
				// 	//播放
				// 	this.$innerAudioContext.play()
				// }
			},
			nextPlay(){
				this.audioPlaySrc = this.$playMusic.nextPlay()
				// if(this.audioWay==1){
				// 	//随机
				// 	this.audioPlaySrc = Math.floor(Math.random()*10)%this.audioList.length;
				// }else if(this.audioWay==0){
				// 	//顺序
				// 	if(this.audioPlaySrc >= (this.audioList.length-1)){
				// 		this.audioPlaySrc = 0
				// 	}else{
				// 		this.audioPlaySrc = this.audioPlaySrc+1
				// 	}
				// }//单曲循环
				// // this.audioInit()
				// this.getSongUrl( this.audioList[this.audioPlaySrc].id)
			},
			upPlay(){
				this.audioPlaySrc = this.$playMusic.upPlay()
				// if(this.audioWay==1){
				// 	//随机
				// 	this.audioPlaySrc = Math.floor(Math.random()*10)%this.audioList.length;
				// }else if(this.audioWay==0){
				// 	//顺序
				// 	if(this.audioPlaySrc < 1){
				// 		this.audioPlaySrc = this.audioList.length-1
				// 	}else{
				// 		this.audioPlaySrc = this.audioPlaySrc-1
				// 	}
				// }//单曲循环
				// // this.audioInit()
				// this.getSongUrl( this.audioList[this.audioPlaySrc].id)
			},
			audioWayFunc(index){
				// if(this.audioWay>1){
				// 	this.audioWay = 0
				// }else{
				// 	this.audioWay = this.audioWay+1
				// }
				// console.log(this.audioWay,'====')
				this.audioWay = this.$playMusic.audioWayFunc()
			},
			collectFunc(){
				this.collect = !this.collect
			},
		},
		
		
		// destroyed(){
		// 	this.$innerAudioContext.destroy()
		// 	this.$innerAudioContext = ''
		// }
	}
</script>

<style lang="scss" scoped>
.info{
	position: fixed;
	right: 0;
	left: 0;
	width:100%;
    height:100%;
	background-position:center;
    background-repeat: no-repeat;
    background-size:cover;
	font-size: 30rpx;
	.bg{
		position: fixed;
		z-index: 0;
		right: 0;
		left: 0;
		height: 100%;
		width: 100%;
		filter: blur(40rpx);
		background: inherit;
	}
	.content{
		position: fixed;
		z-index: 1;
		right: 0;
		left: 0;
		height: 100%;
		width: 100%;
		color: #FFFDEF;
		
		.top{
			margin-top: 20rpx;
			width:100%;
			text-align:center;
			.name{
				font-size: 46rpx;
			}
			.author{
				font-size: 34rpx;
				line-height: 60rpx;
			}
			.bar{
				width: 330rpx;
				justify-content: space-between;
				display: flex;
				margin: 20rpx auto;
				view{
					width: 100rpx;
					height: 40rpx;
					border: solid 1rpx #FFFDEF;
					border-radius: 2rpx;
					text-align: center;
				}
			}
		}
		.micImg{
			 margin: 25rpx auto;
			 
			 image{
				display: block;
				margin: 0 auto;
				width: 600rpx;
				height: 600rpx;
				border: solid 16rpx rgba(0,0,0,.15);
				border-radius:50%;
				&.zhuan{
					-webkit-transform: rotate(360deg);
					animation: rotation 8s linear infinite;
				}
			 }
		}
		.micWord{
			text-align: center;
		}
		.bot{
			position: fixed;
			bottom: 40rpx;
			left: 0;
			width: 100%;
			padding: 0 26rpx;
			box-sizing: border-box;
			.lineBar{
				display: flex;
				padding: 20rpx 0;
				justify-content: space-between;
				.line{
					margin: 0;
					width:490rpx;
				}
			}
			.iconbtn{
				display: block;
				width: 50rpx;
				height: 50rpx;
				margin:0 auto;
			}
			.btn{
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				// width: 750rpx !important;
				padding: 40rpx 15rpx;
				align-items: center;
				margin-top:-15rpx;
				image{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}
				.palybtn{
					display: flex;
					align-items: center;
					box-sizing: border-box;
					padding: 0 20rpx;
					width:500rpx;
					image{
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}
					&>view{
						flex: 1;
						align-items: center;
					}
					.iconbtn{
						&.play{
							width: 100rpx;
							height: 100rpx;
						}
					}
					
					
				}
			}
			.tool{
				display: flex;
				view{
					flex: 1;
					text-align: center;
				}
			}
			
		}
	}
}
</style>
