"use strict";const e=require("../../common/vendor.js"),i={components:{TabBar:()=>"../../components/TabBar.js"},onLoad:function(e){this.tab=e.tab},data:()=>({tab:"",inputValue:"",trueProvince:"xx",provinces:["北京市","天津市","上海市","重庆市","河北省","山西省","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","海南省","四川省","贵州省","云南省","陕西省","甘肃省","青海省","台湾省","内蒙古自治区","广西壮族自治区","西藏自治区","宁夏回族自治区","新疆维吾尔自治区","香港特别行政区","澳门特别行政区"],currentProvince:"请选择省份",isActive:!1}),computed:{isCanActive(){return"请选择省份"!==this.currentProvince}},methods:{onProvinceChange(e){const i=e.detail.value;this.currentProvince=this.provinces[i],"请选择省份"!==this.currentProvince&&(this.trueProvince=this.currentProvince)},canTap(){this.isCanActive&&(this.isActive=!this.isActive)}}};if(!Array){e.resolveComponent("tab-bar")()}const t=e._export_sfc(i,[["render",function(i,t,c,n,r,o){return e.e({a:e.t(r.currentProvince),b:r.provinces,c:e.o(((...e)=>o.onProvinceChange&&o.onProvinceChange(...e))),d:!r.isActive},r.isActive?{}:{e:e.t(r.trueProvince)},{f:r.isActive},(r.isActive,{}),{g:r.isActive},r.isActive?{h:e.t(r.trueProvince)}:{},{i:r.isActive},(r.isActive,{}),{j:r.isActive?1:"",k:r.isActive?1:"",l:e.o(((...e)=>o.canTap&&o.canTap(...e))),m:e.p({activeTab:r.tab})})}],["__scopeId","data-v-d4ad29ce"]]);wx.createPage(t);
