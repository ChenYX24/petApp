"use strict";
const chooseLocation = require("../chooseLocation.js");
require("../common/vendor.js");
require("../ThirdPartySDK/amap-wx.130.js");
wx.createPage(chooseLocation.MiniProgramPage);
