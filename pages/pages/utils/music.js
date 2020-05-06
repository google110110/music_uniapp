import Vue from 'vue'

let audioPlaySrc = 0
let audioWay = 0
let songUrl = ''
let playState = 0
let songid = 0
let nowmiao = 0
let playSong = {flag:true}

let audioList = uni.getStorageSync('playlist').tracks

const _this = Vue.prototype

const getSongId = (id) => {
	uni.setStorageSync('songid',id)
}
const setAudioPlaySrc = (index)=>{
	audioPlaySrc = index
}
const setSongId = (id) => {
	songid = id
}
const getSongUrl = (songid) => {
	audioList = uni.getStorageSync('playlist').tracks
	_this.$request({
		url:'/song/url?id='+songid
	}).then((data)=>{
		if(data.data.code == 200){
			let url = data.data.data[0].url
			console.log('当前音乐为',data.data,audioList[audioPlaySrc].name,songid,audioList[audioPlaySrc].id,audioPlaySrc)
			getSongId(data.data.data[0].id)
			console.log(url,uni.getStorageSync('songid'),data.data.data[0].id)
			if(url){
				songUrl = url
				audioInit(url)
			}else{
				_this.$innerAudioContext.pause()
				uni.showModal({
					title: '歌曲失效',
					content: '当前音乐不可用，播放下一首',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							// nextPlay()
							if(audioList[audioPlaySrc+1].id){
								uni.redirectTo({
									url: `../music/music?id=`+audioList[audioPlaySrc+1].id
								})
							}else{
								uni.showToast({
								    title: '没有下一首了',
								    duration: 2000
								});
							}
						} else if (res.cancel) {
							_this.$innerAudioContext.pause()
							console.log('用户点击取消');
						}
					}
				});
			}
			
		}
	})
}
const audioInit = (songsrc) => {
	let src = songsrc
	_this.$minRadio.pause()
	if( _this.$innerAudioContext.src){
		 _this.$innerAudioContext.pause()
	}
	let innerAudioContext =  _this.$innerAudioContext
	 _this.$innerAudioContext.src = src
	 _this.$innerAudioContext.autoplay = true
	//监听事件
	 _this.$innerAudioContext.onError(()=>{
		nextPlay()
		uni.showModal({
			title: '收费歌曲',
			content: '该手歌曲为收费歌曲，播放下一首',
			success: function (res) {
				if (res.confirm) {
					nextPlay()
					console.log('用户点击确定');
				} else if (res.cancel) {
					_this.$innerAudioContext.pause()
					console.log('用户点击取消');
				}
			}
		});
		return
	})
	 _this.$innerAudioContext.onPlay(()=>{
		playFunc()
		playSong.flag = true
	})
	 _this.$innerAudioContext.onPause(()=>{
		pauseFunc()
		playSong.flag = false
	})
	 _this.$innerAudioContext.onEnded(()=>{
		nextPlay()
	})
	_this.$innerAudioContext.onTimeUpdate((e)=>{
		nowmiao = Math.floor(_this.$innerAudioContext.currentTime)
	})
}
const playFunc = () => {
	playState = 1
	return playState
}
const pauseFunc = () => {
	playState = 0
	return playState
}
const play = () => {
	if(playState){
		//暂停
		 _this.$innerAudioContext.pause()
		 // playSong = true
	}else{
		//播放
		 _this.$innerAudioContext.play()
		 // playSong = false
	}
}
const nextPlay = () => {
	if(audioWay==1){
		//随机
		audioPlaySrc = Math.floor(Math.random()*10)%audioList.length;
	}else if(audioWay==0){
		//顺序
		if(audioPlaySrc >= (audioList.length-1)){
			audioPlaySrc = 0
		}else{
			audioPlaySrc = audioPlaySrc+1
		}
	}//单曲循环
	// audioInit()
	getSongUrl(audioList[audioPlaySrc].id)
	console.log(audioPlaySrc)
	return audioPlaySrc
}
const upPlay = () => {
	if(audioWay==1){
		//随机
		audioPlaySrc = Math.floor(Math.random()*10)%audioList.length;
	}else if(audioWay==0){
		//顺序
		if(audioPlaySrc < 1){
			audioPlaySrc = audioList.length-1
		}else{
			audioPlaySrc = audioPlaySrc-1
		}
	}//单曲循环
	// audioInit()
	getSongUrl(audioList[audioPlaySrc].id)
	return audioPlaySrc
}
const audioWayFunc = (index) => {
	if(index){
		audioWay = index
		return audioWay
	}
	if(audioWay>1){
		audioWay = 0
	}else{
		audioWay = audioWay+1
	}
	console.log(audioWay,'====')
	return audioWay
}
export default {
	audioInit,
	getSongUrl,
	upPlay,
	nextPlay,
	play,
	pauseFunc,
	playFunc,
	songid,
	audioWayFunc,
	setAudioPlaySrc,
	setSongId,
	getSongId,
	playSong
}