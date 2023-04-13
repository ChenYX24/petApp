<template>
  <view class="container">
    <view class="album">
      <view v-for="(item, index) in imageList" :key="index" class="image-item">
        <image :src="item" class="img"></image>
      </view>
    </view>
    <button @click="getImages" class="load-button">加载更多图片</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageList: []
    };
  },
  mounted() {
    this.getImages();
  },
  methods: {
    getImages() {
      const that = this;
      const auth = uni.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            uni.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                that.chooseImages();
              },
              fail() {
                uni.showModal({
                  title: '提示',
                  content: '您拒绝了访问相册的权限，无法加载图片。',
                  showCancel: false
                });
              }
            });
          } else {
            that.chooseImages();
          }
        }
      });
    },
    chooseImages() {
      const that = this;
      uni.chooseImage({
        count: 9,
        sourceType: ['album'],
        success(res) {
          that.imageList = that.imageList.concat(res.tempFilePaths);
        },
        fail(err) {
          console.log('Error:', err);
        }
      });
    }
  }
};
</script>


<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .album {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
    width: 100%;
  }
  .image-item {
    width: 100px;
    height: 100px;
    margin: 5px;
  }
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .load-button {
    margin-top: 20px;
  }
</style>
