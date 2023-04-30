"use strict";
const common_vendor = require("../common/vendor.js");
async function request(url, data) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      data,
      header: {
        Authorization: common_vendor.index.getStorageSync("token")
<<<<<<< HEAD
=======
        //请求的token
>>>>>>> 9beaf6f83207c32d34bd381b90b2e66c6eddaa44
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}
exports.request = request;
