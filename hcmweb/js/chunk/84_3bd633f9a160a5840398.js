(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{1075:function(e,t){},1076:function(e,t){},1077:function(e,t){},1078:function(e,t){},1079:function(e,t){},1080:function(e,t){},1081:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(48));n(47);var r=l(n(28));function l(e){return e&&e.__esModule?e:{default:e}}n(1075);var c=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(a.default,{className:"breadcrumb"},t.breadcrumbList.map(function(n,r){return""===t.linkList[r]?e.createElement(a.default.Item,{key:n},n):e.createElement(a.default.Item,{href:"javascript:;",key:n},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[r])}},n))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(r.default,null)))};c.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=c}).call(this,n(1))},538:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=E(n(38)),r=E(n(19)),l=E(n(45)),c=E(n(43)),i=E(n(14)),o=E(n(25)),u=E(n(11)),s=E(n(57)),m=E(n(30));n(37),n(20),n(51),n(42),n(18),n(24),n(26),n(56),n(32);var f=E(n(15)),d=E(n(29)),p=(E(n(28)),n(759));function E(e){return e&&e.__esModule?e:{default:e}}var v=m.default.Option,h=s.default.RangePicker,b=(0,f.default)(function(t){var n=t.state,a=n.platform,r=n.store,l=n.creattime,c=n.orderno,s=n.customer,f={width:"14px",height:"14px",opacity:.25,cursor:"pointer"},p=function(n){return t.state[n]&&t.state[n].length?e.createElement(u.default,{type:"close-circle",onClick:function(){return t.handleClearIconClick(n)},style:f}):null};return e.createElement(d.default,{breadcrumbList:["数据中心","订单监控"],linkList:["",""]},e.createElement("div",{className:"ordermonitor"},e.createElement("div",{className:"search-box"},e.createElement("div",{className:"input-box"},e.createElement("div",{className:"item",style:{position:"relative"},id:"platform"},e.createElement("span",{className:"lab"},"平台:"),e.createElement(m.default,{value:a,onChange:function(e){return t.chSearchIpt(e,"platform")},style:{width:"100%"},getPopupContainer:function(){return document.getElementById("platform")}},e.createElement(v,{value:null},"全部"),e.createElement(v,{value:"1"},"淘宝"))),e.createElement("div",{className:"item"},e.createElement("span",{className:"lab"},"店铺旺旺:"),e.createElement(o.default,{onChange:function(e){return t.chSearchIpt(e,"store")},value:r,suffix:p("store"),className:"ipt"})),e.createElement("div",{className:"item",style:{justifyContent:"flex-end"}},e.createElement("span",{className:"lab"},"创建时间:"),e.createElement(h,{onChange:function(e){return t.onRangePicker(e)},value:l}))),e.createElement("div",{className:"input-box"},e.createElement("div",{className:"item"},e.createElement("span",{className:"lab"},"订单编号:"),e.createElement(o.default,{onChange:function(e){return t.chSearchIpt(e,"orderno")},suffix:p("orderno"),value:c,className:"ipt"})),e.createElement("div",{className:"item"},e.createElement("span",{className:"lab"},"客户名称:"),e.createElement(o.default,{onChange:function(e){return t.chSearchIpt(e,"customer")},suffix:p("customer"),value:s,className:"ipt"})),e.createElement("div",{style:{justifyContent:"flex-end"},className:"item"},e.createElement(i.default,{className:"btn6",onClick:function(e){return t.onSearch()}},"查询")))),e.createElement(y,{that:t}),e.createElement(N,{that:t})))}),y=(0,f.default)(function(t){var n=t.state,a=n.dataList,r=n.totalNum,o=n.pageSize,s=n.pageNo,m=n.store,f=void 0===m?"":m,d=n.creattime,p=n.orderno,E=void 0===p?"":p,v=n.customer,h=void 0===v?"":v;return e.createElement("div",{className:"content"},e.createElement("div",{className:"button-box"},e.createElement("p",{className:"p"},e.createElement(u.default,{type:"sound",className:"icon-sound",theme:"outlined"}),"经销商店铺订购应用后，会显示订购店铺的订单数据，请尽快邀请经销商店铺订购。 "),e.createElement("div",{className:"buts"},e.createElement("div",null,e.createElement(i.default,{href:"/hcm/monitorDingDan/downLoad?wangwang="+(f||"")+"&dealer_name="+(h||"")+"&tid="+(E||"")+"&start_date="+(d[0]?d[0].format("YYYY-MM-DD"):"")+"&end_date="+(d[1]?d[1].format("YYYY-MM-DD"):""),style:{marginRight:"20px"}},"下载数据"),e.createElement(i.default,{onClick:function(){return t.inviteLinkStatus(!0)}},"获取应用订购链接")),e.createElement("div",null,e.createElement(i.default,{href:"/index.html#/OrderSituation"},"店铺订购情况")))),e.createElement("div",{className:"content-tab"},e.createElement(c.default,{rowKey:"id",pagination:!1,columns:t.formatColumn(),dataSource:a}),e.createElement("div",{className:"footer"},e.createElement("div",{className:"info"},"共 "+r+" 条记录 ","  ","第  "+s+"  / "+Math.ceil(r/o)+" 页"),e.createElement(l.default,{pageSize:o,current:s,total:r,onChange:t.changePagination,onShowSizeChange:t.onPaginationSize,showSizeChanger:!0,showQuickJumper:!0}))))}),N=(0,f.default)(function(t){var n=t.state.inviteLinkStatus;return e.createElement(a.default,{title:"获取应用订购链接",visible:n,maskClosable:!1,footer:[e.createElement(i.default,{key:"back",onClick:function(){return t.inviteLinkStatus(!1)}},"取消")],onCancel:function(){return t.inviteLinkStatus(!1)}},e.createElement("div",{className:"inviteLinkbox"},e.createElement("div",{className:"item"},e.createElement("span",{className:"title"},"订购链接："),e.createElement("p",null,e.createElement(o.default,{onChange:function(){return null},value:"https://tb.cn/5VFmCNw"}))),e.createElement("div",{className:"item",style:{padding:"0 0 10px 100px",marginTop:"13px"}},e.createElement(p.CopyToClipboard,{text:"https://tb.cn/5VFmCNw",onCopy:function(){return r.default.success("链接成功复制至粘贴板")}},e.createElement(i.default,null,"复制订购链接"))),e.createElement("p",{style:{padding:"0 0 10px 100px"}},"复制订购链接，发送给经销商店铺订购应用")))});t.default=b}).call(this,n(1))}}]);