<template>
  <view class="container">
    <view class="album" :style="{backgroundColor: bgColor}">
      <view v-for="(item, index) in imageList" :key="index" class="image-item" @click="selectImage(index)">
        <image :src="item" class="img"></image>
        <view v-if="selectedImages.includes(index)" class="selected-mask">
          <text class="selected-text">已选择</text>
        </view>
      </view>
    </view>
  </view>
</template>



<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      imageList: [],
      selectedImages: []
    };
  },
  mounted() {
    this.getImages();
  },
  methods: {
    getImages() {
      // 这里仅作演示，实际项目中，请从服务器或本地获取图片列表
      for (let i = 0; i < 20; i++) {
        this.imageList.push(`https://picsum.photos/200/300?random=${i}`);
      }
    },
    selectImage(index) {
      if (this.selectedImages.includes(index)) {
        this.selectedImages.splice(this.selectedImages.indexOf(index), 1);
      } else {
        this.selectedImages.push(index);
      }
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
    position: relative;
    width: 100px;
    height: 100px;
    margin: 5px;
  }
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .selected-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .selected-text {
    color: #fff;
    font-weight: bold;
  }
</style>