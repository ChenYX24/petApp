"use strict";const e=require("../../../common/vendor.js"),t={components:{navBar:()=>"../../../components/navBar/navBar.js"},data:()=>({Text:"选择绝育状况",isActive:!1,leftSelected:!1,rightSelected:!1,leftImageUrl:"/static/IDCreate/selectXX/DNxx.png",rightImageUrl:"/static/IDCreate/selectXX/Dxx.png",thirdImageUrl:"/static/IDCreate/selectXX/DNxxY.png",fourthImageUrl:"/static/IDCreate/selectXX/DxxY.png",CleftImageUrl:"/static/IDCreate/selectXX/CNxx.png",CrightImageUrl:"/static/IDCreate/selectXX/Cxx.png",CthirdImageUrl:"/static/IDCreate/selectXX/CNxxY.png",CfourthImageUrl:"/static/IDCreate/selectXX/CxxY.png",breed:""}),onLoad:function(){this.breed=e.index.getStorageSync("breed")},methods:{nextpage(){this.isActive&&(this.leftSelected?e.wx$1.setStorageSync("xx",1):this.rightSelected&&e.wx$1.setStorageSync("xx",2),e.index.navigateTo({url:"/pages/IDCreate/IDCreate5/IDCreate5"}))},selectLeft(){this.leftSelected=!this.leftSelected,this.rightSelected=!1,this.isActive=this.leftSelected||this.rightSelected,this.leftSelected?(this.leftImageUrl=this.thirdImageUrl,this.rightImageUrl="/static/IDCreate/selectXX/Dxx.png",this.CleftImageUrl=this.CthirdImageUrl,this.CrightImageUrl="/static/IDCreate/selectXX/Cxx.png"):(this.leftImageUrl="/static/IDCreate/selectXX/DNxx.png",this.CleftImageUrl="/static/IDCreate/selectXX/CNxx.png")},selectRight(){this.rightSelected=!this.rightSelected,this.leftSelected=!1,this.isActive=this.leftSelected||this.rightSelected,this.rightSelected?(this.rightImageUrl=this.fourthImageUrl,this.leftImageUrl="/static/IDCreate/selectXX/DNxx.png",this.CrightImageUrl=this.CfourthImageUrl,this.CleftImageUrl="/static/IDCreate/selectXX/CNxx.png"):(this.rightImageUrl="/static/IDCreate/selectXX/Dxx.png",this.CrightImageUrl="/static/IDCreate/selectXX/Cxx.png")}}};if(!Array){e.resolveComponent("nav-bar")()}const r=e._export_sfc(t,[["render",function(t,r,i,a,l,s){return{a:e.p({text:l.Text}),b:1==l.breed?l.leftImageUrl:2==l.breed?l.CleftImageUrl:l.leftImageUrl,c:l.leftSelected?"#fca547":"#9f9f9f",d:e.o(((...e)=>s.selectLeft&&s.selectLeft(...e))),e:1==l.breed?l.rightImageUrl:2==l.breed?l.CrightImageUrl:l.rightImageUrl,f:l.rightSelected?"#fca547":"#9f9f9f",g:e.o(((...e)=>s.selectRight&&s.selectRight(...e))),h:l.isActive?1:"",i:e.o(((...e)=>s.nextpage&&s.nextpage(...e)))}}],["__scopeId","data-v-025b6398"]]);wx.createPage(r);
