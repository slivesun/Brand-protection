(window.webpackJsonp=window.webpackJsonp||[]).push([[16,17,210],{1076:function(e,t){},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},507:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(48));n(47),n(724);var r=l(n(15)),o=l(n(28));function l(e){return e&&e.__esModule?e:{default:e}}var c=(0,r.default)(function(t){return e.createElement("div",{className:"OneSIXcomplaints"},e.createElement("div",{className:"Breadcrumb"},e.createElement(a.default,null,e.createElement(a.default.Item,null,"投诉查询"),e.createElement(a.default.Item,null,e.createElement("a",{href:"/index.html#/OneSIXInquiries",target:"_blank"},"1688投诉查询")),e.createElement(a.default.Item,null,"反通知详情"))),e.createElement("div",{className:"content"},e.createElement("div",{className:"contentTop"},e.createElement("div",{className:"contentTopDiv"},e.createElement("h4",null,"信息合法性说明")),e.createElement("div",{className:"contentTopDiv"},e.createElement("ul",null,e.createElement("li",null," ",e.createElement("span",null,"知识产权编号：")," ",e.createElement("span",null," ",t.state.ipr_num)),e.createElement("li",null," ",e.createElement("span",null)," 知识产权姓名： ",t.state.get1688NoticeDetail.具体说明),e.createElement("li",null," ",e.createElement("span",{style:{float:"left"}},"具体说明：")," ",e.createElement("span",{style:{marginLeft:"10px",width:"50%",display:"inline-block"}},t.state.get1688NoticeDetail.具体说明)," "),e.createElement("li",null," ",e.createElement("span",null)," 产品合法性说明文件：",t.state.get1688NoticeDetail.产品合法性证明文件?e.createElement("span",null,t.state.get1688NoticeDetail.产品合法性证明文件.map(function(t,n){return e.createElement("a",{key:n,href:t.href,alt:t.fileName,style:{width:"96px",height:"96px"}},t.fileName)})):null))))),e.createElement(o.default,{clazzName:"copyright"}))});t.default=c}).call(this,n(1))},724:function(e,t){},767:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=c(n(23)),r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(22);var o=c(n(507)),l=c(n(13));function c(e){return e&&e.__esModule?e:{default:e}}var i=function(t){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.get1688NoticeDetail=function(){l.default.post("/hcm/complaint/get1688NoticeDetail",{caseId:t.props.match.params.caseId,account_id:t.props.match.params.account_id,ipr_num:t.props.match.params.ipr_num}).then(function(e){console.log(e),1e4==e.data.status&&(400!=e.data.status?t.setState({ipr_num:t.props.match.params.ipr_num,get1688NoticeDetail:e.data.data}):t.setState({ipr_num:t.props.match.params.ipr_num}))})},t.state={get1688NoticeDetail:"",ipr_num:""},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),r(n,[{key:"componentDidMount",value:function(){this.get1688NoticeDetail(),console.log(this.props.match.params)}},{key:"render",value:function(){return e.createElement(o.default,{that:this})}}]),n}();t.default=a.default.create()(i)}).call(this,n(1))}}]);