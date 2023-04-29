export async function request(url, data) {
  return new Promise((resolve, reject) => {
	uni.request({
	  url,
	  data,
	  header:{
		  Authorization: uni.getStorageSync('token'),//请求的token
	  },
	  success: (res) => {
		resolve(res.data);
	  },
	  fail: (error) => {
		  //提示用户服务器异常
		reject(error);
	  }
	})
  })
}