(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-djtype-djtype"],{"1ece":function(t,n,e){"use strict";e.r(n);var r=e("4c65"),i=e("efdb");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("62ea");var o,s=e("f0c5"),d=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"7c68fe72",null,!1,r["a"],o);n["default"]=d.exports},"30bf":function(t,n,e){"use strict";var r=e("ee27");e("d81d"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=r(e("d0ff")),a=r(e("f3f3")),o=r(e("c6ea")),s={data:function(){return{djRadios:[],offset:0,name:"",id:0,flag:!1}},components:{list:o.default},onLoad:function(t){console.log(t.id),this.id=t.id,this.getDjRadioHot(this.id,6)},onReachBottom:function(){this.flag&&this.getDjRadioHot(this.id,3)},methods:{getDjRadioHot:function(t,n){var e=this;this.$request({url:"/dj/radio/hot?cateId="+t+"&limit="+n+"&offset="+this.offset}).then((function(t){if(200==t.data.code){var r,o=t.data.djRadios;o.length>=n+6?e.flag=!0:e.flag=!1,o=o.map((function(t){return(0,a.default)({},t,{coverImgUrl:t.picUrl,copywriter:t.desc||t.name})})),e.offset++,(r=e.djRadios).push.apply(r,(0,i.default)(o)),e.name=o[0].category,uni.setNavigationBarTitle({title:o[0].category}),console.log(e.djRadios,"电台分类")}}))},getlist:function(t){this.$login.LOGIN()?uni.navigateTo({url:"../djdetails/djdetails?id="+t}):uni.showModal({title:"游客状态",content:"请先登录",success:function(t){t.confirm?(console.log("用户点击确定"),uni.switchTab({url:"../me/me"})):t.cancel&&console.log("用户点击取消")}})}}};n.default=s},"4c65":function(t,n,e){"use strict";var r,i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"djtype"},[e("v-uni-view",{staticClass:"djtype-tit"},[t._v(t._s(t.name))]),e("v-uni-view",{staticClass:"djtype-box"},t._l(t.djRadios,(function(n,r){return e("v-uni-view",{key:r},[e("list",{attrs:{list:n,getlist:t.getlist}})],1)})),1)],1)},a=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}))},"62ea":function(t,n,e){"use strict";var r=e("cb5c"),i=e.n(r);i.a},"7dbf":function(t,n,e){var r=e("24fb");n=r(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.sl[data-v-045a3fba]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.list-boxs > uni-view[data-v-045a3fba]{-webkit-box-sizing:border-box;box-sizing:border-box;width:%?250?%;padding:%?10?% %?10?%;text-align:center;font-size:%?24?%;border-radius:%?10?%}.list-boxs > uni-view uni-image[data-v-045a3fba]{border-radius:%?10?%;width:%?230?%;height:%?230?%}.list-boxs > uni-view uni-view[data-v-045a3fba]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}',""]),t.exports=n},"9a16":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={data:function(){return{}},props:{list:{type:Array/Object,default:function(){return[]}},getlist:{type:Function,default:function(){}}},methods:{}};n.default=r},aaf5:function(t,n,e){"use strict";var r=e("df3c"),i=e.n(r);i.a},b5cd:function(t,n,e){var r=e("24fb");n=r(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.sl[data-v-7c68fe72]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.djtype .djtype-tit[data-v-7c68fe72]{width:%?750?%;-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:%?30?%;line-height:%?80?%;padding:0 %?40?%;font-size:%?30?%;font-weight:700}.djtype .djtype-box[data-v-7c68fe72]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;width:%?750?%;-webkit-box-sizing:border-box;box-sizing:border-box}.djtype .djtype-box > uni-view[data-v-7c68fe72]{float:left}',""]),t.exports=n},c559:function(t,n,e){"use strict";var r,i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"list-boxs"},[e("v-uni-view",{on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.getlist(t.list.id)}}},[e("v-uni-image",{attrs:{src:t.list.coverImgUrl,mode:""}}),e("v-uni-view",{},[t._v(t._s(t.list.copywriter))])],1)],1)},a=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}))},c6ea:function(t,n,e){"use strict";e.r(n);var r=e("c559"),i=e("e9d5");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("aaf5");var o,s=e("f0c5"),d=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"045a3fba",null,!1,r["a"],o);n["default"]=d.exports},cb5c:function(t,n,e){var r=e("b5cd");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=e("4f06").default;i("bc45a1a8",r,!0,{sourceMap:!1,shadowMode:!1})},d0ff:function(t,n,e){"use strict";function r(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function i(t){if(Array.isArray(t))return r(t)}e.r(n);e("a4d3"),e("e01a"),e("d28b"),e("a630"),e("e260"),e("d3b7"),e("3ca3"),e("ddb0");function a(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}e("fb6a"),e("25f0");function o(t,n){if(t){if("string"===typeof t)return r(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(t,n):void 0}}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(t){return i(t)||a(t)||o(t)||s()}e.d(n,"default",(function(){return d}))},df3c:function(t,n,e){var r=e("7dbf");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=e("4f06").default;i("95656954",r,!0,{sourceMap:!1,shadowMode:!1})},e9d5:function(t,n,e){"use strict";e.r(n);var r=e("9a16"),i=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=i.a},efdb:function(t,n,e){"use strict";e.r(n);var r=e("30bf"),i=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=i.a}}]);