<template>
	<view>
		<uniAudio :audioList="playlist" :newid="id"></uniAudio>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				id:0,
				playlist:[]
			}
		},
		methods: {
			
		},
		onLoad(params) {
			let playlist = uni.getStorageSync('playlist');
			this.playlist = playlist.tracks
			this.id = params.id
			console.log(this.id,playlist.tracks)
			if(playlist.name){
				uni.setNavigationBarTitle({
					title:playlist.name
				})
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
