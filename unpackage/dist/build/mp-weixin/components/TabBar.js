"use strict";const e=require("../common/vendor.js"),t={components:{add:()=>"./add/add.js"},data:()=>({tab:"memo",isAdd:!1}),props:{activeTab:{type:String,default:"memo"}},methods:{changeAdd(){this.isAdd=!this.isAdd},switchTab(t){if("add"===t)this.isAdd=!this.isAdd;else switch(this.tab=t,t){case"memo":e.wx$1.redirectTo({url:`/pages/notebook/notebook?tab=${t}`});break;case"planet":e.wx$1.redirectTo({url:`/pages/planet/planet?tab=${t}`});break;case"activity":e.wx$1.redirectTo({url:`/pages/activity/activity?tab=${t}`});break;case"home":e.wx$1.redirectTo({url:`/pages/home/home?tab=${t}`})}}}};if(!Array){e.resolveComponent("add")()}Math;const a=e._export_sfc(t,[["render",function(t,a,i,o,d,s){return{a:"memo"===i.activeTab?1:"",b:e.o((e=>s.switchTab("memo"))),c:"planet"===i.activeTab?1:"",d:e.o((e=>s.switchTab("planet"))),e:e.o((e=>s.switchTab("add"))),f:"activity"===i.activeTab?1:"",g:e.o((e=>s.switchTab("activity"))),h:"home"===i.activeTab?1:"",i:e.o((e=>s.switchTab("home"))),j:d.isAdd?1:"",k:e.o(s.changeAdd),l:e.p({isShow:d.isAdd})}}],["__scopeId","data-v-9e97134c"]]);wx.createComponent(a);