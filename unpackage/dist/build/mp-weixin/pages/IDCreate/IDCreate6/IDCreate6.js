"use strict";const e=require("../../../common/vendor.js"),t={components:{navBar:()=>"../../../components/navBar/navBar.js"},data(){return{Text:"选择到家日期",placeholderText:"#cea697",inputValue:"",imageSrc:"",breed:"",name:"",date:"请选择ta的到家日期",trueDate:"xx",currentDate:this.getDate({format:!0})}},computed:{startDate(){return this.getDate("start")},endDate(){return this.getDate("end")},isActive(){return"xx"!==this.trueDate}},onLoad(){this.breed=e.index.getStorageSync("breed"),this.name=e.index.getStorageSync("petName")},methods:{bindDateChange:function(e){this.date=e.detail.value,this.trueDate=this.getDaysSinceDate(e.detail.value,this.currentDate)},getDate(e){const t=new Date;let a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate();return"start"===e&&(a-=60),n=n>9?n:"0"+n,r=r>9?r:"0"+r,`${a}-${n}-${r}`},getDaysSinceDate(e,t){const a=new Date(e),n=new Date(t).getTime()-a.getTime();return Math.floor(n/864e5)},nextpage(){this.isActive&&e.index.navigateTo({url:"/pages/IDCreate/IDCreate6/IDCreate6"})}}};if(!Array){e.resolveComponent("nav-bar")()}const a=e._export_sfc(t,[["render",function(t,a,n,r,i,s){return{a:e.p({text:i.Text}),b:e.t(i.date),c:i.date,d:s.startDate,e:s.endDate,f:e.o(((...e)=>s.bindDateChange&&s.bindDateChange(...e))),g:1==this.breed?"/static/IDCreate//selectTime/dogHome.png":2==this.breed?"/static/IDCreate//selectTime/catHome.png":"/static/IDCreate//selectTime/dogHome.png",h:e.t(i.name),i:e.t(i.trueDate),j:s.isActive?1:"",k:e.o(((...e)=>s.nextpage&&s.nextpage(...e)))}}],["__scopeId","data-v-5c9dd446"]]);wx.createPage(a);
