(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-radiostation-radiostation"],{2805:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.sl[data-v-19e9e2e5]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.dj .fw-n[data-v-19e9e2e5]{color:#b4b4b4;display:inline;font-size:%?18?%;font-weight:400}.dj .dj-tit[data-v-19e9e2e5]{margin-top:%?30?%;line-height:%?80?%;padding:0 %?40?%;font-size:%?30?%;font-weight:700}.dj .swiper-banner .banner[data-v-19e9e2e5]{position:relative}.dj .swiper-banner .banner uni-image[data-v-19e9e2e5]{height:100%;width:94vw;margin-left:3vw;border-radius:%?10?%}.dj .swiper-banner .banner uni-view[data-v-19e9e2e5]{color:#fff;position:absolute;bottom:0;right:5vw;line-height:%?30?%;font-size:%?20?%;font-weight:700;letter-spacing:%?8?%;padding:%?10?%}.dj .swiper-catelist .catelist[data-v-19e9e2e5]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.dj .swiper-catelist .catelist > uni-view[data-v-19e9e2e5]{width:%?100?%;height:%?100?%;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center;margin:0 %?35?%}.dj .swiper-catelist .catelist > uni-view uni-image[data-v-19e9e2e5]{width:%?70?%;height:%?70?%}.dj .swiper-catelist .catelist > uni-view > uni-view[data-v-19e9e2e5]{width:%?100?%;font-size:%?15?%;line-height:%?30?%;text-align:center}.dj .dj-recommend-box[data-v-19e9e2e5]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;width:%?750?%;-webkit-box-sizing:border-box;box-sizing:border-box}.dj .dj-recommend-box > uni-view[data-v-19e9e2e5]{float:left}',""]),t.exports=e},"2e4c":function(t,e,i){"use strict";i.r(e);var n=i("3892"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},3892:function(t,e,i){"use strict";var n=i("ee27");i("4de4"),i("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("f3f3")),r=n(i("c6ea")),s={data:function(){return{banner:{},catelist:{},recommend:{},djRadios:{},djtoplist:{},djhot:{}}},components:{list:r.default},onLoad:function(){this.getbanner(),this.getcatelist(),this.getrecommend(),this.getdjtoplist(),this.getdjhot()},methods:{getbanner:function(){var t=this;this.$request({url:"/dj/banner"}).then((function(e){200==e.data.code&&(t.banner=e.data.data,console.log(e.data.data,"电台轮播"))}))},getcatelist:function(){var t=this;this.$request({url:"/dj/catelist"}).then((function(e){if(200==e.data.code){var i=e.data.categories,n=0,a=[],r=[],s=i.length-1;i=i.map((function(t,e){if(!(n<4&&e!=s))return r=a,n=0,a=[],r;a.push(t),n++})),i=i.filter((function(t){return t})),t.catelist=i,console.log(e.data.categories,i,"电台分类")}}))},getrecommend:function(){var t=this;this.$request({url:"/dj/recommend"}).then((function(e){if(200==e.data.code){var i=e.data,n=0,r=i.djRadios.map((function(t){if(n<3)return n++,(0,a.default)({},t,{coverImgUrl:t.picUrl})}));r=r.filter((function(t){return t})),t.djRadios=r,t.recommend=i,console.log(e.data,"电台推荐")}}))},getdjtoplist:function(){var t=this;this.$request({url:"/dj/toplist?type=new&limit=3"}).then((function(e){if(200==e.data.code){var i=e.data.toplist;i=i.map((function(t){return(0,a.default)({},t,{coverImgUrl:t.picUrl,copywriter:t.name})})),t.djtoplist=i,console.log(e.data.toplist,"热门电台榜")}}))},getdjhot:function(){var t=this;this.$request({url:"/dj/hot?limit=7"}).then((function(e){if(200==e.data.code){var i=e.data.djRadios;i=i.map((function(t){return(0,a.default)({},t,{coverImgUrl:t.picUrl})})),t.djhot=i,console.log(e.data.djRadios,"热门电台")}}))},navigateTo:function(t){uni.navigateTo({url:"../djtype/djtype?id="+t})},getlist:function(t){this.$login.LOGIN()?uni.navigateTo({url:"../djdetails/djdetails?id="+t}):uni.showModal({title:"游客状态",content:"请先登录",success:function(t){t.confirm?(console.log("用户点击确定"),uni.switchTab({url:"../me/me"})):t.cancel&&console.log("用户点击取消")}})}}};e.default=s},"597e":function(t,e,i){"use strict";i.r(e);var n=i("e1ec"),a=i("2e4c");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("fda9");var s,o=i("f0c5"),d=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"19e9e2e5",null,!1,n["a"],s);e["default"]=d.exports},"7dbf":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.sl[data-v-045a3fba]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.list-boxs > uni-view[data-v-045a3fba]{-webkit-box-sizing:border-box;box-sizing:border-box;width:%?250?%;padding:%?10?% %?10?%;text-align:center;font-size:%?24?%;border-radius:%?10?%}.list-boxs > uni-view uni-image[data-v-045a3fba]{border-radius:%?10?%;width:%?230?%;height:%?230?%}.list-boxs > uni-view uni-view[data-v-045a3fba]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}',""]),t.exports=e},"9a16":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{}},props:{list:{type:Array/Object,default:function(){return[]}},getlist:{type:Function,default:function(){}}},methods:{}};e.default=n},aaf5:function(t,e,i){"use strict";var n=i("df3c"),a=i.n(n);a.a},c559:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"list-boxs"},[i("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getlist(t.list.id)}}},[i("v-uni-image",{attrs:{src:t.list.coverImgUrl,mode:""}}),i("v-uni-view",{},[t._v(t._s(t.list.copywriter))])],1)],1)},r=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}))},c6ea:function(t,e,i){"use strict";i.r(e);var n=i("c559"),a=i("e9d5");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("aaf5");var s,o=i("f0c5"),d=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"045a3fba",null,!1,n["a"],s);e["default"]=d.exports},d9ba:function(t,e,i){var n=i("2805");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("16596a34",n,!0,{sourceMap:!1,shadowMode:!1})},df3c:function(t,e,i){var n=i("7dbf");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("95656954",n,!0,{sourceMap:!1,shadowMode:!1})},e1ec:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"dj"},[i("v-uni-swiper",{staticClass:"swiper-banner",attrs:{"indicator-dots":!0,autoplay:!0,circular:!0,interval:3e3}},t._l(t.banner,(function(e,n){return i("v-uni-swiper-item",{key:n,staticClass:"banner"},[i("v-uni-image",{attrs:{src:e.pic,mode:""}}),i("v-uni-view",{},[t._v(t._s(e.typeTitle))])],1)})),1),i("v-uni-view",{staticClass:"dj-tit"},[t._v("热门分类")]),i("v-uni-swiper",{staticClass:"swiper-catelist",style:{height:"120rpx"},attrs:{duration:1e3}},t._l(t.catelist,(function(e,n){return i("v-uni-swiper-item",{key:n,staticClass:"catelist"},t._l(e,(function(e,n){return i("v-uni-view",{key:n,on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navigateTo(e.id)}}},[i("v-uni-image",{attrs:{src:e.pic56x56Url,mode:""}}),i("v-uni-view",{staticClass:"sl"},[t._v(t._s(e.name))])],1)})),1)})),1),i("v-uni-view",{staticClass:"dj-tit"},[t._v("电台推荐"),i("v-uni-view",{staticClass:"fw-n"},[t._v("("+t._s(t.recommend.name)+")")])],1),i("v-uni-view",{staticClass:"dj-recommend-box"},t._l(t.djRadios,(function(e,n){return i("v-uni-view",{key:n},[i("list",{attrs:{list:e,getlist:t.getlist}})],1)})),1),i("v-uni-view",{staticClass:"dj-tit"},[t._v("新晋电台榜/热门电台榜")]),i("v-uni-view",{staticClass:"dj-recommend-box"},t._l(t.djtoplist,(function(e,n){return i("v-uni-view",{key:n},[i("list",{attrs:{list:e,getlist:t.getlist}})],1)})),1),i("v-uni-view",{staticClass:"dj-tit"},[t._v("热门电台")]),i("v-uni-view",{staticClass:"dj-recommend-box"},t._l(t.djhot,(function(e,n){return i("v-uni-view",{key:n},[i("list",{attrs:{list:e,getlist:t.getlist}})],1)})),1)],1)},r=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}))},e9d5:function(t,e,i){"use strict";i.r(e);var n=i("9a16"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},fda9:function(t,e,i){"use strict";var n=i("d9ba"),a=i.n(n);a.a}}]);