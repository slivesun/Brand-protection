(window.webpackJsonp=window.webpackJsonp||[]).push([[186,292],{1076:function(e,t){},1092:function(e,t){},28:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();var n=function(t){function n(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),a(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),n}();t.default=n}).call(this,a(1))},585:function(e,t,a){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0});var l=c(a(383)),o=c(a(48));a(380),a(47),a(749);var r=c(a(15)),i=c(a(28));function c(e){return e&&e.__esModule?e:{default:e}}var s=(0,r.default)(function(t){return e.createElement("div",{className:"TaoBaoAppealDetails"},e.createElement("div",{className:"Breadcrumb"},e.createElement(o.default,null,e.createElement(o.default.Item,null,"投诉查询"),e.createElement(o.default.Item,null,e.createElement("a",{href:"/index.html#/TaobaoInquiries",target:"_blank"},"淘宝投诉查询")),e.createElement(o.default.Item,null,"投诉详情"))),e.createElement("div",{className:"content"},e.createElement("div",{className:"contentTop"},e.createElement("div",{className:"contentTopDiv"},e.createElement("h4",null,"投诉基础信息")),e.createElement("div",{className:"contentTopDiv"},e.createElement("div",null,"投诉任务编号: ",t.state.detail_taobao.id),e.createElement("div",null,"投诉单号:",t.state.detail_taobao.batchId),e.createElement("div",null,"投诉时间:  ",n(t.state.detail_taobao.gmtCreate).format("YYYY-MM-DD HH:mm:ss"))),e.createElement("div",{className:"contentTopDiv"},e.createElement("div",null,"知识产权名称: ",t.state.detail_taobao.iprName),e.createElement("div",null,"平台:",t.state.detail_taobao.entityPlatform),e.createElement("div",null,"投诉链接类型:  ",t.state.detail_taobao.entityType)),e.createElement("div",{className:"contentTopDiv"},e.createElement("div",null,"被投诉商家: ",t.state.detail_taobao.entityOwnerName),e.createElement("div",null,"投诉链接：",e.createElement("a",{href:t.state.detail_taobao.entityContent},t.state.detail_taobao.entityContent)),e.createElement("div",null)),e.createElement("div",{className:"contentTopDiv"},e.createElement("div",null,e.createElement("span",{style:{float:"left"}},"投诉理由："),t.state.detail_taobao.complaintReasonExtendEntities?e.createElement("span",{style:{marginLeft:"10px",width:"50%",display:"inline-block",overflow:"hidden"}},t.state.detail_taobao.complaintReasonExtendEntities[0].value):null)),e.createElement("div",{className:"contentTopDiv"},e.createElement("div",null,"举证证明：",t.state.detail_taobao.proofFile?e.createElement("span",{style:{marginLeft:"10px",width:"50%",display:"inline-block"}},t.state.detail_taobao.proofFile.data.map(function(t,a){return e.createElement("a",{key:a,href:t.fileUrl},t.fileName)})):null))),e.createElement("div",{className:"contentCon"},e.createElement("div",{className:"contentTopDiv"},e.createElement("h4",null,"处理记录")),t.state.detail_taobao.log?e.createElement(l.default,{style:{marginTop:"20px",marginLeft:"20px"}},t.state.detail_taobao.log.map(function(a,o){return e.createElement(l.default.Item,{key:o},n(a.gmtCreate).format("YYYY-MM-DD HH:mm:ss")," ",a.type," ","卖家提交申诉"==a.type?e.createElement("a",{href:"/index.html?#/TaoBaocomplaints/"+t.state.batchid+"/"+t.state.ID+"/"+t.state.accountId+"/"+t.state.ID,target:"_blank"},"查看申诉链接"):null)})):null)),e.createElement(i.default,{clazzName:"copyright"}))});t.default=s}).call(this,a(1),a(10))},749:function(e,t){}}]);