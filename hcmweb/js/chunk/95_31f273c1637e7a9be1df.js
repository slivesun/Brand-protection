(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{1075:function(e,t){},1076:function(e,t){},1077:function(e,t){},1078:function(e,t){},1079:function(e,t){},1080:function(e,t){},1081:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=o(n(48));n(47);var r=o(n(28));function o(e){return e&&e.__esModule?e:{default:e}}n(1075);var l=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(a.default,{className:"breadcrumb"},t.breadcrumbList.map(function(n,r){return""===t.linkList[r]?e.createElement(a.default.Item,{key:n},n):e.createElement(a.default.Item,{href:"javascript:;",key:n},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[r])}},n))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(r.default,null)))};l.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=l}).call(this,n(1))},543:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0});var r=f(n(43)),o=f(n(40)),l=f(n(57)),i=f(n(35)),u=f(n(14)),c=f(n(30));n(42),n(49),n(56),n(50),n(18),n(32);var s=f(n(15)),d=f(n(29));function f(e){return e&&e.__esModule?e:{default:e}}var m=c.default.Option,p=(0,s.default)(function(t){var n=t.state,s=n.dealer_id,f=n.shop_id,p=n.month,h=n.saleDataList,y=n.pagination,b=n.dealerShopList,E=[{title:"序号",render:function(e,t,n){return n+1},key:"xuhao"},{title:"主题",dataIndex:"daydate",key:"daydate"},{title:"店铺名称",dataIndex:"shop_name",key:"shop_name"},{title:"销售额",dataIndex:"daymoney",key:"daymoney",render:function(e){return"￥"+e}},{title:"记录日期",dataIndex:"createtime",key:"createtime",render:function(t){return e(t).format("YYYY-MM-DD HH:mm:ss")}}];return a.createElement(d.default,{title:"销售数据详情",breadcrumbList:["客户盘点","客户信息","客户详情","销售数据详情"],linkList:["","2","1",""],history:t.props.history},a.createElement("div",{className:"sales-data-detail-wrapper"},a.createElement(o.default,{type:"flex",justify:"space-between",className:"conditions"},a.createElement(i.default,{span:3},a.createElement("a",{href:"/hcm/dayReport/downLoadDay?dealer_id="+s+"&shop_id="+f+"&ser_month="+p},a.createElement(u.default,null,"下载数据"))),a.createElement(i.default,{span:12},a.createElement(o.default,null,a.createElement(i.default,{span:12,id:"shopname"},a.createElement("label",null,"店铺名称  ",a.createElement(c.default,{placeholder:"请选择",style:{width:"242px"},getPopupContainer:function(e){return document.getElementById("shopname")},onChange:t.handleSelectChange},a.createElement(m,{value:""},"全部"),b.map(function(e,t){return a.createElement(m,{value:e.id,key:e.id},e.shop_name)})))),a.createElement(i.default,{span:12,id:"month"},"月份  ",a.createElement(l.default.MonthPicker,{getCalendarContainer:function(e){return document.getElementById("month")},style:{width:"242px"},onChange:t.handleDateChange}))))),a.createElement(r.default,{columns:E,dataSource:h,className:"tables",pagination:{total:y.totalElements,showTotal:function(e){return"共"+e+"条"},showQuickJumper:!0,onChange:t.handlePageChange.bind(t)}})))});t.default=p}).call(this,n(10),n(1))}}]);