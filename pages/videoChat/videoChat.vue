<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>

export default {
  data() {
    return {
	  roomId:''
    };
  },
  computed: {
      url() {
        return decodeURIComponent(this.$route.query.url);
      }
    },
  onLoad(query) {
	// 获取摄像头权限
	navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    console.log('摄像头权限已获取')
    // 使用stream进行视频采集
  })
  .catch(function(err) {
    console.log('获取摄像头权限失败：' + err.name + ': ' + err.message)
  })
	// 获取麦克风权限
	navigator.mediaDevices.getUserMedia({audio: true})
  .then(function(stream) {
    console.log('麦克风权限已获取')
    // 使用stream进行音频采集
  }).catch(function(err) {
    console.log('获取麦克风权限失败：' + err.name + ': ' + err.message)
  })


  }
};
</script>
