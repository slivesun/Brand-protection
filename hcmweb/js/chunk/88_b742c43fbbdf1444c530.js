(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{1075:function(e,t){},1076:function(e,t){},1079:function(e,t){},1083:function(e,t){},1087:function(e,t){},1089:function(e,t){},1097:function(e,t){},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(48));n(47);var l=r(n(28));function r(e){return e&&e.__esModule?e:{default:e}}n(1075);var i=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(a.default,{className:"breadcrumb"},t.breadcrumbList.map(function(n,l){return""===t.linkList[l]?e.createElement(a.default.Item,{key:n},n):e.createElement(a.default.Item,{href:"javascript:;",key:n},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[l])}},n))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(l.default,null)))};i.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=i}).call(this,n(1))},540:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=y(n(38)),l=y(n(433)),r=y(n(14)),i=y(n(92)),c=y(n(101)),o=y(n(426)),u=y(n(126)),s=y(n(11)),m=y(n(127)),f=y(n(30));n(37),n(504),n(18),n(93),n(102),n(427),n(167),n(26),n(166),n(32);var d=y(n(15)),p=y(n(29));y(n(28));function y(e){return e&&e.__esModule?e:{default:e}}var E=f.default.Option,g=(0,d.default)(function(t){var n=t.state,a=n.dataList,l=void 0===a?[]:a,f=n.totalElements,d=n.pageSize,y=n.pageNum;return e.createElement(p.default,{breadcrumbList:["数据中心","售价监控"],linkList:["",""]},e.createElement("div",{className:"price-monitor"},e.createElement("div",{className:"content"},e.createElement("ul",{className:"items"},l.length?l.map(function(n,a){var l=n.id,r=n.productClassifyName,i=n.platform_name,f=n.frequency,d=n.monitorDate;return e.createElement("li",{onClick:function(e){"a"!==e.target.tagName.toLocaleLowerCase()&&(window.location.href="/index.html#/MonitorInfo/"+l)},className:"item",key:a},e.createElement("div",{className:"action"},e.createElement(u.default,{placement:"bottomRight",overlay:e.createElement(m.default,null,e.createElement(m.default.Item,null,e.createElement("a",{className:"A-COLOR",onClick:function(){return t.editVisible(!0,n)}},e.createElement("img",{style:{verticalAlign:"text-bottom",paddingRight:"4px"},src:"../../../img/icon/icon_operating_edit.png"}),"编辑")),e.createElement(m.default.Item,null,e.createElement("a",{className:"A-COLOR",onClick:function(){return t.chAngeHis(n)}},e.createElement("img",{style:{verticalAlign:"text-bottom",paddingRight:"4px"},src:"../../../img/icon/icon_operating_history.png"}),"变更历史")))},e.createElement(s.default,{onClick:function(e){e.stopPropagation()},type:"ellipsis"}))),e.createElement("div",{style:{paddingBottom:"20px"}},e.createElement(o.default,{style:{backgroundColor:"#108CEE",margin:"0px 20px"},size:40},r.substr(0,1)),e.createElement("span",null,r)),e.createElement("div",{className:"footer-buts"},e.createElement("span",null,i),e.createElement(c.default,{type:"vertical"}),e.createElement("span",null,f),e.createElement(c.default,{type:"vertical"}),e.createElement("span",null,d)))}):e.createElement("li",{style:{width:"100%"}},e.createElement(i.default,{style:{textAlign:"center"},message:"暂无数据",type:"error"}))),e.createElement("div",{style:{textAlign:"center"},className:"addbut"},!l.length||y*d>=f?null:e.createElement(r.default,{onClick:function(){return t.getMore()}},"加载更多..."))),e.createElement(h,{that:t})))});t.default=g;var h=(0,d.default)(function(t){var n=t.state,r=n.visible,i=n.classfiyUpdate;return e.createElement(a.default,{title:"编辑",visible:r,maskClosable:!1,onOk:function(){return t.editSubmit()},onCancel:function(){return t.editVisible(!1)},okButtonProps:{className:"btn2-main"},cancelButtonProps:{className:"btn2-sub"},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},e.createElement("div",{style:{display:"flex",alignItems:"center",paddingBottom:"20px"}},e.createElement("span",{style:{flexShrink:0,minWidth:"100px",textAlign:"right"}},"平台："),e.createElement(f.default,{onChange:function(e){return t.editOnchange(e,"platform_code")},style:{width:"100%"},value:i.platform_code},e.createElement(E,{value:"1"},"淘宝"))),e.createElement("div",{style:{display:"flex",alignItems:"center",paddingBottom:"20px"}},e.createElement("span",{style:{flexShrink:0,minWidth:"100px",textAlign:"right"}},"频次："),e.createElement(f.default,{onChange:function(e){return t.editOnchange(e,"frequency")},style:{width:"100%"},value:i.frequency},e.createElement(E,{value:"1次/24H"},"1次/24H"))),e.createElement("div",{style:{display:"flex",alignItems:"center",paddingBottom:"20px"}},e.createElement("span",{style:{flexShrink:0,minWidth:"100px",textAlign:"right"}},"监控时间："),e.createElement(l.default,{style:{width:"100%"},value:i.monitorDate,onChange:function(e){return t.editOnchange(e,"monitorDate")},format:"HH:mm",minuteStep:60})))})}).call(this,n(1))}}]);