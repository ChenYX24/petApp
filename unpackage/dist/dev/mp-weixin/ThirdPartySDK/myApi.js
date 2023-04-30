"use strict";
const common_vendor = require("../common/vendor.js");
async function request(url, data) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      data,
      header: {
        Authorization: common_vendor.index.getStorageSync("token")
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
